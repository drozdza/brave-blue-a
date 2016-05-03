ObjectPutDatas={
    healing_missle:{
        viewLetter: 'J',
        viewLetterSize: 12,
        viewColor: '0f0',
        viewAngle: 180,

        lifeM: 1,
        speed: 13,
        speedT: 20,
        Power: 1,
        doingTime: 230,
        toDo: [{T:'die'}],
        Manouver: 'followEntity',
        Flags:{},
    },
    missle:{
        viewLetter: 'Y',
        viewLetterSize: 12,
        viewColor: '#ff0',
        viewAngle: 0,

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
        viewLetter: 'P',
        viewLetterSize: 12,
        viewColor: '#ff0',
        viewAngle: 0,

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
        viewLetter: 'R',
        viewLetterSize: 10,
        viewColor: '#ff0',
        viewAngle: 0,
        speed:0,
        angle:0,
        radius:6,
        dec:0,
        ammo:0,
        toDo:0,

        lifeM: 1,
        onHit: {Do:'explode',Power: 4, Dist: 35, explodeType: 'nails', NailsRad: 24, NailsSpeed: 6, NailsSpeedPlus: 0, NailsDec: 45, NailsDecPlus: 0, NailsAngleCenter: 8, NailsAngleBoth: 1, NailsNeutral: true},
        onDie: {Do:'explode',Power: 4, Dist: 35, explodeType: 'nails', NailsRad: 24, NailsSpeed: 6, NailsSpeedPlus: 0, NailsDec: 45, NailsDecPlus: 0, NailsAngleCenter: 8, NailsAngleBoth: 1, NailsNeutral: true},

        // onHit: {Do:'explode',Power: 4, Dist: 35, explodeType: 'nails', NailsRad: 24, NailsSpeed: 4, NailsSpeedPlus: 6, NailsDec: 16, NailsDecPlus: 6, NailsNeutral: true},
        // onDie: {Do:'explode',Power: 4, Dist: 35, explodeType: 'nails', NailsRad: 24, NailsSpeed: 4, NailsSpeedPlus: 6, NailsDec: 16, NailsDecPlus: 6, NailsNeutral: true},

        squadScheme: {
            0:{ angle: 0, radius: 0, id: -1, make: {What:{RoundField:1},objData:{x:0,y:-1000, angle: 0, radius: 150, colorInactive: false, colorActive: 'rgba(255,0,0,0.4)', OneTimeEffect: 1, OneTimeOffset: 10, OneTimeDetect: 1, dontHit:['B','BE','E','M','ME','A']}}}
        },

        detectMovementField:{ angle: 0, radius: 80, color: "rgba(255,0,0,0.4)"},
        Flags:{}
    },
    star:{
        viewLIBpath:'StarPath',
        viewPathSize:30,
        viewColor:'white',
        viewAngle:0,
        viewHitPattern:'StarHit',
        lifeM:6,
        Flags:{},
    },
    Gstar:{
        viewLIBpath:'StarPath',
        viewPathSize:170,
        viewColor:'yellow',
        viewAngle:0,
        viewXY:180,
        radius: 90,
        undestructible: 1,
        bounceType: 'straight',
        Flags:{},
    },
    RoundField:{
        radius: 50,
        circleColor:[255,255,255,0.2],
        undestructible: 1,
        Flags:{},
    },
    SquareField:{
        radius: 50,
        color: 'red',
        squareAngle: 0,
        squareLen: 50,
        squareWidth: 15,
        undestructible: 1,
        Flags:{},
    },
    ConeField:{
        radius: 50,
        color: 'red',
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
        viewLetter: 'A',
        viewLetterSize: 16,
        viewColor: 'red',
        viewAngle: 0,
        viewHitPattern: 'HullFire_20',
        lifeM: 5,

        weapon:[{t:'single', Power:1, Dec: 50, Speed: 10, gunSpeed: 15, lastShot: 100, maxSpeed: 2, minAlarm: 5}],

        doingNow: 'changeManouver',
        doingTime: -1,
        Manouver: 'goStraight',
        toDo: [
            {N:55,T:'alarmAboutSpottedEnemy', minAlarm: 5, alarmRadius: 250},
            {N:45,T:'lowerAlarmLvl', minAlarm: 5, minEnemyDontSeen: 750, goToAlarmLvl: 4, goToSpotLvl: 2},
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
        viewLetter: 'M',
        viewLetterSize: 40,
        viewColor: 'red',
        viewAngle: 0,
        viewHitPattern: 'HullFire_40',
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
        viewLetter: 'N',
        viewLetterSize: 40,
        viewColor: 'red',
        viewAngle: 0,
        viewHitPattern: 'HullFire_40',
        lifeM: 4,
        radius: 20,

        Bombs:[{
            onHit: {Do:'explode',Power: 4, Dist: 35},
            onDie: {Do:'explode',Power: 4, Dist: 35},
            onExpire: {Do:'explode',Power: 4, Dist: 35}
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
        viewLetter: 'W',
        viewLetterSize: 40,
        viewColor: 'red',
        viewAngle: 0,
        viewHitPattern: 'HullFire_40',
        lifeM: 11,
        radius: 23,

        Bombs:[{
            onHit: {Do:'explode',Power: 4, Dist: 35},
            onDie: {Do:'explode',Power: 4, Dist: 35},
            onExpire: {Do:'explode',Power: 4, Dist: 35, Shards:[
                {   Dec: 8, Speed: 7, Angle: -30,
                    onHit: {Do:'explode',Power: 4, Dist: 35},
                    onDie: {Do:'explode',Power: 4, Dist: 35},
                    onExpire: {Do:'explode',Power: 4, Dist: 35, Shards:[
                        {   Dec: 8, Speed: 7, Angle: -15,
                            onHit: {Do:'explode',Power: 4, Dist: 35},
                            onDie: {Do:'explode',Power: 4, Dist: 35},
                            onExpire: {Do:'explode',Power: 4, Dist: 35, Shards:[
                                {   Dec: 12, Speed: 5, Angle: 0,
                                    onHit: {Do:'explode',Power: 4, Dist: 80},
                                    onDie: {Do:'explode',Power: 4, Dist: 80},
                                    onExpire: {Do:'explode',Power: 4, Dist: 80},
                                }]
                            },
                        }]
                    }
                },{ Dec: 16, Speed: 7, Angle: 0,
                    onHit: {Do:'explode',Power: 4, Dist: 80},
                    onDie: {Do:'explode',Power: 4, Dist: 80},
                    onExpire: {Do:'explode',Power: 4, Dist: 80, Shards:[
                        {   Dec: 12, Speed: 7, Angle: 0,
                            onHit: {Do:'explode',Power: 4, Dist: 120},
                            onDie: {Do:'explode',Power: 4, Dist: 120},
                            onExpire: {Do:'explode',Power: 4, Dist: 120},
                        }]
                    }
                },{ Dec: 8, Speed: 7, Angle: 30,
                    onHit: {Do:'explode',Power: 4, Dist: 35},
                    onDie: {Do:'explode',Power: 4, Dist: 35},
                    onExpire: {Do:'explode',Power: 4, Dist: 35, Shards:[
                        {   Dec: 8, Speed: 7, Angle: 15,
                            onHit: {Do:'explode',Power: 4, Dist: 35},
                            onDie: {Do:'explode',Power: 4, Dist: 35},
                            onExpire: {Do:'explode',Power: 4, Dist: 35, Shards:[
                                {   Dec: 12, Speed: 5, Angle: 0,
                                    onHit: {Do:'explode',Power: 4, Dist: 80},
                                    onDie: {Do:'explode',Power: 4, Dist: 80},
                                    onExpire: {Do:'explode',Power: 4, Dist: 80},
                                }]
                            },
                        }]
                    }
                }
            ]}
        }],

        weapon:[{t:'bomb', Speed: 10, Dec: 12, BombType: 0, gunSpeed: 140, lastShot: 100, maxSpeed: 2, makeAction: {Manuover: 'goStraight', doingTime:55, gotoSpeed:1}, minAlarm: 5, minDistToEnemy: 400}],

        doingNow: 'changeManouver',
        doingTime: -1,
        Manouver: 'goStraight',
        toDo: [
            {N:61,T:'speedUp', maxSpeedLvl: 1, gotoSpeed: 2},
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
        viewLetter: 'D',
        viewLetterSize: 40,
        viewColor: 'red',
        viewAngle: 270,
        viewHitPattern: 'HullFire_40',
        lifeM: 7,
        radius: 20,

        prodSquad: 5,
        Res: {'prodSquad': {M:5,T:0}},
        weapon:[
            {t:'refilResource', resource: 'prodSquad', gunSpeed: 22, maxSpeed: 2, doNextWeapon: true},
            {t:'healSquad', gunSpeed: 0, lastShot: 0, usedRes: 'prodSquad', usedResR: 1, maxSpeed: 2, doNextWeapon: true},
            {t:'produceSquad', gunSpeed: 0, lastShot: 0, usedRes: 'prodSquad', usedResR: 1, maxSpeed: 2, doNextWeapon: true},
        ],

        squadSchemeType: {t:'round', count: 16, radius: 100, placement: 'oddFirst', makeFirst: 8, life: 3, data:{type:'shieldBlob', lifeM:6}},
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
        viewLetter: '#',
        viewLetterSize: 40,
        colorFill:[0,255,200,1],
        viewAngle: 0,
        lifeM: 3,
        radius: 21,
        viewHitPattern:'ShieldBlobHit',

        backgroundCircle: 21,
        colorCircle:[0,200,100,1],
    },
    royale:{
        viewLetter: 'R',
        viewLetterSize: 40,
        viewColor: 'red',
        viewAngle: 0,
        viewHitPattern: 'HullFire_40',
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
        viewLetter: 'E',
        viewLetterSize: 40,
        viewColor: 'red',
        viewAngle: 0,
        viewHitPattern: 'HullFire_40',
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
            objData: {fieldAnim: 'ElectricityField', radius: 130, OneTimeEffect: 1, OneTimeOffset: 3, OneTimeDamage: 4, dontHit:['B','BE','E','M','ME','A']}
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
        viewLetter: 'H',
        viewLetterSize: 20,
        viewColor: 'red',
        viewAngle: 0,
        viewHitPattern: 'HullFire_20',
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
        viewLetter: 'I',
        viewLetterSize: 20,
        viewColor: 'red',
        viewAngle: 0,
        viewHitPattern: 'HullFire_20',
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
            {N:45,T:'lowerAlarmLvl', minAlarm: 5, minEnemyDontSeen: 750, goToAlarmLvl: 4, goToSpotLvl: 2},
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
        viewLetter: 'T',
        viewLetterSize: 60,
        viewColor: 'red',
        viewAngle: 0,
        viewHitPattern: 'HullFire_40',
        lifeM: 9,
        radius: 27,

        weapon:[
            {t:'double', Speed:12, Dec:30, Power:1, doingNow:'shooting', gunSpeed:1,  maxSpeed:2},
            {t:'changeAction', makeAction: {Manuover:'goStraight', doingNow:'shooting', doingTime:10}, gunSpeed: 110, lastShot: 100,  minAlarm: 5, minDistToEnemy: 400}],

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
        viewLetter: 'B',
        viewLetterSize: 40,
        viewColor: 'red',
        viewAngle: 90,
        viewHitPattern: 'HullFire_40',
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
            spotRad2: {Const: 300, RandInt: 200},
            spotAngle2: {Const: 30, RandInt: 30}
        },
    },
    koriaz:{
        viewLetter: 'K',
        viewLetterSize: 16,
        viewColor: 'red',
        viewAngle: 270,
        viewHitPattern: 'HullFire_20',
        lifeM: 7,
        radius: 10,

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
    fariax:{
        viewLetter: 'F',
        viewLetterSize: 40,
        viewColor: 'red',
        viewAngle: 0,
        viewHitPattern: 'HullFire_40',
        lifeM: 9,
        radius: 20,
    },
    dregos:{
        viewLetter: 'U',
        viewLetterSize: 20,
        viewColor: 'red',
        viewAngle: 0,
        viewHitPattern: 'HullFire_20',
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
            {N:45,T:'lowerAlarmLvl', minAlarm: 5, minEnemyDontSeen: 750, goToAlarmLvl: 4, goToSpotLvl: 2},
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
        viewLetter: 'V',
        viewLetterSize: 20,
        viewColor: 'red',
        viewAngle: 0,
        viewHitPattern: 'HullFire_20',
        lifeM: 5,
    },
    cloaker:{
        viewLetter: 'C',
        viewLetterSize: 20,
        viewColor: 'red',
        viewAngle: 270,
        viewHitPattern: 'HullFire_20',
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
        viewLetter: 'S',
        viewLetterSize: 20,
        viewColor: 'red',
        viewAngle: 0,
        viewHitPattern: 'HullFire_20',
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
            {N:45,T:'lowerAlarmLvl', minAlarm: 5, minEnemyDontSeen: 750, goToAlarmLvl: 4, goToSpotLvl: 2},
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
        viewLetter: 'Q',
        viewLetterSize: 80,
        viewColor: 'red',
        viewAngle: 0,
        viewHitPattern: 'HullFire_80',
        lifeM: 60,
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
        viewLetter: 'J',
        viewLetterSize: 80,
        viewColor: 'red',
        viewAngle: 0,
        viewHitPattern: 'HullFire_80',
        lifeM: 12,
        radius: 40,

        Bombs:[
            {
                onHit: {Do:'explode',Power: 4, Dist: 35},
                onDie: {Do:'explode',Power: 4, Dist: 35},
                onExpire: {Do:'explode',Power: 4, Dist: 35}
            },
            {
                onHit: {Do:'explode',Power: 7, Dist: 80},
                onDie: {Do:'explode',Power: 7, Dist: 80},
                onExpire: {Do:'explode',Power: 7, Dist: 80}
            },
            {
                onHit: {Do:'explode',Power: 11, Dist: 120},
                onDie: {Do:'explode',Power: 11, Dist: 120},
                onExpire: {Do:'explode',Power: 11, Dist: 120}
            },
            {
                onHit: {Do:'explode',Power: 18, Dist: 210},
                onDie: {Do:'explode',Power: 18, Dist: 210},
                onExpire: {Do:'explode',Power: 18, Dist: 210}
            }
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
            {N:45,T:'lowerAlarmLvl', minAlarm: 5, minEnemyDontSeen: 15, goToAlarmLvl: 4, goToSpotLvl: 2},
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
        viewLetter: 'G',
        viewLetterSize: 80,
        viewColor: 'red',
        viewAngle: 270,
        viewHitPattern: 'HullFire_80',
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

};
