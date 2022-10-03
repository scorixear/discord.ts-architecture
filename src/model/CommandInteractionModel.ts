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
  SlashCommandUserOption
} from 'discord.js';

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
export abstract class CommandInteractionModel {
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
      } else {
        throw new Error('Not supported SlashCommand Option');
      }
    }
  }

  /**
   * Called when Interaction was received. You might want to call super.handle()
   * to activate defer reply and permission checking
   * @param interaction the Interaction received
   * @returns none
   * @throws Error user is not allowed to execute the command
   */
  public async handle(interaction: ChatInputCommandInteraction) {
    if (this.deferReply) {
      setTimeout(() => {
        if (!interaction.replied && !interaction.deferred) {
          interaction.deferReply({ ephemeral: this.deferReplyEphemeral });
        }
      }, this.deferReply);
    }

    if (this.allowedRoles && interaction.guild) {
      const applicationCommands = await interaction.guild.commands.fetch();
      const applicationCommand = applicationCommands.find(
        (command: ApplicationCommand) => command.name === this.command
      );

      if (applicationCommand) {
        const member = await (interaction.member as GuildMember).fetch();
        if (member.user.id === process.env.OWNER_ID) {
          return;
        }
        if (member.roles.cache.find((role: Role) => this.allowedRoles?.includes(role) ?? false)) {
          return;
        }
        throw Error('No permission');
      }
    }
  }
}
