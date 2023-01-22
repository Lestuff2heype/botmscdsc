const { ApplicationCommandOptionType } = require('discord.js');

module.exports = {
    name: 'filtre',
    description: 'ajoute un filtre à la musique',
    voiceChannel: true,
    options: [
        {
            name: 'filtre',
            description: 'filtre que vous voulez ajouter',
            type: ApplicationCommandOptionType.String,
            required: true,
            choices: [...Object.keys(require("discord-player").AudioFilters.filters).map(m => Object({ name: m, value: m })).splice(0, 25)],
        }
    ],


    async execute({ inter, client }) {
        const queue = player.getQueue(inter.guildId);

        if (!queue || !queue.playing) return inter.reply({ content: `Aucune musique en cours de lecture ${inter.member}... réessayer ? ❌`, ephemeral: true });

        const actualFilter = queue.getFiltersEnabled()[0];

        const infilter = inter.options.getString('filtre');


        const filters = [];

        queue.getFiltersEnabled().map(x => filters.push(x));
        queue.getFiltersDisabled().map(x => filters.push(x));

        const filter = filters.find((x) => x.toLowerCase() === infilter.toLowerCase());

        if (!filter) return inter.reply({ content: `Ce filtre n'existe pas ${inter.member}... réessayer ? ❌\n${actualFilter ? `Filtre actuellement actif ${actualFilter}.\n` : ''}Liste des filtres disponibles ${filters.map(x => `**${x}**`).join(', ')}.`, ephemeral: true });

        const filtersUpdated = {};

        filtersUpdated[filter] = queue.getFiltersEnabled().includes(filter) ? false : true;

        await queue.setFilters(filtersUpdated);

        inter.reply({ content: `Le filtre ${filter} est maintenant **${queue.getFiltersEnabled().includes(filter) ? 'activé' : 'desactivé'}** ✅\n*Rappel plus la musique est longue, plus cela prendra de temps.*` });
    },
};