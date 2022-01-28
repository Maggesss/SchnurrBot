const { SlashCommandBuilder } = require("@discordjs/builders");
const { joinVoiceChannel } = require('@discordjs/voice');

module.exports = {
	data: new SlashCommandBuilder()
		.setName("join")
		.setDescription("Joins your voicechannel."),
    async execute(interaction) {
        try {
            const guild = interaction.guild.guildId
            const voiceChannel = interaction.client.voice.channel;
            joinVoiceChannel({
                channelId: voiceChannel,
                guildId: guild,
                adapterCreator: interaction.guild.voiceAdapterCreator,
            });
            console.log(`${interaction.client.name} summoned me to: ${voiceChannel} on server: ${interaction.guild.name}`)
            return interaction.reply({ content: `Joined your channel.`, ephemeral: true })
        } catch (error) {
            console.error(error);
            return interaction.reply({ content: "There was an error while executing this command!", ephemeral: true });
        }
    },
};