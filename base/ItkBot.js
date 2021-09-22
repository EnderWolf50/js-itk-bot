const fs = require('fs');
const { Collection } = require('discord.js');
const { Client } = require('discord.js');
const Table = require('cli-table');
const { dirname } = require('path');

class ItkBot extends Client {
  constructor(options) {
    super(options);

    this.config = require('../config.json');
    this.commands = new Collection();
    this.slashCommands = new Collection();
  }

  loadAllCommands(commandFolder) {
    const table = new Table({ head: ['Category', 'Name', 'Success'] });

    const categories = fs.readdirSync(commandFolder);
    categories.forEach((category) => {
      const commandFiles = fs
        .readdirSync(`${commandFolder}/${category}/`)
        .filter((f) => f.endsWith('js'));
      commandFiles.forEach((file) => {
        const success = this.loadCommand(`${commandFolder}/${category}`, file);
        table.push([category, file, success ? '✔️' : '❌']);
      });
    });
    console.log(table.toString());
  }

  loadCommand(commandPath, commandName) {
    try {
      const command = require(`${commandPath}/${commandName}`);
      if (!command?.name) return;

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

  loadAllEvents(eventFolder) {
    const table = new Table({ head: ['Name', 'Success'] });

    const eventFiles = fs
      .readdirSync(eventFolder)
      .filter((f) => f.endsWith('js'));
    eventFiles.forEach((file) => {
      const success = this.loadEvent(`${eventFolder}/${file}`);
      table.push([file, success ? '✔️' : '❌']);
    });
    console.log(table.toString());
  }

  loadEvent(eventFile) {
    try {
      const event = require(eventFile)(this);
      return true;
    } catch (error) {
      console.error(error);
    }
  }

  loadAllSlashes(slashFolder) {
    const table = new Table({ head: ['Category', 'Name', 'Success'] });

    const categories = fs.readdirSync(slashFolder);
    categories.forEach((category) => {
      const commandFiles = fs
        .readdirSync(`${slashFolder}/${category}/`)
        .filter((f) => f.endsWith('js'));
      commandFiles.forEach((file) => {
        const success = this.loadSlash(`${slashFolder}/${category}`, file);
        table.push([category, file, success ? '✔️' : '❌']);
      });
    });
    console.log(table.toString());
  }

  loadSlash(slashPath, slashName) {
    try {
      const slash = require(`${slashPath}/${slashName}`);
      if (!slash.name) return;

      slash.dirname = slashPath;
      this.slashCommands.set(slash.name, slash);

      this.isReady()
        ? this.slashRegister(slash)
        : this.on('ready', () => this.slashRegister(slash));
      return true;
    } catch (error) {
      console.error(error);
    }
  }

  slashRegister(slashCommand) {
    try {
      if (!this.config.testing) this.application.commands.create(slashCommand);
      this.guilds.cache
        .get(this.config.testGuildId)
        ?.commands.create(slashCommand);
      return true;
    } catch (error) {
      console.error(error);
    }
  }

  async unloadSlash(slashPath, slashName) {
    delete require.cache[require.resolve(`${slashPath}/${slashName}.js`)];
    this.slashCommands.delete(slashName);

    if (!this.config.testing) {
      const appCommand = this.application.commands;
      await appCommand.delete(
        appCommand.cache.find((c) => c.name === slashName)
      );
    }

    const guildCommand = this.guilds.cache.get(
      this.config.testGuildId
    )?.commands;
    await guildCommand.delete(
      guildCommand.cache.find((c) => c.name === slashName)
    );
  }
}

module.exports = ItkBot;
