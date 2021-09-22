const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'poll',
  aliases: ['vote'],
  description: 'Hold a poll.',
  args: true,
  run: async ({ msg, args }) => {
    const [title, ...choices] = args;

    const numberEmojis = [
      '1\u20E3',
      '2\u20E3',
      '3\u20E3',
      '4\u20E3',
      '5\u20E3',
      '6\u20E3',
      '7\u20E3',
      '8\u20E3',
      '9\u20E3',
    ];

    let desc = '';
    choices.forEach((choice, index) => {
      desc += `${numberEmojis[index]} ${choice}\n`;
    });
    const embed = new MessageEmbed({ description: desc });
    const repliedMsg = await msg.reply({ content: title, embeds: [embed] });
    for (let i = 0; i < choices.length; i++) {
      repliedMsg.react(numberEmojis[i]);
    }
  },
};
