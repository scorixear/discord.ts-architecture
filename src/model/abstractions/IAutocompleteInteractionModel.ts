import { AutocompleteInteraction } from 'discord.js';
import { ICommandInteractionModel } from './ICommandInteractionModel';

export interface IAutocompleteInteractionModel extends ICommandInteractionModel {
  handleAutocomplete(interaction: AutocompleteInteraction): Promise<void>;
}
