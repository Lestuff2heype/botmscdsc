module.exports = {
    name: 'sauter',
    description: 'saute une musique',
    voiceChannel: true,

    execute({ inter }) {
        const queue = player.getQueue(inter.guildId);

         if (!queue || !queue.playing) return inter.reply({ content:`Aucune musique en cours de lecture ${inter.member}... réessayer ? ❌`, ephemeral: true });

        const success = queue.skip();

        return inter.reply({ content: success ? `Musique actuelle ${queue.current.title} sautée ✅` : `Quelque chose s'est mal passé ${inter.member}... réessayer ? ❌`});
    },
};