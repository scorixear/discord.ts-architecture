import 'jest';

import { Logger } from '../../../../src/helpers/logging';
import { TestChannelSelectMenuInteractionModel } from '../../../helpers/SelectMenuInteractionModels/TestChannelSelectMenuInteractionModel';

jest.mock('../../../../src/helpers/logging');

let throwMockError = false;
const mockInteraction = {
  replied: false,
  deferred: false,
  deferReply: jest.fn().mockImplementation(() => {
    if (throwMockError) {
      return new Promise((_, reject) => reject());
    }
    return new Promise((resolve) => resolve(0));
  })
};

const flushPromises = () => new Promise((resolve) => Promise.resolve().then(resolve));

describe('ChannelSelectMenuInteractionModel', () => {
  let SuT: TestChannelSelectMenuInteractionModel;
  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
    SuT = new TestChannelSelectMenuInteractionModel('test', 1000, true);
    SuT.callSuperHandle = true;
    throwMockError = false;
    mockInteraction.replied = false;
    mockInteraction.deferred = false;
  });

  afterEach(() => {
    jest.clearAllTimers();
  });

  describe('constructor', () => {
    it('should set the id, deferReply and deferReplyEphemeral', () => {
      expect(SuT.constructorCalled).toBeTruthy();
      expect((SuT as any).id).toBe('test');
      expect((SuT as any).deferReply).toBe(1000);
      expect((SuT as any).deferReplyEphemeral).toBeTruthy();
    });
  });

  describe('handle', () => {
    it('should not call if deferReply is undefined', async () => {
      SuT = new TestChannelSelectMenuInteractionModel('test', undefined, true);
      SuT.callSuperHandle = true;
      await SuT.handle(mockInteraction as any);
      jest.advanceTimersByTime(1000);
      await flushPromises();
      expect(SuT.handleCalled).toBe(1);
      expect(mockInteraction.deferReply).not.toHaveBeenCalled();
      expect(Logger.exception).not.toHaveBeenCalled();
    });

    it('should call deferReply if deferReply is defined', async () => {
      await SuT.handle(mockInteraction as any);
      jest.advanceTimersByTime(1000);
      await flushPromises();
      expect(SuT.handleCalled).toBe(1);
      expect(mockInteraction.deferReply).toHaveBeenCalledWith({ ephemeral: true });
      expect(Logger.exception).not.toHaveBeenCalled();
    });

    it('should not call deferReply if interation was replied and deferred', async () => {
      mockInteraction.replied = true;
      mockInteraction.deferred = true;
      await SuT.handle(mockInteraction as any);
      jest.advanceTimersByTime(1000);
      await flushPromises();
      expect(SuT.handleCalled).toBe(1);
      expect(mockInteraction.deferReply).not.toHaveBeenCalled();
      expect(Logger.exception).not.toHaveBeenCalled();
    });

    it('should call logger if deferReply is defined and error occurs', async () => {
      throwMockError = true;
      await SuT.handle(mockInteraction as any);
      jest.advanceTimersByTime(1000);
      await flushPromises();
      expect(SuT.handleCalled).toBe(1);
      expect(mockInteraction.deferReply).toHaveBeenCalledWith({ ephemeral: true });
      expect(Logger.exception).toHaveBeenCalled();
    });
  });
});