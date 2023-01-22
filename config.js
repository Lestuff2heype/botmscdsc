module.exports = {
    app: {
        token: 'MTA0MTc1MjgyOTk3MjQ2MzY0Ng.GX7rr6.w7GoM1JnfbLIWNWQTy1W9MrheGarVeV0sVoA1I',
        playing: 'France Secours',
        global: true,
        guild: '995455240973332520'
    },

    opt: {
        DJ: {
            enabled: false,
            roleName: '',
            commands: []
        },
        maxVol: 100,
        leaveOnEnd: true,
        loopMessage: false,
        spotifyBridge: true,
        defaultvolume: 75,
        discordPlayer: {
            ytdlOptions: {
                quality: 'highestaudio',
                highWaterMark: 1 << 25
            }
        }
    }
};
