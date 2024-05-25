import { RoleSelectMenuInteraction } from 'discord.js';
import { MessageHandler, RoleSelectMenuInteractionModel } from '../../lib';

// This is a simple select menu interaction model that replies with a message when the select menu is used
// A RoleSelectMenuInteraction is a select menu that allows the user to select roles
export default class PingRoleSelectMenu extends RoleSelectMenuInteractionModel {
  public constructor() {
    // we call the super constructor with the id of the select menu and the defer time
    super('ping-role-select-menu', 2000, true);
  }

  // we override the handle method to implement the select menu interaction handling
  override async handle(interaction: RoleSelectMenuInteraction): Promise<void> {
    // we activate the deferred reply if this takes too long
    this.activateDeferredReply(interaction);
    // get the roles that were selected
    const roles = interaction.roles.map((role) => role.name).join(', ');
    // and reply with a simple message
    await MessageHandler.reply({
      interaction: interaction,
      title: 'Pong!',
      description: `You selected the roles: ${roles}`
    });
  }
}
