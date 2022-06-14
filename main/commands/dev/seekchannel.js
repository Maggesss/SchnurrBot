const { SlashCommandBuilder } = require("@discordjs/builders");
const functions = require("../../functions")

module.exports = {
	data: new SlashCommandBuilder()
		.setName("seekchannel")
		.setDescription("Select a channel let the bot look for it.")
		.addStringOption(option => option
            .setName("channel")
            .setDescription("The channel-id to seek for")
            .setRequired(true)),
            
	async execute(interaction) {
        try {
            if (functions.isHelper(interaction.user.id) == true) {
                const channel = interaction.options.getString("channel");
                interaction.client.channels.fetch(channel).then((channel) => {
                    interaction.reply({ content: `Your channel:\n Name: \`\`${channel.name}\n\`\`Guild: \`\`${channel.guild.name}\`\``, ephemeral: true })
                });
            } else { return interaction.reply("You don't have permissions to do that!") };
        } catch (error) {
            console.error(error);
            return interaction.reply({ content: "There was an error while executing this command!", ephemeral: true });
        };
	},
};