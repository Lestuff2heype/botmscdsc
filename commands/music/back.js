module.exports = {
    name: 'retour',
    description: "Retourne de une musique en arrière",
    voiceChannel: true,

    async execute({ inter }) {
        const queue = player.getQueue(inter.guildId);

        if (!queue || !queue.playing) return inter.reply({ content: `Aucune musique en cours de lecture ${inter.member}... réessayer ? ❌`, ephemeral: true });

        if (!queue.previousTracks[1]) return inter.reply({ content: `Il n'y avait pas de musique jouée avant ${inter.member}... réessayer ? ❌`, ephemeral: true });

        await queue.back();

        inter.reply({ content:`Lecture de la musique **précédente** ✅`});
    },
};