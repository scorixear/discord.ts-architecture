/**
 * Provides warning levels.
 * {@link CRIT} shuts down the process with error-code 1
 */
export enum WARNINGLEVEL {
  INFO = 'INFO',
  WARN = 'WARNING',
  ERROR = 'ERROR',
  CRIT = 'CRITICAL'
}

/**
 * Provides Logging commands
 */
export class Logger {
  /**
   * Logs the message with the given warning leven and arguments
   * Exists process if warninglevel = {@link WARNINGLEVEL.CRIT} with error-code 1
   * @param message the message to log
   * @param warningLevel the warning level
   * @param args the arguments to add to the loggin (default console.log interpretation)
   */
  public static log(message: string, warningLevel: WARNINGLEVEL, ...args: any[]) {
    console.log(`[${warningLevel}] ${message}`, ...args);
    if (warningLevel === WARNINGLEVEL.CRIT) {
      process.exit(1);
    }
  }

  /**
   * Logs the message with INFO as preamble
   * @param message the message to log
   * @param args the arguments to add to the logging (default console.log interpretation)
   */
  public static info(message: string, ...args: any[]) {
    this.log(message, WARNINGLEVEL.INFO, ...args);
  }

  /**
   * Logs the message with WARNING preamble
   * @param message the message to log
   * @param args the arguments to add to the logging (default console.log interpretation)
   */
  public static warn(message: string, ...args: any[]) {
    this.log(message, WARNINGLEVEL.WARN, ...args);
  }

  /**
   * Logs the message with ERROR preamble
   * @param message the message to log
   * @param args the arguments to add to the logging (default console.log interpretation)
   */
  public static error(message: string, ...args: any[]) {
    this.log(message, WARNINGLEVEL.ERROR, ...args);
  }

  /**
   * Logs the message with CRITICAL as preamble
   * Then exists the process with error-code 1
   * @param message the message to log
   * @param args the arguments to add to the logging (default console.log interpretation)
   */
  public static crit(message: string, ...args: any[]) {
    this.log(message, WARNINGLEVEL.CRIT, ...args);
  }

  /**
   * Logs the message with the given warning leven and argments
   * Adds error message and stack-trace to console.error output
   * Exists process if warningLevel = {@link CRIT}
   * @param message the message to log
   * @param error the error to print
   * @param warningLevel the warninglevel to show
   * @param args the arguments to add to the logging (default console.log interpretation)
   */
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
