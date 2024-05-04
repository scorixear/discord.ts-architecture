import { MentionableSelectMenuInteraction } from 'discord.js';
import { MentionableSelectMenuInteractionModel } from '../../../src/model/SelectMenuInteractionModels/MentionableSelectMenuInteractionModel';

export class TestMentionableSelectMenuInteractionModel extends MentionableSelectMenuInteractionModel {
  public constructorCalled: boolean = false;
  public constructorCalledWith: any[] = [];

  constructor(id: string, deferReply: number | undefined = 0, deferReplyEphemeral: boolean = false) {
    super(id, deferReply, deferReplyEphemeral);
    this.constructorCalled = true;
    this.constructorCalledWith = [id, deferReply, deferReplyEphemeral];
  }

  public handleCalled: number = 0;
  public handleCalledWith: any[] = [];
  public callSuperHandle: boolean = false;

  public override async handle(interaction: MentionableSelectMenuInteraction): Promise<void> {
    this.handleCalled++;
    this.handleCalledWith.push(interaction);
    if (this.callSuperHandle) {
      await super.handle(interaction);
    }
  }

  public clearAllMocks(): void {
    this.constructorCalled = false;
    this.constructorCalledWith = [];
    this.handleCalled = 0;
    this.handleCalledWith = [];
  }
}
