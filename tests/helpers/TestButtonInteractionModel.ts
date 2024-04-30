import { ButtonInteractionModel } from '../../src/model/ButtonInteractionModel';

export class TestButtonInteractionModel extends ButtonInteractionModel {
  // Override the constructor to use the test button configuration
  constructor(id: string, deferReply: number | undefined, deferReplyEphemeral: boolean) {
    super(id, deferReply, deferReplyEphemeral);
  }
}
