[**discord.ts-architecture**](../README.md) • **Docs**

***

[discord.ts-architecture](../README.md) / Logger

# Class: Logger

Represents a logger that can log messages with different warning levels

## Constructors

### new Logger()

```ts
new Logger(): Logger
```

#### Returns

[`Logger`](Logger.md)

## Methods

### crit()

```ts
static crit(message: string, ...args: any[]): void
```

Logs the message with CRITICAL as preamble
Then exists the process with error-code 1

#### Parameters

• **message**: `string`

the message to log

• ...**args**: `any`[]

the arguments to add to the logging (default console.log interpretation)

#### Returns

`void`

#### Source

[logging/logger.ts:54](https://github.com/scorixear/discord.ts-architecture/blob/23a5e89b62121558f2e262f887835068b27155b5/src/logging/logger.ts#L54)

***

### error()

```ts
static error(message: string, ...args: any[]): void
```

Logs the message with ERROR preamble

#### Parameters

• **message**: `string`

the message to log

• ...**args**: `any`[]

the arguments to add to the logging (default console.log interpretation)

#### Returns

`void`

#### Source

[logging/logger.ts:44](https://github.com/scorixear/discord.ts-architecture/blob/23a5e89b62121558f2e262f887835068b27155b5/src/logging/logger.ts#L44)

***

### exception()

```ts
static exception(
   message: string, 
   error: unknown, 
   warningLevel: WarningLevel, ...
   args: any[]): void
```

Logs the message with the given warning leven and argments
Adds error message and stack-trace to console.error output
Exists process if warningLevel =

#### Parameters

• **message**: `string`

the message to log

• **error**: `unknown`

the error to print

• **warningLevel**: [`WarningLevel`](../enumerations/WarningLevel.md)

the warninglevel to show

• ...**args**: `any`[]

the arguments to add to the logging (default console.log interpretation)

#### Returns

`void`

#### See

WarningLevel.CRIT with error-code 1

#### Source

[logging/logger.ts:67](https://github.com/scorixear/discord.ts-architecture/blob/23a5e89b62121558f2e262f887835068b27155b5/src/logging/logger.ts#L67)

***

### info()

```ts
static info(message: string, ...args: any[]): void
```

Logs the message with INFO as preamble

#### Parameters

• **message**: `string`

the message to log

• ...**args**: `any`[]

the arguments to add to the logging (default console.log interpretation)

#### Returns

`void`

#### Source

[logging/logger.ts:26](https://github.com/scorixear/discord.ts-architecture/blob/23a5e89b62121558f2e262f887835068b27155b5/src/logging/logger.ts#L26)

***

### log()

```ts
static log(
   message: string, 
   warningLevel: WarningLevel, ...
   args: any[]): void
```

Logs the message with the given warning leven and arguments
Exists process if warninglevel =

#### Parameters

• **message**: `string`

the message to log

• **warningLevel**: [`WarningLevel`](../enumerations/WarningLevel.md)

the warning level

• ...**args**: `any`[]

the arguments to add to the loggin (default console.log interpretation)

#### Returns

`void`

#### See

WarningLevel.CRIT with error-code 1

#### Source

[logging/logger.ts:14](https://github.com/scorixear/discord.ts-architecture/blob/23a5e89b62121558f2e262f887835068b27155b5/src/logging/logger.ts#L14)

***

### warn()

```ts
static warn(message: string, ...args: any[]): void
```

Logs the message with WARNING preamble

#### Parameters

• **message**: `string`

the message to log

• ...**args**: `any`[]

the arguments to add to the logging (default console.log interpretation)

#### Returns

`void`

#### Source

[logging/logger.ts:35](https://github.com/scorixear/discord.ts-architecture/blob/23a5e89b62121558f2e262f887835068b27155b5/src/logging/logger.ts#L35)
