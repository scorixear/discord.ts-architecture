[**discord.ts-architecture**](../README.md) • **Docs**

***

[discord.ts-architecture](../README.md) / CommandInteractionModel

# Class: `abstract` CommandInteractionModel

Represents one SlashCommand and should be extended by custom implementation (overriding the handle method).

## Extended by

- [`AutocompleteInteractionModel`](AutocompleteInteractionModel.md)

## Implements

- [`ICommandInteractionModel`](../interfaces/ICommandInteractionModel.md)

## Constructors

### new CommandInteractionModel()

```ts
new CommandInteractionModel(
   command: string, 
   description: string, 
   example: string, 
   category: string, 
   usage: string, 
   options: any[], 
   deferReply: undefined | number, 
   deferReplyEphemeral: boolean, 
   allowedRoles?: RoleResolvable[]): CommandInteractionModel
```

Constructs the command

#### Parameters

• **command**: `string`

The command used in Discord

• **description**: `string`

The description of the command (not more then 120 characters)

• **example**: `string`

An example how to use the command

• **category**: `string`

The category of the command

• **usage**: `string`

The usage of the command

• **options**: `any`[]

The SlashComandOptions used in this command

• **deferReply**: `undefined` \| `number`= `2000`

The amount of milliseconds to defer th reply if no reply was already made. If undefined, does not defer reply

• **deferReplyEphemeral**: `boolean`= `false`

If true, will defer reply as ephemeral, maki9ng the reply ephemeral aswell

• **allowedRoles?**: `RoleResolvable`[]

the roles that are allowed to use the command

#### Returns

[`CommandInteractionModel`](CommandInteractionModel.md)

#### Source

