import { Interaction, UserSelectMenuBuilder, UserSelectMenuInteraction } from 'discord.js';
import { AnySelectMenuInteractionModel } from './AnySelectMenuInteractionModel';
import { IUserSelectMenuInteractionModel } from '../abstractions/SelectMenuInterationModels/IUserSelectMenuInteractionModel';
/**
 * Represents Implemenation for @see UserSelectMenuInteraction
 */
export abstract class UserSelectMenuInteractionModel
  extends AnySelectMenuInteractionModel
  implements IUserSelectMenuInteractionModel
{
  /**
   * The component that is used to create the select menu
   */
  public readonly component: UserSelectMenuBuilder;

  /**
   * Default constructor
   * @param id the custom-id for this interaction (actual custom-id can be longer, check is done wiht startsWith())
   * @param deferReply The amount of milliseconds to defer the reply if no reply was already made. If undefined, does not defer reply
   * @param deferReplyEphemeral If true, will defer reply as ephemeral, making the reply ephemeral aswell
   */
  constructor(id: string, deferReply = 2000, deferReplyEphemeral = true) {
    super(id, deferReply, deferReplyEphemeral);
    this.component = new UserSelectMenuBuilder().setCustomId(id);
  }

  /**
   * Checks if the given interaction can be handled by this select menu model
   * meaning if the id is the same and the interaction is a @see UserSelectMenuInteraction
   * @param requestedId the id of the interaction
   * @param interaction the interaction to check
   */
  public override canHandle(requestedId: string, interaction: Interaction): boolean {
    return this.id === requestedId && interaction.isUserSelectMenu();
  }

  /**
   * Called when @see UserSelectMenuInteraction was received
   * @param interaction the interaction received
   */
  public abstract override handle(interaction: UserSelectMenuInteraction): Promise<void>;

  /**
   * Calls a deferred reply if the interaction was not replied to / deferred in the given {@link deferReply} timeframe
   * @param interaction the interaction to activate deferred reply for
   */
  public override activateDeferredReply(interaction: UserSelectMenuInteraction) {
    super.activateDeferredReply(interaction);
  }
}
