import { ButtonInteraction } from 'discord.js';
import { IBaseInteractionModel } from './IBaseInteractionModel';

/**
 * Represents a Button Interaction and should be implemented by custom implementation (overriding the handle method).
 * See @see ButtonInteractionModel for a abstract base class
 */
export interface IButtonInteractionModel extends IBaseInteractionModel {
  /**
   * Called when @see ButtonInteraction was received
   * @param interaction the interaction received
   */
  handle(interaction: ButtonInteraction): Promise<void>;
  /**
   * Calls a deferred reply if the interaction was not replied to / deferred in the given {@link deferReply} timeframe
   * @param interaction the interaction to activate deferred reply for
   */
  activateDeferredReply(interaction: ButtonInteraction): void;
}
