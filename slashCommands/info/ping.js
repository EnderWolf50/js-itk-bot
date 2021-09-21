module.exports = {
  name: 'ping',
  category: 'info',
  description: 'Ping command w/ slash.',
  execute: async (client, interaction) => {
    await interaction.reply({ content: 'pong' });
  },
};
