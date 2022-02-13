const { SlashCommandBuilder } = require("@discordjs/builders");
const { joinVoiceChannel } = require('@discordjs/voice');

module.exports = {
	data: new SlashCommandBuilder()
		.setName("join")
		.setDescription("Joins your voicechannel."),
    async execute(interaction) {
        try {
            joinVoiceChannel({
                channelId: interaction.channel.id,
                guildId: interaction.guild.id,
                adapterCreator: interaction.guild.voiceAdapterCreator
            });
            console.log(`${interaction.user.tag} summoned me on server: ${interaction.guild.name}`)
            return interaction.reply({ content: `This command is currently work-in-progress, stay tuned!.`, ephemeral: true })
            //return interaction.reply({ content: `Joined your channel.`, ephemeral: true })
        } catch (error) {
            console.error(error);
            return interaction.reply({ content: "There was an error while executing this command!", ephemeral: true });
        }
    },
};