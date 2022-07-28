export enum WARNINGLEVEL {
  INFO = 'INFO',
  WARN = 'WARNING',
  ERROR = 'ERROR',
  CRIT = 'CRITICAL'
}
export class Logger {
  public static log(message: string, warningLevel: WARNINGLEVEL, ...args: any[]) {
    console.log(`[${warningLevel}] ${message}`, ...args);
    if (warningLevel === WARNINGLEVEL.CRIT) {
      process.exit(1);
    }
  }

  public static info(message: string, ...args: any[]) {
    this.log(message, WARNINGLEVEL.INFO, ...args);
  }

  public static warn(message: string, ...args: any[]) {
    this.log(message, WARNINGLEVEL.WARN, ...args);
  }

  public static error(message: string, ...args: any[]) {
    this.log(message, WARNINGLEVEL.ERROR, ...args);
  }

  public static crit(message: string, ...args: any[]) {
    this.log(message, WARNINGLEVEL.CRIT, ...args);
  }

  public static exception(message: string, error: unknown, warningLevel: WARNINGLEVEL, ...args: any[]) {
    if (error instanceof Error) {
      console.error(error.message);
      if (error.stack) {
        console.error(error.stack);
      }
    } else if (error instanceof String) {
      console.error(error);
    }

    this.log(message, warningLevel, ...args);
  }
}
