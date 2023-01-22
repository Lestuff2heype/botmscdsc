module.exports = {
    name: 'retirer',
    description: 'retire toute les musiques dans la file d\'attente',
    voiceChannel: true,

    async execute({ inter }) {
        const queue = player.getQueue(inter.guildId);

        if (!queue || !queue.playing) return inter.reply({ content: `Aucune musique en cours de lecture ${inter.member}... réessayer ? ❌`, ephemeral: true });

        if (!queue.tracks[0]) return inter.reply({ content: `Pas de musique dans la file d'attente après celle en cours ${inter.member}... réessayer ? ❌`, ephemeral: true });

        await queue.clear();

        inter.reply(`La file d'attente vient d'être vidée 🗑️`);
    },
};