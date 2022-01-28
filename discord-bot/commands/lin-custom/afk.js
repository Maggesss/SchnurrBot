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
            const afkPath = "./commands/lin-custom/afk.json"
            const afkRead = fs.readFileSync(afkPath);
            const afkFile = JSON.parse(afkRead);
            const userId = interaction.client.id;
            if (!afkFile[userId]) {
                afkFile[userId] = {afk: true};
                fs.writeFileSync(afkPath, JSON.stringify(afkFile, null, 2));
            } else {
                var afkVar = Boolean(true)
                afkFile[userId] = {afk: afkVar};
                fs.writeFileSync(afkPath, JSON.stringify(afkFile, null, 2));
                        }
        } catch (error) {
            console.error(error);
            return interaction.reply({ content: "There was an error while executing this command!", ephemeral: true });
        }
    },
};