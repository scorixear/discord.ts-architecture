import { ButtonBuilder, SelectMenuBuilder } from '@discordjs/builders';
import {
  Guild,
  Message,
  TextBasedChannel,
  User,
  CommandInteraction,
  ButtonInteraction,
  ActionRowBuilder,
  EmbedBuilder,
  AttachmentBuilder,
  SelectMenuInteraction
} from 'discord.js';

/**
 * Provides functions to create and send embed messages
 */
export class MessageHandler {
  /**
   * Sends an embed message to the channel from the provided msg
   * @param param0 the parameters of the embed
   * @return the returned message object after sending the message
   */
  public static async sendEmbedMsg(param0: {
    msg: Message;
    title?: string;
    categories?: { title: string; text?: string; inline?: boolean }[];
    color?: number;
    description?: string;
    thumbnail?: string;
    image?: string;
    url?: string;
    files?: string[];
    components?: ActionRowBuilder<ButtonBuilder | SelectMenuBuilder>[];
  }) {
    return await this.sendEmbedMsgExplicit(
      param0.msg,
      param0.title,
      param0.categories,
      param0.color,
      param0.description,
      param0.thumbnail,
      param0.image,
      param0.url,
      param0.files,
      param0.components
    );
  }

  /**
   * Sends an embed message to the channel from the provided msg
   * @param param0 The parameters of the embed
   * @returns The sent message object
   */
  public static async sendEmbed(param0: {
    guild?: Guild;
    channel: TextBasedChannel;
    author?: User;
    title?: string;
    categories?: { title: string; text?: string; inline?: boolean }[];
    color?: number;
    description?: string;
    thumbnail?: string;
    image?: string;
    url?: string;
    files?: string[];
    components?: ActionRowBuilder<ButtonBuilder | SelectMenuBuilder>[];
  }) {
    return await this.sendEmbedExplicit(
      param0.guild,
      param0.channel,
      param0.author,
      param0.title,
      param0.categories,
      param0.color,
      param0.description,
      param0.thumbnail,
      param0.image,
      param0.url,
      param0.files,
      param0.components
    );
  }

  /**
   * Replies ephemeral to an interaction (works with defered interactions aswell)
   * @param param0 the parameters of the embed
   * @returns the sent message object
   */
  public static async replyError(param0: {
    interaction: CommandInteraction | ButtonInteraction | SelectMenuInteraction;
    title?: string;
    categories?: { title: string; text?: string; inline?: boolean }[];
    description?: string;
    thumbnail?: string;
    image?: string;
    color?: number;
    url?: string;
    files?: string[];
    components?: ActionRowBuilder<ButtonBuilder | SelectMenuBuilder>[];
  }) {
    if (param0.interaction.deferred || param0.interaction.replied) {
      return await param0.interaction.editReply(await this.getErrorEmbedInteraction(param0));
    } else {
      return await param0.interaction.reply(await this.getErrorEmbedInteraction(param0));
    }
  }

  /**
   * Replies to an interaction (works with defered interactions aswell)
   * @param param0 the parameters of the embed
   * @returns the sent message object
   */
  public static async reply(param0: {
    interaction: CommandInteraction | ButtonInteraction | SelectMenuInteraction;
    title?: string;
    categories?: { title: string; text?: string; inline?: boolean }[];
    description?: string;
    thumbnail?: string;
    image?: string;
    color?: number;
    url?: string;
    files?: string[];
    components?: ActionRowBuilder<ButtonBuilder | SelectMenuBuilder>[];
    ephemeral?: boolean;
  }) {
    if (param0.interaction.deferred || param0.interaction.replied) {
      return await param0.interaction.editReply(await this.getEmbedInteraction(param0));
    } else {
      return await param0.interaction.reply(await this.getEmbedInteraction(param0));
    }
  }

  /**
   * Follows up to an interaction (if not replied, it replies; works with defered replies aswell)
   * @param param0 the parameters of the embed
   * @returns the sent message object
   */
  public static async followUp(param0: {
    interaction: CommandInteraction | ButtonInteraction | SelectMenuInteraction;
    title?: string;
    categories?: { title: string; text?: string; inline?: boolean }[];
    description?: string;
    thumbnail?: string;
    image?: string;
    color?: number;
    url?: string;
    files?: string[];
    components?: ActionRowBuilder<ButtonBuilder | SelectMenuBuilder>[];
    ephemeral?: boolean;
  }) {
    if (param0.interaction.replied) {
      return await param0.interaction.followUp(await this.getEmbedInteraction(param0));
    } else if (param0.interaction.deferred) {
      return await param0.interaction.editReply(await this.getEmbedInteraction(param0));
    } else {
      return await param0.interaction.reply(await this.getEmbedInteraction(param0));
    }
  }

