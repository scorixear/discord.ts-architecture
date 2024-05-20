import { ChatInputCommandInteraction, RoleResolvable, SlashCommandBuilder } from 'discord.js';

export interface ICommandInteractionModel {
  command: string;
  description: string;
  example: string;
  usage: string;
  id?: Record<string, string>;
  allowedRoles?: RoleResolvable[];
  Ready?: Promise<any>;

  slashCommandBuilder: SlashCommandBuilder;

  /**
   * Called when @see ChatInputCommandInteraction was received
   * @param interaction the interaction received
   */
  handle(interaction: ChatInputCommandInteraction): Promise<void>;

  /**
   * Calls a deferred reply if the interaction was not replied to / deferred in the given {@link deferReply} timeframe
   * @param interaction the interaction to activate deferred reply for
   */
  activateDeferredReply(interaction: ChatInputCommandInteraction): void;

  /**
   * Checks if the given command is allowed to be executed by the user
   * @param interaction the Interaction received
   * @returns true if the user has Permission to execute the command
   */
  checkPermissions(interaction: ChatInputCommandInteraction): Promise<boolean>;
}
