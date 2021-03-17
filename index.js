const Discord = require('discord.js');
const config = require("./config");
const client = new Discord.Client({ partials: ['MESSAGE', 'CHANNEL', 'REACTION'] });

client.once('ready', () => {
	console.log('ready!');
});

const reportedMessages = {};

client.on('messageReactionAdd', async (reaction, user) => {
	if (reaction.emoji.id === config.emojiID) {
		reaction.remove();
		const messageId = reaction.message.id;
		if(messageId in reportedMessages && reportedMessages[messageId].timestamp > Date.now() - config.reportCooldown * 1000) {
			console.log(`${messageId} is already reported.`)
			return;
		}
		reportedMessages[reaction.message.id] = {
			timestamp: Date.now()
		}
		if (reaction.message.partial) await reaction.message.fetch();
		if (reaction.message.content.length > 0) {
			var message = reaction.message.content
		} else {
			var message = 'Embedded Content'
		}
		const reportEmbed = new Discord.MessageEmbed()
		.setColor(config.embedColor)
		.setTitle('User Report :triangular_flag_on_post:')
		.addFields(
			{name: 'Nachricht', value: message},
			{name: 'Autor', value: reaction.message.author, inline: true},
			{name: 'Channel', value: `#${reaction.message.channel.name}`, inline: true},
			{name: 'Link', value: `[Go to Message](https://discordapp.com/channels/${config.guildID}/${reaction.message.channel.id}/${messageId}) :arrow_right:`},
			)
		.setTimestamp()
		.setFooter('Passt: ✅ , Weg ❎, Warn ❗, Verbale Zurechtweisung ✊')

		if(reaction.message.attachments.size  > 0) {
			let index = 1;
			reaction.message.attachments.forEach(attachment => {
				reportEmbed.addField(`Attachment ${index++}`, `[Link](${attachment.proxyURL})`);
			});
		}

		client.channels.cache.get(config.channelID).send(reportEmbed).then(embedMessage  => {embedMessage .react("✅")
		.then(() =>  embedMessage .react("❎"))
		.then(() =>  embedMessage .react("❗"))
		.then(() =>  embedMessage .react("✊"));
	});
		user.send(config.message);
		return;
	}
});
client.on('message', message => {
    if (message.channel.type === "dm" && message.author.id !== client.user.id) {
        console.log("-----DM-----")
        console.log(message.content)
        console.log("-----DM-----")
        message.author.send("Danke für deine Nachricht");
        client.channels.cache.get('821385649701388298').send({
                embed: {
                color: 0x8b0000,
                    author: {
                        name: "Ich habe diese Nachricht bekommen:",
                    },
                    description: message.content,
                    timestamp: new Date(),
                    footer: {
                        text: "Staff"
                    }
                }
        });
    }
});

client.login(config.token);
