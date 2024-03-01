const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('clearmessage')
    .setDescription('Clear messages from the channel')
    .addIntegerOption(option =>
      option.setName('amount')
        .setDescription('The number of messages to clear')
        .setRequired(true)),
  async execute(interaction) {
    const amount = interaction.options.getInteger('amount');

    if (amount <= 0) {
      return await interaction.reply('Please provide a valid number of messages to clear.');
    }

    if (amount > 100) {
      return await interaction.reply('You can only delete up to 100 messages at a time.');
    }

    await interaction.channel.bulkDelete(amount + 1);
    const embed = new MessageEmbed()
      .setColor('#ff0000')
      .setDescription(`Cleared ${amount} messages.`);
    await interaction.reply({ embeds: [embed] });
  },
};
