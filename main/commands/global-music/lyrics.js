const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("lyrics")
        .setDescription("shows lyrics of the current song"),

    async execute(interaction ) {
        try {
            const queue = interaction.client.player.getQueue(interaction.guildId);

            if (!queue || !queue.playing) {
                return interaction.reply("There are no songs in the queue");
            };

            const url = 
            fetch()

            const currentSong = queue.current;

            await interaction.reply({
                embeds: [
                    new MessageEmbed()
                        .setDescription(`${lyrics}`)
                        .setThumbnail(currentSong.setThumbnail)
                ]
            });
        } catch(error) { 
            console.log(error);
            return interaction.reply({ content: "There was an error while executing this command!", ephemeral: true });
        };
    }
};