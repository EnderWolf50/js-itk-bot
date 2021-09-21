module.exports = (client) => {
  client.on('messageCreate', async (msg) => {
    if (!msg.content.startsWith(client.config.prefix) || msg.author.bot) return;

    const [commandName, ...args] = msg.content
      .slice(client.config.prefix.length)
      .trim()
      .split(/ +/g);

    const cmd =
      client.commands.get(commandName.toLowerCase()) ||
      client.commands.find((c) =>
        c.aliases?.includes(commandName.toLowerCase())
      );
    if (!cmd) return;

    let replyContent;
    if (cmd.guildOnly && !msg.guild)
      replyContent = `This command can only be used in the guild`;
    else if (cmd.ownerOnly && msg.author.id != client.config.ownerId)
      replyContent = `This command can only be used by the owner`;

    if (replyContent) {
      return msg.reply({ content: replyContent }).then((repliedMsg) => {
        setTimeout(() => {
          msg.delete().catch(console.log);
          repliedMsg.delete().catch(console.log);
        }, 5000);
      });
    }

    await cmd.execute(client, msg, args);
  });
};
