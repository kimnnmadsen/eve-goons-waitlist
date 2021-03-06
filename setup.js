exports.oauth = {
        clientID: "a0105db55dcc4ea1b012c29c8698bed1",
        secretKey: "sVRnjwhnAplB2HkZ4zkdM3l1911xNWBE6i9C09k2",
        callbackURL: "https://tdf-dev.n3it.xyz/auth/provider/callback",
        scopes: 
                ['publicData',
                'esi-ui.open_window.v1',
                'esi-location.read_location.v1','esi-location.read_online.v1','esi-location.read_ship_type.v1',
                'esi-skills.read_skills.v1',
                'esi-fleets.read_fleet.v1','esi-fleets.write_fleet.v1',
                'esi-clones.read_implants.v1'],
        userAgent: 'express 4.9.5, eve-sso, tdf-waitlist 1.0',
        baseSSOUrl: "login.eveonline.com"
};

exports.data = {
        directory: "data",
        sessionSecret: "DEKvRmdcQz63mJq6rkR9gVDGJWN8SK48Z123pYK",
	mongoDbURL: "mongodb+srv://waitlist:oQcqLQEDidz2QnYT@eve-tdf-waitlist-f8bbz.mongodb.net/test?retryWrites=true&w=majority",
        mongoDbName: "eve-tdf-waitlist",
	whitelistLevel: 0
}

exports.fleet = {
        comms: [{
                name: "TDF TS - HQ FLEET 1",
                url: "ts3server://178.32.216.14/?password=armor"
        },{
                name: "TDF TS - HQ FLEET 2",
                url: "ts3server://178.32.216.14/?password=armor"
        },{
                name: "TDF TS - HQ FLEET 3",
                url: "ts3server://178.32.216.14/?password=armor"
        },{
                name: "TDF TS - AS FLEET 1",
                url: "ts3server://178.32.216.14/?password=armor"
        },{
                name: "TDF TS - AS FLEET 2",
                url: "ts3server://178.32.216.14/?password=armor"
        },{
                name: "TDF TS - VG FLEET 1",
                url: "ts3server://178.32.216.14/?password=armor"
        },{
                name: "TDF TS - VG FLEET 2",
                url: "ts3server://178.32.216.14/?password=armor"
        },]
}

exports.settings = {
        port: 443,
        https: true,
        cert: 'cert/tdf-dev.cert.txt',
        key: 'cert/tdf-dev.key.txt'
}

//roleNumeric titles, use null to disable. Leave index0 as member
exports.userPermissions =  ["Member", "FC-Trainee", null, "Fleet Commander", "HQ FC", "Council"];


exports.fleetCompFilters = {
	cqc: [17740,641],//Vindicator, Megathron
	shark: [47271],//Leshak
	sniper: [17736,28659],//Nightmare, Paladin
	booster: [22442,22448,22444,22446],//Eos, Absolution, Sleipnir, Vulture
        logi: [11987,11989,33472]//Guardian, Oneiros, Nestor
}

exports.browserNotification = {
        "sound": '/includes/alarm.mp3',
        "appName": 'TDF Waitlist',
        "imgUrl": '/includes/img/logo.png'
}

