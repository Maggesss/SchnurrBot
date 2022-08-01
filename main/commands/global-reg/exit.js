const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
	data: new SlashCommandBuilder()
        .setName("exit")
        .setDescription("Kick the bot from the voice channel."),

	async execute(interaction) {
		const queue = interaction.client.player.getQueue(interaction.guildId);

		if (!queue) {
			await interaction.reply("There are no songs in the queue");
			return;
		};

		queue.destroy();

        await interaction.reply("Left.");
	},
};