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
