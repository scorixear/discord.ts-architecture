import { AutocompleteInteraction } from 'discord.js';
import { ICommandInteractionModel } from './ICommandInteractionModel';

/**
 * Represents one AutocompleteInteraction and should be implemented by custom implementation (overriding the handleAutocomplete method).
 * See @see AutocompleteInteractionModel for a abstract base class
 */
export interface IAutocompleteInteractionModel extends ICommandInteractionModel {
  /**
   * Called when AutocompleteInteraction was received
   * @param interaction the interaction received
   */
  handleAutocomplete(interaction: AutocompleteInteraction): Promise<void>;
}
