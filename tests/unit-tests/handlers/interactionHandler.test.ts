/* eslint-disable @typescript-eslint/no-unused-vars */
import 'jest';
import { CommandInteractionModel } from '../../../src/model/CommandInteractionModel';
import { AnySelectMenuInteractionModel } from '../../../src/model/SelectMenuInteractionModels/AnySelectMenuInteractionModel';
import { ButtonInteractionModel } from '../../../src/model/ButtonInteractionModel';
import { DiscordHandler } from '../../../src/handlers/discordHandler';
import { Logger } from '../../../src/logging/logger';
import { InteractionHelper } from '../../helpers/InteractionHelper';

import { InteractionHandler } from '../../../src/handlers/interactionHandler';
import { TestCommandInteractionModel } from '../../helpers/TestCommandInteractionModel';
import { TestMentionableSelectMenuInteractionModel } from '../../helpers/SelectMenuInteractionModels/TestMentionableSelectMenuInteractionModel';
import { TestRoleSelectMenuInteractionModel } from '../../helpers/SelectMenuInteractionModels/TestRoleSelectMenuInteractionModel';
import { TestStringSelectMenuInteractionModel } from '../../helpers/SelectMenuInteractionModels/TestStringSelectMenuInteractionModel';
import { TestUserSelectMenuInteractionModel } from '../../helpers/SelectMenuInteractionModels/TestUserSelectMenuInterationModel';
import { TestButtonInteractionModel } from '../../helpers/TestButtonInteractionModel';
import { TestAutocompleteInteractionModel } from '../../helpers/TestAutocompleteInteractionModel';
import { REST } from '@discordjs/rest';
import {
  AnySelectMenuInteraction,
  AutocompleteInteraction,
  Awaitable,
  ButtonInteraction,
  ChannelSelectMenuInteraction,
  ChatInputCommandInteraction,
  Collection,
  InteractionType,
  MentionableSelectMenuInteraction,
  RoleSelectMenuInteraction,
  SelectMenuInteraction,
  StringSelectMenuInteraction,
  UserSelectMenuInteraction
} from 'discord.js';
import { TestChannelSelectMenuInteractionModel } from '../../helpers/SelectMenuInteractionModels/TestChannelSelectMenuInteractionModel';
import { TestAnySelectMenuInteractionModel } from '../../helpers/SelectMenuInteractionModels/TestAnySelectMenuInteractionModel';

jest.mock('../../../src/logging/logger.ts');

jest.mock('../../../src/handlers/discordHandler', () => ({
  DiscordHandler: jest.fn().mockImplementation(() => ({
    getGuilds: jest.fn().mockReturnValue(
      new Collection<string, any>([
        ['guildId', { id: 'guildId' }],
        ['guildId2', { id: 'guildId2' }]
      ])
    ),
    on: jest.fn().mockReturnThis()
  }))
}));

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
  })),
  Interaction: jest.fn(),
  ButtonInteraction: jest.fn(),
  ChatInputCommandInteraction: jest.fn(),
  AutocompleteInteraction: jest.fn(),
  AnySelectMenuInteraction: jest.fn(),
  SelectMenuInteraction: jest.fn(),
  StringSelectMenuInteraction: jest.fn(),
  ChannelSelectMenuInteraction: jest.fn(),
  MentionableSelectMenuInteraction: jest.fn(),
  RoleSelectMenuInteraction: jest.fn(),
  UserSelectMenuInteraction: jest.fn()
}));

jest.mock('@discordjs/rest', () => ({
  ...jest.requireActual('@discordjs/rest'),
  REST: jest.fn().mockImplementation(() => ({
    put: jest.fn().mockResolvedValue({}),
    setToken: jest.fn().mockReturnThis()
  }))
}));

jest.mock('discord-api-types/v10', () => ({
  ...jest.requireActual('discord-api-types/v10'),
  Routes: {
    applicationGuildCommands: jest.fn()
  }
}));

