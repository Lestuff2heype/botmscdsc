const { EmbedBuilder, ActionRowBuilder, ButtonBuilder } = require('discord.js');

module.exports = {
    name: 'lecture',
    description: 'voir ce qui joue !',
    voiceChannel: true,

    execute({ inter }) {
        const queue = player.getQueue(inter.guildId);

        if (!queue) return inter.reply({ content: `Aucune musique en cours de lecture ${inter.member}... réessayer ? ❌`, ephemeral: true });

        const track = queue.current;

        const methods = ['disabled', 'track', 'queue'];

        const timestamp = queue.getPlayerTimestamp();

        const trackDuration = timestamp.progress == 'Infinity' ? 'infinity (live)' : track.duration;

        const progress = queue.createProgressBar();
        

        const embed = new EmbedBuilder()
        .setAuthor({ name: track.title,  iconURL: client.user.displayAvatarURL({ size: 1024, dynamic: true })})
        .setThumbnail(track.thumbnail)
        .setDescription(`Volume **${queue.volume}**%\nDurée **${trackDuration}**\nProgression ${progress}\nMode boucle **${methods[queue.repeatMode]}**\nDemandé par ${track.requestedBy}`)
        .setFooter({ text: 'France Secours - Par ʟᴋꜱ#0001', iconURL: inter.member.avatarURL({ dynamic: true })})
        .setColor('ff0000')
        .setTimestamp()

        const saveButton = new ButtonBuilder()
        .setLabel('Enregistrer cette musique')
        .setCustomId(JSON.stringify({ffb: 'savetrack'}))
        .setStyle('Danger')

        const volumeup = new ButtonBuilder()
        .setLabel('Monter le son')
        .setCustomId(JSON.stringify({ffb: 'volumeup'}))
        .setStyle('Primary')

        const volumedown = new ButtonBuilder()
        .setLabel('Baiser le son')
        .setCustomId(JSON.stringify({ffb: 'volumedown'}))
        .setStyle('Primary')

        const loop = new ButtonBuilder()
        .setLabel('Boucle')
        .setCustomId(JSON.stringify({ffb: 'loop'}))
        .setStyle('Danger')

        const resumepause = new ButtonBuilder()
         .setLabel('Reprendre & mettre en pause')
         .setCustomId(JSON.stringify({ffb: 'resume&pause'}))
         .setStyle('Success')



        const row = new ActionRowBuilder().addComponents(volumedown, saveButton, resumepause, loop, volumeup);

         inter.reply({ embeds: [embed], components: [row] });
    },
};