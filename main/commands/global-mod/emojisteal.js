const { SlashCommandBuilder } = require("@discordjs/builders");
const { Permissions } = require('discord.js');
const functions = require("../../functions")

module.exports = {
	data: new SlashCommandBuilder()
		.setName("emojisteal")
		.setDescription("steal an not emoji from some other server")
		.addStringOption(option => option
            .setName("emoji")
            .setDescription("emoji of your choice")
            .setRequired(true))
		.addStringOption(option => option
			.setName("name")
			.setDescription("name of your emoji")
			.setRequired(true))
		.addStringOption(option => option
			.setName("type")
			.setDescription("type of emoji")
			.addChoice("animated", "gif")
			.addChoice("not animated", "png")
			.setRequired(true)),
		
	async execute(interaction) {
		const emoji = interaction.options.getString("emoji");
		const name = interaction.options.getString("name");
		const type = interaction.options.getString("type");

		try {
            if (interaction.member.permissions.has(Permissions.FLAGS.MANAGE_EMOJIS_AND_STICKERS) || (functions.isHelper(interaction.user.id) == true)) {
				//emoji.match(/\d+/)[0]
				await interaction.guild.emojis.create(`https://cdn.discordapp.com/emojis/${emoji.match(/\d+/)[0]}.${type}`, name);
				interaction.reply(`Added emoji to server-emojis.`);
			} else { return interaction.reply("You don't have permissions to do that!") };
        } catch (error) {
            console.error(error);
            return interaction.reply({ content: "There was an error while executing this command!", ephemeral: true });
        };
	},
};