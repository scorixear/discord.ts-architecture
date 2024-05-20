import { ChatInputCommandInteraction, RoleResolvable, SlashCommandBuilder } from 'discord.js';

/**
 * Represents one SlashCommand and should be implemented by custom implementation (overriding the handle method).
 * See @see CommandInteractionModel for a abstract base class
 */
export interface ICommandInteractionModel {
  /**
   * The command used in Discord
   * @type {string}
   * @memberof ICommandInteractionModel
   * @public
   */
  command: string;
  /**
   * The description of the command (not more then 120 characters)
   * @type {string}
   * @memberof ICommandInteractionModel
   * @public
   */
  description: string;
  /**
   * An example how to use the command
   * @type {string}
   * @memberof ICommandInteractionModel
   * @public
   */
  example: string;
  /**
   * The category of the command
   * @type {string}
   * @memberof ICommandInteractionModel
   * @public
   */
  category: string;
  /**
   * The usage of the command
   * @type {string}
   * @memberof ICommandInteractionModel
   * @public
   */
  usage: string;
  /**
   * The roles that are allowed to use the command
   * @type {RoleResolvable[]}
   * @memberof ICommandInteractionModel
   * @public
   */
  allowedRoles?: RoleResolvable[];
  /**
   * A Promise that should be resolved when the command is ready to be used
   * @type {Promise<any>}
   * @memberof ICommandInteractionModel
   * @public
   */
  Ready?: Promise<any>;
  /**
   * The builder used for this command
   * @type {SlashCommandBuilder}
   * @memberof ICommandInteractionModel
   * @public
   */
  slashCommandBuilder: SlashCommandBuilder;

  /**
   * The amount of milliseconds to defer the reply if no reply was already made. If undefined, does not defer reply
   * @type {number}
   * @public
   * @readonly
   */
  readonly deferReply?: number;
  /**
   * If true, will defer reply as ephemeral, making the reply ephemeral aswell
   * @type {boolean}
   * @public
   * @readonly
   */
  readonly deferReplyEphemeral?: boolean;

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
