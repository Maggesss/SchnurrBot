const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");
const fs = require("fs")
const path = require("path")
const Server = require("C:/Users/mbjki/praktikum-vario/praktikum-vario-js/discord-bot/source/server/index")

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
            .setAuthor({ name: author, iconURL: interaction.user.displayAvatarURL() })
            .setDescription(`<@${author}> has suggested a(n): ${type}`)
            .addFields(
                { name: "Name:", value: name },
                { name: "Suggestion:", value: suggestion},
            )
            .setTimestamp()
            .setFooter({ text: "©2022 Magges" });
        if (fs.existsSync(path.resolve('./data/server/' + interaction.guild.id + '.json'))) 
            { const server = new Server(JSON.parse(fs.readFileSync(path.resolve('./data/server/' + interaction.guild.id + '.json'))))
            if (server.suggestionChannelID == "None") {
                interaction.channel.send({ embeds: [embed] }).then(sentMessage => {
                    sentMessage.react("✅");
                    sentMessage.react("❌");
                return interaction.reply({ content: `Suggestion sent.`, ephemeral: true})
            })} else {interaction.client.channels.cache.get(server.suggestionChannelID).send({ embeds: [embed] }).then(sentMessage => {
                sentMessage.react("✅");
                sentMessage.react("❌");
                return interaction.reply({ content: `Suggestion sent.`, ephemeral: true})})}
        };
	},
};