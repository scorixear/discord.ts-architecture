import {
  ApplicationCommand,
  ChatInputCommandInteraction,
  GuildMember,
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

/**
 * Represents one SlashCommand and should be extended by custom implementation (overriding the handle method).
 * {@link command} The command used in Discord
 * {@link description} The description of the command (not more then 120 characters)
 * {@link example} An example how to use the command
 * {@link categoy} The category of the command
 * {@link usage} The usage of the command
 * {@link allowedRoles} The roles that are allowed to use the command
 * {@link Ready} A Promise that should be resolved when the command is ready to be used
 * {@link deferReply} The amount of milliseconds to defer the reply if no reply was already made. If undefined, does not defer reply
 * {@link deferReplyEphemeral} If true, will defer reply as ephemeral, making the reply ephemeral aswell
 * {@link slashCommandBuilder} The builder for this command
 */
export abstract class CommandInteractionModel implements ICommandInteractionModel {
  public command: string;
  public description: string;
  public example: string;
  public category: string;
  public usage: string;
  public id?: Record<string, string>;
  public allowedRoles?: RoleResolvable[];
  public Ready?: Promise<any>;
  private deferReply?: number;
  private deferReplyEphemeral: boolean;

  public slashCommandBuilder: SlashCommandBuilder;

  /**
   * Constructs the command
   * @param command The command used in Discord
   * @param description The description of the command (not more then 120 characters)
   * @param example An example how to use the command
   * @param category The category of the command
   * @param usage The usage of the command
   * @param options The SlashComandOptions used in this command
   * @param deferReply The amount of milliseconds to defer th reply if no reply was already made. If undefined, does not defer reply
   * @param deferReplyEphemeral If true, will defer reply as ephemeral, maki9ng the reply ephemeral aswell
   * @param allowedRoles the roles that are allowed to use the command
   */
  constructor(
    command: string,
    description: string,
    example: string,
    category: string,
    usage: string,
    options: any[],
    deferReply: number | undefined = 2000,
    deferReplyEphemeral = false,
    allowedRoles?: RoleResolvable[]
  ) {
    this.command = command;
    this.description = description;
    this.example = example;
    this.category = category;
    this.usage = usage;
    this.slashCommandBuilder = new SlashCommandBuilder().setName(this.command).setDescription(this.description);
    this.allowedRoles = allowedRoles;
    this.deferReply = deferReply;
    this.deferReplyEphemeral = deferReplyEphemeral;
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
   * Called when @see ChatInputCommandInteraction was received
   * @param interaction the interaction received
   */
  public abstract handle(interaction: ChatInputCommandInteraction): Promise<void>;

  /**
   * Calls a deferred reply if the interaction was not replied to / deferred in the given {@link deferReply} timeframe
   * @param interaction the interaction to activate deferred reply for
   */
  public activateDeferredReply(interaction: ChatInputCommandInteraction) {
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
