import { ITwoWayMap } from './abstractions/ITwoWayMap';

/**
 * A @see Map implementation that provides direct mapping between to pairs.
 * Used inside the InteractionHandler to map ButtonInteraction and SelectMenuInteraction IDs
 * to ButtonInteractionModels and SelectMenuInteractionModels.
 * @type {K} Represent the generic Key Type
 * @type {V} Represents the generic Value Type
 * @interface TwoWayMap
 */
export class TwoWayMap<K, V> implements ITwoWayMap<K, V> {
  private map: Map<K, V>;
  private reverseMap: Map<V, K>;
  /**
   * Default Constructor
   * @param map The map to convert to TwoWayMap
   */
  constructor(map: Map<K, V>) {
    this.map = map;
    this.reverseMap = new Map();
    for (const key of map.keys()) {
      const value = map.get(key);
      if (value) {
        this.reverseMap.set(value, key);
      }
    }
  }

  /**
   * Sets the value for the given key
   * @param key Key
   * @param value Value
   */
  set(key: K, value: V) {
    this.map.set(key, value);
    this.reverseMap.set(value, key);
  }

  /**
   * Returns the Value for the given key
   * @param key key
   * @returns the value
   */
  get(key: K) {
    return this.map.get(key);
  }

  /**
   * Returns the Key for the given Value
   * @param key Value
   * @returns the key
   */
  revGet(key: V) {
    return this.reverseMap.get(key);
  }

  /**
   * Returns the first key that matches the given type
   * @param type the type to refer to (only works for ButtonInteraction and SelectMenuInteraction)
   * @returns key
   */
  typeGet(type: new (id: string, deferReply: number | undefined, deferReplyEphemeral: boolean) => V) {
    for (const key of this.reverseMap.keys()) {
      if (key instanceof type) {
        return this.revGet(key);
      }
    }
    return undefined;
  }

  /**
   * Returns the first value that matches the given action
   * @param action the action to perform
   * @returns the value
   */
  find(action: (key: K) => boolean) {
    for (const k of this.map.keys()) {
      if (action(k)) {
        return this.map.get(k);
      }
    }
    return undefined;
  }

  /**
   * Returns the first value that matches the given action
   * @param action the action to perform
   * @returns the value or undefined if not found
   */
  findWithValue(action: (key: K, value: V) => boolean) {
    for (const k of this.map.keys()) {
      if (action(k, this.map.get(k) as V)) {
        return this.map.get(k);
      }
    }
    return undefined;
  }
}
