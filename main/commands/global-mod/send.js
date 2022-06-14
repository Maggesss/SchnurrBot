const { SlashCommandBuilder } = require("@discordjs/builders");
const functions = require("../../functions")

module.exports = {
	data: new SlashCommandBuilder()
		.setName("send")
		.setDescription("Select a message or link to send to this channel.")
        .addStringOption(option => option
            .setName("content")
            .setDescription("The content to send")
            .setRequired(true)),
            
    async execute(interaction) {
        try {
            if (functions.isHelper(interaction.user.id) == true) {
                const content = interaction.options.getString("content")
                return interaction.reply({ content: content, ephemeral: false });
            } else { return interaction.reply("You don't have permissions to do that!") }
        } catch (error) {
            console.error(error);
            return interaction.reply({ content: "There was an error while executing this command!", ephemeral: true });
        };
	},
};