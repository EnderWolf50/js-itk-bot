const { SlashCommand, CommandOptionType } = require('slash-create');
const { client } = require('../..');

module.exports = class extends SlashCommand {
  constructor(creator) {
    super(creator, {
      name: 'id',
      description: 'Get the id of the user / channel / role / emoji.',
      options: [
        {
          name: 'user',
          description: 'Get the id of the user',
          type: CommandOptionType.SUB_COMMAND,
          options: [
            {
              name: 'user',
              description: 'The user that you want to get the id of',
              type: CommandOptionType.USER,
              required: true,
            },
          ],
        },
        {
          name: 'channel',
          description: 'Get the id of the channel',
          type: CommandOptionType.SUB_COMMAND,
          options: [
            {
              name: 'channel',
              description: 'The channel that you want to get the id of',
              type: CommandOptionType.CHANNEL,
              required: true,
            },
          ],
        },
        {
          name: 'role',
          description: 'Get the id of the role',
          type: CommandOptionType.SUB_COMMAND,
          options: [
            {
              name: 'role',
              description: 'The role that you want to get the id of',
              type: CommandOptionType.ROLE,
              required: true,
            },
          ],
        },
        {
          name: 'emoji',
          description: 'Get the id of the emoji',
          type: CommandOptionType.SUB_COMMAND,
          options: [
            {
              name: 'emoji',
              description: 'The emoji that you want to get the id of',
              type: CommandOptionType.STRING,
              required: true,
            },
          ],
        },
      ],
      guildIDs: client.config.bot.testing
        ? [client.config.bot.testGuild]
        : undefined,
    });
    this.filePath = __filename;
  }

  async run(ctx) {
    const guild = client.guilds.cache.get(ctx.guildID);
    const category = ctx.subcommands[0];
    switch (category) {
      case 'user':
        const member =
          guild.members.cache.get(ctx.options.user.user) ??
          (await guild.members.fetch(ctx.options.user.user));
        return void ctx.send(
          `🔎 | The id of **${member}** is **${member.id}**`
        );
      case 'channel':
        const channel =
          guild.channels.cache.get(ctx.options.channel.channel) ??
          (await guild.channels.fetch(ctx.options.channel.channel));
        return void ctx.send(
          `🔎 | The id of **${channel}** is **${channel.id}**`
        );
      case 'role':
        const role =
          guild.roles.cache.get(ctx.options.role.role) ??
          (await guild.roles.fetch(ctx.options.role.role));
        return void ctx.send(`🔎 | The id of **${role}** is **${role.id}**`);
      case 'emoji':
        const emojiMatch = /^<a?:.*?:(.*?)>/.exec(ctx.options.emoji.emoji);
        if (!emojiMatch)
          return void ctx.send(
            `❌ | Id of ${ctx.options.emoji.emoji} not found!`
          );
        return void ctx.send(
          `🔎 | The id of **${emojiMatch[0]}** is **${emojiMatch[1]}**`
        );
    }
  }
};
