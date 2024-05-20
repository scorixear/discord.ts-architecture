/**
 * Represents a two way map
 * @type {K} Represents the generic Key Type
 * @type {V} Represents the generic Value Type
 * @see TwoWayMap
 */
export interface ITwoWayMap<K, V> {
  /**
   * Sets the value for the given key
   * @param key Key
   * @param value Value
   */
  set(key: K, value: V): void;
  /**
   * Returns the Value for the given key
   * @param key key
   * @returns the value
   */
  get(key: K): V | undefined;
  /**
   * Returns the Key for the given Value
   * @param key Value
   * @returns the key
   */
  revGet(key: V): K | undefined;
  /**
   * Returns the first key that matches the given type
   * @param type the type to refer to (only works for ButtonInteraction and SelectMenuInteraction)
   * @returns key
   */
  typeGet(type: new (id: string, deferReply: number | undefined, deferReplyEphemeral: boolean) => V): K | undefined;
  /**
   * Returns the first value that matches the given action
   * @param action the action to perform
   * @returns the value
   */
  find(action: (key: K) => boolean): V | undefined;
  /**
   * Returns the first value that matches the given action
   * @param action the action to perform
   * @returns the value or undefined if not found
   */
  findWithValue(action: (key: K, value: V) => boolean): V | undefined;
}
