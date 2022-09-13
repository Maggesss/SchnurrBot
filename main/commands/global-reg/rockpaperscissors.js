const { SlashCommandBuilder } = require("@discordjs/builders");
const functions = require("../../functions.js")

module.exports = {
	data: new SlashCommandBuilder()
		.setName("rockpaperscissors")
		.setDescription("Play rock-paper-scissors against me!")
		.addStringOption(option => option
            .setName("choice")
            .setDescription("Choose 'rock', 'paper' or 'scissors'.")
            .setRequired(true)
            .addChoice("rock", "rock")
            .addChoice("paper", "paper")
            .addChoice("scissors", "scissors")),
            
            /*
            choice bot:
            0 = rock
            1 = paper
            2 = scissors
            */

	async execute(interaction) {
		const choice_user = interaction.options.getString("choice");
        const choice_bot = functions.getRandomIntInclusive(0, 2)
        const choice_array = ["rock", "paper", "scissors"];
        try { 
            if (choice_array.includes(choice_user.toLowerCase())) {
                if (choice_user.toLowerCase() == choice_array[choice_bot]) {
                    return interaction.reply(`Your choice was: **${choice_user.toLowerCase()}**. The bot chose **${choice_array[choice_bot]}**! **Tie!**`);
                } else if (((choice_user.toLowerCase() == "rock") && (choice_bot == 2)) || ((choice_user.toLowerCase() == "paper") && (choice_bot == 0)) || ((choice_user.toLowerCase() == "scissors") && (choice_bot == 1))) {
                    return interaction.reply(`Your choice was: **${choice_user.toLowerCase()}**. The bot chose **${choice_array[choice_bot]}**! **You win!**`);
                } else if (((choice_user.toLowerCase() == "rock") && (choice_bot == 1)) || ((choice_user.toLowerCase() == "paper") && (choice_bot == 2)) || ((choice_user.toLowerCase() == "scissors") && (choice_bot == 0))) {
                    return interaction.reply(`Your choice was: **${choice_user.toLowerCase()}**. The bot chose **${choice_array[choice_bot]}**! **You lose!**`);
                };
            } else { return interaction.reply({ content: "Not a valid input!", ephemeral: true }) };
        } catch (error) {
            console.error(error);
            return interaction.reply({ content: "There was an error while executing this command!", ephemeral: true });
        };
	},
};