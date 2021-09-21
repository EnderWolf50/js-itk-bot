const reloadFile = (collection, command) => {
  const path = `${command.dirname}/${command.name}.js`;
  delete require.cache[
    require.resolve(`${command.dirname}/${command.name}.js`)
  ];
  collection.delete(command.name);

  const file = require(path);
  collection.set(file.name, file);
  return file;
};

const reloadCommand = (client, name) => {
  if (!client.commands.has(name))
    return `The command **${name}** does not exist`;

  const command = client.commands.get(name);
  const file = reloadFile(client.commands, command);

  return `The command **${name}** has been reloaded`;
};

const reloadSlashCommand = async (client, name) => {
  if (!client.slashCommands.has(name))
    return `The command **${name}** does not exist`;

  const command = client.slashCommands.get(name);
  const file = reloadFile(client.slashCommands, command);

  if (!client.config.testing) {
    const oldCommand = client.application.commands.cache.find(
      (c) => c.name === name
    );
    await client.application.commands.edit(oldCommand, file);

    return `The command **${name}** has been reloaded`;
  }

  const guild = client.guilds.cache.get(client.config.testGuildId);
  if (!guild)
    return `The guild of id ${client.config.testGuildId} does not exist`;

  const oldCommand = guild.commands.cache.find((c) => c.name === name);
  await guild.commands.edit(oldCommand, file);

  return `The command **${name}** has been reloaded`;
};

module.exports = {
  name: 'reload',
  dirname: __dirname,
  description:
    'Nothing but a command that can reload the specified command or event.',
  ownerOnly: true,
  execute: async (client, msg, args) => {
    const [type, name] = args;

    let replyContent;
    switch (type) {
      case 'c' || 'cmd' || 'command':
        replyContent = reloadCommand(client, name);
        break;
      case 's' || 'slash':
        replyContent = await reloadSlashCommand(client, name);
        break;
      default:
        replyContent = `Unknown command type ${type}`;
    }

    const repliedMsg = await msg.reply({ content: replyContent });

    setTimeout(() => {
      msg.delete().catch(console.log);
      repliedMsg.delete().catch(console.log);
    }, 5000);
  },
};
