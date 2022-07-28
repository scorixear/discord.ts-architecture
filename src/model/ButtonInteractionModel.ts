import { ButtonInteraction } from 'discord.js';
import { Logger, WARNINGLEVEL } from '../helpers/logging';

export abstract class ButtonInteractionModel {
  public id: string;
  private deferReply?: number;
  private deferReplyEphemeral: boolean;
  constructor(id: string, deferReply: number | undefined = 2000, deferReplyEphemeral = true) {
    this.id = id;
    this.deferReply = deferReply;
    this.deferReplyEphemeral = deferReplyEphemeral;
  }

  public async handle(interaction: ButtonInteraction) {
    // set interaction as handled
    if (this.deferReply) {
      setTimeout(async () => {
        try {
          await interaction.deferReply({ ephemeral: this.deferReplyEphemeral });
        } catch (err) {
          Logger.exception('Error deferring reply', err, WARNINGLEVEL.ERROR);
        }
      }, this.deferReply);
    }
  }
}
