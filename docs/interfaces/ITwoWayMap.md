[**discord.ts-architecture**](../README.md) • **Docs**

***

[discord.ts-architecture](../README.md) / ITwoWayMap

# Interface: ITwoWayMap\<K, V\>

Represents a two way map

## See

TwoWayMap

## Type parameters

• **K**

• **V**

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

#### Source

[model/abstractions/ITwoWayMap.ts:37](https://github.com/scorixear/discord.ts-architecture/blob/23a5e89b62121558f2e262f887835068b27155b5/src/model/abstractions/ITwoWayMap.ts#L37)

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

#### Source

[model/abstractions/ITwoWayMap.ts:43](https://github.com/scorixear/discord.ts-architecture/blob/23a5e89b62121558f2e262f887835068b27155b5/src/model/abstractions/ITwoWayMap.ts#L43)

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

#### Source

[model/abstractions/ITwoWayMap.ts:19](https://github.com/scorixear/discord.ts-architecture/blob/23a5e89b62121558f2e262f887835068b27155b5/src/model/abstractions/ITwoWayMap.ts#L19)

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

#### Source

[model/abstractions/ITwoWayMap.ts:25](https://github.com/scorixear/discord.ts-architecture/blob/23a5e89b62121558f2e262f887835068b27155b5/src/model/abstractions/ITwoWayMap.ts#L25)

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

#### Source

[model/abstractions/ITwoWayMap.ts:13](https://github.com/scorixear/discord.ts-architecture/blob/23a5e89b62121558f2e262f887835068b27155b5/src/model/abstractions/ITwoWayMap.ts#L13)

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

#### Source

[model/abstractions/ITwoWayMap.ts:31](https://github.com/scorixear/discord.ts-architecture/blob/23a5e89b62121558f2e262f887835068b27155b5/src/model/abstractions/ITwoWayMap.ts#L31)
