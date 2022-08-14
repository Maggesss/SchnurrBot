const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
	data: new SlashCommandBuilder()
        .setName("exit")
        .setDescription("Kick the bot from the voice channel."),

	async execute(interaction) {
		try {
			const queue = interaction.client.player.getQueue(interaction.guildId);

			if (!queue) {
				await interaction.reply("There are no songs in the queue");
				return;
			};

			queue.destroy();

			return interaction.reply("Left.");
		} catch(error) { 
            console.log(error);
            return interaction.reply({ content: "There was an error while executing this command!", ephemeral: true });
        };
	},
};