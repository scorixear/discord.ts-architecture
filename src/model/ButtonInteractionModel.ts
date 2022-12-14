import { ButtonInteraction } from 'discord.js';
import { Logger, WARNINGLEVEL } from '../helpers/logging';

/**
 * Represents a Button Interaction
 * {@link id} the custom-id for this interaction (actual custom-id can be longer, only start is checked)
 */
export abstract class ButtonInteractionModel {
  public id: string;
  private deferReply?: number;
  private deferReplyEphemeral: boolean;
  /**
   * Default constructor
   * @param id the custom-id for this interaction (actual custom-id can be longer, check is done wiht startsWith())
   * @param deferReply The amount of milliseconds to defer the reply if no reply was already made. If undefined, does not defer reply
   * @param deferReplyEphemeral If true, will defer reply as ephemeral, making the reply ephemeral aswell
   */
  constructor(id: string, deferReply: number | undefined = 2000, deferReplyEphemeral = true) {
    this.id = id;
    this.deferReply = deferReply;
    this.deferReplyEphemeral = deferReplyEphemeral;
  }

  /**
   * Called when @see ButtonInteraction was received
   * @param interaction the interaction received
   */
  public async handle(interaction: ButtonInteraction) {
    if (this.deferReply) {
      setTimeout(async () => {
        try {
          if (!interaction.replied && !interaction.deferred) {
            await interaction.deferReply({ ephemeral: this.deferReplyEphemeral });
          }
        } catch (err) {
          Logger.exception('Error deferring reply', err, WARNINGLEVEL.ERROR);
        }
      }, this.deferReply);
    }
  }
}
