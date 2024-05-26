import { AnySelectMenuInteraction, Interaction } from 'discord.js';
import { Logger } from '../../logging/logger';
import { WarningLevel } from '../../logging/warninglevel';
import { IAnySelectMenuInteractionModel } from '../abstractions/SelectMenuInterationModels/IAnySelectMenuInteractionModel';
import { BaseInteractionModel } from '../BaseInteractionModel';
/**
 * Represents Implemenation for @see AnySelectMenuInteraction
 * Do not use this class directly as a base class but rather use any extended classes such as @see StringSelectMenuInteractionModel or @see MentionableSelectMenuInteractionModel
 */
export abstract class AnySelectMenuInteractionModel
  extends BaseInteractionModel
  implements IAnySelectMenuInteractionModel
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
   * Checks if the given interaction can be handled by this select menu model
   * meaning if the id is the same and the interaction is a @see AnySelectMenuInteraction
   * @param requestedId the id of the interaction
   * @param interaction the interaction to check
   */
  public override canHandle(requestedId: string, interaction: Interaction): boolean {
    return this.id === requestedId && interaction.isAnySelectMenu();
  }

  /**
   * Called when @see AnySelectMenuInteraction was received
   * @param interaction the interaction received
   */
  public abstract override handle(interaction: AnySelectMenuInteraction): Promise<void>;

  /**
   * Calls a deferred reply if the interaction was not replied to / deferred in the given {@link deferReply} timeframe
   * @param interaction the interaction to activate deferred reply for
   */
  public override activateDeferredReply(interaction: AnySelectMenuInteraction) {
    if (this.deferReply) {
      setTimeout(async () => {
        try {
          if (!interaction.replied && !interaction.deferred) {
            await interaction.deferReply({ ephemeral: this.deferReplyEphemeral });
          }
        } catch (err) {
          Logger.exception('Error deferring reply', err, WarningLevel.ERROR);
        }
      }, this.deferReply);
    }
  }
}
