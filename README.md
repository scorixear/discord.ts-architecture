# discord.ts
A Typescript Library for better Discord Bots.

## Included Classes
### Handlers
* [DiscordHandler](#discordhandler)
* [InteractionHandler](#interactionhandler)
* [IntervalHandler](#intervalhandler)
* [MessageHandler](#messagehandler)
* [LanguageHandler](#Languagehandler)
### Helpers
* [Logging](#logging)
### Models
* [CommandInteractionModel](#commandinteractionmodel)
* [AutocompleteInteractionModel](#autocompleteinteractionmodel)
* [ButtonInteractionModel](#buttoninteractionmodel)
* [TwoWayMap](#twowaymap)

## Installation
`npm install discord-handlers`

## DiscordHandler
Provides classes for interaction with the discord.js Client and exposes client for custom usage.

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
| getGuilds | none | Promise<Discord.Collection<string, Discord.Guild>> | Returns the currently cached of guilds |
| fetchMember | user: Discord.UserResolvable, guild: Discord.GuildResolvable | Promise<Discord.GuildMember> | Returns a guild member |
| on | event: string, callback: (...args: any[]) => Discord.Awaitable<void> | Client<boolean> | Adds an event listener |
| login | token: string | Promise<string> | Logs the client in |

## InteractionHandler
Initializes InteractionModels, pushes them to specified guilds and handles the 'interactionCreate' event.

### Properties
| Properties | Type | Description |
| ---------- | ---- | ----------- |
| buttonInteractions | TwoWayMap<string, ButtonInteractionModel> | A map of ButtonInteractionModels and their respective IDs |

### Constructor
| Argument | Type | Description |
| -------- | ---- | ----------- |
| buttonInteractions | TwoWayMap<string, ButtonInteractionModel> | The ButtonInteractionModels the InteractionHandler will listen for |
| commandInteractions | CommandInteractionModel[] | The CommandInteractionModels the InteractionHandler will listen for |
| afterInit | (models: CommandInteractionModel[]) => void | A callback that is called after the InteractionHandler has constructed all CommandInteractions |

### Methods
| Method | Arguments | Returns | Description |
| ------ | --------- | ------- | ----------- |
| init | discordToken: string, clientId: string, discordHandler: DiscordHandler, commandGuildIds: string[] \| undefined | Promise\<void> | Waits for all CommandInteraction Ready and then pushes all Commands to the specified guilds or all if undefined |
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
| sendEmbedMsg | param0: {<br> msg: Discord.Message,<br> title?: string,<br> categories { title: string, text?: string, inline?: boolean}[],<br> color?: number,<br> description?: string,<br> thumbnail?: string,<br> image?: string,<br> url?: string,<br> components?: Discord.ActionRowBuilder<Discord.ButtonBuilder>[]<br>} | Promise<Discord.Message<boolean>> | Sends an embed message to the channel from the provided msg |
| sendEmbedMsgExplicit | msg: Discord.Message<br> title: string \| undefined<br> categories: { title: string, text?: string, inline?: boolean}[] \| undefined<br> color: number \| undefined<br> description: string \| undefined<br> thumbnail: string \| undefined<br> image: string \| undefined<br> url: string \| undefined<br> components: Discord.ActionRowBuilder<Discord.ButtonBuilder>[] \| undefined | Promise<Discord.Message<boolean>> | Sends an embed message to the channel from the provided msg |
| sendEmbed | param0: {<br> guild?: Discord.Guild,<br> channel: Discord.TextBasedChannel,<br> author: Discord.User,<br> title?: string,<br> categories { title: string, text?: string, inline?: boolean}[],<br> color?: number,<br> description?: string,<br> thumbnail?: string,<br> image?: string,<br> url?: string,<br> components?: Discord.ActionRowBuilder<Discord.ButtonBuilder>[]<br>}| Promise<Discord.Message<boolean>><br>}| Sends an embed message to the channel |
| sendEmbedExplicit | guild: Discord.Guild \| undefined<br> channel: Discord.TextBasedChannel<br> author: Discord.User \| undefined<br> title: string \| undefined<br> categories: { title: string, text?: string, inline?: boolean}[] \| undefined<br> color: number \| undefined<br> description: string \| undefined<br> thumbnail: string \| undefined<br> image: string \| undefined<br> url: string \| undefined<br> components: Discord.ActionRowBuilder<Discord.ButtonBuilder>[] \| undefined | Promise<Discord.Message<boolean>> | Sends an embed message to the channel |
| replyError | param0: {<br> interaction: Discord.CommandInteraction \| ButtonInteraction,<br> title?: string,<br> categories { title: string, text?: string, inline?: boolean}[],<br> color?: number,<br> description?: string,<br> thumbnail?: string,<br> image?: string,<br> url?: string,<br> components?: Discord.ActionRowBuilder<Discord.ButtonBuilder>[]<br>} | Promise<Discord.Message<boolean>> | Replies ephemeral to an interaction (works with deffered interactions aswell) |
| reply | param0: {<br> interaction: Discord.CommandInteraction \| ButtonInteraction,<br> title?: string,<br> categories { title: string, text?: string, inline?: boolean}[],<br> color?: number,<br> description?: string,<br> thumbnail?: string,<br> image?: string,<br> url?: string,<br> components?: Discord.ActionRowBuilder<Discord.ButtonBuilder>[],<br> ephemeral?: boolean<br>} | Promise<Discord.Message<boolean>> | Replies to an interaction (works with deffered interactions aswell) |
| followUp | param0: {<br> interaction: Discord.CommandInteraction \| ButtonInteraction,<br> title?: string,<br> categories { title: string, text?: string, inline?: boolean}[],<br> color?: number,<br> description?: string,<br> thumbnail?: string,<br> image?: string,<br> url?: string,<br> components?: Discord.ActionRowBuilder<Discord.ButtonBuilder>[],<br> ephemeral?: boolean<br>} | Promise<Discord.Message<boolean>> | Follows up to an Interaction (if not replied, it replies - works with deferred replies aswell) |
| getEmbedInteraction | param0: {<br> interaction: Discord.CommandInteraction \| ButtonInteraction,<br> title?: string,<br> categories { title: string, text?: string, inline?: boolean}[],<br> color?: number,<br> description?: string,<br> thumbnail?: string,<br> image?: string,<br> url?: string,<br> components?: Discord.ActionRowBuilder<Discord.ButtonBuilder>[],<br> ephemeral?: boolean<br>} | Promise<{<br>embeds: Discord.EmbedBuilder[],<br>ephemeral: boolean,<br>components?: Discord.ActionRowBuilder<Discord.ButtonBuilder>[] | undefined,<br>files: Discord.AttachmentBuilder[]}> | Returns a Discord.MessageOption object from the given interaction |
| getErrorEmbedInteraction | param0: {<br> interaction: Discord.CommandInteraction \| ButtonInteraction,<br> title?: string,<br> categories { title: string, text?: string, inline?: boolean}[],<br> color?: number,<br> description?: string,<br> thumbnail?: string,<br> image?: string,<br> url?: string,<br> components?: Discord.ActionRowBuilder<Discord.ButtonBuilder>[]<br>} | Promise<{<br>embeds: Discord.EmbedBuilder[],<br>ephemeral: boolean,<br>components?: Discord.ActionRowBuilder<Discord.ButtonBuilder>[] | undefined,<br>files: Discord.AttachmentBuilder[]}> | Returns a Discord.MessageOption object from the given interaction |
| getEmbed | param0: {<br> guild?: Discord.Guild,<br> author: Discord.User,<br> title?: string,<br> categories { title: string, text?: string, inline?: boolean}[],<br> color?: number,<br> description?: string,<br> thumbnail?: string,<br> image?: string,<br> url?: string,<br> components?: Discord.ActionRowBuilder<Discord.ButtonBuilder>[]<br>}| Promise<{<br>embeds: Discord.EmbedBuilder[],<br>ephemeral: boolean,<br>components?: Discord.ActionRowBuilder<Discord.ButtonBuilder>[] | undefined,<br>files: Discord.AttachmentBuilder[]}> | Returns a Discord.MessageOption object |
| getEmbedExplicit | guild: Discord.Guild \| undefined<br> author: Discord.User \| undefined<br> title: string \| undefined<br> categories: { title: string, text?: string, inline?: boolean}[] \| undefined<br> color: number \| undefined<br> description: string \| undefined<br> thumbnail: string \| undefined<br> image: string \| undefined<br> url: string \| undefined<br> components: Discord.ActionRowBuilder<Discord.ButtonBuilder>[] \| undefined | Promise<{<br>embeds: Discord.EmbedBuilder[],<br> ephemeral: boolean,<br>components?: Discord.ActionRowBuilder<Discord.ButtonBuilder>[] | undefined,<br>files: Discord.AttachmentBuilder[]}> | Returns a Discord.MessageOption object |

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

## TwoWayMap
A JS.Map implementation that provides direct mapping between two pairs.
Used inside the InteractionHandler to map ButtonInteraction IDs to buttonInteractions.

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