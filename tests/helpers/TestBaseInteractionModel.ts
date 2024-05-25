/* eslint-disable @typescript-eslint/no-unused-vars */
import { Interaction } from 'discord.js';
import { BaseInteractionModel } from '../../src/model/BaseInteractionModel';

export class TestBaseInteractionModel extends BaseInteractionModel {
  public constructorCalled: boolean = false;
  public constructorCalledWith: any[] = [];

  constructor(id: string, deferReply: number | undefined = 2000, deferReplyEphemeral: boolean = false) {
    super(id, deferReply, deferReplyEphemeral);
    this.constructorCalled = true;
    this.constructorCalledWith = [id, deferReply, deferReplyEphemeral];
  }

  public clearAllMocks(): void {
    this.constructorCalled = false;
    this.constructorCalledWith = [];
  }

  public canHandle(_: string, _1: Interaction): boolean {
    throw new Error('Method not implemented.');
  }
  public handle(_: Interaction): Promise<void> {
    throw new Error('Method not implemented.');
  }
  public activateDeferredReply(_: Interaction): void {
    throw new Error('Method not implemented.');
  }
}
