const { SlashCommandBuilder } = require("@discordjs/builders");

function randomPP() {
    let x = Math.floor(Math.random() * 11);
    let pp = "=".repeat(x)
    return(`8${pp}D`)}

module.exports = {
	data: new SlashCommandBuilder()
		.setName("pp")
		.setDescription("Replies your pp lengh!"),
	async execute(interaction) {
		await interaction.reply(randomPP());
	},
};