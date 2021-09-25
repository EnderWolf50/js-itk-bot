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

      const subcommandGroup = interaction.options.getSubcommandGroup(false);
      const subcommand = interaction.options.getSubcommand(false);
      const options = interaction.options._hoistedOptions;

      try {
        cmd.run({ client, interaction, subcommandGroup, subcommand, options });
      } catch (error) {
        console.error(error);
      }
    } else if (interaction.isContextMenu()) {
    }
  });
};
