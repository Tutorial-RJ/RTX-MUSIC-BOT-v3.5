const { EmbedBuilder } = require('discord.js');

module.exports = {
  data: {
    name: 'clearmessage',
    description: 'Clears the specified number of messages in the channel.',
    options: [
      {
        name: 'amount',
        type: 'INTEGER',
        description: 'The number of messages to clear (up to 100).',
        required: true,
      },
    ],
  },
  async execute(interaction) {
    if (!interaction.member.permissions.has('MANAGE_MESSAGES')) {
      return interaction.reply({ content: 'You do not have permission to use this command.', ephemeral: true });
    }

    const amount = interaction.options.getInteger('amount');

    if (amount <= 0 || amount > 100) {
      return interaction.reply({ content: 'You must provide a number between 1 and 100.', ephemeral: true });
    }

    try {
      await interaction.channel.bulkDelete(amount);
      const embed = new EmbedBuilder()
        .setColor('#3498db')
        .setAuthor({
          name: 'Cleared Messages',
          iconURL: 'https://cdn.discordapp.com/attachments/1156866389819281418/1157314241393598585/4618-no-slides.png?ex=65182861&is=6516d6e1&hm=dac8fed5a18e1574485e833d4c017591c50f59d161e1bde7fed5f6a92543f951&',
          url: 'https://discord.gg/FUEHs7RCqz'
        })
        .setDescription(`**${amount} messages cleared successfully.**`);

      interaction.reply({ embeds: [embed] });
    } catch (error) {
      console.error('Error while clearing messages:', error);
      interaction.reply({ content: 'An error occurred while clearing messages.', ephemeral: true });
    }
  },
};
