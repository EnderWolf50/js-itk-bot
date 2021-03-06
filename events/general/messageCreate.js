module.exports = (client) => {
  client.on('messageCreate', async (message) => {
    if (!message.content.startsWith(client.config.bot.prefix) || message.author.bot) return;

    const [commandName, ...args] = message.content
      .slice(client.config.bot.prefix.length)
      .trim()
      .split(/ +/g);

    const cmd = client.commands.get(commandName.toLowerCase())
      || client.commands.find((c) => c.aliases?.includes(commandName.toLowerCase()));
    if (!cmd) return;

    let replyContent;
    if (cmd.args && !args.length) replyContent = 'This command requires additional arguments to run';
    else if (cmd.guildOnly && !message.guild) replyContent = 'This command can only be used in the guild';
    else if (cmd.ownerOnly && message.author.id !== client.config.bot.owner) replyContent = 'This command can only be used by the owner';

    if (replyContent) {
      message.reply({ content: replyContent }).then((repliedMsg) => {
        setTimeout(() => {
          message.delete().catch(console.log);
          repliedMsg.delete().catch(console.log);
        }, 5000);
      });
      return;
    }

    await cmd.run({ client, message, args });
  });
};
