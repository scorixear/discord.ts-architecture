import { ButtonInteraction } from 'discord.js';
import { ButtonInteractionModel, MessageHandler } from '../../lib';

// This is a simple button interaction model that replies with a message when the button is clicked
export default class PingButton extends ButtonInteractionModel {
  public constructor() {
    // we call the super constructor with the id of the button and the defer time
    super('ping-button', 2000, true);
  }

  override async handle(interaction: ButtonInteraction): Promise<void> {
    // we activate the deferred reply if this takes too long
    this.activateDeferredReply(interaction);
    // we reply with a simple message
    await MessageHandler.reply({
      interaction: interaction,
      title: 'Pong!',
      description: 'You clicked the button!',
      color: 0x00ff00
    });
  }
}
