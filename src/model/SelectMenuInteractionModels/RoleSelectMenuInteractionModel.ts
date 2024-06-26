import { Interaction, RoleSelectMenuBuilder, RoleSelectMenuInteraction } from 'discord.js';
import { AnySelectMenuInteractionModel } from './AnySelectMenuInteractionModel';
import { IRoleSelectMenuInteractionModel } from '../abstractions/SelectMenuInterationModels/IRoleSelectMenuInteractionModel';
/**
 * Represents Implemenation for @see RoleSelectMenuInteraction
 */
export abstract class RoleSelectMenuInteractionModel
  extends AnySelectMenuInteractionModel
  implements IRoleSelectMenuInteractionModel
{
  /**
   * The component that is used to create the select menu
   */
  public readonly component: RoleSelectMenuBuilder;

  /**
   * Default constructor
   * @param id the custom-id for this interaction (actual custom-id can be longer, check is done wiht startsWith())
   * @param deferReply The amount of milliseconds to defer the reply if no reply was already made. If undefined, does not defer reply
   * @param deferReplyEphemeral If true, will defer reply as ephemeral, making the reply ephemeral aswell
   */
  constructor(id: string, deferReply = 2000, deferReplyEphemeral = true) {
    super(id, deferReply, deferReplyEphemeral);
    this.component = new RoleSelectMenuBuilder().setCustomId(id);
  }

  /**
   * Checks if the given interaction can be handled by this select menu model
   * meaning if the id is the same and the interaction is a @see RoleSelectMenuInteraction
   * @param requestedId the id of the interaction
   * @param interaction the interaction to check
   */
  public override canHandle(requestedId: string, interaction: Interaction): boolean {
    return this.id === requestedId && interaction.isRoleSelectMenu();
  }

  /**
   * Called when @see RoleSelectMenuInteraction was received
   * @param interaction the interaction received
   */
  public abstract override handle(interaction: RoleSelectMenuInteraction): Promise<void>;

  /**
   * Calls a deferred reply if the interaction was not replied to / deferred in the given {@link deferReply} timeframe
   * @param interaction the interaction to activate deferred reply for
   */
  public override activateDeferredReply(interaction: RoleSelectMenuInteraction) {
    super.activateDeferredReply(interaction);
  }
}
