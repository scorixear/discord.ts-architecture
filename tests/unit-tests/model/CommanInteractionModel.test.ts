import 'jest';

import { Logger } from '../../../src/logging/logger';
import { TestCommandInteractionModel } from '../../helpers/TestCommandInteractionModel';
import {
  SlashCommandAttachmentOption,
  SlashCommandBooleanOption,
  SlashCommandBuilder,
  SlashCommandChannelOption,
  SlashCommandIntegerOption,
  SlashCommandMentionableOption,
  SlashCommandNumberOption,
  SlashCommandRoleOption,
  SlashCommandStringOption,
  SlashCommandSubcommandBuilder,
  SlashCommandSubcommandGroupBuilder,
  SlashCommandUserOption
} from 'discord.js';

jest.mock('../../../src/logging/logger');

jest.mock('discord.js', () => ({
  ...jest.requireActual('discord.js'),
  SlashCommandBuilder: jest.fn().mockImplementation(() => ({
    setName: jest.fn().mockReturnThis(),
    setDescription: jest.fn().mockReturnThis(),
    addChannelOption: jest.fn().mockReturnThis(),
    addStringOption: jest.fn().mockReturnThis(),
    addBooleanOption: jest.fn().mockReturnThis(),
    addUserOption: jest.fn().mockReturnThis(),
    addIntegerOption: jest.fn().mockReturnThis(),
    addAttachmentOption: jest.fn().mockReturnThis(),
    addRoleOption: jest.fn().mockReturnThis(),
    addNumberOption: jest.fn().mockReturnThis(),
    addMentionableOption: jest.fn().mockReturnThis(),
    addSubcommand: jest.fn().mockReturnThis(),
    addSubcommandGroup: jest.fn().mockReturnThis(),
    toJSON: jest.fn().mockReturnValue({})
  }))
}));

let throwMockError = false;
const mockInteraction = {
  replied: false,
  deferred: false,
  deferReply: jest.fn().mockImplementation(() => {
    if (throwMockError) {
      return new Promise((_, reject) => reject());
    }
    return new Promise((resolve) => resolve(0));
  }),
  guild: {
    commands: {
      fetch: jest.fn().mockResolvedValue({
        find: jest.fn().mockImplementation((cb) => {
          if (cb({ name: 'test' })) {
            return {};
          }
          return undefined;
        })
      })
    }
  },
  member: {
    fetch: jest.fn().mockResolvedValue({
      user: {
        id: 'owner'
      },
      roles: {
        cache: {
          find: jest.fn().mockImplementation((cb) => {
            if (cb('abc')) {
              return {};
            }
            return undefined;
          })
        }
      }
    })
  },
  isChatInputCommand: jest.fn().mockReturnValue(true)
};

const flushPromises = () => new Promise((resolve) => Promise.resolve().then(resolve));

