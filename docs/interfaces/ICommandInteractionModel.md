[**discord.ts-architecture**](../README.md) • **Docs**

***

[discord.ts-architecture](../README.md) / ICommandInteractionModel

# Interface: ICommandInteractionModel

Represents one SlashCommand and should be implemented by custom implementation (overriding the handle method).
See

## See

CommandInteractionModel for a abstract base class

## Extended by

- [`IAutocompleteInteractionModel`](IAutocompleteInteractionModel.md)

## Properties

### Ready?

```ts
optional Ready: Promise<any>;
```

A Promise that should be resolved when the command is ready to be used

#### Memberof

ICommandInteractionModel

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

#### Source

[model/abstractions/ICommandInteractionModel.ts:14](https://github.com/scorixear/discord.ts-architecture/blob/23a5e89b62121558f2e262f887835068b27155b5/src/model/abstractions/ICommandInteractionModel.ts#L14)

***

### deferReply?

```ts
optional readonly deferReply: number;
```

The amount of milliseconds to defer the reply if no reply was already made. If undefined, does not defer reply

#### Source

[model/abstractions/ICommandInteractionModel.ts:71](https://github.com/scorixear/discord.ts-architecture/blob/23a5e89b62121558f2e262f887835068b27155b5/src/model/abstractions/ICommandInteractionModel.ts#L71)

***

### deferReplyEphemeral?

```ts
optional readonly deferReplyEphemeral: boolean;
```

If true, will defer reply as ephemeral, making the reply ephemeral aswell

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

#### See

ChatInputCommandInteraction was received

#### Source

[model/abstractions/ICommandInteractionModel.ts:84](https://github.com/scorixear/discord.ts-architecture/blob/23a5e89b62121558f2e262f887835068b27155b5/src/model/abstractions/ICommandInteractionModel.ts#L84)
