const chalk = require('chalk');

module.exports = (client) => {
  client.on('ready', async () => {
    console.log(chalk.yellow('The bot is ready to go!'));
  });
};
