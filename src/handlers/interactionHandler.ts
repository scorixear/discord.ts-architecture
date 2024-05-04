import {
  AutocompleteInteraction,
  ButtonInteraction,
  ChatInputCommandInteraction,
  SelectMenuInteraction,
  Guild,
  Interaction,
  StringSelectMenuInteraction,
  AnySelectMenuInteraction,
  ChannelSelectMenuInteraction,
  MentionableSelectMenuInteraction,
  RoleSelectMenuInteraction,
  UserSelectMenuInteraction
} from 'discord.js';

import { ButtonInteractionModel } from '../model/ButtonInteractionModel';
import { CommandInteractionModel } from '../model/CommandInteractionModel';
import { REST } from '@discordjs/rest';
import { InteractionType, Routes } from 'discord-api-types/v10';
import { Logger, WARNINGLEVEL } from '../helpers/logging';
import { AutocompleteInteractionModel } from '../model/AutocompleteInteractionModel';
import { TwoWayMap } from '../model/TwoWayMap';
import { DiscordHandler } from './discordHandler';
import { SelectMenuInteractionModel } from '../model/SelectMenuInteractionModel';
import { AnySelectMenuInteractionModel } from '../model/SelectMenuInteractionModels/AnySelectMenuInteractionModel';
import { StringSelectMenuInteractionModel } from '../model/SelectMenuInteractionModels/StringSelectMenuInteractionModel';
import { ChannelSelectMenuInteractionModel } from '../model/SelectMenuInteractionModels/ChannelSelectMenuInteractionModel';
import { MentionableSelectMenuInteractionModel } from '../model/SelectMenuInteractionModels/MentionableSelectMenuInteractionModel';
import { RoleSelectMenuInteractionModel } from '../model/SelectMenuInteractionModels/RoleSelectMenuInteractionModel';
import { UserSelectMenuInteractionModel } from '../model/SelectMenuInteractionModels/UserSelectMenuInteractionModel';

/**
 * Initializes InteractionModels, pushs them to specified guilds
 * and handles the 'interactionCreate' event [link to event callback needed]
 *
 * {@link buttonInteractions} A map of @type {ButtonInteractionModel}s and their respective IDs
 * {@link selectMenuInteractions} A map of @type {AnySelectMenuInteractionModel}s and their respective IDs
 */
export class InteractionHandler {
  public buttonInteractions: TwoWayMap<string, ButtonInteractionModel>;
  public selectMenuInteractions: TwoWayMap<string, AnySelectMenuInteractionModel>;
  public commandInteractions: CommandInteractionModel[];

  /**
   *
   * @param commandInteractions The CommandInteractionModels the Interactionhandler will listen for
   * @param buttonInteractions The ButtoninteractionModels the InteractionHandler will listen for [default empty]
   * @param selectMenuInteraction The SelectMenuInteractionModels the InteractionHandler will listen for [default empty]
   * @param afterConstruct A callback that is called after the InteractionHandler has constructed all CommandInteractions
   */
  constructor(
    commandInteractions: CommandInteractionModel[],
    buttonInteractions: TwoWayMap<string, ButtonInteractionModel> = new TwoWayMap(new Map()),
    selectMenuInteraction: TwoWayMap<string, AnySelectMenuInteractionModel> = new TwoWayMap(new Map()),
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    afterConstruct: (models: CommandInteractionModel[]) => void = () => {}
  ) {
    this.commandInteractions = commandInteractions;
    this.buttonInteractions = buttonInteractions;
    this.selectMenuInteractions = selectMenuInteraction;
    afterConstruct(this.commandInteractions);
  }

  /**
   * Waits for all CommandInteraction Read and the pushes all Commands to the specified
   * guilds or all if undefined, excluding all guilds defined in {@link notCommandGuildIds}.
   * @param discordToken The token to communicate with the REST api
   * @param clientId the client id to communicate with the REST api
   * @param discordHandler the discordHandler used to login and create the client
   * @param commandGuildIds the guilds that are getting all commands pushed to [default undefined => all guilds]
   * @param notCommandGuildIds the guilds that are excluded from all commands [default undefined => no exclude]
   */
  public async init(
    discordToken: string,
    clientId: string,
    discordHandler: DiscordHandler,
    commandGuildIds?: string[],
    notCommandGuildIds?: string[]
  ) {
    for (const interaction of this.commandInteractions) {
      if (interaction.Ready) {
        await interaction.Ready;
      }
    }
    const commands = this.commandInteractions.map((command) => command.slashCommandBuilder.toJSON());
    const rest = new REST({ version: '10' }).setToken(discordToken);

    discordHandler.getGuilds().forEach(async (guild: Guild) => {
      if (commandGuildIds && commandGuildIds.indexOf(guild.id) === -1) {
        return;
      } else if (notCommandGuildIds && notCommandGuildIds.indexOf(guild.id) !== -1) {
        return;
      }
      await rest.put(Routes.applicationGuildCommands(clientId, guild.id), { body: commands });
      Logger.info('Successfully registered application commands for guild', guild.name);
      /*const guildRoles = await global.discordHandler.getRolesOfGuild(guild);
      const guildCommands = await guild.commands.fetch();
      const signupRoles = guildRoles.filter(role => config.signupRoles.includes(role.name));
      const permissionsObject: ApplicationCommandPermissionData[] = [];
      signupRoles.forEach(role => permissionsObject.push({
        id: role.id,
        type: 'ROLE',
        permission: true,
      }));
      this.commandInteractions.forEach(interaction => {
        if(interaction.requirePermissions) {
          discordHandler.client
          const applicationCommand = guildCommands.find(appCommand => appCommand.name === interaction.command);
          applicationCommand.permissions.set({

            permissions: permissionsObject,
          });
        }
      })*/
    });

    discordHandler.on('guildCreate', async (guild) => {
      if (commandGuildIds && commandGuildIds.indexOf(guild.id) === -1) {
        return;
      } else if (notCommandGuildIds && notCommandGuildIds.indexOf(guild.id) !== -1) {
        return;
      }
      await rest.put(Routes.applicationGuildCommands(clientId, guild.id), { body: commands });
      Logger.info('Successfully registered application commands for guild', guild.name);
    });
  }

