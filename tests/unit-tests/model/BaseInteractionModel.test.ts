import 'jest';
import { TestBaseInteractionModel } from '../../helpers/TestBaseInteractionModel';

describe('ButtonInteractionModel', () => {
  let SuT: TestBaseInteractionModel;
  beforeEach(() => {
    SuT = new TestBaseInteractionModel('test', 1000, true);
  });

  describe('constructor', () => {
    it('should set the id, deferReply and deferReplyEphemeral', () => {
      expect(SuT.constructorCalled).toBeTruthy();
      expect((SuT as any).id).toBe('test');
      expect((SuT as any).deferReply).toBe(1000);
      expect((SuT as any).deferReplyEphemeral).toBeTruthy();
    });
  });
});
