import { RoleSelectMenuBuilder, RoleSelectMenuInteraction } from 'discord.js';
import { IAnySelectMenuInteractionModel } from './IAnySelectMenuInteractionModel';

/**
 * Represents one RoleSelectInteraction and should be implemented by custom implementation (overriding the handle method).
 * See @see RoleSelectMenuInteractionModel for a abstract base class
 */
export interface IRoleSelectMenuInteractionModel extends IAnySelectMenuInteractionModel {
  /**
   * The component that is used to create the select menu
   */
  readonly component: RoleSelectMenuBuilder;

  /**
   * Called when @see RoleSelectMenuInteraction was received
   * @param interaction the interaction received
   */
  handle(interaction: RoleSelectMenuInteraction): Promise<void>;

  /**
   * Calls a deferred reply if the interaction was not replied to / deferred in the given {@link deferReply} timeframe
   * @param interaction the interaction to activate deferred reply for
   */
  activateDeferredReply(interaction: RoleSelectMenuInteraction): void;
}
