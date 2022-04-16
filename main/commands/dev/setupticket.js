const { SlashCommandBuilder } = require("@discordjs/builders");
const { Permissions, MessageEmbed } = require('discord.js');
const path = require("path");
const fs = require("fs");
const Server = require("../../source/server/index");
const functions = require("../../functions")

module.exports = {
	data: new SlashCommandBuilder()
		.setName("setupticket")
		.setDescription("Setup a channel for your rent-a-vc experience!"),
            
    async execute(interaction) {
        try {
            if (interaction.member.permissions.has(Permissions.FLAGS.MANAGE_CHANNELS) || (functions.isHelper(interaction.user.id) == true)) {
                if (fs.existsSync(path.resolve(`./data/server/${interaction.guild.id}/regData.json`))) {
                    const server = new Server(JSON.parse(fs.readFileSync(path.resolve(`./data/server/${interaction.guild.id}/regData.json`))));

                    const embed = new MessageEmbed()
                    .setColor("#0099ff")
                    .setAuthor({ name: interaction.guild.name, iconURL: interaction.guild.iconURL() })
                    .addFields(
                        { name: "Ticket:", value: `React with 📄 to open up a new support ticket.`, inline: true}
                    )

                    const newMessage = await interaction.channel.send({ embeds: [embed] });
                    newMessage.react("📄");
                    fs.writeFileSync(path.resolve(`./data/server/${interaction.guild.id}/regData.json`), new Server({ id: interaction.guild.id, name: interaction.guild.name, rentavcChannelID: server.rentavcChannelID, suggestionChannelID: server.suggestionChannelID, ticketchannel: interaction.channel.id, ticketmessage: newMessage.id}).toString());
                    
                    interaction.client.channels.fetch("950064195464986725").then((channel) => {
                        channel.send(`\`\`${interaction.user.username}\`\` created new ticket message on server: \`\`${interaction.guild.name}\`\``)
                        return interaction.reply({ content: `Ticket-message created.`, ephemeral: true });
                    });
                };
            } else { return interaction.reply({ content: `You don't have permissions to do that!`, ephemeral: true }) };
        } catch (error) {
            console.error(error);
            return interaction.reply({ content: "There was an error while executing this command!", ephemeral: true });
        };
	},
};