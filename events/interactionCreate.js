module.exports = (client) => {
  client.on('interactionCreate', async (interaction) => {
    if (interaction.isCommand()) {
      const cmd = client.slashCommands.get(interaction.commandName);
      if (!cmd) {
        await interaction.reply({
          content: `Some errors occurred while executing the command ${interaction.commandName}`,
          ephemeral: true,
        });
      }
      try {
        cmd.run({ client: client, interaction: interaction });
      } catch (error) {
        console.error(error);
      }
    } else if (interaction.isContextMenu()) {
    }
  });
};
