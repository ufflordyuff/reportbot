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
			{name: 'Message', value: message},
			{name: 'Author', value: reaction.message.author.tag, inline: true},
			{name: 'Channel', value: `#${reaction.message.channel.name}`, inline: true},
			{name: 'Reported By', value: user.tag, inline: true},
			{name: 'Link', value: `[Go to Message](https://discordapp.com/channels/${config.guildID}/${reaction.message.channel.id}/${messageId}) :arrow_right:`},
			)
		.setTimestamp()
		.setFooter('React with 👍 to acknowledge')

		if(reaction.message.attachments.size  > 0) {
			let index = 1;
			reaction.message.attachments.forEach(attachment => {
				reportEmbed.addField(`Attachment ${index++}`, `[Link](${attachment.proxyURL})`);
			});
		}

		client.channels.cache.get(config.channelID).send(reportEmbed);
		user.send(config.message);
		return;
	}
});

client.login(config.token);
