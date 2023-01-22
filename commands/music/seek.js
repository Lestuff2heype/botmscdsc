const ms = require('ms');
const { ApplicationCommandType, ApplicationCommandOptionType } = require('discord.js');

module.exports = {
    name: 'allera',
    description: 'aller en arrière ou en avant dans une chanson',
    voiceChannel: true,
    options: [
    {
        name: 'temps',
        description: 'l\'heure à laquelle vous souhaitez passer',
        type: ApplicationCommandOptionType.String,
        required: true,
    }
    ],
    async execute({ inter }) {
        const queue = player.getQueue(inter.guildId);

        if (!queue || !queue.playing) return inter.reply({ content: `Aucune musique en cours de lecture ${inter.member}... réessayer ? ❌`, ephemeral: true });

        const timeToMS = ms(inter.options.getString('temps'));

        if (timeToMS >= queue.current.durationMS) return inter.reply({ content:`Le temps indiqué est supérieur au temps total du morceau en cours ${inter.member}... réessayer ? ❌\n*Essayez par exemple un temps valide comme **5s, 10s, 20 secondes, 1m**...*`, ephemeral: true });

        await queue.seek(timeToMS);

        inter.reply({ content: `Temps défini sur la chanson en cours **${ms(timeToMS, { long: true })}** ✅`});
    },
};