const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("emojitolink")
		.setDescription("steal an not animated emoji from some other server")
		.addStringOption(option => option
            .setName("emoji")
            .setDescription("emoji of your choice")
            .setRequired(true))
		.addStringOption(option => option
			.setName("type")
			.setDescription("type of emoji")
            .addChoice("animated", "gif")
            .addChoice("not animated", "png")
			.setRequired(true)),
		
	async execute(interaction) {
		const emoji = interaction.options.getString("emoji");
        const type = interaction.options.getString("type");
		
		try { 
            return interaction.reply(`https://cdn.discordapp.com/emojis/${emoji.match(/\d+/)[0]}.${type}`);
        } catch (error) {
            console.error(error);
            return interaction.reply({ content: "There was an error while executing this command!", ephemeral: true });
        };
	},
};