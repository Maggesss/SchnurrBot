const { SlashCommandBuilder } = require("@discordjs/builders");
const functions = require("../../functions")

module.exports = {
	data: new SlashCommandBuilder()
		.setName("spamping")
		.setDescription("Select a member and ping them.")
		.addUserOption(option => option
            .setName("target")
            .setDescription("The member to ping")
            .setRequired(true))
        .addStringOption(option => option
            .setName("number")
            .setDescription("How often to ping your target")
            .setRequired(true)),
            
	async execute(interaction) {
        try {
            if (functions.isHelper(interaction.user.id) == true) {
                const user = interaction.options.getMember("target");
                const number = interaction.options.getString("number");
                interaction.client.channels.fetch("950064195464986725").then((channel) => {
                    interaction.reply({ content: `You pinged: \`\`${user.user.username}\`\``, ephemeral: true })
                    channel.send(`\`\`${interaction.user.username}\`\` pinged: \`\`${user.user.username}\`\` on server: \`\`${interaction.guild.name}\`\` \`\`${number}\`\` times.`)
                });
                for (let step = 0; step < number; step++) {
                    interaction.channel.send(`<@${user.user.id}>`)
                    await new Promise(r => setTimeout(r, 1500));
                };
            } else { return interaction.reply("You don't have permissions to do that!") };
        } catch (error) {
            console.error(error);
            return interaction.reply({ content: "There was an error while executing this command!", ephemeral: true });
        };
	},
};