describe('CommandInteractionModel', () => {
  let SuT: TestCommandInteractionModel;
  let originalEnv: any;
  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
    originalEnv = process.env;
    process.env = { ...originalEnv, OWNER_ID: '' };
    SuT = new TestCommandInteractionModel('test', 'test', [], 1000, true, ['abc']);
    throwMockError = false;
    mockInteraction.replied = false;
    mockInteraction.deferred = false;
    mockInteraction.isChatInputCommand = jest.fn().mockReturnValue(true);
  });

  afterEach(() => {
    jest.clearAllTimers();
    process.env = originalEnv;
  });

  describe('constructor', () => {
    it('should set all properties', () => {
      expect(SuT.constructorCalled).toBeTruthy();
      expect((SuT as any).command).toBe('test');
      expect((SuT as any).description).toBe('test');
      expect((SuT as any).deferReply).toBe(1000);
      expect((SuT as any).deferReplyEphemeral).toBeTruthy();
      expect((SuT as any).allowedRoles).toEqual(['abc']);
    });
    it('should have called SlashComandOptions', () => {
      SuT = new TestCommandInteractionModel('test', 'test', [
        new SlashCommandChannelOption(),
        new SlashCommandStringOption(),
        new SlashCommandBooleanOption(),
        new SlashCommandUserOption(),
        new SlashCommandIntegerOption(),
        new SlashCommandAttachmentOption(),
        new SlashCommandRoleOption(),
        new SlashCommandNumberOption(),
        new SlashCommandMentionableOption(),
        new SlashCommandSubcommandBuilder(),
        new SlashCommandSubcommandGroupBuilder()
      ]);
      const mockedInstance = (SlashCommandBuilder as jest.Mock).mock.results[1].value;
      expect(mockedInstance).toBeDefined();
      expect(mockedInstance.setName).toHaveBeenCalledWith('test');
      expect(mockedInstance.setDescription).toHaveBeenCalledWith('test');
      expect(mockedInstance.addChannelOption).toHaveBeenCalled();
      expect(mockedInstance.addStringOption).toHaveBeenCalled();
      expect(mockedInstance.addBooleanOption).toHaveBeenCalled();
      expect(mockedInstance.addUserOption).toHaveBeenCalled();
      expect(mockedInstance.addIntegerOption).toHaveBeenCalled();
      expect(mockedInstance.addAttachmentOption).toHaveBeenCalled();
      expect(mockedInstance.addRoleOption).toHaveBeenCalled();
      expect(mockedInstance.addNumberOption).toHaveBeenCalled();
      expect(mockedInstance.addMentionableOption).toHaveBeenCalled();
      expect(mockedInstance.addSubcommand).toHaveBeenCalled();
      expect(mockedInstance.addSubcommandGroup).toHaveBeenCalled();
    });

    it('should throw error if invalid option provided', () => {
      expect(() => new TestCommandInteractionModel('test', 'test', [new Error()])).toThrow();
    });
  });

  describe('activateDeferredReply', () => {
    it('should not call if deferReply is undefined', async () => {
      SuT = new TestCommandInteractionModel('test', 'test', [], undefined, true, ['abc']);
      await SuT.activateDeferredReply(mockInteraction as any);
      jest.advanceTimersByTime(1000);
      await flushPromises();
      expect(mockInteraction.deferReply).not.toHaveBeenCalled();
      expect(Logger.exception).not.toHaveBeenCalled();
    });

    it('should call deferReply if deferReply is defined', async () => {
      await SuT.activateDeferredReply(mockInteraction as any);
      jest.advanceTimersByTime(1000);
      await flushPromises();
      expect(mockInteraction.deferReply).toHaveBeenCalledWith({ ephemeral: true });
      expect(Logger.exception).not.toHaveBeenCalled();
    });

    it('should not call deferReply if interation was replied and deferred', async () => {
      mockInteraction.replied = true;
      mockInteraction.deferred = true;
      await SuT.activateDeferredReply(mockInteraction as any);
      jest.advanceTimersByTime(1000);
      await flushPromises();
      expect(mockInteraction.deferReply).not.toHaveBeenCalled();
      expect(Logger.exception).not.toHaveBeenCalled();
    });

    it('should call logger if deferReply is defined and error occurs', async () => {
      throwMockError = true;
      await SuT.activateDeferredReply(mockInteraction as any);
      jest.advanceTimersByTime(1000);
      await flushPromises();
      expect(mockInteraction.deferReply).toHaveBeenCalledWith({ ephemeral: true });
      expect(Logger.exception).toHaveBeenCalled();
    });
  });
  describe('checkPermissions', () => {
    it('should not call fetch if allowedRoles is undefined', async () => {
      SuT = new TestCommandInteractionModel('test', 'test', [], 1000, true, undefined);
      expect(await SuT.checkPermissions(mockInteraction as any)).toBeTruthy();
      expect(mockInteraction.guild.commands.fetch).not.toHaveBeenCalled();
    });

    it('should not call fetch if applicationCommand not found', async () => {
      SuT = new TestCommandInteractionModel('notFound', 'test', [], 1000, true, ['abc']);
      expect(await SuT.checkPermissions(mockInteraction as any)).toBeTruthy();
      expect(mockInteraction.guild.commands.fetch).toHaveBeenCalled();
      expect(mockInteraction.member.fetch).not.toHaveBeenCalled();
    });

    it('should return early if user is owner', async () => {
      process.env = { ...originalEnv, OWNER_ID: 'owner' };
      expect(await SuT.checkPermissions(mockInteraction as any)).toBeTruthy();
      expect(mockInteraction.guild.commands.fetch).toHaveBeenCalled();
      expect(mockInteraction.member.fetch).toHaveBeenCalled();
      const mockedFetch = await mockInteraction.member.fetch.mock.results[0].value;
      expect(mockedFetch.roles.cache.find).not.toHaveBeenCalled();
    });

    it('should return early if role was found', async () => {
      expect(await SuT.checkPermissions(mockInteraction as any)).toBeTruthy();
      expect(mockInteraction.guild.commands.fetch).toHaveBeenCalled();
      expect(mockInteraction.member.fetch).toHaveBeenCalled();
      const mockedFetch = await mockInteraction.member.fetch.mock.results[0].value;
      expect(mockedFetch.roles.cache.find).toHaveBeenCalled();
    });

    it('should throw if no role was found', async () => {
      SuT = new TestCommandInteractionModel('test', 'test', [], 1000, true, ['def']);
      expect(await SuT.checkPermissions(mockInteraction as any)).toBeFalsy();
    });
  });

  describe('canHandle', () => {
    it('should return true if command is the same and interaction is a ChatInputCommandInteraction', () => {
      expect(SuT.canHandle(SuT.command, mockInteraction as any)).toBeTruthy();
    });

    it('should return false if command is not the same', () => {
      expect(SuT.canHandle('notTest', mockInteraction as any)).toBeFalsy();
    });

    it('should return false if interaction is not a ChatInputCommandInteraction', () => {
      mockInteraction.isChatInputCommand = jest.fn().mockReturnValue(false);
      expect(SuT.canHandle(SuT.command, mockInteraction as any)).toBeFalsy();
    });
  });
});
