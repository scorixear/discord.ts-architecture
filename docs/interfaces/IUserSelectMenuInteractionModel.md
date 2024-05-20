[**discord.ts-architecture**](../README.md) • **Docs**

***

[discord.ts-architecture](../README.md) / IUserSelectMenuInteractionModel

# Interface: IUserSelectMenuInteractionModel

Represents one UserSelectInteraction and should be implemented by custom implementation (overriding the handle method).
See

## See

UserSelectMenuInteractionModel for a abstract base class

## Extends

- [`IAnySelectMenuInteractionModel`](IAnySelectMenuInteractionModel.md)

## Properties

### deferReply?

```ts
optional readonly deferReply: number;
```

The amount of milliseconds to defer the reply if no reply was already made. If undefined, does not defer reply

#### Inherited from

[`IAnySelectMenuInteractionModel`](IAnySelectMenuInteractionModel.md).[`deferReply`](IAnySelectMenuInteractionModel.md#deferreply)

#### Source

[model/abstractions/SelectMenuInterationModels/IAnySelectMenuInteractionModel.ts:15](https://github.com/scorixear/discord.ts-architecture/blob/23a5e89b62121558f2e262f887835068b27155b5/src/model/abstractions/SelectMenuInterationModels/IAnySelectMenuInteractionModel.ts#L15)

***

### deferReplyEphemeral?

```ts
optional readonly deferReplyEphemeral: boolean;
```

If true, will defer reply as ephemeral, making the reply ephemeral aswell

#### Inherited from

[`IAnySelectMenuInteractionModel`](IAnySelectMenuInteractionModel.md).[`deferReplyEphemeral`](IAnySelectMenuInteractionModel.md#deferreplyephemeral)

#### Source

[model/abstractions/SelectMenuInterationModels/IAnySelectMenuInteractionModel.ts:22](https://github.com/scorixear/discord.ts-architecture/blob/23a5e89b62121558f2e262f887835068b27155b5/src/model/abstractions/SelectMenuInterationModels/IAnySelectMenuInteractionModel.ts#L22)

***

### id

```ts
id: string;
```

#### Inherited from

[`IAnySelectMenuInteractionModel`](IAnySelectMenuInteractionModel.md).[`id`](IAnySelectMenuInteractionModel.md#id)

#### Source

[model/abstractions/SelectMenuInterationModels/IAnySelectMenuInteractionModel.ts:8](https://github.com/scorixear/discord.ts-architecture/blob/23a5e89b62121558f2e262f887835068b27155b5/src/model/abstractions/SelectMenuInterationModels/IAnySelectMenuInteractionModel.ts#L8)

## Methods

### activateDeferredReply()

```ts
activateDeferredReply(interaction: UserSelectMenuInteraction<CacheType>): void
```

Calls a deferred reply if the interaction was not replied to / deferred in the given [deferReply](IAnySelectMenuInteractionModel.md#deferreply) timeframe

#### Parameters

• **interaction**: `UserSelectMenuInteraction`\<`CacheType`\>

the interaction to activate deferred reply for

#### Returns

`void`

#### Overrides

[`IAnySelectMenuInteractionModel`](IAnySelectMenuInteractionModel.md).[`activateDeferredReply`](IAnySelectMenuInteractionModel.md#activatedeferredreply)

#### Source

[model/abstractions/SelectMenuInterationModels/IUserSelectMenuInteractionModel.ts:19](https://github.com/scorixear/discord.ts-architecture/blob/23a5e89b62121558f2e262f887835068b27155b5/src/model/abstractions/SelectMenuInterationModels/IUserSelectMenuInteractionModel.ts#L19)

***

### handle()

```ts
handle(interaction: UserSelectMenuInteraction<CacheType>): Promise<void>
```

Called when

#### Parameters

• **interaction**: `UserSelectMenuInteraction`\<`CacheType`\>

the interaction received

#### Returns

`Promise`\<`void`\>

#### Overrides

[`IAnySelectMenuInteractionModel`](IAnySelectMenuInteractionModel.md).[`handle`](IAnySelectMenuInteractionModel.md#handle)

#### See

UserSelectMenuInteraction was received

#### Source

[model/abstractions/SelectMenuInterationModels/IUserSelectMenuInteractionModel.ts:13](https://github.com/scorixear/discord.ts-architecture/blob/23a5e89b62121558f2e262f887835068b27155b5/src/model/abstractions/SelectMenuInterationModels/IUserSelectMenuInteractionModel.ts#L13)
