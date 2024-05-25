import { Interaction } from 'discord.js';
import { IBaseInteractionModel } from './abstractions/IBaseInteractionModel';

/**
 * Represents a Base Interaction and should not be used as a base class for custom implementations.
 */
export abstract class BaseInteractionModel implements IBaseInteractionModel {
  /**
   * The custom-id for this interaction
   * @type {string}
   * @memberof BaseInteractionModel
   * @public
   * @readonly
   */
  public readonly id: string;
  /**
   * The amount of milliseconds to defer the reply if no reply was already made. If undefined, does not defer reply
   * @type {number}
   * @public
   * @readonly
   */
  public readonly deferReply?: number;
  /**
   * If true, will defer reply as ephemeral, making the reply ephemeral aswell
   * @type {boolean}
   * @public
   * @readonly
   */
  public readonly deferReplyEphemeral?: boolean;

  /**
   * Default constructor
   * @param id the custom-id for this interaction (actual custom-id can be longer, check is done wiht startsWith())
   * @param deferReply The amount of milliseconds to defer the reply if no reply was already made. If undefined, does not defer reply
   * @param deferReplyEphemeral If true, will defer reply as ephemeral, making the reply ephemeral aswell
   */
  constructor(id: string, deferReply: number | undefined = 2000, deferReplyEphemeral = true) {
    this.id = id;
    this.deferReply = deferReply;
    this.deferReplyEphemeral = deferReplyEphemeral;
  }
  /**
   * Checks if the given interaction can be handled by this interactionModel
   * meaning if the id is the same and the interaction is assigned to this interactionModel
   * @param requestedId the id of the interaction
   * @param interaction the interaction to check
   */
  public abstract canHandle(requestedId: string, interaction: Interaction): boolean;

  /**
   * Called when @see Interaction was received
   * @param interaction the interaction received
   */
  public abstract handle(interaction: Interaction): Promise<void>;

  /**
   * Calls a deferred reply if the interaction was not replied to / deferred in the given {@link deferReply} timeframe
   * @param interaction the interaction to activate deferred reply for
   */
  public abstract activateDeferredReply(interaction: Interaction): void;
}