  /**
   * Sends an embed message to the channel
   * @param guild the Guild to print to
   * @param channel the channel to print to
   * @param author the author of the message
   * @param title the title
   * @param categories the fields
   * @param color hex rgb color
   * @param description
   * @param thumbnail thumbnail url string
   * @param url an url
   * @param files path to files attached to the message
   * @param components the components added to the embed
   * @return the sent message object
   */
  public static async sendEmbedExplicit(
    guild: Guild | undefined,
    channel: TextBasedChannel,
    author: User | undefined,
    title: string | undefined,
    categories: { title: string; text?: string; inline?: boolean }[] | undefined,
    color: number | undefined,
    description: string | undefined,
    thumbnail: string | undefined,
    image: string | undefined,
    url: string | undefined,
    files: string[] | undefined,
    components: ActionRowBuilder<ButtonBuilder | SelectMenuBuilder>[] | undefined
  ) {
    channel.sendTyping();
    const richText: EmbedBuilder = new EmbedBuilder();
    if (title) {
      richText.setTitle(title);
    }

    if (categories) {
      richText.addFields(
        categories.map((category) => {
          return { name: category.title, value: category.text || '\u200b', inline: category.inline || false };
        })
      );
    }
    if (color) {
      richText.setColor(color);
    }
    if (description) {
      richText.setDescription(description);
    }
    if (thumbnail) {
      richText.setThumbnail(thumbnail);
    }
    let images: AttachmentBuilder[] = [];
    if (image) {
      images = [new AttachmentBuilder(`./src/assets/${image}`)];
      richText.setImage(`attachment://${image}`);
    }
    let fileAttachments: AttachmentBuilder[] = [];
    if (files) {
      fileAttachments = files.map((f) => new AttachmentBuilder(f));
    }

    if (guild && author) {
      const guildMember = await guild.members.fetch(author);
      richText.setFooter({
        text: guildMember.displayName,
        iconURL: guildMember.displayAvatarURL()
      });
    }

    richText.setTimestamp(new Date());
    if (url) {
      richText.setURL(url);
    }
    if (components) {
      return channel.send({ embeds: [richText], components, files: [...images, ...fileAttachments] });
    }
    return channel.send({ embeds: [richText], files: [...images, ...fileAttachments] });
  }

  /**
   * Returns a {@link MessageOptions} object from the given interaction
   * @param param0 the parameters of the embed
   * @returns the MessageOptions object ready to be sent
   */
  public static async getEmbedInteraction(param0: {
    interaction: CommandInteraction | ButtonInteraction | SelectMenuInteraction;
    title?: string;
    categories?: { title: string; text?: string; inline?: boolean }[];
    description?: string;
    thumbnail?: string;
    image?: string;
    color?: number;
    url?: string;
    files?: string[];
    components?: ActionRowBuilder<ButtonBuilder | SelectMenuBuilder>[];
    ephemeral?: boolean;
  }) {
    return this.getEmbed({
      guild: param0.interaction.guild ?? undefined,
      author: param0.interaction.user,
      title: param0.title,
      categories: param0.categories,
      color: param0.color ?? 0x00ff00,
      description: param0.description,
      thumbnail: param0.thumbnail,
      image: param0.image,
      url: param0.url,
      files: param0.files,
      components: param0.components,
      ephemeral: param0.ephemeral
    });
  }

  /**
   * Returns a @see {MessageOptions} object from the given interaction ready to be send
   * @param param0 the parameters for the embed
   * @returns the MessageOptions object
   */
  public static async getErrorEmbedInteraction(param0: {
    interaction: CommandInteraction | ButtonInteraction | SelectMenuInteraction;
    title?: string;
    categories?: { title: string; text?: string; inline?: boolean }[];
    description?: string;
    thumbnail?: string;
    image?: string;
    color?: number;
    url?: string;
    files?: string[];
    components?: ActionRowBuilder<ButtonBuilder | SelectMenuBuilder>[];
  }) {
    return this.getEmbed({
      guild: param0.interaction.guild ?? undefined,
      author: param0.interaction.user,
      title: param0.title,
      categories: param0.categories,
      color: param0.color ?? 0xff0000,
      description: param0.description,
      thumbnail: param0.thumbnail,
      image: param0.image,
      url: param0.url,
      files: param0.files,
      components: param0.components,
      ephemeral: true
    });
  }

  /**
   * Returns a @see {MessageOptions} object ready to be send
   * @param param0 the parameters for the embed
   * @returns the MessageOptions object
   */
  public static async getEmbed(param0: {
    guild?: Guild;
    author?: User;
    title?: string;
    categories?: { title: string; text?: string; inline?: boolean }[];
    color?: number;
    description?: string;
    thumbnail?: string;
    image?: string;
    url?: string;
    files?: string[];
    components?: ActionRowBuilder<ButtonBuilder | SelectMenuBuilder>[];
    ephemeral?: boolean;
  }) {
    return this.getEmbedExplicit(
      param0.guild,
      param0.author,
      param0.title,
      param0.categories,
      param0.color,
      param0.description,
      param0.thumbnail,
      param0.image,
      param0.url,
      param0.files,
      param0.components,
      param0.ephemeral
    );
  }

