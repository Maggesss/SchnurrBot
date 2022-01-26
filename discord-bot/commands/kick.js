const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("kick")
		.setDescription("Select a member and kick them.")
		.addUserOption(option => option
            .setName("target")
            .setDescription("The member to kick")
            .setRequired(true)),
	async execute(interaction) {
        try {
            const user = interaction.options.getMember("target");
            user.kick()
            console.log(`${interaction.client} kicked: ${user.username} on server: ${interaction.guild.name}`)
		    return interaction.reply({ content: `You kicked: ${user.username}`, ephemeral: true });
        } catch (error) {
            console.error(error);
            return interaction.reply({ content: "There was an error while executing this command!", ephemeral: true });
        }
	},
};