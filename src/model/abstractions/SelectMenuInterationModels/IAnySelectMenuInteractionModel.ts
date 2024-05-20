import { AnySelectMenuInteraction } from 'discord.js';

export interface IAnySelectMenuInteractionModel {
  id: string;
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
