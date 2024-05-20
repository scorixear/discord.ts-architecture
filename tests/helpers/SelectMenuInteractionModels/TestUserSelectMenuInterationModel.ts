import { UserSelectMenuInteraction } from 'discord.js';
import { UserSelectMenuInteractionModel } from '../../../src/model/SelectMenuInteractionModels/UserSelectMenuInteractionModel';

export class TestUserSelectMenuInteractionModel extends UserSelectMenuInteractionModel {
  public constructorCalled: boolean = false;
  public constructorCalledWith: any[] = [];

  constructor(id: string, deferReply: number | undefined = 0, deferReplyEphemeral: boolean = false) {
    super(id, deferReply, deferReplyEphemeral);

    this.constructorCalled = true;
    this.constructorCalledWith = [id, deferReply, deferReplyEphemeral];
  }

  public handleCalled: number = 0;
  public handleCalledWith: any[] = [];

  public override async handle(interaction: UserSelectMenuInteraction): Promise<void> {
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
