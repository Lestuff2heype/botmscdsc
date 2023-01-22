const { ApplicationCommandOptionType } = require('discord.js');

module.exports = {
    name: 'retirerfil',
    description: "supprimer une chanson de la file d'attente",
    voiceChannel: true,
    options: [
        {
            name: 'musique',
            description: 'le nom/url de la piste que vous souhaitez supprimer',
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
        const number =  inter.options.getNumber('nombre')
        const track = inter.options.getString('musique');

        const queue = player.getQueue(inter.guildId);

        if (!queue || !queue.playing) return inter.reply({ content: `Aucune musique en cours de lecture ${inter.member}... réessayer ? ❌`, ephemeral: true });
        if (!track && !number) inter.reply({ content: `Vous devez utiliser l'une des options pour supprimer une chanson ${inter.member}... réessayer ? ❌`, ephemeral: true });

        if (track) {

        for (let song of queue.tracks) {
            if (song.title === track || song.url === track ) {
                queue.remove(song)
                return inter.reply({ content: `supprimé ${track} de la file d'attente ✅` });
            }

        }

        return inter.reply({ content: `Impossible de trouver ${track} ${inter.member}... essayez d'utiliser l'URL ou le nom complet de la chanson ? ❌`, ephemeral: true });    
        }

        if (number) {

            const index = number - 1
            const trackname = queue.tracks[index].title

            if (!trackname) return inter.reply({ content: `Cette dose de piste ne semble pas exister ${inter.member}... réessayer ?❌`, ephemeral: true });   

            queue.remove(index);
            
            return inter.reply({ content: `supprimé ${trackname} de la file d'attente ✅` });
        }


         
    }
}