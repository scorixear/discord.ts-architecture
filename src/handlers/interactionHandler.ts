import {
  AutocompleteInteraction,
  ButtonInteraction,
  ChatInputCommandInteraction,
  Guild,
  Interaction
} from 'discord.js';

import { ButtonInteractionModel } from '../model/ButtonInteractionModel';
import { CommandInteractionModel } from '../model/CommandInteractionModel';
import { REST } from '@discordjs/rest';
import { InteractionType, Routes } from 'discord-api-types/v10';
import { Logger, WARNINGLEVEL } from '../helpers/logging';
import { AutocompleteInteractionModel } from '../model/AutocompleteInteractionModel';
import { TwoWayMap } from '../model/TwoWayMap';
import { DiscordHandler } from './discordHandler';

export class InteractionHandler {
  public buttonInteractions: TwoWayMap<string, ButtonInteractionModel>;
  private commandInteractions: CommandInteractionModel[];
  constructor(
    buttonInteractions: TwoWayMap<string, ButtonInteractionModel>,
    commandInteractions: CommandInteractionModel[],
    afterInit: (models: CommandInteractionModel[]) => void
  ) {
    this.buttonInteractions = buttonInteractions;
    this.commandInteractions = commandInteractions;
    afterInit(this.commandInteractions);
  }

  public async Init(
    discordToken: string,
    clientId: string,
    discordHandler: DiscordHandler,
    commandGuildIds?: string[]
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
  }

  public async handle(interaction: Interaction) {
    try {
      if (interaction.isButton()) {
        const buttonInteraction = interaction as ButtonInteraction;
        const interactionHandle = this.buttonInteractions.find((id) => buttonInteraction.customId.startsWith(id));
        if (interactionHandle) {
          await interactionHandle.handle(buttonInteraction);
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
      } else {
        return;
      }
    } catch (err) {
      Logger.exception('Error while handling interaction', err, WARNINGLEVEL.ERROR);
    }
  }
}
