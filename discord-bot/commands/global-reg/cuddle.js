const { SlashCommandBuilder } = require("@discordjs/builders");

function randomTeddy() {
    let x = Math.floor(Math.random() * 21);
    let teddy = ":teddy_bear:".repeat(x)
    return(`Here you go: ${teddy} Cuddle with them!`)}

module.exports = {
	data: new SlashCommandBuilder()
		.setName("cuddle")
		.setDescription("Gives you some teddybears to cuddle with!"),
	async execute(interaction) {
		await interaction.reply(randomTeddy());
	},
};