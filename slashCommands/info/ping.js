module.exports = {
  name: 'ping',
  description: 'Ping command w/ slash.',
  run: async ({ interaction }) => {
    await interaction.reply({ content: 'pong' });
  },
};
