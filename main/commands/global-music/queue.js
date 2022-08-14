const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("queue")
        .setDescription("shows first 10 songs in the queue"),

    async execute(interaction ) {
        try {
            const queue = interaction.client.player.getQueue(interaction.guildId);

            if (!queue || !queue.playing) {
                return interaction.reply("There are no songs in the queue");
            };

            const queueString = queue.tracks.slice(0, 10).map((song, i) => {
                return `${i}) \`[${song.duration}]\` ${song.title}`
            }).join("\n");

            const currentSong = queue.current;

            return interaction.reply({
                embeds: [
                    new MessageEmbed()
                        .setDescription(`**Currently Playing**\n` + 
                            (currentSong ? `\`[${currentSong.duration}]\` ${currentSong.title}` : "None") +
                            `\n\n**Queue**\n${queueString}`
                        )
                        .setThumbnail(currentSong.setThumbnail)
                ]
            });
        } catch(error) { 
            console.log(error);
            return interaction.reply({ content: "There was an error while executing this command!", ephemeral: true });
        };
    }
};