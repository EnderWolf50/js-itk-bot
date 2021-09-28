module.exports = {
  name: 'choose',
  aliases: ['ch'],
  description: 'Randomly pick a choice from the input items.',
  args: true,
  run: async ({ message, args }) => {
    const repliedMsg = await message.reply({
      content: args[Math.floor(Math.random() * args.length)],
    })
    setTimeout(() => {
      message.delete().catch(console.error)
      repliedMsg.delete().catch(console.error)
    }, 10000)
  },
}
