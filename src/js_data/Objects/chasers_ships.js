

BBAdata.ObjectData.carras={
    LoadMods:{
        enemyShip2:{},
        viewLetterSmall:{view:{Letter: 'A', LetterSize: 16}},
    },

    lifeM: 5,
    radius: 15,

    WeaponTypes: {},
    Weapons:{
        single:{t:'single', DMG:{Dmg:1,T:'normal'}, Dec: 50, Speed: 10, gunSpeed: 15, lastShot: 0, minDistToEnemy:450},
    },

    Manouver: 'goStraight',

    TheState: 'patroling',
    TheStateLists: {
        attacking: {
            shot:{T:'shot', WeaponTypes: {single:1}},
            lookAround:{T:'lookAround', LookType:'fighting'},
        },
        patroling: {
            lookAround:{T:'lookAround', LookType:'curious'},
        }
    },

    ThinkNow: 'followRoute',
    ThinkTick: 0,
    Thinks: {
        followEnemy2:{T:'followEnemy', S:{runningAway:1}, Time: 200, TimePlus: 200, Radius: 50, MaxEnemyDist: 200, AnglePlus:180},
        followEnemy:{T:'followEnemy', S:{attacking:1}, Time: 200, TimePlus: 200, Radius: 50},
        // changeManouver:{S:{patroling:1}, D:[
        //     {M:'goStraight', Time:80, TimePlus:40, notTwice:1},
        //     {M:'turnLeft', Time:20, TimePlus:50, maxTurn:180},
        // ]},
        followRoute:{T:'followRoute', S:{patroling:1}, Route:'R2'},
    },

    // doingNow: 'changeManouver',
    // toDo: [
    //     {N:55,T:'alarmAboutSpottedEnemy', minAlarm: 5, alarmRadius: 250},
    //     {N:45,T:'lowerAlarmLvl', minAlarm: 5, minEnemyDontSeen: 750, gotoAlarm: 4, goToSpotLvl: 2},
    //     {N:35,T:'followEnemy', minAlarm: 5, goToSpotLvl: 3 },
    //     {N:18,T:'changeManouver2', maxAlarm: 4, minAlarm: 3, straightMin: 20, straightPlus: 80, turnMin: 10, turnPlus: 80  },
    //     {N:15,T:'changeManouver', maxAlarm: 3, straightMin: 60, straightPlus: 100, turnMin: 30, turnPlus: 70  },
    // ],

    SpeedArr:{
        slow:   {S: {SV:'speed',Add:-2}, T:0.7},
        normal: {S: {SV:'speed'}, T:2.5},
        max:    {S: {SV:'speed',Add:3}, T:2.5}
    },
    LookTick: 8,
    LookType: false,
    LookArr: {
        sleepy: {T:'single', ticks: 20, Rad: {SV:'spotRad'}},
        curious: {T:'double', ticks: 7, Rad: {SV:'spotRad'}, Rad2: {SV:'spotRad2'}, Angle2: {SV:'spotAngle2'}},
        fighting: {T:'single', ticks: 20, Rad: {SV:'spotRad2'}}
    },

    shipVariables:{
        speed: {Const: 6.5, Rand: 1},
        spotRad: {Const: 80, RandInt: 80},
        spotRad2: {Const: 300, RandInt: 200},
        spotAngle2: {Const: 30, RandInt: 30}
    },
};
