[**discord.ts-architecture**](../README.md) • **Docs**

***

[discord.ts-architecture](../README.md) / ButtonInteractionModel

# Class: `abstract` ButtonInteractionModel

Represents a Button Interaction and should be extended by custom implementation (overriding the handle method).

## Implements

- [`IButtonInteractionModel`](../interfaces/IButtonInteractionModel.md)

## Constructors

### new ButtonInteractionModel()

```ts
new ButtonInteractionModel(
   id: string, 
   deferReply: undefined | number, 
   deferReplyEphemeral: boolean): ButtonInteractionModel
```

Default constructor

#### Parameters

• **id**: `string`

the custom-id for this interaction (actual custom-id can be longer, check is done wiht startsWith())

• **deferReply**: `undefined` \| `number`= `2000`

The amount of milliseconds to defer the reply if no reply was already made. If undefined, does not defer reply

• **deferReplyEphemeral**: `boolean`= `true`

If true, will defer reply as ephemeral, making the reply ephemeral aswell

#### Returns

[`ButtonInteractionModel`](ButtonInteractionModel.md)

#### Source

[model/ButtonInteractionModel.ts:37](https://github.com/scorixear/discord.ts-architecture/blob/23a5e89b62121558f2e262f887835068b27155b5/src/model/ButtonInteractionModel.ts#L37)

## Properties

### deferReply?

```ts
optional readonly deferReply: number;
```

The amount of milliseconds to defer the reply if no reply was already made. If undefined, does not defer reply

#### Implementation of

[`IButtonInteractionModel`](../interfaces/IButtonInteractionModel.md).[`deferReply`](../interfaces/IButtonInteractionModel.md#deferreply)

#### Source

[model/ButtonInteractionModel.ts:23](https://github.com/scorixear/discord.ts-architecture/blob/23a5e89b62121558f2e262f887835068b27155b5/src/model/ButtonInteractionModel.ts#L23)

***

### deferReplyEphemeral?

```ts
optional readonly deferReplyEphemeral: boolean;
```

If true, will defer reply as ephemeral, making the reply ephemeral aswell

#### Implementation of

[`IButtonInteractionModel`](../interfaces/IButtonInteractionModel.md).[`deferReplyEphemeral`](../interfaces/IButtonInteractionModel.md#deferreplyephemeral)

#### Source

[model/ButtonInteractionModel.ts:30](https://github.com/scorixear/discord.ts-architecture/blob/23a5e89b62121558f2e262f887835068b27155b5/src/model/ButtonInteractionModel.ts#L30)

***

### id

```ts
id: string;
```

The custom-id for this interaction (actual custom-id can be longer, only start is checked)

#### Memberof

ButtonInteractionModel

#### Implementation of

[`IButtonInteractionModel`](../interfaces/IButtonInteractionModel.md).[`id`](../interfaces/IButtonInteractionModel.md#id)

#### Source

[model/ButtonInteractionModel.ts:16](https://github.com/scorixear/discord.ts-architecture/blob/23a5e89b62121558f2e262f887835068b27155b5/src/model/ButtonInteractionModel.ts#L16)

## Methods

### activateDeferredReply()

```ts
activateDeferredReply(interaction: ButtonInteraction<CacheType>): void
```

Calls a deferred reply if the interaction was not replied to / deferred in the given [deferReply](ButtonInteractionModel.md#deferreply) timeframe

#### Parameters

• **interaction**: `ButtonInteraction`\<`CacheType`\>

the interaction to activate deferred reply for

#### Returns

`void`

#### Implementation of

[`IButtonInteractionModel`](../interfaces/IButtonInteractionModel.md).[`activateDeferredReply`](../interfaces/IButtonInteractionModel.md#activatedeferredreply)

#### Source

[model/ButtonInteractionModel.ts:53](https://github.com/scorixear/discord.ts-architecture/blob/23a5e89b62121558f2e262f887835068b27155b5/src/model/ButtonInteractionModel.ts#L53)

***

### handle()

```ts
abstract handle(interaction: ButtonInteraction<CacheType>): Promise<void>
```

Called when

#### Parameters

• **interaction**: `ButtonInteraction`\<`CacheType`\>

the interaction received

#### Returns

`Promise`\<`void`\>

#### Implementation of

[`IButtonInteractionModel`](../interfaces/IButtonInteractionModel.md).[`handle`](../interfaces/IButtonInteractionModel.md#handle)

#### See

ButtonInteraction was received

#### Source

[model/ButtonInteractionModel.ts:47](https://github.com/scorixear/discord.ts-architecture/blob/23a5e89b62121558f2e262f887835068b27155b5/src/model/ButtonInteractionModel.ts#L47)
