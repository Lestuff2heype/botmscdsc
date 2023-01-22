module.exports = async ({  inter, queue }) => { 
    if (!queue || !queue.playing) return inter.reply({ content: `Aucune musique en cours de lecture... réessayer ? ❌`, ephemeral: true });
    
    const success = queue.skip();

    return inter.reply({ content: success ? `Musique actuelle ${queue.current.title} sautée ✅` : `Quelque chose s'est mal passé ${inter.member}... réessayer ? ❌`, ephemeral: true});
}