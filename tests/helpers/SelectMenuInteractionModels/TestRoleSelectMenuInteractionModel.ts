import { RoleSelectMenuInteraction } from 'discord.js';
import { RoleSelectMenuInteractionModel } from '../../../src/model/SelectMenuInteractionModels/RoleSelectMenuInteractionModel';

export class TestRoleSelectMenuInteractionModel extends RoleSelectMenuInteractionModel {
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

  public override async handle(interaction: RoleSelectMenuInteraction): Promise<void> {
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
