const fs = require('fs');
const Table = require('cli-table');
const { Collection } = require('discord.js');
const { Client } = require('discord.js');
const { loadYaml } = require('../helpers/config.js');

class ItkBot extends Client {
  constructor(options) {
    super(options);

    this.config = loadYaml(fs.readFileSync(options.configFile, 'utf-8'));
    this.commands = new Collection();
    this.slashCommands = new Collection();
  }

  async init({ commandFolder, slashFolder, eventFolder }) {
    let failCount = 0;
    let successCount = 0;

    // Load all commands
    const commandTable = new Table({ head: ['Category', 'Name', 'Success'] });
    const commandCategories = fs.readdirSync(commandFolder);
    commandCategories.forEach((category) => {
      const commandPath = `${commandFolder}/${category}`;
      const commandFiles = fs
        .readdirSync(commandPath)
        .filter((file) => file.endsWith('js'));
      commandFiles.forEach((file) => {
        const loadSuccess = this.loadCommand(commandPath, file);
        loadSuccess ? (successCount += 1) : (failCount += 1);
        commandTable.push([category, file, loadSuccess ? '✔️' : '❌']);
      });
    });
    console.log(commandTable.toString());

    // Load all slash commands
    const slashTable = new Table({ head: ['Category', 'Name', 'Success'] });
    const slashCategories = fs.readdirSync(slashFolder);
    slashCategories.forEach((category) => {
      const slashPath = `${slashFolder}/${category}`;
      const slashFiles = fs
        .readdirSync(slashPath)
        .filter((file) => file.endsWith('js'));
      slashFiles.forEach((file) => {
        const loadSuccess = this.loadSlash(slashPath, file);
        loadSuccess ? (successCount += 1) : (failCount += 1);
        slashTable.push([category, file, loadSuccess ? '✔️' : '❌']);
      });
    });
    console.log(slashTable.toString());

    // Load all events
    const eventTable = new Table({ head: ['Name', 'Success'] });
    const eventFiles = fs
      .readdirSync(eventFolder)
      .filter((file) => file.endsWith('js'));
    eventFiles.forEach((file) => {
      const loadSuccess = this.loadEvent(`${eventFolder}/${file}`);
      loadSuccess ? (successCount += 1) : (failCount += 1);
      eventTable.push([file, loadSuccess ? '✔️' : '❌']);
    });
    console.log(eventTable.toString());

    return { successCount, failCount };
  }

  loadCommand(commandPath, commandName) {
    try {
      const command = require(`${commandPath}/${commandName}`);
      if (!command?.name) return;

      if ('init' in command) command.init(this);

      command.dirname = commandPath;
      this.commands.set(command.name, command);
      return true;
    } catch (error) {
      console.error(error);
    }
  }

  async unloadCommand(commandPath, commandName) {
    delete require.cache[require.resolve(`${commandPath}/${commandName}.js`)];
    this.commands.delete(commandName);
  }

  loadEvent(eventFile) {
    try {
      const event = require(eventFile)(this);
      return true;
    } catch (error) {
      console.error(error);
    }
  }

  loadSlash(slashPath, slashName) {
    try {
      const slash = require(`${slashPath}/${slashName}`);
      if (!slash.name) return;

      slash.dirname = slashPath;
      this.slashCommands.set(slash.name, slash);

      if (this.config.bot.testing)
        this.guilds.cache
          .get(this.config.bot.testGuild)
          ?.commands.create(slash);
      else this.application.commands.create(slash);
      return true;
    } catch (error) {
      console.error(error);
    }
  }

  async unloadSlash(slashPath, slashName) {
    delete require.cache[require.resolve(`${slashPath}/${slashName}.js`)];
    this.slashCommands.delete(slashName);

    if (!this.config.bot.testing) {
      const appCommand = this.application.commands;
      await appCommand.delete(
        appCommand.cache.find((c) => c.name === slashName)
      );
    }

    const guildCommand = this.guilds.cache.get(
      this.config.bot.testGuild
    )?.commands;
    await guildCommand.delete(
      guildCommand.cache.find((c) => c.name === slashName)
    );
  }
}

module.exports = { ItkBot };
