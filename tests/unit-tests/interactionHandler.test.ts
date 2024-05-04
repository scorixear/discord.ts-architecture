import 'jest';
import { CommandInteractionModel } from '../../src/model/CommandInteractionModel';
import { AnySelectMenuInteractionModel } from '../../src/model/SelectMenuInteractionModels/AnySelectMenuInteractionModel';
import { ButtonInteractionModel } from '../../src/model/ButtonInteractionModel';
import { DiscordHandler } from '../../src/handlers/discordHandler';

import { InteractionHandler } from '../../src/handlers/interactionHandler';
import { TwoWayMap } from '../../src/model/TwoWayMap';
import { TestCommandInteractionModel } from '../helpers/TestCommandInteractionModel';
import { TestMentionableSelectMenuInteractionModel } from '../helpers/SelectMenuInteractionModels/TestMentionableSelectMenuInteractionModel';
import { TestRoleSelectMenuInteractionModel } from '../helpers/SelectMenuInteractionModels/TestRoleSelectMenuInteractionModel';
import { TestStringSelectMenuInteractionModel } from '../helpers/SelectMenuInteractionModels/TestStringSelectMenuInteractionModel';
import { TestUserSelectMenuInteractionModel } from '../helpers/SelectMenuInteractionModels/TestUserSelectMenuInterationModel';
import { TestSelectMenuInteractionModel } from '../helpers/TestSelectMenuInteractionModel';
import { TestButtonInteractionModel } from '../helpers/TestButtonInteractionModel';
import { TestAutocompleteInteractionModel } from '../helpers/TestAutocompleteInteractionModel';
import { TestInteraction } from '../helpers/TestInteraction';
import { REST } from '@discordjs/rest';
import { Awaitable, Collection, InteractionType } from 'discord.js';

jest.mock('../../src/handlers/discordHandler', () => ({
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

const mockInteractionHelper = new TestInteraction();
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
  Interaction: jest.fn().mockImplementation(() => ({
    isButton: jest.fn().mockReturnValue(mockInteractionHelper.isButton),
    isChatInputCommand: jest.fn().mockReturnValue(mockInteractionHelper.isChatInputCommand),
    type: mockInteractionHelper.isAutoComplete
      ? InteractionType.ApplicationCommandAutocomplete
      : InteractionType.ApplicationCommand,
    isAnySelectMenu: jest.fn().mockReturnValue(mockInteractionHelper.isAnySelectMenu),
    isStringSelectMenu: jest.fn().mockReturnValue(mockInteractionHelper.isStringSelectMenu),
    isSelectMenu: jest.fn().mockReturnValue(mockInteractionHelper.isSelectMenu),
    isChannelSelectMenu: jest.fn().mockReturnValue(mockInteractionHelper.isChannelSelectMenu),
    isMentionableSelectMenu: jest.fn().mockReturnValue(mockInteractionHelper.isMentionableSelectMenu),
    isRoleSelectMenu: jest.fn().mockReturnValue(mockInteractionHelper.isRoleSelectMenu),
    isUserSelectMenu: jest.fn().mockReturnValue(mockInteractionHelper.isUserSelectMenu)
  }))
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
  let selectMenuInteractions: TwoWayMap<string, AnySelectMenuInteractionModel>;
  let buttonInteractions: TwoWayMap<string, ButtonInteractionModel>;
  const afterConstruct = jest.fn();
  let discordHandler: DiscordHandler;
  beforeEach(() => {
    jest.clearAllMocks();
    mockInteractionHelper.mockClear();
    discordHandler = new DiscordHandler([], []);
    commandInteractions = [
      new TestCommandInteractionModel('command1'),
      new TestCommandInteractionModel('command2'),
      new TestAutocompleteInteractionModel('autocomplete1')
    ];

    selectMenuInteractions = new TwoWayMap<string, AnySelectMenuInteractionModel>(
      new Map<string, AnySelectMenuInteractionModel>([
        ['selectMenu1', new TestMentionableSelectMenuInteractionModel('selectMenu1')],
        ['selectMenu2', new TestRoleSelectMenuInteractionModel('selectMenu2')],
        ['selectMenu3', new TestStringSelectMenuInteractionModel('selectMenu3')],
        ['selectMenu4', new TestUserSelectMenuInteractionModel('selectMenu4')],
        ['selectMenu5', new TestSelectMenuInteractionModel('selectMenu5')]
      ])
    );

    buttonInteractions = new TwoWayMap<string, ButtonInteractionModel>(
      new Map<string, ButtonInteractionModel>([
        ['button1', new TestButtonInteractionModel('button1')],
        ['button2', new TestButtonInteractionModel('button2')],
        ['button3', new TestButtonInteractionModel('button3')]
      ])
    );
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
});
