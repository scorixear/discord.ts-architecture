import { AnySelectMenuInteraction } from 'discord.js';

/**
 * Represents one SelectMenuInteraction and should be implemented by custom implementation (overriding the handle method).
 * See @see AnySelectMenuInteractionModel for a abstract base class
 */
export interface IAnySelectMenuInteractionModel {
  id: string;
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
   * Called when @see AnySelectMenuInteraction was received
   * @param interaction the interaction received
   */
  handle(interaction: AnySelectMenuInteraction): Promise<void>;
  /**
   * Calls a deferred reply if the interaction was not replied to / deferred in the given {@link deferReply} timeframe
   * @param interaction the interaction to activate deferred reply for
   */
  activateDeferredReply(interaction: AnySelectMenuInteraction): void;
}
