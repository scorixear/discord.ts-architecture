[**discord.ts-architecture**](../README.md) • **Docs**

***

[discord.ts-architecture](../README.md) / IAnySelectMenuInteractionModel

# Interface: IAnySelectMenuInteractionModel

Represents one SelectMenuInteraction and should be implemented by custom implementation (overriding the handle method).
See

## See

AnySelectMenuInteractionModel for a abstract base class

## Extended by

- [`IChannelSelectMenuInteractionModel`](IChannelSelectMenuInteractionModel.md)
- [`IMentionableSelectMenuInteractionModel`](IMentionableSelectMenuInteractionModel.md)
- [`IRoleSelectMenuInteractionModel`](IRoleSelectMenuInteractionModel.md)
- [`IStringSelectMenuInteractionModel`](IStringSelectMenuInteractionModel.md)
- [`IUserSelectMenuInteractionModel`](IUserSelectMenuInteractionModel.md)

## Properties

### deferReply?

```ts
optional readonly deferReply: number;
```

The amount of milliseconds to defer the reply if no reply was already made. If undefined, does not defer reply

#### Source

[model/abstractions/SelectMenuInterationModels/IAnySelectMenuInteractionModel.ts:15](https://github.com/scorixear/discord.ts-architecture/blob/23a5e89b62121558f2e262f887835068b27155b5/src/model/abstractions/SelectMenuInterationModels/IAnySelectMenuInteractionModel.ts#L15)

***

### deferReplyEphemeral?

```ts
optional readonly deferReplyEphemeral: boolean;
```

If true, will defer reply as ephemeral, making the reply ephemeral aswell

#### Source

[model/abstractions/SelectMenuInterationModels/IAnySelectMenuInteractionModel.ts:22](https://github.com/scorixear/discord.ts-architecture/blob/23a5e89b62121558f2e262f887835068b27155b5/src/model/abstractions/SelectMenuInterationModels/IAnySelectMenuInteractionModel.ts#L22)

***

### id

```ts
id: string;
```

#### Source

[model/abstractions/SelectMenuInterationModels/IAnySelectMenuInteractionModel.ts:8](https://github.com/scorixear/discord.ts-architecture/blob/23a5e89b62121558f2e262f887835068b27155b5/src/model/abstractions/SelectMenuInterationModels/IAnySelectMenuInteractionModel.ts#L8)

## Methods

### activateDeferredReply()

```ts
activateDeferredReply(interaction: AnySelectMenuInteraction): void
```

Calls a deferred reply if the interaction was not replied to / deferred in the given [deferReply](IAnySelectMenuInteractionModel.md#deferreply) timeframe

#### Parameters

• **interaction**: `AnySelectMenuInteraction`

the interaction to activate deferred reply for

#### Returns

`void`

#### Source

[model/abstractions/SelectMenuInterationModels/IAnySelectMenuInteractionModel.ts:32](https://github.com/scorixear/discord.ts-architecture/blob/23a5e89b62121558f2e262f887835068b27155b5/src/model/abstractions/SelectMenuInterationModels/IAnySelectMenuInteractionModel.ts#L32)

***

### handle()

```ts
handle(interaction: AnySelectMenuInteraction): Promise<void>
```

Called when

#### Parameters

• **interaction**: `AnySelectMenuInteraction`

the interaction received

#### Returns

`Promise`\<`void`\>

#### See

AnySelectMenuInteraction was received

#### Source

[model/abstractions/SelectMenuInterationModels/IAnySelectMenuInteractionModel.ts:27](https://github.com/scorixear/discord.ts-architecture/blob/23a5e89b62121558f2e262f887835068b27155b5/src/model/abstractions/SelectMenuInterationModels/IAnySelectMenuInteractionModel.ts#L27)
