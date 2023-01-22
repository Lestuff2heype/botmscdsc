const { QueueRepeatMode } = require('discord-player');
const { ApplicationCommandOptionType } = require('discord.js');

module.exports = {
    name: 'boucle',
    description: 'activer ou désactiver la boucle de la chanson ou de toute la file d\'attente',
    voiceChannel: true,
    options: [
        {
        name: 'action' ,
        description: 'quelle action vous voulez effectuer sur la boucle',
        type: ApplicationCommandOptionType.String,
        required: true,
        choices: [
            { name: 'Fil d\'attente', value: 'enable_loop_queue' },
            { name: 'Désactiver', value: 'disable_loop'},
            { name: 'Musique', value: 'enable_loop_song' },
        ],
    }
    ],
    execute({ inter }) {
        const queue = player.getQueue(inter.guildId);

        if (!queue || !queue.playing) return inter.reply({ content: `Aucune musique en cours de lecture ${inter.member}... réessayer ? ❌`, ephemeral: true });
        switch (inter.options._hoistedOptions.map(x => x.value).toString()) {
            case 'enable_loop_queue': {
                if (queue.repeatMode === 1) return inter.reply({ content:`Vous devez d'abord désactiver la musique en cours en mode boucle (/loop Disable) ${inter.member}... réessayer ? ❌`, ephemeral: true });

                const success = queue.setRepeatMode( QueueRepeatMode.QUEUE);

                return inter.reply({ content:success ? `Mode répétition **activé** toute la file d'attente sera répétée à l'infini 🔁` : `Quelque chose s'est mal passé ${inter.member}... réessayer ? ❌` });
                break
            }
            case 'disable_loop': {
                const success = queue.setRepeatMode(QueueRepeatMode.OFF);

                return inter.reply({ content:success ? `Mode répétition **désactivé**` : `Quelque chose s'est mal passé ${inter.member}... réessayer ? ❌` });
                break
            }
            case 'enable_loop_song': {
                if (queue.repeatMode === 2) return inter.reply({ content:`Vous devez d'abord désactiver la musique en cours en mode boucle (/loop Disable) ${inter.member}... réessayer ? ❌`, ephemeral: true });

                const success = queue.setRepeatMode( QueueRepeatMode.TRACK);
                
                return inter.reply({ content:success ? `Mode de répétition **activé** la chanson en cours sera répétée à l'infini (vous pouvez terminer la boucle avec /loop disable)` : `Quelque chose s'est mal passé ${inter.member}... réessayer ? ❌` });
                break
            }
        }
       
    },
};