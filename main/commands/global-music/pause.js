const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
	data: new SlashCommandBuilder()
        .setName("pause")
        .setDescription("Pauses the current song"),

	async execute(interaction) {
		try {
			const queue = interaction.client.player.getQueue(interaction.guildId);

			if (!queue) {
				await interaction.reply("There are no songs in the queue");
				return;
			};

			queue.setPaused(true);

			return interaction.reply("Player has been paused.");
		} catch(error) { 
            console.log(error);
            return interaction.reply({ content: "There was an error while executing this command!", ephemeral: true });
        };
	},
};