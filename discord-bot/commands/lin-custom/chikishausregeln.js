const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("chikishausregeln")
		.setDescription("Gives you some information about this server.")
        .addStringOption(option => option
            .setName("regelnummer")
            .setDescription("Select your rule. (Put number from 1 to 9")
            .setRequired(true)),
        
	async execute(interaction) {
        const regelNum = interaction.options.getString("regelnummer")
        let Hausregel = ""
        if (regelNum == 1) {Hausregel = "Das Schwängern oder Schwanger werden vor dem Alter von 18 Jahren ist in diesem Haushalt untersagt! Ab dem erhalten der Volljährigkeit geht mir das am Arsch vorbei tbh."}
        else if (regelNum == "2") {Hausregel = "Es ist mir lieber, wenn ihr illegales zuhause macht. Außerhalb der eigenen vier Wände können viele Unfälle passieren."}
        else if (regelNum == "3") {Hausregel = "Sexorgien müssen ab 5,43 Personen angekündigt werden. Verhüten nicht vergessen!"}
        else if (regelNum == "4") {Hausregel = "Unge Fanart jeglicher Art wird aufgehängt."}
        else if (regelNum == "5") {Hausregel = "Denniz ist ein Hurensohn (nigs gegen seine Mam)"}
        else if (regelNum == "6") {Hausregel = "Auch wenn Sushi oft sehr nervtötend und gemein sein kann, ist er teilweise echt fucking wholesome."}
        else if (regelNum == "7") {Hausregel = "Beim Trinken von Alkohol muss mindestens eine Runde Ich-Hab-Noch-Nie gespielt werden!"}
        else if (regelNum == "8") {Hausregel = "RADLERVERBOT!"}
        else if (regelNum == "9") {Hausregel = "Menschen dürfen gegessen werden :3"}
        else {return interaction.reply("Not a valid Rule-Number!")} 

		const embed = new MessageEmbed()
			.setColor("#0099ff")
			.setAuthor({ name: "<@669240426867327006>" })
			.addFields(
				{ name: `Hausregel #${regelNum}`, value: Hausregel },
			)
			.setFooter({ text: `ID: ${interaction.guild.id} | Server Created` })
			.setTimestamp(interaction.guild.createdTimestamp);
		return interaction.reply({ embeds: [embed] })
	},
};