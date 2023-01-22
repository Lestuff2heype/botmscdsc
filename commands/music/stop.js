module.exports = {
    name: 'stop',
    description: 'stop la musique',
    voiceChannel: true,

    execute({ inter }) {
        const queue = player.getQueue(inter.guildId);

        if (!queue || !queue.playing) return inter.reply({ content:`Aucune musique en cours de lecture ${inter.member}... réessayer ? ❌`, ephemeral: true });

        queue.destroy();

        inter.reply({ content: `La musique s'est arrêtée entre ce serveur, à la prochaine ✅`});
    },
};