const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("devsuggest")
		.setDescription("Create a suggestion to Magges#4062.")
		.addStringOption(option => option
            .setName("type")
            .setDescription("Select the type of your suggestion. (Command, bot funtion, etc.)")
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
        const author = interaction.user.tag;

        const embed = new MessageEmbed()
            .setColor("#0099ff")
            .setAuthor({ name: author, iconURL: interaction.user.displayAvatarURL() })
            .setDescription(`${author} has suggested a(n): ${type}`)
            .addFields(
                { name: "Name:", value: name },
                { name: "Suggestion:", value: suggestion},
            )
            .setTimestamp()
            .setFooter({ text: "©2022 Magges" });

        interaction.client.channels.cache.get("936549224898764800").send({ embeds: [embed] }).then(sentMessage => {
            sentMessage.react("✅");
            sentMessage.react("❌");
            return interaction.reply({ content: `Suggestion sent.`, ephemeral: true });
        });
	}
};