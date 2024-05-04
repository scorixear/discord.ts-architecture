import 'jest';

import { DiscordHandler } from '../../../src/handlers/discordHandler';
import { Client, Events, GatewayIntentBits, Guild, Partials } from 'discord.js';
jest.mock('discord.js', () => ({
  Client: jest.fn().mockImplementation(() => ({
    guilds: {
      cache: {
        first: jest.fn()
      },
      fetch: jest.fn()
    },
    members: {
      fetch: jest.fn()
    },
    on: jest.fn(),
    once: jest.fn(),
    login: jest.fn()
  })),
  GatewayIntentBits: {
    Guilds: 'GUILDS'
  },
  Partials: {
    GuildMember: 'GUILD_MEMBER'
  },
  Guild: jest.fn(() => ({
    roles: {
      fetch: jest.fn()
    },
    members: {
      fetch: jest.fn()
    }
  })),
  Collection: jest.fn(),
  Events: {
    Debug: 'debug'
  }
}));
describe('DiscordHandler', () => {
  let SuT: DiscordHandler;
  beforeEach(() => {
    jest.clearAllMocks();
    SuT = new DiscordHandler([], []);
  });

  describe('constructor', () => {
    it('should create a new instance of the client', () => {
      const partials = [Partials.GuildMember];
      const intents = [GatewayIntentBits.Guilds];
      SuT = new DiscordHandler(partials, intents);
      expect(SuT.client).toBeDefined();
      expect(Client).toHaveBeenLastCalledWith({ partials, intents });
    });
  });

  describe('getFirstGuild', () => {
    it('should return the first guild', () => {
      SuT.getFirstGuild();
      expect(SuT.client.guilds.cache.first).toHaveBeenCalled();
    });
  });

  describe('getRolesOfGuild', () => {
    it('should return the roles of the guild', async () => {
      const mockGuild = new (Guild as any)();
      await SuT.getRolesOfGuild(mockGuild);
      expect(mockGuild.roles.fetch).toHaveBeenCalled();
    });
  });

  describe('fetchGuild', () => {
    it('should return the guild', async () => {
      const mockGuild = new (Guild as any)();
      await SuT.fetchGuild(mockGuild);
      expect(SuT.client.guilds.fetch).toHaveBeenCalled();
    });
  });

  describe('getGuilds', () => {
    it('should return the cached guilds', () => {
      const result = SuT.getGuilds();
      expect(result).toBeDefined();
    });
  });

  describe('fetchMember', () => {
    it('should return the member', async () => {
      const mockGuild = new (Guild as any)();
      await SuT.fetchMember('user', mockGuild);
      expect(mockGuild.members.fetch).toHaveBeenCalledWith('user');
    });
  });

  describe('on', () => {
    it('should call the on method of the client', () => {
      SuT.on('event', jest.fn());
      expect(SuT.client.on).toHaveBeenCalledWith('event', expect.any(Function));
    });
  });

  describe('once', () => {
    it('should call the once method of the client', () => {
      SuT.once(Events.Debug, jest.fn());
      expect(SuT.client.once).toHaveBeenCalledWith(Events.Debug, expect.any(Function));
    });
  });

  describe('login', () => {
    it('should call the login method of the client', () => {
      SuT.login('token');
      expect(SuT.client.login).toHaveBeenCalledWith('token');
    });
  });
});
