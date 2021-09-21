module.exports = {
  name: 'ping',
  dirname: __dirname,
  description: "Get the bot's ping.",
  execute: async (client, msg, args) => {
    msg.reply({
      content: `The bot's ping is \`${Math.round(client.ws.ping)} ms\``,
    });
  },
};
