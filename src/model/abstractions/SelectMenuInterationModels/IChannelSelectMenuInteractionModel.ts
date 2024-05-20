import { ChannelSelectMenuInteraction } from 'discord.js';
import { IAnySelectMenuInteractionModel } from './IAnySelectMenuInteractionModel';

/**
 * Represents one ChannelSelectInteraction and should be implemented by custom implementation (overriding the handle method).
 * See @see ChannelSelectMenuInteractionModel for a abstract base class
 */
export interface IChannelSelectMenuInteractionModel extends IAnySelectMenuInteractionModel {
  /**
   * Called when @see ChannelSelectMenuInteraction was received
   * @param interaction the interaction received
   */
  handle(interaction: ChannelSelectMenuInteraction): Promise<void>;
  /**
   * Calls a deferred reply if the interaction was not replied to / deferred in the given {@link deferReply} timeframe
   * @param interaction the interaction to activate deferred reply for
   */
  activateDeferredReply(interaction: ChannelSelectMenuInteraction): void;
}
