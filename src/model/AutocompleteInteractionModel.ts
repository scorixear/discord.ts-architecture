import { AutocompleteInteraction } from 'discord.js';
import { CommandInteractionModel } from './CommandInteractionModel';

export abstract class AutocompleteInteractionModel extends CommandInteractionModel {
  public abstract handleAutocomplete(interaction: AutocompleteInteraction): Promise<void>;
}
