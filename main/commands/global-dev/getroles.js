const { SlashCommandBuilder } = require("@discordjs/builders");
const functions = require("../../functions")

module.exports = {
	data: new SlashCommandBuilder()
		.setName("getroles")
		.setDescription("Get the roles of this server."),

	async execute(interaction) {
        try {
            if (functions.isHelper(interaction.user.id) == true) {
                roles = interaction.guild.roles.cache.map(role => `\n${role.id}: ${role.name}`)
                return interaction.reply({ content: `${roles}`, ephemeral: true })
            } else { return interaction.reply({ content: `You don't have permissions to do that!`, ephemeral: true }) };
        } catch (error) {
            console.error(error);
            return interaction.reply({ content: "There was an error while executing this command!", ephemeral: true });
        };
	}
};