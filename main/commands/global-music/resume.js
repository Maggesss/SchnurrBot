const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
	data: new SlashCommandBuilder()
        .setName("resume")
        .setDescription("Resumes the current song"),

	async execute(interaction ) {
        try {
            const queue = interaction.client.player.getQueue(interaction.guildId);

            if (!queue) {
                await interaction.reply("No songs in the queue");
                return;
            };

            queue.setPaused(false);

            return interaction.reply("Player has been resumed.");
        } catch(error) { 
            console.log(error);
            return interaction.reply({ content: "There was an error while executing this command!", ephemeral: true });
        };
	},
};