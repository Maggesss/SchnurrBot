const { SlashCommandBuilder } = require("@discordjs/builders");

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}

module.exports = {
	data: new SlashCommandBuilder()
		.setName("simpcheck")
		.setDescription("Check if a user is a simp!")
        .addUserOption(option => option
            .setName("user")
            .setDescription("The user to check.")
            .setRequired(true)),
            
	async execute(interaction) {
        try {
            const user = interaction.options.getUser("user");
            if (getRndInteger(1, 2) == 1) {
                return interaction.reply(`${user.username} **is** a simp!`)
            } else {return interaction.reply(`${user.username} **is not** a simp!`)}
               
        } catch (error) {
            console.error(error);
            return interaction.reply({ content: "There was an error while executing this command!", ephemeral: true });
        }
    },
};