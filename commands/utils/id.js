module.exports = {
  name: 'id',
  description: 'Get the id of user / emoji / channel',
  run: async ({ message, args }) => {
    const match = /<(?:a?:.*:|@!?&?|#)(\d+)>/.exec(args[0]);
    if (!match) return message.reply(`Unknown input ${args[0]}`);

    message.reply(`The id of ${args[0]} is \`${match[1]}\``);
  },
};
