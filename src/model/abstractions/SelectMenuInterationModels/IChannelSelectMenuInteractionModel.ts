import { ChannelSelectMenuBuilder, ChannelSelectMenuInteraction } from 'discord.js';
import { IAnySelectMenuInteractionModel } from './IAnySelectMenuInteractionModel';

/**
 * Represents one ChannelSelectInteraction and should be implemented by custom implementation (overriding the handle method).
 * See @see ChannelSelectMenuInteractionModel for a abstract base class
 */
export interface IChannelSelectMenuInteractionModel extends IAnySelectMenuInteractionModel {
  /**
   * The component that is used to create the select menu
   */
  readonly component: ChannelSelectMenuBuilder;

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
