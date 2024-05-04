import { SelectMenuInteraction } from 'discord.js';
import { SelectMenuInteractionModel } from '../../src/model/SelectMenuInteractionModel';

export class TestSelectMenuInteractionModel extends SelectMenuInteractionModel {
  public constructorCalled: boolean = false;
  public constructorCalledWith: any[] = [];

  // Override the constructor to use the test button configuration
  constructor(id: string, deferReply: number | undefined = 0, deferReplyEphemeral: boolean = false) {
    super(id, deferReply, deferReplyEphemeral);
    this.constructorCalled = true;
    this.constructorCalledWith = [id, deferReply, deferReplyEphemeral];
  }

  public handleCalled: number = 0;
  public handleCalledWith: any[] = [];

  public override async handle(interaction: SelectMenuInteraction): Promise<void> {
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
