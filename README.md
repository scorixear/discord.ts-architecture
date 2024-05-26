# discord.ts-architecture
![GitHub License](https://img.shields.io/github/license/scorixear/discord.ts-architecture)
![NPM Version](https://img.shields.io/npm/v/discord.ts-architecture)
![GitHub Actions Workflow Status](https://img.shields.io/github/actions/workflow/status/scorixear/discord.ts-architecture/node.yml)
![NPM Downloads](https://img.shields.io/npm/d18m/discord.ts-architecture)


A Typescript library for better Discord bots. 
This library provides an OOP approach to the Discord.js library for Typescript projects. 
It does not "simplify" the approach advertised by the framework, 
but transforms the crude approach into a stable architecture ready for larger projects.

This is not a complete architecture, and only covers interaction handling, interaction response, and Discord login, 
but it does provide extended abstract classes for all interaction types with built-in features like automatic deferral.
# Wiki
See the [Wiki](https://github.com/scorixear/discord.ts-architecture/wiki) for a detailed documentation of the library.

# Example Code
See the [Example Code](https://github.com/scorixear/discord.ts-architecture/tree/main/example) for a complete example of a Discord bot using this library.

## Examples
### Initial Setup
Your `index.ts` could look like this
```ts
import { InteractionHandler, DiscordHandler, Logger } from '../lib';
import { Partials, GatewayIntentBits, Events } from 'discord.js';
import PingCommand from './commands/PingCommand';
import PingButton from './buttons/PingButton';
import PingRoleSelectMenu from './selectMenus/PingRoleSelectMenu';
import PingStringSelectMenu from './selectMenus/PingStringSelectMenu';

// this should be in some sort of env file and not checked into any repository
// you get this from the discord developer portal
const DISCORD_TOKEN = 'YOUR_DISCORD_TOKEN';
const DISCORD_CLIENT_ID = 'YOUR_DISCORD_CLIENT_ID';

// we create a new instance of the DiscordHandler
const discordHandler = new DiscordHandler(
  // and pass the Client Partials
  // this Partial for example allows to receive uncache messages
  [Partials.Message],
  // and the Gateway Intents
  // we want to receive events from Guilds, GuildMessages and GuildMembers
  [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildMembers]
);

// lets create our commands
const pingButton = new PingButton();
const pingRoleSelectMenu = new PingRoleSelectMenu();
const pingStringSelectMenu = new PingStringSelectMenu();
const pingCommand = new PingCommand(pingButton, pingRoleSelectMenu, pingStringSelectMenu);

// now it is time to create a new instance of the InteractionHandler
// and pass the command, button and select menu interaction models we want to use
const interactionHandler = new InteractionHandler(
  [pingCommand],
  [pingButton],
  [pingRoleSelectMenu, pingStringSelectMenu]
);

// we activate the interactionCreate event for all interaction models
interactionHandler.activateInteractionCreate(discordHandler);

// and listen for the ready event of the discord client
discordHandler.once(Events.ClientReady, (readyClient) => {
  Logger.info('Discord client is ready and logged in as ' + readyClient.user?.tag);
});

// now login to discord
discordHandler.login(DISCORD_TOKEN).then(async () => {
  Logger.info('Logged into Discord');
  // after logging in, we can register the interactions with each guild
  // this is done by calling the init method of the interactionHandler
  await interactionHandler.init(DISCORD_TOKEN, DISCORD_CLIENT_ID, discordHandler);
  Logger.info('Initialized interactions');
});

```
**Yes, this is a lot.** But that's it. There is no further configuration required. 
- Your commands are already pushed to the guilds.
- Your interactions are already handled
- Exceptions caught and logged 
- You have an automatic reply deferral if the interaction takes too long

### Creating custom commands
A custom command is represented as a class derived from the CommandInteractionModel, and might look like this (for a ping command).

```ts
import {
  ChatInputCommandInteraction,
  SlashCommandStringOption,
  ButtonBuilder,
  ButtonStyle,
  StringSelectMenuBuilder,
  ActionRowBuilder,
  RoleSelectMenuBuilder
} from 'discord.js';
import { CommandInteractionModel, MessageHandler } from 'discord.ts-architecture';
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
```

Again, this is a lot for a simple ping command.
But it does give you a lot of extra functionality.
- Your options are registered with the command as you specify them.
- If your command takes longer than 2 seconds, the interaction is deferred and then properly handled by the MessageHandler.
- Your InteractionHandle is exception catched, preventing the bot from shutting down.
- In this example, we didn't respond with a text message, we responded with an embed message containing categories and buttons.

### Final Usage Advice
The initial setup for this is higher for very simple projects. I suggest creating a template for Discord bot projects. 
There is nothing else to do besides the setup shown. Creating additional commands and button interactions all follow the same architectural structure.
This makes for better readability, maintainability, and more robust behaviour.
In addition, it is recommended to still catch every exception and missed rejection for an application.
