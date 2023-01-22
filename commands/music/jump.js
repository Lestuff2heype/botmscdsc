const { ApplicationCommandOptionType } = require('discord.js');

module.exports = {
    name: 'aller',
    description: "Saute à une piste particulière dans la file d'attente",
    voiceChannel: true,
    options: [
        {
            name: 'musique',
            description: 'le nom/url de la piste à laquelle vous voulez accéder',
            type: ApplicationCommandOptionType.String,
            required: false,
        },
        {
            name: 'nombre',
            description: 'la place dans la file d\'attente où se trouve la chanson',
            type: ApplicationCommandOptionType.Number,
            required: false,
        }
    ],

    async execute({ inter }) { 
        const track = inter.options.getString('musique');
        const number =  inter.options.getNumber('nombre')

        const queue = player.getQueue(inter.guildId);

        if (!queue || !queue.playing) return inter.reply({ content: `Aucune musique en cours de lecture ${inter.member}... réessayer ? ❌`, ephemeral: true });
        if (!track && !number) inter.reply({ content: `Vous devez utiliser l'une des options pour passer à une chanson ${inter.member}... réessayer ? ❌`, ephemeral: true });

            if (track) {
        for (let song of queue.tracks) {
            if (song.title === track || song.url === track ) {
                queue.skipTo(song)
                return inter.reply({ content: `sauté à ${track} ✅` });
            }
        }
        return inter.reply({ content: `Impossible de trouver ${track} ${inter.member}... essayez d'utiliser l'URL ou le nom complet de la chanson ? ❌`, ephemeral: true });    
    }
    if (number) {
        const index = number - 1
        const trackname = queue.tracks[index].title
        if (!trackname) return inter.reply({ content: `Cette dose de piste ne semble pas exister ${inter.member}... réessayer ?❌`, ephemeral: true });   
        queue.skipTo(index);
        return inter.reply({ content: `J'ai sauté sur ${trackname} ✅`});
    }
         
    }
}