module.exports = {
    name: 'mélanger',
    description: 'mélanger la musique',
    voiceChannel: true,

    async execute({ inter }) {
        const queue = player.getQueue(inter.guildId);

        if (!queue || !queue.playing) return inter.reply({ content: `Aucune musique en cours de lecture ${inter.member}... réessayer ? ❌`, ephemeral: true });

        if (!queue.tracks[0]) return inter.reply({ content: `Pas de musique dans la file d'attente après celle en cours ${inter.member}... réessayer ? ❌`, ephemeral: true });

        await queue.shuffle();

        return inter.reply({ content:`File d'attente mélangée **${queue.tracks.length}** chanson(s) ! ✅`});
    },
};