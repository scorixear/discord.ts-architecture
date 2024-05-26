import { MentionableSelectMenuBuilder, MentionableSelectMenuInteraction } from 'discord.js';
import { IAnySelectMenuInteractionModel } from './IAnySelectMenuInteractionModel';

/**
 * Represents one MentionableSelectInteraction and should be implemented by custom implementation (overriding the handle method).
 * See @see MentionableSelectMenuInteractionModel for a abstract base class
 */
export interface IMentionableSelectMenuInteractionModel extends IAnySelectMenuInteractionModel {
  /**
   * The component that is used to create the select menu
   */
  readonly component: MentionableSelectMenuBuilder;

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
