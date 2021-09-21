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

    if (cmd.guildOnly && !msg.guild) return;
    if (cmd.ownerOnly && !msg.author.id != client.config.ownerId) return;

    await cmd.execute(client, msg, args);
  });
};
