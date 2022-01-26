const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("kick")
		.setDescription("kick a member of your choice.")
		.addIntegerOption(option => option.setName("member").setDescription("member to kick")),
	async execute(interaction) {
		const member = interaction.options.getInteger("member");

		if (member <= 1 || member > 100) {
			return interaction.reply({ content: "You need to input a number between 1 and 99.", ephemeral: true });
		}
		await interaction.channel.bulkDelete(member, true).catch(error => {
			console.error(error);
			interaction.reply({ content: "There was an error trying to clear messages in this channel!", ephemeral: true });
		});

		return interaction.reply({ content: `Successfully kicked \`${member}\` from the server.`, ephemeral: true });
	},
};