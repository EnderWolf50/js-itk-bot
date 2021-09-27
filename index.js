const fs = require('fs');
const chalk = require('chalk');
const dotenv = require('dotenv');
const { Intents } = require('discord.js');
const { ItkBot } = require('./base/ItkBot');
const { SlashCreator, GatewayServer } = require('slash-create');
const { loadYaml } = require('./helpers/config.js');

dotenv.config();

const config = loadYaml(fs.readFileSync('./config.yml', 'utf-8'));

const client = new ItkBot({
  intents: 32767 ?? [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
    Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,
  ],
  config: config,
});

module.exports = { client };

const creator = new SlashCreator({
  applicationID: client.config.bot.applicationID,
  publicKey: client.config.bot.publicKey,
  token: client.config.bot.token,
});

creator
  .withServer(
    new GatewayServer((handler) => client.ws.on('INTERACTION_CREATE', handler))
  )
  .registerCommandsIn({
    dirname: __dirname + '/slashCommands',
    filter: /^[^_].*\.js$/,
  })
  .syncCommands();

(async () => {
  const { successCount, failCount } = await client.init({
    commandFolder: `${__dirname}/commands`,
    eventFolder: `${__dirname}/events`,
  });
  console.log(
    chalk`{cyan The initialize ends up w/ {green ${successCount} success(es)} and {red ${failCount} fail(s)}}`
  );
})();

client.login(client.config.bot.token ?? process.env.BOT_TOKEN);
