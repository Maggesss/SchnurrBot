const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("ban")
		.setDescription("ban a member of your choice.")
		.addMentionableOption(option => 
            option.setName("member")
                .setDescription("member to ban"))
        .addIntegerOption(option =>
            option.setName("days")
                .setDescription("days of messages to be deleted"))
        .addStringOption(option =>
            option.setName("reason")
                .setDescription("Banreason")),

	async execute(interaction) {
		const member = interaction.options.getMentionable("member");

		if (member <= 1 || member > 100) {
			return interaction.reply({ content: "You need to input a number between 1 and 99.", ephemeral: true });
		}
		await interaction.channel.bulkDelete(member, true).catch(error => {
			console.error(error);
			interaction.reply({ content: "There was an error trying to ban messages in this channel!", ephemeral: true });
		});

		return interaction.reply({ content: `Successfully banned \`${member}\` from this server.`, ephemeral: true });
	},
};