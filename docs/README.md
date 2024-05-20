**discord.ts-architecture** • **Docs**

***

# discord.ts-architecture
![GitHub License](https://img.shields.io/github/license/scorixear/discord.ts-architecture)
![NPM Version](https://img.shields.io/npm/v/discord.ts-architecture)
![GitHub Actions Workflow Status](https://img.shields.io/github/actions/workflow/status/scorixear/discord.ts-architecture/node.yml)
![NPM Downloads](https://img.shields.io/npm/d18m/discord.ts-architecture)

A Typescript Library for better Discord Bots.
This library provides an OOP approach on top of the Discord.js library
for Typescript projects. It does not "simplify" the approach advertised
by the Discord.js Framework, but transform the crude approach to a stable
architecture ready for bigger projects.

This is however not a complete architecture and only covers handling Interactions, responding to Interactions and Discord Login, but provides in return extended abstract
classes for all interaction types with built-in features such as automatic defer.

## Examples
### Inital Setup
Your Index.ts could look like this
```ts
import { DiscordHandler, InteractionHandler, TwoWayMap} from 'discord.ts-architecture'
import { Partials, GatewayIntentBits } from 'discord.js'
import { PingCommand, PingButton, PingSelectionMenu } from './model'

const discordHandler = new DiscordHandler(
  [Partials.Message],
  [GatewayIntentBits.GuildMembers]
);
const interactionHandler = new InteractionHandler(
  [new PingCommand()],
  new TwoWayMap(new Map([
    ['ping-button', new PingButton()]
  ])),
  new TwoWayMap(new Map([
    ['ping-menu', new PingSelectionMenu()]
  ]))
);
interactionHandler.activateInteractionCreate(discordHandler);

discordHandler.login(process.env.TOKEN).then(() => {
  interactionHandler.init(
    process.env.TOKEN,
    process.env.CLIENTID,
    discordHandler
  );
})
```
**Yes this is a lot**. But this is everything done. There is no more configuration needed. 
- Your commands are already pushed to the Guilds
- Your interactions are already handled
- Exceptions are catched and logged 
- You have automatic reply deferring if the interaction takes too long

### Creating custom commands
A custom command is represented as a derrived class from CommandInteractionModel and could look like this (for a ping command).

```ts
import { CommandInteractionModel, MessageHandler} from 'discord.ts-architecture'
import { SlashCommandStringOption, ChatInputCommandInteraction, ActionRowBuilder, ButtonBuilder, ButtonStyle } from 'discord.js';

export class PingCommand extends CommandInteractionModel {
  constructor() {
    super(
      'ping' // this is the command
      'Returns the ping of the bot', // the description shown in discord
      'ping test:figure', // example usage, not used but accessible
      'Moderation', // Group of Command, not used but accessible
      'ping <test>', // usage definition, not used but accessible
      [
        new SlashCommandStringOption()
          .setName('test')
          .setDescription('A test option')
          .setRequired(false)
      ] // this represents the options a command has
    )
  }

  override async handle(interaction: ChatInputCommandInteraction) {
    activateDeferredReply(interaction); // this handles automatic deferring
    const hasPermission = await checkPermissions(interaction); // this checks if the user has the permissions to execute the command
    if (!hasPermission) {
      return;
    }

    // direct access to discord.js interactions allows you
    // to use every discord.js feature
    const testoption = interaction.options.getString('test', false);

    // this uses the MessageHandler to automatically reply an Embedded Message to a command.
    // The Message Handler supports all options for Embedded Blocks
    await MessageHandler.reply({
      interaction,
      title: 'Ping',
      descripiton: `You pressed ping with option ${testoption}`,
      ephemeral:true,
      categories: [
        {
          title: 'Category',
          text: 'Undefined text blocks are automatically converted to \u200b',
          inline: false
        }
      ],
      components: [
        new ActionRowBuilder<ButtonBuilder>() {
          new ButtonBuilder()
            .setCustomId('ping-button')
            .setLabel('Ping')
            .setStyle(ButtonStyle.Primary)
        }
      ]
    });
  }
}
```

Again, this is a lot for a simple Ping command.
But you get a lot of additional features with this.
- You have a custom usage and groups that could be used in a help command
- Your options are registered with the command as you specified
- If your command is taking longer then 3 seconds, the interaction is deferred and then properly picked up by the MessageHandler
- You InteractionHandle is exception catched preventing a bot shutdown
- We didn't respond in this example with a text message, we responded with an Embed message that contains Categories and Buttons

### Final Usage Advice
The inital setup for this is higher for very simple projects. I suggest creating a template for discord bot projects. Besides the shown setup there is nothing needed to do. Creating additional commands and button interactions all follow the same architectural structure.
This creates better readability, maintainability and also a more robust behaviour.
Additionally it is recommended to still catch any exception and missed rejection for an application.

## API Index

### Enumerations

- [WarningLevel](enumerations/WarningLevel.md)

### Classes

- [AnySelectMenuInteractionModel](classes/AnySelectMenuInteractionModel.md)
- [AutocompleteInteractionModel](classes/AutocompleteInteractionModel.md)
- [ButtonInteractionModel](classes/ButtonInteractionModel.md)
- [ChannelSelectMenuInteractionModel](classes/ChannelSelectMenuInteractionModel.md)
- [CommandInteractionModel](classes/CommandInteractionModel.md)
- [DiscordHandler](classes/DiscordHandler.md)
- [InteractionHandler](classes/InteractionHandler.md)
- [Logger](classes/Logger.md)
- [MentionableSelectMenuInteractionModel](classes/MentionableSelectMenuInteractionModel.md)
- [MessageHandler](classes/MessageHandler.md)
- [RoleSelectMenuInteractionModel](classes/RoleSelectMenuInteractionModel.md)
- [StringSelectMenuInteractionModel](classes/StringSelectMenuInteractionModel.md)
- [TwoWayMap](classes/TwoWayMap.md)
- [UserSelectMenuInteractionModel](classes/UserSelectMenuInteractionModel.md)

### Interfaces

- [IAnySelectMenuInteractionModel](interfaces/IAnySelectMenuInteractionModel.md)
- [IAutocompleteInteractionModel](interfaces/IAutocompleteInteractionModel.md)
- [IButtonInteractionModel](interfaces/IButtonInteractionModel.md)
- [IChannelSelectMenuInteractionModel](interfaces/IChannelSelectMenuInteractionModel.md)
- [ICommandInteractionModel](interfaces/ICommandInteractionModel.md)
- [IMentionableSelectMenuInteractionModel](interfaces/IMentionableSelectMenuInteractionModel.md)
- [IRoleSelectMenuInteractionModel](interfaces/IRoleSelectMenuInteractionModel.md)
- [IStringSelectMenuInteractionModel](interfaces/IStringSelectMenuInteractionModel.md)
- [ITwoWayMap](interfaces/ITwoWayMap.md)
- [IUserSelectMenuInteractionModel](interfaces/IUserSelectMenuInteractionModel.md)

## References

### SelectMenuInteractionModel

Renames and re-exports [StringSelectMenuInteractionModel](classes/StringSelectMenuInteractionModel.md)