[model/CommandInteractionModel.ts:112](https://github.com/scorixear/discord.ts-architecture/blob/23a5e89b62121558f2e262f887835068b27155b5/src/model/CommandInteractionModel.ts#L112)

## Properties

### Ready?

```ts
optional Ready: Promise<any>;
```

A Promise that should be resolved when the command is ready to be used

#### Memberof

CommandInteractionModel

#### Implementation of

[`ICommandInteractionModel`](../interfaces/ICommandInteractionModel.md).[`Ready`](../interfaces/ICommandInteractionModel.md#ready)

#### Source

[model/CommandInteractionModel.ts:76](https://github.com/scorixear/discord.ts-architecture/blob/23a5e89b62121558f2e262f887835068b27155b5/src/model/CommandInteractionModel.ts#L76)

***

### allowedRoles?

```ts
optional allowedRoles: RoleResolvable[];
```

The roles that are allowed to use the command

#### Memberof

CommandInteractionModel

#### Implementation of

[`ICommandInteractionModel`](../interfaces/ICommandInteractionModel.md).[`allowedRoles`](../interfaces/ICommandInteractionModel.md#allowedroles)

#### Source

[model/CommandInteractionModel.ts:69](https://github.com/scorixear/discord.ts-architecture/blob/23a5e89b62121558f2e262f887835068b27155b5/src/model/CommandInteractionModel.ts#L69)

***

### category

```ts
category: string;
```

The category of the command

#### Memberof

CommandInteractionModel

#### Implementation of

[`ICommandInteractionModel`](../interfaces/ICommandInteractionModel.md).[`category`](../interfaces/ICommandInteractionModel.md#category)

#### Source

[model/CommandInteractionModel.ts:55](https://github.com/scorixear/discord.ts-architecture/blob/23a5e89b62121558f2e262f887835068b27155b5/src/model/CommandInteractionModel.ts#L55)

***

### command

```ts
command: string;
```

The command used in Discord

#### Memberof

CommandInteractionModel

#### Implementation of

[`ICommandInteractionModel`](../interfaces/ICommandInteractionModel.md).[`command`](../interfaces/ICommandInteractionModel.md#command)

#### Source

[model/CommandInteractionModel.ts:34](https://github.com/scorixear/discord.ts-architecture/blob/23a5e89b62121558f2e262f887835068b27155b5/src/model/CommandInteractionModel.ts#L34)

***

### deferReply?

```ts
optional readonly deferReply: number;
```

The amount of milliseconds to defer the reply if no reply was already made. If undefined, does not defer reply

#### Implementation of

[`ICommandInteractionModel`](../interfaces/ICommandInteractionModel.md).[`deferReply`](../interfaces/ICommandInteractionModel.md#deferreply)

#### Source

[model/CommandInteractionModel.ts:91](https://github.com/scorixear/discord.ts-architecture/blob/23a5e89b62121558f2e262f887835068b27155b5/src/model/CommandInteractionModel.ts#L91)

***

### deferReplyEphemeral?

```ts
optional readonly deferReplyEphemeral: boolean;
```

If true, will defer reply as ephemeral, making the reply ephemeral aswell

#### Implementation of

[`ICommandInteractionModel`](../interfaces/ICommandInteractionModel.md).[`deferReplyEphemeral`](../interfaces/ICommandInteractionModel.md#deferreplyephemeral)

#### Source

[model/CommandInteractionModel.ts:98](https://github.com/scorixear/discord.ts-architecture/blob/23a5e89b62121558f2e262f887835068b27155b5/src/model/CommandInteractionModel.ts#L98)

***

### description

```ts
description: string;
```

The description of the command (not more then 120 characters)

#### Memberof

CommandInteractionModel

#### Implementation of

[`ICommandInteractionModel`](../interfaces/ICommandInteractionModel.md).[`description`](../interfaces/ICommandInteractionModel.md#description)

#### Source

[model/CommandInteractionModel.ts:41](https://github.com/scorixear/discord.ts-architecture/blob/23a5e89b62121558f2e262f887835068b27155b5/src/model/CommandInteractionModel.ts#L41)

***

### example

```ts
example: string;
```

An example how to use the command

#### Memberof

CommandInteractionModel

#### Implementation of

[`ICommandInteractionModel`](../interfaces/ICommandInteractionModel.md).[`example`](../interfaces/ICommandInteractionModel.md#example)

#### Source

[model/CommandInteractionModel.ts:48](https://github.com/scorixear/discord.ts-architecture/blob/23a5e89b62121558f2e262f887835068b27155b5/src/model/CommandInteractionModel.ts#L48)

***

### slashCommandBuilder

```ts
slashCommandBuilder: SlashCommandBuilder;
```

The builder used for this command

#### Memberof

CommandInteractionModel

#### Implementation of

[`ICommandInteractionModel`](../interfaces/ICommandInteractionModel.md).[`slashCommandBuilder`](../interfaces/ICommandInteractionModel.md#slashcommandbuilder)

#### Source

[model/CommandInteractionModel.ts:83](https://github.com/scorixear/discord.ts-architecture/blob/23a5e89b62121558f2e262f887835068b27155b5/src/model/CommandInteractionModel.ts#L83)

***

### usage

```ts
usage: string;
```

The usage of the command

#### Memberof

CommandInteractionModel

#### Implementation of

[`ICommandInteractionModel`](../interfaces/ICommandInteractionModel.md).[`usage`](../interfaces/ICommandInteractionModel.md#usage)

#### Source

[model/CommandInteractionModel.ts:62](https://github.com/scorixear/discord.ts-architecture/blob/23a5e89b62121558f2e262f887835068b27155b5/src/model/CommandInteractionModel.ts#L62)

## Methods

### activateDeferredReply()

```ts
activateDeferredReply(interaction: ChatInputCommandInteraction<CacheType>): void
```

Calls a deferred reply if the interaction was not replied to / deferred in the given [deferReply](CommandInteractionModel.md#deferreply) timeframe

#### Parameters

• **interaction**: `ChatInputCommandInteraction`\<`CacheType`\>

the interaction to activate deferred reply for

#### Returns

`void`

#### Implementation of

[`ICommandInteractionModel`](../interfaces/ICommandInteractionModel.md).[`activateDeferredReply`](../interfaces/ICommandInteractionModel.md#activatedeferredreply)

#### Source

[model/CommandInteractionModel.ts:171](https://github.com/scorixear/discord.ts-architecture/blob/23a5e89b62121558f2e262f887835068b27155b5/src/model/CommandInteractionModel.ts#L171)

***

### checkPermissions()

```ts
checkPermissions(interaction: ChatInputCommandInteraction<CacheType>): Promise<boolean>
```

Checks if the given command is allowed to be executed by the user

#### Parameters

• **interaction**: `ChatInputCommandInteraction`\<`CacheType`\>

the Interaction received

#### Returns

`Promise`\<`boolean`\>

true if the user has Permission to execute the command

#### Implementation of

[`ICommandInteractionModel`](../interfaces/ICommandInteractionModel.md).[`checkPermissions`](../interfaces/ICommandInteractionModel.md#checkpermissions)

#### Source

[model/CommandInteractionModel.ts:190](https://github.com/scorixear/discord.ts-architecture/blob/23a5e89b62121558f2e262f887835068b27155b5/src/model/CommandInteractionModel.ts#L190)

***

### handle()

```ts
abstract handle(interaction: ChatInputCommandInteraction<CacheType>): Promise<void>
```

Called when

#### Parameters

• **interaction**: `ChatInputCommandInteraction`\<`CacheType`\>

the interaction received

#### Returns

`Promise`\<`void`\>

#### Implementation of

[`ICommandInteractionModel`](../interfaces/ICommandInteractionModel.md).[`handle`](../interfaces/ICommandInteractionModel.md#handle)

#### See

ChatInputCommandInteraction was received

#### Source

[model/CommandInteractionModel.ts:165](https://github.com/scorixear/discord.ts-architecture/blob/23a5e89b62121558f2e262f887835068b27155b5/src/model/CommandInteractionModel.ts#L165)
