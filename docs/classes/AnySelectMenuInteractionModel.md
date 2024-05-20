[**discord.ts-architecture**](../README.md) • **Docs**

***

[discord.ts-architecture](../README.md) / AnySelectMenuInteractionModel

# Class: `abstract` AnySelectMenuInteractionModel

Represents Implemenation for

## See

AnySelectMenuInteraction

## Extended by

- [`ChannelSelectMenuInteractionModel`](ChannelSelectMenuInteractionModel.md)
- [`MentionableSelectMenuInteractionModel`](MentionableSelectMenuInteractionModel.md)
- [`RoleSelectMenuInteractionModel`](RoleSelectMenuInteractionModel.md)
- [`StringSelectMenuInteractionModel`](StringSelectMenuInteractionModel.md)
- [`UserSelectMenuInteractionModel`](UserSelectMenuInteractionModel.md)

## Implements

- [`IAnySelectMenuInteractionModel`](../interfaces/IAnySelectMenuInteractionModel.md)

## Constructors

### new AnySelectMenuInteractionModel()

```ts
new AnySelectMenuInteractionModel(
   id: string, 
   deferReply: number, 
   deferReplyEphemeral: boolean): AnySelectMenuInteractionModel
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

[`AnySelectMenuInteractionModel`](AnySelectMenuInteractionModel.md)

#### Source

[model/SelectMenuInteractionModels/AnySelectMenuInteractionModel.ts:39](https://github.com/scorixear/discord.ts-architecture/blob/23a5e89b62121558f2e262f887835068b27155b5/src/model/SelectMenuInteractionModels/AnySelectMenuInteractionModel.ts#L39)

## Properties

### deferReply?

```ts
optional readonly deferReply: number;
```

The amount of milliseconds to defer the reply if no reply was already made. If undefined, does not defer reply

#### Memberof

AnySelectMenuInteractionModel

#### Implementation of

[`IAnySelectMenuInteractionModel`](../interfaces/IAnySelectMenuInteractionModel.md).[`deferReply`](../interfaces/IAnySelectMenuInteractionModel.md#deferreply)

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

[`IAnySelectMenuInteractionModel`](../interfaces/IAnySelectMenuInteractionModel.md).[`deferReplyEphemeral`](../interfaces/IAnySelectMenuInteractionModel.md#deferreplyephemeral)

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

[`IAnySelectMenuInteractionModel`](../interfaces/IAnySelectMenuInteractionModel.md).[`id`](../interfaces/IAnySelectMenuInteractionModel.md#id)

#### Source

[model/SelectMenuInteractionModels/AnySelectMenuInteractionModel.ts:15](https://github.com/scorixear/discord.ts-architecture/blob/23a5e89b62121558f2e262f887835068b27155b5/src/model/SelectMenuInteractionModels/AnySelectMenuInteractionModel.ts#L15)

## Methods

### activateDeferredReply()

```ts
activateDeferredReply(interaction: AnySelectMenuInteraction): void
```

Calls a deferred reply if the interaction was not replied to / deferred in the given [deferReply](AnySelectMenuInteractionModel.md#deferreply) timeframe

#### Parameters

• **interaction**: `AnySelectMenuInteraction`

the interaction to activate deferred reply for

#### Returns

`void`

#### Implementation of

[`IAnySelectMenuInteractionModel`](../interfaces/IAnySelectMenuInteractionModel.md).[`activateDeferredReply`](../interfaces/IAnySelectMenuInteractionModel.md#activatedeferredreply)

#### Source

[model/SelectMenuInteractionModels/AnySelectMenuInteractionModel.ts:55](https://github.com/scorixear/discord.ts-architecture/blob/23a5e89b62121558f2e262f887835068b27155b5/src/model/SelectMenuInteractionModels/AnySelectMenuInteractionModel.ts#L55)

***

### handle()

```ts
abstract handle(interaction: AnySelectMenuInteraction): Promise<void>
```

Called when

#### Parameters

• **interaction**: `AnySelectMenuInteraction`

the interaction received

#### Returns

`Promise`\<`void`\>

#### Implementation of

[`IAnySelectMenuInteractionModel`](../interfaces/IAnySelectMenuInteractionModel.md).[`handle`](../interfaces/IAnySelectMenuInteractionModel.md#handle)

#### See

AnySelectMenuInteraction was received

#### Source

[model/SelectMenuInteractionModels/AnySelectMenuInteractionModel.ts:49](https://github.com/scorixear/discord.ts-architecture/blob/23a5e89b62121558f2e262f887835068b27155b5/src/model/SelectMenuInteractionModels/AnySelectMenuInteractionModel.ts#L49)
