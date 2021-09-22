const dotenv = require('dotenv');
const { Intents } = require('discord.js');
const ItkBot = require('./base/ItkBot');

dotenv.config();

const client = new ItkBot({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
    Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,
  ],
});

(async () => {
  client.loadAllCommands(`${process.cwd()}/commands`);
  client.loadAllEvents(`${process.cwd()}/events`);
  client.loadAllSlashes(`${process.cwd()}/slashCommands`);
})();

client.login(process.env.TOKEN);
