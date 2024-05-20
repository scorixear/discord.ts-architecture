[**discord.ts-architecture**](../README.md) • **Docs**

***

[discord.ts-architecture](../README.md) / AutocompleteInteractionModel

# Class: `abstract` AutocompleteInteractionModel

Extends the CommandInteractionMOdel with an AutocompleteInteraction handler

## Extends

- [`CommandInteractionModel`](CommandInteractionModel.md)

## Implements

- [`IAutocompleteInteractionModel`](../interfaces/IAutocompleteInteractionModel.md)

## Constructors

### new AutocompleteInteractionModel()

```ts
new AutocompleteInteractionModel(
   command: string, 
   description: string, 
   example: string, 
   category: string, 
   usage: string, 
   options: any[], 
   deferReply: undefined | number, 
   deferReplyEphemeral: boolean, 
   allowedRoles?: RoleResolvable[]): AutocompleteInteractionModel
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

[`AutocompleteInteractionModel`](AutocompleteInteractionModel.md)

#### Inherited from

[`CommandInteractionModel`](CommandInteractionModel.md).[`constructor`](CommandInteractionModel.md#constructors)

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

[`IAutocompleteInteractionModel`](../interfaces/IAutocompleteInteractionModel.md).[`Ready`](../interfaces/IAutocompleteInteractionModel.md#ready)

#### Inherited from

[`CommandInteractionModel`](CommandInteractionModel.md).[`Ready`](CommandInteractionModel.md#ready)

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

[`IAutocompleteInteractionModel`](../interfaces/IAutocompleteInteractionModel.md).[`allowedRoles`](../interfaces/IAutocompleteInteractionModel.md#allowedroles)

#### Inherited from

[`CommandInteractionModel`](CommandInteractionModel.md).[`allowedRoles`](CommandInteractionModel.md#allowedroles)

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

[`IAutocompleteInteractionModel`](../interfaces/IAutocompleteInteractionModel.md).[`category`](../interfaces/IAutocompleteInteractionModel.md#category)

#### Inherited from

[`CommandInteractionModel`](CommandInteractionModel.md).[`category`](CommandInteractionModel.md#category)

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

[`IAutocompleteInteractionModel`](../interfaces/IAutocompleteInteractionModel.md).[`command`](../interfaces/IAutocompleteInteractionModel.md#command)

#### Inherited from

[`CommandInteractionModel`](CommandInteractionModel.md).[`command`](CommandInteractionModel.md#command)

#### Source

[model/CommandInteractionModel.ts:34](https://github.com/scorixear/discord.ts-architecture/blob/23a5e89b62121558f2e262f887835068b27155b5/src/model/CommandInteractionModel.ts#L34)

***

### deferReply?

```ts
optional readonly deferReply: number;
```

The amount of milliseconds to defer the reply if no reply was already made. If undefined, does not defer reply

#### Implementation of

[`IAutocompleteInteractionModel`](../interfaces/IAutocompleteInteractionModel.md).[`deferReply`](../interfaces/IAutocompleteInteractionModel.md#deferreply)

#### Inherited from

[`CommandInteractionModel`](CommandInteractionModel.md).[`deferReply`](CommandInteractionModel.md#deferreply)

#### Source

[model/CommandInteractionModel.ts:91](https://github.com/scorixear/discord.ts-architecture/blob/23a5e89b62121558f2e262f887835068b27155b5/src/model/CommandInteractionModel.ts#L91)

***

### deferReplyEphemeral?

```ts
optional readonly deferReplyEphemeral: boolean;
```

If true, will defer reply as ephemeral, making the reply ephemeral aswell

#### Implementation of

[`IAutocompleteInteractionModel`](../interfaces/IAutocompleteInteractionModel.md).[`deferReplyEphemeral`](../interfaces/IAutocompleteInteractionModel.md#deferreplyephemeral)

#### Inherited from

[`CommandInteractionModel`](CommandInteractionModel.md).[`deferReplyEphemeral`](CommandInteractionModel.md#deferreplyephemeral)

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

[`IAutocompleteInteractionModel`](../interfaces/IAutocompleteInteractionModel.md).[`description`](../interfaces/IAutocompleteInteractionModel.md#description)

#### Inherited from

[`CommandInteractionModel`](CommandInteractionModel.md).[`description`](CommandInteractionModel.md#description)

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

[`IAutocompleteInteractionModel`](../interfaces/IAutocompleteInteractionModel.md).[`example`](../interfaces/IAutocompleteInteractionModel.md#example)

#### Inherited from

[`CommandInteractionModel`](CommandInteractionModel.md).[`example`](CommandInteractionModel.md#example)

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

[`IAutocompleteInteractionModel`](../interfaces/IAutocompleteInteractionModel.md).[`slashCommandBuilder`](../interfaces/IAutocompleteInteractionModel.md#slashcommandbuilder)

#### Inherited from

[`CommandInteractionModel`](CommandInteractionModel.md).[`slashCommandBuilder`](CommandInteractionModel.md#slashcommandbuilder)

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

[`IAutocompleteInteractionModel`](../interfaces/IAutocompleteInteractionModel.md).[`usage`](../interfaces/IAutocompleteInteractionModel.md#usage)

#### Inherited from

[`CommandInteractionModel`](CommandInteractionModel.md).[`usage`](CommandInteractionModel.md#usage)

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

[`IAutocompleteInteractionModel`](../interfaces/IAutocompleteInteractionModel.md).[`activateDeferredReply`](../interfaces/IAutocompleteInteractionModel.md#activatedeferredreply)

#### Inherited from

[`CommandInteractionModel`](CommandInteractionModel.md).[`activateDeferredReply`](CommandInteractionModel.md#activatedeferredreply)

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

[`IAutocompleteInteractionModel`](../interfaces/IAutocompleteInteractionModel.md).[`checkPermissions`](../interfaces/IAutocompleteInteractionModel.md#checkpermissions)

#### Inherited from

[`CommandInteractionModel`](CommandInteractionModel.md).[`checkPermissions`](CommandInteractionModel.md#checkpermissions)

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

[`IAutocompleteInteractionModel`](../interfaces/IAutocompleteInteractionModel.md).[`handle`](../interfaces/IAutocompleteInteractionModel.md#handle)

#### Inherited from

[`CommandInteractionModel`](CommandInteractionModel.md).[`handle`](CommandInteractionModel.md#handle)

#### See

ChatInputCommandInteraction was received

#### Source

[model/CommandInteractionModel.ts:165](https://github.com/scorixear/discord.ts-architecture/blob/23a5e89b62121558f2e262f887835068b27155b5/src/model/CommandInteractionModel.ts#L165)

***

### handleAutocomplete()

```ts
abstract handleAutocomplete(interaction: AutocompleteInteraction<CacheType>): Promise<void>
```

Called when AutocompleteInteraction was received

#### Parameters

• **interaction**: `AutocompleteInteraction`\<`CacheType`\>

the interaction received

#### Returns

`Promise`\<`void`\>

#### Implementation of

[`IAutocompleteInteractionModel`](../interfaces/IAutocompleteInteractionModel.md).[`handleAutocomplete`](../interfaces/IAutocompleteInteractionModel.md#handleautocomplete)

#### Source

[model/AutocompleteInteractionModel.ts:16](https://github.com/scorixear/discord.ts-architecture/blob/23a5e89b62121558f2e262f887835068b27155b5/src/model/AutocompleteInteractionModel.ts#L16)
