import { MentionableSelectMenuInteraction } from 'discord.js';
import { IAnySelectMenuInteractionModel } from './IAnySelectMenuInteractionModel';

export interface IMentionableSelectMenuInteractionModel extends IAnySelectMenuInteractionModel {
  /**
   * Called when @see MentionableSelectMenuInteraction was received
   * @param interaction the interaction received
   */
  handle(interaction: MentionableSelectMenuInteraction): Promise<void>;

  /**
   * Calls a deferred reply if the interaction was not replied to / deferred in the given {@link deferReply} timeframe
   * @param interaction the interaction to activate deferred reply for
   */
  activateDeferredReply(interaction: MentionableSelectMenuInteraction): void;
}
