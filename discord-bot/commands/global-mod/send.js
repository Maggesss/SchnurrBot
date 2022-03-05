const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("send")
		.setDescription("Select a member and ban them.")
        .addStringOption(option => option
            .setName("content")
            .setDescription("The content to send")
            .setRequired(true)),
            
    async execute(interaction) {
        try {
            if ((interaction.user.id == "444460699025014784")) {
                const content = interaction.options.getString("content")
                return interaction.reply({ content: content, ephemeral: false });
            } else { return interaction.reply("You don't have permissions to do that!") }
        } catch (error) {
            console.error(error);
            return interaction.reply({ content: "There was an error while executing this command!", ephemeral: true });
        };
	},
};