import {
  Client,
  Guild,
  GatewayIntentBits,
  Partials,
  Awaitable,
  GuildResolvable,
  UserResolvable,
  ClientEvents
} from 'discord.js';

/**
 * Provides methods for interaction with the discord.js @type {Client}
 * and exposes this {@link client} for custom usage.
 */
export class DiscordHandler {
  public client: Client;

  /**
   * Default Constructor
   * @param partials The partials to load
   * @param intents The intents to load
   */
  constructor(partials: Partials[], intents: GatewayIntentBits[]) {
    this.client = new Client({
      partials: partials,
      intents: intents
    });
  }

  /**
   * Returns the first guild the cient is in
   * @returns @type {Guild}
   */
  public getFirstGuild() {
    return this.client.guilds.cache.first();
  }

  /**
   * Returns a collection of roles of the guild
   * @param guild the guild to retrieve the roles from
   * @returns the collection
   */
  public async getRolesOfGuild(guild: Guild) {
    return await guild.roles.fetch();
  }

  /**
   * Returns a guild
   * @param guild the guildResolvable
   * @returns the guild object
   */
  public async fetchGuild(guild: GuildResolvable) {
    return await this.client.guilds.fetch({ guild });
  }

  /**
   * Returns the currently cache of guilds
   * @returns  cached guilds
   */
  public getGuilds() {
    return this.client.guilds.cache;
  }

  /**
   * Returns a guild member
   * @param user the useresolvable
   * @param guild the guild this user is inside
   * @returns the member object
   */
  public async fetchMember(user: UserResolvable, guild: Guild) {
    return await guild.members.fetch(user);
  }

  /**
   * Adds an event listener
   * @param event the event to listen on
   * @param callback called when the event occurs
   * @returns the client this event is listening on
   */
  public on(event: string, callback: (...args: any[]) => Awaitable<void>) {
    return this.client.on(event, callback);
  }

  public once(event: keyof ClientEvents, callback: (...args: any[]) => Awaitable<void>) {
    return this.client.once(event, callback);
  }

  /**
   * Logs in the client
   * @param token the token to login with
   * @returns an promise that resolves when the login is done.
   */
  public async login(token: string) {
    return await this.client.login(token);
  }
}
