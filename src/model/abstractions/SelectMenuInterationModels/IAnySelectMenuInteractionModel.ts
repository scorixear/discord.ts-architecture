import { AnySelectMenuInteraction } from 'discord.js';
import { IBaseInteractionModel } from '../IBaseInteractionModel';

/**
 * Represents one SelectMenuInteraction and should be implemented by custom implementation (overriding the handle method).
 * See @see AnySelectMenuInteractionModel for a abstract base class
 */
export interface IAnySelectMenuInteractionModel extends IBaseInteractionModel {
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
