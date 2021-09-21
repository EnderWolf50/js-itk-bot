const glob = require('glob');

module.exports = (client) => {
  const commandFiles = glob.sync(`${process.cwd()}/commands/*/*.js`);
  commandFiles.forEach((path) => {
    const file = require(path);
    if (!file?.name) return;

    client.commands.set(file.name, file);
  });
};
