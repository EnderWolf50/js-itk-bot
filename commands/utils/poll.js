const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'poll',
  aliases: ['vote'],
  description: 'Hold a poll.',
  args: true,
  init: (client) => {
    this.pollReactionEmojis = [
      ...client.config.styles.reactions.numbers,
      ...client.config.styles.reactions.letters,
    ];
  },
  run: async ({ msg, args }) => {
    const [title, ...choices] = args;

    if (!(1 <= choices.length && choices.length <= 20)) {
      const repliedMsg = await msg.reply({
        content: 'You must pass in 1 to 20 choices to make this command work',
      });
      setTimeout(() => {
        msg.delete().catch(console.error);
        repliedMsg.delete().catch(console.error);
      }, 5000);
      return;
    }

    let embedDesc = '';
    choices.forEach((choice, index) => {
      embedDesc += `${this.pollReactionEmojis[index]} ${choice}\n`;
    });
    const repliedMsg = await msg.reply({
      content: title,
      embeds: [new MessageEmbed({ description: embedDesc })],
    });
    for (let i = 0; i < choices.length; i++) {
      repliedMsg.react(this.pollReactionEmojis[i]);
    }
  },
};
