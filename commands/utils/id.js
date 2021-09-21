module.exports = {
  name: 'id',
  dirname: __dirname,
  description: 'Get the id of user / emoji / channel / guild',
  execute: async (client, msg, args) => {
    const id = /<(?:a?:.*:|@!?&?|#)(\d+)>/.exec(args[0]);
    msg.reply(`The id of ${args[0]} is \`${id[1]}\``);
  },
};
