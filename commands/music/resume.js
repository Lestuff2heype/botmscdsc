module.exports = {
    name: 'reprendre',
    description: 'reprendre la lecture',
    voiceChannel: true,

    execute({ inter }) {
        const queue = player.getQueue(inter.guildId);

        if (!queue) return inter.reply({ content: `Aucune musique en cours de lecture ${inter.member}... réessayer ? ❌`, ephemeral: true });
        

        if(!queue.connection.paused) return inter.reply({content: `La piste est déjà en cours d'exécution, ${inter.member}... réessayez ? ❌`, ephemeral: true})

        const success = queue.setPaused(false);
        
        return inter.reply({ content:success ? `La musique actuelle ${queue.current.title} a repris ✅` : `Quelque chose s'est mal passé ${inter.member}... réessayer ? ❌`});
    },
};
