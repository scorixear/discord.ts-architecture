import 'jest';

import { MessageHandler as SuT } from '../../../src/handlers/messageHandler';

import {
  ActionRowBuilder,
  ButtonBuilder,
  ChannelSelectMenuBuilder,
  CommandInteraction,
  EmbedBuilder,
  Guild,
  MentionableSelectMenuBuilder,
  Message,
  RoleSelectMenuBuilder,
  StringSelectMenuBuilder,
  TextBasedChannel,
  User,
  UserSelectMenuBuilder
} from 'discord.js';

jest.mock('discord.js', () => ({
  ...jest.requireActual('discord.js'),
  EmbedBuilder: jest.fn().mockImplementation(() => ({
    setTitle: jest.fn(),
    addFields: jest.fn(),
    setColor: jest.fn(),
    setDescription: jest.fn(),
    setThumbnail: jest.fn(),
    setImage: jest.fn(),
    setFooter: jest.fn(),
    setTimestamp: jest.fn(),
    setURL: jest.fn()
  })),
  Guild: jest.fn().mockImplementation(() => ({}))
}));

describe('MessageHandler', () => {
  const msg = {
    guild: {
      members: {
        fetch: jest.fn().mockResolvedValue({
          displayName: 'displayName',
          displayAvatarURL: jest.fn().mockReturnValue('displayAvatarURL')
        })
      }
    },
    channel: {
      sendTyping: jest.fn(),
      send: jest.fn()
    },
    author: jest.fn()
  };
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('sendEmbedMsg', () => {
    it('should send an embed message', async () => {
      const title = 'title';
      const categories = [{ title: 'name', text: 'value', inline: true }];
      const color = 0x555;
      const description = 'description';
      const thumbnail = 'thumbnail';
      const image = 'image';
      const url = 'url';
      const files = ['file'];
      const components = [
        new ActionRowBuilder<
          | ButtonBuilder
          | StringSelectMenuBuilder
          | UserSelectMenuBuilder
          | RoleSelectMenuBuilder
          | MentionableSelectMenuBuilder
          | ChannelSelectMenuBuilder
        >().addComponents(new ButtonBuilder(), new StringSelectMenuBuilder())
      ];

      await SuT.sendEmbedMsg({
        msg: msg as unknown as Message,
        title,
        categories,
        color,
        description,
        thumbnail,
        image,
        url,
        files,
        components
      });
      const richText = (EmbedBuilder as unknown as jest.Mock).mock.results[0].value;
      expect(msg.channel.sendTyping).toHaveBeenCalled();
      expect(richText.setTitle).toHaveBeenCalledWith(title);
      expect(richText.addFields).toHaveBeenCalledWith(
        categories.map((category) => ({
          name: category.title,
          value: category.text,
          inline: category.inline
        }))
      );
      expect(richText.setColor).toHaveBeenCalledWith(color);
      expect(richText.setDescription).toHaveBeenCalledWith(description);
      expect(richText.setThumbnail).toHaveBeenCalledWith(thumbnail);
      expect(richText.setImage).toHaveBeenCalled();
      expect(msg.guild.members.fetch).toHaveBeenCalledWith(msg.author);
      expect(richText.setFooter).toHaveBeenCalled();
      expect(richText.setTimestamp).toHaveBeenCalled();
      expect(richText.setURL).toHaveBeenCalledWith(url);
      expect(msg.channel.send).toHaveBeenCalled();
    });
  });
  describe('sendEmbed', () => {
    it('should send an embed message', async () => {
      const title = 'title';
      const categories = [{ title: 'name', text: 'value', inline: true }];
      const color = 0x555;
      const description = 'description';
      const thumbnail = 'thumbnail';
      const image = 'image';
      const url = 'url';
      const files = ['file'];
      const components = [
        new ActionRowBuilder<
          | ButtonBuilder
          | StringSelectMenuBuilder
          | UserSelectMenuBuilder
          | RoleSelectMenuBuilder
          | MentionableSelectMenuBuilder
          | ChannelSelectMenuBuilder
        >().addComponents(new ButtonBuilder(), new StringSelectMenuBuilder())
      ];

      await SuT.sendEmbed({
        guild: msg.guild as unknown as Guild,
        channel: msg.channel as unknown as TextBasedChannel,
        author: msg.author as unknown as User,
        title,
        categories,
        color,
        description,
        thumbnail,
        image,
        url,
        files,
        components
      });

      const richText = (EmbedBuilder as unknown as jest.Mock).mock.results[0].value;
      expect(msg.channel.sendTyping).toHaveBeenCalled();
      expect(richText.setTitle).toHaveBeenCalledWith(title);
      expect(richText.addFields).toHaveBeenCalledWith(
        categories.map((category) => ({
          name: category.title,
          value: category.text,
          inline: category.inline
        }))
      );
      expect(richText.setColor).toHaveBeenCalledWith(color);
      expect(richText.setDescription).toHaveBeenCalledWith(description);
      expect(richText.setThumbnail).toHaveBeenCalledWith(thumbnail);
      expect(richText.setImage).toHaveBeenCalled();
      expect(msg.guild.members.fetch).toHaveBeenCalledWith(msg.author);
      expect(richText.setFooter).toHaveBeenCalled();
      expect(richText.setTimestamp).toHaveBeenCalled();
      expect(richText.setURL).toHaveBeenCalledWith(url);
      expect(msg.channel.send).toHaveBeenCalled();
    });
  });

  describe('replyError', () => {
    it('should reply to message', async () => {
      const interaction = {
        deferred: false,
        replied: false,
        guild: msg.guild,
        user: msg.author,
        reply: jest.fn(),
        editReply: jest.fn()
      };
      const title = 'title';
      const categories = [{ title: 'name', text: 'value', inline: true }];
      const color = 0x555;
      const description = 'description';
      const thumbnail = 'thumbnail';
      const image = 'image';
      const url = 'url';
      const files = ['file'];
      const components = [
        new ActionRowBuilder<
          | ButtonBuilder
          | StringSelectMenuBuilder
          | UserSelectMenuBuilder
          | RoleSelectMenuBuilder
          | MentionableSelectMenuBuilder
          | ChannelSelectMenuBuilder
        >().addComponents(new ButtonBuilder(), new StringSelectMenuBuilder())
      ];

      await SuT.replyError({
        interaction: interaction as unknown as CommandInteraction,
        title,
        categories,
        color,
        description,
        thumbnail,
        image,
        url,
        files,
        components
      });

      const richText = (EmbedBuilder as unknown as jest.Mock).mock.results[0].value;
      expect(interaction.reply).toHaveBeenCalled();
      expect(interaction.editReply).not.toHaveBeenCalled();
      expect(richText.setTitle).toHaveBeenCalledWith(title);
      expect(richText.addFields).toHaveBeenCalledWith(
        categories.map((category) => ({
          name: category.title,
          value: category.text,
          inline: category.inline
        }))
      );
      expect(richText.setColor).toHaveBeenCalledWith(color);
      expect(richText.setDescription).toHaveBeenCalledWith(description);
      expect(richText.setThumbnail).toHaveBeenCalledWith(thumbnail);
      expect(richText.setImage).toHaveBeenCalled();
      expect(msg.guild.members.fetch).toHaveBeenCalledWith(msg.author);
      expect(richText.setFooter).toHaveBeenCalled();
      expect(richText.setTimestamp).toHaveBeenCalled();
      expect(richText.setURL).toHaveBeenCalledWith(url);
    });

    it('should edit reply to message if deferred', async () => {
      const interaction = {
        deferred: true,
        replied: false,
        guild: msg.guild,
        user: msg.author,
        reply: jest.fn(),
        editReply: jest.fn()
      };
      const title = 'title';
      const categories = [{ title: 'name', text: 'value', inline: true }];
      const color = 0x555;
      const description = 'description';
      const thumbnail = 'thumbnail';
      const image = 'image';
      const url = 'url';
      const files = ['file'];
      const components = [
        new ActionRowBuilder<
          | ButtonBuilder
          | StringSelectMenuBuilder
          | UserSelectMenuBuilder
          | RoleSelectMenuBuilder
          | MentionableSelectMenuBuilder
          | ChannelSelectMenuBuilder
        >().addComponents(new ButtonBuilder(), new StringSelectMenuBuilder())
      ];

      await SuT.replyError({
        interaction: interaction as unknown as CommandInteraction,
        title,
        categories,
        color,
        description,
        thumbnail,
        image,
        url,
        files,
        components
      });

      const richText = (EmbedBuilder as unknown as jest.Mock).mock.results[0].value;
      expect(interaction.reply).not.toHaveBeenCalled();
      expect(interaction.editReply).toHaveBeenCalled();
      expect(richText.setTitle).toHaveBeenCalledWith(title);
      expect(richText.addFields).toHaveBeenCalledWith(
        categories.map((category) => ({
          name: category.title,
          value: category.text,
          inline: category.inline
        }))
      );
      expect(richText.setColor).toHaveBeenCalledWith(color);
      expect(richText.setDescription).toHaveBeenCalledWith(description);
      expect(richText.setThumbnail).toHaveBeenCalledWith(thumbnail);
      expect(richText.setImage).toHaveBeenCalled();
      expect(msg.guild.members.fetch).toHaveBeenCalledWith(msg.author);
      expect(richText.setFooter).toHaveBeenCalled();
      expect(richText.setTimestamp).toHaveBeenCalled();
      expect(richText.setURL).toHaveBeenCalledWith(url);
    });

    it('should edit reply to message if replied', async () => {
      const interaction = {
        deferred: false,
        replied: true,
        guild: msg.guild,
        user: msg.author,
        reply: jest.fn(),
        editReply: jest.fn()
      };
      const title = 'title';
      const categories = [{ title: 'name', text: 'value', inline: true }];
      const color = 0x555;
      const description = 'description';
      const thumbnail = 'thumbnail';
      const image = 'image';
      const url = 'url';
      const files = ['file'];
      const components = [
        new ActionRowBuilder<
          | ButtonBuilder
          | StringSelectMenuBuilder
          | UserSelectMenuBuilder
          | RoleSelectMenuBuilder
          | MentionableSelectMenuBuilder
          | ChannelSelectMenuBuilder
        >().addComponents(new ButtonBuilder(), new StringSelectMenuBuilder())
      ];

      await SuT.replyError({
        interaction: interaction as unknown as CommandInteraction,
        title,
        categories,
        color,
        description,
        thumbnail,
        image,
        url,
        files,
        components
      });

      const richText = (EmbedBuilder as unknown as jest.Mock).mock.results[0].value;
      expect(interaction.reply).not.toHaveBeenCalled();
      expect(interaction.editReply).toHaveBeenCalled();
      expect(richText.setTitle).toHaveBeenCalledWith(title);
      expect(richText.addFields).toHaveBeenCalledWith(
        categories.map((category) => ({
          name: category.title,
          value: category.text,
          inline: category.inline
        }))
      );
      expect(richText.setColor).toHaveBeenCalledWith(color);
      expect(richText.setDescription).toHaveBeenCalledWith(description);
      expect(richText.setThumbnail).toHaveBeenCalledWith(thumbnail);
      expect(richText.setImage).toHaveBeenCalled();
      expect(msg.guild.members.fetch).toHaveBeenCalledWith(msg.author);
      expect(richText.setFooter).toHaveBeenCalled();
      expect(richText.setTimestamp).toHaveBeenCalled();
      expect(richText.setURL).toHaveBeenCalledWith(url);
    });
  });

  describe('reply', () => {
    it('should reply to message', async () => {
      const interaction = {
        deferred: false,
        replied: false,
        guild: msg.guild,
        user: msg.author,
        reply: jest.fn(),
        editReply: jest.fn()
      };
      const title = 'title';
      const categories = [{ title: 'name', text: 'value', inline: true }];
      const color = 0x555;
      const description = 'description';
      const thumbnail = 'thumbnail';
      const image = 'image';
      const url = 'url';
      const files = ['file'];
      const components = [
        new ActionRowBuilder<
          | ButtonBuilder
          | StringSelectMenuBuilder
          | UserSelectMenuBuilder
          | RoleSelectMenuBuilder
          | MentionableSelectMenuBuilder
          | ChannelSelectMenuBuilder
        >().addComponents(new ButtonBuilder(), new StringSelectMenuBuilder())
      ];

      await SuT.reply({
        interaction: interaction as unknown as CommandInteraction,
        title,
        categories,
        color,
        description,
        thumbnail,
        image,
        url,
        files,
        components
      });

      const richText = (EmbedBuilder as unknown as jest.Mock).mock.results[0].value;
      expect(interaction.reply).toHaveBeenCalled();
      expect(interaction.editReply).not.toHaveBeenCalled();
      expect(richText.setTitle).toHaveBeenCalledWith(title);
      expect(richText.addFields).toHaveBeenCalledWith(
        categories.map((category) => ({
          name: category.title,
          value: category.text,
          inline: category.inline
        }))
      );
      expect(richText.setColor).toHaveBeenCalledWith(color);
      expect(richText.setDescription).toHaveBeenCalledWith(description);
      expect(richText.setThumbnail).toHaveBeenCalledWith(thumbnail);
      expect(richText.setImage).toHaveBeenCalled();
      expect(msg.guild.members.fetch).toHaveBeenCalledWith(msg.author);
      expect(richText.setFooter).toHaveBeenCalled();
      expect(richText.setTimestamp).toHaveBeenCalled();
      expect(richText.setURL).toHaveBeenCalledWith(url);
    });

    it('should edit reply to message if deferred', async () => {
      const interaction = {
        deferred: true,
        replied: false,
        guild: msg.guild,
        user: msg.author,
        reply: jest.fn(),
        editReply: jest.fn()
      };
      const title = 'title';
      const categories = [{ title: 'name', text: 'value', inline: true }];
      const color = 0x555;
      const description = 'description';
      const thumbnail = 'thumbnail';
      const image = 'image';
      const url = 'url';
      const files = ['file'];
      const components = [
        new ActionRowBuilder<
          | ButtonBuilder
          | StringSelectMenuBuilder
          | UserSelectMenuBuilder
          | RoleSelectMenuBuilder
          | MentionableSelectMenuBuilder
          | ChannelSelectMenuBuilder
        >().addComponents(new ButtonBuilder(), new StringSelectMenuBuilder())
      ];

      await SuT.reply({
        interaction: interaction as unknown as CommandInteraction,
        title,
        categories,
        color,
        description,
        thumbnail,
        image,
        url,
        files,
        components
      });

      const richText = (EmbedBuilder as unknown as jest.Mock).mock.results[0].value;
      expect(interaction.reply).not.toHaveBeenCalled();
      expect(interaction.editReply).toHaveBeenCalled();
      expect(richText.setTitle).toHaveBeenCalledWith(title);
      expect(richText.addFields).toHaveBeenCalledWith(
        categories.map((category) => ({
          name: category.title,
          value: category.text,
          inline: category.inline
        }))
      );
      expect(richText.setColor).toHaveBeenCalledWith(color);
      expect(richText.setDescription).toHaveBeenCalledWith(description);
      expect(richText.setThumbnail).toHaveBeenCalledWith(thumbnail);
      expect(richText.setImage).toHaveBeenCalled();
      expect(msg.guild.members.fetch).toHaveBeenCalledWith(msg.author);
      expect(richText.setFooter).toHaveBeenCalled();
      expect(richText.setTimestamp).toHaveBeenCalled();
      expect(richText.setURL).toHaveBeenCalledWith(url);
    });

    it('should edit reply to message if replied', async () => {
      const interaction = {
        deferred: false,
        replied: true,
        guild: msg.guild,
        user: msg.author,
        reply: jest.fn(),
        editReply: jest.fn()
      };
      const title = 'title';
      const categories = [{ title: 'name', text: 'value', inline: true }];
      const color = 0x555;
      const description = 'description';
      const thumbnail = 'thumbnail';
      const image = 'image';
      const url = 'url';
      const files = ['file'];
      const components = [
        new ActionRowBuilder<
          | ButtonBuilder
          | StringSelectMenuBuilder
          | UserSelectMenuBuilder
          | RoleSelectMenuBuilder
          | MentionableSelectMenuBuilder
          | ChannelSelectMenuBuilder
        >().addComponents(new ButtonBuilder(), new StringSelectMenuBuilder())
      ];

      await SuT.reply({
        interaction: interaction as unknown as CommandInteraction,
        title,
        categories,
        color,
        description,
        thumbnail,
        image,
        url,
        files,
        components
      });

      const richText = (EmbedBuilder as unknown as jest.Mock).mock.results[0].value;
      expect(interaction.reply).not.toHaveBeenCalled();
      expect(interaction.editReply).toHaveBeenCalled();
      expect(richText.setTitle).toHaveBeenCalledWith(title);
      expect(richText.addFields).toHaveBeenCalledWith(
        categories.map((category) => ({
          name: category.title,
          value: category.text,
          inline: category.inline
        }))
      );
      expect(richText.setColor).toHaveBeenCalledWith(color);
      expect(richText.setDescription).toHaveBeenCalledWith(description);
      expect(richText.setThumbnail).toHaveBeenCalledWith(thumbnail);
      expect(richText.setImage).toHaveBeenCalled();
      expect(msg.guild.members.fetch).toHaveBeenCalledWith(msg.author);
      expect(richText.setFooter).toHaveBeenCalled();
      expect(richText.setTimestamp).toHaveBeenCalled();
      expect(richText.setURL).toHaveBeenCalledWith(url);
    });
  });

  describe('followUp', () => {
    it('should follow up to message if replied', async () => {
      const interaction = {
        deferred: false,
        replied: true,
        guild: msg.guild,
        user: msg.author,
        followUp: jest.fn(),
        reply: jest.fn(),
        editReply: jest.fn()
      };
      const title = 'title';
      const categories = [{ title: 'name', text: 'value', inline: true }];
      const color = 0x555;
      const description = 'description';
      const thumbnail = 'thumbnail';
      const image = 'image';
      const url = 'url';
      const files = ['file'];
      const components = [
        new ActionRowBuilder<
          | ButtonBuilder
          | StringSelectMenuBuilder
          | UserSelectMenuBuilder
          | RoleSelectMenuBuilder
          | MentionableSelectMenuBuilder
          | ChannelSelectMenuBuilder
        >().addComponents(new ButtonBuilder(), new StringSelectMenuBuilder())
      ];

      await SuT.followUp({
        interaction: interaction as unknown as CommandInteraction,
        title,
        categories,
        color,
        description,
        thumbnail,
        image,
        url,
        files,
        components
      });

      const richText = (EmbedBuilder as unknown as jest.Mock).mock.results[0].value;
      expect(interaction.reply).not.toHaveBeenCalled();
      expect(interaction.editReply).not.toHaveBeenCalled();
      expect(interaction.followUp).toHaveBeenCalled();
      expect(richText.setTitle).toHaveBeenCalledWith(title);
      expect(richText.addFields).toHaveBeenCalledWith(
        categories.map((category) => ({
          name: category.title,
          value: category.text,
          inline: category.inline
        }))
      );
      expect(richText.setColor).toHaveBeenCalledWith(color);
      expect(richText.setDescription).toHaveBeenCalledWith(description);
      expect(richText.setThumbnail).toHaveBeenCalledWith(thumbnail);
      expect(richText.setImage).toHaveBeenCalled();
      expect(msg.guild.members.fetch).toHaveBeenCalledWith(msg.author);
      expect(richText.setFooter).toHaveBeenCalled();
      expect(richText.setTimestamp).toHaveBeenCalled();
      expect(richText.setURL).toHaveBeenCalledWith(url);
    });

    it('should edit reply to message if deferred', async () => {
      const interaction = {
        deferred: true,
        replied: false,
        guild: msg.guild,
        user: msg.author,
        followUp: jest.fn(),
        reply: jest.fn(),
        editReply: jest.fn()
      };
      const title = 'title';
      const categories = [{ title: 'name', text: 'value', inline: true }];
      const color = 0x555;
      const description = 'description';
      const thumbnail = 'thumbnail';
      const image = 'image';
      const url = 'url';
      const files = ['file'];
      const components = [
        new ActionRowBuilder<
          | ButtonBuilder
          | StringSelectMenuBuilder
          | UserSelectMenuBuilder
          | RoleSelectMenuBuilder
          | MentionableSelectMenuBuilder
          | ChannelSelectMenuBuilder
        >().addComponents(new ButtonBuilder(), new StringSelectMenuBuilder())
      ];

      await SuT.followUp({
        interaction: interaction as unknown as CommandInteraction,
        title,
        categories,
        color,
        description,
        thumbnail,
        image,
        url,
        files,
        components
      });

      const richText = (EmbedBuilder as unknown as jest.Mock).mock.results[0].value;
      expect(interaction.reply).not.toHaveBeenCalled();
      expect(interaction.editReply).toHaveBeenCalled();
      expect(interaction.followUp).not.toHaveBeenCalled();
      expect(richText.setTitle).toHaveBeenCalledWith(title);
      expect(richText.addFields).toHaveBeenCalledWith(
        categories.map((category) => ({
          name: category.title,
          value: category.text,
          inline: category.inline
        }))
      );
      expect(richText.setColor).toHaveBeenCalledWith(color);
      expect(richText.setDescription).toHaveBeenCalledWith(description);
      expect(richText.setThumbnail).toHaveBeenCalledWith(thumbnail);
      expect(richText.setImage).toHaveBeenCalled();
      expect(msg.guild.members.fetch).toHaveBeenCalledWith(msg.author);
      expect(richText.setFooter).toHaveBeenCalled();
      expect(richText.setTimestamp).toHaveBeenCalled();
      expect(richText.setURL).toHaveBeenCalledWith(url);
    });

    it('should reply to message', async () => {
      const interaction = {
        deferred: false,
        replied: false,
        guild: msg.guild,
        user: msg.author,
        followUp: jest.fn(),
        reply: jest.fn(),
        editReply: jest.fn()
      };
      const title = 'title';
      const categories = [{ title: 'name', text: 'value', inline: true }];
      const color = 0x555;
      const description = 'description';
      const thumbnail = 'thumbnail';
      const image = 'image';
      const url = 'url';
      const files = ['file'];
      const components = [
        new ActionRowBuilder<
          | ButtonBuilder
          | StringSelectMenuBuilder
          | UserSelectMenuBuilder
          | RoleSelectMenuBuilder
          | MentionableSelectMenuBuilder
          | ChannelSelectMenuBuilder
        >().addComponents(new ButtonBuilder(), new StringSelectMenuBuilder())
      ];

      await SuT.followUp({
        interaction: interaction as unknown as CommandInteraction,
        title,
        categories,
        color,
        description,
        thumbnail,
        image,
        url,
        files,
        components
      });

      const richText = (EmbedBuilder as unknown as jest.Mock).mock.results[0].value;
      expect(interaction.reply).toHaveBeenCalled();
      expect(interaction.editReply).not.toHaveBeenCalled();
      expect(interaction.followUp).not.toHaveBeenCalled();
      expect(richText.setTitle).toHaveBeenCalledWith(title);
      expect(richText.addFields).toHaveBeenCalledWith(
        categories.map((category) => ({
          name: category.title,
          value: category.text,
          inline: category.inline
        }))
      );
      expect(richText.setColor).toHaveBeenCalledWith(color);
      expect(richText.setDescription).toHaveBeenCalledWith(description);
      expect(richText.setThumbnail).toHaveBeenCalledWith(thumbnail);
      expect(richText.setImage).toHaveBeenCalled();
      expect(msg.guild.members.fetch).toHaveBeenCalledWith(msg.author);
      expect(richText.setFooter).toHaveBeenCalled();
      expect(richText.setTimestamp).toHaveBeenCalled();
      expect(richText.setURL).toHaveBeenCalledWith(url);
    });
  });

  describe('sendEmbedExplicit', () => {
    it('should send an embed message', async () => {
      const title = 'title';
      const categories = [{ title: 'name', text: 'value', inline: true }];
      const color = 0x555;
      const description = 'description';
      const thumbnail = 'thumbnail';
      const image = 'image';
      const url = 'url';
      const files = ['file'];
      const components = [
        new ActionRowBuilder<
          | ButtonBuilder
          | StringSelectMenuBuilder
          | UserSelectMenuBuilder
          | RoleSelectMenuBuilder
          | MentionableSelectMenuBuilder
          | ChannelSelectMenuBuilder
        >().addComponents(new ButtonBuilder(), new StringSelectMenuBuilder())
      ];

      await SuT.sendEmbedExplicit(
        msg.guild as unknown as Guild,
        msg.channel as unknown as TextBasedChannel,
        msg.author as unknown as User,
        title,
        categories,
        color,
        description,
        thumbnail,
        image,
        url,
        files,
        components
      );

      const richText = (EmbedBuilder as unknown as jest.Mock).mock.results[0].value;
      expect(msg.channel.sendTyping).toHaveBeenCalled();
      expect(richText.setTitle).toHaveBeenCalledWith(title);
      expect(richText.addFields).toHaveBeenCalledWith(
        categories.map((category) => ({
          name: category.title,
          value: category.text,
          inline: category.inline
        }))
      );
      expect(richText.setColor).toHaveBeenCalledWith(color);
      expect(richText.setDescription).toHaveBeenCalledWith(description);
      expect(richText.setThumbnail).toHaveBeenCalledWith(thumbnail);
      expect(richText.setImage).toHaveBeenCalled();
      expect(msg.guild.members.fetch).toHaveBeenCalledWith(msg.author);
      expect(richText.setFooter).toHaveBeenCalled();
      expect(richText.setTimestamp).toHaveBeenCalled();
      expect(richText.setURL).toHaveBeenCalledWith(url);
      expect(msg.channel.send).toHaveBeenCalled();
    });
  });

  describe('getEmbedInteraction', () => {
    it('return Embed', async () => {
      const interaction = {
        deferred: false,
        replied: false,
        guild: msg.guild,
        user: msg.author,
        reply: jest.fn(),
        editReply: jest.fn()
      };
      const title = 'title';
      const categories = [{ title: 'name', text: 'value', inline: true }];
      const color = 0x555;
      const description = 'description';
      const thumbnail = 'thumbnail';
      const image = 'image';
      const url = 'url';
      const files = ['file'];
      const components = [
        new ActionRowBuilder<
          | ButtonBuilder
          | StringSelectMenuBuilder
          | UserSelectMenuBuilder
          | RoleSelectMenuBuilder
          | MentionableSelectMenuBuilder
          | ChannelSelectMenuBuilder
        >().addComponents(new ButtonBuilder(), new StringSelectMenuBuilder())
      ];
      const ephemeral = false;

      const result = await SuT.getEmbedInteraction({
        interaction: interaction as unknown as CommandInteraction,
        title,
        categories,
        color,
        description,
        thumbnail,
        image,
        url,
        files,
        components,
        ephemeral
      });

      const richText = (EmbedBuilder as unknown as jest.Mock).mock.results[0].value;
      expect(richText.setTitle).toHaveBeenCalledWith(title);
      expect(richText.addFields).toHaveBeenCalledWith(
        categories.map((category) => ({
          name: category.title,
          value: category.text,
          inline: category.inline
        }))
      );
      expect(richText.setColor).toHaveBeenCalledWith(color);
      expect(richText.setDescription).toHaveBeenCalledWith(description);
      expect(richText.setThumbnail).toHaveBeenCalledWith(thumbnail);
      expect(richText.setImage).toHaveBeenCalled();
      expect(msg.guild.members.fetch).toHaveBeenCalledWith(msg.author);
      expect(richText.setFooter).toHaveBeenCalled();
      expect(richText.setTimestamp).toHaveBeenCalled();
      expect(richText.setURL).toHaveBeenCalledWith(url);
      expect(result.ephemeral).toBe(ephemeral);
    });
  });

  describe('getErrorEmbedInteraction', () => {
    it('return Embed', async () => {
      const interaction = {
        deferred: false,
        replied: false,
        guild: msg.guild,
        user: msg.author,
        reply: jest.fn(),
        editReply: jest.fn()
      };
      const title = 'title';
      const categories = [{ title: 'name', text: 'value', inline: true }];
      const color = 0x555;
      const description = 'description';
      const thumbnail = 'thumbnail';
      const image = 'image';
      const url = 'url';
      const files = ['file'];
      const components = [
        new ActionRowBuilder<
          | ButtonBuilder
          | StringSelectMenuBuilder
          | UserSelectMenuBuilder
          | RoleSelectMenuBuilder
          | MentionableSelectMenuBuilder
          | ChannelSelectMenuBuilder
        >().addComponents(new ButtonBuilder(), new StringSelectMenuBuilder())
      ];

      const result = await SuT.getErrorEmbedInteraction({
        interaction: interaction as unknown as CommandInteraction,
        title,
        categories,
        color,
        description,
        thumbnail,
        image,
        url,
        files,
        components
      });

      const richText = (EmbedBuilder as unknown as jest.Mock).mock.results[0].value;
      expect(richText.setTitle).toHaveBeenCalledWith(title);
      expect(richText.addFields).toHaveBeenCalledWith(
        categories.map((category) => ({
          name: category.title,
          value: category.text,
          inline: category.inline
        }))
      );
      expect(richText.setColor).toHaveBeenCalledWith(color);
      expect(richText.setDescription).toHaveBeenCalledWith(description);
      expect(richText.setThumbnail).toHaveBeenCalledWith(thumbnail);
      expect(richText.setImage).toHaveBeenCalled();
      expect(msg.guild.members.fetch).toHaveBeenCalledWith(msg.author);
      expect(richText.setFooter).toHaveBeenCalled();
      expect(richText.setTimestamp).toHaveBeenCalled();
      expect(richText.setURL).toHaveBeenCalledWith(url);
      expect(result.ephemeral).toBe(true);
    });
  });

  describe('getEmbed', () => {
    it('return Embed', async () => {
      const title = 'title';
      const categories = [{ title: 'name', text: 'value', inline: true }];
      const color = 0x555;
      const description = 'description';
      const thumbnail = 'thumbnail';
      const image = 'image';
      const url = 'url';
      const files = ['file'];
      const components = [
        new ActionRowBuilder<
          | ButtonBuilder
          | StringSelectMenuBuilder
          | UserSelectMenuBuilder
          | RoleSelectMenuBuilder
          | MentionableSelectMenuBuilder
          | ChannelSelectMenuBuilder
        >().addComponents(new ButtonBuilder(), new StringSelectMenuBuilder())
      ];
      const ephemeral = false;

      const result = await SuT.getEmbed({
        guild: msg.guild as unknown as Guild,
        author: msg.author as unknown as User,
        title,
        categories,
        color,
        description,
        thumbnail,
        image,
        url,
        files,
        components,
        ephemeral
      });

      const richText = (EmbedBuilder as unknown as jest.Mock).mock.results[0].value;
      expect(richText.setTitle).toHaveBeenCalledWith(title);
      expect(richText.addFields).toHaveBeenCalledWith(
        categories.map((category) => ({
          name: category.title,
          value: category.text,
          inline: category.inline
        }))
      );
      expect(richText.setColor).toHaveBeenCalledWith(color);
      expect(richText.setDescription).toHaveBeenCalledWith(description);
      expect(richText.setThumbnail).toHaveBeenCalledWith(thumbnail);
      expect(richText.setImage).toHaveBeenCalled();
      expect(msg.guild.members.fetch).toHaveBeenCalledWith(msg.author);
      expect(richText.setFooter).toHaveBeenCalled();
      expect(richText.setTimestamp).toHaveBeenCalled();
      expect(richText.setURL).toHaveBeenCalledWith(url);
      expect(result.ephemeral).toBe(ephemeral);
    });
  });

  describe('getEmbedExplicit', () => {
    it('return Embed', async () => {
      const title = 'title';
      const categories = [{ title: 'name', text: 'value', inline: true }];
      const color = 0x555;
      const description = 'description';
      const thumbnail = 'thumbnail';
      const image = 'image';
      const url = 'url';
      const files = ['file'];
      const components = [
        new ActionRowBuilder<
          | ButtonBuilder
          | StringSelectMenuBuilder
          | UserSelectMenuBuilder
          | RoleSelectMenuBuilder
          | MentionableSelectMenuBuilder
          | ChannelSelectMenuBuilder
        >().addComponents(new ButtonBuilder(), new StringSelectMenuBuilder())
      ];
      const ephemeral = false;

      const result = await SuT.getEmbedExplicit(
        msg.guild as unknown as Guild,
        msg.author as unknown as User,
        title,
        categories,
        color,
        description,
        thumbnail,
        image,
        url,
        files,
        components,
        ephemeral
      );

      const richText = (EmbedBuilder as unknown as jest.Mock).mock.results[0].value;
      expect(richText.setTitle).toHaveBeenCalledWith(title);
      expect(richText.addFields).toHaveBeenCalledWith(
        categories.map((category) => ({
          name: category.title,
          value: category.text,
          inline: category.inline
        }))
      );
      expect(richText.setColor).toHaveBeenCalledWith(color);
      expect(richText.setDescription).toHaveBeenCalledWith(description);
      expect(richText.setThumbnail).toHaveBeenCalledWith(thumbnail);
      expect(richText.setImage).toHaveBeenCalled();
      expect(msg.guild.members.fetch).toHaveBeenCalledWith(msg.author);
      expect(richText.setFooter).toHaveBeenCalled();
      expect(richText.setTimestamp).toHaveBeenCalled();
      expect(richText.setURL).toHaveBeenCalledWith(url);
      expect(result.ephemeral).toBe(ephemeral);
    });
  });

  describe('sendembedMsgExplicit', () => {
    it('return Embed', async () => {
      const title = 'title';
      const categories = [{ title: 'name', text: 'value', inline: true }];
      const color = 0x555;
      const description = 'description';
      const thumbnail = 'thumbnail';
      const image = 'image';
      const url = 'url';
      const files = ['file'];
      const components = [
        new ActionRowBuilder<
          | ButtonBuilder
          | StringSelectMenuBuilder
          | UserSelectMenuBuilder
          | RoleSelectMenuBuilder
          | MentionableSelectMenuBuilder
          | ChannelSelectMenuBuilder
        >().addComponents(new ButtonBuilder(), new StringSelectMenuBuilder())
      ];

      await SuT.sendEmbedMsgExplicit(
        msg as unknown as Message,
        title,
        categories,
        color,
        description,
        thumbnail,
        image,
        url,
        files,
        components
      );

      const richText = (EmbedBuilder as unknown as jest.Mock).mock.results[0].value;
      expect(msg.channel.sendTyping).toHaveBeenCalled();
      expect(richText.setTitle).toHaveBeenCalledWith(title);
      expect(richText.addFields).toHaveBeenCalledWith(
        categories.map((category) => ({
          name: category.title,
          value: category.text,
          inline: category.inline
        }))
      );
      expect(richText.setColor).toHaveBeenCalledWith(color);
      expect(richText.setDescription).toHaveBeenCalledWith(description);
      expect(richText.setThumbnail).toHaveBeenCalledWith(thumbnail);
      expect(richText.setImage).toHaveBeenCalled();
      expect(msg.guild.members.fetch).toHaveBeenCalledWith(msg.author);
      expect(richText.setFooter).toHaveBeenCalled();
      expect(richText.setTimestamp).toHaveBeenCalled();
      expect(richText.setURL).toHaveBeenCalledWith(url);
      expect(msg.channel.send).toHaveBeenCalled();
    });
  });

  describe('splitInCategories', () => {
    it('should return single category if no line is given', () => {
      const text = 'text';
      const result = SuT.splitInCategories([], text);
      expect(result.length).toBe(1);
      expect(result[0]).toEqual({ title: text, text: '', inline: true });
    });

    it('should return single category if lines are not long enough', () => {
      const lines = ['line1', 'line2'];
      const result = SuT.splitInCategories(lines, '');
      expect(result.length).toBe(1);
      expect(result[0]).toEqual({
        title: '',
        text: lines[0] + '\n' + lines[1],
        inline: true
      });
    });

    it('should return multiple categories if lines are long enough', () => {
      const lines = ['a'.repeat(1000), 'b'.repeat(1000), 'c'.repeat(1000)];
      const result = SuT.splitInCategories(lines, '');
      expect(result.length).toBe(3);
      expect(result[0]).toEqual({
        title: '',
        text: lines[0],
        inline: true
      });
      expect(result[1]).toEqual({
        title: '\u200b',
        text: lines[1],
        inline: true
      });
      expect(result[2]).toEqual({
        title: '\u200b',
        text: lines[2],
        inline: true
      });
    });

    it('should combine big and small lines if enough space', () => {
      const lines = ['a'.repeat(1000), 'b', 'c'.repeat(1000)];
      const result = SuT.splitInCategories(lines, '');
      expect(result.length).toBe(2);
      expect(result[0]).toEqual({
        title: '',
        text: lines[0] + '\n' + lines[1],
        inline: true
      });
      expect(result[1]).toEqual({
        title: '\u200b',
        text: lines[2],
        inline: true
      });
    });

    it('should throw error if line is too long', () => {
      const lines = ['a'.repeat(10000)];
      expect(() => SuT.splitInCategories(lines, '')).toThrow();
    });
  });
});
