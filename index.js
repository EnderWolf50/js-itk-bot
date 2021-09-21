const glob = require('glob');
const dotenv = require('dotenv');
const { Client, Intents, Collection } = require('discord.js');

dotenv.config();

const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

client.commands = new Collection();
client.slashCommands = new Collection();
client.config = require('./config.json');

require('./handler/loadCommands.js')(client);
require('./handler/loadEvents.js')(client);
require('./handler/loadSlashCommands.js')(client);

client.login(process.env.TOKEN);
