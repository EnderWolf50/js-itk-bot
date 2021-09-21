module.exports = (client) => {
  client.on('messageCreate', async (msg) => {
    if (msg.author.bot || !msg.content.startsWith(client.config.prefix)) return;

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

    await cmd.execute(client, msg, args);
  });
};
