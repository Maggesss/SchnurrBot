const { SlashCommandBuilder } = require("@discordjs/builders");
const functions = require("../../functions")

module.exports = {
	data: new SlashCommandBuilder()
		.setName("lin")
		.setDescription("Boobs."),

	async execute(interaction) {
        try {
            return interaction.reply({ content: `https://t2.gstatic.com/images?q=tbn:ANd9GcSEICWlHnuN7w4NDW5GiaIOj6ltmus55BxIjJbHV986tXZq8phevg0Ueup-NrdMH2lrRI8`, ephemeral: false });
        } catch (error) {
            console.error(error);
            return interaction.reply({ content: "There was an error while executing this command!", ephemeral: true });
        };
	}
};