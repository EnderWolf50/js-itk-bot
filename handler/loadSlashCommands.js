const glob = require('glob');

module.exports = (client) => {
  const slashFiles = glob.sync(`${process.cwd()}/slashCommands/*/*.js`);

  const slashCommandsArray = [];
  slashFiles.forEach((path) => {
    const file = require(path);
    if (!file?.name) return;
    client.slashCommands.set(file.name, file);
    slashCommandsArray.push(file);
  });

  client.on('ready', async () => {
    if (!client.config.testing)
      return client.application.commands.set(slashCommandsArray);

    client.guilds.cache
      .get(client.config.testGuildId)
      ?.commands.set(slashCommandsArray);
  });
};