describe('InteractionHandler', () => {
  let SuT: InteractionHandler;
  let commandInteractions: CommandInteractionModel[];
  let selectMenuInteractions: AnySelectMenuInteractionModel[];
  let buttonInteractions: ButtonInteractionModel[];
  const afterConstruct = jest.fn();
  let discordHandler: DiscordHandler;
  beforeEach(() => {
    jest.clearAllMocks();
    discordHandler = new DiscordHandler([], []);
    commandInteractions = [
      new TestCommandInteractionModel('command1'),
      new TestCommandInteractionModel('command2'),
      new TestAutocompleteInteractionModel('autocomplete1')
    ];

    selectMenuInteractions = [
      new TestStringSelectMenuInteractionModel('selectMenu2'),
      new TestChannelSelectMenuInteractionModel('selectMenu3'),
      new TestMentionableSelectMenuInteractionModel('selectMenu4'),
      new TestRoleSelectMenuInteractionModel('selectMenu5'),
      new TestUserSelectMenuInteractionModel('selectMenu6'),
      new TestAnySelectMenuInteractionModel('selectMenu7')
    ];

    buttonInteractions = [
      new TestButtonInteractionModel('button1'),
      new TestButtonInteractionModel('button2'),
      new TestButtonInteractionModel('button3')
    ];
    SuT = new InteractionHandler(commandInteractions, buttonInteractions, selectMenuInteractions, afterConstruct);
  });

  describe('constructor', () => {
    it('should create a new instance of the InteractionHandler', () => {
      expect(SuT.commandInteractions).toBe(commandInteractions);
      expect(SuT.selectMenuInteractions).toBe(selectMenuInteractions);
      expect(SuT.buttonInteractions).toBe(buttonInteractions);
      expect(afterConstruct).toHaveBeenCalledWith(commandInteractions);
    });
  });

  describe('init', () => {
    it('should call Ready of command interactions', async () => {
      await SuT.init('testToken', 'testClientId', discordHandler, ['testGuildId'], ['testNotGuildId']);

      commandInteractions.forEach((interaction) => {
        if (interaction instanceof TestCommandInteractionModel) {
          expect(interaction.ReadyResolved).toBeTruthy();
        } else if (interaction instanceof TestAutocompleteInteractionModel) {
          expect(interaction.ReadyResolved).toBeTruthy();
        }
      });
    });

    it('should return if no guildId was found that matches', async () => {
      await SuT.init('testToken', 'testClientId', discordHandler, ['testGuildId'], ['testNotGuildId']);

      expect(discordHandler.getGuilds).toHaveBeenCalled();
      const restPut = (REST as unknown as jest.Mock).mock.results[0].value.put;
      expect(restPut).not.toHaveBeenCalled();
    });

    it('should call put of the rest client', async () => {
      await SuT.init('testToken', 'testClientId', discordHandler, ['guildId'], ['testNotGuildId']);

      expect(discordHandler.getGuilds).toHaveBeenCalled();
      const restPut = (REST as unknown as jest.Mock).mock.results[0].value.put;
      expect(restPut).toHaveBeenCalled();
    });

    it('should return if guild is in notGuildIds', async () => {
      await SuT.init('testToken', 'testClientId', discordHandler, undefined, ['guildId']);

      expect(discordHandler.getGuilds).toHaveBeenCalled();
      const restPut = (REST as unknown as jest.Mock).mock.results[0].value.put;
      expect(restPut).toHaveBeenCalledTimes(1);
    });

    it('should call discordHandler.on every time', async () => {
      await SuT.init('testToken', 'testClientId', discordHandler, ['guildId'], ['testNotGuildId']);

      expect(discordHandler.on).toHaveBeenCalled();
    });

    it('should not call rest on event, if guildId not present', async () => {
      let mockCallback: (...args: any[]) => Awaitable<void> = () => {};
      discordHandler.on = (event: string, callback: (...args: any[]) => Awaitable<void>) => {
        mockCallback = callback;
        return {} as any;
      };
      await SuT.init('testToken', 'testClientId', discordHandler, ['testGuildId'], ['guildId']);
      mockCallback({ id: 'guildId' });

      const restPut = (REST as unknown as jest.Mock).mock.results[0].value.put;
      expect(restPut).not.toHaveBeenCalled();
    });

    it('should not call rest on event, if notGuildId is present', async () => {
      let mockCallback: (...args: any[]) => Awaitable<void> = () => {};
      discordHandler.on = (event: string, callback: (...args: any[]) => Awaitable<void>) => {
        mockCallback = callback;
        return {} as any;
      };
      await SuT.init('testToken', 'testClientId', discordHandler, undefined, ['guildId']);
      (REST as unknown as jest.Mock).mock.results[0].value.put.mockClear();
      mockCallback({ id: 'guildId' });

      const restPut = (REST as unknown as jest.Mock).mock.results[0].value.put;
      expect(restPut).not.toHaveBeenCalled();
    });

    it('should call rest on event, no ids are given', async () => {
      let mockCallback: (...args: any[]) => Awaitable<void> = () => {};
      discordHandler.on = (event: string, callback: (...args: any[]) => Awaitable<void>) => {
        mockCallback = callback;
        return {} as any;
      };
      await SuT.init('testToken', 'testClientId', discordHandler, undefined, undefined);
      (REST as unknown as jest.Mock).mock.results[0].value.put.mockClear();
      mockCallback({ id: 'guildId' });

      const restPut = (REST as unknown as jest.Mock).mock.results[0].value.put;
      expect(restPut).toHaveBeenCalled();
    });
  });

  describe('handle', () => {
    it('should throw error if handle throws error', async () => {
      const mockButtonInteraction = InteractionHelper.getInteraction({
        isButton: true,
        customId: 'button1'
      });
      const buttonHandler = buttonInteractions.find((model) => model.id == 'button1') as TestButtonInteractionModel;
      buttonHandler.throwErrorOnHandle = true;
      await SuT.handle(mockButtonInteraction as unknown as ButtonInteraction);
      expect(Logger.exception).toHaveBeenCalled();
    });
    it('should call no handler of no matching interaction', async () => {
      const mockButtonInteraction = InteractionHelper.getInteraction({
        isButton: true,
        customId: 'unknown'
      });
      await SuT.handle(mockButtonInteraction as unknown as ButtonInteraction);
      buttonInteractions.forEach((v, k) => {
        expect((v as TestButtonInteractionModel).handleCalled).toBe(0);
      });
    });
    it('should call handle of matching button interaction', async () => {
      const mockButtonInteraction = InteractionHelper.getInteraction({
        isButton: true,
        customId: 'button1'
      });
      await SuT.handle(mockButtonInteraction as unknown as ButtonInteraction);
      buttonInteractions.forEach((model) => {
        if (model.id === 'button1') {
          expect((model as TestButtonInteractionModel).handleCalled).toBe(1);
          expect((model as TestButtonInteractionModel).handleCalledWith[0]).toBe(mockButtonInteraction);
        } else {
          expect((model as TestButtonInteractionModel).handleCalled).toBe(0);
        }
      });
    });

    it('should call handle of matching command interaction', async () => {
      const mockCommandInteraction = InteractionHelper.getInteraction({
        isChatInputCommand: true,
        commandName: 'command1'
      });
      await SuT.handle(mockCommandInteraction as unknown as ChatInputCommandInteraction);
      commandInteractions.forEach((v) => {
        if (v.command === 'command1') {
          expect((v as TestCommandInteractionModel).handleCalled).toBe(1);
          expect((v as TestCommandInteractionModel).handleCalledWith[0]).toBe(mockCommandInteraction);
        } else {
          expect((v as TestCommandInteractionModel).handleCalled).toBe(0);
        }
      });
    });

    it('should call handle of matching autocomplete interaction', async () => {
      const mockCommandInteraction = InteractionHelper.getInteraction({
        type: InteractionType.ApplicationCommandAutocomplete,
        commandName: 'autocomplete1',
        isAutocomplete: true
      });
      await SuT.handle(mockCommandInteraction as unknown as AutocompleteInteraction);
      commandInteractions.forEach((v) => {
        if (v.command === 'autocomplete1') {
          expect((v as TestAutocompleteInteractionModel).handleAutocompleteCalled).toBe(1);
          expect((v as TestAutocompleteInteractionModel).handleAutocompleteCalledWith[0]).toBe(mockCommandInteraction);
        } else {
          expect((v as TestCommandInteractionModel).handleCalled).toBe(0);
        }
      });
    });

    it('should call handle of matching select menu interaction', async () => {
      const mockSelectMenuInteraction = InteractionHelper.getInteraction({
        isAnySelectMenu: true,
        isSelectMenu: true,
        isStringSelectMenu: false,
        customId: 'selectMenu2'
      });
      await SuT.handle(mockSelectMenuInteraction as unknown as SelectMenuInteraction);
      selectMenuInteractions.forEach((model) => {
        if (model.id === 'selectMenu2') {
          expect((model as TestStringSelectMenuInteractionModel).handleCalled).toBe(1);
          expect((model as TestStringSelectMenuInteractionModel).handleCalledWith[0]).toBe(mockSelectMenuInteraction);
        } else {
          expect((model as any).handleCalled).toBe(0);
        }
      });
    });

    it('should call handle of matching string select menu interaction', async () => {
      const mockSelectMenuInteraction = InteractionHelper.getInteraction({
        isAnySelectMenu: true,
        isSelectMenu: false,
        isStringSelectMenu: true,
        customId: 'selectMenu2'
      });
      await SuT.handle(mockSelectMenuInteraction as unknown as StringSelectMenuInteraction);
      selectMenuInteractions.forEach((model) => {
        if (model.id === 'selectMenu2') {
          expect((model as TestStringSelectMenuInteractionModel).handleCalled).toBe(1);
          expect((model as TestStringSelectMenuInteractionModel).handleCalledWith[0]).toBe(mockSelectMenuInteraction);
        } else {
          expect((model as any).handleCalled).toBe(0);
        }
      });
    });

    it('should call handle of matching channel select menu interaction', async () => {
      const mockSelectMenuInteraction = InteractionHelper.getInteraction({
        isAnySelectMenu: true,
        isChannelSelectMenu: true,
        customId: 'selectMenu3'
      });
      await SuT.handle(mockSelectMenuInteraction as unknown as ChannelSelectMenuInteraction);
      selectMenuInteractions.forEach((model) => {
        if (model.id === 'selectMenu3') {
          expect((model as TestChannelSelectMenuInteractionModel).handleCalled).toBe(1);
          expect((model as TestChannelSelectMenuInteractionModel).handleCalledWith[0]).toBe(mockSelectMenuInteraction);
        } else {
          expect((model as any).handleCalled).toBe(0);
        }
      });
    });

    it('should call handle of matching mentionable select menu interaction', async () => {
      const mockSelectMenuInteraction = InteractionHelper.getInteraction({
        isAnySelectMenu: true,
        isMentionableSelectMenu: true,
        customId: 'selectMenu4'
      });
      await SuT.handle(mockSelectMenuInteraction as unknown as MentionableSelectMenuInteraction);
      selectMenuInteractions.forEach((model) => {
        if (model.id === 'selectMenu4') {
          expect((model as TestMentionableSelectMenuInteractionModel).handleCalled).toBe(1);
          expect((model as TestMentionableSelectMenuInteractionModel).handleCalledWith[0]).toBe(
            mockSelectMenuInteraction
          );
        } else {
          expect((model as any).handleCalled).toBe(0);
        }
      });
    });

    it('should call handle of matching role select menu interaction', async () => {
      const mockSelectMenuInteraction = InteractionHelper.getInteraction({
        isAnySelectMenu: true,
        isRoleSelectMenu: true,
        customId: 'selectMenu5'
      });
      await SuT.handle(mockSelectMenuInteraction as unknown as RoleSelectMenuInteraction);
      selectMenuInteractions.forEach((model) => {
        if (model.id === 'selectMenu5') {
          expect((model as TestRoleSelectMenuInteractionModel).handleCalled).toBe(1);
          expect((model as TestRoleSelectMenuInteractionModel).handleCalledWith[0]).toBe(mockSelectMenuInteraction);
        } else {
          expect((model as any).handleCalled).toBe(0);
        }
      });
    });

    it('should call handle of matching user select menu interaction', async () => {
      const mockSelectMenuInteraction = InteractionHelper.getInteraction({
        isAnySelectMenu: true,
        isUserSelectMenu: true,
        customId: 'selectMenu6'
      });
      await SuT.handle(mockSelectMenuInteraction as unknown as UserSelectMenuInteraction);
      selectMenuInteractions.forEach((model) => {
        if (model.id === 'selectMenu6') {
          expect((model as TestUserSelectMenuInteractionModel).handleCalled).toBe(1);
          expect((model as TestUserSelectMenuInteractionModel).handleCalledWith[0]).toBe(mockSelectMenuInteraction);
        } else {
          expect((model as any).handleCalled).toBe(0);
        }
      });
    });

    it('should call handle of matching any select menu interaction', async () => {
      const mockSelectMenuInteraction = InteractionHelper.getInteraction({
        isAnySelectMenu: true,
        customId: 'selectMenu7'
      });
      await SuT.handle(mockSelectMenuInteraction as unknown as AnySelectMenuInteraction);
      selectMenuInteractions.forEach((model) => {
        if (model.id === 'selectMenu7') {
          expect((model as TestAnySelectMenuInteractionModel).handleCalled).toBe(1);
          expect((model as TestAnySelectMenuInteractionModel).handleCalledWith[0]).toBe(mockSelectMenuInteraction);
        } else {
          expect((model as any).handleCalled).toBe(0);
        }
      });
    });
  });
});
