/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */

const Table = require('cli-table');
const chalk = require('chalk');
const fs = require('fs');
const { Client, Collection } = require('discord.js');
const { GatewayServer, SlashCreator } = require('slash-create');

class ItkBot extends Client {
  constructor(options) {
    super(options);

    this.config = options.config;
    this.testing = this.config.bot.testing;
    this.owner = this.config.bot.owner;

    this.commands = new Collection();
    this.slashCommands = new Collection();

    this.creator = new SlashCreator({
      applicationID: this.config.bot.applicationID,
      publicKey: this.config.bot.publicKey,
      token: this.config.bot.token,
    });
  }

  async init({ commandFolder, slashFolder, eventFolder }) {
    let failCount = 0;
    let successCount = 0;

    // Load all slash commands
    this.creator
      .withServer(new GatewayServer((handler) => this.ws.on('INTERACTION_CREATE', handler)))
      .registerCommandsIn({
        dirname: slashFolder,
        filter: /^[^_].*\.js$/,
      })
      .syncCommands();

    // Load all commands
    const commandTable = new Table({ head: ['Category', 'Name', 'Status'] });
    const commandCategories = fs.readdirSync(commandFolder);
    commandCategories.forEach((category) => {
      const commandPath = `${commandFolder}/${category}`;
      const commandFiles = fs
        .readdirSync(commandPath)
        .filter((fn) => !fn.startsWith('_') && fn.endsWith('js'));
      commandFiles.forEach((file) => {
        const loadSuccess = this.loadCommand(commandPath, file);
        if (loadSuccess) successCount += 1;
        else failCount += 1;
        commandTable.push([
          category,
          file,
          loadSuccess ? chalk.green('SUCCESS') : chalk.red('FAILED'),
        ]);
      });
    });
    console.log(commandTable.toString());

    // Load all events
    const eventTable = new Table({ head: ['Category', 'Name', 'Status'] });
    const eventCategories = fs.readdirSync(eventFolder);
    eventCategories.forEach((category) => {
      const eventPath = `${eventFolder}/${category}`;
      const eventFiles = fs
        .readdirSync(eventPath)
        .filter((fn) => !fn.startsWith('_') && fn.endsWith('js'));
      eventFiles.forEach((file) => {
        const loadSuccess = this.loadEvent(eventPath, file);
        if (loadSuccess) successCount += 1;
        else failCount += 1;
        eventTable.push([
          category,
          file,
          loadSuccess ? chalk.green('SUCCESS') : chalk.red('FAILED'),
        ]);
      });
    });
    console.log(eventTable.toString());

    return { successCount, failCount };
  }

  loadCommand(commandPath, commandName) {
    try {
      const command = require(`${commandPath}/${commandName}`);
      if (!command.name) return false;
      if (command.init) command.init(this);

      command.dirname = commandPath;
      this.commands.set(command.name, command);

      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  async unloadCommand(commandPath, commandName) {
    delete require.cache[require.resolve(`${commandPath}/${commandName}.js`)];
    this.commands.delete(commandName);
  }

  loadEvent(eventPath, eventName) {
    try {
      require(`${eventPath}/${eventName}`)(this);

      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  async unloadEvent(eventPath, eventName) {
    delete require.cache[require.resolve(`${eventPath}/${eventName}.js`)];
    this.commands.delete(eventName);
  }

  loadSlash(slashPath, slashName) {
    try {
      const slash = require(`${slashPath}/${slashName}`);
      if (!slash.name) return false;

      slash.dirname = slashPath;
      this.slashCommands.set(slash.name, slash);

      if (this.testing || slash.guilds) {
        slash.guilds = [...(slash.guilds || []), this.config.bot.testGuild];
      }

      if (slash.guilds) {
        slash.guilds.forEach((guild) => this.application.commands.create(slash, guild));
      } else this.application.commands.create(slash);

      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  async unloadSlash(slashPath, slashName) {
    delete require.cache[require.resolve(`${slashPath}/${slashName}.js`)];
    this.slashCommands.delete(slashName);

    if (!this.testing) {
      const appCommand = this.application.commands;
      await appCommand.delete(appCommand.cache.find((c) => c.name === slashName));
    }

    const guildCommand = this.guilds.cache.get(this.config.bot.testGuild)?.commands;
    await guildCommand.delete(guildCommand.cache.find((c) => c.name === slashName));
  }
}

module.exports = { ItkBot };
