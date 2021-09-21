module.exports = {
  name: 'ping',
  dirname: __dirname,
  description: 'Ping command w/ slash.',
  execute: async (client, interaction) => {
    await interaction.reply({ content: 'pong' });
  },
};
