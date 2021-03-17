//Discord bot token
exports.token = 'bot_token';

//the colour of the report embed
exports.embedColor = '#7289DA';

//emoji id used for reporting, to get the id enter "\:emojiname:" without qoutes in Discord
exports.emojiID = 'emoji_id';

//to get the id for the next two steps, make sure you have develepor mode turned on in Discord!
//if not, go to User Settings > Appearance > Advanced and make sure Developer Mode is set to on

//server id for where you want to watch for reports, to get server id right click server icon > copy id
exports.guildID = 'guild_id';

//channel id for where the reports will be sent, to get channel id right click channel name > copy id
exports.channelID = 'channel_id';

//message to send users to confirm the report has been sent
exports.message = 'Danke für deinen Report. Wir kümmern uns so bald wie möglich um dein Anliegen. Falls du deinen Fall anonym ausführen willst Antworte auf diese Nachricht. Falls du zusätzliches Feedback zu deinem Report wünscht wende dich gerne an uns via dem <@643445139028574258>.';

// cooldown in seconds between report reactions to not trigger a reaction, only a log message with the message ID will be written
exports.reportCooldown = 60;

