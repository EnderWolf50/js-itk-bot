module.exports = {
  name: 'ping',
  description: 'Ping command w/ slash.',
  run: async (client, interaction) => {
    await interaction.reply({ content: 'pong' });
  },
};
