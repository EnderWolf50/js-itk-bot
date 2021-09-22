module.exports = {
  name: 'choose',
  aliases: ['ch'],
  description: 'Randomly pick a choice from the input items.',
  args: true,
  run: async ({ msg, args }) => {
    const repliedMsg = await msg.reply({
      content: args[Math.floor(Math.random() * args.length)],
    });
    setTimeout(() => {
      msg.delete().catch(console.error);
      repliedMsg.delete().catch(console.error);
    }, 10000);
  },
};
