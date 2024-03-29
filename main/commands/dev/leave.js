const { SlashCommandBuilder } = require("@discordjs/builders");
const functions = require("../../functions")

module.exports = {
	data: new SlashCommandBuilder()
		.setName("leave")
		.setDescription("Leaves a server.")
		.addStringOption(option => option
            .setName("target")
            .setDescription("The server to leave")
            .setRequired(true)),
            
	async execute(interaction) {
        try {
            if (functions.isHelper(interaction.user.id) == true) {
                const guildId = interaction.options.getString("target");
                const guild = interaction.client.guilds.cache.get(guildId);
                gl.leave();
                console.log(`Bot left: ${guild.name}`)
                return interaction.reply({ content: `Bot left: ${guild.name}`, ephemeral: true })
            } else { return interaction.reply({ content: `You don't have permissions to do that!`, ephemeral: true }) };
        } catch (error) {
            console.error(error);
            return interaction.reply({ content: "There was an error while executing this command!", ephemeral: true });
        };
	},
};