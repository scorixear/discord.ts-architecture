[**discord.ts-architecture**](../README.md) • **Docs**

***

[discord.ts-architecture](../README.md) / InteractionHandler

# Class: InteractionHandler

Initializes InteractionModels, pushs them to specified guilds
and handles the 'interactionCreate' event [link to event callback needed]

## Constructors

### new InteractionHandler()

```ts
new InteractionHandler(
   commandInteractions: ICommandInteractionModel[], 
   buttonInteractions: ITwoWayMap<string, IButtonInteractionModel>, 
   selectMenuInteraction: TwoWayMap<string, IAnySelectMenuInteractionModel>, 
   afterConstruct: (models: ICommandInteractionModel[]) => void): InteractionHandler
```

#### Parameters

• **commandInteractions**: [`ICommandInteractionModel`](../interfaces/ICommandInteractionModel.md)[]

The CommandInteractionModels the Interactionhandler will listen for

• **buttonInteractions**: [`ITwoWayMap`](../interfaces/ITwoWayMap.md)\<`string`, [`IButtonInteractionModel`](../interfaces/IButtonInteractionModel.md)\>= `undefined`

The ButtoninteractionModels the InteractionHandler will listen for [default empty]

• **selectMenuInteraction**: [`TwoWayMap`](TwoWayMap.md)\<`string`, [`IAnySelectMenuInteractionModel`](../interfaces/IAnySelectMenuInteractionModel.md)\>= `undefined`

The SelectMenuInteractionModels the InteractionHandler will listen for [default empty]

• **afterConstruct**= `undefined`

A callback that is called after the InteractionHandler has constructed all CommandInteractions

#### Returns

[`InteractionHandler`](InteractionHandler.md)

#### Source

[handlers/interactionHandler.ts:64](https://github.com/scorixear/discord.ts-architecture/blob/23a5e89b62121558f2e262f887835068b27155b5/src/handlers/interactionHandler.ts#L64)

## Properties

### buttonInteractions

```ts
buttonInteractions: ITwoWayMap<string, IButtonInteractionModel>;
```

A map of

#### Memberof

InteractionHandler

#### Source

[handlers/interactionHandler.ts:43](https://github.com/scorixear/discord.ts-architecture/blob/23a5e89b62121558f2e262f887835068b27155b5/src/handlers/interactionHandler.ts#L43)

***

### commandInteractions

```ts
commandInteractions: ICommandInteractionModel[];
```

A list of

#### Memberof

InteractionHandler

#### Source

[handlers/interactionHandler.ts:55](https://github.com/scorixear/discord.ts-architecture/blob/23a5e89b62121558f2e262f887835068b27155b5/src/handlers/interactionHandler.ts#L55)

***

### selectMenuInteractions

```ts
selectMenuInteractions: TwoWayMap<string, IAnySelectMenuInteractionModel>;
```

A map of

#### Memberof

InteractionHandler

#### Source

[handlers/interactionHandler.ts:49](https://github.com/scorixear/discord.ts-architecture/blob/23a5e89b62121558f2e262f887835068b27155b5/src/handlers/interactionHandler.ts#L49)

## Methods

### activateInteractionCreate()

```ts
activateInteractionCreate(discordHandler: DiscordHandler): void
```

Activates the interactionCreate event for the given discordHandler

#### Parameters

• **discordHandler**: [`DiscordHandler`](DiscordHandler.md)

the discordHandler to activate the event for

#### Returns

`void`

#### Source

[handlers/interactionHandler.ts:145](https://github.com/scorixear/discord.ts-architecture/blob/23a5e89b62121558f2e262f887835068b27155b5/src/handlers/interactionHandler.ts#L145)

***

### handle()

```ts
handle(interaction: Interaction): Promise<void>
```

Handles all InteractionTypes.
This method needs to be called from a custom Eventhandler
for the 'interactionCreate' event.

Has an Exception try catch around the actual Interaction Handle.

#### Parameters

• **interaction**: `Interaction`

the Interaction received

#### Returns

`Promise`\<`void`\>

#### Source

[handlers/interactionHandler.ts:159](https://github.com/scorixear/discord.ts-architecture/blob/23a5e89b62121558f2e262f887835068b27155b5/src/handlers/interactionHandler.ts#L159)

***

### init()

```ts
init(
   discordToken: string, 
   clientId: string, 
   discordHandler: DiscordHandler, 
   commandGuildIds?: string[], 
notCommandGuildIds?: string[]): Promise<void>
```

Waits for all CommandInteraction Read and the pushes all Commands to the specified
guilds or all if undefined, excluding all guilds defined in notCommandGuildIds.

#### Parameters

• **discordToken**: `string`

The token to communicate with the REST api

• **clientId**: `string`

the client id to communicate with the REST api

• **discordHandler**: [`DiscordHandler`](DiscordHandler.md)

the discordHandler used to login and create the client

• **commandGuildIds?**: `string`[]

the guilds that are getting all commands pushed to [default undefined => all guilds]

• **notCommandGuildIds?**: `string`[]

the guilds that are excluded from all commands [default undefined => no exclude]

#### Returns

`Promise`\<`void`\>

#### Source

[handlers/interactionHandler.ts:86](https://github.com/scorixear/discord.ts-architecture/blob/23a5e89b62121558f2e262f887835068b27155b5/src/handlers/interactionHandler.ts#L86)

***

### instanceOf()

```ts
private instanceOf<T>(object: any): object is T
```

#### Type parameters

• **T**

#### Parameters

• **object**: `any`

#### Returns

`object is T`

#### Source

[handlers/interactionHandler.ts:241](https://github.com/scorixear/discord.ts-architecture/blob/23a5e89b62121558f2e262f887835068b27155b5/src/handlers/interactionHandler.ts#L241)
