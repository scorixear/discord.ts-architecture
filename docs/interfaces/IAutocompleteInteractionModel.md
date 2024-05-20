[**discord.ts-architecture**](../README.md) • **Docs**

***

[discord.ts-architecture](../README.md) / IAutocompleteInteractionModel

# Interface: IAutocompleteInteractionModel

Represents one AutocompleteInteraction and should be implemented by custom implementation (overriding the handleAutocomplete method).
See

## See

AutocompleteInteractionModel for a abstract base class

## Extends

- [`ICommandInteractionModel`](ICommandInteractionModel.md)

## Properties

### Ready?

```ts
optional Ready: Promise<any>;
```

A Promise that should be resolved when the command is ready to be used

#### Memberof

ICommandInteractionModel

#### Inherited from

[`ICommandInteractionModel`](ICommandInteractionModel.md).[`Ready`](ICommandInteractionModel.md#ready)

#### Source

[model/abstractions/ICommandInteractionModel.ts:56](https://github.com/scorixear/discord.ts-architecture/blob/23a5e89b62121558f2e262f887835068b27155b5/src/model/abstractions/ICommandInteractionModel.ts#L56)

***

### allowedRoles?

```ts
optional allowedRoles: RoleResolvable[];
```

The roles that are allowed to use the command

#### Memberof

ICommandInteractionModel

#### Inherited from

[`ICommandInteractionModel`](ICommandInteractionModel.md).[`allowedRoles`](ICommandInteractionModel.md#allowedroles)

#### Source

[model/abstractions/ICommandInteractionModel.ts:49](https://github.com/scorixear/discord.ts-architecture/blob/23a5e89b62121558f2e262f887835068b27155b5/src/model/abstractions/ICommandInteractionModel.ts#L49)

***

### category

```ts
category: string;
```

The category of the command

#### Memberof

ICommandInteractionModel

#### Inherited from

[`ICommandInteractionModel`](ICommandInteractionModel.md).[`category`](ICommandInteractionModel.md#category)

#### Source

[model/abstractions/ICommandInteractionModel.ts:35](https://github.com/scorixear/discord.ts-architecture/blob/23a5e89b62121558f2e262f887835068b27155b5/src/model/abstractions/ICommandInteractionModel.ts#L35)

***

### command

```ts
command: string;
```

The command used in Discord

#### Memberof

ICommandInteractionModel

#### Inherited from

[`ICommandInteractionModel`](ICommandInteractionModel.md).[`command`](ICommandInteractionModel.md#command)

#### Source

[model/abstractions/ICommandInteractionModel.ts:14](https://github.com/scorixear/discord.ts-architecture/blob/23a5e89b62121558f2e262f887835068b27155b5/src/model/abstractions/ICommandInteractionModel.ts#L14)

***

### deferReply?

```ts
optional readonly deferReply: number;
```

The amount of milliseconds to defer the reply if no reply was already made. If undefined, does not defer reply

#### Inherited from

[`ICommandInteractionModel`](ICommandInteractionModel.md).[`deferReply`](ICommandInteractionModel.md#deferreply)

#### Source

[model/abstractions/ICommandInteractionModel.ts:71](https://github.com/scorixear/discord.ts-architecture/blob/23a5e89b62121558f2e262f887835068b27155b5/src/model/abstractions/ICommandInteractionModel.ts#L71)

***

### deferReplyEphemeral?

```ts
optional readonly deferReplyEphemeral: boolean;
```

If true, will defer reply as ephemeral, making the reply ephemeral aswell

#### Inherited from

[`ICommandInteractionModel`](ICommandInteractionModel.md).[`deferReplyEphemeral`](ICommandInteractionModel.md#deferreplyephemeral)

#### Source

[model/abstractions/ICommandInteractionModel.ts:78](https://github.com/scorixear/discord.ts-architecture/blob/23a5e89b62121558f2e262f887835068b27155b5/src/model/abstractions/ICommandInteractionModel.ts#L78)

***

### description

```ts
description: string;
```

The description of the command (not more then 120 characters)

#### Memberof

ICommandInteractionModel

#### Inherited from

[`ICommandInteractionModel`](ICommandInteractionModel.md).[`description`](ICommandInteractionModel.md#description)

#### Source

[model/abstractions/ICommandInteractionModel.ts:21](https://github.com/scorixear/discord.ts-architecture/blob/23a5e89b62121558f2e262f887835068b27155b5/src/model/abstractions/ICommandInteractionModel.ts#L21)

***

### example

```ts
example: string;
```

An example how to use the command

#### Memberof

ICommandInteractionModel

#### Inherited from

[`ICommandInteractionModel`](ICommandInteractionModel.md).[`example`](ICommandInteractionModel.md#example)

#### Source

[model/abstractions/ICommandInteractionModel.ts:28](https://github.com/scorixear/discord.ts-architecture/blob/23a5e89b62121558f2e262f887835068b27155b5/src/model/abstractions/ICommandInteractionModel.ts#L28)

***

### slashCommandBuilder

```ts
slashCommandBuilder: SlashCommandBuilder;
```

The builder used for this command

#### Memberof

ICommandInteractionModel

#### Inherited from

[`ICommandInteractionModel`](ICommandInteractionModel.md).[`slashCommandBuilder`](ICommandInteractionModel.md#slashcommandbuilder)

#### Source

[model/abstractions/ICommandInteractionModel.ts:63](https://github.com/scorixear/discord.ts-architecture/blob/23a5e89b62121558f2e262f887835068b27155b5/src/model/abstractions/ICommandInteractionModel.ts#L63)

***

### usage

```ts
usage: string;
```

The usage of the command

#### Memberof

ICommandInteractionModel

#### Inherited from

[`ICommandInteractionModel`](ICommandInteractionModel.md).[`usage`](ICommandInteractionModel.md#usage)

#### Source

[model/abstractions/ICommandInteractionModel.ts:42](https://github.com/scorixear/discord.ts-architecture/blob/23a5e89b62121558f2e262f887835068b27155b5/src/model/abstractions/ICommandInteractionModel.ts#L42)

## Methods

### activateDeferredReply()

```ts
activateDeferredReply(interaction: ChatInputCommandInteraction<CacheType>): void
```

Calls a deferred reply if the interaction was not replied to / deferred in the given [deferReply](ICommandInteractionModel.md#deferreply) timeframe

#### Parameters

• **interaction**: `ChatInputCommandInteraction`\<`CacheType`\>

the interaction to activate deferred reply for

#### Returns

`void`

#### Inherited from

[`ICommandInteractionModel`](ICommandInteractionModel.md).[`activateDeferredReply`](ICommandInteractionModel.md#activatedeferredreply)

#### Source

[model/abstractions/ICommandInteractionModel.ts:90](https://github.com/scorixear/discord.ts-architecture/blob/23a5e89b62121558f2e262f887835068b27155b5/src/model/abstractions/ICommandInteractionModel.ts#L90)

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

#### Inherited from

[`ICommandInteractionModel`](ICommandInteractionModel.md).[`checkPermissions`](ICommandInteractionModel.md#checkpermissions)

#### Source

[model/abstractions/ICommandInteractionModel.ts:97](https://github.com/scorixear/discord.ts-architecture/blob/23a5e89b62121558f2e262f887835068b27155b5/src/model/abstractions/ICommandInteractionModel.ts#L97)

***

### handle()

```ts
handle(interaction: ChatInputCommandInteraction<CacheType>): Promise<void>
```

Called when

#### Parameters

• **interaction**: `ChatInputCommandInteraction`\<`CacheType`\>

the interaction received

#### Returns

`Promise`\<`void`\>

#### Inherited from

[`ICommandInteractionModel`](ICommandInteractionModel.md).[`handle`](ICommandInteractionModel.md#handle)

#### See

ChatInputCommandInteraction was received

#### Source

[model/abstractions/ICommandInteractionModel.ts:84](https://github.com/scorixear/discord.ts-architecture/blob/23a5e89b62121558f2e262f887835068b27155b5/src/model/abstractions/ICommandInteractionModel.ts#L84)

***

### handleAutocomplete()

```ts
handleAutocomplete(interaction: AutocompleteInteraction<CacheType>): Promise<void>
```

Called when AutocompleteInteraction was received

#### Parameters

• **interaction**: `AutocompleteInteraction`\<`CacheType`\>

the interaction received

#### Returns

`Promise`\<`void`\>

#### Source

[model/abstractions/IAutocompleteInteractionModel.ts:13](https://github.com/scorixear/discord.ts-architecture/blob/23a5e89b62121558f2e262f887835068b27155b5/src/model/abstractions/IAutocompleteInteractionModel.ts#L13)
