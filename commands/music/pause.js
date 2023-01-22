module.exports = {
    name: 'pause',
    description: 'mettre en pause la musique',
    voiceChannel: true,

    execute({ inter }) {
        const queue = player.getQueue(inter.guildId);

        if (!queue) return inter.reply({ content: `Aucune musique en cours de lecture ${inter.member}... réessayer ? ❌`, ephemeral: true });
        
        if(queue.connection.paused) return inter.reply({content: 'La piste est actuellement en pause !', ephemeral: true})

        if(queue.connection.paused) return inter.reply({content: `La piste est actuellement en pause, ${inter.member}... réessayer ? ❌`, ephemeral: true})

        const success = queue.setPaused(true);
        
        return inter.reply({ content: success ? `Musique actuelle ${queue.current.title} en pause ✅` : `Quelque chose s'est mal passé ${inter.member}... réessayer ? ❌` });
    },
};
