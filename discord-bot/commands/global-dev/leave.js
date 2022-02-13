const { SlashCommandBuilder } = require("@discordjs/builders");

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
            if (interaction.user.id == 444460699025014784) {
                const g = interaction.options.getString("target");
                const gl = interaction.client.guilds.cache.get(g)
                gl.leave()
                console.log(`Bot left : ${gl.name}`)
                return interaction.reply({ content: `Bot left : ${gl.name}`, ephemeral: true })
            }
            else {return interaction.reply({ content: `You don't have permissions to do that!`, ephemeral: true})}
        } catch (error) {
            console.error(error);
            return interaction.reply({ content: "There was an error while executing this command!", ephemeral: true });
        }
	},
};