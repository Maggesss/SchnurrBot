const { SlashCommandBuilder } = require("@discordjs/builders");
const fs = require("fs")
const path = require("path")
const User = require('C:/Users/mbjki/praktikum-vario/praktikum-vario-js/discord-bot/source/user/index')

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
            if(fs.existsSync(path.resolve('./data/user/' + interaction.user.id + '.json'))) { const user = new User(JSON.parse(fs.readFileSync(path.resolve('./data/user/' + interaction.user.id + '.json')))); 
                if (user.afk == false) {
                    try {const reason = interaction.options.get("reason").value
                        fs.writeFileSync(path.resolve('./data/user/' + interaction.user.id + '.json'), new User({ id: interaction.user.id, afk: true, reason: reason, name: interaction.user.tag}).toString())
                    } catch {fs.writeFileSync(path.resolve('./data/user/' + interaction.user.id + '.json'), new User({ id: interaction.user.id, afk: true, name: interaction.user.tag}).toString())}
                    return interaction.reply("You are now AFK.")
                }
            }   
        } catch (error) {
            console.error(error);
            return interaction.reply({ content: "There was an error while executing this command!", ephemeral: true });
        }
    },
};