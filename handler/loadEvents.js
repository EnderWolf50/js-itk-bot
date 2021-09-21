const glob = require('glob');

module.exports = (client) => {
  const eventFiles = glob.sync(`${process.cwd()}/events/*.js`);
  eventFiles.forEach((path) => require(path)(client));
};
