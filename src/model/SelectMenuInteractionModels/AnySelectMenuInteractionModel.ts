import { AnySelectMenuInteraction } from 'discord.js';
import { Logger } from '../../logging/logger';
import { WarningLevel } from '../../logging/warninglevel';
import { IAnySelectMenuInteractionModel } from '../abstractions/SelectMenuInterationModels/IAnySelectMenuInteractionModel';
/**
 * Represents Implemenation for @see AnySelectMenuInteraction
 */
export abstract class AnySelectMenuInteractionModel implements IAnySelectMenuInteractionModel {
  /**
   * The custom-id for this interaction (actual custom-id can be longer, only start is checked)
   * @type {string}
   * @memberof AnySelectMenuInteractionModel
   * @public
   */
  public id: string;
  /**
   * The amount of milliseconds to defer the reply if no reply was already made. If undefined, does not defer reply
   * @type {number}
   * @memberof AnySelectMenuInteractionModel
   * @public
   * @readonly
   */
  public readonly deferReply?: number;
  /**
   * If true, will defer reply as ephemeral, making the reply ephemeral aswell
   * @type {boolean}
   * @memberof AnySelectMenuInteractionModel
   * @public
   * @readonly
   */
  public readonly deferReplyEphemeral?: boolean;

  /**
   * Default constructor
   * @param id the custom-id for this interaction (actual custom-id can be longer, check is done wiht startsWith())
   * @param deferReply The amount of milliseconds to defer the reply if no reply was already made. If undefined, does not defer reply
   * @param deferReplyEphemeral If true, will defer reply as ephemeral, making the reply ephemeral aswell
   */
  constructor(id: string, deferReply = 2000, deferReplyEphemeral = true) {
    this.id = id;
    this.deferReply = deferReply;
    this.deferReplyEphemeral = deferReplyEphemeral;
  }

  /**
   * Called when @see AnySelectMenuInteraction was received
   * @param interaction the interaction received
   */
  public abstract handle(interaction: AnySelectMenuInteraction): Promise<void>;

  /**
   * Calls a deferred reply if the interaction was not replied to / deferred in the given {@link deferReply} timeframe
   * @param interaction the interaction to activate deferred reply for
   */
  public activateDeferredReply(interaction: AnySelectMenuInteraction) {
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
