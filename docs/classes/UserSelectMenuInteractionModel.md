[**discord.ts-architecture**](../README.md) • **Docs**

***

[discord.ts-architecture](../README.md) / UserSelectMenuInteractionModel

# Class: `abstract` UserSelectMenuInteractionModel

Represents Implemenation for

## See

UserSelectMenuInteraction

## Extends

- [`AnySelectMenuInteractionModel`](AnySelectMenuInteractionModel.md)

## Implements

- [`IUserSelectMenuInteractionModel`](../interfaces/IUserSelectMenuInteractionModel.md)

## Constructors

### new UserSelectMenuInteractionModel()

```ts
new UserSelectMenuInteractionModel(
   id: string, 
   deferReply: number, 
   deferReplyEphemeral: boolean): UserSelectMenuInteractionModel
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

[`UserSelectMenuInteractionModel`](UserSelectMenuInteractionModel.md)

#### Overrides

[`AnySelectMenuInteractionModel`](AnySelectMenuInteractionModel.md).[`constructor`](AnySelectMenuInteractionModel.md#constructors)

#### Source

[model/SelectMenuInteractionModels/UserSelectMenuInteractionModel.ts:17](https://github.com/scorixear/discord.ts-architecture/blob/23a5e89b62121558f2e262f887835068b27155b5/src/model/SelectMenuInteractionModels/UserSelectMenuInteractionModel.ts#L17)

## Properties

### deferReply?

```ts
optional readonly deferReply: number;
```

The amount of milliseconds to defer the reply if no reply was already made. If undefined, does not defer reply

#### Memberof

AnySelectMenuInteractionModel

#### Implementation of

[`IUserSelectMenuInteractionModel`](../interfaces/IUserSelectMenuInteractionModel.md).[`deferReply`](../interfaces/IUserSelectMenuInteractionModel.md#deferreply)

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

[`IUserSelectMenuInteractionModel`](../interfaces/IUserSelectMenuInteractionModel.md).[`deferReplyEphemeral`](../interfaces/IUserSelectMenuInteractionModel.md#deferreplyephemeral)

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

[`IUserSelectMenuInteractionModel`](../interfaces/IUserSelectMenuInteractionModel.md).[`id`](../interfaces/IUserSelectMenuInteractionModel.md#id)

#### Inherited from

[`AnySelectMenuInteractionModel`](AnySelectMenuInteractionModel.md).[`id`](AnySelectMenuInteractionModel.md#id)

#### Source

[model/SelectMenuInteractionModels/AnySelectMenuInteractionModel.ts:15](https://github.com/scorixear/discord.ts-architecture/blob/23a5e89b62121558f2e262f887835068b27155b5/src/model/SelectMenuInteractionModels/AnySelectMenuInteractionModel.ts#L15)

## Methods

### activateDeferredReply()

```ts
activateDeferredReply(interaction: UserSelectMenuInteraction<CacheType>): void
```

Calls a deferred reply if the interaction was not replied to / deferred in the given [deferReply](AnySelectMenuInteractionModel.md#deferreply) timeframe

#### Parameters

• **interaction**: `UserSelectMenuInteraction`\<`CacheType`\>

the interaction to activate deferred reply for

#### Returns

`void`

#### Implementation of

[`IUserSelectMenuInteractionModel`](../interfaces/IUserSelectMenuInteractionModel.md).[`activateDeferredReply`](../interfaces/IUserSelectMenuInteractionModel.md#activatedeferredreply)

#### Overrides

[`AnySelectMenuInteractionModel`](AnySelectMenuInteractionModel.md).[`activateDeferredReply`](AnySelectMenuInteractionModel.md#activatedeferredreply)

#### Source

[model/SelectMenuInteractionModels/UserSelectMenuInteractionModel.ts:31](https://github.com/scorixear/discord.ts-architecture/blob/23a5e89b62121558f2e262f887835068b27155b5/src/model/SelectMenuInteractionModels/UserSelectMenuInteractionModel.ts#L31)

***

### handle()

```ts
abstract handle(interaction: UserSelectMenuInteraction<CacheType>): Promise<void>
```

Called when

#### Parameters

• **interaction**: `UserSelectMenuInteraction`\<`CacheType`\>

the interaction received

#### Returns

`Promise`\<`void`\>

#### Implementation of

[`IUserSelectMenuInteractionModel`](../interfaces/IUserSelectMenuInteractionModel.md).[`handle`](../interfaces/IUserSelectMenuInteractionModel.md#handle)

#### Overrides

[`AnySelectMenuInteractionModel`](AnySelectMenuInteractionModel.md).[`handle`](AnySelectMenuInteractionModel.md#handle)

#### See

UserSelectMenuInteraction was received

#### Source

[model/SelectMenuInteractionModels/UserSelectMenuInteractionModel.ts:25](https://github.com/scorixear/discord.ts-architecture/blob/23a5e89b62121558f2e262f887835068b27155b5/src/model/SelectMenuInteractionModels/UserSelectMenuInteractionModel.ts#L25)
