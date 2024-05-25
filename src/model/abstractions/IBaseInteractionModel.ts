import { Interaction } from 'discord.js';

export interface IBaseInteractionModel {
  /**
   * The custom-id for this interaction
   * @type {string}
   * @public
   * @readonly
   */
  readonly id: string;
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
   * Checks if the given interaction can be handled by this interactionModel
   * meaning if the id is the same and the interaction is assigned to this interactionModel
   * @param requestedId the id of the interaction
   * @param interaction the interaction to check
   */
  canHandle(requestedId: string, interaction: Interaction): boolean;

  /**
   * Called when @see Interaction was received
   * @param interaction the interaction received
   */
  handle(interaction: Interaction): Promise<void>;

  /**
   * Calls a deferred reply if the interaction was not replied to / deferred in the given {@link deferReply} timeframe
   * @param interaction the interaction to activate deferred reply for
   */
  activateDeferredReply(interaction: Interaction): void;
}
