const { SlashCommandBuilder } = require("@discordjs/builders");
const functions = require("../../functions")

module.exports = {
	data: new SlashCommandBuilder()
		.setName("getserverlist")
		.setDescription("Displays all servers and their IDs."),

	async execute(interaction) {
        try {
            if (functions.isHelper(interaction.user.id) == true) {
                const guilds = interaction.client.guilds.cache.map(guild => `\n${guild.id}: ${guild.name}`);
                return interaction.reply({ content: `${guilds}`, ephemeral: true })
            } else { return interaction.reply({ content: `You don't have permissions to do that!`, ephemeral: true }) };
        } catch (error) {
            console.error(error);
            return interaction.reply({ content: "There was an error while executing this command!", ephemeral: true });
        };
	}
};