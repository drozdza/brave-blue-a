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
        Heal: 1,
        doingTime: 230,
        onHit:{},
        toDo: [{T:'expire'}],
        Manouver: 'followEntity',
        Flags:{},
    },
    energy_field_missle:{
        view:{
            Letter: 'E',
            LetterSize: 12,
            Color: '#0f0',
            Angle: 180,
        },

        lifeM: 1,
        speed: 13,
        speedT: 20,
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
        DMG:{Dmg:1,T:'explo'},
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
        toDo:[{T:'produceSquad'}],
        doingTime:-1,

        lifeM: 1,

        explodePreset: 'NailedMine2',

        squadActions:{
            enemyClose: {squadMember:0, change:{simpleFilling: 'rgba(255,0,0,0.2)'}},
            enemyFar:   {squadMember:0, change:{simpleFilling: 'transparent'}},
        },
        squadScheme: [{
            type: 'RoundField',
            radius: 0,
            angle: 0,
            Oid: -1,
            mapType: 'A',
            placementT:'directPlaces',
            onDisbandRemove:1,
            objData: {
                simpleFilling: 'transparent',
                radius: 80,
                stateIn: {explodeMaster:1},
                dontHit:['B','BE','E','M','ME','A'],
            },
        },{
            type: 'RoundField',
            radius: 0,
            angle: 0,
            Oid: -1,
            mapType: 'A',
            placementT:'directPlaces',
            onDisbandRemove:1,
            objData: {
                viewOff: true,
                radius: 200,
                stateIn: {informMaster:'enemyClose'},
                stateOut: {informMaster:'enemyFar'},
                dontHit:['B','BE','E','M','ME','A'],
            },
        }],

        Flags:{}
    },
    MineMod_mediumCircle:{
        squadScheme: [{
            type: 'RoundField',
            radius: 0,
            angle: 0,
            Oid: -1,
            mapType: 'A',
            placementT:'directPlaces',
            onDisbandRemove:1,
            objData: {
                simpleFilling: 'transparent',
                radius: 50,
                stateIn: {explodeMaster:1},
                dontHit:['B','BE','E','M','ME','A'],
            },
        },{
            type: 'RoundField',
            radius: 0,
            angle: 0,
            Oid: -1,
            mapType: 'A',
            placementT:'directPlaces',
            onDisbandRemove:1,
            objData: {
                viewOff: true,
                radius: 150,
                stateIn: {informMaster:'enemyClose'},
                stateOut: {informMaster:'enemyFar'},
                dontHit:['B','BE','E','M','ME','A'],
            },
        }],
    },
    MineMod_smallCircle:{
        squadScheme: [{
            type: 'RoundField',
            radius: 0,
            angle: 0,
            Oid: -1,
            mapType: 'A',
            placementT:'directPlaces',
            onDisbandRemove:1,
            objData: {
                simpleFilling: 'transparent',
                radius: 35,
                stateIn: {explodeMaster:1},
                dontHit:['B','BE','E','M','ME','A'],
            },
        },{
            type: 'RoundField',
            radius: 0,
            angle: 0,
            Oid: -1,
            mapType: 'A',
            placementT:'directPlaces',
            onDisbandRemove:1,
            objData: {
                viewOff: true,
                radius: 130,
                stateIn: {informMaster:'enemyClose'},
                stateOut: {informMaster:'enemyFar'},
                dontHit:['B','BE','E','M','ME','A'],
            },
        }],
    },
    MineMod_Cone:{
        squadScheme: [{
            type: 'ConeField',
            radius: 0,
            angle: 0,
            Oid: -1,
            mapType: 'A',
            placementT:'directPlaces',
            onDisbandRemove:1,
            objData: {
                simpleFilling: 'transparent',
                radius: 210,
                coneRad2: 0,
                coneAngle: 20,
                stateIn: {explodeMaster:1},
                dontHit:['B','BE','E','M','ME','A'],
            },
        },{
            type: 'ConeField',
            radius: -100,
            angle: 0,
            Oid: -1,
            mapType: 'A',
            placementT:'directPlaces',
            onDisbandRemove:1,
            objData: {
                viewOff: true,
                radius: 380,
                coneRad2: 60,
                coneAngle: 20,
                stateIn: {informMaster:'enemyClose'},
                stateOut: {informMaster:'enemyFar'},
                dontHit:['B','BE','E','M','ME','A'],
            },
        }],
    },
    MineMod_hedgehog:{
        view:{
            Letter: 'A',
            LetterSize: 10,
            Color: '#f00',
            Angle: 0,
        },
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
        TT:'bgStars',
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
    EndPortal:{
        view:{
            onBackground: 1,
        },
        TT: 'regionAnim',
        animTick: 0,
        animType: 'EndPortalStart',
        radius: 50,
        undestructible: 1,
        stateIn:{
            changeCount:{gameEnded:1},
            changeAnim:{name:'EndPortalEnd',type:'end',time:45},
        },
        dontHit:['B','E','BE','M','ME','A','R']
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

        weapon:[{t:'single', DMG:{Dmg:1,T:'normal'}, Dec: 50, Speed: 10, gunSpeed: 15, lastShot: 100, maxSpeed: 2, minAlarm: 5}],

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
            {t:'rose', DMG:{Dmg:1,T:'normal'}, Dec: 50, Speed: 10, gunSpeed: 50, lastShot: 100, AtOnce: 9, RoseAngle: 4, maxSpeed: 2, minAlarm: 5, minDistToEnemy: 400}
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
            onHitDieExpire:    {Do:'explode', DMG:{Dmg:4,T:'explo'}, Dist: 35},
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

        Bombs:[{ explodePreset:'WarasteinExploCone' }],

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

        ShieldsRejection:{koriazMax:1},

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
            {t:'missleCrown', DMG:{Dmg:1,T:'explo'}, Dec: 95, Speed: 12, gunSpeed: 120, lastShot: 0, minDistToEnemy: 400},
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
            objData: {fieldAnim: 'ElectricityField', radius: 130, OneTimeEffect: 1, OneTimeOffset: 3, OneTimeDMG:{Dmg:4,T:'energy'}, dontHit:['B','BE','E','M','ME','A'], fieldAnimMoving:true}
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

        onHitJump: 3,
        Res: {'onHitJump': {M:3,T:0}},
        weapon:[
            {t:'refilResource', resource: 'onHitJump', gunSpeed: 300, maxSpeed: 2, doNextWeapon: true},
            {t:'double2', DMG:{Dmg:1,T:'normal'}, Dec: 35, Speed: 12, gunSpeed: 20, lastShot: 100, maxSpeed: 2, minAlarm: 5},
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
            {t:'double', Speed:12, Dec:30, DMG:{Dmg:1,T:'normal'}, doingNow:'shooting', gunSpeed:1,  maxSpeed:2},
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
            onHit: {Do:'explode', DMG:{Dmg:4,T:'explo'}, Dist: 35},
            onDie: {Do:'explode', DMG:{Dmg:4,T:'explo'}, Dist: 35},
            onExpire: {Do:'explode', DMG:{Dmg:4,T:'explo'}, Dist: 35}
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

        ShieldsRejection:{koriazMax:1},
        weapon:[
            {t:'addKoriazShield', Radius: 500, shieldTime: 15, gunSpeed: 12, lastShot: 100},
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
            {t:'laserShoot', DMG:{Dmg:4,T:'energy'}, Distance: 450, gunSpeed: 1, lastShot: 0, doingNow: 'laserAim', doingTime: 1, makeAction:{doingNow:'followEnemy', doingTime: 40, doNotInterupt: true}},
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
            {t:'single', DMG:{Dmg:1,T:'normal'}, Dec: 25, Speed: 14, gunSpeed: 2, lastShot: 0, doingNow:'shooting'},
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
            {t:'single', DMG:{Dmg:1,T:'normal'}, Dec: 50, Speed: 10, gunSpeed: 25, lastShot: 100, maxSpeed: 2, minAlarm: 5}
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
            { explodePreset:'ExplosionSize1' },
            { explodePreset:'ExplosionSize2' },
            { explodePreset:'ExplosionSize3' },
            { explodePreset:'ExplosionSize4' }
        ],

        Shields:[{
            name: 'explosionShield',
            CatchDmgT: {explo:1},
            DmgReduction: 'infinite',
            ReductionUses: 'exploShield',
            HitDieAnimation: 'dontShow',
            Own: true,
        },{
            name: 'absorbtionShield',
            CatchDmgT: {normal:1, energy:1, explo:1},
            DmgReduction: 'energyField',
            ReductionUses: 'infinite',
            Own: true,
        }],
        energyField: 20,
        exploShield: 2,
        Res: {energyField: {M:20,T:0}, exploShield: {M:2,T:0}},
        weapon:[
            {t:'refilResource', resource: 'energyField', gunSpeed: 60, maxSpeed: 2, doNextWeapon: true},
            {t:'refilResource', resource: 'exploShield', gunSpeed: 240, maxSpeed: 2, doNextWeapon: true},
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

        Shields:[{
            name: 'bulletShield',
            CatchDmgT: {normal:1},
            DmgReduction: 'infinite',
            ReductionUses: 'infinite',
            ShieldProbability: 65,
            Own: true,
            HitActionObj: 'bounce',
        }],
        misslePack: 0,
        Res: {'misslePack': {M:10,T:0}},
        weapon:[
            {t:'refilResource', resource: 'misslePack', gunSpeed: 18, maxSpeed: 2, doNextWeapon: true},
            {t:'changeAction', makeAction: {doingNow:'shooting', doingTime: 33, Manouver:'goStraight'}, doingNow:'followEnemy', doingTime:1, usedRes:'misslePack', usedResR: 10},
            {t:'missleX5', DMG:{Dmg:1,T:'explo'}, Dec: 25, Speed: 14, gunSpeed: 8, lastShot: 0, doingNow:'shooting', minDistToEnemy: 500},
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
            {t:'crabBullets', DMG:{Dmg:1,T:'normal'}, Dec: 35, Speed: 12, gunSpeed: 5, lastShot: 0, doingNow:'shooting', minDistToEnemy: 500},
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
            anglePlus: 180,
            Oid: -1,
            placementT:'directPlaces',
            objData: {fieldAnim: 'DestructionField', radius: 185, angle: 0, coneAngle: 18, coneRad2: 10, PeriodDMG:{Dmg:1,T:'normal'}, PeriodTime: 15, PeriodOffset: 10, dontHit:['B','BE','E','M','ME','A'], particlesOnBoard:true, fieldAnimMoving:true}
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
            DontShowShields:true,
          },
        view1:{
            LIBpath:'StarPath',
            PathSize:30,
            Color:'white',
            Angle:0,
            HitPattern:'StarHit',
            DontShowShields:true,
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

        ShieldsRejection:{koriazMax:1},
        weapon:[
            {t:'changeAction', makeAction: {doingNow:'standBy', gotoSpeed: 1, gotoAlarm: 4, doingTime: 30, changeView: 'view1', Manouver: 'goStraight', doNotInterupt:true}, doingNow:'lowerAlarmLvl'},
            {t:'changeAction', makeAction: {doingNow:'shooting', doingTime: 30, changeView: 'view2', gotoAlarm: 7, Manouver: 'followEnemy', doNotInterupt:true}, doingNow:'standBy', minAlarm: 5, maxAlarm: 6},
            {t:'changeAction', doingNow: 'shooting', doingTime: 1, makeAction: {gotoSpeed: 2, gotoAlarm: 7, doingNow:'changeManouver', doingTime: 30, Manouver:'goStraight'}},
            {t:'single', Speed:12, Dec:37, DMG:{Dmg:1,T:'normal'}, doingNow: 'shooting', gunSpeed: 3, maxSpeed: 1},
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
            explodePreset: 'NailsCircleToCenter',
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

        onDie: {Do:'explode', DMG:{Dmg:13,T:'explo'}, Dist: 210},

        Res: {},
        Shields:[{
            name: 'bulletShield',
            CatchDmgT: {normal:1},
            DmgReduction: 'infinite',
            ReductionUses: 'infinite',
            ShieldProbability: 85,
            Own: true,
            HitActionObj: 'bounce',
        }],
        ShieldsRejection:{dmgTransfer:1},
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
            Letter: 373, // W with ^
            LetterSize: 20,
            Color: 'red',
            Angle: 0,
            HitPattern: 'HullFire_20',
        },

        lifeM: 6,
        radius: 12,

        Res: {},
        weapon:[
            {t:'single', DMG:{Dmg:1,T:'normal'}, Dec: 25, Speed: 10, gunSpeed: 2, lastShot: 0, gunWork: 6, gunReload: 60, minDistToEnemy: 250, FlagsRequired:{noStar: false}},
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
        weapon:[{t:'single', DMG:{Dmg:1,T:'normal'}, Dec: 50, Speed: 10, gunSpeed: 15, lastShot: 100, maxSpeed: 2, minAlarm: 5}],

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
            {t:'double2', Speed:15, Dec:30, DMG:{Dmg:1,T:'normal'}, Wide: 15, doingNow:'shooting', gunSpeed: 6},
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
            objData: {fieldAnim: 'ElectricityField', radius: 40, OneTimeEffect: 1, OneTimeOffset: 3, OneTimeDMG:{Dmg:3,T:'energy'}, dontHit:['B','BE','E','M','ME','A'], fieldAnimMoving:true}
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
            {t:'killSquadMember', gunSpeed: 55, FlagsRequired:{squadFull:true}, minSpeed: 2},
            {t:'refilResource', resource: 'fieldCharges', gunSpeed: 30, minSpeed: 2, doNextWeapon: true},
            {t:'double2', Speed:10, Dec:50, DMG:{Dmg:1,T:'normal'}, Wide: 15, gunSpeed: 1, gunWork: 11, gunReload: 50, gunSiteChange: 3, maxSpeed:1, minSpeed:1},
            {t:'produceSquad', gunSpeed: 1, lastShot: 100, usedRes:'fieldCharges', usedResR: 10, maxSpeed: 0, doingNow:'followEnemy', makeAction: {Manuover:'followEnemy', doingNow:'followEnemy', doingTime: 120, doNotInterupt:true}},
            // {t:'changeAction', makeAction: {Manuover:'turnRight', doingNow:'shooting', doingTime:30, doNotInterupt:true}, gunSpeed: 110, lastShot: 100,  minAlarm: 5, minDistToEnemy: 400},
        ],

        squadScheme: [{
            type: 'ConeField',
            radius: 0,
            angle: 0,
            anglePlus: 0,
            Oid: -1,
            placementT:'directPlaces',
            objData: {fieldAnim: 'ShellField', radius: 65, angle: 180, coneAngle: 90, coneRad2: 0, bounceType:'diagonal', fieldAnimMoving:true, dontHit:['P','BE','E','ME']}
        }],

        doingNow: 'changeManouver',
        doingTime: -1,
        Manouver: 'goStraight',
        toDo: [
            {N:77,T:'changeSpeed', maxSpeedLvl: 0, gotoSpeed: 1, doingTime: 200},
            {N:76,T:'changeSpeed', maxSpeedLvl: 1, minSpeedLvl: 1,  gotoSpeed: 2},
            {N:56,T:'followEnemy', minAlarm: 5, minSpeedLvl: 2, gotoSpeed: 0, usedRes:'fieldCharges', usedResR: 10, doingTime:150, minDistToEnemy: 450},
            {N:55,T:'followEnemy', minAlarm: 5, maxSpeedLvl: 0, doingTime:150},
            {N:15,T:'changeManouver', maxAlarm: 5, straightMin: 60, minSpeedLvl: 2, straightPlus: 100, turnMin: 30, turnPlus: 70  },
        ],

        speedArr:[{S:0, T:6},
            {S:0.5, T:{shipVar:'speedT',Add:2}},
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
    loliax:{
        view:{
            Letter: 'L',
            LetterSize: 40,
            Color: 'red',
            Angle: 0,
            HitPattern: 'HullFire_40',
        },

        lifeM: 9,
        radius: 20,

        ShieldsRejection:{absorbtionShield:1},

        weapon:[
            {t:'shootShieldAddMissle', Radius: 350, gunSpeed: 20, lastShot: 100},
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
    slimensen:{
        view:{
            Letter: 3450,
            LetterSize: 50,
            Color: '#00BB00',
            Angle: 90,
            HitPattern: 'HullFire_80',
        },

        lifeM: 34,
        radius: 26,

        onDieDelete: true,
        onDieHideExplosion: true,
        onDie: {Do:'explode', explodeType: 'putObjs', objRandAngle:true, objName:'slimensen1', objType:'comp', objMin:2, objRand:2},

        mergeAbility: 0,
        Res: {'mergeAbility': {M:20,T:0}},
        weapon:[
            {t:'refilResource', resource: 'mergeAbility', gunSpeed: 120, maxSpeed: 2, doNextWeapon: true},
            {t:'rose', DMG:{Dmg:1,T:'normal'}, Dec: 50, Speed: 7, gunSpeed: 20, lastShot: 100, AtOnce: 60, RoseAngle: 6, maxSpeed: 2, minAlarm: 5,minDistToEnemy:500},

        ],

        squadScheme: [{
            type: 'ConeField',
            radius: 200,
            angle: 0,
            anglePlus: 180,
            Oid: -1,
            placementT:'directPlaces',
            objData: {fieldAnim: 'DestructionField', radius: 185, angle: 0, coneAngle: 18, coneRad2: 10, PeriodDMG:{Dmg:1,T:'normal'}, PeriodTime: 15, PeriodOffset: 10, dontHit:['B','BE','E','M','ME','A'], particlesOnBoard:true, fieldAnimMoving:true}
        }],

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
            {S:{shipVar:'speed',Add:-2}, T:1},
            {S:{shipVar:'speed'},        T:{shipVar:'speedT'}},
            {S:{shipVar:'speed',Add:3},  T:{shipVar:'speedT'}}
        ],
        spotTick: 8,
        spotArr: [0,
            {T:'single',Ref: 15, Rad: {shipVar:'spotRad'}},
            {T:'double',Ref: 10, Rad: {shipVar:'spotRad'}, Rad2: {shipVar:'spotRad2'}, Angle2: {spipVar:'spotAngle2'}},
            {T:'single',Ref: 45, Rad: {shipVar:'spotRad2'}}
        ],

        shipVariables:{
            speed: {Const: 2, Rand: 2},
            speedT: {Const: 2.5, Rand: 2.5},
            spotRad: {Const: 180, RandInt: 80},
            spotRad2: {Const: 400, RandInt: 200},
            spotAngle2: {Const: 40, RandInt: 30}
        },
    },
    slimensen1:{
        extends: 'slimensen',
        view:{
            Letter: 3445,
            LetterSize: 45,
            Color: '#00BB00',
            Angle: 90,
            HitPattern: 'HullFire_60',
        },

        lifeM: 18,
        radius: 23,

        onDieDelete: true,
        onDieHideExplosion: true,
        onDie: {Do:'explode', explodeType: 'putObjs', objRandAngle:true, objName:'slimensen2', objType:'comp', objMin:2, objRand:2},

        weapon:[
            {t:'refilResource', resource: 'mergeAbility', gunSpeed: 60, maxSpeed: 2, doNextWeapon: true},
            {t:'mergeWith', doingNow: 'mergeWith', doNextWeapon: true},
            {t:'rose', DMG:{Dmg:1,T:'normal'}, Dec: 50, Speed: 13, gunSpeed: 30, lastShot: 100, AtOnce: 11, RoseAngle: 4, maxSpeed: 2, minAlarm: 5,minDistToEnemy:500},
        ],

        toDo: [
            {N:88,T:'mergeSearch',  usedRes:'mergeAbility', usedResR: 20, mergeWith: 'slimensen1', mergeDist: 750},
            {N:55,T:'alarmAboutSpottedEnemy', minAlarm: 5, alarmRadius: 250},
            {N:45,T:'lowerAlarmLvl', minAlarm: 5, minEnemyDontSeen: 750, gotoAlarm: 4, goToSpotLvl: 2},
            {N:35,T:'followEnemy', minAlarm: 5, goToSpotLvl: 3 },
            {N:23,T:'stayInRegion', X:0, Y:0, Radius: 1700 },
            {N:18,T:'changeManouver2', maxAlarm: 4, minAlarm: 3, straightMin: 20, straightPlus: 80, turnMin: 10, turnPlus: 80  },
            {N:15,T:'changeManouver', maxAlarm: 3, straightMin: 60, straightPlus: 100, turnMin: 30, turnPlus: 70  },
        ],

        speedArr:[0,
            {S:{shipVar:'speed',Add:-2}, T:1},
            {S:{shipVar:'speed'},        T:{shipVar:'speedT'}},
            {S:{shipVar:'speed',Add:3},  T:{shipVar:'speedT'}}
        ],
        spotTick: 8,
        spotArr: [0,
            {T:'single',Ref: 15, Rad: {shipVar:'spotRad'}},
            {T:'double',Ref: 10, Rad: {shipVar:'spotRad'}, Rad2: {shipVar:'spotRad2'}, Angle2: {spipVar:'spotAngle2'}},
            {T:'single',Ref: 45, Rad: {shipVar:'spotRad2'}}
        ],

        shipVariables:{
            speed: {Const: 5, Rand: 3},
            speedT: {Const: 2.5, Rand: 1.5},
            spotRad: {Const: 180, RandInt: 80},
            spotRad2: {Const: 400, RandInt: 200},
            spotAngle2: {Const: 40, RandInt: 30}
        },
    },
    slimensen2:{
        extends: 'slimensen',
        view:{
            Letter: 3444,
            LetterSize: 40,
            Color: '#00BB00',
            Angle: 90,
            HitPattern: 'HullFire_40',
        },

        lifeM: 12,
        radius: 20,

        onDieDelete: true,
        onDieHideExplosion: true,
        onDie: {Do:'explode', explodeType: 'putObjs', objRandAngle:true, objName:'slimensen3', objType:'comp', objMin:2, objRand:2},

        weapon:[
            {t:'refilResource', resource: 'mergeAbility', gunSpeed: 30, maxSpeed: 2, doNextWeapon: true},
            {t:'mergeWith', doingNow: 'mergeWith', doNextWeapon: true},
            {t:'double2', DMG:{Dmg:1,T:'normal'}, Dec: 50, Speed: 13, gunSpeed: 5, gunWork: 20, gunReload: 90, Wide:10, lastShot: 100, maxSpeed: 2, minAlarm: 5,minDistToEnemy:500},
        ],

        toDo: [
            {N:88,T:'mergeSearch',  usedRes:'mergeAbility', usedResR: 20, mergeWith: 'slimensen2', mergeDist: 750},
            {N:55,T:'alarmAboutSpottedEnemy', minAlarm: 5, alarmRadius: 250},
            {N:45,T:'lowerAlarmLvl', minAlarm: 5, minEnemyDontSeen: 750, gotoAlarm: 4, goToSpotLvl: 2},
            {N:35,T:'followEnemy', minAlarm: 5, goToSpotLvl: 3 },
            {N:23,T:'stayInRegion', X:0, Y:0, Radius: 1700 },
            {N:18,T:'changeManouver2', maxAlarm: 4, minAlarm: 3, straightMin: 20, straightPlus: 80, turnMin: 10, turnPlus: 80  },
            {N:15,T:'changeManouver', maxAlarm: 3, straightMin: 60, straightPlus: 100, turnMin: 30, turnPlus: 70  },
        ],

        speedArr:[0,
            {S:{shipVar:'speed',Add:-2}, T:1},
            {S:{shipVar:'speed'},        T:{shipVar:'speedT'}},
            {S:{shipVar:'speed',Add:3},  T:{shipVar:'speedT'}}
        ],
        spotTick: 8,
        spotArr: [0,
            {T:'single',Ref: 15, Rad: {shipVar:'spotRad'}},
            {T:'double',Ref: 10, Rad: {shipVar:'spotRad'}, Rad2: {shipVar:'spotRad2'}, Angle2: {spipVar:'spotAngle2'}},
            {T:'single',Ref: 45, Rad: {shipVar:'spotRad2'}}
        ],

        shipVariables:{
            speed: {Const: 7, Rand: 2},
            speedT: {Const: 2, Rand: 1.5},
            spotRad: {Const: 180, RandInt: 80},
            spotRad2: {Const: 400, RandInt: 200},
            spotAngle2: {Const: 40, RandInt: 30}
        },
    },
    slimensen3:{
        extends: 'slimensen',
        view:{
            Letter: 3454,
            LetterSize: 30,
            Color: '#00BB00',
            Angle: 90,
            HitPattern: 'HullFire_20',
        },

        lifeM: 7,
        radius: 15,

        onDieDelete: true,
        onDieHideExplosion: true,
        onDie: {Do:'explode', explodeType: 'putObjs', objRandAngle:true, objName:'slimensen4', objType:'comp', objMin:2, objRand:2},

        weapon:[
            {t:'refilResource', resource: 'mergeAbility', gunSpeed: 15, maxSpeed: 2, doNextWeapon: true},
            {t:'mergeWith', doingNow: 'mergeWith', doNextWeapon: true},
            {t:'single', DMG:{Dmg:1,T:'normal'}, Dec: 50, Speed: 13, gunSpeed: 5, gunWork: 20, gunReload: 90, lastShot: 100, maxSpeed: 2, minAlarm: 5,minDistToEnemy:500},
        ],

        toDo: [
            {N:88,T:'mergeSearch',  usedRes:'mergeAbility', usedResR: 20, mergeWith: 'slimensen3', mergeDist: 750},
            {N:55,T:'alarmAboutSpottedEnemy', minAlarm: 5, alarmRadius: 250},
            {N:45,T:'lowerAlarmLvl', minAlarm: 5, minEnemyDontSeen: 750, gotoAlarm: 4, goToSpotLvl: 2},
            {N:35,T:'followEnemy', minAlarm: 5, goToSpotLvl: 3 },
            {N:23,T:'stayInRegion', X:0, Y:0, Radius: 1700 },
            {N:18,T:'changeManouver2', maxAlarm: 4, minAlarm: 3, straightMin: 20, straightPlus: 80, turnMin: 10, turnPlus: 80  },
            {N:15,T:'changeManouver', maxAlarm: 3, straightMin: 60, straightPlus: 100, turnMin: 30, turnPlus: 70  },
        ],

        speedArr:[0,
            {S:{shipVar:'speed',Add:-2}, T:1},
            {S:{shipVar:'speed'},        T:{shipVar:'speedT'}},
            {S:{shipVar:'speed',Add:3},  T:{shipVar:'speedT'}}
        ],
        spotTick: 8,
        spotArr: [0,
            {T:'single',Ref: 15, Rad: {shipVar:'spotRad'}},
            {T:'double',Ref: 10, Rad: {shipVar:'spotRad'}, Rad2: {shipVar:'spotRad2'}, Angle2: {spipVar:'spotAngle2'}},
            {T:'single',Ref: 45, Rad: {shipVar:'spotRad2'}}
        ],

        shipVariables:{
            speed: {Const: 8, Rand: 2},
            speedT: {Const: 1, Rand: 1},
            spotRad: {Const: 180, RandInt: 80},
            spotRad2: {Const: 400, RandInt: 200},
            spotAngle2: {Const: 40, RandInt: 30}
        },
    },
    slimensen4:{
        extends: 'slimensen',
        view:{
            Letter: 3452,
            LetterSize: 18,
            Color: '#00BB00',
            Angle: 90,
            HitPattern: 'HullFire_20',
        },

        lifeM: 4,
        radius: 12,

        onDieDelete: false,
        onDieHideExplosion: false,
        onDie: false,

        weapon:[
            {t:'refilResource', resource: 'mergeAbility', gunSpeed: 30, maxSpeed: 2, doNextWeapon: true},
            {t:'mergeWith', doingNow: 'mergeWith', doNextWeapon: true},
            {t:'single', DMG:{Dmg:1,T:'normal'}, Dec: 50, Speed: 13, gunSpeed: 30, lastShot: 100, maxSpeed: 2, minAlarm: 5,minDistToEnemy:500},
        ],

        toDo: [
            {N:88,T:'mergeSearch',  usedRes:'mergeAbility', usedResR: 20, mergeWith: 'slimensen4', mergeDist: 750},
            {N:55,T:'alarmAboutSpottedEnemy', minAlarm: 5, alarmRadius: 250},
            {N:45,T:'lowerAlarmLvl', minAlarm: 5, minEnemyDontSeen: 750, gotoAlarm: 4, goToSpotLvl: 2},
            {N:35,T:'followEnemy', minAlarm: 5, goToSpotLvl: 3 },
            {N:23,T:'stayInRegion', X:0, Y:0, Radius: 1700 },
            {N:18,T:'changeManouver2', maxAlarm: 4, minAlarm: 3, straightMin: 20, straightPlus: 80, turnMin: 10, turnPlus: 80  },
            {N:15,T:'changeManouver', maxAlarm: 3, straightMin: 60, straightPlus: 100, turnMin: 30, turnPlus: 70  },
        ],

        speedArr:[0,
            {S:{shipVar:'speed',Add:-2}, T:1},
            {S:{shipVar:'speed'},        T:{shipVar:'speedT'}},
            {S:{shipVar:'speed',Add:3},  T:{shipVar:'speedT'}}
        ],
        spotTick: 8,
        spotArr: [0,
            {T:'single',Ref: 15, Rad: {shipVar:'spotRad'}},
            {T:'double',Ref: 10, Rad: {shipVar:'spotRad'}, Rad2: {shipVar:'spotRad2'}, Angle2: {spipVar:'spotAngle2'}},
            {T:'single',Ref: 45, Rad: {shipVar:'spotRad2'}}
        ],

        shipVariables:{
            speed: {Const: 10, Rand: 2},
            speedT: {Const: 1, Rand: 0.5},
            spotRad: {Const: 180, RandInt: 80},
            spotRad2: {Const: 400, RandInt: 200},
            spotAngle2: {Const: 40, RandInt: 30}
        },
    },
    thunderton:{
        view:{
            Letter: 1006,
            LetterSize: 80,
            Color: 'red',
            Angle:  0,
            HitPattern: 'HullFire_80',
        },

        lifeM: 45,
        radius: 40,



        Bombs:[{
            onHitDieExpire:    {Do:'explode', DMG:{Dmg:7,T:'explo'}, Dist: 80},
        }],
        Shields:[{
            name: 'explosionShield',
            CatchDmgT: {explo:1},
            DmgReduction: 'infinite',
            ReductionUses: 'exploShield',
            HitDieAnimation: 'dontShow',
            Own: true,
        }],
        exploShield: 4,
        Res: {'exploShield': {M:4,T:0}},
        weapon:[
            {t:'refilResource', resource: 'exploShield', gunSpeed: 240, maxSpeed: 2, doNextWeapon: true},
            {t:'bomb', Speed: 0.1, Teleport:{ Dist: 35, Angle: 270, AngleRand: 180}, Dec: 10, BombType: 0, gunSpeed: 10, lastShot: 100, maxSpeed: 2, minAlarm: 5, gunWork:80, gunReload:900, minDistToEnemy:500},
        ],

        doingNow: 'changeManouver',
        doingTime: -1,
        Manouver: 'goStraight',
        toDo: [
            {N:15,T:'changeManouver', maxAlarm: 5, straightMin: 60, straightPlus: 100, turnMin: 30, turnPlus: 70  },
        ],

        speedArr:[0,
            {S:1, T:1},
            {S:1, T:1.5},
            {S:3, T:0.2}
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
    doomderos:{
        view:{
            Letter: 992,
            LetterSize: 60,
            Color: 'red',
            Angle: 180,
            HitPattern: 'HullFire_80',
        },

        lifeM: 18,
        radius: 30,

        fieldCharges: 0,
        Res: {'fieldCharges': {M:10,T:0}},
        weapon:[
            {t:'shootSquadMember', Speed: 7, MemberAge: 130, DieTime: 100},
            {t:'produceSquad', gunSpeed: 1, makeAction: {doingNow:'followEnemyX', gotoSpeed: 0, doingTime: 130, Manouver:'followEnemy', doNotInterupt:true}, lastShot: 100, usedRes:'fieldCharges', usedResR: 10, maxSpeed: 2, FlagsRequired:{squadFull:false}, minDistToEnemy:450},
            {t:'refilResource', resource: 'fieldCharges', gunSpeed: 10, maxSpeed: 2, FlagsRequired:{squadFull:false}},
        ],

        squadScheme: [{
            type: 'RoundField',
            radius: 50,
            angle: 0,
            Oid: -1,
            placementT:'directPlaces',
            objData: {fieldAnim: 'PlasmaField', radius: 40, PeriodDMG:{Dmg:5,T:'normal'}, PeriodTime: 5, PeriodOffset: 5, PeriodDelay: 130, dontHit:['B','BE'], fieldAnimMoving:true, onDie:{Do:'explode', DMG:{Dmg:13,T:'explo'}, Dist: 210}}
        }],

        doingNow: 'changeManouver',
        doingTime: -1,
        Manouver: 'goStraight',
        toDo: [
            {N:35,T:'changeSpeed', maxSpeedLvl: 0, gotoSpeed: 2},
            {N:15,T:'changeManouver', maxAlarm: 5, straightMin: 60, straightPlus: 100, turnMin: 10, turnPlus: 30  },
        ],

        speedArr:[{S: 0, T:3},
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
    hedgehog:{
        view:{
            Letter: 937,
            LetterSize: 60,
            Color: 'red',
            Angle: 0,
            shieldsRadius: 30,
            HitPattern: 'HullFire_40',
        },

        lifeM: 7,
        radius: 25,

        ShieldsRejection:{koriazMax:1},
        prodSquad: 5,
        Res: {'prodSquad': {M:5,T:0}},
        weapon:[
            {t:'refilResource', resource: 'prodSquad', gunSpeed: 60, maxSpeed: 2, doNextWeapon: true},
            {t:'produceSquad', gunSpeed: 0, lastShot: 0, usedRes: 'prodSquad', usedResR: 5, maxSpeed: 2, doNextWeapon: true},
        ],

        squadSchemeType: {
            t:'directPlaces',
            count: 9,
            radius: 25,
            placementT:'conePart',
            coneStart: 230,
            conePart: 290,
            makeFirst: 8,
            life: 1,
            data:{
                type:'enemyShip',
                objectType:'space_mine',
                objData:{explodePreset:'MineNailsConePalm',overWriteObjects:['MineMod_Cone','MineMod_hedgehog']},
                squadAngleType:'alongDirection',
                lifeM:1
        }},
        squadScheme: [],

        doingNow: 'changeManouver',
        doingTime: -1,
        Manouver: 'goStraight',

        speedArr:[0,
            {S:1, T:0.5},
            {S:2, T:2},
            {S:4, T:2}
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
    urser:{
        view:{
            Letter: 467,
            LetterSize: 35,
            Color: 'red',
            Angle: 0,
            HitPattern: 'HullFire_40',
        },

        lifeM: 13,
        radius: 20,

        fieldCharges: 0,
        Res: {'fieldCharges': {M:10,T:0}},
        weapon:[
            {t:'killSquadMember', gunSpeed: 55, FlagsRequired:{squadFull:true},maxSpeed: 2},
            {t:'refilResource', resource: 'fieldCharges', gunSpeed: 20, maxSpeed: 2, doNextWeapon: true},
            {t:'produceSquad', gunSpeed: 1, lastShot: 100, usedRes:'fieldCharges', minDistToEnemy:500, usedResR: 10, doingNow:'followEnemy', makeAction:{doingNow:'followEnemy', doingTime:220, Manouver:'followEnemy',doNotInterupt:true}},
        ],

        squadScheme: [{
            type: 'ConeField',
            radius: 0,
            angle: 0,
            Oid: -1,
            placementT:'directPlaces',
            objData: {fieldAnim: 'DestructionField', radius: 180, angle: 0, coneAngle: 50, coneRad2: 24, PeriodDMG:{Dmg:1,T:'normal'}, PeriodTime: 15, PeriodOffset: 10, particlesOnBoard:true, fieldAnimMoving:true, dontHit:['B','BE','E','M','ME','A'], mapType:'A', mapCollide:['P'], TT:'dust'}
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
            {S:3,   T:1},
            {S:4,   T:3.5},
            {S:5.5, T:2}
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
    talrax:{
        view:{
            Letter: 5084,
            LetterSize: 80,
            Color: 'red',
            Angle: 180,
            HitPattern: 'HullFire_80',
        },

        lifeM: 12,
        radius: 40,

        Bombs:[
            {explodePreset:'StrikeOfEvil'},
            {explodePreset:'EyeOfEvil'},
            {explodePreset:'BubbleStorm'},
            {explodePreset:'ExplosionWorm2'},
        ],

        weapon:[
            {t:'bomb', Speed: 10, Dec: 10, BombRandom: 4, gunSpeed: 100, lastShot: 100, maxSpeed: 2, minAlarm: 5, minDistToEnemy: 600}
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
            {S:0.1, T:1},
            {S:0.4, T:0.5},
            {S:1, T:0.2}
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
    iskarianz:{
        view:{
            Letter: 238,
            LetterSize: 30,
            Color: 'red',
            Angle: 180,
            HitPattern: 'HullFire_20',
            shieldsRadius: 14,
        },

        lifeM: 3,

        onHitKoriazShield: 2,
        Res: {onHitKoriazShield: {M:2,T:0}},
        weapon:[
            {t:'refilResource', resource: 'onHitKoriazShield', gunSpeed: 450, maxSpeed: 2, doNextWeapon: true},
            {t:'double2', DMG:{Dmg:1,T:'normal'}, Dec: 35, Speed: 12, gunSpeed: 5, gunWork: 20, gunReload: 90, lastShot: 100, maxSpeed: 2, minAlarm: 5},
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
    prisander:{
        view:{
            Letter: 338,
            LetterSize: 60,
            Color: 'red',
            Angle: 90,
            HitPattern: 'HullFire_60',
        },

        lifeM: 22,
        radius: 30,

        Bombs:[
            {explodePreset:'MineZen'},
            {explodePreset:'StrikeOfMines'},
        ],

        weapon:[
            {t:'bomb', Speed: 10, Dec: 10, BombRandom: 2, gunSpeed: 100, lastShot: 100, maxSpeed: 2, minAlarm: 5, minDistToEnemy: 600},
            {t:'missle', DMG:{Dmg:0,T:'normal'}, explodePreset:'EyeOfMines', Dec: 95, Speed: 12, gunSpeed: 120, lastShot: 0, minDistToEnemy: 400},
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
            {S:1, T:3},
            {S:2, T:6},
            {S:3, T:2}
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
    yehes:{
        view:{
            Letter: 'Y',
            LetterSize: 80,
            Color: 'red',
            Angle: 0,
            HitPattern: 'HullFire_80',
        },

        lifeM: 32,
        radius: 40,

        Bombs:[
            {explodePreset:'TeleportConeField'},
            {explodePreset:'TeleFastField'},
            {explodePreset:'ElectroBubbleShield'},
        ],

        weapon:[
            {t:'bomb', Speed: 10, Dec: 10, BombRandom: 3, gunSpeed: 100, lastShot: 100, maxSpeed: 2, minAlarm: 5, minDistToEnemy: 600}
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
            {S:0.1, T:1},
            {S:0.4, T:0.5},
            {S:1,   T:0.2}
        ],
        spotTick: 8,
        spotArr: [0,
            {T:'single', Ref: 30, Rad: 500},
            {T:'single', Ref: 30, Rad: 500},
            {T:'single', Ref: 30, Rad: 500}
        ],
        shipVariables:{},
    },
    yehestis:{
        view:{
            Letter: 376,
            LetterSize: 80,
            Color: 'red',
            Angle: 0,
            HitPattern: 'HullFire_80',
        },

        lifeM: 32,
        radius: 40,

        Bombs:[
            {explodePreset:'WindField'},
            {explodePreset:'ShieldsBlobWall'},
            {explodePreset:'ShieldsBlobBomb'},
        ],

        weapon:[
            {t:'bomb', Speed: 10, Dec: 10, BombRandom: 3, gunSpeed: 80, lastShot: 100, maxSpeed: 2, minAlarm: 5, minDistToEnemy: 600}
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
            {S:0.1, T:1},
            {S:0.4, T:0.5},
            {S:1, T:0.2}
        ],
        spotTick: 8,
        spotArr: [0,
            {T:'single',Ref: 30, Rad: 500},
            {T:'single',Ref: 30, Rad: 500},
            {T:'single',Ref: 30, Rad: 500}
        ],
        shipVariables:{},
    },
    yeheslar:{
        view:{
            Letter: 590,
            LetterSize: 80,
            Color: 'red',
            Angle: 0,
            HitPattern: 'HullFire_80',
        },

        lifeM: 32,
        radius: 40,

        Bombs:[
            {explodePreset:'SlowDownConeFields'},
            {explodePreset:'EnergyBubbleShield'},
            {explodePreset:'TeleWall'},
        ],

        weapon:[
            {t:'bomb', Speed: 10, Dec: 10, BombRandom: 3, gunSpeed: 80, lastShot: 100, maxSpeed: 2, minAlarm: 5, minDistToEnemy: 600}
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
            {S:0.1, T:1},
            {S:0.4, T:0.5},
            {S:1, T:0.2}
        ],
        spotTick: 8,
        spotArr: [0,
            {T:'single',Ref: 30, Rad: 500},
            {T:'single',Ref: 30, Rad: 500},
            {T:'single',Ref: 30, Rad: 500}
        ],
        shipVariables:{},
    },
    hesiolumbus:{
        view:{
            Letter: 482,
            LetterSize: 80,
            Color: 'red',
            Angle: 180,
            HitPattern: 'HullFire_80',
        },

        lifeM: 32,
        radius: 40,

        Bombs:[
            {explodePreset:'HealingField'},
        ],

        weapon:[
            {t:'shootHealingBomb', BombType: 0, Speed: 6, Dec: 60, gunSpeed: 600, lastShot: 100, Radius: 360, minimalDmg: 8}
        ],

        doingNow: 'changeManouver',
        doingTime: -1,
        Manouver: 'goStraight',
        toDo: [
            {N:15,T:'changeManouver', maxAlarm: 4, straightMin: 60, straightPlus: 100, turnMin: 30, turnPlus: 70  },
        ],

        speedArr:[0,
            {S:0.1, T:1},
            {S:0.4, T:0.5},
            {S:1,   T:0.2}
        ],
        spotTick: 8,
        spotArr: [0,
            {T:'single', Ref: 30, Rad: 500},
            {T:'single', Ref: 30, Rad: 500},
            {T:'single', Ref: 30, Rad: 500}
        ],
        shipVariables:{},
    },
    saisung:{
        view:{
            Letter: 1414,   // big S with I
            LetterSize: 50,
            Color: 'red',
            Angle: 0,
            HitPattern: 'HullFire_60',
        },

        lifeM: 40,
        radius: 25,

        prodSquad: 18,
        Res: {'prodSquad': {M:18,T:0}},
        weapon:[
            {t:'refilResource', resource: 'prodSquad', gunSpeed: 30, maxSpeed: 2, doNextWeapon: true},
            {t:'produceSquad', gunSpeed: 0, lastShot: 0, usedRes: 'prodSquad', usedResR: 3, maxSpeed: 2, minDistToEnemy:400, doNextWeapon: true},
        ],

        squadSchemeType: {t:'loose', count: 6, data:{type:'enemyShip', objectType:'vuvis'}},
        squadScheme: [],

        doingNow: 'changeManouver',
        doingTime: -1,
        Manouver: 'goStraight',
        toDo: [
            {N:35,T:'followEnemy', minAlarm: 5},
            {N:15,T:'changeManouver', maxAlarm: 5, straightMin: 60, straightPlus: 100, turnMin: 30, turnPlus: 70  },
        ],

        speedArr:[0,
            {S:{shipVar:'speed',Add:-4}, T:1},
            {S:{shipVar:'speed'},        T:{shipVar:'speedT'}},
            {S:{shipVar:'speed',Add:3},  T:{shipVar:'speedT',Add:-1}}

        ],
        spotTick: 8,
        spotArr: [0,
            {T:'single',Ref: 15, Rad: {shipVar:'spotRad'}},
            {T:'double',Ref: 10, Rad: {shipVar:'spotRad'}, Rad2: {shipVar:'spotRad2'}, Angle2: {spipVar:'spotAngle2'}},
            {T:'single',Ref: 45, Rad: {shipVar:'spotRad2'}}
        ],

        shipVariables:{
            speed: {Const: 6, Rand: 3},
            speedT: {Const: 1.5, Rand: 1.5},
            spotRad: {Const: 180, RandInt: 80},
            spotRad2: {Const: 400, RandInt: 200},
            spotAngle2: {Const: 40, RandInt: 30}
        },
    },
};
