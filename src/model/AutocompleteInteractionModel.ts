import { AutocompleteInteraction } from 'discord.js';
import { CommandInteractionModel } from './CommandInteractionModel';
import { IAutocompleteInteractionModel } from './abstractions/IAutocompleteInteractionModel';

/**
 * Extends the CommandInteractionMOdel with an AutocompleteInteraction handler
 */
export abstract class AutocompleteInteractionModel
  extends CommandInteractionModel
  implements IAutocompleteInteractionModel
{
  /**
   * Called when AutocompleteInteraction was received
   * @param interaction the interaction received
   */
  public abstract handleAutocomplete(interaction: AutocompleteInteraction): Promise<void>;
}
