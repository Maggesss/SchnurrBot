const { MessageEmbed } = require("discord.js");

// inside a command, event listener, etc.
const helpEmbed = new MessageEmbed()
	.setColor("#0099ff")
	.setTitle("Help")
	.setAuthor({ name: "Magges#4062", iconURL: "https://i.imgur.com/AfFp7pu.png"})
	.setDescription("THE one and only HELP page.")
	.setThumbnail("https://i.imgur.com/AfFp7pu.png")
	.addFields(
		{ name: "ping", value: "Play some pingpong w/the Bot!" },
		{ name: "pp", value: "Gets you a penis! You\'r a female? DOESN\'T MATTER, PENIS!"},
		{ name: "clear", value: "Clears some messages, choose from 1 to 99!"},
        { name: "serverinfo", value: "Returns some info about the server you\"r currently visiting!"}
	)
	.setTimestamp()
	.setFooter({ text: "©2022 Magges" });

const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("help")
		.setDescription("Replies with the help page."),
	async execute(interaction) {
		await interaction.reply({ embeds: [helpEmbed] });
	},
};