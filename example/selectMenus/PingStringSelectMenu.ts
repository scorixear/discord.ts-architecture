import { StringSelectMenuInteraction } from 'discord.js';
import { MessageHandler, StringSelectMenuInteractionModel } from '../../lib';

// This is a simple select menu interaction model that replies with a message when the select menu is used
// A StringSelectMenuInteraction is a select menu that allows the user to select strings
export default class PingStringSelectMenu extends StringSelectMenuInteractionModel {
  public constructor() {
    // we call the super constructor with the id of the select menu and the defer time
    super('ping-string-select-menu', 2000, true);
  }

  // we override the handle method to implement the select menu interaction handling
  override async handle(interaction: StringSelectMenuInteraction): Promise<void> {
    // we activate the deferred reply if this takes too long
    this.activateDeferredReply(interaction);
    // get the strings that were selected
    const strings = interaction.values.join(', ');
    // and reply with a simple message
    await MessageHandler.reply({
      interaction: interaction,
      title: 'Pong!',
      description: `You selected the string: ${strings}`
    });
  }
}
