const maxVol = client.config.opt.maxVol;
const { ApplicationCommandOptionType } = require('discord.js');

module.exports = {
    name: 'volume',
    description: 'ajuster',
    voiceChannel: true,
    options: [
        {
            name: 'volume',
            description: 'le volume',
            type: ApplicationCommandOptionType.Number,
            required: true,
            minValue: 1,
            maxValue: maxVol
        }
    ],

    execute({ inter }) {
        const queue = player.getQueue(inter.guildId);

        if (!queue) return inter.reply({ content: `Aucune musique en cours de lecture ${inter.member}... réessayer ? ❌`, ephemeral: true });
        const vol = inter.options.getNumber('volume')

        if (queue.volume === vol) return inter.reply({ content: `Le volume que vous souhaitez modifier est déjà le volume actuel ${inter.member}... réessayez ? ❌`, ephemeral: true });

        const success = queue.setVolume(vol);

        return inter.reply({ content:success ? `Le volume a été modifié en **${vol}**/**${maxVol}**% 🔊` : `Quelque chose s'est mal passé ${inter.member}... réessayer ? ❌`});
    },
};