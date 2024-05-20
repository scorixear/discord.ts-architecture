import { ChannelSelectMenuInteraction } from 'discord.js';
import { IAnySelectMenuInteractionModel } from './IAnySelectMenuInteractionModel';

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
