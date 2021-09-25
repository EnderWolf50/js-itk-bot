const chalk = require('chalk');
const dotenv = require('dotenv');
const { Intents } = require('discord.js');
const { ItkBot } = require('./base/ItkBot');

dotenv.config();

const client = new ItkBot({
  intents: 32767 ?? [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
    Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,
  ],
  configFile: './config.yml',
});

client.login(client.config.bot.token ?? process.env.BOT_TOKEN);

client.on('ready', async () => {
  const { successCount, failCount } = await client.init({
    commandFolder: `${__dirname}/commands`,
    slashFolder: `${__dirname}/slashCommands`,
    eventFolder: `${__dirname}/events`,
  });
  console.log(
    chalk`{cyan The initialize ends up w/ {green ${successCount} success(es)} and {red ${failCount} fail(s)}}`
  );
  console.log(chalk.yellow('The bot is ready to go!'));
});
