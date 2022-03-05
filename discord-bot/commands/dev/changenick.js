const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("changenick")
		.setDescription("Changes the nickname of the bot.")
		.addStringOption(option => option
            .setName("nick")
            .setDescription("The new nickname.")
            .setRequired(true)),

	async execute(interaction) {
        try {
            if (interaction.user.id == "444460699025014784") {
                const newName = interaction.options.getString("nick");
                await interaction.client.user.setUsername(newName)
                console.log(`Changed name to: "${newName}"`)
                return interaction.reply({ content: `Changed name to: "${newName}"`, ephemeral: true })
            } else { return interaction.reply({ content: `You don't have permissions to do that!`, ephemeral: true }) };
        } catch (error) {
            console.error(error);
            return interaction.reply({ content: "There was an error while executing this command!", ephemeral: true });
        };
	}
};