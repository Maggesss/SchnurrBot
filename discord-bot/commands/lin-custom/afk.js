const { SlashCommandBuilder } = require("@discordjs/builders");
const fs = require("fs")

module.exports = {
	data: new SlashCommandBuilder()
		.setName("afk")
		.setDescription("Set a reply when mentioned while being AFK.")
        .addStringOption(option => option
            .setName("reason")
            .setDescription("The reason for being AFK")
            .setRequired(false)),
	async execute(interaction) {
        try {
            if (){
                const user = {
                    "id" : interaction.member.id,
                    "afk" : yes
                }
            }
            else {
                return interaction.member.setNickname(interaction.member.displayName.slice(0, -5))
            }
        } catch (error) {
            console.error(error);
            return interaction.reply({ content: "There was an error while executing this command!", ephemeral: true });
        }
    },
};