module.exports = {
  name: 'ping',
  description: "Get the bot's ping.",
  run: async ({ client, msg }) => {
    msg.reply({
      content: `The bot's ping is \`${Math.round(client.ws.ping)} ms\``,
    });
  },
};
