import { ChatInputCommandInteraction, RoleResolvable, SlashCommandBuilder } from 'discord.js';
import { IBaseInteractionModel } from './IBaseInteractionModel';

/**
 * Represents one SlashCommand and should be implemented by custom implementation (overriding the handle method).
 * See @see CommandInteractionModel for a abstract base class
 */
export interface ICommandInteractionModel extends IBaseInteractionModel {
  /**
   * The command used in Discord
   * @type {string}
   * @memberof ICommandInteractionModel
   * @public
   * @readonly
   */
  readonly command: string;
  /**
   * The description of the command (not more then 120 characters)
   * @type {string}
   * @memberof ICommandInteractionModel
   * @public
   * @readonly
   */
  readonly description: string;
  /**
   * The roles that are allowed to use the command
   * @type {RoleResolvable[]}
   * @memberof ICommandInteractionModel
   * @public
   * @readonly
   */
  readonly allowedRoles?: RoleResolvable[];
  /**
   * A Promise that should be resolved when the command is ready to be used
   * @type {Promise<any>}
   * @memberof ICommandInteractionModel
   * @public
   * @readonly
   */
  readonly Ready?: Promise<any>;
  /**
   * The builder used for this command
   * @type {SlashCommandBuilder}
   * @memberof ICommandInteractionModel
   * @public
   * @readonly
   */
  readonly slashCommandBuilder: SlashCommandBuilder;

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
