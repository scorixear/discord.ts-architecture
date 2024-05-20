[**discord.ts-architecture**](../README.md) • **Docs**

***

[discord.ts-architecture](../README.md) / MessageHandler

# Class: MessageHandler

A class to handle messages and send embeds

## Constructors

### new MessageHandler()

```ts
new MessageHandler(): MessageHandler
```

#### Returns

[`MessageHandler`](MessageHandler.md)

## Methods

### followUp()

```ts
static followUp(param0: object): Promise<Message<boolean> | InteractionResponse<boolean>>
```

Follows up to an interaction (if not replied, it replies; works with defered replies aswell)

#### Parameters

• **param0**

the parameters of the embed

• **param0.categories?**: `object`[]

• **param0.color?**: `number`

• **param0.components?**: `ActionRowBuilder`\<
  \| `ButtonBuilder`
  \| `StringSelectMenuBuilder`
  \| `UserSelectMenuBuilder`
  \| `RoleSelectMenuBuilder`
  \| `MentionableSelectMenuBuilder`
  \| `ChannelSelectMenuBuilder`\>[]

• **param0.description?**: `string`

• **param0.ephemeral?**: `boolean`

• **param0.files?**: `string`[]

• **param0.image?**: `string`

• **param0.interaction**: `ButtonInteraction`\<`CacheType`\> \| `AnySelectMenuInteraction` \| `CommandInteraction`\<`CacheType`\>

• **param0.thumbnail?**: `string`

• **param0.title?**: `string`

• **param0.url?**: `string`

#### Returns

`Promise`\<`Message`\<`boolean`\> \| `InteractionResponse`\<`boolean`\>\>

the sent message object

#### Source

