const { SlashCommandBuilder } = require("@discordjs/builders");
const fs = require("fs")
let user = JSON.parse(fs.readFileSync("./commands/lin-custom/afk.json", "utf8"));

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
            if (!user[message.author.id]) { user[message.author.id] = {
                afk: true,
              };
            }
            let userData = user[message.author.id];
            if (userData.afk = true) {
                userData.afk = false
            } else {userData.afk = true}

        } catch (error) {
            console.error(error);
            return interaction.reply({ content: "There was an error while executing this command!", ephemeral: true });
        }
    },
};