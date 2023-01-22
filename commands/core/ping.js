const ms = require('ms');

module.exports = {
    name: 'ping',
    description: "Obtenez le ping du bot !",
    async execute({ client, inter }) {

        const m = await inter.reply("Ping?")
        inter.editReply(`Pong ! La latence de l'API est ${Math.round(client.ws.ping)}ms 🛰️, Dernier battement de coeur calculé ${ms(Date.now() - client.ws.shards.first().lastPingTimestamp, { long: true}) }`)

    },
};