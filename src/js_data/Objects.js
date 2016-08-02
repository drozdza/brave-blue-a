BBAdata['ObjectDatas']={
    healing_missle:{
        view:{
            Letter: 'J',
            LetterSize: 12,
            Color: '#0f0',
            Angle: 180,
        },

        lifeM: 1,
        speed: 13,
        speedT: 20,
        Power: 1,
        doingTime: 230,
        onHit:{},
        toDo: [{T:'expire'}],
        Manouver: 'followEntity',
        Flags:{},
    },
    missle:{
        view:{
            Letter: 'Y',
            LetterSize: 12,
            Color: '#ff0',
            Angle: 0,
        },

        lifeM: 1,
        speed: 15,
        speedT: 3,
        Power: 1,
        doingTime: 200,
        toDo: [{T:'expire'}],
        Manouver: 'followEntity',
        Flags:{},
    },
    bullet_bomb:{
        view:{
            Letter: 'P',
            LetterSize: 12,
            Color: '#ff0',
            Angle: 0,
        },

        lifeM: 1,
        speed: 15,
        speedT: 2,
        Power: 1,
        doingTime: 35,
        toDo: [{T:'expire'}],
        Manouver: 'goStraight',
        Flags:{},
    },
    space_mine:{
        view:{
            Letter: 'R',
            LetterSize: 10,
            Color: '#ff0',
            Angle: 0,
        },

        speed:0,
        angle:0,
        radius:6,
        dec:0,
        ammo:0,
        toDo:0,

        lifeM: 1,

        explosivePreset: 'NailedMine2',

        squadScheme: {
            0:{ angle:0, radius:0, id:-1, placementT:'directPlaces', make: {What:{RoundField:1},objData:{ angle: 0, radius: 150, colorInactive: false, colorActive: 'rgba(255,0,0,0.4)', dontHit:['B','BE','E','M','ME','A']}}},
            1:{ angle:0, radius:0, id:-1, placementT:'directPlaces', make:{What:{RoundField:1},objData:{angle: 0, radius: 150, colorInactive: false, colorActive: 'rgba(255,0,0,0.4)', dontHit:['B','BE','E','M','ME','A']}}}
        },

        Flags:{}
    },
    star:{
        view:{
            LIBpath:'StarPath',
            PathSize:30,
            Color:'white',
            Angle:0,
            HitPattern:'StarHit',
            onBackground: 1,
        },

        SlowDown: 3,
        lifeM:6,
        Flags:{},
        mapType:'A',
    },
    starS:{
        extends:'star',
        mergeArrays:{view:{PathSize:18}},
        radius: 9,
    },
    starM:{
        extends:'star',
        mergeArrays:{view:{PathSize:60}},
        radius: 30,
        lifeM: 10,
    },
    starL:{
        extends:'star',
        mergeArrays:{view:{PathSize:80}},
        radius: 40,
        lifeM: 17,
    },
    Gstar:{
        view:{
            LIBpath:'StarPath',
            PathSize:170,
            Color:'yellow',
            Angle:0,
            XY:180,
            onBackground: 1,
        },

        radius: 90,
        undestructible: 1,
        bounceType: 'straight',
        Flags:{},
        mapType:'A',
    },
    RoundField:{
        view:{
            circleColor:[255,255,255,0.2],
            onBackground: 1,
        },
        radius: 50,
        undestructible: 1,
    },
    SquareField:{
        view:{
            color: 'red',
            onBackground: 1,
        },
        radius: 50,
        squareAngle: 0,
        squareLen: 50,
        squareWidth: 15,
        undestructible: 1,
    },
    ConeField:{
        view:{
            color: 'red',
            onBackground: 1,
        },

        radius: 50,
        coneAngle: 180,
        coneRad2: 50,
        angle: 0,
        undestructible: 1,
        Flags:{},
    },


    enemyShip:{
        TT: 'enemy',
        lastSpeedT: 0,
        doSquad: -1,//??
        dec: 50,    //??
        ammo: -50,    //??
        radius: 15,
        Flags:{
            spotEnemyFlag: false,
            gotHitFlag: false,
            heardExplosionFlag: false,
            newOrderFlag: false,
            awareAboutEnemy: false,
            lastSeenEnemy: -1
        },

        Res:{},
        toDo:[],
        doingTime: -1,
        Manouver: 'goStraight',

        alarmLvl: 2,
        speedLvl: 2,
        spotLvl: 2,
    },
    carras:{
        view:{
            Letter: 'A',
            LetterSize: 16,
            Color: 'red',
            Angle: 0,
            HitPattern: 'HullFire_20',
        },

        lifeM: 5,

        weapon:[{t:'single', Power:1, Dec: 50, Speed: 10, gunSpeed: 15, lastShot: 100, maxSpeed: 2, minAlarm: 5}],

        doingNow: 'changeManouver',
        doingTime: -1,
        Manouver: 'goStraight',
        toDo: [
            {N:55,T:'alarmAboutSpottedEnemy', minAlarm: 5, alarmRadius: 250},
            {N:45,T:'lowerAlarmLvl', minAlarm: 5, minEnemyDontSeen: 750, gotoAlarm: 4, goToSpotLvl: 2},
            {N:35,T:'followEnemy', minAlarm: 5, goToSpotLvl: 3 },
            {N:23,T:'stayInRegion', X:0, Y:0, Radius: 1700 },
            {N:18,T:'changeManouver2', maxAlarm: 4, minAlarm: 3, straightMin: 20, straightPlus: 80, turnMin: 10, turnPlus: 80  },
            {N:15,T:'changeManouver', maxAlarm: 3, straightMin: 60, straightPlus: 100, turnMin: 30, turnPlus: 70  },
        ],

        speedArr:[0,
            {S: {shipVar:'speed',Add:-2}, T:0.7},
            {S: {shipVar:'speed'}, T:2.5},
            {S: {shipVar:'speed',Add:3}, T:2.5}
        ],
        spotTick: 8,
        spotArr: [0,
            {T:'single',Ref: 20, Rad: {shipVar:'spotRad'}},
            {T:'double',Ref: 20, Rad: {shipVar:'spotRad'}, Rad2: {shipVar:'spotRad2'}, Angle2: {spipVar:'spotAngle2'}},
            {T:'single',Ref: 20, Rad: {shipVar:'spotRad2'}}
        ],

        shipVariables:{
            speed: {Const: 6.5, Rand: 1},
            spotRad: {Const: 80, RandInt: 80},
            spotRad2: {Const: 300, RandInt: 200},
            spotAngle2: {Const: 30, RandInt: 30}
        },
    },
    muerto:{
        view:{
            Letter: 'M',
            LetterSize: 40,
            Color: 'red',
            Angle: 0,
            HitPattern: 'HullFire_40',
        },

        lifeM: 9,
        radius: 20,

        weapon:[
            {t:'rose', Power:1, Dec: 50, Speed: 10, gunSpeed: 50, lastShot: 100, AtOnce: 9, RoseAngle: 4, maxSpeed: 2, minAlarm: 5, minDistToEnemy: 400}
        ],

        doingNow: 'changeManouver',
        doingTime: -1,
        Manouver: 'goStraight',
        toDo: [
            {N:23,T:'stayInRegion', X:-800, Y:0, Radius: 500 },
            {N:15,T:'changeManouver', maxAlarm: 3, straightMin: 60, straightPlus: 100, turnMin: 30, turnPlus: 70  },
        ],

        speedArr:[0,
            {S:1, T:1},
            {S:3, T:2},
            {S:6, T:2}
        ],
        spotTick: 8,
        spotArr: [0,
            {T:'single',Ref: 15, Rad: {shipVar:'spotRad'}},
            {T:'double',Ref: 10, Rad: {shipVar:'spotRad'}, Rad2: {shipVar:'spotRad2'}, Angle2: {spipVar:'spotAngle2'}},
            {T:'single',Ref: 45, Rad: {shipVar:'spotRad2'}}
        ],

        shipVariables:{
            spotRad: {Const: 80, RandInt: 80},
            spotRad2: {Const: 300, RandInt: 200},
            spotAngle2: {Const: 30, RandInt: 30}
        },

    },
    nemezis:{
        view:{
            Letter: 'N',
            LetterSize: 40,
            Color: 'red',
            Angle: 0,
            HitPattern: 'HullFire_40',
        },

        lifeM: 4,
        radius: 20,

        Bombs:[{
            onHitDieExpire:    {Do:'explode',Power: 4, Dist: 35},
        }],

        weapon:[{t:'bomb', Speed: 10, Dec: 50, BombType: 0, gunSpeed: 40, lastShot: 100, maxSpeed: 2, minAlarm: 5, minDistToEnemy: 400}],

        doingNow: 'changeManouver',
        doingTime: -1,
        Manouver: 'goStraight',
        toDo: [
            {N:15,T:'changeManouver', maxAlarm: 3, straightMin: 60, straightPlus: 100, turnMin: 30, turnPlus: 70},
        ],

        speedArr:[0,
            {S:1, T:1},
            {S:3, T:2},
            {S:6, T:2}
        ],
        spotTick: 8,
        spotArr: [0,
            {T:'single',Ref: 15, Rad: {shipVar:'spotRad'}},
            {T:'double',Ref: 10, Rad: {shipVar:'spotRad'}, Rad2: {shipVar:'spotRad2'}, Angle2: {spipVar:'spotAngle2'}},
            {T:'single',Ref: 45, Rad: {shipVar:'spotRad2'}}
        ],

        shipVariables:{
            spotRad: {Const: 80, RandInt: 80},
            spotRad2: {Const: 300, RandInt: 200},
            spotAngle2: {Const: 30, RandInt: 30}
        },
    },
    warastein:{
        view:{
            Letter: 'W',
            LetterSize: 40,
            Color: 'red',
            Angle: 0,
            HitPattern: 'HullFire_40',
        },

        lifeM: 11,
        radius: 23,

        Bombs:[{ explosivePreset:'WarasteinExploCone' }],

        weapon:[{t:'bomb', Speed: 10, Dec: 12, BombType: 0, gunSpeed: 140, lastShot: 100, maxSpeed: 2, makeAction: {Manuover: 'goStraight', doingTime:55, gotoSpeed:1}, minAlarm: 5, minDistToEnemy: 400}],

        doingNow: 'changeManouver',
        doingTime: -1,
        Manouver: 'goStraight',
        toDo: [
            {N:61,T:'changeSpeed', maxSpeedLvl: 1, gotoSpeed: 2},
            {N:15,T:'changeManouver', maxAlarm: 3, straightMin: 60, straightPlus: 100, turnMin: 30, turnPlus: 70}
        ],

        speedArr:[0,
            {S:3, T:4},
            {S:7, T:3},
            {S:7, T:3}
        ],
        spotTick: 8,
        spotArr: [0,
            {T:'single',Ref: 15, Rad: {shipVar:'spotRad'}},
            {T:'double',Ref: 10, Rad: {shipVar:'spotRad'}, Rad2: {shipVar:'spotRad2'}, Angle2: {spipVar:'spotAngle2'}},
            {T:'single',Ref: 45, Rad: {shipVar:'spotRad2'}}
        ],

        shipVariables:{
            spotRad: {Const: 120, RandInt: 80},
            spotRad2: {Const: 300, RandInt: 200},
            spotAngle2: {Const: 30, RandInt: 30}
        },

    },
    dandares:{
        view:{
            Letter: 'D',
            LetterSize: 40,
            Color: 'red',
            Angle: 270,
            HitPattern: 'HullFire_40',
        },

        lifeM: 7,
        radius: 20,

        shieldDimmune:true,
        prodSquad: 5,
        Res: {'prodSquad': {M:5,T:0}},
        weapon:[
            {t:'refilResource', resource: 'prodSquad', gunSpeed: 22, maxSpeed: 2, doNextWeapon: true},
            {t:'healSquad', gunSpeed: 0, lastShot: 0, usedRes: 'prodSquad', usedResR: 1, maxSpeed: 2, doNextWeapon: true},
            {t:'produceSquad', gunSpeed: 0, lastShot: 0, usedRes: 'prodSquad', usedResR: 1, maxSpeed: 2, doNextWeapon: true},
        ],

        squadSchemeType: {t:'directPlaces', count: 16, radius: 100, placementT:'round', placement: 'oddFirst', makeFirst: 8, life: 3, data:{type:'shieldBlob', lifeM:6}},
        squadScheme: [],

        doingNow: 'changeManouver',
        doingTime: -1,
        Manouver: 'goStraight',

        speedArr:[0,
            {S:1, T:0.5},
            {S:4, T:2},
            {S:8, T:2}
        ],
        spotTick: 8,
        spotArr: [0,
            {T:'single',Ref: 15, Rad: {shipVar:'spotRad'}},
            {T:'double',Ref: 10, Rad: {shipVar:'spotRad'}, Rad2: {shipVar:'spotRad2'}, Angle2: {spipVar:'spotAngle2'}},
            {T:'single',Ref: 45, Rad: {shipVar:'spotRad2'}}
        ],

        shipVariables:{
            spotRad: {Const: 80, RandInt: 80},
            spotRad2: {Const: 300, RandInt: 200},
            spotAngle2: {Const: 30, RandInt: 30}
        },
    },
    shieldBlob:{
        view:{
            Letter: '#',
            LetterSize: 40,
            colorFill:[0,255,200,1],
            Angle: 0,
            HitPattern:'ShieldBlobHit',
            backgroundCircle: 21,
            colorCircle:[0,200,100,1],
        },

        SlowDown: 3,
        lifeM: 3,
        radius: 21,
    },
    royale:{
        view:{
            Letter: 'R',
            LetterSize: 40,
            Color: 'red',
            Angle: 0,
            HitPattern: 'HullFire_40',
        },

        lifeM: 16,
        radius: 20,

        weapon:[
            {t:'missleCrown', Power:1, Dec: 95, Speed: 12, gunSpeed: 120, lastShot: 0, minDistToEnemy: 400},
        ],

        doingNow: 'changeManouver',
        doingTime: -1,
        Manouver: 'goStraight',
        toDo: [
            {N:15,T:'changeManouver', maxAlarm: 5, straightMin: 60, straightPlus: 100, turnMin: 30, turnPlus: 70  },
        ],

        speedArr:[0,
            {S:1.2, T:2},
            {S:3, T:2},
            {S:6, T:2}
        ],
        spotTick: 8,
        spotArr: [0,
            {T:'single',Ref: 15, Rad: {shipVar:'spotRad'}},
            {T:'double',Ref: 10, Rad: {shipVar:'spotRad'}, Rad2: {shipVar:'spotRad2'}, Angle2: {spipVar:'spotAngle2'}},
            {T:'single',Ref: 45, Rad: {shipVar:'spotRad2'}}
        ],

        shipVariables:{
            spotRad: {Const: 180, RandInt: 80},
            spotRad2: {Const: 400, RandInt: 200},
            spotAngle2: {Const: 40, RandInt: 30}
        },
    },
    edison:{
        view:{
            Letter: 'E',
            LetterSize: 40,
            Color: 'red',
            Angle: 0,
            HitPattern: 'HullFire_40',
        },

        lifeM: 9,
        radius: 20,

        fieldCharges: 10,
        Res: {'fieldCharges': {M:10,T:0}},
        weapon:[
            {t:'refilResource', resource: 'fieldCharges', gunSpeed: 16, maxSpeed: 2, FlagsRequired:{squadFull:false}, doNextWeapon: true},
            {t:'produceSquad', gunSpeed: 1, lastShot: 100, usedRes:'fieldCharges', usedResR: 10, maxSpeed: 2, FlagsRequired:{squadFull:false }},
        ],

        squadScheme: [{
            type: 'RoundField',
            radius: 0,
            angle: 0,
            Oid: -1,
            placementT:'directPlaces',
            objData: {fieldAnim: 'ElectricityField', radius: 130, OneTimeEffect: 1, OneTimeOffset: 3, OneTimeDamage: 4, dontHit:['B','BE','E','M','ME','A'], fieldAnimMoving:true}
        }],

        doingNow: 'changeManouver',
        doingTime: -1,
        Manouver: 'goStraight',

        speedArr:[0,
            {S:1.5, T:3},
            {S:3, T:6},
            {S:5, T:6}
        ],
        spotTick: 8,
        spotArr: [0,
            {T:'single',Ref: 15, Rad: {shipVar:'spotRad'}},
            {T:'double',Ref: 10, Rad: {shipVar:'spotRad'}, Rad2: {shipVar:'spotRad2'}, Angle2: {spipVar:'spotAngle2'}},
            {T:'single',Ref: 45, Rad: {shipVar:'spotRad2'}}
        ],

        shipVariables:{
            spotRad: {Const: 80, RandInt: 80},
            spotRad2: {Const: 300, RandInt: 200},
            spotAngle2: {Const: 30, RandInt: 30}
        },

    },
    hiacynt:{
        view:{
            Letter: 'H',
            LetterSize: 20,
            Color: 'red',
            Angle: 0,
            HitPattern: 'HullFire_20',
        },

        lifeM: 4,

        shieldBlobProd: 0,
        Res: {'shieldBlobProd': {M:10,T:0}},
        weapon:[
            {t:'refilResource', resource: 'shieldBlobProd', gunSpeed: 20, maxSpeed: 2, doNextWeapon: true},
            {t:'changeAction', minSpeed: 3, minDistToEnemy: 50, makeAction: {doingNow:'shooting', gotoSpeed:2, doingTime:31, Manouver:'goStraight'}, doingNow:'followEnemy', usedRes:'shieldBlobProd', usedResR: 10},
            {t:'shotShieldBlob', RandAngle:20, Dec: 25, Speed: 16, gunSpeed: 3, lastShot: 0, doingNow:'shooting'},
        ],

        doingNow: 'changeManouver',
        doingTime: -1,
        Manouver: 'goStraight',
        toDo: [
            {N:55,T:'followEnemy', minAlarm: 5, usedRes:'shieldBlobProd', gotoSpeed: 3, usedResR: 10},
            {N:18,T:'changeManouver2', maxAlarm: 4, minAlarm: 3, straightMin: 20, straightPlus: 80, turnMin: 10, turnPlus: 80  },
            {N:15,T:'changeManouver', maxAlarm: 3, straightMin: 60, straightPlus: 100, turnMin: 30, turnPlus: 70  },
        ],

        speedArr:[0,
            {S:2, T:1},
            {S:5, T:2},
            {S:10,T:2}
        ],
        spotTick: 8,
        spotArr: [0,
            {T:'single',Ref: 15, Rad: {shipVar:'spotRad'}},
            {T:'double',Ref: 10, Rad: {shipVar:'spotRad'}, Rad2: {shipVar:'spotRad2'}, Angle2: {spipVar:'spotAngle2'}},
            {T:'single',Ref: 45, Rad: {shipVar:'spotRad2'}}
        ],

        shipVariables:{
            spotRad: {Const: 80, RandInt: 80},
            spotRad2: {Const: 300, RandInt: 200},
            spotAngle2: {Const: 30, RandInt: 30}
        },
    },
    iskariot:{
        view:{
            Letter: 'I',
            LetterSize: 20,
            Color: 'red',
            Angle: 0,
            HitPattern: 'HullFire_20',
        },

        lifeM: 3,

        jump: 3,
        Res: {'jump': {M:3,T:0}},
        weapon:[
            {t:'refilResource', resource: 'jump', gunSpeed: 300, maxSpeed: 2, doNextWeapon: true},
            {t:'double2', Power:1, Dec: 35, Speed: 12, gunSpeed: 20, lastShot: 100, maxSpeed: 2, minAlarm: 5},
        ],

        doingNow: 'changeManouver',
        doingTime: -1,
        Manouver: 'goStraight',
        toDo: [
            {N:55,T:'alarmAboutSpottedEnemy', minAlarm: 5, alarmRadius: 250},
            {N:45,T:'lowerAlarmLvl', minAlarm: 5, minEnemyDontSeen: 750, gotoAlarm: 4, goToSpotLvl: 2},
            {N:35,T:'followEnemy', minAlarm: 5, goToSpotLvl: 3 },
            {N:23,T:'stayInRegion', X:0, Y:0, Radius: 1700 },
            {N:18,T:'changeManouver2', maxAlarm: 4, minAlarm: 3, straightMin: 20, straightPlus: 80, turnMin: 10, turnPlus: 80  },
            {N:15,T:'changeManouver', maxAlarm: 3, straightMin: 60, straightPlus: 100, turnMin: 30, turnPlus: 70  },
        ],

        speedArr:[0,
            {S: {shipVar:'speed',Add:-5}, T:{shipVar:'speedT',Add:-0.6}},
            {S: {shipVar:'speed'}, T:{shipVar:'speedT'}},
            {S: {shipVar:'speed',Add:4}, T:{shipVar:'speedT'}}
        ],
        spotTick: 8,
        spotArr: [0,
            {T:'single',Ref: 20, Rad: {shipVar:'spotRad'}},
            {T:'double',Ref: 20, Rad: {shipVar:'spotRad'}, Rad2: {shipVar:'spotRad2'}, Angle2: {spipVar:'spotAngle2'}},
            {T:'single',Ref: 20, Rad: {shipVar:'spotRad2'}}
        ],

        shipVariables:{
            speed: {Const: 7, Rand: 1.5},
            speedT: {Const: 2.5, Rand: 1},
            spotRad: {Const: 80, RandInt: 80},
            spotRad2: {Const: 300, RandInt: 200},
            spotAngle2: {Const: 30, RandInt: 30}
        },
    },
    tartaros:{
        view:{
            Letter: 'T',
            LetterSize: 60,
            Color: 'red',
            Angle: 0,
            HitPattern: 'HullFire_40',
        },

        lifeM: 9,
        radius: 27,

        weapon:[
            {t:'double', Speed:12, Dec:30, Power:1, doingNow:'shooting', gunSpeed:1,  maxSpeed:2},
            {t:'changeAction', makeAction: {Manuover:'goStraight', doingNow:'shooting', doingTime:10, doNotInterupt:true}, gunSpeed: 110, lastShot: 100,  minAlarm: 5, minDistToEnemy: 400}
        ],

        doingNow: 'changeManouver',
        doingTime: -1,
        Manouver: 'goStraight',
        toDo: [
            {N:15,T:'changeManouver', maxAlarm: 3, straightMin: 60, straightPlus: 100, turnMin: 30, turnPlus: 70}
        ],

        speedArr:[0,
            {S:3, T:3},
            {S:5, T:6},
            {S:8, T:6}
        ],
        spotTick: 8,
        spotArr: [0,
            {T:'single',Ref: 15, Rad: {shipVar:'spotRad'}},
            {T:'double',Ref: 10, Rad: {shipVar:'spotRad'}, Rad2: {shipVar:'spotRad2'}, Angle2: {spipVar:'spotAngle2'}},
            {T:'single',Ref: 45, Rad: {shipVar:'spotRad2'}}
        ],

        shipVariables:{
            spotRad: {Const: 80, RandInt: 80},
            spotRad2: {Const: 300, RandInt: 200},
            spotAngle2: {Const: 30, RandInt: 30}
        },
    },
    belzebub:{
        view:{
            Letter: 'B',
            LetterSize: 40,
            Color: 'red',
            Angle: 90,
            HitPattern: 'HullFire_40',
        },

        lifeM: 9,
        radius: 20,


        Bombs:[{
            onHit: {Do:'explode',Power: 4, Dist: 35},
            onDie: {Do:'explode',Power: 4, Dist: 35},
            onExpire: {Do:'explode',Power: 4, Dist: 35}
        }],

        weapon:[
            {t:'dropSpaceMine', ShotMine: true, BombType: 0, gunSpeed: 120, lastShot: 100,  minAlarm: 5, minDistToEnemy: 260},
            {t:'dropSpaceMine', gunSpeed: 750, BombType: 0, lastShot: 100,  maxAlarm: 4},

        ],

        doingNow: 'changeManouver',
        doingTime: -1,
        Manouver: 'goStraight',
        toDo: [
            {N:15,T:'changeManouver', maxAlarm: 3, straightMin: 60, straightPlus: 100, turnMin: 30, turnPlus: 70}
        ],

        speedArr:[0,
            {S:3, T:3},
            {S:5, T:3},
            {S:8, T:3}
        ],
        spotTick: 8,
        spotArr: [0,
            {T:'single',Ref: 15, Rad: {shipVar:'spotRad'}},
            {T:'double',Ref: 10, Rad: {shipVar:'spotRad'}, Rad2: {shipVar:'spotRad2'}, Angle2: {spipVar:'spotAngle2'}},
            {T:'single',Ref: 45, Rad: {shipVar:'spotRad2'}}
        ],

        shipVariables:{
            spotRad: {Const: 80, RandInt: 80},
            spotRad2: {Const: 400, RandInt: 200},
            spotAngle2: {Const: 30, RandInt: 30}
        },
    },
    koriaz:{
        view:{
            Letter: 'K',
            LetterSize: 16,
            Color: 'red',
            Angle: 270,
            HitPattern: 'HullFire_20',
        },

        lifeM: 7,
        radius: 10,

        shieldDimmune:true,
        weapon:[
            {t:'addShield', Radius: 500, shieldTime: 15, gunSpeed: 12, lastShot: 100},
        ],

        doingNow: 'changeManouver',
        doingTime: -1,
        Manouver: 'goStraight',
        toDo: [
            {N:15,T:'changeManouver', maxAlarm: 5, straightMin: 60, straightPlus: 100, turnMin: 30, turnPlus: 70  },
        ],

        speedArr:[0,
            {S:2, T:1},
            {S:4, T:1},
            {S:5, T:1}
        ],
        spotTick: 8,
        spotArr: [0,
            {T:'single',Ref: 15, Rad: {shipVar:'spotRad'}},
            {T:'double',Ref: 10, Rad: {shipVar:'spotRad'}, Rad2: {shipVar:'spotRad2'}, Angle2: {spipVar:'spotAngle2'}},
            {T:'single',Ref: 45, Rad: {shipVar:'spotRad2'}}
        ],

        shipVariables:{
            spotRad: {Const: 180, RandInt: 80},
            spotRad2: {Const: 400, RandInt: 200},
            spotAngle2: {Const: 40, RandInt: 30}
        },
    },
    fariax:{
        view:{
            Letter: 'F',
            LetterSize: 40,
            Color: 'red',
            Angle: 0,
            HitPattern: 'HullFire_40',
        },

        lifeM: 9,
        radius: 20,

        weapon:[
            {t:'shootHealingMissle', Radius: 350, gunSpeed: 20, lastShot: 100},
        ],

        doingNow: 'changeManouver',
        doingTime: -1,
        Manouver: 'goStraight',
        toDo: [
            {N:15,T:'changeManouver', maxAlarm: 5, straightMin: 60, straightPlus: 100, turnMin: 30, turnPlus: 70  },
        ],

        speedArr:[0,
            {S:1, T:1},
            {S:2, T:1.5},
            {S:7, T:0.2}
        ],
        spotTick: 8,
        spotArr: [0,
            {T:'single',Ref: 15, Rad: {shipVar:'spotRad'}},
            {T:'double',Ref: 10, Rad: {shipVar:'spotRad'}, Rad2: {shipVar:'spotRad2'}, Angle2: {spipVar:'spotAngle2'}},
            {T:'single',Ref: 45, Rad: {shipVar:'spotRad2'}}
        ],

        shipVariables:{
            spotRad: {Const: 180, RandInt: 80},
            spotRad2: {Const: 400, RandInt: 200},
            spotAngle2: {Const: 40, RandInt: 30}
        },
    },
    dregos:{
        view:{
            Letter: 'U',
            LetterSize: 20,
            Color: 'red',
            Angle: 0,
            HitPattern: 'HullFire_20',
        },

        lifeM: 9,


        misslePack: 6,
        Res: {'misslePack': {M:6,T:0}},
        weapon:[
            {t:'refilResource', resource: 'misslePack', gunSpeed: 90, maxSpeed: 1, doNextWeapon: true},
            {t:'misslesDouble', gunSpeed: 140, lastShot: 100, usedRes: 'misslePack', usedResR: 1, minSpeed: 2, minAlarm: 5, minDistToEnemy: 500},
        ],

        doingNow: 'changeManouver',
        doingTime: -1,
        Manouver: 'goStraight',
        toDo: [
            {N:67,T:'lowerSpeedForResources', minAlarm: 0, wantedRes: 'misslePack', wantedResR: 1, gotoSpeed: 1},
            {N:66,T:'speedUpIfResources', minAlarm: 0, wantedRes: 'misslePack', wantedResR: 6, gotoSpeed: 2},
            {N:55,T:'alarmAboutSpottedEnemy', minAlarm: 5, alarmRadius: 250},
            {N:45,T:'lowerAlarmLvl', minAlarm: 5, minEnemyDontSeen: 750, gotoAlarm: 4, goToSpotLvl: 2},
            {N:35,T:'followEnemy', minAlarm: 5, goToSpotLvl: 3, minSpeedLvl: 2},
            {N:23,T:'stayInRegion', X:0, Y:0, Radius: 1700 },
            {N:18,T:'changeManouver2', maxAlarm: 4, minAlarm: 3, straightMin: 20, straightPlus: 80, turnMin: 10, turnPlus: 80  },
            {N:15,T:'changeManouver', maxAlarm: 3, straightMin: 60, straightPlus: 100, turnMin: 30, turnPlus: 70  },
        ],

        speedArr:[0,
            {S: {shipVar:'speed',Add:-5}, T:{shipVar:'speedT',Add:-2}},
            {S: {shipVar:'speed'}, T:{shipVar:'speedT'}},
            {S: {shipVar:'speed',Add:3}, T:{shipVar:'speedT'}}
        ],
        spotTick: 8,
        spotArr: [0,
            {T:'single',Ref: 15, Rad: {shipVar:'spotRad'}},
            {T:'double',Ref: 10, Rad: {shipVar:'spotRad'}, Rad2: {shipVar:'spotRad2'}, Angle2: {spipVar:'spotAngle2'}},
            {T:'single',Ref: 45, Rad: {shipVar:'spotRad2'}}
        ],

        shipVariables:{
            speed: {Const: 7, Rand: 1.5},
            speedT: {Const: 2.5, Rand: 1},
            spotRad: {Const: 80, RandInt: 80},
            spotRad2: {Const: 300, RandInt: 200},
            spotAngle2: {Const: 30, RandInt: 30}
        },
    },
    vitotas:{
        view:{
            Letter: 'V',
            LetterSize: 20,
            Color: 'red',
            Angle: 0,
            HitPattern: 'HullFire_20',
        },

        lifeM: 5,

        weapon:[
            {t:'laserAim', minDistToEnemy: 400, lastShot: 100, gunSpeed: 100, makeAction:{ doingNow:'laserAim', doingTime:30, Manouver: 'goStraight', doNotInterupt: true}},
            {t:'laserShoot', Power:4, Distance: 450, gunSpeed: 1, lastShot: 0, doingNow: 'laserAim', doingTime: 1, makeAction:{doingNow:'followEnemy', doingTime: 40, doNotInterupt: true}},
        ],

        squadScheme: [{
            type: 'SquareField',
            radius: 0,
            angle: 0,
            Oid: -1,
            placementT:'directPlaces',
            objData: {squareAngle: 20, squareLen: 450, squareWidth: 0.5, simpleFilling: 'red', dontHit:['B','BE','E','M','ME','A','R','P']}
        }],

        doingNow: 'changeManouver',
        doingTime: -1,
        Manouver: 'goStraight',
        toDo: [
            {N:55,T:'followEnemy', minAlarm: 5},
            {N:18,T:'changeManouver2', maxAlarm: 4, minAlarm: 3, straightMin: 20, straightPlus: 80, turnMin: 10, turnPlus: 80  },
            {N:15,T:'changeManouver', maxAlarm: 3, straightMin: 60, straightPlus: 100, turnMin: 30, turnPlus: 70  },
        ],

        speedArr:[0,
          {S: {shipVar:'speed',Add:-4}, T:{shipVar:'speedT'}},
          {S: {shipVar:'speed'}, T:{shipVar:'speedT'}},
          {S: {shipVar:'speed',Add:3}, T:{shipVar:'speedT'}}
        ],
        spotTick: 8,
        spotArr: [0,
            {T:'single',Ref: 15, Rad: {shipVar:'spotRad'}},
            {T:'double',Ref: 10, Rad: {shipVar:'spotRad'}, Rad2: {shipVar:'spotRad2'}, Angle2: {spipVar:'spotAngle2'}},
            {T:'single',Ref: 45, Rad: {shipVar:'spotRad2'}}
        ],

        shipVariables:{
            speed: {Const: 7.5, Rand: 1.5},
            speedT: {Const: 2, Rand: 2},
            spotRad: {Const: 80, RandInt: 80},
            spotRad2: {Const: 300, RandInt: 200},
            spotAngle2: {Const: 30, RandInt: 30}
        },
    },
    cloaker:{
        view:{
            Letter: 'C',
            LetterSize: 20,
            Color: 'red',
            Angle: 270,
            HitPattern: 'HullFire_20',
        },

        lifeM: 3,

        cloakingProd: 0,
        Res: {'cloakingProd': {M:10,T:0}},
        weapon:[
            {t:'refilResource', resource: 'cloakingProd', gunSpeed: 22, maxSpeed: 2, doNextWeapon: true},
            {t:'changeAction', minSpeed: 3, minDistToEnemy: 50, makeAction: {doingNow:'shooting', gotoSpeed:2, doingTime:8, Manouver:'goStraight', unCloak:true}, doingNow:'followEnemyCloaked', usedRes:'cloakingProd', usedResR: 10},
            {t:'single', Power:1, Dec: 25, Speed: 14, gunSpeed: 2, lastShot: 0, doingNow:'shooting'},
        ],

        doingNow: 'changeManouver',
        doingTime: -1,
        Manouver: 'goStraight',
        toDo: [
            {N:55,T:'followEnemyCloaked', minAlarm: 5, usedRes:'cloakingProd', usedResR: 10},
            {N:18,T:'changeManouver2', maxAlarm: 4, minAlarm: 3, straightMin: 20, straightPlus: 80, turnMin: 10, turnPlus: 80  },
            {N:15,T:'changeManouver', maxAlarm: 3, straightMin: 60, straightPlus: 100, turnMin: 30, turnPlus: 70  },
        ],

        speedArr:[0,
            {S:3, T:6},
            {S:6, T:6},
            {S:12, T:4}
        ],
        spotTick: 8,
        spotArr: [0,
            {T:'single',Ref: 15, Rad: {shipVar:'spotRad'}},
            {T:'double',Ref: 10, Rad: {shipVar:'spotRad'}, Rad2: {shipVar:'spotRad2'}, Angle2: {spipVar:'spotAngle2'}},
            {T:'single',Ref: 45, Rad: {shipVar:'spotRad2'}}
        ],

        shipVariables:{
            spotRad: {Const: 80, RandInt: 80},
            spotRad2: {Const: 300, RandInt: 200},
            spotAngle2: {Const: 30, RandInt: 30}
        },
    },
    hajaher:{
        view:{
            Letter: 'S',
            LetterSize: 20,
            Color: 'red',
            Angle: 0,
            HitPattern: 'HullFire_20',
        },

        lifeM: 6,

        weapon:[
            {t:'getAcurateAngle', Dec: 50, Speed: 10, maxSpeed: 2, minAlarm: 5, doNextWeapon:true},
            {t:'single', Power:1, Dec: 50, Speed: 10, gunSpeed: 25, lastShot: 100, maxSpeed: 2, minAlarm: 5}
        ],

        doingNow: 'changeManouver',
        doingTime: -1,
        Manouver: 'goStraight',
        toDo: [
            {N:55,T:'alarmAboutSpottedEnemy', minAlarm: 5, alarmRadius: 250},
            {N:45,T:'lowerAlarmLvl', minAlarm: 5, minEnemyDontSeen: 750, gotoAlarm: 4, goToSpotLvl: 2},
            {N:35,T:'followEnemy', minAlarm: 5, goToSpotLvl: 3 },
            {N:23,T:'stayInRegion', X:0, Y:0, Radius: 1700 },
            {N:18,T:'changeManouver2', maxAlarm: 4, minAlarm: 3, straightMin: 20, straightPlus: 80, turnMin: 10, turnPlus: 80  },
            {N:15,T:'changeManouver', maxAlarm: 3, straightMin: 60, straightPlus: 100, turnMin: 30, turnPlus: 70  },
        ],

        speedArr:[0,
            {S: {shipVar:'speed',Add:-4}, T:{shipVar:'speedT',Add:-1.5}},
            {S: {shipVar:'speed'}, T:{shipVar:'speedT'}},
            {S: {shipVar:'speed',Add:3}, T:{shipVar:'speedT'}}
        ],
        spotTick: 8,
        spotArr: [0,
            {T:'single',Ref: 15, Rad: {shipVar:'spotRad'}},
            {T:'double',Ref: 10, Rad: {shipVar:'spotRad'}, Rad2: {shipVar:'spotRad2'}, Angle2: {spipVar:'spotAngle2'}},
            {T:'single',Ref: 45, Rad: {shipVar:'spotRad2'}}
        ],

        shipVariables:{
            speed: {Const: 5, Rand: 4},
            speedT: {Const: 2, Rand: 2},
            spotRad: {Const: 80, RandInt: 80},
            spotRad2: {Const: 300, RandInt: 200},
            spotAngle2: {Const: 30, RandInt: 30}
        },
    },
    orhenes:{
        view:{
            Letter: 'Q',
            LetterSize: 80,
            Color: 'red',
            Angle: 0,
            HitPattern: 'HullFire_80',
        },

        lifeM: 60,
        radius: 40,

        prodSquad: 40,
        Res: {'prodSquad': {M:80,T:0}},
        weapon:[
            {t:'refilResource', resource: 'prodSquad', gunSpeed: 30, maxSpeed: 2, doNextWeapon: true},
            {t:'produceSquad', gunSpeed: 0, lastShot: 0, usedRes: 'prodSquad', usedResR: 10, maxSpeed: 2, minDistToEnemy:400, doNextWeapon: true},
        ],

        squadSchemeType: {t:'loose', count: 8, data:{type:'enemyShip', objectType:'carras'}},
        squadScheme: [],

        doingNow: 'changeManouver',
        doingTime: -1,
        Manouver: 'goStraight',
        toDo: [
            {N:15,T:'changeManouver', maxAlarm: 5, straightMin: 60, straightPlus: 100, turnMin: 30, turnPlus: 70  },
        ],

        speedArr:[0,
            {S:0.2, T:0.3},
            {S:1, T:1},
            {S:1.7, T:0.4}
        ],
        spotTick: 8,
        spotArr: [0,
            {T:'single',Ref: 15, Rad: {shipVar:'spotRad'}},
            {T:'double',Ref: 10, Rad: {shipVar:'spotRad'}, Rad2: {shipVar:'spotRad2'}, Angle2: {spipVar:'spotAngle2'}},
            {T:'single',Ref: 45, Rad: {shipVar:'spotRad2'}}
        ],

        shipVariables:{
            spotRad: {Const: 180, RandInt: 80},
            spotRad2: {Const: 400, RandInt: 200},
            spotAngle2: {Const: 40, RandInt: 30}
        },
    },
    juggernaut:{
        view:{
            Letter: 'J',
            LetterSize: 80,
            Color: 'red',
            Angle: 0,
            HitPattern: 'HullFire_80',
        },

        lifeM: 12,
        radius: 40,

        Bombs:[
            { explosivePreset:'ExplosionSize1' },
            { explosivePreset:'ExplosionSize2' },
            { explosivePreset:'ExplosionSize3' },
            { explosivePreset:'ExplosionSize4' }
        ],

        energyField: 20,
        Res: {'energyField': {M:20,T:0}},
        weapon:[
            {t:'refilResource', resource: 'energyField', gunSpeed: 60, maxSpeed: 2, doNextWeapon: true},
            {t:'bomb', Speed: 10, Dec: 50, BombRandom: 4, gunSpeed: 100, lastShot: 100, maxSpeed: 2, minAlarm: 5, minDistToEnemy: 400}
        ],

        doingNow: 'changeManouver',
        doingTime: -1,
        Manouver: 'goStraight',
        toDo: [
            {N:45,T:'lowerAlarmLvl', minAlarm: 5, minEnemyDontSeen: 15, gotoAlarm: 4, goToSpotLvl: 2},
            {N:35,T:'followEnemy', minAlarm: 5, goToSpotLvl: 3, doingTime: 30},
            {N:15,T:'changeManouver', maxAlarm: 4, straightMin: 60, straightPlus: 100, turnMin: 30, turnPlus: 70  },
        ],

        speedArr:[0,
            {S:1, T:1},
            {S:1, T:1},
            {S:1, T:1}
        ],
        spotTick: 8,
        spotArr: [0,
            {T:'single',Ref: 15, Rad: {shipVar:'spotRad'}},
            {T:'double',Ref: 10, Rad: {shipVar:'spotRad'}, Rad2: {shipVar:'spotRad2'}, Angle2: {spipVar:'spotAngle2'}},
            {T:'single',Ref: 45, Rad: {shipVar:'spotRad2'}}
        ],

        shipVariables:{
            spotRad: {Const: 180, RandInt: 80},
            spotRad2: {Const: 400, RandInt: 200},
            spotAngle2: {Const: 40, RandInt: 20}
        },

    },
    gargamon:{
        view:{
            Letter: 'G',
            LetterSize: 80,
            Color: 'red',
            Angle: 270,
            HitPattern: 'HullFire_80',
        },

        lifeM: 22,
        radius: 40,

        energyField: 10,
        misslePack: 0,
        Res: {'energyField': {M:10,T:0}, 'misslePack': {M:10,T:0}},
        weapon:[
            {t:'refilResource', resource: 'energyField', gunSpeed: 120, maxSpeed: 2, doNextWeapon: true},
            {t:'refilResource', resource: 'misslePack', gunSpeed: 18, maxSpeed: 2, doNextWeapon: true},
            {t:'changeAction', makeAction: {doingNow:'shooting', doingTime: 33, Manouver:'goStraight'}, doingNow:'followEnemy', doingTime:1, usedRes:'misslePack', usedResR: 10},
            {t:'missleX5', Power:1, Dec: 25, Speed: 14, gunSpeed: 8, lastShot: 0, doingNow:'shooting', minDistToEnemy: 500},
        ],

        doingNow: 'changeManouver',
        doingTime: -1,
        Manouver: 'goStraight',
        toDo: [
            {N:55,T:'followEnemy', minAlarm: 5, doingTime: 40, usedRes:'misslePack', usedResR: 10},
            {N:15,T:'changeManouver', maxAlarm: 5, straightMin: 60, straightPlus: 100, turnMin: 30, turnPlus: 70  },
        ],

        speedArr:[0,
            {S:1, T:1},
            {S:2, T:1.5},
            {S:7, T:0.2}
        ],
        spotTick: 8,
        spotArr: [0,
            {T:'single',Ref: 15, Rad: {shipVar:'spotRad'}},
            {T:'double',Ref: 10, Rad: {shipVar:'spotRad'}, Rad2: {shipVar:'spotRad2'}, Angle2: {spipVar:'spotAngle2'}},
            {T:'single',Ref: 45, Rad: {shipVar:'spotRad2'}}
        ],

        shipVariables:{
            spotRad: {Const: 180, RandInt: 80},
            spotRad2: {Const: 400, RandInt: 200},
            spotAngle2: {Const: 40, RandInt: 30}
        },
    },
    xaurus:{
        view:{
            Letter: 'X',
            LetterSize: 60,
            Color: 'red',
            Angle: 270,
            HitPattern: 'HullFire_60',
        },

        lifeM: 33,
        radius: 27,



        ammoPack: 0,
        Res: {'ammoPack': {M:10,T:0}},
        weapon:[
            {t:'refilResource', resource: 'ammoPack', gunSpeed: 20, maxSpeed: 2, doNextWeapon: true},
            {t:'changeAction', minDistToEnemy: 70, makeAction: {doingNow:'shooting', gotoSpeed: 2, doingTime: 20, Manouver:'goStraight', doNotInterupt:true}, doingNow:'followEnemy', usedRes:'ammoPack', usedResR: 10 },
            {t:'crabBullets', Power: 1, Dec: 37, Speed: 12, gunSpeed: 5, lastShot: 0, doingNow:'shooting', minDistToEnemy: 500},
        ],

        doingNow: 'changeManouver',
        doingTime: -1,
        Manouver: 'goStraight',
        toDo: [
            {N:55,T:'followEnemy', minAlarm: 5, gotoSpeed: 3, usedRes:'ammoPack', usedResR: 10},
            {N:15,T:'changeManouver', maxAlarm: 5, straightMin: 60, straightPlus: 100, turnMin: 30, turnPlus: 70  },
        ],

        speedArr:[0,
            {S:{shipVar:'speed',Add:-2}, T:1},
            {S:{shipVar:'speed'},        T:{shipVar:'speedT',Add:1}},
            {S:{shipVar:'speed',Add:4},  T:{shipVar:'speedT'}}
        ],
        spotTick: 8,
        spotArr: [0,
            {T:'single',Ref: 15, Rad: {shipVar:'spotRad'}},
            {T:'double',Ref: 10, Rad: {shipVar:'spotRad'}, Rad2: {shipVar:'spotRad2'}, Angle2: {spipVar:'spotAngle2'}},
            {T:'single',Ref: 45, Rad: {shipVar:'spotRad2'}}
        ],

        shipVariables:{
            speed: {Const: 3, Rand: 2},
            speedT: {Const:  1, Rand: 2},
            spotRad: {Const: 180, RandInt: 80},
            spotRad2: {Const: 400, RandInt: 200},
            spotAngle2: {Const: 40, RandInt: 30}
        },
    },
    zarahiash:{
        view:{
            Letter: 'Z',
            LetterSize: 20,
            Color: 'red',
            Angle: 0,
            HitPattern: 'HullFire_40',
        },

        lifeM: 13,
        radius: 15,

        fieldCharges: 0,
        Res: {'fieldCharges': {M:10,T:0}},
        weapon:[
            {t:'killSquadMember', gunSpeed: 55, FlagsRequired:{squadFull:true},maxSpeed: 2},
            {t:'refilResource', resource: 'fieldCharges', gunSpeed: 20, maxSpeed: 2, doNextWeapon: true},
            {t:'produceSquad', gunSpeed: 1, lastShot: 100, usedRes:'fieldCharges', minDistToEnemy:500, usedResR: 10, doingNow:'followEnemy', makeAction:{doingNow:'followEnemy', doingTime:220, Manouver:'followEnemy',doNotInterupt:true}},
        ],

        squadScheme: [{
            type: 'ConeField',
            radius: 200,
            angle: 0,
            angleAddon: 180,
            Oid: -1,
            placementT:'directPlaces',
            objData: {fieldAnim: 'DestructionField', radius: 185, angle: 0, coneAngle: 18, coneRad2: 10, PeriodDamage: 1, PeriodTime: 15, PeriodOffset: 10, dontHit:['B','BE','E','M','ME','A'], particlesOnBoard:true, fieldAnimMoving:true}
        }],

        doingNow: 'changeManouver',
        doingTime: -1,
        Manouver: 'goStraight',
        toDo: [
            {N:55,T:'followEnemy', minAlarm: 5, gotoSpeed: 3, usedRes:'fieldCharges', usedResR: 10},
            {T:'changeSpeed', minSpeedLvl: 3, gotoSpeed: 2},
            {N:15,T:'changeManouver', maxAlarm: 5, straightMin: 60, straightPlus: 100, turnMin: 30, turnPlus: 70  },
        ],

        speedArr:[0,
            {S:{shipVar:'speed',Add:-2}, T:1},
            {S:{shipVar:'speed'},        T:{shipVar:'speedT',Add:-1}},
            {S:{shipVar:'speed',Add:3},  T:{shipVar:'speedT'}}
        ],
        spotTick: 8,
        spotArr: [0,
            {T:'single',Ref: 15, Rad: {shipVar:'spotRad'}},
            {T:'double',Ref: 10, Rad: {shipVar:'spotRad'}, Rad2: {shipVar:'spotRad2'}, Angle2: {spipVar:'spotAngle2'}},
            {T:'single',Ref: 45, Rad: {shipVar:'spotRad2'}}
        ],

        shipVariables:{
            speed: {Const: 4, Rand: 3},
            speedT: {Const: 1.5, Rand: 1.5},
            spotRad: {Const: 180, RandInt: 80},
            spotRad2: {Const: 400, RandInt: 200},
            spotAngle2: {Const: 40, RandInt: 30}
        },
    },
    durishka:{
        view:{
            LIBpath:'StarPath',
            PathSize:30,
            Color:'white',
            Angle:0,
            HitPattern:'StarHit',
          },
        view1:{
            LIBpath:'StarPath',
            PathSize:30,
            Color:'white',
            Angle:0,
            HitPattern:'StarHit',
        },
        view2:{
          Letter: 272, // some D
          LetterSize: 40,
          Color: 'red',
          Angle: 90,
          HitPattern: 'HullFire_40',
        },

        lifeM: 13,
        radius: 20,
        shieldDimmune:true,

        weapon:[
            {t:'changeAction', makeAction: {doingNow:'standBy', gotoSpeed: 1, gotoAlarm: 4, doingTime: 30, changeView: 'view1', Manouver: 'goStraight', doNotInterupt:true}, doingNow:'lowerAlarmLvl'},
            {t:'changeAction', makeAction: {doingNow:'shooting', doingTime: 30, changeView: 'view2', gotoAlarm: 7, Manouver: 'followEnemy', doNotInterupt:true}, doingNow:'standBy', minAlarm: 5, maxAlarm: 6},
            {t:'changeAction', doingNow: 'shooting', doingTime: 1, makeAction: {gotoSpeed: 2, gotoAlarm: 7, doingNow:'changeManouver', doingTime: 30, Manouver:'goStraight'}},
            {t:'single', Speed:12, Dec:37, Power:1, doingNow: 'shooting', gunSpeed: 3, maxSpeed: 1},
        ],

        doingNow: 'changeManouver',
        doingTime: -1,
        Manouver: 'goStraight',
        toDo: [
            {N:27,T:'lowerAlarmLvl', minEnemyDontSeen: 300, minAlarm: 7},
            {N:26,T:'standBy', minAlarm: 4},
            {N:15,T:'changeManouver', minAlarm: 7, straightMin: 60, straightPlus: 100, turnMin: 30, turnPlus: 70},
        ],

        speedLvl: 1,
        speedArr:[0,
            {S:0, T:12},
            {S:2, T:4},
            {S:4, T:2}
        ],
        spotTick: 8,
        spotArr: [0,
            {T:'single',Ref: 15, Rad: {shipVar:'spotRad'}},
            {T:'single',Ref: 15, Rad: {shipVar:'spotRad'}},
            {T:'single',Ref: 45, Rad: {shipVar:'spotRad'}}
        ],

        shipVariables:{
            spotRad: {Const: 120, RandInt: 80},
        },
    },
    pitagoras:{
        view:{
            Letter: 960,
            LetterSize: 40,
            Color: 'red',
            Angle: 0,
            HitPattern: 'HullFire_40',
        },

        lifeM: 4,
        radius: 20,

        Bombs:[{
            explosivePreset: 'NailsCircleToCenter',
        }],

        weapon:[{t:'bomb', Speed: 10, Dec: 50, BombType: 0, gunSpeed: 40, lastShot: 100, maxSpeed: 2, minAlarm: 5, minDistToEnemy: 400}],

        doingNow: 'changeManouver',
        doingTime: -1,
        Manouver: 'goStraight',
        toDo: [
            {N:15,T:'changeManouver', maxAlarm: 3, straightMin: 60, straightPlus: 100, turnMin: 30, turnPlus: 70},
        ],

        speedArr:[0,
            {S:1, T:1},
            {S:3, T:2},
            {S:6, T:2}
        ],
        spotTick: 8,
        spotArr: [0,
            {T:'single',Ref: 15, Rad: {shipVar:'spotRad'}},
            {T:'double',Ref: 10, Rad: {shipVar:'spotRad'}, Rad2: {shipVar:'spotRad2'}, Angle2: {spipVar:'spotAngle2'}},
            {T:'single',Ref: 45, Rad: {shipVar:'spotRad2'}}
        ],

        shipVariables:{
            spotRad: {Const: 80, RandInt: 80},
            spotRad2: {Const: 300, RandInt: 200},
            spotAngle2: {Const: 30, RandInt: 30}
        },
    },
    patiarch:{
        view:{
            Letter: 1130, // some funny H
            LetterSize: 50,
            Color: 'red',
            Angle: 180,
            HitPattern: 'HullFire_80',
        },

        lifeM: 89,
        radius: 30,

        onDie: {Do:'explode', Power: 13, Dist: 210},

        Res: {},
        DamangeTransferImmune: true,
        weapon:[
            {t:'giveDamangeTransfer', gunSpeed: 12, lastShot: 100, Radius: 350, immunityTime: 15},
            {t:'healSelf', gunSpeed: 30, lastShot: 100}
        ],


        doingNow: 'changeManouver',
        doingTime: -1,
        Manouver: 'goStraight',
        toDo: [
            {N:15,T:'changeManouver', maxAlarm: 5, straightMin: 60, straightPlus: 100, turnMin: 30, turnPlus: 70  },
        ],

        speedArr:[0,
            {S:0.2, T:1},
            {S:0.3, T:1},
            {S:1,   T:1}
        ],
        spotTick: 8,
        spotArr: [0,
            {T:'single',Ref: 15, Rad: {shipVar:'spotRad'}},
            {T:'double',Ref: 10, Rad: {shipVar:'spotRad'}, Rad2: {shipVar:'spotRad2'}, Angle2: {spipVar:'spotAngle2'}},
            {T:'single',Ref: 45, Rad: {shipVar:'spotRad2'}}
        ],

        shipVariables:{
            spotRad: {Const: 180, RandInt: 80},
            spotRad2: {Const: 400, RandInt: 200},
            spotAngle2: {Const: 40, RandInt: 30}
        },
    },
    wariankiel:{
        view:{
            Letter: 373, // some funny W
            LetterSize: 20,
            Color: 'red',
            Angle: 0,
            HitPattern: 'HullFire_20',
        },

        lifeM: 6,
        radius: 12,

        Res: {},
        weapon:[
            {t:'changeAction', minDistToEnemy: 250, makeAction: {doingNow:'shooting', doingTime: 6, doNotInterupt:true}, gunSpeed: 55, lastShot: 200, FlagRequired:{noStar:false}},
            {t:'single', Power:1, Dec: 25, Speed: 10, gunSpeed: 2, lastShot: 0, doingNow:'shooting'},
        ],


        doingNow: 'changeManouver',
        doingTime: -1,
        Manouver: 'goStraight',
        toDo: [
            {N:88,T:'goToStar', FlagsRequired:{noStar:true}, gotoSpeed: 2},
            {N:56,T:'followEnemyAroundStar',minAlarm: 5, gotoSpeed: 1},
            {N:37,T:'goRandomAroundStar', gotoSpeed: 1, straightMin: 80, straightPlus: 100, turnMin: 20, turnPlus: 20},
        ],

        speedArr:[0,
            {S:0, T:4},
            {S:3, T:2},
            {S:5, T:2}
        ],
        spotTick: 8,
        spotArr: [0,
            {T:'single',Ref: 15, Rad: {shipVar:'spotRad'}},
            {T:'double',Ref: 10, Rad: {shipVar:'spotRad'}, Rad2: {shipVar:'spotRad2'}, Angle2: {spipVar:'spotAngle2'}},
            {T:'single',Ref: 45, Rad: {shipVar:'spotRad2'}}
        ],

        shipVariables:{
            spotRad: {Const: 180, RandInt: 80},
            spotRad2: {Const: 400, RandInt: 200},
            spotAngle2: {Const: 40, RandInt: 30}
        },
        Flags:{noStar:true},
    },
    vuvis:{
        view:{
            Letter: 171, // some <<
            LetterSize: 22,
            Color: 'red',
            Angle: 270,
            HitPattern: 'HullFire_20',
        },
        lifeM: 2,
        radius: 9,
        Res: {},
        weapon:[{t:'single', Power:1, Dec: 50, Speed: 10, gunSpeed: 15, lastShot: 100, maxSpeed: 2, minAlarm: 5}],

        doingNow: 'changeManouver',
        doingTime: -1,
        Manouver: 'goStraight',
        toDo: [
            {N:57,T:'goAroundEnemy', minAlarm: 5},
            {N:15,T:'changeManouver', maxAlarm: 5, straightMin: 60, straightPlus: 100, turnMin: 30, turnPlus: 70  },
        ],

        speedArr:[0,
            {S:{shipVar:'speed',Add:-2}, T:1},
            {S:{shipVar:'speed'},        T:{shipVar:'speedT',Add:-1}},
            {S:{shipVar:'speed',Add:3},  T:{shipVar:'speedT'}}
        ],
        spotTick: 8,
        spotArr: [0,
            {T:'single',Ref: 15, Rad: {shipVar:'spotRad'}},
            {T:'double',Ref: 10, Rad: {shipVar:'spotRad'}, Rad2: {shipVar:'spotRad2'}, Angle2: {spipVar:'spotAngle2'}},
            {T:'single',Ref: 45, Rad: {shipVar:'spotRad2'}}
        ],

        shipVariables:{
            speed: {Const: 8, Rand: 4},
            speedT: {Const: 6, Rand: 1.5},
            spotRad: {Const: 180, RandInt: 80},
            spotRad2: {Const: 400, RandInt: 200},
            spotAngle2: {Const: 40, RandInt: 30}
        },
    },
    hirieshka:{
        view:{
            Letter: 294, // some funny H
            LetterSize: 50,
            Color: 'red',
            Angle: 180,
            HitPattern: 'HullFire_40',
        },

        lifeM: 13,
        radius: 25,

        Res: {},
        weapon:[
            {t:'double2', Speed:15, Dec:30, Power:1, Wide: 15, doingNow:'shooting', gunSpeed: 6},
            {t:'changeAction', makeAction: {Manuover:'goStraight', doingNow:'shooting', doingTime:30, doNotInterupt:true}, gunSpeed: 110, lastShot: 100,  minAlarm: 5, minDistToEnemy: 400}
        ],


        doingNow: 'changeManouver',
        doingTime: -1,
        Manouver: 'goStraight',
        toDo: [
            {N:55,T:'followEnemy', minAlarm: 5, gotoSpeed: 3, usedRes:'fieldCharges', usedResR: 10},
            {T:'changeSpeed', minSpeedLvl: 3, gotoSpeed: 2},
            {N:15,T:'changeManouver', maxAlarm: 5, straightMin: 60, straightPlus: 100, turnMin: 30, turnPlus: 70  },
        ],

        speedArr:[0,
            {S:{shipVar:'speed',Add:-2}, T:1},
            {S:{shipVar:'speed'},        T:{shipVar:'speedT',Add:-1}},
            {S:{shipVar:'speed',Add:3},  T:{shipVar:'speedT'}}
        ],
        spotTick: 8,
        spotArr: [0,
            {T:'single',Ref: 15, Rad: {shipVar:'spotRad'}},
            {T:'double',Ref: 10, Rad: {shipVar:'spotRad'}, Rad2: {shipVar:'spotRad2'}, Angle2: {spipVar:'spotAngle2'}},
            {T:'single',Ref: 45, Rad: {shipVar:'spotRad2'}}
        ],

        shipVariables:{
            speed: {Const: 4, Rand: 3},
            speedT: {Const: 1.5, Rand: 1.5},
            spotRad: {Const: 180, RandInt: 80},
            spotRad2: {Const: 400, RandInt: 200},
            spotAngle2: {Const: 40, RandInt: 30}
        },
    },
    nientes:{
        view:{
            Letter: 948,
            LetterSize: 25,
            Color: 'red',
            Angle: 0,
            HitPattern: 'HullFire_20',
        },

        lifeM: 5,
        radius: 15,

        fieldCharges: 10,
        Res: {'fieldCharges': {M:10,T:0}},
        weapon:[
            {t:'produceSquad', gunSpeed: 1, lastShot: 100, usedRes:'fieldCharges', usedResR: 10, maxSpeed: 2, FlagsRequired:{squadFull:false }},
            {t:'refilResource', resource: 'fieldCharges', gunSpeed: 16, maxSpeed: 2, FlagsRequired:{squadFull:false}, doNextWeapon: true},
        ],

        squadScheme: [{
            type: 'RoundField',
            radius: 50,
            angle: 0,
            Oid: -1,
            placementT:'directPlaces',
            objData: {fieldAnim: 'ElectricityField', radius: 40, OneTimeEffect: 1, OneTimeOffset: 3, OneTimeDamage: 3, dontHit:['B','BE','E','M','ME','A'], fieldAnimMoving:true}
        }],

        doingNow: 'changeManouver',
        doingTime: -1,
        Manouver: 'goStraight',
        toDo: [
            {N:55,T:'followEnemy', minAlarm: 5, gotoSpeed: 3, FlagsRequired:{squadFull:true}},
            {T:'changeSpeed', minSpeedLvl: 3, gotoSpeed: 2},
            {N:15,T:'changeManouver', maxAlarm: 5, straightMin: 60, straightPlus: 100, turnMin: 30, turnPlus: 70  },
        ],

        speedArr:[0,
            {S: {shipVar:'speed',Add:-2}, T:{shipVar:'speedT',Add:-0.6}},
            {S: {shipVar:'speed'}, T:{shipVar:'speedT'}},
            {S: {shipVar:'speed',Add:6}, T:{shipVar:'speedT'}}
        ],
        spotTick: 8,
        spotArr: [0,
            {T:'single',Ref: 20, Rad: {shipVar:'spotRad'}},
            {T:'double',Ref: 20, Rad: {shipVar:'spotRad'}, Rad2: {shipVar:'spotRad2'}, Angle2: {spipVar:'spotAngle2'}},
            {T:'single',Ref: 20, Rad: {shipVar:'spotRad2'}}
        ],

        shipVariables:{
            speed: {Const: 3, Rand: 3},
            speedT: {Const: 2.5, Rand: 1},
            spotRad: {Const: 80, RandInt: 80},
            spotRad2: {Const: 300, RandInt: 200},
            spotAngle2: {Const: 30, RandInt: 30}
        },



    },
    shieldoorz:{
        view:{
            Letter: 1002,
            LetterSize: 50,
            Color: 'red',
            Angle: 0,
            HitPattern: 'HullFire_60',
        },

        lifeM: 13,
        radius: 25,

        fieldCharges: 0,
        Res: {'fieldCharges': {M:10,T:0}},
        weapon:[
            // {t:'killSquadMember', gunSpeed: 55, FlagsRequired:{squadFull:true}, minSpeed: 2},
            {t:'refilResource', resource: 'fieldCharges', gunSpeed: 30, minSpeed: 2, doNextWeapon: true},

            {t:'double2', Speed:8, Dec:50, Power:1, Wide: 30, gunSpeed: 6, doingNow:'followEnemy', maxSpeed:1, minSpeed:1},

            {t:'produceSquad', gunSpeed: 1, lastShot: 100, usedRes:'fieldCharges', usedResR: 10, maxSpeed: 0, doingNow:'followEnemy', makeAction: {Manuover:'followEnemy', doingNow:'followEnemy', doingTime: 120, doNotInterupt:true}},
            // {t:'changeAction', makeAction: {Manuover:'turnRight', doingNow:'shooting', doingTime:30, doNotInterupt:true}, gunSpeed: 110, lastShot: 100,  minAlarm: 5, minDistToEnemy: 400},
        ],

        squadScheme: [{
            type: 'ConeField',
            radius: 0,
            angle: 0,
            angleAddon: 0,
            Oid: -1,
            placementT:'directPlaces',
            objData: {fieldAnim: 'ShellField', radius: 65, angle: 180, coneAngle: 90, coneRad2: 30, bounceType:'diagonal', fieldAnimMoving:true, dontHit:['P','BE','E','ME']}
        }],

        doingNow: 'changeManouver',
        doingTime: -1,
        Manouver: 'goStraight',
        toDo: [
            {N:55,T:'followEnemy', minAlarm: 5, gotoSpeed: 0, usedRes:'fieldCharges', usedResR: 10, doingTime:150},
            {T:'changeSpeed', maxSpeedLvl: 0, gotoSpeed: 1, usedRes:'fieldCharges', usedResR: 10},
            {T:'changeSpeed', maxSpeedLvl: 1, minSpeedLvl: 1,  gotoSpeed: 2},
            {N:15,T:'changeManouver', maxAlarm: 5, straightMin: 60, minSpeedLvl: 2, straightPlus: 100, turnMin: 30, turnPlus: 70  },
        ],

        speedArr:[{S:0, T:6},
            {S:1, T:{shipVar:'speedT',Add:2}},
            {S:{shipVar:'speed'},        T:{shipVar:'speedT',Add:-1}},
            {S:{shipVar:'speed',Add:3},  T:{shipVar:'speedT'}}
        ],
        spotTick: 8,
        spotArr: [0,
            {T:'single',Ref: 15, Rad: {shipVar:'spotRad'}},
            {T:'single',Ref: 10, Rad: {shipVar:'spotRad'}},
            {T:'single',Ref: 45, Rad: {shipVar:'spotRad'}}
        ],

        shipVariables:{
            speed: {Const: 4, Rand: 3},
            speedT: {Const: 1.5, Rand: 1.5},
            spotRad: {Const: 350, RandInt: 150},
        },
    },
};
