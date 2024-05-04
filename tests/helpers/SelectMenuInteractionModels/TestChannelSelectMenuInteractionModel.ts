import { ChannelSelectMenuInteraction } from 'discord.js';
import { ChannelSelectMenuInteractionModel } from '../../../src/model/SelectMenuInteractionModels/ChannelSelectMenuInteractionModel';

export class TestChannelSelectMenuInteractionModel extends ChannelSelectMenuInteractionModel {
  public constructorCalled: boolean = false;
  public constructorCalledWith: any[] = [];

  constructor(id: string, deferReply: number | undefined = 0, deferReplyEphemeral: boolean = false) {
    super(id, deferReply, deferReplyEphemeral);
    this.constructorCalled = true;
    this.constructorCalledWith = [id, deferReply, deferReplyEphemeral];
  }

  public handleCalled: number = 0;
  public handleCalledWith: any[] = [];

  public override async handle(interaction: ChannelSelectMenuInteraction): Promise<void> {
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
