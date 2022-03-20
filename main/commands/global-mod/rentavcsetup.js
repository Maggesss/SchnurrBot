const { SlashCommandBuilder } = require("@discordjs/builders");
const { Permissions } = require('discord.js');
const path = require("path");
const fs = require("fs");
const Server = require("../../source/server/index");
const functions = require("../../functions")

module.exports = {
	data: new SlashCommandBuilder()
		.setName("rentavcsetup")
		.setDescription("Setup a channel for your rent-a-vc experience!"),
            
    async execute(interaction) {
        try {
            if (interaction.member.permissions.has(Permissions.FLAGS.MANAGE_CHANNELS) || (functions.isHelper(interaction.user.id) == true)) {
                if (fs.existsSync(path.resolve(`./data/server/${interaction.guild.id}/regData.json`))) {
                    const server = new Server(JSON.parse(fs.readFileSync(path.resolve(`./data/server/${interaction.guild.id}/regData.json`))));
                    if (server.rentavcChannelID == "None") {
                        const newChannel = await interaction.guild.channels.create("rent-a-vc", { type: "GUILD_VOICE" });
                        fs.writeFileSync(path.resolve(`./data/server/${interaction.guild.id}/regData.json`), new Server({ id: interaction.guild.id, name: interaction.guild.name, rentavcChannelID: newChannel.id, suggestionChannelID: server.suggestionChannelID}).toString());
                        
                        interaction.client.channels.fetch("950064195464986725").then((channel) => {
                            channel.send(`\`\`${interaction.user.username}\`\` created new rent-a-vc channel on server: \`\`${interaction.guild.name}\`\``)
                            return interaction.reply({ content: `Channel created.`, ephemeral: true });
                        });
                    } else { return interaction.reply({ content: `There is already a rent-a-vc channel on your server! Delete it first!`, ephemeral: true })};
                };
            } else { return interaction.reply({ content: `You don't have permissions to do that!`, ephemeral: true }) };
        } catch (error) {
            console.error(error);
            return interaction.reply({ content: "There was an error while executing this command!", ephemeral: true });
        };
	},
};