const chalk = require('chalk');

module.exports = (client) => {
  client.on('ready', () => {
    console.log(chalk.yellow('The bot is ready.'));
  });
};
