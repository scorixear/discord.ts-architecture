import { StringSelectMenuInteraction } from 'discord.js';
import { StringSelectMenuInteractionModel } from '../../../src/model/SelectMenuInteractionModels/StringSelectMenuInteractionModel';

export class TestStringSelectMenuInteractionModel extends StringSelectMenuInteractionModel {
  public constructorCalled: boolean = false;
  public constructorCalledWith: any[] = [];

  constructor(id: string, deferReply: number | undefined = 0, deferReplyEphemeral: boolean = false) {
    super(id, deferReply, deferReplyEphemeral);
    this.constructorCalled = true;
    this.constructorCalledWith = [id, deferReply, deferReplyEphemeral];
  }

  public handleCalled: number = 0;
  public handleCalledWith: any[] = [];

  public override async handle(interaction: StringSelectMenuInteraction): Promise<void> {
    this.handleCalled++;
    this.handleCalledWith.push(interaction);
  }

  public clearAllMocks(): void {
    this.constructorCalled = false;
    this.constructorCalledWith = [];
    this.handleCalled = 0;
    this.handleCalledWith = [];
  }
}
