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

  public async handle(interaction: ChatInputCommandInteraction) {
    if (this.deferReply) {
      setTimeout(() => {
        if (!interaction.replied) {
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
