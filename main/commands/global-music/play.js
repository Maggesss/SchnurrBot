const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");
const { QueryType } = require("discord-player");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("play")
		.setDescription("play a song from YouTube.")
		.addSubcommand(subcommand => subcommand
            .setName("search")
            .setDescription("Searches for a song and plays it")
            .addStringOption(option =>option
                .setName("searchterms")
                .setDescription("search keywords")
                .setRequired(true)))
        .addSubcommand(subcommand => subcommand
            .setName("playlist")
            .setDescription("Plays a playlist from YT")
            .addStringOption(option => option
                .setName("url")
                .setDescription("the playlist's url")
                .setRequired(true)))
		.addSubcommand(subcommand => subcommand
				.setName("song")
				.setDescription("Plays a single song from YT")
				.addStringOption(option => option
                    .setName("url")
                    .setDescription("the song's url")
                    .setRequired(true))),

	async execute(interaction) {
        try {
            if (!interaction.member.voice.channel) { 
                return interaction.reply("You need to be in a Voice Channel to play a song.") 
            };

            const queue = await interaction.client.player.createQueue(interaction.guild);

            if (!queue.connection) { 
                await queue.connect(interaction.member.voice.channel);
            };

            let embed = new MessageEmbed();

            if (interaction.options.getSubcommand() === "song") {
                let url = interaction.options.getString("url");
                
                const result = await interaction.client.player.search(url, {
                    requestedBy: interaction.user,
                    searchEngine: QueryType.YOUTUBE_VIDEO
                });

                if (result.tracks.length === 0) {
                    return interaction.reply("No results");
                };

                const song = result.tracks[0];
                await queue.addTrack(song);
                embed
                    .setDescription(`**[${song.title}](${song.url})** has been added to the Queue`)
                    .setThumbnail(song.thumbnail)
                    .setFooter({ text: `Duration: ${song.duration}`});
            } else if (interaction.options.getSubcommand() === "playlist") {

                let url = interaction.options.getString("url");
                const result = await interaction.client.player.search(url, {
                    requestedBy: interaction.user,
                    searchEngine: QueryType.YOUTUBE_PLAYLIST
                })

                if (result.tracks.length === 0) {
                    return interaction.reply(`No playlists found with ${url}`);
                };
                
                const playlist = result.playlist;
                await queue.addTracks(result.tracks);
                embed
                    .setDescription(`**${result.tracks.length} songs from [${playlist.title}](${playlist.url})** have been added to the Queue`)

            } else if (interaction.options.getSubcommand() === "search") {

                let url = interaction.options.getString("searchterms")
                const result = await interaction.client.player.search(url, {
                    requestedBy: interaction.user,
                    searchEngine: QueryType.AUTO
                });

                if (result.tracks.length === 0) {
                    return interaction.editReply("No results");
                };
                
                const song = result.tracks[0];
                await queue.addTrack(song);
                embed
                    .setDescription(`**[${song.title}](${song.url})** has been added to the Queue`)
                    .setThumbnail(song.thumbnail)
                    .setFooter({ text: `Duration: ${song.duration}`});
            };

            if (!queue.playing) await queue.play();
            
            return interaction.reply({
                embeds: [embed]
            });
        } catch(error) { 
            console.log(error);
            return interaction.reply({ content: "There was an error while executing this command!", ephemeral: true });
        };
	},
}