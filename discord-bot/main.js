const fs = require("fs");
const { token } = require("./config.json");
const { Client, Collection, MessageEmbed } = require("discord.js");

const client = new Client({ intents: ["GUILD_MEMBERS", "GUILD_PRESENCES", "GUILDS", "GUILD_MESSAGES", "DIRECT_MESSAGES", "GUILD_MESSAGE_REACTIONS"], partials: ["CHANNEL"]});

client.commands = new Collection();

const commandFolders = fs.readdirSync("./commands")

for (const dir of commandFolders){

	const commandFiles = fs.readdirSync(`./commands/${dir}`).filter(file => file.endsWith(".js"));

	for (const file of commandFiles) {
		const command = require(`./commands/${dir}/${file}`);
		client.commands.set(command.data.name, command);
	}
}

client.once("ready", () => {
	let counter = 0
	console.log("Ready!");
    const Guilds = client.guilds.cache.map(guild => `${guild.id}: ${guild.name}`);
    console.log(Guilds);
	for (x in Guilds) {
		counter = counter + 1}
	console.log(`\nBot is currently in ${counter} guilds.`)
});

client.on("interactionCreate", async interaction => {
	if (!interaction.isCommand()) return;

	const command = client.commands.get(interaction.commandName);

	if (!command) return;

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		return interaction.reply({ content: "There was an error while executing this command!", ephemeral: true });
	}
});

client.on('messageCreate', (message) => {

    if (message.author.bot) return;

    const attachment = message.attachments.first()

    if (message.channel.type === 'DM') {
        const dmLogEmbed = new MessageEmbed()
            .setColor("RANDOM")
            .setTitle(`${message.author.tag} dmed the bot and said: `)
            .setDescription(message.content)
            .setFooter({ text: `User's id: ${message.author.id}` })

        if (message.attachments.size !== 0) {
            dmLogEmbed.setImage(attachment.url)
        }
        client.channels.fetch("936549224898764800").then((channel) => {
            channel.send({ embeds: [dmLogEmbed] })
        })
    }
	// else if (message.mentions.members.first()){																			Nerviger Weg für AFK responses, danke, Lin...
	// 	const person = message.guild.members.cache.get(message.mentions.members.first().user.id);
	// 	if (person.presence.status == "idle"){
	// 		message.channel.send("This user is currently AFK, there is no point in mentioning him/her...")
	// 	}
	// }
});

client.login(token);