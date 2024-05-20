import { UserSelectMenuInteraction } from 'discord.js';
import { IAnySelectMenuInteractionModel } from './IAnySelectMenuInteractionModel';

export interface IUserSelectMenuInteractionModel extends IAnySelectMenuInteractionModel {
  /**
   * Called when @see UserSelectMenuInteraction was received
   * @param interaction the interaction received
   */
  handle(interaction: UserSelectMenuInteraction): Promise<void>;

  /**
   * Calls a deferred reply if the interaction was not replied to / deferred in the given {@link deferReply} timeframe
   * @param interaction the interaction to activate deferred reply for
   */
  activateDeferredReply(interaction: UserSelectMenuInteraction): void;
}
