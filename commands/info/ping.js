module.exports = {
  name: 'ping',
  description: "Get the bot's ping.",
  run: async ({ client, message }) => {
    message.reply({
      content: `The bot's ping is \`${Math.round(client.ws.ping)} ms\``,
    })
  },
}