  /**
   * Returns a @see {MessageOptions} object ready to be send
   * @param guild the guild to send to
   * @param author the author set in the bottom of the message
   * @param title the title of the message
   * @param categories categories for this message
   * @param color the HEX color for this message
   * @param description the description for this message
   * @param thumbnail the URL to the thumbnail
   * @param image the path to the file under ./src/assets/
   * @param url the URL of this embed
   * @param files path to files attached to the message
   * @param components the Components of this embed
   * @param ephemeral send as ephemeral or not
   * @returns the messageoptions object ready to be send
   */
  public static async getEmbedExplicit(
    guild?: Guild,
    author?: User,
    title?: string,
    categories?: { title: string; text?: string; inline?: boolean }[],
    color?: number,
    description?: string,
    thumbnail?: string,
    image?: string,
    url?: string,
    files?: string[],
    components?: ActionRowBuilder<ButtonBuilder | SelectMenuBuilder>[],
    ephemeral?: boolean
  ) {
    const richText: EmbedBuilder = new EmbedBuilder();
    if (title) {
      richText.setTitle(title);
    }

    if (categories) {
      richText.addFields(
        categories.map((category) => {
          return { name: category.title, value: category.text || '\u200b', inline: category.inline || false };
        })
      );
    }
    if (color) {
      richText.setColor(color);
    }
    if (description) {
      richText.setDescription(description);
    }
    if (thumbnail) {
      richText.setThumbnail(thumbnail);
    }
    let images: AttachmentBuilder[] = [];
    if (image) {
      images = [new AttachmentBuilder(`./src/assets/${image}`)];
      richText.setImage(`attachment://${image}`);
    }

    let fileAttachments: AttachmentBuilder[] = [];
    if (files) {
      fileAttachments = files.map((f) => new AttachmentBuilder(f));
    }

    if (guild && author) {
      const guildMember = await guild.members.fetch(author);
      richText.setFooter({
        text: guildMember.displayName,
        iconURL: guildMember.displayAvatarURL()
      });
    }

    richText.setTimestamp(new Date());
    if (url) {
      richText.setURL(url.toString());
    }
    const eph = ephemeral || false;

    let returnValue: {
      embeds: EmbedBuilder[];
      ephemeral: boolean;
      components?: ActionRowBuilder<ButtonBuilder | SelectMenuBuilder>[];
      files: AttachmentBuilder[];
    } = { embeds: [richText], ephemeral: eph, files: [...images, ...fileAttachments] };

    if (components) {
      returnValue = { embeds: [richText], ephemeral: eph, components, files: [...images, ...fileAttachments] };
    }
    return returnValue;
  }

  /**
   * Sends an embed to the same channel of the provided message
   * @param msg the message object to print from
   * @param title the title of the embed
   * @param categories the fields to add
   * @param color hex rgb number
   * @param image image path
   * @param description the descriptions of the message
   * @param thumbnail thumbnail url
   * @param url the URL of this message
   * @param files path to files attached to the message
   * @param components the components of this embed
   * @return the sent message object
   */
  public static async sendEmbedMsgExplicit(
    msg: Message,
    title: string | undefined,
    categories: { title: string; text?: string; inline?: boolean }[] | undefined,
    color: number | undefined,
    description: string | undefined,
    thumbnail: string | undefined,
    image: string | undefined,
    url: string | undefined,
    files: string[] | undefined,
    components: ActionRowBuilder<ButtonBuilder | SelectMenuBuilder>[] | undefined
  ) {
    return await this.sendEmbedExplicit(
      msg.guild ?? undefined,
      msg.channel,
      msg.author,
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
  }

  /**
   * Splits the provided lines into several categories (each category with maximum 1024 characters)
   * and adds a heading to the first category
   * @param lines the lines to split among multiple categories
   * @param heading the heading of the first category
   * @returns the categories
   */
  public static splitInCategories(lines: string[], heading: string) {
    // Clone lines array
    const linesClone = lines.slice();
    // categories
    const categoryStrings: string[] = [''];
    // as long as we need to add lines
    while (linesClone.length > 0) {
      const currentString = categoryStrings[categoryStrings.length - 1];
      // if current category + this line is not too long
      if (currentString.length + linesClone[0].length + 1 < 1024) {
        categoryStrings[categoryStrings.length - 1] = currentString + linesClone.shift() + '\n';
      } else {
        // remove last newline character
        categoryStrings[categoryStrings.length - 1] = categoryStrings[categoryStrings.length - 1].slice(0, -1);
        // add new category
        categoryStrings.push(linesClone.shift() + '\n');
      }
    }
    categoryStrings[categoryStrings.length - 1] = categoryStrings[categoryStrings.length - 1].slice(0, -1);
    const categories = [
      {
        title: heading,
        text: categoryStrings[0],
        inline: true
      }
    ];
    for (let i = 1; i < categoryStrings.length; i++) {
      categories.push({
        title: '\u200b',
        text: categoryStrings[i],
        inline: true
      });
    }
    return categories;
  }
}
