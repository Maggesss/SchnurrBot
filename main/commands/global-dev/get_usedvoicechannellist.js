const { SlashCommandBuilder } = require("@discordjs/builders");
const functions = require("../../functions")

module.exports = {
	data: new SlashCommandBuilder()
		.setName("getusedvoicechannellist")
		.setDescription("Displays all used voicechannels from this server as well as their IDs."),

	async execute(interaction) {
        try {
            if (functions.isHelper(interaction.user.id) == true) {
                const channels = await interaction.guild.channels.fetch();
                let channelList = [];
                for (let channel of channels) {
                    if (channel[1].type == "GUILD_VOICE" && !(channel[1].members.size == 0)) {
                        channelList.push(`Name: \`\`${channel[1].name}\`\` | ID: \`\`${channel[1].id}\`\` Members: \`\`${channel[1].members.size} from ${channel[1].userLimit}\`\``);
                    };
                };
                if (channelList.length == 0) { return interaction.reply({ content: `There are no voicechannels used rn.`, ephemeral: true })};
                return interaction.reply({ content: `Used channels:\n${channelList.join("\n")}`, ephemeral: true });
            } else { return interaction.reply({ content: `You don't have permissions to do that!`, ephemeral: true }) };
        } catch (error) {
            console.error(error);
            return interaction.reply({ content: "There was an error while executing this command!", ephemeral: true });
        };
	}
};