[handlers/messageHandler.ts:174](https://github.com/scorixear/discord.ts-architecture/blob/23a5e89b62121558f2e262f887835068b27155b5/src/handlers/messageHandler.ts#L174)

***

### getEmbed()

```ts
static getEmbed(param0: object): Promise<object>
```

Returns a

#### Parameters

• **param0**

the parameters for the embed

• **param0.author?**: `User`

• **param0.categories?**: `object`[]

• **param0.color?**: `number`

• **param0.components?**: `ActionRowBuilder`\<
  \| `ButtonBuilder`
  \| `StringSelectMenuBuilder`
  \| `UserSelectMenuBuilder`
  \| `RoleSelectMenuBuilder`
  \| `MentionableSelectMenuBuilder`
  \| `ChannelSelectMenuBuilder`\>[]

• **param0.description?**: `string`

• **param0.ephemeral?**: `boolean`

• **param0.files?**: `string`[]

• **param0.guild?**: `Guild`

• **param0.image?**: `string`

• **param0.thumbnail?**: `string`

• **param0.title?**: `string`

• **param0.url?**: `string`

#### Returns

`Promise`\<`object`\>

the MessageOptions object

##### components?

```ts
optional components: ActionRowBuilder<
  | ButtonBuilder
  | StringSelectMenuBuilder
  | UserSelectMenuBuilder
  | RoleSelectMenuBuilder
  | MentionableSelectMenuBuilder
  | ChannelSelectMenuBuilder>[];
```

##### embeds

```ts
embeds: EmbedBuilder[];
```

##### ephemeral

```ts
ephemeral: boolean;
```

##### files

```ts
files: AttachmentBuilder[];
```

#### See

object ready to be send

#### Source

[handlers/messageHandler.ts:377](https://github.com/scorixear/discord.ts-architecture/blob/23a5e89b62121558f2e262f887835068b27155b5/src/handlers/messageHandler.ts#L377)

***

### getEmbedExplicit()

```ts
static getEmbedExplicit(
   guild?: Guild, 
   author?: User, 
   title?: string, 
   categories?: object[], 
   color?: number, 
   description?: string, 
   thumbnail?: string, 
   image?: string, 
   url?: string, 
   files?: string[], 
   components?: ActionRowBuilder<
  | ButtonBuilder
  | StringSelectMenuBuilder
  | UserSelectMenuBuilder
  | RoleSelectMenuBuilder
  | MentionableSelectMenuBuilder
  | ChannelSelectMenuBuilder>[], 
ephemeral?: boolean): Promise<object>
```

Returns a

#### Parameters

• **guild?**: `Guild`

the guild to send to

• **author?**: `User`

the author set in the bottom of the message

• **title?**: `string`

the title of the message

• **categories?**: `object`[]

categories for this message

• **color?**: `number`

the HEX color for this message

• **description?**: `string`

the description for this message

• **thumbnail?**: `string`

the URL to the thumbnail

• **image?**: `string`

the path to the file under ./src/assets/

• **url?**: `string`

the URL of this embed

• **files?**: `string`[]

path to files attached to the message

• **components?**: `ActionRowBuilder`\<
  \| `ButtonBuilder`
  \| `StringSelectMenuBuilder`
  \| `UserSelectMenuBuilder`
  \| `RoleSelectMenuBuilder`
  \| `MentionableSelectMenuBuilder`
  \| `ChannelSelectMenuBuilder`\>[]

the Components of this embed

• **ephemeral?**: `boolean`

send as ephemeral or not

#### Returns

`Promise`\<`object`\>

the messageoptions object ready to be send

##### components?

```ts
optional components: ActionRowBuilder<
  | ButtonBuilder
  | StringSelectMenuBuilder
  | UserSelectMenuBuilder
  | RoleSelectMenuBuilder
  | MentionableSelectMenuBuilder
  | ChannelSelectMenuBuilder>[];
```

##### embeds

```ts
embeds: EmbedBuilder[];
```

##### ephemeral

```ts
ephemeral: boolean;
```

##### files

```ts
files: AttachmentBuilder[];
```

#### See

object ready to be send

#### Source

[handlers/messageHandler.ts:430](https://github.com/scorixear/discord.ts-architecture/blob/23a5e89b62121558f2e262f887835068b27155b5/src/handlers/messageHandler.ts#L430)

***

### getEmbedInteraction()

```ts
static getEmbedInteraction(param0: object): Promise<object>
```

Returns a BaseMessageOptions object from the given interaction

#### Parameters

• **param0**

the parameters of the embed

• **param0.categories?**: `object`[]

• **param0.color?**: `number`

• **param0.components?**: `ActionRowBuilder`\<
  \| `ButtonBuilder`
  \| `StringSelectMenuBuilder`
  \| `UserSelectMenuBuilder`
  \| `RoleSelectMenuBuilder`
  \| `MentionableSelectMenuBuilder`
  \| `ChannelSelectMenuBuilder`\>[]

• **param0.description?**: `string`

• **param0.ephemeral?**: `boolean`

• **param0.files?**: `string`[]

• **param0.image?**: `string`

• **param0.interaction**: `ButtonInteraction`\<`CacheType`\> \| `AnySelectMenuInteraction` \| `CommandInteraction`\<`CacheType`\>

• **param0.thumbnail?**: `string`

• **param0.title?**: `string`

• **param0.url?**: `string`

#### Returns

`Promise`\<`object`\>

the MessageOptions object ready to be sent

##### components?

```ts
optional components: ActionRowBuilder<
  | ButtonBuilder
  | StringSelectMenuBuilder
  | UserSelectMenuBuilder
  | RoleSelectMenuBuilder
  | MentionableSelectMenuBuilder
  | ChannelSelectMenuBuilder>[];
```

##### embeds

```ts
embeds: EmbedBuilder[];
```

##### ephemeral

```ts
ephemeral: boolean;
```

##### files

```ts
files: AttachmentBuilder[];
```

#### Source

[handlers/messageHandler.ts:296](https://github.com/scorixear/discord.ts-architecture/blob/23a5e89b62121558f2e262f887835068b27155b5/src/handlers/messageHandler.ts#L296)

***

### getErrorEmbedInteraction()

```ts
static getErrorEmbedInteraction(param0: object): Promise<object>
```

Returns a

#### Parameters

• **param0**

the parameters for the embed

• **param0.categories?**: `object`[]

• **param0.color?**: `number`

• **param0.components?**: `ActionRowBuilder`\<
  \| `ButtonBuilder`
  \| `StringSelectMenuBuilder`
  \| `UserSelectMenuBuilder`
  \| `RoleSelectMenuBuilder`
  \| `MentionableSelectMenuBuilder`
  \| `ChannelSelectMenuBuilder`\>[]

• **param0.description?**: `string`

• **param0.files?**: `string`[]

• **param0.image?**: `string`

• **param0.interaction**: `ButtonInteraction`\<`CacheType`\> \| `AnySelectMenuInteraction` \| `CommandInteraction`\<`CacheType`\>

• **param0.thumbnail?**: `string`

• **param0.title?**: `string`

• **param0.url?**: `string`

#### Returns

`Promise`\<`object`\>

the MessageOptions object

##### components?

```ts
optional components: ActionRowBuilder<
  | ButtonBuilder
  | StringSelectMenuBuilder
  | UserSelectMenuBuilder
  | RoleSelectMenuBuilder
  | MentionableSelectMenuBuilder
  | ChannelSelectMenuBuilder>[];
```

##### embeds

```ts
embeds: EmbedBuilder[];
```

##### ephemeral

```ts
ephemeral: boolean;
```

##### files

```ts
files: AttachmentBuilder[];
```

#### See

object from the given interaction ready to be send

#### Source

[handlers/messageHandler.ts:337](https://github.com/scorixear/discord.ts-architecture/blob/23a5e89b62121558f2e262f887835068b27155b5/src/handlers/messageHandler.ts#L337)

***

### reply()

```ts
static reply(param0: object): Promise<Message<boolean> | InteractionResponse<boolean>>
```

Replies to an interaction (works with defered interactions aswell)

#### Parameters

• **param0**

the parameters of the embed

• **param0.categories?**: `object`[]

• **param0.color?**: `number`

• **param0.components?**: `ActionRowBuilder`\<
  \| `ButtonBuilder`
  \| `StringSelectMenuBuilder`
  \| `UserSelectMenuBuilder`
  \| `RoleSelectMenuBuilder`
  \| `MentionableSelectMenuBuilder`
  \| `ChannelSelectMenuBuilder`\>[]

• **param0.description?**: `string`

• **param0.ephemeral?**: `boolean`

• **param0.files?**: `string`[]

• **param0.image?**: `string`

• **param0.interaction**: `ButtonInteraction`\<`CacheType`\> \| `AnySelectMenuInteraction` \| `CommandInteraction`\<`CacheType`\>

• **param0.thumbnail?**: `string`

• **param0.title?**: `string`

• **param0.url?**: `string`

#### Returns

`Promise`\<`Message`\<`boolean`\> \| `InteractionResponse`\<`boolean`\>\>

the sent message object

#### Source

[handlers/messageHandler.ts:142](https://github.com/scorixear/discord.ts-architecture/blob/23a5e89b62121558f2e262f887835068b27155b5/src/handlers/messageHandler.ts#L142)

***

### replyError()

```ts
static replyError(param0: object): Promise<Message<boolean> | InteractionResponse<boolean>>
```

Replies ephemeral to an interaction (works with defered interactions aswell)

#### Parameters

• **param0**

the parameters of the embed

• **param0.categories?**: `object`[]

• **param0.color?**: `number`

• **param0.components?**: `ActionRowBuilder`\<
  \| `ButtonBuilder`
  \| `StringSelectMenuBuilder`
  \| `UserSelectMenuBuilder`
  \| `RoleSelectMenuBuilder`
  \| `MentionableSelectMenuBuilder`
  \| `ChannelSelectMenuBuilder`\>[]

• **param0.description?**: `string`

• **param0.files?**: `string`[]

• **param0.image?**: `string`

• **param0.interaction**: `ButtonInteraction`\<`CacheType`\> \| `AnySelectMenuInteraction` \| `CommandInteraction`\<`CacheType`\>

• **param0.thumbnail?**: `string`

• **param0.title?**: `string`

• **param0.url?**: `string`

#### Returns

`Promise`\<`Message`\<`boolean`\> \| `InteractionResponse`\<`boolean`\>\>

the sent message object

#### Source

[handlers/messageHandler.ts:111](https://github.com/scorixear/discord.ts-architecture/blob/23a5e89b62121558f2e262f887835068b27155b5/src/handlers/messageHandler.ts#L111)

***

### sendEmbed()

```ts
static sendEmbed(param0: object): Promise<Message<false> | Message<true>>
```

Sends an embed message to the channel from the provided msg

#### Parameters

• **param0**

The parameters of the embed

• **param0.author?**: `User`

• **param0.categories?**: `object`[]

• **param0.channel**: `TextBasedChannel`

• **param0.color?**: `number`

• **param0.components?**: `ActionRowBuilder`\<
  \| `ButtonBuilder`
  \| `StringSelectMenuBuilder`
  \| `UserSelectMenuBuilder`
  \| `RoleSelectMenuBuilder`
  \| `MentionableSelectMenuBuilder`
  \| `ChannelSelectMenuBuilder`\>[]

• **param0.description?**: `string`

• **param0.files?**: `string`[]

• **param0.guild?**: `Guild`

• **param0.image?**: `string`

• **param0.thumbnail?**: `string`

• **param0.title?**: `string`

• **param0.url?**: `string`

#### Returns

`Promise`\<`Message`\<`false`\> \| `Message`\<`true`\>\>

The sent message object

#### Source

[handlers/messageHandler.ts:69](https://github.com/scorixear/discord.ts-architecture/blob/23a5e89b62121558f2e262f887835068b27155b5/src/handlers/messageHandler.ts#L69)

***

### sendEmbedExplicit()

```ts
static sendEmbedExplicit(
   guild: undefined | Guild, 
   channel: TextBasedChannel, 
   author: undefined | User, 
   title: undefined | string, 
   categories: undefined | object[], 
   color: undefined | number, 
   description: undefined | string, 
   thumbnail: undefined | string, 
   image: undefined | string, 
   url: undefined | string, 
   files: undefined | string[], 
   components: undefined | ActionRowBuilder<
  | ButtonBuilder
  | StringSelectMenuBuilder
  | UserSelectMenuBuilder
  | RoleSelectMenuBuilder
  | MentionableSelectMenuBuilder
| ChannelSelectMenuBuilder>[]): Promise<Message<false> | Message<true>>
```

Sends an embed message to the channel

#### Parameters

• **guild**: `undefined` \| `Guild`

the Guild to print to

• **channel**: `TextBasedChannel`

the channel to print to

• **author**: `undefined` \| `User`

the author of the message

• **title**: `undefined` \| `string`

the title

• **categories**: `undefined` \| `object`[]

the fields

• **color**: `undefined` \| `number`

hex rgb color

• **description**: `undefined` \| `string`

• **thumbnail**: `undefined` \| `string`

thumbnail url string

• **image**: `undefined` \| `string`

• **url**: `undefined` \| `string`

an url

• **files**: `undefined` \| `string`[]

path to files attached to the message

• **components**: `undefined` \| `ActionRowBuilder`\<
  \| `ButtonBuilder`
  \| `StringSelectMenuBuilder`
  \| `UserSelectMenuBuilder`
  \| `RoleSelectMenuBuilder`
  \| `MentionableSelectMenuBuilder`
  \| `ChannelSelectMenuBuilder`\>[]

the components added to the embed

#### Returns

`Promise`\<`Message`\<`false`\> \| `Message`\<`true`\>\>

the sent message object

#### Source

[handlers/messageHandler.ts:218](https://github.com/scorixear/discord.ts-architecture/blob/23a5e89b62121558f2e262f887835068b27155b5/src/handlers/messageHandler.ts#L218)

***

### sendEmbedMsg()

```ts
static sendEmbedMsg(param0: object): Promise<Message<false> | Message<true>>
```

Sends an embed message to the channel from the provided msg

#### Parameters

• **param0**

the parameters of the embed

• **param0.categories?**: `object`[]

• **param0.color?**: `number`

• **param0.components?**: `ActionRowBuilder`\<
  \| `ButtonBuilder`
  \| `StringSelectMenuBuilder`
  \| `UserSelectMenuBuilder`
  \| `RoleSelectMenuBuilder`
  \| `MentionableSelectMenuBuilder`
  \| `ChannelSelectMenuBuilder`\>[]

• **param0.description?**: `string`

• **param0.files?**: `string`[]

• **param0.image?**: `string`

• **param0.msg**: `Message`\<`boolean`\>

• **param0.thumbnail?**: `string`

• **param0.title?**: `string`

• **param0.url?**: `string`

#### Returns

`Promise`\<`Message`\<`false`\> \| `Message`\<`true`\>\>

the returned message object after sending the message

#### Source

[handlers/messageHandler.ts:31](https://github.com/scorixear/discord.ts-architecture/blob/23a5e89b62121558f2e262f887835068b27155b5/src/handlers/messageHandler.ts#L31)

***

### sendEmbedMsgExplicit()

```ts
static sendEmbedMsgExplicit(
   msg: Message<boolean>, 
   title: undefined | string, 
   categories: undefined | object[], 
   color: undefined | number, 
   description: undefined | string, 
   thumbnail: undefined | string, 
   image: undefined | string, 
   url: undefined | string, 
   files: undefined | string[], 
   components: undefined | ActionRowBuilder<
  | ButtonBuilder
  | StringSelectMenuBuilder
  | UserSelectMenuBuilder
  | RoleSelectMenuBuilder
  | MentionableSelectMenuBuilder
| ChannelSelectMenuBuilder>[]): Promise<Message<false> | Message<true>>
```

Sends an embed to the same channel of the provided message

#### Parameters

• **msg**: `Message`\<`boolean`\>

the message object to print from

• **title**: `undefined` \| `string`

the title of the embed

• **categories**: `undefined` \| `object`[]

the fields to add

• **color**: `undefined` \| `number`

hex rgb number

• **description**: `undefined` \| `string`

the descriptions of the message

• **thumbnail**: `undefined` \| `string`

thumbnail url

• **image**: `undefined` \| `string`

image path

• **url**: `undefined` \| `string`

the URL of this message

• **files**: `undefined` \| `string`[]

path to files attached to the message

• **components**: `undefined` \| `ActionRowBuilder`\<
  \| `ButtonBuilder`
  \| `StringSelectMenuBuilder`
  \| `UserSelectMenuBuilder`
  \| `RoleSelectMenuBuilder`
  \| `MentionableSelectMenuBuilder`
  \| `ChannelSelectMenuBuilder`\>[]

the components of this embed

#### Returns

`Promise`\<`Message`\<`false`\> \| `Message`\<`true`\>\>

the sent message object

#### Source

[handlers/messageHandler.ts:531](https://github.com/scorixear/discord.ts-architecture/blob/23a5e89b62121558f2e262f887835068b27155b5/src/handlers/messageHandler.ts#L531)

***

### splitInCategories()

```ts
static splitInCategories(lines: string[], heading: string): object[]
```

Splits the provided lines into several categories (each category with maximum 1024 characters)
and adds a heading to the first category

#### Parameters

• **lines**: `string`[]

the lines to split among multiple categories

• **heading**: `string`

the heading of the first category

#### Returns

`object`[]

the categories

#### Throws

Error if one of the lines is longer than 1023 characters

#### Source

[handlers/messageHandler.ts:576](https://github.com/scorixear/discord.ts-architecture/blob/23a5e89b62121558f2e262f887835068b27155b5/src/handlers/messageHandler.ts#L576)
