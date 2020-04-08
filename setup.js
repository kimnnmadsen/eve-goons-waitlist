exports.oauth = {
        clientID: "40a82d63f8b14174b43dd076d347453a",
        secretKey: "IpaMeqTpKsPuBntqx5xogOyh7dWk9oAl9kQ9KU7v",
        callbackURL: "https://tdf.n3it.xyz:1888/auth/provider/callback",
        scopes: ['publicData','esi-location.read_location.v1','esi-location.read_ship_type.v1','esi-skills.read_skills.v1','esi-skills.read_skillqueue.v1','esi-fleets.read_fleet.v1','esi-fleets.write_fleet.v1','esi-ui.open_window.v1','esi-ui.write_waypoint.v1','esi-location.read_online.v1','esi-clones.read_implants.v1'],
        userAgent: 'express 4.9.5, eve-sso, tdf-incursionauth 1.0',
        baseSSOUrl: "login.eveonline.com"
};

exports.data = {
        directory: "data", //Where data will be stored
        sessionSecret: "DEKvRmdcQz63mJq6rkR9gVDGJWN8SK48ZpYK",
//	mongoDbURL: "mongodb://localhost:27017",
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
        http: 3000
}

//roleNumeric titles, use null to disable. Leave index0 as member
exports.userPermissions =  ["Member", "FC-Trainee", null, "Fleet Commander", "HQ FC", "Council"];


exports.fleetCompFilters = {
	cqc: [17740,641],//Vindicator, Megathron
	shark: [47271],//Leshak
	sniper: [17736,28659],//Nightmare, Paladin
	booster: [22442,22448,22444,22446],//Eos, Absolution, Sleipnir, Vulture
//        caps: [23757,37604,23915,37605,23911,37607,24483,37606,42242,45645],//Archon, Apostle, Chimera, Minokawa, Thanatos, Ninazu, Nidhoggur, Lif, Dagon, Loggerhead
//        supers: [23919,11567,23917,3764,23913,671,22852,23773,42241,3514,42125,42126,45649],//Aeon, Avatar, Wyvern, Leviathan, Nyx, Erebus, Hel, Ragnarok, Molok, Revenant, Vendetta, Vanquisher, Komodo
        logi: [11987,11989,33472]//Guardian, Oneiros, Nestor
}

exports.browserNotification = {
        "sound": '/includes/alarm.mp3',
        "appName": 'TDF Waitlist',
        "imgUrl": '/includes/img/logo.png'
}

