const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("playlist")
		.setDescription("Edits or shows your playlist(s).")
        .addSubcommand(subcommand => subcommand
            .setName("add")
            .setDescription("Adds a song to your playlist.")
            .addStringOption(option => option
                .setName("url")
                .setDescription("The YT-URL of your song.")
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
            .setDescription("Shows a playlist of an user.")
            .addUserOption(option => option
                .setName("target")
                .setDescription("The user to get the playlist from.")
                .setRequired(true))
            .addIntegerOption(option => option
                .setName("number")
                .setDescription("The playlist to show.")
                .setRequired(true))),
                
    async execute(interaction) {
        try {
            return interaction.reply({ content: `This command is currently work-in-progress, stay tuned!.`, ephemeral: true })
        } catch (error) {
            console.error(error);
            return interaction.reply({ content: "There was an error while executing this command!", ephemeral: true });
        }
    },
};