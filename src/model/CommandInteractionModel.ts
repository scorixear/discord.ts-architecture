import {
  ApplicationCommand,
  ChatInputCommandInteraction,
  GuildMember,
  Interaction,
  Role,
  RoleResolvable,
  SlashCommandAttachmentOption,
  SlashCommandBooleanOption,
  SlashCommandBuilder,
  SlashCommandChannelOption,
  SlashCommandIntegerOption,
  SlashCommandMentionableOption,
  SlashCommandNumberOption,
  SlashCommandRoleOption,
  SlashCommandStringOption,
  SlashCommandSubcommandBuilder,
  SlashCommandSubcommandGroupBuilder,
  SlashCommandUserOption
} from 'discord.js';
import { Logger } from '../logging/logger';
import { WarningLevel } from '../logging/warninglevel';
import { ICommandInteractionModel } from './abstractions/ICommandInteractionModel';
import { InteractionHandler } from '../handlers/interactionHandler';
import { BaseInteractionModel } from './BaseInteractionModel';

/**
 * Represents one SlashCommand and should be extended by custom implementation (overriding the handle method).
 */
export abstract class CommandInteractionModel extends BaseInteractionModel implements ICommandInteractionModel {
  /**
   * The command used in Discord
   * @type {string}
   * @memberof CommandInteractionModel
   * @public
   * @readonly
   */
  public readonly command: string;
  /**
   * The description of the command (not more then 120 characters)
   * @type {string}
   * @memberof CommandInteractionModel
   * @public
   * @readonly
   */
  public readonly description: string;
  /**
   * The roles that are allowed to use the command
   * @type {RoleResolvable[]}
   * @memberof CommandInteractionModel
   * @public
   * @readonly
   */
  public readonly allowedRoles?: RoleResolvable[];
  /**
   * A Promise that should be resolved when the command is ready to be used
   * @type {Promise<any>}
   * @memberof CommandInteractionModel
   * @public
   * @readonly
   */
  public readonly Ready?: Promise<any>;
  /**
   * The builder used for this command
   * @type {SlashCommandBuilder}
   * @memberof CommandInteractionModel
   * @public
   * @readonly
   */
  public readonly slashCommandBuilder: SlashCommandBuilder;

  /**
   * The interaction handler that is used to handle the interaction
   * @type {InteractionHandler}
   * @memberof CommandInteractionModel
   * @protected
   */
  protected interactionHandler: InteractionHandler | null = null;

  /**
   * Constructs the command
   * @param command The command used in Discord
   * @param description The description of the command (not more then 120 characters)
   * @param options The SlashComandOptions used in this command
   * @param deferReply The amount of milliseconds to defer th reply if no reply was already made. If undefined, does not defer reply
   * @param deferReplyEphemeral If true, will defer reply as ephemeral, maki9ng the reply ephemeral aswell
   * @param allowedRoles the roles that are allowed to use the command
   */
  constructor(
    command: string,
    description: string,
    options: any[],
    deferReply: number | undefined = 2000,
    deferReplyEphemeral = false,
    allowedRoles?: RoleResolvable[]
  ) {
    super(command, deferReply, deferReplyEphemeral);
    this.command = command;
    this.description = description;
    this.slashCommandBuilder = new SlashCommandBuilder().setName(this.command).setDescription(this.description);
    this.allowedRoles = allowedRoles;
    for (const option of options) {
      if (option instanceof SlashCommandChannelOption) {
        this.slashCommandBuilder.addChannelOption(option);
      } else if (option instanceof SlashCommandStringOption) {
        this.slashCommandBuilder.addStringOption(option);
      } else if (option instanceof SlashCommandBooleanOption) {
        this.slashCommandBuilder.addBooleanOption(option);
      } else if (option instanceof SlashCommandUserOption) {
        this.slashCommandBuilder.addUserOption(option);
      } else if (option instanceof SlashCommandIntegerOption) {
        this.slashCommandBuilder.addIntegerOption(option);
      } else if (option instanceof SlashCommandAttachmentOption) {
        this.slashCommandBuilder.addAttachmentOption(option);
      } else if (option instanceof SlashCommandRoleOption) {
        this.slashCommandBuilder.addRoleOption(option);
      } else if (option instanceof SlashCommandNumberOption) {
        this.slashCommandBuilder.addNumberOption(option);
      } else if (option instanceof SlashCommandMentionableOption) {
        this.slashCommandBuilder.addMentionableOption(option);
      } else if (option instanceof SlashCommandSubcommandBuilder) {
        this.slashCommandBuilder.addSubcommand(option);
      } else if (option instanceof SlashCommandSubcommandGroupBuilder) {
        this.slashCommandBuilder.addSubcommandGroup(option);
      } else {
        throw new Error('Not supported SlashCommand Option');
      }
    }
  }

  /**
   * Checks if the given interaction can be handled by this command
   * meaning if the id is the same and the interaction is a @see ChatInputCommandInteraction
   * @param requestedId the id of the interaction
   * @param interaction the interaction to check
   */
  public override canHandle(requestedId: string, interaction: Interaction): boolean {
    return this.command === requestedId && interaction.isChatInputCommand();
  }

  /**
   * Called when @see ChatInputCommandInteraction was received
   * @param interaction the interaction received
   */
  public abstract override handle(interaction: ChatInputCommandInteraction): Promise<void>;

  /**
   * Calls a deferred reply if the interaction was not replied to / deferred in the given {@link deferReply} timeframe
   * @param interaction the interaction to activate deferred reply for
   */
  public override activateDeferredReply(interaction: ChatInputCommandInteraction) {
    if (this.deferReply) {
      setTimeout(async () => {
        try {
          if (!interaction.replied && !interaction.deferred) {
            await interaction.deferReply({ ephemeral: this.deferReplyEphemeral });
          }
        } catch (err) {
          Logger.exception('Error deferring reply', err, WarningLevel.ERROR);
        }
      }, this.deferReply);
    }
  }

  /**
   * Checks if the given command is allowed to be executed by the user
   * @param interaction the Interaction received
   * @returns true if the user has Permission to execute the command
   */
  public async checkPermissions(interaction: ChatInputCommandInteraction): Promise<boolean> {
    if (this.allowedRoles && interaction.guild) {
      const applicationCommands = await interaction.guild.commands.fetch();
      const applicationCommand = applicationCommands.find(
        (command: ApplicationCommand) => command.name === this.command
      );

      if (applicationCommand) {
        const member = await (interaction.member as GuildMember).fetch();
        if (member.user.id === process.env.OWNER_ID) {
          return true;
        }
        if (member.roles.cache.find((role: Role) => this.allowedRoles?.includes(role) ?? false)) {
          return true;
        }
        return false;
      }
    }
    return true;
  }
}
