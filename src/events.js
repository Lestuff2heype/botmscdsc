const { ApplicationCommandOptionType, ActionRowBuilder, ButtonBuilder, EmbedBuilder } = require('discord.js');

player.on('error', (queue, error) => {
    console.log(`Erreur émise depuis la file d'attente ${error.message}`);
});

player.on('connectionError', (queue, error) => {
    console.log(`Erreur émise par la connexion ${error.message}`);
});

player.on('trackStart', (queue, track) => {
    if (!client.config.opt.loopMessage && queue.repeatMode !== 0) return;
    const embed = new EmbedBuilder()
    .setAuthor({name: `A commencé à jouer ${track.title} dans ${queue.connection.channel.name} 🎧`, iconURL: track.requestedBy.avatarURL()})
    .setColor('#13f857')

    const back = new ButtonBuilder()
    .setLabel('Retour')
    .setCustomId(JSON.stringify({ffb: 'back'}))
    .setStyle('Primary')

    const skip = new ButtonBuilder()
    .setLabel('Skip')
    .setCustomId(JSON.stringify({ffb: 'skip'}))
    .setStyle('Primary')

    const resumepause = new ButtonBuilder()
    .setLabel('Reprendre & mettre en pause')
    .setCustomId(JSON.stringify({ffb: 'resume&pause'}))
    .setStyle('Danger')

    const loop = new ButtonBuilder()
    .setLabel('Boucle')
    .setCustomId(JSON.stringify({ffb: 'loop'}))
    .setStyle('Secondary')
    
    const queuebutton = new ButtonBuilder()
    .setLabel('Fil d\'attente')
    .setCustomId(JSON.stringify({ffb: 'queue'}))
    .setStyle('Secondary')

    const row1 = new ActionRowBuilder().addComponents(back, loop, resumepause, queuebutton, skip)
    queue.metadata.send({ embeds: [embed], components: [row1] })
});

player.on('trackAdd', (queue, track) => {
   
    queue.metadata.send(`Piste ${track.title} ajoutée dans la file d'attente ✅`);
});

player.on('botDisconnect', (queue) => {
    queue.metadata.send('J\'ai été déconnecté manuellement du canal vocal, effaçant la file d\'attente... ❌');
});

player.on('channelEmpty', (queue) => {
    queue.metadata.send('Personne n\'est dans le canal vocal, quittant le canal vocal... ❌');
});

player.on('queueEnd', (queue) => {
    queue.metadata.send('J\'ai fini de lire toute la file d\'attente ✅');
});

player.on('tracksAdd', (queue, tracks) => {
    queue.metadata.send(`Toutes les chansons de la playlist ajoutées à la file d'attente ✅`);
});