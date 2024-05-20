import { ButtonInteraction } from 'discord.js';

export interface IButtonInteractionModel {
  id: string;
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
