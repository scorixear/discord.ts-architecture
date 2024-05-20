import { ButtonInteraction } from 'discord.js';
import { ButtonInteractionModel } from '../../src/model/ButtonInteractionModel';

export class TestButtonInteractionModel extends ButtonInteractionModel {
  public constructorCalled: boolean = false;
  public constructorCalledWith: any[] = [];
  public throwErrorOnHandle: boolean = false;

  constructor(id: string, deferReply: number | undefined = 0, deferReplyEphemeral: boolean = false) {
    super(id, deferReply, deferReplyEphemeral);
    this.constructorCalled = true;
    this.constructorCalledWith = [id, deferReply, deferReplyEphemeral];
  }

  public handleCalled: number = 0;
  public handleCalledWith: any[] = [];

  public override async handle(interaction: ButtonInteraction): Promise<void> {
    if (this.throwErrorOnHandle) {
      throw new Error('TestButtonInteractionModel.handle');
    }
    this.handleCalled++;
    this.handleCalledWith.push(interaction);
  }

  public clearAllMocks(): void {
    this.constructorCalled = false;
    this.constructorCalledWith = [];
    this.throwErrorOnHandle = false;
    this.handleCalled = 0;
    this.handleCalledWith = [];
  }
}
