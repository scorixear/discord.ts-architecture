import {
  ChatInputCommandInteraction,
  SlashCommandStringOption,
  ButtonBuilder,
  ButtonStyle,
  StringSelectMenuBuilder,
  ActionRowBuilder,
  RoleSelectMenuBuilder
} from 'discord.js';
import { CommandInteractionModel, MessageHandler } from '../../lib';
import PingButton from '../buttons/PingButton';
import PingRoleSelectMenu from '../selectMenus/PingRoleSelectMenu';
import PingStringSelectMenu from '../selectMenus/PingStringSelectMenu';

// we extend the CommandInteractionModel to create a new command
export default class PingCommand extends CommandInteractionModel {
  private pingButton: PingButton;
  private pingRoleSelectMenu: PingRoleSelectMenu;
  private pingStringSelectMenu: PingStringSelectMenu;

  // we add some other interaction models used in this command
  public constructor(
    pingButton: PingButton,
    pingRoleSelectMenu: PingRoleSelectMenu,
    pingStringSelectMenu: PingStringSelectMenu
  ) {
    // load the super constructor with all needed information
    super(
      'ping', // The command used in Discord
      'Pings the bot', // The description of the command (not more then 120 characters)
      [
        new SlashCommandStringOption()
          .setName('additional message')
          .setDescription('An additional message to send with the ping')
          .setRequired(false)
      ], // The SlashComandOptions used in this command
      2000, // The amount of milliseconds to defer the reply if no reply was already made. If undefined, does not defer reply
      true, // If true, will defer reply as ephemeral, making the reply ephemeral aswell
      ['admin'] // The roles that are allowed to use the command
    );
    this.pingButton = pingButton;
    this.pingRoleSelectMenu = pingRoleSelectMenu;
    this.pingStringSelectMenu = pingStringSelectMenu;
  }

  // and override the handle method to implement the command
  public override async handle(interaction: ChatInputCommandInteraction): Promise<void> {
    // activate the deferred reply, so if this takes to long, the interaction will be deferred
    this.activateDeferredReply(interaction);
    // check if the user is allowed to use this command
    const allowed = await this.checkPermissions(interaction);
    // if not, we send an error message
    if (allowed == false) {
      // using the MessageHandler to send a reply an ephemeral error
      await MessageHandler.replyError({
        interaction: interaction, // the interaction to reply to
        title: 'No permission', // the title of the reply
        description: 'You are not allowed to use this command', // the description of the reply
        color: 0xff0000, // the color of the reply, if not set, will be 0xff0000 by default
        components: [
          // and lets create some components
          // first a button to retry the command
          // we use the component of the pingButton and set the style to danger
          new ActionRowBuilder<ButtonBuilder>().addComponents([this.pingButton.component.setStyle(ButtonStyle.Danger)]),
          // and a select menu to select an option
          // lets try role select menu
          new ActionRowBuilder<RoleSelectMenuBuilder>().addComponents([this.pingRoleSelectMenu.component])
        ]
      });
      return;
    }

    // the user is allowed
    // so lets get the additional message from the command options
    const additionalMessage = interaction.options.getString('additional message');
    // if the additional message is set, we add it to the reply
    const message = additionalMessage ? `Pong! ${additionalMessage}` : 'Pong!';

    // and we send the reply, this is not ephemeral by default
    await MessageHandler.reply({
      interaction: interaction, // the interaction to reply to
      title: message, // the title of the reply
      components: [
        // and lets create the same components as above
        new ActionRowBuilder<ButtonBuilder>().addComponents([this.pingButton.component]),
        // and try string select menus
        new ActionRowBuilder<StringSelectMenuBuilder>().addComponents([this.pingStringSelectMenu.component])
      ]
    });
  }
}
