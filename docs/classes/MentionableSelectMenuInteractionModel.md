[**discord.ts-architecture**](../README.md) • **Docs**

***

[discord.ts-architecture](../README.md) / MentionableSelectMenuInteractionModel

# Class: `abstract` MentionableSelectMenuInteractionModel

Represents Implemenation for

## See

MentionableSelectMenuInteraction

## Extends

- [`AnySelectMenuInteractionModel`](AnySelectMenuInteractionModel.md)

## Implements

- [`IMentionableSelectMenuInteractionModel`](../interfaces/IMentionableSelectMenuInteractionModel.md)

## Constructors

### new MentionableSelectMenuInteractionModel()

```ts
new MentionableSelectMenuInteractionModel(
   id: string, 
   deferReply: number, 
   deferReplyEphemeral: boolean): MentionableSelectMenuInteractionModel
```

Default constructor

#### Parameters

• **id**: `string`

the custom-id for this interaction (actual custom-id can be longer, check is done wiht startsWith())

• **deferReply**: `number`= `2000`

The amount of milliseconds to defer the reply if no reply was already made. If undefined, does not defer reply

• **deferReplyEphemeral**: `boolean`= `true`

If true, will defer reply as ephemeral, making the reply ephemeral aswell

#### Returns

[`MentionableSelectMenuInteractionModel`](MentionableSelectMenuInteractionModel.md)

#### Overrides

[`AnySelectMenuInteractionModel`](AnySelectMenuInteractionModel.md).[`constructor`](AnySelectMenuInteractionModel.md#constructors)

#### Source

[model/SelectMenuInteractionModels/MentionableSelectMenuInteractionModel.ts:17](https://github.com/scorixear/discord.ts-architecture/blob/23a5e89b62121558f2e262f887835068b27155b5/src/model/SelectMenuInteractionModels/MentionableSelectMenuInteractionModel.ts#L17)

## Properties

### deferReply?

```ts
optional readonly deferReply: number;
```

The amount of milliseconds to defer the reply if no reply was already made. If undefined, does not defer reply

#### Memberof

AnySelectMenuInteractionModel

#### Implementation of

[`IMentionableSelectMenuInteractionModel`](../interfaces/IMentionableSelectMenuInteractionModel.md).[`deferReply`](../interfaces/IMentionableSelectMenuInteractionModel.md#deferreply)

#### Inherited from

[`AnySelectMenuInteractionModel`](AnySelectMenuInteractionModel.md).[`deferReply`](AnySelectMenuInteractionModel.md#deferreply)

#### Source

[model/SelectMenuInteractionModels/AnySelectMenuInteractionModel.ts:23](https://github.com/scorixear/discord.ts-architecture/blob/23a5e89b62121558f2e262f887835068b27155b5/src/model/SelectMenuInteractionModels/AnySelectMenuInteractionModel.ts#L23)

***

### deferReplyEphemeral?

```ts
optional readonly deferReplyEphemeral: boolean;
```

If true, will defer reply as ephemeral, making the reply ephemeral aswell

#### Memberof

AnySelectMenuInteractionModel

#### Implementation of

[`IMentionableSelectMenuInteractionModel`](../interfaces/IMentionableSelectMenuInteractionModel.md).[`deferReplyEphemeral`](../interfaces/IMentionableSelectMenuInteractionModel.md#deferreplyephemeral)

#### Inherited from

[`AnySelectMenuInteractionModel`](AnySelectMenuInteractionModel.md).[`deferReplyEphemeral`](AnySelectMenuInteractionModel.md#deferreplyephemeral)

#### Source

[model/SelectMenuInteractionModels/AnySelectMenuInteractionModel.ts:31](https://github.com/scorixear/discord.ts-architecture/blob/23a5e89b62121558f2e262f887835068b27155b5/src/model/SelectMenuInteractionModels/AnySelectMenuInteractionModel.ts#L31)

***

### id

```ts
id: string;
```

The custom-id for this interaction (actual custom-id can be longer, only start is checked)

#### Memberof

AnySelectMenuInteractionModel

#### Implementation of

[`IMentionableSelectMenuInteractionModel`](../interfaces/IMentionableSelectMenuInteractionModel.md).[`id`](../interfaces/IMentionableSelectMenuInteractionModel.md#id)

#### Inherited from

[`AnySelectMenuInteractionModel`](AnySelectMenuInteractionModel.md).[`id`](AnySelectMenuInteractionModel.md#id)

#### Source

[model/SelectMenuInteractionModels/AnySelectMenuInteractionModel.ts:15](https://github.com/scorixear/discord.ts-architecture/blob/23a5e89b62121558f2e262f887835068b27155b5/src/model/SelectMenuInteractionModels/AnySelectMenuInteractionModel.ts#L15)

## Methods

### activateDeferredReply()

```ts
activateDeferredReply(interaction: MentionableSelectMenuInteraction<CacheType>): void
```

Calls a deferred reply if the interaction was not replied to / deferred in the given [deferReply](AnySelectMenuInteractionModel.md#deferreply) timeframe

#### Parameters

• **interaction**: `MentionableSelectMenuInteraction`\<`CacheType`\>

the interaction to activate deferred reply for

#### Returns

`void`

#### Implementation of

[`IMentionableSelectMenuInteractionModel`](../interfaces/IMentionableSelectMenuInteractionModel.md).[`activateDeferredReply`](../interfaces/IMentionableSelectMenuInteractionModel.md#activatedeferredreply)

#### Overrides

[`AnySelectMenuInteractionModel`](AnySelectMenuInteractionModel.md).[`activateDeferredReply`](AnySelectMenuInteractionModel.md#activatedeferredreply)

#### Source

[model/SelectMenuInteractionModels/MentionableSelectMenuInteractionModel.ts:31](https://github.com/scorixear/discord.ts-architecture/blob/23a5e89b62121558f2e262f887835068b27155b5/src/model/SelectMenuInteractionModels/MentionableSelectMenuInteractionModel.ts#L31)

***

### handle()

```ts
abstract handle(interaction: MentionableSelectMenuInteraction<CacheType>): Promise<void>
```

Called when

#### Parameters

• **interaction**: `MentionableSelectMenuInteraction`\<`CacheType`\>

the interaction received

#### Returns

`Promise`\<`void`\>

#### Implementation of

[`IMentionableSelectMenuInteractionModel`](../interfaces/IMentionableSelectMenuInteractionModel.md).[`handle`](../interfaces/IMentionableSelectMenuInteractionModel.md#handle)

#### Overrides

[`AnySelectMenuInteractionModel`](AnySelectMenuInteractionModel.md).[`handle`](AnySelectMenuInteractionModel.md#handle)

#### See

MentionableSelectMenuInteraction was received

#### Source

[model/SelectMenuInteractionModels/MentionableSelectMenuInteractionModel.ts:25](https://github.com/scorixear/discord.ts-architecture/blob/23a5e89b62121558f2e262f887835068b27155b5/src/model/SelectMenuInteractionModels/MentionableSelectMenuInteractionModel.ts#L25)
