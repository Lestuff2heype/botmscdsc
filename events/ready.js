module.exports = async (client) => {
    console.log(`Connecté à ${client.user.username}\n-> Pret dans ${client.guilds.cache.size} serveur pour un total de ${client.users.cache.size} utilisateurs`);
    client.user.setActivity(client.config.app.playing);

    
};