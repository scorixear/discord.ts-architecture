import { StringSelectMenuInteraction } from 'discord.js';
import { IAnySelectMenuInteractionModel } from './IAnySelectMenuInteractionModel';

/**
 * Represents one StringSelectInteraction and should be implemented by custom implementation (overriding the handle method).
 * See @see StringSelectMenuInteractionModel for a abstract base class
 */
export interface IStringSelectMenuInteractionModel extends IAnySelectMenuInteractionModel {
  /**
   * Called when @see StringSelectMenuInteraction was received
   * @param interaction the interaction received
   */
  handle(interaction: StringSelectMenuInteraction): Promise<void>;

  /**
   * Calls a deferred reply if the interaction was not replied to / deferred in the given {@link deferReply} timeframe
   * @param interaction the interaction to activate deferred reply for
   */
  activateDeferredReply(interaction: StringSelectMenuInteraction): void;
}
