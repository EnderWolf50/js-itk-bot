module.exports = {
  name: 'id',
  description: 'Get the id of user / emoji / channel',
  run: async ({ msg, args }) => {
    const match = /<(?:a?:.*:|@!?&?|#)(\d+)>/.exec(args[0]);
    if (!match) return msg.reply(`Unknown input ${args[0]}`);

    msg.reply(`The id of ${args[0]} is \`${match[1]}\``);
  },
};
