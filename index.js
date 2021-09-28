const chalk = require('chalk');
const dotenv = require('dotenv');
const fs = require('fs');
const { Intents } = require('discord.js');
const { ItkBot } = require('./base/ItkBot');
const { loadYaml } = require('./helpers/config');

dotenv.config();

const config = loadYaml(fs.readFileSync('./config.yml', 'utf-8'));

const client = new ItkBot({
  intents: 32767 ?? [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
    Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,
  ],
  config,
});
module.exports = { client };

(async () => {
  const { successCount, failCount } = await client.init({
    commandFolder: `${__dirname}/commands`,
    slashFolder: `${__dirname}/slashCommands`,
    eventFolder: `${__dirname}/events`,
  });
  console.log(
    chalk`{cyan The initialize ends up w/ {green ${successCount} success(es)} and {red ${failCount} fail(s)}}`,
  );
})();

client.login(client.config.bot.token ?? process.env.BOT_TOKEN);
