const { SlashCommandBuilder } = require("@discordjs/builders");
const fs = require("fs")
const path = require("path")
const Server = require("C:/Users/mbjki/praktikum-vario/praktikum-vario-js/discord-bot/source/server/index.js")

module.exports = {
	data: new SlashCommandBuilder()
		.setName("setSuggestionChannel")
		.setDescription("Create a suggestion.")
		.addNumberOption(option => option
            .setName("channel")
            .setDescription("Select the channel to log your suggestions. (Put channel ID)")
            .setRequired(true)),
	async execute(interaction) {
		const channel = interaction.options.getNumber("channel");
        if (fs.existsSync(path.resolve('./data/server/' + interaction.guild.id + '.json'))) {
                fs.writeFileSync(path.resolve('./data/server/' + interaction.guild.id + '.json'), new Server({ id: interaction.guild.id, afk: true, suggestionChannelID: channel, name: interaction.guild.name}).toString())
                return interaction.reply({ content: `Suggestion sent.`, ephemeral: true })
        }
    }
}
