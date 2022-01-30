const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("shutdown")
		.setDescription("Shuts the Bot down."),
	async execute(interaction) {
        try {
            if (interaction.user.id == 444460699025014784) {
                client.destroy()
            }
            else {return interaction.reply({ content: `You don't have permissions to do that!`, ephemeral: true})}
        } catch (error) {
            console.error(error);
            return interaction.reply({ content: "There was an error while executing this command!", ephemeral: true });
        }
	},
};