const { ApplicationCommandOptionType } = require('discord.js');
const { QueryType } = require('discord-player');

module.exports = {
    name: 'suivant',
    description: "chanson que vous voulez jouer ensuite",
    voiceChannel: true,
    options: [
        {
            name: 'musique',
            description: 'la chanson que vous voulez jouer ensuite',
            type: ApplicationCommandOptionType.String,
            required: true,
        }
    ],

    async execute({ inter }) {
	await inter.deferReply();
        const queue = player.getQueue(inter.guildId);

        if (!queue || !queue.playing) return inter.editReply({ content: `Aucune musique en cours de lecture ${inter.member}... réessayer ? ❌`, ephemeral: true });

        const song = inter.options.getString('musique');

        const res = await player.search(song, {
            requestedBy: inter.member,
            searchEngine: QueryType.AUTO
        });

        if (!res || !res.tracks.length) return inter.editReply({ content: `Aucun résultat trouvé ${inter.member}... réessayer ? ❌`, ephemeral: true });

       if (res.playlist) return inter.editReply({ content: `Cette commande ne prend pas en charge le ${inter.member} de la playlist... réessayez ? ❌`, ephemeral: true });

        queue.insert(res.tracks[0], 0)

        await inter.editReply({ content:`La piste a été insérée dans la file d'attente... elle jouera ensuite 🎧`});

    }
}
