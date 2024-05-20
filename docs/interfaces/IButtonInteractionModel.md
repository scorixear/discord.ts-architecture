[**discord.ts-architecture**](../README.md) • **Docs**

***

[discord.ts-architecture](../README.md) / IButtonInteractionModel

# Interface: IButtonInteractionModel

Represents a Button Interaction and should be implemented by custom implementation (overriding the handle method).
See

## See

ButtonInteractionModel for a abstract base class

## Properties

### deferReply?

```ts
optional readonly deferReply: number;
```

The amount of milliseconds to defer the reply if no reply was already made. If undefined, does not defer reply

#### Source

[model/abstractions/IButtonInteractionModel.ts:22](https://github.com/scorixear/discord.ts-architecture/blob/23a5e89b62121558f2e262f887835068b27155b5/src/model/abstractions/IButtonInteractionModel.ts#L22)

***

### deferReplyEphemeral?

```ts
optional readonly deferReplyEphemeral: boolean;
```

If true, will defer reply as ephemeral, making the reply ephemeral aswell

#### Source

[model/abstractions/IButtonInteractionModel.ts:29](https://github.com/scorixear/discord.ts-architecture/blob/23a5e89b62121558f2e262f887835068b27155b5/src/model/abstractions/IButtonInteractionModel.ts#L29)

***

### id

```ts
id: string;
```

The custom-id for this interaction (actual custom-id can be longer, only start is checked)

#### Memberof

IButtonInteractionModel

#### Source

[model/abstractions/IButtonInteractionModel.ts:14](https://github.com/scorixear/discord.ts-architecture/blob/23a5e89b62121558f2e262f887835068b27155b5/src/model/abstractions/IButtonInteractionModel.ts#L14)

## Methods

### activateDeferredReply()

```ts
activateDeferredReply(interaction: ButtonInteraction<CacheType>): void
```

Calls a deferred reply if the interaction was not replied to / deferred in the given [deferReply](IButtonInteractionModel.md#deferreply) timeframe

#### Parameters

• **interaction**: `ButtonInteraction`\<`CacheType`\>

the interaction to activate deferred reply for

#### Returns

`void`

#### Source

[model/abstractions/IButtonInteractionModel.ts:40](https://github.com/scorixear/discord.ts-architecture/blob/23a5e89b62121558f2e262f887835068b27155b5/src/model/abstractions/IButtonInteractionModel.ts#L40)

***

### handle()

```ts
handle(interaction: ButtonInteraction<CacheType>): Promise<void>
```

Called when

#### Parameters

• **interaction**: `ButtonInteraction`\<`CacheType`\>

the interaction received

#### Returns

`Promise`\<`void`\>

#### See

ButtonInteraction was received

#### Source

[model/abstractions/IButtonInteractionModel.ts:35](https://github.com/scorixear/discord.ts-architecture/blob/23a5e89b62121558f2e262f887835068b27155b5/src/model/abstractions/IButtonInteractionModel.ts#L35)