  /**
   * Handles all InteractionTypes.
   * This method needs to be called from a custom Eventhandler
   * for the 'interactionCreate' event.
   *
   * Has an Exception try catch around the actual Interaction Handle.
   * @param interaction the Interaction received
   */
  public async handle(interaction: Interaction) {
    try {
      if (interaction.isButton()) {
        const buttonInteraction = interaction as ButtonInteraction;
        const handler = this.buttonInteractions.find((id) => buttonInteraction.customId.startsWith(id));
        if (handler) {
          await handler.handle(buttonInteraction);
        }
      } else if (interaction.isChatInputCommand()) {
        const commandInteraction = interaction as ChatInputCommandInteraction;
        const handler = this.commandInteractions.find(
          (interactionHandle) => interactionHandle.command === commandInteraction.commandName
        );
        if (handler) {
          await handler.handle(commandInteraction);
        }
      } else if (interaction.type === InteractionType.ApplicationCommandAutocomplete) {
        const commandInteraction: AutocompleteInteraction = interaction as AutocompleteInteraction;
        const handler = this.commandInteractions.find(
          (interactionHandler) =>
            interactionHandler.command === commandInteraction.commandName &&
            interactionHandler instanceof AutocompleteInteractionModel
        );
        if (handler) {
          await (handler as AutocompleteInteractionModel).handleAutocomplete(commandInteraction);
        }
      } else if (interaction.isAnySelectMenu()) {
        const selectMenuInteraction = interaction as AnySelectMenuInteraction;
        if (interaction.isStringSelectMenu() || interaction.isSelectMenu()) {
          const depr_handler = this.selectMenuInteractions.findWithValue(
            (id, model) => selectMenuInteraction.customId.startsWith(id) && model instanceof SelectMenuInteractionModel
          ) as SelectMenuInteractionModel | undefined;
          if (depr_handler) {
            await depr_handler.handle(selectMenuInteraction as SelectMenuInteraction);
          } else {
            const handler = this.selectMenuInteractions.findWithValue(
              (id, model) =>
                selectMenuInteraction.customId.startsWith(id) && model instanceof StringSelectMenuInteractionModel
            ) as StringSelectMenuInteractionModel | undefined;
            if (handler) {
              await handler.handle(selectMenuInteraction as StringSelectMenuInteraction);
            }
          }
        } else if (interaction.isChannelSelectMenu()) {
          const handler = this.selectMenuInteractions.findWithValue(
            (id, model) =>
              selectMenuInteraction.customId.startsWith(id) && model instanceof ChannelSelectMenuInteractionModel
          ) as ChannelSelectMenuInteractionModel | undefined;
          if (handler) {
            await handler.handle(selectMenuInteraction as ChannelSelectMenuInteraction);
          }
        } else if (interaction.isMentionableSelectMenu()) {
          const handler = this.selectMenuInteractions.findWithValue(
            (id, model) =>
              selectMenuInteraction.customId.startsWith(id) && model instanceof MentionableSelectMenuInteractionModel
          ) as MentionableSelectMenuInteractionModel | undefined;
          if (handler) {
            await handler.handle(selectMenuInteraction as MentionableSelectMenuInteraction);
          }
        } else if (interaction.isRoleSelectMenu()) {
          const handler = this.selectMenuInteractions.findWithValue(
            (id, model) =>
              selectMenuInteraction.customId.startsWith(id) && model instanceof RoleSelectMenuInteractionModel
          ) as RoleSelectMenuInteractionModel | undefined;
          if (handler) {
            await handler.handle(selectMenuInteraction as RoleSelectMenuInteraction);
          }
        } else if (interaction.isUserSelectMenu()) {
          const handler = this.selectMenuInteractions.findWithValue(
            (id, model) =>
              selectMenuInteraction.customId.startsWith(id) && model instanceof UserSelectMenuInteractionModel
          ) as UserSelectMenuInteractionModel | undefined;
          if (handler) {
            await handler.handle(selectMenuInteraction as UserSelectMenuInteraction);
          }
        } else {
          const handler = this.selectMenuInteractions.find((id) => selectMenuInteraction.customId.startsWith(id));
          if (handler) {
            await handler.handle(selectMenuInteraction);
          }
        }
      }
    } catch (err) {
      Logger.exception('Error while handling interaction', err, WARNINGLEVEL.ERROR);
    }
  }
}
