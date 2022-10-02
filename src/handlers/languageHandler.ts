/**
 * Provides a way to load and use language strings
 * {@link language} the language object containing the strings
 */
export class LanguageHandler {
  public static language: any;

  /**
   * Sets the Language object
   * @param json the json string parsed into an object
   */
  public static setLanguage(json: string) {
    this.language = JSON.parse(json);
  }

  /**
   * Replaces preset args with values in a string following the '$<number>' syntax
   * @param input the input string contain templates for replacing
   * @param args the arguments being added into the string
   * @return the filled string
   */
  public static replaceArgs(input: string, ...args: string[]) {
    for (let i = 0; i < args.length; i++) {
      input = input.split('$' + i).join(args[i]);
    }
    return input;
  }
}
