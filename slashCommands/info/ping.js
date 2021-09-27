const { SlashCommand } = require('slash-create');
const { client } = require('../..');

module.exports = class extends SlashCommand {
  constructor(creator) {
    super(creator, {
      name: 'ping',
      description: 'Send pong w/ the API ping.',
      guildIDs: client.config.bot.testing
        ? [client.config.bot.testGuild]
        : undefined,
    });
    this.filePath = __filename;
  }

  async run(ctx) {
    ctx.send(`🏓 | **Pong** w/ **${Math.floor(client.ws.ping)} ms** API ping!`);
  }
};
