const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");

module.exports = {
	data: new SlashCommandBuilder()
        .setName("skip")
        .setDescription("Skips the current song"),

	async execute(interaction) {
        try {
            const queue = interaction.client.player.getQueue(interaction.guildId);

            if (!queue) {
                await interaction.reply("There are no songs in the queue");
                return;
            };

            const currentSong = queue.current;

            queue.skip();

            return interaction.reply({
                embeds: [
                    new MessageEmbed()
                        .setDescription(`${currentSong.title} has been skipped!`)
                        .setThumbnail(currentSong.thumbnail)
                ]
            });
        } catch(error) { 
            console.log(error);
            return interaction.reply({ content: "There was an error while executing this command!", ephemeral: true });
        };
	},
};