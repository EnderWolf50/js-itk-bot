module.exports = {
  name: 'reload',
  description: 'Nothing but a command that can reload the specified command.',
  args: true,
  ownerOnly: true,
  run: async (client, msg, args) => {
    const [type, name] = args;

    let replyContent;
    switch (type) {
      case 'c' || 'cmd' || 'command':
        const command = client.commands.get(name);
        if (!command) {
          replyContent = `Command ${name} not found`;
          break;
        }

        await client.unloadCommand(command.dirname, command.name);
        client.loadCommand(command.dirname, command.name);
        replyContent = `The command **${name}** has been reloaded`;
        break;
      case 's' || 'slash':
        const slash = client.slashCommands.get(name);
        if (!slash) {
          replyContent = `Slash command ${name} not found`;
          break;
        }

        await client.unloadSlash(slash.dirname, slash.name);
        client.loadSlash(slash.dirname, slash.name);
        replyContent = `The slash command **${name}** has been reloaded`;
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
