const maxVol = client.config.opt.maxVol;

module.exports = async ({  inter, queue }) => { 
    if (!queue || !queue.playing) return inter.reply({ content: `Aucune musique en cours de lecture... réessayer ? ❌`, ephemeral: true });

        const vol = Math.floor(queue.volume - 5)

        if (vol < 0 ) return inter.reply({ content: `Je ne peux plus baisser le volume ${inter.member}... réessayer ? ❌`, ephemeral: true })
        
        if (queue.volume === vol) return inter.reply({ content: `Le volume que vous souhaitez modifier est déjà le volume actuel ${inter.member}... réessayez ? ❌`, ephemeral: true });

        const success = queue.setVolume(vol);

        return inter.reply({ content:success ? `Le volume a été modifié en **${vol}**/**${maxVol}**% 🔊` : `Quelque chose s'est mal passé ${inter.member}... réessayer ? ❌`, ephemeral: true});
}