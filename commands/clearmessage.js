
const { Client, Intents, MessageEmbed } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('messageCreate', async (message) => {
  if (message.content.startsWith('!clear')) {
    const args = message.content.split(' ');
    const amount = parseInt(args[1]);

    if (isNaN(amount) || amount <= 0) {
      return message.reply('Please provide a valid number of messages to clear.');
    }

    if (amount > 100) {
      return message.reply('You can only delete up to 100 messages at a time.');
    }

    await message.channel.bulkDelete(amount + 1);
    const embed = new MessageEmbed()
      .setColor('#ff0000')
      .setDescription(`Cleared ${amount} messages.`);
    message.channel.send({ embeds: [embed] });
  }
});
