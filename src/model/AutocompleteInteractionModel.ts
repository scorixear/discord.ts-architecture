import { AutocompleteInteraction, Interaction } from 'discord.js';
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
   * Checks if the given interaction can be handled by this command
   * meaning if the id is the same and the interaction is a @see AutocompleteInteraction
   * @param requestedId the id of the interaction
   * @param interaction the interaction to check
   */
  public override canHandle(requestedId: string, interaction: Interaction): boolean {
    return this.command === requestedId && interaction.isAutocomplete();
  }

  /**
   * Called when AutocompleteInteraction was received
   * @param interaction the interaction received
   */
  public abstract handleAutocomplete(interaction: AutocompleteInteraction): Promise<void>;
}
