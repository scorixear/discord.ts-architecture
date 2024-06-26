import { UserSelectMenuBuilder, UserSelectMenuInteraction } from 'discord.js';
import { IAnySelectMenuInteractionModel } from './IAnySelectMenuInteractionModel';

/**
 * Represents one UserSelectInteraction and should be implemented by custom implementation (overriding the handle method).
 * See @see UserSelectMenuInteractionModel for a abstract base class
 */
export interface IUserSelectMenuInteractionModel extends IAnySelectMenuInteractionModel {
  /**
   * The component that is used to create the select menu
   */
  readonly component: UserSelectMenuBuilder;

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
