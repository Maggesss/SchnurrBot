const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
	data: new SlashCommandBuilder()
        .setName("resume")
        .setDescription("Resumes the current song"),

	async execute(interaction ) {
		const queue = interaction.client.player.getQueue(interaction.guildId);

		if (!queue) {
            await interaction.reply("No songs in the queue");
            return;
        };

		queue.setPaused(false);

        await interaction.reply("Player has been resumed.");
	},
};