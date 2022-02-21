const { SlashCommandBuilder } = require("@discordjs/builders");
const functions = require("../../functions.js");

function random_answer() {
    let x = functions.getRandomIntInclusive(0, 19)
    const answers = [   "It is certain.", 
                        "It is decidedly so.", 
                        "Without a doubt.", 
                        "Yes – definitely.", 
                        "You may rely on it.",
                        "As I see it, yes.",
                        "Most likely.",
                        "Outlook good.",
                        "Yes.",
                        "Signs point to yes.",
                        "Reply hazy, try again.",
                        "Ask again later.",
                        "Better not tell you now.",
                        "Cannot predict now.",
                        "Concentrate and ask again.",
                        "Don’t count on it.",
                        "My reply is no.",
                        "My sources say no.",
                        "Outlook not so good.",
                        "Very doubtful." ]
    return(`${answers[x]}`)
}

module.exports = {
	data: new SlashCommandBuilder()
		.setName("8ball")
		.setDescription("Ask the magic 8ball anything yes-or-no-ish!")
        .addStringOption(option => option
            .setName("question")
            .setDescription("Your question.")
            .setRequired(true)),

    async execute(interaction) {
        try {
            const question = interaction.options.getString("question")
            return interaction.reply({ content: `Question:\n"${question}"\n\nAnswer:\n||"${random_answer()}"||`, ephemeral: false });
        } catch (error) {
            console.error(error);
            return interaction.reply({ content: "There was an error while executing this command!", ephemeral: true });
        };
    },
};