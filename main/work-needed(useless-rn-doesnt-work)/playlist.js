const { SlashCommandBuilder } = require("@discordjs/builders");
const fs = require("fs");
const path = require("path");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("playlist")
		.setDescription("Edits or shows your playlist(s).")
        .addSubcommand(subcommand => subcommand
            .setName("addsong")
            .setDescription("Adds a song to your playlist.")
            .addStringOption(option => option
                .setName("url")
                .setDescription("The YT-URL of your song.")
                .setRequired(true))
            .addNumberOption(option => option
                .setName("plnum")
                .setDescription("Number of Playlist to add the song to.")
                .setRequired(true)))
        .addSubcommand(subcommand => subcommand
            .setName("addplaylist")
            .setDescription("Adds a playlist to your bot-profile.")
            .addStringOption(option => option
                .setName("name")
                .setDescription("Name your playlist.")
                .setRequired(true)))
        .addSubcommand(subcommand => subcommand 
            .setName("remove")
            .setDescription("Removes a song from your playlist. (Use Number in Playlist!)")
            .addIntegerOption(option => option
                .setName("target")
                .setDescription("The song to remove")
                .setRequired(true)))
        .addSubcommand(subcommand => subcommand
            .setName("show")
            .setDescription("Shows a playlist of an member.")
            .addUserOption(option => option
                .setName("member")
                .setDescription("The user to get the playlist from.")
                .setRequired(true))
            .addIntegerOption(option => option
                .setName("playlistnum")
                .setDescription("The playlist to show.")
                .setRequired(true)))
        .addSubcommand(subcommand => subcommand 
            .setName("delete")
            .setDescription("Removes whole playlist. (Use Playlist NR!)")
            .addIntegerOption(option => option
                .setName("playlistnumber")
                .setDescription("The playlist to delete")
                .setRequired(true)))
        .addSubcommand(subcommand => subcommand
            .setName("showall")
            .setDescription("Shows all playlists of a member.")
            .addUserOption(option => option
                .setName("user")
                .setDescription("The choosen member.")
                .setRequired(true))),
   
    async execute(interaction) {
        try {
            if (!fs.existsSync(`./data/playlists/${interaction.user.id}`)) {
                fs.mkdir(`./data/playlists/${interaction.user.id}`);
            }
            if (interaction.options.getSubcommand() === "addsong") {
                const addUrl = interaction.options.getString("url");
                const playlistNum = interaction.option.getNumber("plnum");
            } else if (interaction.options.getSubcommand() === "addplaylist") {
                const name = interaction.options.getString("name");
            } else if (interaction.options.getSubcommand() === "remove") {
                const songNum = interaction.options.getNumber("target");
            } else if (interaction.options.getSubcommand() === "show") {
                const showMember = interaction.options.getMember("member");
                const playlistNum = interaction.options.getNumber("playlistnum");
            } else if (interaction.options.getSubcommand() === "delete") {
                const playlistNum = interaction.options.getNumber("playlistnumber");
            } else if (interaction.options.getSubcommand() === "showall") {
                const showallUser = interactions.options.getMember("user");
            };
            return interaction.reply({ content: `This command is currently work-in-progress, stay tuned!.`, ephemeral: true });
        } catch (error) {
            console.error(error);
            return interaction.reply({ content: "There was an error while executing this command!", ephemeral: true });
        }
    },
};