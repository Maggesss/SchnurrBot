const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("server")
		.setDescription("Gives you some information about this server."),
	async execute(interaction) {
		const embed = new MessageEmbed()
			.setColor("#0099ff")
			.setAuthor({ name: interaction.guild.name, iconURL: interaction.guild.iconURL() })
			.addFields(
				{ name: "Owner:", value: `<@${interaction.guild.ownerId}>`, inline: true},
				{ name: "Voice Channels:", value: (interaction.guild.channels.cache.filter((c) => c.type === "GUILD_VOICE").size).toString(), inline: true },
				{ name: "Text Channels:", value: (interaction.guild.channels.cache.filter((c) => c.type === "GUILD_TEXT").size).toString(), inline: true },
				{ name: "Users:", value: (interaction.guild.members.cache.filter((m) => !m.user.bot).size).toString(), inline: true },
				{ name: "Bots:", value: (interaction.guild.members.cache.filter((m) => m.user.bot).size).toString(), inline: true },
				{ name: "Roles:", value: (interaction.guild.roles.cache.size).toString(), inline: true}
			)
			.setFooter({ text: `ID: ${interaction.guild.id} | Server Created` })
			.setTimestamp(interaction.guild.createdTimestamp);
		return interaction.reply({ embeds: [embed] })
	},
};