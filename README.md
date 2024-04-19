# discord.ts-architecture
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

discordhandler.on('interactionCreate', (i) => interactionHandler.handle(i));

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
- Your Interactions are already handled
- Exceptions are catched and logged 
- You have automatic reply deferring if the interaction takes too long

### Creating custom commands
A custom command is represented asa derrived class from CommandInteractionModel and could look like this (for a ping command).

```ts
import { CommandInteractionModel, MessageHandler} from 'discord.ts-architecture'
import { SlashCommandStringOption, CommandInteraction, ActionRowBuilder, ButtonBuilder, ButtonStyle } from 'discord.js';

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

  override async handle(interaction: CommandInteraction) {
    try {
      super.handle(interaction); // this handles automatic deferring
    } catch {
      return;
    }

    // direct accesst to discord.js interaction allows you
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
- You have custom usage and groups that could be used in a help command
- Your Options are registered with the command as you specified
- If your command is taking longer then 3 seconds, the interaction is deferred and then properly picked up by the MessageHandler
- You InteractionHandle is exception catched preventing bot shutdown
- We didn't respond in this example with a text message, we responded with an Embed message that contains Categories and Buttons

### Final Usage Advice
The inital setup for this is higher for very simple projects. I suggest creating a template for discord bot project. Besides the shown setup there is nothing needed to do. Creating additional commands and button interactions all follow the same architectural structure.
This creates better readability, maintainability and also a more robust behaviour.
Additionally it is recommended to still catch any exception and missed rejection for an application.

## Included Classes
### Handlers
* [DiscordHandler](#discordhandler)
* [InteractionHandler](#interactionhandler)
* [MessageHandler](#messagehandler)
* [LanguageHandler](#languagehandler)
### Helpers
* [Logging](#logging)
### Models
* [CommandInteractionModel](#commandinteractionmodel)
* [AutocompleteInteractionModel](#autocompleteinteractionmodel)
* [ButtonInteractionModel](#buttoninteractionmodel)
* [AnySelectMenuInteractionModel](#anyselectmenuinteractionmodel)
  * [ChannelSelectMenuInteractionModel](#channelselectmenuinteractionmodel)
  * [MentionableSelectMenuInteractionModel](#mentionableselectmenuinteractionmodel)
  * [RoleSelectMenuInteractionModel](#roleselectmenuinteractionmodel)
  * [StringSelectMenuInteractionModel](#stringselectmenuinteractionmodel)
  * [UserSelectMenuInteractionModel](#userselectmenuinteractionmodel)
  * ~~[SelectMenuInteractionModel](#selectmenuinteractionmodel)~~ `deprecated`, use [StringSelectMenuInteractionModel](#stringselectmenuinteractionmodel) instead
* [TwoWayMap](#twowaymap)

## DiscordHandler
Provides methods for interaction with the discord.js Client and exposes client for custom usage.

### Properties
| Properties | Type | Description |
| ---------- | ---- | ----------- |
| client | Discord.Client | The discord.js client object |

### Constructor
| Argument | Type | Description |
| -------- | ---- | ----------- |
| partials | Discord.Partials[] | The partials to load |
| intents | Discord.GatewayIntentBits[] | The intents to load |

### Methods
| Method | Arguments | Returns | Description |
| ------ | --------- | ------- | ----------- |
| getFirstGuild | none | Discord.Guild | Returns the first guild the client is in |
| getRolesOfGuild | Discord.Guild | Promise<Discord.Collection<string, Discord.Role>> | Returns a collection of roles of the guild |
| fetchGuild | Discord.GuildResolvable | Promise<Discord.Guild> | Returns a guild |
| getGuilds | none | Promise<Discord.Collection<string, Discord.Guild>> | Returns the currently cache of guilds |
| fetchMember | user: Discord.UserResolvable, guild: Discord.GuildResolvable | Promise<Discord.GuildMember> | Returns a guild member |
| on | event: string, callback: (...args: any[]) => Discord.Awaitable<void> | Client<boolean> | Adds an event listener |
| login | token: string | Promise<string> | Logs the client in |

## InteractionHandler
Initializes InteractionModels, pushes them to specified guilds and handles the 'interactionCreate' event.

### Properties
| Properties | Type | Description |
| ---------- | ---- | ----------- |
| buttonInteractions | TwoWayMap<string, ButtonInteractionModel> | A map of ButtonInteractionModels and their respective IDs |
| selectMenuInteraction | TwoWayMap<string, SelectMenuInteractionModel> | A map of SelectMenuInteractionModels and their respective IDs |

### Constructor
| Argument | Type | Description |
| -------- | ---- | ----------- |
| commandInteractions | CommandInteractionModel[] | The CommandInteractionModels the InteractionHandler will listen for |
| buttonInteractions | TwoWayMap<string, ButtonInteractionModel> (default empty) | The ButtonInteractionModels the InteractionHandler will listen for |
| selectMenuInteractions | TwoWayMap<string, SelectMenuInteractionModel> (default empty) | The SelectMenuInteractionModels the InteractionHandle will listen for |
| afterConstruct | (models: CommandInteractionModel[]) => void (default NOP) | A callback that is called after the InteractionHandler has constructed all CommandInteractions |

### Methods
| Method | Arguments | Returns | Description |
| ------ | --------- | ------- | ----------- |
| init | discordToken: string, clientId: string, discordHandler: DiscordHandler, commandGuildIds: string[] \| undefined, notCommandGuildIds: string[] \| undefined | Promise\<void> | Waits for all CommandInteraction Ready and then pushes all Commands to the specified guilds or all if undefined excluding all Guilds defined in notCommandGuildIds. |
| handle | interaction: Discord.Interaction | Promise\<void> | Handles Button/ChatInput and AutocompleteInteractions |

## LanguageHandler
Provides a way to load and use languages strings.

### Properties
| Properties | Type | Description |
| ---------- | ---- | ----------- |
| Language | any | The language object |

### Constructor
| Argument | Type | Description |
| -------- | ---- | ----------- |

### Methods
| Method | Arguments | Returns | Description |
| ------ | --------- | ------- | ----------- |
| setLanguage | language: any | void | Sets the language object |
| replaceArgs | input: string, ...args: string[] | void | Replaces the arguments in the input string denoted by $ + index in the args array |

## MessageHandler
Provides function to create and send embed messages

### Properties
| Properties | Type | Description |
| ---------- | ---- | ----------- |

### Constructor
| Argument | Type | Description |
| -------- | ---- | ----------- |

### Methods
| Method | Arguments | Returns | Description |
| ------ | --------- | ------- | ----------- |
| sendEmbedMsg | param0: {<br> msg: Discord.Message,<br> title?: string,<br> categories { title: string, text?: string, inline?: boolean}[],<br> color?: number,<br> description?: string,<br> thumbnail?: string,<br> image?: string,<br> url?: string,<br> files?: string[]<br> components?: Discord.ActionRowBuilder<Discord.ButtonBuilder>[]<br>} | Promise<Discord.Message<boolean>> | Sends an embed message to the channel from the provided msg |
| sendEmbedMsgExplicit | msg: Discord.Message<br> title: string \| undefined<br> categories: { title: string, text?: string, inline?: boolean}[] \| undefined<br> color: number \| undefined<br> description: string \| undefined<br> thumbnail: string \| undefined<br> image: string \| undefined<br> url: string \| undefined<br> components: Discord.ActionRowBuilder<Discord.ButtonBuilder>[] \| undefined | Promise<Discord.Message<boolean>> | Sends an embed message to the channel from the provided msg |
| sendEmbed | param0: {<br> guild?: Discord.Guild,<br> channel: Discord.TextBasedChannel,<br> author: Discord.User,<br> title?: string,<br> categories { title: string, text?: string, inline?: boolean}[],<br> color?: number,<br> description?: string,<br> thumbnail?: string,<br> image?: string,<br> url?: string,<br> files?: string[]<br> components?: Discord.ActionRowBuilder<Discord.ButtonBuilder>[]<br>}| Promise<Discord.Message<boolean>><br>}| Sends an embed message to the channel |
| sendEmbedExplicit | guild: Discord.Guild \| undefined<br> channel: Discord.TextBasedChannel<br> author: Discord.User \| undefined<br> title: string \| undefined<br> categories: { title: string, text?: string, inline?: boolean}[] \| undefined<br> color: number \| undefined<br> description: string \| undefined<br> thumbnail: string \| undefined<br> image: string \| undefined<br> url: string \| undefined<br> components: Discord.ActionRowBuilder<Discord.ButtonBuilder>[] \| undefined | Promise<Discord.Message<boolean>> | Sends an embed message to the channel |
| replyError | param0: {<br> interaction: Discord.CommandInteraction \| ButtonInteraction,<br> title?: string,<br> categories { title: string, text?: string, inline?: boolean}[],<br> color?: number,<br> description?: string,<br> thumbnail?: string,<br> image?: string,<br> url?: string,<br> files?: string[]<br> components?: Discord.ActionRowBuilder<Discord.ButtonBuilder>[]<br>} | Promise<Discord.Message<boolean>> | Replies ephemeral to an interaction (works with deffered interactions aswell) |
| reply | param0: {<br> interaction: Discord.CommandInteraction \| ButtonInteraction,<br> title?: string,<br> categories { title: string, text?: string, inline?: boolean}[],<br> color?: number,<br> description?: string,<br> thumbnail?: string,<br> image?: string,<br> url?: string,<br> files?: string[]<br> components?: Discord.ActionRowBuilder<Discord.ButtonBuilder>[],<br> ephemeral?: boolean<br>} | Promise<Discord.Message<boolean>> | Replies to an interaction (works with deffered interactions aswell) |
| followUp | param0: {<br> interaction: Discord.CommandInteraction \| ButtonInteraction,<br> title?: string,<br> categories { title: string, text?: string, inline?: boolean}[],<br> color?: number,<br> description?: string,<br> thumbnail?: string,<br> image?: string,<br> url?: string,<br> files?: string[]<br> components?: Discord.ActionRowBuilder<Discord.ButtonBuilder>[],<br> ephemeral?: boolean<br>} | Promise<Discord.Message<boolean>> | Follows up to an Interaction (if not replied, it replies - works with deferred replies aswell) |
| getEmbedInteraction | param0: {<br> interaction: Discord.CommandInteraction \| ButtonInteraction,<br> title?: string,<br> categories { title: string, text?: string, inline?: boolean}[],<br> color?: number,<br> description?: string,<br> thumbnail?: string,<br> image?: string,<br> url?: string,<br> files?: string[]<br> components?: Discord.ActionRowBuilder<Discord.ButtonBuilder>[],<br> ephemeral?: boolean<br>} | Promise<{<br>embeds: Discord.EmbedBuilder[],<br>ephemeral: boolean,<br>components?: Discord.ActionRowBuilder<Discord.ButtonBuilder>[] \| undefined,<br>files: Discord.AttachmentBuilder[]}> | Returns a Discord.MessageOption object from the given interaction |
| getErrorEmbedInteraction | param0: {<br> interaction: Discord.CommandInteraction \| ButtonInteraction,<br> title?: string,<br> categories { title: string, text?: string, inline?: boolean}[],<br> color?: number,<br> description?: string,<br> thumbnail?: string,<br> image?: string,<br> url?: string,<br> files?: string[]<br> components?: Discord.ActionRowBuilder<Discord.ButtonBuilder>[]<br>} | Promise<{<br>embeds: Discord.EmbedBuilder[],<br>ephemeral: boolean,<br>components?: Discord.ActionRowBuilder<Discord.ButtonBuilder>[] \| undefined,<br>files: Discord.AttachmentBuilder[]}> | Returns a Discord.MessageOption object from the given interaction |
| getEmbed | param0: {<br> guild?: Discord.Guild,<br> author: Discord.User,<br> title?: string,<br> categories { title: string, text?: string, inline?: boolean}[],<br> color?: number,<br> description?: string,<br> thumbnail?: string,<br> image?: string,<br> url?: string,<br> files?: string[]<br> components?: Discord.ActionRowBuilder<Discord.ButtonBuilder>[]<br>}| Promise<{<br>embeds: Discord.EmbedBuilder[],<br>ephemeral: boolean,<br>components?: Discord.ActionRowBuilder<Discord.ButtonBuilder>[] \| undefined,<br>files: Discord.AttachmentBuilder[]}> | Returns a Discord.MessageOption object |
| getEmbedExplicit | guild: Discord.Guild \| undefined<br> author: Discord.User \| undefined<br> title: string \| undefined<br> categories: { title: string, text?: string, inline?: boolean}[] \| undefined<br> color: number \| undefined<br> description: string \| undefined<br> thumbnail: string \| undefined<br> image: string \| undefined<br> url: string \| undefined<br> components: Discord.ActionRowBuilder<Discord.ButtonBuilder>[] \| undefined | Promise<{<br>embeds: Discord.EmbedBuilder[],<br> ephemeral: boolean,<br>components?: Discord.ActionRowBuilder<Discord.ButtonBuilder>[] \| undefined,<br>files: Discord.AttachmentBuilder[]}> | Returns a Discord.MessageOption object |

## Logging

### Included Classes
- enum WARNINGLEVEL
- class Logger

### ENUM Values
| Value | Description |
| ----- | ----------- |
| INFO | Provides INFO as Preamble |
| WARN | Provides WARNING as Preamble |
| ERROR | Provides ERROR as Preamble |
| CRIT | Provides CRITICAL as Preamble **and shuts down service** |

### Methods
| Method | Arguments | Returns | Description |
| ------ | --------- | ------- | ----------- |
| log | message: string,<br>warningLevel: WARNINGLEVEL<br>...args: any[] | none | Logs the message with the given warning level and arguments and exits process if warningLevel = CRITICAL |
| info | message: string,<br>...args: any[] | none | Logs the message with INFO as preamble |
| warn | message: string,<br>...args: any[] | none | Logs the message with WARNING as preamble |
| error | message: string,<br>...args: any[] | none | Logs the message with ERROR as preamble |
| crit | message: string,<br>...args: any[] | none | Logs the message with CRITICAL as preamble and exits process |
| exception | messsage: string<br>error: Error<br>warningLevel: WARNINGLEVEL<br>...args: any[] | none | Logs the message with the given warning level and arguments, adds error message and stack to console error output and exits process if warningLevel = CRITICAL |

## CommandInteractionModel

Represents one SlashCommand and should be extended by custom implementation (overriding the handle method).

### Properties
| Properties | Type | Description |
| ---------- | ---- | ----------- |
| command | string | The command used in Discord |
| description | string | The description of the command (not more then 120 characters) |
| example | string | An example how to use the command |
| category | string | The category of the command |
| usage | string | The usage of the command |
| allowedRoles | RoleResolvable[] | The roles that are allowed to use the command |
| Ready | Promise<any> | A Promise that should be resolved when the command is ready to be used |
| deferReply | number | undefined | The amount of milliseconds to defer the reply if no reply was already made. If undefined, does not defer reply |
| deferReplyEphemeral | boolean | If true, will defer reply as ephemeral, making the reply ephermeral aswell |
| slashCommandBuilder | Discord.slashCommandBuilder | The builder for this command |


### Constructor
| Argument | Type | Description |
| -------- | ---- | ----------- |
| command | string | The command used in Discord |
| description | string | The description of the command (not more then 120 characters) |
| example | string | An example how to use the command |
| category | string | The category of the command |
| usage | string | The usage of the command |
| options | any[] | The SlashCommandOptions used in this command |
| deferReply | number \| undefined (default 2000) | The amount of milliseconds to defer the reply if no reply was already made. If undefined, does not defer reply |
| deferReplyEphemeral | boolean (default false) | If true, will defer reply as ephemeral, making the reply ephermeral aswell |
| allowedRoles | RoleResolvable[] \| undefined (default undefined) | The roles that are allowed to use the command |

### Methods
| Method | Arguments | Returns | Description |
| ------ | --------- | ------- | ----------- |
| handle | interaction: ChatInputCommandInteraction | Promise\<void> | Called when Interaction was received. You might want to call super.handle() to activate defered reply and permission checking |

## AutocompleteInteractionModel
Extends the CommandInteractionModel with an AutocompleteInteraction handler.

### Properties
| Properties | Type | Description |
| ---------- | ---- | ----------- |

### Constructor
| Argument | Type | Description |
| -------- | ---- | ----------- |

### Methods
| Method | Arguments | Returns | Description |
| ------ | --------- | ------- | ----------- |
| handleAutocomplete | interaction: AutocompleteInteraction | Promise\<void> | Called when AutocompleteInteraction was received. |

## ButtonInteractionModel

### Properties
| Properties | Type | Description |
| ---------- | ---- | ----------- |
| id | string | The id of the interaction |
| deferReply | number \| undefined | The amount of milliseconds to defer the reply if no reply was already made. If undefined, does not defer reply |
| deferReplyEphemeral | boolean | If true, will defer reply as ephemeral, making the reply ephermeral aswell |

### Constructor
| Argument | Type | Description |
| -------- | ---- | ----------- |
| id | string | The id of the interaction |
| deferReply | number \| undefined (default 2000) | The amount of milliseconds to defer the reply if no reply was already made. If undefined, does not defer reply |
| deferReplyEphemeral | boolean (default true) | If true, will defer reply as ephemeral, making the reply ephermeral aswell |

### Methods
| Method | Arguments | Returns | Description |
| ------ | --------- | ------- | ----------- |
| handle | interaction: ButtonInteraction | Promise\<void> | Called when ButtonInteraction was received. |

# SelectMenuInteraction Models
## AnySelectMenuInteractionModel
Base class for all SelectMenuInteractionModels
### Properties
| Properties | Type | Description |
| ---------- | ---- | ----------- |
| id | string | The id of the interaction |
| deferReply | number \| undefined | The amount of milliseconds to defer the reply if no reply was already made. If undefined, does not defer reply |
| deferReplyEphemeral | boolean | If true, will defer reply as ephemeral, making the reply ephermeral aswell |

### Constructor
| Argument | Type | Description |
| -------- | ---- | ----------- |
| id | string | The id of the interaction |
| deferReply | number \| undefined (default 2000) | The amount of milliseconds to defer the reply if no reply was already made. If undefined, does not defer reply |
| deferReplyEphemeral | boolean (default true) | If true, will defer reply as ephemeral, making the reply ephermeral aswell |

### Methods
| Method | Arguments | Returns | Description |
| ------ | --------- | ------- | ----------- |
| handle | interaction: AnySelectMenuInteraction | Promise\<void> | Called when AnySelectMenuInteraction was received. |

## ChannelSelectMenuInteractionModel

### Properties
| Properties | Type | Description |
| ---------- | ---- | ----------- |
| id | string | The id of the interaction |
| deferReply | number \| undefined | The amount of milliseconds to defer the reply if no reply was already made. If undefined, does not defer reply |
| deferReplyEphemeral | boolean | If true, will defer reply as ephemeral, making the reply ephermeral aswell |

### Constructor
| Argument | Type | Description |
| -------- | ---- | ----------- |
| id | string | The id of the interaction |
| deferReply | number \| undefined (default 2000) | The amount of milliseconds to defer the reply if no reply was already made. If undefined, does not defer reply |
| deferReplyEphemeral | boolean (default true) | If true, will defer reply as ephemeral, making the reply ephermeral aswell |

### Methods
| Method | Arguments | Returns | Description |
| ------ | --------- | ------- | ----------- |
| handle | interaction: ChannelSelectMenuInteraction | Promise\<void> | Called when ChannelSelectMenuInteraction was received. |

## MentionableSelectMenuInteractionModel

### Properties
| Properties | Type | Description |
| ---------- | ---- | ----------- |
| id | string | The id of the interaction |
| deferReply | number \| undefined | The amount of milliseconds to defer the reply if no reply was already made. If undefined, does not defer reply |
| deferReplyEphemeral | boolean | If true, will defer reply as ephemeral, making the reply ephermeral aswell |

### Constructor
| Argument | Type | Description |
| -------- | ---- | ----------- |
| id | string | The id of the interaction |
| deferReply | number \| undefined (default 2000) | The amount of milliseconds to defer the reply if no reply was already made. If undefined, does not defer reply |
| deferReplyEphemeral | boolean (default true) | If true, will defer reply as ephemeral, making the reply ephermeral aswell |

### Methods
| Method | Arguments | Returns | Description |
| ------ | --------- | ------- | ----------- |
| handle | interaction: MentionableSelectMenuInteraction | Promise\<void> | Called when MentionableSelectMenuInteraction was received. |

## RoleSelectMenuInteractionModel

### Properties
| Properties | Type | Description |
| ---------- | ---- | ----------- |
| id | string | The id of the interaction |
| deferReply | number \| undefined | The amount of milliseconds to defer the reply if no reply was already made. If undefined, does not defer reply |
| deferReplyEphemeral | boolean | If true, will defer reply as ephemeral, making the reply ephermeral aswell |

### Constructor
| Argument | Type | Description |
| -------- | ---- | ----------- |
| id | string | The id of the interaction |
| deferReply | number \| undefined (default 2000) | The amount of milliseconds to defer the reply if no reply was already made. If undefined, does not defer reply |
| deferReplyEphemeral | boolean (default true) | If true, will defer reply as ephemeral, making the reply ephermeral aswell |

### Methods
| Method | Arguments | Returns | Description |
| ------ | --------- | ------- | ----------- |
| handle | interaction: RoleSelectMenuInteraction | Promise\<void> | Called when RoleSelectMenuInteraction was received. |

## StringSelectMenuInteractionModel
Base class and replacement for deprecated ~~[SelectMenuInteractionModel](#selectmenuinteractionmodel)~~
### Properties
| Properties | Type | Description |
| ---------- | ---- | ----------- |
| id | string | The id of the interaction |
| deferReply | number \| undefined | The amount of milliseconds to defer the reply if no reply was already made. If undefined, does not defer reply |
| deferReplyEphemeral | boolean | If true, will defer reply as ephemeral, making the reply ephermeral aswell |

### Constructor
| Argument | Type | Description |
| -------- | ---- | ----------- |
| id | string | The id of the interaction |
| deferReply | number \| undefined (default 2000) | The amount of milliseconds to defer the reply if no reply was already made. If undefined, does not defer reply |
| deferReplyEphemeral | boolean (default true) | If true, will defer reply as ephemeral, making the reply ephermeral aswell |

### Methods
| Method | Arguments | Returns | Description |
| ------ | --------- | ------- | ----------- |
| handle | interaction: StringSelectMenuInteraction | Promise\<void> | Called when StringSelectMenuInteraction was received. |

## UserSelectMenuInteractionModel

### Properties
| Properties | Type | Description |
| ---------- | ---- | ----------- |
| id | string | The id of the interaction |
| deferReply | number \| undefined | The amount of milliseconds to defer the reply if no reply was already made. If undefined, does not defer reply |
| deferReplyEphemeral | boolean | If true, will defer reply as ephemeral, making the reply ephermeral aswell |

### Constructor
| Argument | Type | Description |
| -------- | ---- | ----------- |
| id | string | The id of the interaction |
| deferReply | number \| undefined (default 2000) | The amount of milliseconds to defer the reply if no reply was already made. If undefined, does not defer reply |
| deferReplyEphemeral | boolean (default true) | If true, will defer reply as ephemeral, making the reply ephermeral aswell |

### Methods
| Method | Arguments | Returns | Description |
| ------ | --------- | ------- | ----------- |
| handle | interaction: UserSelectMenuInteraction | Promise\<void> | Called when UserSelectMenuInteraction was received. |

## SelectMenuInteractionModel
**Deprecated** Use [StringSelectMenuInteractionModel](#stringselectmenuinteractionmodel) instead
### Properties
| Properties | Type | Description |
| ---------- | ---- | ----------- |
| id | string | The id of the interaction |
| deferReply | number \| undefined | The amount of milliseconds to defer the reply if no reply was already made. If undefined, does not defer reply |
| deferReplyEphemeral | boolean | If true, will defer reply as ephemeral, making the reply ephermeral aswell |

### Constructor
| Argument | Type | Description |
| -------- | ---- | ----------- |
| id | string | The id of the interaction |
| deferReply | number \| undefined (default 2000) | The amount of milliseconds to defer the reply if no reply was already made. If undefined, does not defer reply |
| deferReplyEphemeral | boolean (default true) | If true, will defer reply as ephemeral, making the reply ephermeral aswell |

### Methods
| Method | Arguments | Returns | Description |
| ------ | --------- | ------- | ----------- |
| handle | interaction: SelectMenuInteraction | Promise\<void> | Called when SelectMenuInteraction was received. |


## TwoWayMap
A JS.Map implementation that provides direct mapping between two pairs.
Used inside the InteractionHandler to map ButtonInteraction IDs to buttonInteractions and SelectMenuInteraction IDs to selectMenuInteractions.

### Properties
| Properties | Type | Description |
| ---------- | ---- | ----------- |
| K | Generic | Represents the Generic Key Type |
| V | Generic | Represents the Generic Value Type |

### Constructor
| Argument | Type | Description |
| -------- | ---- | ----------- |
| map | Map<K, V> | The map to convert to TwoWayMap |

### Methods
| Method | Arguments | Returns | Description |
| ------ | --------- | ------- | ----------- |
| set | key: K, value: V | none | Sets the value for the given key |
| get | key: K | V | Gets the value for the given key |
| revGet | key: V | K | Get the key for the given value |
| typeGet | type: new (id: string, deferReply: number \| undefined, deferReplyEphemeral: boolean) => V | K | Returns the first Key that matches the given type |
| find | action: (key: K) => boolean | V | Return the first value that matches the given action |
