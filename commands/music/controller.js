const { ApplicationCommandOptionType, ActionRowBuilder, ButtonBuilder, EmbedBuilder, PermissionsBitField } = require('discord.js');

module.exports = {
    name: 'controleur',
    description: "définir le canal du contrôleur",
    voiceChannel: false,
    permissions: PermissionsBitField.Flags.ManageMessages,
    options: [
        {
            name: 'salon',
            description: 'le canal auquel vous voulez l\'envoyer',
            type: ApplicationCommandOptionType.Channel,
            required: true,
        }
    ],
    async execute({ inter, client }) { 
      let Channel = inter.options.getChannel('channel');
      if (Channel.type !== 0) return inter.reply({ content: `vous devez l'envoyer à un canal de texte .. ❌`, ephemeral: true})

    
      const embed = new EmbedBuilder()
       .setTitle('contrôlez votre musique à partir des boutons ci-dessous')
       .setImage(inter.guild.iconURL({ size: 4096, dynamic: true }))
       .setColor('#36393e')
       .setFooter({ text: 'France Secours - Par ʟᴋꜱ#0001', iconURL: inter.member.avatarURL({ dynamic: true })})


         inter.reply({ content: `envoi du contrôleur à ${Channel}... ✅`, ephemeral: true})

         const back = new ButtonBuilder()
         .setLabel('Retour')
         .setCustomId(JSON.stringify({ffb: 'back'}))
         .setStyle('Primary')

         const skip = new ButtonBuilder()
         .setLabel('Skip')
         .setCustomId(JSON.stringify({ffb: 'skip'}))
         .setStyle('Primary')

         const resumepause = new ButtonBuilder()
         .setLabel('Reprendre & mettre en pause')
         .setCustomId(JSON.stringify({ffb: 'resume&pause'}))
         .setStyle('Danger')

         const save = new ButtonBuilder()
         .setLabel('Sauvegarder')
         .setCustomId(JSON.stringify({ffb: 'savetrack'}))
         .setStyle('Success')

         const volumeup = new ButtonBuilder()
         .setLabel('Monter le son')
         .setCustomId(JSON.stringify({ffb: 'volumeup'}))
         .setStyle('Primary')

         const volumedown = new ButtonBuilder()
         .setLabel('Baisser le son')
         .setCustomId(JSON.stringify({ffb: 'volumedown'}))
         .setStyle('Primary')

         const loop = new ButtonBuilder()
         .setLabel('Mettre en boucle')
         .setCustomId(JSON.stringify({ffb: 'loop'}))
         .setStyle('Danger')

         const np = new ButtonBuilder()
         .setLabel('Lecture en cours')
         .setCustomId(JSON.stringify({ffb: 'nowplaying'}))
         .setStyle('Secondary')
         
         const queuebutton = new ButtonBuilder()
         .setLabel('Fil d\'attente')
         .setCustomId(JSON.stringify({ffb: 'queue'}))
         .setStyle('Secondary')


         const row1 = new ActionRowBuilder().addComponents(back, queuebutton, resumepause, np, skip)
         const row2 = new ActionRowBuilder().addComponents(volumedown, loop, save, volumeup)



        Channel.send({ embeds: [embed], components: [row1, row2] })

    },
}
