const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");
const functions = require("../../functions")

module.exports = {
	data: new SlashCommandBuilder()
		.setName("devserverinfo")
		.setDescription("Gives you some information about target server.")
        .addStringOption(option => option
            .setName("target")
            .setDescription("The server to get infos abt")
            .setRequired(true)),
		
	async execute(interaction) {
        try {
            if (functions.isHelper(interaction.user.id) == true) {

                const specific_guild_id = interaction.options.getString("target");
                const specific_guild = interaction.client.guilds.cache.get(specific_guild_id);
                
                const embed = new MessageEmbed()
                    .setColor("#0099ff")
                    .setAuthor({ name: specific_guild.name, iconURL: specific_guild.iconURL() })
                    .addFields(
                        { name: "Owner:", value: `<@${specific_guild.ownerId}>`, inline: true},
                        { name: "Voice Channels:", value: (specific_guild.channels.cache.filter((c) => c.type === "GUILD_VOICE").size).toString(), inline: true },
                        { name: "Text Channels:", value: (specific_guild.channels.cache.filter((c) => c.type === "GUILD_TEXT").size).toString(), inline: true },
                        { name: "Users:", value: (specific_guild.members.cache.filter((m) => !m.user.bot).size).toString(), inline: true },
                        { name: "Bots:", value: (specific_guild.members.cache.filter((m) => m.user.bot).size).toString(), inline: true },
                        { name: "Roles:", value: (specific_guild.roles.cache.size).toString(), inline: true}
                    )
                    .setFooter({ text: `ID: ${specific_guild.id} | Server Created` })
                    .setTimestamp(specific_guild.createdTimestamp);

		        return interaction.reply({ embeds: [embed] });

            } else { return interaction.reply({ content: `You don't have permissions to do that!`, ephemeral: true }) };
        } catch (error) {
            console.error(error);
            return interaction.reply({ content: "There was an error while executing this command!", ephemeral: true });
        };
	},
};