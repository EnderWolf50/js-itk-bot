const dotenv = require('dotenv');
const { Intents } = require('discord.js');
const { ItkBot } = require('./base/ItkBot');

dotenv.config();

const client = new ItkBot({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
    Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,
  ],
});

client.init({
  commandFolder: `${process.cwd()}/commands`,
  slashFolder: `${process.cwd()}/slashCommands`,
  eventFolder: `${process.cwd()}/events`,
});

client.login(client.config?.bot?.token ?? process.env.BOT_TOKEN);
