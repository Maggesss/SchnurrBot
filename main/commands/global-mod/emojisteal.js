const { SlashCommandBuilder } = require("@discordjs/builders");
const { Permissions } = require('discord.js');
const functions = require("../../functions")

module.exports = {
	data: new SlashCommandBuilder()
		.setName("emojisteal")
		.setDescription("steal an emoji from some other server")
		.addStringOption(option => option
            .setName("emoji")
            .setDescription("emoji of your choice")
            .setRequired(true)),
		
	async execute(interaction) {
		const emoji = interaction.options.getString("emoji");
		try {
            if (interaction.member.permissions.has(Permissions.FLAGS.MANAGE_EMOJIS_AND_STICKERS) || (functions.isHelper(interaction.user.id) == true)) {
				console.log(emoji.match(/\d+/)[0])
				interaction.reply("Sucessfull.")
				
			} else { return interaction.reply("You don't have permissions to do that!") };
        } catch (error) {
            console.error(error);
            return interaction.reply({ content: "There was an error while executing this command!", ephemeral: true });
        };
	},
};