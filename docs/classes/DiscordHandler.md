[**discord.ts-architecture**](../README.md) • **Docs**

***

[discord.ts-architecture](../README.md) / DiscordHandler

# Class: DiscordHandler

Provides methods for interaction with the discord.js

## Constructors

### new DiscordHandler()

```ts
new DiscordHandler(partials: Partials[], intents: GatewayIntentBits[]): DiscordHandler
```

Default Constructor

#### Parameters

• **partials**: `Partials`[]

The partials to load

• **intents**: `GatewayIntentBits`[]

The intents to load

#### Returns

[`DiscordHandler`](DiscordHandler.md)

#### Source

[handlers/discordHandler.ts:28](https://github.com/scorixear/discord.ts-architecture/blob/23a5e89b62121558f2e262f887835068b27155b5/src/handlers/discordHandler.ts#L28)

## Properties

### client

```ts
client: Client<boolean>;
```

The client object

#### Source

[handlers/discordHandler.ts:21](https://github.com/scorixear/discord.ts-architecture/blob/23a5e89b62121558f2e262f887835068b27155b5/src/handlers/discordHandler.ts#L21)

## Methods

### fetchGuild()

```ts
fetchGuild(guild: GuildResolvable): Promise<Guild>
```

Returns a guild

#### Parameters

• **guild**: `GuildResolvable`

the guildResolvable

#### Returns

`Promise`\<`Guild`\>

the guild object

#### Source

[handlers/discordHandler.ts:57](https://github.com/scorixear/discord.ts-architecture/blob/23a5e89b62121558f2e262f887835068b27155b5/src/handlers/discordHandler.ts#L57)

***

### fetchMember()

```ts
fetchMember(user: UserResolvable, guild: Guild): Promise<GuildMember>
```

Returns a guild member

#### Parameters

• **user**: `UserResolvable`

the useresolvable

• **guild**: `Guild`

the guild this user is inside

#### Returns

`Promise`\<`GuildMember`\>

the member object

#### Source

[handlers/discordHandler.ts:75](https://github.com/scorixear/discord.ts-architecture/blob/23a5e89b62121558f2e262f887835068b27155b5/src/handlers/discordHandler.ts#L75)

***

### getFirstGuild()

```ts
getFirstGuild(): undefined | Guild
```

Returns the first guild the cient is in

#### Returns

`undefined` \| `Guild`

#### Source

[handlers/discordHandler.ts:39](https://github.com/scorixear/discord.ts-architecture/blob/23a5e89b62121558f2e262f887835068b27155b5/src/handlers/discordHandler.ts#L39)

***

### getGuilds()

```ts
getGuilds(): Collection<string, Guild>
```

Returns the currently cache of guilds

#### Returns

`Collection`\<`string`, `Guild`\>

cached guilds

#### Source

[handlers/discordHandler.ts:65](https://github.com/scorixear/discord.ts-architecture/blob/23a5e89b62121558f2e262f887835068b27155b5/src/handlers/discordHandler.ts#L65)

***

### getRolesOfGuild()

```ts
getRolesOfGuild(guild: Guild): Promise<Collection<string, Role>>
```

Returns a collection of roles of the guild

#### Parameters

• **guild**: `Guild`

the guild to retrieve the roles from

#### Returns

`Promise`\<`Collection`\<`string`, `Role`\>\>

the collection

#### Source

[handlers/discordHandler.ts:48](https://github.com/scorixear/discord.ts-architecture/blob/23a5e89b62121558f2e262f887835068b27155b5/src/handlers/discordHandler.ts#L48)

***

### login()

```ts
login(token: string): Promise<string>
```

Logs in the client

#### Parameters

• **token**: `string`

the token to login with

#### Returns

`Promise`\<`string`\>

an promise that resolves when the login is done.

#### Source

[handlers/discordHandler.ts:104](https://github.com/scorixear/discord.ts-architecture/blob/23a5e89b62121558f2e262f887835068b27155b5/src/handlers/discordHandler.ts#L104)

***

### on()

```ts
on(event: string, callback: (...args: any[]) => Awaitable<void>): Client<boolean>
```

Adds an event listener

#### Parameters

• **event**: `string`

the event to listen on

• **callback**

called when the event occurs

#### Returns

`Client`\<`boolean`\>

the client this event is listening on

#### Source

[handlers/discordHandler.ts:85](https://github.com/scorixear/discord.ts-architecture/blob/23a5e89b62121558f2e262f887835068b27155b5/src/handlers/discordHandler.ts#L85)

***

### once()

```ts
once(event: keyof ClientEvents, callback: (...args: any[]) => Awaitable<void>): Client<boolean>
```

Adds an event listener that is called only once

#### Parameters

• **event**: keyof `ClientEvents`

the event to listen on

• **callback**

called when the event occurs

#### Returns

`Client`\<`boolean`\>

the client this event is listening on

#### Source

[handlers/discordHandler.ts:95](https://github.com/scorixear/discord.ts-architecture/blob/23a5e89b62121558f2e262f887835068b27155b5/src/handlers/discordHandler.ts#L95)
