const { SlashCommandBuilder } = require("@discordjs/builders");
const { joinVoiceChannel } = require('@discordjs/voice');

module.exports = {
	data: new SlashCommandBuilder()
		.setName("join")
		.setDescription("Joins your voicechannel."),
    async execute(interaction) {
        try {
            const guild = interaction.guild.guildId
            const member = interaction.guild.members.cache.get(interaction.member.user.id);
            const voiceChannel = member.voice.channel;
            const connection = joinVoiceChannel({
                channelId: voiceChannel,
                guildId: guild,
                adapterCreator: guild.voiceAdapterCreator,
            });
            console.log(`${interaction.client} summoned me to: ${channel.name} on server: ${interaction.guild.name}`)
            return interaction.reply({ content: `You banned: ${user.username}`, ephemeral: true })
        } catch (error) {
            console.error(error);
            return interaction.reply({ content: "There was an error while executing this command!", ephemeral: true });
        }
    },
};