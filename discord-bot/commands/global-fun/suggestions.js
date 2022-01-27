const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("suggest")
		.setDescription("Create a suggestion.")
		.addStringOption(option => option
            .setName("type")
            .setDescription("Select the type. (Command, role, channel etc.)")
            .setRequired(true))
        .addStringOption(option => option
            .setName("name")
            .setDescription("Name your suggestion.")
            .setRequired(true))
        .addStringOption(option => option
            .setName("suggestion")
            .setDescription("Describe your suggestion.")
            .setRequired(true)),
	async execute(interaction) {
		const type = interaction.options.getString("type");
        const name = interaction.options.getString("name");
        const suggestion = interaction.options.getString("suggestion");
        const author = interaction.user.tag

        const embed = new MessageEmbed()
            .setColor("#0099ff")
            .setAuthor({ name: author, url: interaction.user.displayAvatarURL })
            .setDescription(`${interaction.user.tag} has suggested a(n): ${type}`)
            .addFields(
                { name: "Name:", value: name },
                { name: "Suggestion:", value: suggestion},
            )
            .setTimestamp()
            .setFooter({ text: "©2022 Magges" });
            interaction.reply("New suggestion!")
            interaction.channel.send({ embeds: [embed] }).then(sentMessage => {
                sentMessage.react("✅");
                sentMessage.react("❌");
            return
            });
	},
};