
/*
            {N:74,T:'alarmAboutIncomingFire', FlagsRequired:{gotHitFlag:true}, minAlarm: 5, alarmRadius: 220},
            {N:73,T:'avoidIncomingFire', FlagsRequired:{gotHitFlag:true}, minAlarm: 2, avoidTime: 12},
            {N:72,T:'avoidIncomingFire', FlagsRequired:{incomingFireFlag:true}, minAlarm: 5, avoidTime: 12},

            {N:67,T:'lowerSpeedForResources', minAlarm: 0, wantedRes: 'misslePack', wantedResR: 20, gotoSpeed: 1},
            {N:66,T:'speedUpIfResources', minAlarm: 0, wantedRes: 'misslePack', wantedResR: 20, gotoSpeed: 2},
            {N:61,T:'speedUp', maxSpeedLvl: 1, gotoSpeed: 2},

            {N:55,T:'alarmAboutSpottedEnemy', minAlarm: 5, alarmRadius: 250},
            {N:45,T:'lowerAlarmLvl', minAlarm: 5, minEnemyDontSeen: 750, gotoAlarm: 4, goToSpotLvl: 2},
            {N:35,T:'followEnemy', minAlarm: 5, goToSpotLvl: 3 },
            {N:23,T:'stayInRegion', X:0, Y:0, Radius: 1700 },
            {N:18,T:'changeManouver2', maxAlarm: 4, minAlarm: 3, straightMin: 20, straightPlus: 80, turnMin: 10, turnPlus: 80  },
            {N:15,T:'changeManouver', maxAlarm: 3, straightMin: 60, straightPlus: 100, turnMin: 30, turnPlus: 70  },
            {N:1, T:'goStraight', straightMin: 200, straightPlus: 100 },
*/



BBAdata['MapMODS']={
    sitOnMap:{
        toDo:[
            {N:22,T:'stayInRegion', X:0, Y:0, Radius: 700 },
            {N:1, T:'goStraight', straightMin: 200, straightPlus: 100 },
        ],
    },
    colorGold:{
        view:{Color: 'gold'},
    },
    greenColor:{
        view:{Color: '#00cc00'},
    },
    orangeColor:{
        view:{Color: '#ffcc00'},
    },
    violetColor:{
        view:{Color: '#440088'},
    },
    whiteColor:{
        view:{Color: 'white'},
    },
    allAvoid:{
        who:['carras','hajaher','cloaker','dregos','hiacynt','zarahiash','vitotas','slimensen','slimensen1','slimensen2','slimensen3','slimensen4'],
        toDo:[
            {N:74,T:'alarmAboutIncomingFire', FlagsRequired:{gotHitFlag:true}, minAlarm: 5, alarmRadius: 150},
            {N:73,T:'avoidIncomingFire', FlagsRequired:{gotHitFlag:true}, minAlarm: 2, avoidTime: 12},
            {N:72,T:'avoidIncomingFire', FlagsRequired:{incomingFireFlag:true}, minAlarm: 5, avoidTime: 12},
        ],
    },
    healthSplit:{
        who:['carras'],
        weapon:[{t:'healthSplit', gunSpeed: 5, lastShot: 100, minHealth: 1, Radius: 200, doNextWeapon: true}],
    },
    carras25health:{
        who:['carras'],
        lifeM:25,
        life:25,
    },
    greenSquadMembers:{
        squadSchemeType: {data:{SquadMods:['greenColor']}},
        MapModActions:[{t:'tryBuildSquads'}],
    },
    orhenesShipsI:{
        who:['orhenes'],
        view:{Color: 'white'},
        squadSchemeType: {t:'loose', count: 8, data:{type:'enemyShip', objectType:'iskariot', SquadMods:['whiteColor']}},
        MapModActions:[{t:'tryBuildSquads'}],
    },
};
