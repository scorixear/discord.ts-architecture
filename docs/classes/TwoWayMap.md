[**discord.ts-architecture**](../README.md) • **Docs**

***

[discord.ts-architecture](../README.md) / TwoWayMap

# Class: TwoWayMap\<K, V\>

A

## See

Map implementation that provides direct mapping between to pairs.
Used inside the InteractionHandler to map ButtonInteraction and SelectMenuInteraction IDs
to ButtonInteractionModels and SelectMenuInteractionModels.

## Type parameters

• **K**

• **V**

## Implements

- [`ITwoWayMap`](../interfaces/ITwoWayMap.md)\<`K`, `V`\>

## Constructors

### new TwoWayMap()

```ts
new TwoWayMap<K, V>(map: Map<K, V>): TwoWayMap<K, V>
```

Default Constructor

#### Parameters

• **map**: `Map`\<`K`, `V`\>

The map to convert to TwoWayMap

#### Returns

[`TwoWayMap`](TwoWayMap.md)\<`K`, `V`\>

#### Source

[model/TwoWayMap.ts:18](https://github.com/scorixear/discord.ts-architecture/blob/23a5e89b62121558f2e262f887835068b27155b5/src/model/TwoWayMap.ts#L18)

## Properties

### map

```ts
private map: Map<K, V>;
```

#### Source

[model/TwoWayMap.ts:12](https://github.com/scorixear/discord.ts-architecture/blob/23a5e89b62121558f2e262f887835068b27155b5/src/model/TwoWayMap.ts#L12)

***

### reverseMap

```ts
private reverseMap: Map<V, K>;
```

#### Source

[model/TwoWayMap.ts:13](https://github.com/scorixear/discord.ts-architecture/blob/23a5e89b62121558f2e262f887835068b27155b5/src/model/TwoWayMap.ts#L13)

## Methods

### find()

```ts
find(action: (key: K) => boolean): undefined | V
```

Returns the first value that matches the given action

#### Parameters

• **action**

the action to perform

#### Returns

`undefined` \| `V`

the value

#### Implementation of

[`ITwoWayMap`](../interfaces/ITwoWayMap.md).[`find`](../interfaces/ITwoWayMap.md#find)

#### Source

[model/TwoWayMap.ts:76](https://github.com/scorixear/discord.ts-architecture/blob/23a5e89b62121558f2e262f887835068b27155b5/src/model/TwoWayMap.ts#L76)

***

### findWithValue()

```ts
findWithValue(action: (key: K, value: V) => boolean): undefined | V
```

Returns the first value that matches the given action

#### Parameters

• **action**

the action to perform

#### Returns

`undefined` \| `V`

the value or undefined if not found

#### Implementation of

[`ITwoWayMap`](../interfaces/ITwoWayMap.md).[`findWithValue`](../interfaces/ITwoWayMap.md#findwithvalue)

#### Source

[model/TwoWayMap.ts:90](https://github.com/scorixear/discord.ts-architecture/blob/23a5e89b62121558f2e262f887835068b27155b5/src/model/TwoWayMap.ts#L90)

***

### get()

```ts
get(key: K): undefined | V
```

Returns the Value for the given key

#### Parameters

• **key**: `K`

key

#### Returns

`undefined` \| `V`

the value

#### Implementation of

[`ITwoWayMap`](../interfaces/ITwoWayMap.md).[`get`](../interfaces/ITwoWayMap.md#get)

#### Source

[model/TwoWayMap.ts:44](https://github.com/scorixear/discord.ts-architecture/blob/23a5e89b62121558f2e262f887835068b27155b5/src/model/TwoWayMap.ts#L44)

***

### revGet()

```ts
revGet(key: V): undefined | K
```

Returns the Key for the given Value

#### Parameters

• **key**: `V`

Value

#### Returns

`undefined` \| `K`

the key

#### Implementation of

[`ITwoWayMap`](../interfaces/ITwoWayMap.md).[`revGet`](../interfaces/ITwoWayMap.md#revget)

#### Source

[model/TwoWayMap.ts:53](https://github.com/scorixear/discord.ts-architecture/blob/23a5e89b62121558f2e262f887835068b27155b5/src/model/TwoWayMap.ts#L53)

***

### set()

```ts
set(key: K, value: V): void
```

Sets the value for the given key

#### Parameters

• **key**: `K`

Key

• **value**: `V`

Value

#### Returns

`void`

#### Implementation of

[`ITwoWayMap`](../interfaces/ITwoWayMap.md).[`set`](../interfaces/ITwoWayMap.md#set)

#### Source

[model/TwoWayMap.ts:34](https://github.com/scorixear/discord.ts-architecture/blob/23a5e89b62121558f2e262f887835068b27155b5/src/model/TwoWayMap.ts#L34)

***

### typeGet()

```ts
typeGet(type: (id: string, deferReply: undefined | number, deferReplyEphemeral: boolean) => V): undefined | K
```

Returns the first key that matches the given type

#### Parameters

• **type**

the type to refer to (only works for ButtonInteraction and SelectMenuInteraction)

#### Returns

`undefined` \| `K`

key

#### Implementation of

[`ITwoWayMap`](../interfaces/ITwoWayMap.md).[`typeGet`](../interfaces/ITwoWayMap.md#typeget)

#### Source

[model/TwoWayMap.ts:62](https://github.com/scorixear/discord.ts-architecture/blob/23a5e89b62121558f2e262f887835068b27155b5/src/model/TwoWayMap.ts#L62)
