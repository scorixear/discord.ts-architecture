import { StringSelectMenuInteraction } from 'discord.js';
import { AnySelectMenuInteractionModel } from './AnySelectMenuInteractionModel';
import { IStringSelectMenuInteractionModel } from '../abstractions/SelectMenuInterationModels/IStringSelectMenuInteractionModel';
/**
 * Represents Implemenation for @see StringSelectMenuInteraction
 */
export abstract class StringSelectMenuInteractionModel
  extends AnySelectMenuInteractionModel
  implements IStringSelectMenuInteractionModel
{
  /**
   * Default constructor
   * @param id the custom-id for this interaction (actual custom-id can be longer, check is done wiht startsWith())
   * @param deferReply The amount of milliseconds to defer the reply if no reply was already made. If undefined, does not defer reply
   * @param deferReplyEphemeral If true, will defer reply as ephemeral, making the reply ephemeral aswell
   */
  constructor(id: string, deferReply = 2000, deferReplyEphemeral = true) {
    super(id, deferReply, deferReplyEphemeral);
  }

  /**
   * Called when @see StringSelectMenuInteraction was received
   * @param interaction the interaction received
   */
  public abstract override handle(interaction: StringSelectMenuInteraction): Promise<void>;

  /**
   * Calls a deferred reply if the interaction was not replied to / deferred in the given {@link deferReply} timeframe
   * @param interaction the interaction to activate deferred reply for
   */
  public override activateDeferredReply(interaction: StringSelectMenuInteraction) {
    super.activateDeferredReply(interaction);
  }
}
