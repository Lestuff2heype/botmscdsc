const { QueryType } = require('discord-player');
const { ApplicationCommandOptionType } = require('discord.js');
module.exports = {
    name: 'jouer',
    description: "jouer une musique !",
    voiceChannel: true,
    options: [
        {
            name: 'musique',
            description: 'la musique que vous voulez jouer',
            type: ApplicationCommandOptionType.String,
            required: true,
        }
    ],

    async execute({ inter }) {
	await inter.deferReply();
        const song = inter.options.getString('musique');
        const res = await player.search(song, {
            requestedBy: inter.member,
            searchEngine: QueryType.AUTO
        });

        if (!res || !res.tracks.length) return inter.editReply({ content: `Aucun résultat trouvé ${inter.member}... réessayer ? ❌`, ephemeral: true });

        const queue = await player.createQueue(inter.guild, {
            metadata: inter.channel,
            spotifyBridge: client.config.opt.spotifyBridge,
            initialVolume: client.config.opt.defaultvolume,
            leaveOnEnd: client.config.opt.leaveOnEnd
        });

        try {
            if (!queue.connection) await queue.connect(inter.member.voice.channel);
        } catch {
            await player.deleteQueue(inter.guildId);
            return inter.editReply({ content: `Je n'arrive pas à rejoindre le canal vocal ${inter.member}... réessayer ? ❌`, ephemeral: true});
        }

       await inter.editReply({ content:`Chargement de votre ${res.playlist ? 'playlist' : 'musique'}... 🎧`});

        res.playlist ? queue.addTracks(res.tracks) : queue.addTrack(res.tracks[0]);

        if (!queue.playing) await queue.play();
    },
};
