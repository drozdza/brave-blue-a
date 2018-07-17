
BBAdata.ObjectData.fariax={
    LoadMods:{
        enemyShip2:{},
    },
    view:{
        Letter: 'F',
        LetterSize: 40,
        Color: 'red',
        Angle: 0,
        HitPattern: 'HullFire_40',
    },

    lifeM: 9,
    radius: 20,

// ---------------------------------------

    WeaponTypes: {},
    Weapons:{
        shotHealingMissile:{t:'shotHealingMissile', Radius: 350, gunSpeed: 20, gunSpeed: 15, lastShot: 0},
    },

    Manouver: 'goStraight',

    TheState: 'defending',
    TheStateLists: {
        defending: {
            markPoint:{T:'markPoint', pT:'Healing', Radius: 120},
        },
        fleeing:{
            speed:{T:'speed', SpeedLvl:'max'},
        },
        attacking: {
            speed:{T:'speed', SpeedLvl:'normal'},
            shot:{T:'shot', WeaponTypes: {single:1}},
            look:{T:'look', LookType:'fighting'},
        },
        patroling: {
            look:{T:'look', LookType:'curious'},
        }
    },

    ThinkNow: 'followRoute',
    ThinkTick: 0,
    Thinks: {
        goToCenter:{T:'followRoutePoint', S:{defending:1}, Time: 20, TimePlus: 20, RoutePoint: 'routePoint1', Radius: 100, MinFromRoutePoint: 400},
        followEnemy:{T:'followEnemy', S:{defending:1}, Time: 30, TimePlus: 60, Radius: 0, MaxEnemyDist: 400},
        changeManouver:{T:'changeManouver', S:{defending:1}, D:[
            {M:'goStraight', Time:20, TimePlus:30, notTwice:1},
            {M:'turnLeft', Time:20, TimePlus:50, maxTurn:180},
            {M:'turnRight', Time:20, TimePlus:50, maxTurn:180},
        ]},

        fleeFromEnemy:{T:'followEnemy', S:{fleeing:1}, Time: 20, TimePlus: 20, Radius: 50, AnglePlus:180, MaxEnemyDist: 200},
        fleeToCenter:{T:'followRoutePoint', S:{fleeing:1}, Time: 20, TimePlus: 20, RoutePoint: 'routePoint1', Radius: 100},

        resignFromFight:{T:'changeTheState', S:{attacking:1}, TheState: 'patroling', Time: 5, FlagMinTime:{Flag:'V_NearbySeesEnemy',Time:240}},
        followEnemy:{T:'followEnemy', S:{attacking:1}, Time: 200, TimePlus: 200, Radius: 50},

        followRoute:{T:'followRoute', S:{patroling:1}, Route:'R2'},

        avoidIncomingFire:{T:'avoidIncomingFire', S:{}, Time: 8, TimePlus: 10, dontInterupt:true},
    },
    FlagReactions: {
        I_ReadyForEnemy:{
            changeTheState: {T:'changeTheState', TheState:'patroling', reqTheState:{ off:1, idle:1 }},
        },
        II_EnemyIsThere:{
            changeTheState: {T:'changeTheState', TheState:'patroling', reqTheState:{ off:1, idle:1 }},
            emitReadiness: {T:'emitFlagLater', Flag:'II_EnemyIsThere', Radius: 200, periodOffTime: 50, offTime: 2, periodTime: 60, nPeriods: 15},
        },
        V_NearbySeesEnemy:{
            addFlags:{T:'addFlags', Flags:['I_ReadyForEnemy','II_EnemyIsThere','III_SomeoneSeenEnemy']},
            emitNearbySeesEnemy: {T:'emitFlagXY', Flag:'V_NearbySeesEnemy', Radius: 50, offTime: 7, pChance: 25},
            changeTheState: {T:'changeTheState', TheState:'attacking', reqTheState:{ off:1, idle:1, patroling:1 }},
        },
        VI_ISeeEnemy:{
            addFlags: {T:'addFlags', Flags:['V_NearbySeesEnemy','IV_SeenEnemy']},
            emitNearbySeesEnemy: {T:'emitFlagXY', Flag:'V_NearbySeesEnemy', Radius: 50, offTime: 7},
            changeTheState: {T:'changeTheState', TheState:'attacking', reqTheState:{ off:1, idle:1, patroling:1 }},
        },
        IGotHit:{
            addFlags:{T:'addFlags', Flags:['I_ReadyForEnemy','II_EnemyIsThere']},
            emitGotHit: {T:'emitFlagXY', Flag:'NearbyGotHit', Radius: 150},
            makeThink: {T:'makeThink', Think:'avoidIncomingFire', notTheState:{ beeingHeroic:1 }}
        },
        NearbyGotHit:{
            addFlags:{T:'addFlags', Flags:['I_ReadyForEnemy','II_EnemyIsThere']},
            makeThink: {T:'makeThink', Think:'avoidIncomingFire', notTheState:{ beeingHeroic:1 }}
        },
        LowLife:{
            changeTheState: {T:'changeTheState', TheState:'fleeing', notTheState:{ beeingHeroic:1 }},
        },
    },
// ---------------------------------------




    SpeedArr:{
        slow:   {S: 1, T:1},
        normal: {S: 2, T:1.5},
        max:    {S: 7, T:0.2}
    },
    LookTick: 8,
    LookType: false,
    LookArr: {
        sleepy: {T:'single', ticks: 20, Rad: {SV:'spotRad'}},
        curious: {T:'double', ticks: 7, Rad: {SV:'spotRad'}, Rad2: {SV:'spotRad2'}, Angle2: {SV:'spotAngle2'}},
        fighting: {T:'single', ticks: 20, Rad: {SV:'spotRad2'}}
    },

    shipVariables:{
        spotRad: {Const: 180, RandInt: 80},
        spotRad2: {Const: 400, RandInt: 200},
        spotAngle2: {Const: 40, RandInt: 30}
    },
};

// =============================================================================
// ============================== OLD ONES =====================================
// =============================================================================

BBAdata.ObjectData.muerto={
    LoadMods:{
        enemyShip:{},
        biggerEnemy:{},
    },
    view:{
        Letter: 'M',
        LetterSize: 40,
        Color: 'red',
        Angle: 0,
        HitPattern: 'HullFire_40',
    },

    lifeM: 9,
    radius: 20,

    Weapon:[
        {t:'rose', DMG:{Dmg:1,T:'normal'}, Dec: 50, Speed: 10, gunSpeed: 50, lastShot: 100, AtOnce: 9, RoseAngle: 4, maxSpeed: 2, minAlarm: 5, minDistToEnemy: 400}
    ],

    SpeedArr:[0,
        {S:1, T:1},
        {S:3, T:2},
        {S:6, T:2}
    ],
};
BBAdata.ObjectData.nemezis={
    LoadMods:{
        enemyShip:{},
        biggerEnemy:{},
    },
    view:{
        Letter: 'N',
        LetterSize: 40,
        Color: 'red',
        Angle: 0,
        HitPattern: 'HullFire_40',
    },

    lifeM: 4,
    radius: 20,

    WeaponMods:[{
        onHitDieExpire:    {Do:'explode', DMG:{Dmg:4,T:'explo'}, Dist: 35},
    }],

    Weapon:[{t:'bomb', Speed: 10, Dec: 50, WeaponModType: 0, gunSpeed: 40, lastShot: 100, maxSpeed: 2, minAlarm: 5, minDistToEnemy: 400}],

    SpeedArr:[0,
        {S:1, T:1},
        {S:3, T:2},
        {S:6, T:2}
    ],
};
BBAdata.ObjectData.warastein={
    LoadMods:{
        enemyShip:{},
        biggerEnemy:{},
    },
    view:{
        Letter: 'W',
        LetterSize: 40,
        Color: 'red',
        Angle: 0,
        HitPattern: 'HullFire_40',
    },

    lifeM: 11,
    radius: 23,

    WeaponMods:[{ explodePreset:'WarasteinExploCone' }],

    Weapon:[{t:'bomb', Speed: 10, Dec: 12, WeaponModType: 0, gunSpeed: 140, lastShot: 100, maxSpeed: 2, makeAction: {Manuover: 'goStraight', doingTime:55, gotoSpeed:1}, minAlarm: 5, minDistToEnemy: 400}],

    toDo: [
        {N:61,T:'changeSpeed', maxSpeedLvl: 1, gotoSpeed: 2},
    ],

    SpeedArr:[0,
        {S:3, T:4},
        {S:7, T:3},
        {S:7, T:3}
    ],
};
BBAdata.ObjectData.dandares={
    LoadMods:{
        enemyShip:{},
        biggerEnemy:{removeToDo:['changeManouver'],},
    },
    view:{
        Letter: 'D',
        LetterSize: 40,
        Color: 'red',
        Angle: 270,
        HitPattern: 'HullFire_40',
    },

    lifeM: 7,
    radius: 20,

    ShieldsRejection:{maxShield:1},

    Res: {'prodSquad': {R:5,M:5,T:0}},
    Weapon:[
        {t:'refilResource', resource: 'prodSquad', gunSpeed: 22, maxSpeed: 2, doNextWeapon: true},
        {t:'healSquad', gunSpeed: 0, lastShot: 0, usedRes: 'prodSquad', usedResR: 1, maxSpeed: 2, doNextWeapon: true},
        {t:'produceSquad', gunSpeed: 0, lastShot: 0, usedRes: 'prodSquad', usedResR: 1, maxSpeed: 2, doNextWeapon: true},
    ],

    squadSchemeType: {t:'directPlaces', count: 16, radius: 100, placementT:'round', placement: 'oddFirst', makeFirst: 8, life: 3, data:{type:'shieldBlob', lifeM:6}},
    squadScheme: [],

    SpeedArr:[0,
        {S:1, T:0.5},
        {S:4, T:2},
        {S:8, T:2}
    ],
};
BBAdata.ObjectData.royale={
    LoadMods:{
        enemyShip:{},
    },
    view:{
        Letter: 'R',
        LetterSize: 40,
        Color: 'red',
        Angle: 0,
        HitPattern: 'HullFire_40',
    },

    lifeM: 16,
    radius: 20,

    Weapon:[
        {t:'missileCrown', DMG:{Dmg:1,T:'explo'}, Dec: 95, Speed: 12, gunSpeed: 120, lastShot: 0, minDistToEnemy: 400},
    ],

    doingNow: 'changeManouver',
    doingTime: -1,
    Manouver: 'goStraight',
    toDo: [
        {N:15,T:'changeManouver', maxAlarm: 5, straightMin: 60, straightPlus: 100, turnMin: 30, turnPlus: 70  },
    ],

    SpeedArr:[0,
        {S:1.2, T:2},
        {S:3, T:2},
        {S:6, T:2}
    ],
    LookTick: 8,
    LookArr: [0,
        {T:'single',Ref: 15, Rad: {SV:'spotRad'}},
        {T:'double',Ref: 10, Rad: {SV:'spotRad'}, Rad2: {SV:'spotRad2'}, Angle2: {SV:'spotAngle2'}},
        {T:'single',Ref: 45, Rad: {SV:'spotRad2'}}
    ],

    shipVariables:{
        spotRad: {Const: 180, RandInt: 80},
        spotRad2: {Const: 400, RandInt: 200},
        spotAngle2: {Const: 40, RandInt: 30}
    },
};
BBAdata.ObjectData.edison={
    LoadMods:{
        enemyShip:{},
    },
    view:{
        Letter: 'E',
        LetterSize: 40,
        Color: 'red',
        Angle: 0,
        HitPattern: 'HullFire_40',
    },

    lifeM: 9,
    radius: 20,

    Res: {'fieldCharges': {R:10,M:10,T:0}},
    Weapon:[
        {t:'refilResource', resource: 'fieldCharges', gunSpeed: 16, maxSpeed: 2, FlagsRequired:{squadFull:false}, doNextWeapon: true},
        {t:'produceSquad', gunSpeed: 1, lastShot: 100, usedRes:'fieldCharges', usedResR: 10, maxSpeed: 2, FlagsRequired:{squadFull:false }},
    ],

    squadScheme: [{
        type: 'Field',
        objName: 'RoundElectricityField',
        radius: 0,
        angle: 0,
        Oid: -1,
        placementT: 'directPlaces',
        Mod: {radius: 130, OneTimeEffect: 1, OneTimeOffset: 3, OneTimeDMG:{Dmg:4,T:'energy'}, fieldAnimMoving:true}
    }],

    doingNow: 'changeManouver',
    doingTime: -1,
    Manouver: 'goStraight',

    SpeedArr:[0,
        {S:1.5, T:3},
        {S:3, T:6},
        {S:5, T:6}
    ],
    LookTick: 8,
    LookArr: [0,
        {T:'single',Ref: 15, Rad: {SV:'spotRad'}},
        {T:'double',Ref: 10, Rad: {SV:'spotRad'}, Rad2: {SV:'spotRad2'}, Angle2: {SV:'spotAngle2'}},
        {T:'single',Ref: 45, Rad: {SV:'spotRad2'}}
    ],

    shipVariables:{
        spotRad: {Const: 80, RandInt: 80},
        spotRad2: {Const: 300, RandInt: 200},
        spotAngle2: {Const: 30, RandInt: 30}
    },

};
BBAdata.ObjectData.hiacynt={
    LoadMods:{
        enemyShip:{},
    },
    view:{
        Letter: 'H',
        LetterSize: 20,
        Color: 'red',
        Angle: 0,
        HitPattern: 'HullFire_20',
    },

    lifeM: 4,
    radius: 15,

    Res: {'shieldBlobProd': {R:0,M:10,T:0}},
    Weapon:[
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

    SpeedArr:[0,
        {S:2, T:1},
        {S:5, T:2},
        {S:10,T:2}
    ],
    LookTick: 8,
    LookArr: [0,
        {T:'single',Ref: 15, Rad: {SV:'spotRad'}},
        {T:'double',Ref: 10, Rad: {SV:'spotRad'}, Rad2: {SV:'spotRad2'}, Angle2: {SV:'spotAngle2'}},
        {T:'single',Ref: 45, Rad: {SV:'spotRad2'}}
    ],

    shipVariables:{
        spotRad: {Const: 80, RandInt: 80},
        spotRad2: {Const: 300, RandInt: 200},
        spotAngle2: {Const: 30, RandInt: 30}
    },
};
BBAdata.ObjectData.iskariot={
    LoadMods:{
        enemyShip:{},
    },
    view:{
        Letter: 'I',
        LetterSize: 20,
        Color: 'red',
        Angle: 0,
        HitPattern: 'HullFire_20',
    },

    lifeM: 3,
    radius: 15,

    Shields:[{
        name: 'jumpShield',
        CatchDmgT: {normal:1, energy:1, explo:1},
        DmgReduction: 'infinite',
        ReductionUses: 'onHitJump',
        ResPath: 'Res',
        jumpOnHit: 170,
        Own: true,
        HitDieAnimation: 'dontShow',
    }],

    Res: {'onHitJump': {M:3,R:3,T:0}},
    Weapon:[
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
        {N:18,T:'changeManouver2', maxAlarm: 4, minAlarm: 3, straightMin: 20, straightPlus: 80, turnMin: 10, turnPlus: 80  },
        {N:15,T:'changeManouver', maxAlarm: 3, straightMin: 60, straightPlus: 100, turnMin: 30, turnPlus: 70  },
    ],

    SpeedArr:[0,
        {S: {SV:'speed',Add:-5}, T:{SV:'speedT',Add:-0.6}},
        {S: {SV:'speed'}, T:{SV:'speedT'}},
        {S: {SV:'speed',Add:4}, T:{SV:'speedT'}}
    ],
    LookTick: 8,
    LookArr: [0,
        {T:'single',Ref: 20, Rad: {SV:'spotRad'}},
        {T:'double',Ref: 20, Rad: {SV:'spotRad'}, Rad2: {SV:'spotRad2'}, Angle2: {SV:'spotAngle2'}},
        {T:'single',Ref: 20, Rad: {SV:'spotRad2'}}
    ],

    shipVariables:{
        speed: {Const: 7, Rand: 1.5},
        speedT: {Const: 2.5, Rand: 1},
        spotRad: {Const: 80, RandInt: 80},
        spotRad2: {Const: 300, RandInt: 200},
        spotAngle2: {Const: 30, RandInt: 30}
    },
};
BBAdata.ObjectData.tartaros={
    LoadMods:{
        enemyShip:{},
    },
    view:{
        Letter: 'T',
        LetterSize: 60,
        Color: 'red',
        Angle: 0,
        HitPattern: 'HullFire_40',
    },

    lifeM: 9,
    radius: 27,

    Weapon:[
        {t:'double', Speed:12, Dec:30, DMG:{Dmg:1,T:'normal'}, doingNow:'shooting', gunSpeed:1,  maxSpeed:2},
        {t:'changeAction', makeAction: {Manuover:'goStraight', doingNow:'shooting', doingTime:10, doNotInterupt:true}, gunSpeed: 110, lastShot: 100,  minAlarm: 5, minDistToEnemy: 400}
    ],

    doingNow: 'changeManouver',
    doingTime: -1,
    Manouver: 'goStraight',
    toDo: [
        {N:15,T:'changeManouver', maxAlarm: 3, straightMin: 60, straightPlus: 100, turnMin: 30, turnPlus: 70}
    ],

    SpeedArr:[0,
        {S:3, T:3},
        {S:5, T:6},
        {S:8, T:6}
    ],
    LookTick: 8,
    LookArr: [0,
        {T:'single',Ref: 15, Rad: {SV:'spotRad'}},
        {T:'double',Ref: 10, Rad: {SV:'spotRad'}, Rad2: {SV:'spotRad2'}, Angle2: {SV:'spotAngle2'}},
        {T:'single',Ref: 45, Rad: {SV:'spotRad2'}}
    ],

    shipVariables:{
        spotRad: {Const: 80, RandInt: 80},
        spotRad2: {Const: 300, RandInt: 200},
        spotAngle2: {Const: 30, RandInt: 30}
    },
};
BBAdata.ObjectData.belzebub={
    LoadMods:{
        enemyShip:{},
    },
    view:{
        Letter: 'B',
        LetterSize: 40,
        Color: 'red',
        Angle: 90,
        HitPattern: 'HullFire_40',
    },

    lifeM: 9,
    radius: 20,


    WeaponMods:[
        {explodePreset:'ExplosionSize2'},
        {explodePreset:'NailedMine2'},
        {explodePreset:'DestructionFieldMedium'},
        {explodePreset:'StatisBulletBomb'},
        {explodePreset:'HugeExplosionRose'},
    ],

    Weapon:[
        {t:'dropSpaceMine', ShotMine: true, WeaponModRandom: 4, gunSpeed: 120, lastShot: 100,  minAlarm: 5, minDistToEnemy: 260},
        {t:'dropSpaceMine', gunSpeed: 750, WeaponModType: 4, lastShot: 100,  maxAlarm: 4},

    ],

    doingNow: 'changeManouver',
    doingTime: -1,
    Manouver: 'goStraight',
    toDo: [
        {N:15,T:'changeManouver', maxAlarm: 3, straightMin: 60, straightPlus: 100, turnMin: 30, turnPlus: 70}
    ],

    SpeedArr:[0,
        {S:3, T:3},
        {S:5, T:3},
        {S:8, T:3}
    ],
    LookTick: 8,
    LookArr: [0,
        {T:'single',Ref: 15, Rad: {SV:'spotRad'}},
        {T:'double',Ref: 10, Rad: {SV:'spotRad'}, Rad2: {SV:'spotRad2'}, Angle2: {SV:'spotAngle2'}},
        {T:'single',Ref: 45, Rad: {SV:'spotRad2'}}
    ],

    shipVariables:{
        spotRad: {Const: 80, RandInt: 80},
        spotRad2: {Const: 400, RandInt: 200},
        spotAngle2: {Const: 30, RandInt: 30}
    },
};
BBAdata.ObjectData.koriaz={
    LoadMods:{
        enemyShip:{},
    },
    view:{
        Letter: 'K',
        LetterSize: 16,
        Color: 'red',
        Angle: 270,
        HitPattern: 'HullFire_20',
    },

    lifeM: 7,
    radius: 10,

    ShieldsRejection:{maxShield:1},
    Weapon:[
        {t:'addMaxShield', Radius: 500, shieldTime: 15, gunSpeed: 12, lastShot: 100},
    ],

    doingNow: 'changeManouver',
    doingTime: -1,
    Manouver: 'goStraight',
    toDo: [
        {N:15,T:'changeManouver', maxAlarm: 5, straightMin: 60, straightPlus: 100, turnMin: 30, turnPlus: 70  },
    ],

    SpeedArr:[0,
        {S:2, T:1},
        {S:4, T:1},
        {S:5, T:1}
    ],
    LookTick: 8,
    LookArr: [0,
        {T:'single',Ref: 15, Rad: {SV:'spotRad'}},
        {T:'double',Ref: 10, Rad: {SV:'spotRad'}, Rad2: {SV:'spotRad2'}, Angle2: {SV:'spotAngle2'}},
        {T:'single',Ref: 45, Rad: {SV:'spotRad2'}}
    ],

    shipVariables:{
        spotRad: {Const: 180, RandInt: 80},
        spotRad2: {Const: 400, RandInt: 200},
        spotAngle2: {Const: 40, RandInt: 30}
    },
};

BBAdata.ObjectData.dregos={
    LoadMods:{
        enemyShip:{},
    },
    view:{
        Letter: 'U',
        LetterSize: 20,
        Color: 'red',
        Angle: 0,
        HitPattern: 'HullFire_20',
    },

    lifeM: 9,
    radius: 15,

    Res: {'missilePack': {R:6,M:6,T:0}},
    Weapon:[
        {t:'refilResource', resource: 'missilePack', gunSpeed: 90, maxSpeed: 1, doNextWeapon: true},
        {t:'missilesDouble', gunSpeed: 140, lastShot: 100, usedRes: 'missilePack', usedResR: 1, minSpeed: 2, minAlarm: 5, minDistToEnemy: 500},
    ],

    doingNow: 'changeManouver',
    doingTime: -1,
    Manouver: 'goStraight',
    toDo: [
        {N:67,T:'lowerSpeedForResources', minAlarm: 0, wantedRes: 'missilePack', wantedResR: 1, gotoSpeed: 1},
        {N:66,T:'speedUpIfResources', minAlarm: 0, wantedRes: 'missilePack', wantedResR: 6, gotoSpeed: 2},
        {N:55,T:'alarmAboutSpottedEnemy', minAlarm: 5, alarmRadius: 250},
        {N:45,T:'lowerAlarmLvl', minAlarm: 5, minEnemyDontSeen: 750, gotoAlarm: 4, goToSpotLvl: 2},
        {N:35,T:'followEnemy', minAlarm: 5, goToSpotLvl: 3, minSpeedLvl: 2},
        {N:18,T:'changeManouver2', maxAlarm: 4, minAlarm: 3, straightMin: 20, straightPlus: 80, turnMin: 10, turnPlus: 80  },
        {N:15,T:'changeManouver', maxAlarm: 3, straightMin: 60, straightPlus: 100, turnMin: 30, turnPlus: 70  },
    ],

    SpeedArr:[0,
        {S: {SV:'speed',Add:-5}, T:{SV:'speedT',Add:-2}},
        {S: {SV:'speed'}, T:{SV:'speedT'}},
        {S: {SV:'speed',Add:3}, T:{SV:'speedT'}}
    ],
    LookTick: 8,
    LookArr: [0,
        {T:'single',Ref: 15, Rad: {SV:'spotRad'}},
        {T:'double',Ref: 10, Rad: {SV:'spotRad'}, Rad2: {SV:'spotRad2'}, Angle2: {SV:'spotAngle2'}},
        {T:'single',Ref: 45, Rad: {SV:'spotRad2'}}
    ],

    shipVariables:{
        speed: {Const: 7, Rand: 1.5},
        speedT: {Const: 2.5, Rand: 1},
        spotRad: {Const: 80, RandInt: 80},
        spotRad2: {Const: 300, RandInt: 200},
        spotAngle2: {Const: 30, RandInt: 30}
    },
};
BBAdata.ObjectData.vitotas={
    LoadMods:{
        enemyShip:{},
    },
    view:{
        Letter: 'V',
        LetterSize: 20,
        Color: 'red',
        Angle: 0,
        HitPattern: 'HullFire_20',
    },

    lifeM: 5,
    radius: 15,

    Weapon:[
        {t:'laserAim', minDistToEnemy: 400, lastShot: 100, gunSpeed: 100, makeAction:{ doingNow:'laserAim', doingTime:30, Manouver: 'goStraight', doNotInterupt: true}},
        {t:'laserShoot', DMG:{Dmg:4,T:'energy'}, Distance: 450, gunSpeed: 1, lastShot: 0, doingNow: 'laserAim', doingTime: 1, makeAction:{doingNow:'followEnemy', doingTime: 40, doNotInterupt: true}},
    ],

    squadScheme: [{
        type: 'Field',
        objName: 'LaserMarker',
        radius: 0,
        angle: 0,
        Oid: -1,
        placementT:'directPlaces',
        Mod: {squareAngle: 20, squareLen: 450}
    }],

    doingNow: 'changeManouver',
    doingTime: -1,
    Manouver: 'goStraight',
    toDo: [
        {N:55,T:'followEnemy', minAlarm: 5},
        {N:18,T:'changeManouver2', maxAlarm: 4, minAlarm: 3, straightMin: 20, straightPlus: 80, turnMin: 10, turnPlus: 80  },
        {N:15,T:'changeManouver', maxAlarm: 3, straightMin: 60, straightPlus: 100, turnMin: 30, turnPlus: 70  },
    ],

    SpeedArr:[0,
      {S: {SV:'speed',Add:-4}, T:{SV:'speedT'}},
      {S: {SV:'speed'}, T:{SV:'speedT'}},
      {S: {SV:'speed',Add:3}, T:{SV:'speedT'}}
    ],
    LookTick: 8,
    LookArr: [0,
        {T:'single',Ref: 15, Rad: {SV:'spotRad'}},
        {T:'double',Ref: 10, Rad: {SV:'spotRad'}, Rad2: {SV:'spotRad2'}, Angle2: {SV:'spotAngle2'}},
        {T:'single',Ref: 45, Rad: {SV:'spotRad2'}}
    ],

    shipVariables:{
        speed: {Const: 7.5, Rand: 1.5},
        speedT: {Const: 2, Rand: 2},
        spotRad: {Const: 80, RandInt: 80},
        spotRad2: {Const: 300, RandInt: 200},
        spotAngle2: {Const: 30, RandInt: 30}
    },
};
BBAdata.ObjectData.cloaker={
    LoadMods:{
        enemyShip:{},
    },
    view:{
        Letter: 'C',
        LetterSize: 20,
        Color: 'red',
        Angle: 270,
        HitPattern: 'HullFire_20',
    },

    lifeM: 3,
    radius: 15,

    Res: {'cloakingProd': {R:0,M:10,T:0}},
    Weapon:[
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

    SpeedArr:[0,
        {S:3, T:6},
        {S:6, T:6},
        {S:12, T:4}
    ],
    LookTick: 8,
    LookArr: [0,
        {T:'single',Ref: 15, Rad: {SV:'spotRad'}},
        {T:'double',Ref: 10, Rad: {SV:'spotRad'}, Rad2: {SV:'spotRad2'}, Angle2: {SV:'spotAngle2'}},
        {T:'single',Ref: 45, Rad: {SV:'spotRad2'}}
    ],

    shipVariables:{
        spotRad: {Const: 80, RandInt: 80},
        spotRad2: {Const: 300, RandInt: 200},
        spotAngle2: {Const: 30, RandInt: 30}
    },
};
BBAdata.ObjectData.hajaher={
    LoadMods:{
        enemyShip:{},
    },
    view:{
        Letter: 'S',
        LetterSize: 20,
        Color: 'red',
        Angle: 0,
        HitPattern: 'HullFire_20',
    },

    lifeM: 6,
    radius: 15,

    Weapon:[
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
        {N:18,T:'changeManouver2', maxAlarm: 4, minAlarm: 3, straightMin: 20, straightPlus: 80, turnMin: 10, turnPlus: 80  },
        {N:15,T:'changeManouver', maxAlarm: 3, straightMin: 60, straightPlus: 100, turnMin: 30, turnPlus: 70  },
    ],

    SpeedArr:[0,
        {S: {SV:'speed',Add:-4}, T:{SV:'speedT',Add:-1.5}},
        {S: {SV:'speed'}, T:{SV:'speedT'}},
        {S: {SV:'speed',Add:3}, T:{SV:'speedT'}}
    ],
    LookTick: 8,
    LookArr: [0,
        {T:'single',Ref: 15, Rad: {SV:'spotRad'}},
        {T:'double',Ref: 10, Rad: {SV:'spotRad'}, Rad2: {SV:'spotRad2'}, Angle2: {SV:'spotAngle2'}},
        {T:'single',Ref: 45, Rad: {SV:'spotRad2'}}
    ],

    shipVariables:{
        speed: {Const: 5, Rand: 4},
        speedT: {Const: 2, Rand: 2},
        spotRad: {Const: 80, RandInt: 80},
        spotRad2: {Const: 300, RandInt: 200},
        spotAngle2: {Const: 30, RandInt: 30}
    },
};
BBAdata.ObjectData.orhenes={
    LoadMods:{
        enemyShip:{},
    },
    view:{
        Letter: 'Q',
        LetterSize: 80,
        Color: 'red',
        Angle: 0,
        HitPattern: 'HullFire_80',
    },

    lifeM: 60,
    radius: 40,

    Res: {'prodSquad': {R:40,M:80,T:0}},
    Weapon:[
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

    SpeedArr:[0,
        {S:0.2, T:0.3},
        {S:1, T:1},
        {S:1.7, T:0.4}
    ],
    LookTick: 8,
    LookArr: [0,
        {T:'single',Ref: 15, Rad: {SV:'spotRad'}},
        {T:'double',Ref: 10, Rad: {SV:'spotRad'}, Rad2: {SV:'spotRad2'}, Angle2: {SV:'spotAngle2'}},
        {T:'single',Ref: 45, Rad: {SV:'spotRad2'}}
    ],

    shipVariables:{
        spotRad: {Const: 180, RandInt: 80},
        spotRad2: {Const: 400, RandInt: 200},
        spotAngle2: {Const: 40, RandInt: 30}
    },
};
BBAdata.ObjectData.juggernaut={
    LoadMods:{
        enemyShip:{},
    },
    view:{
        Letter: 'J',
        LetterSize: 80,
        Color: 'red',
        Angle: 0,
        HitPattern: 'HullFire_80',
    },

    lifeM: 12,
    radius: 40,

    WeaponMods:[
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
        ResPath:'Res',
        Own: true,
    },{
        name: 'absorbtionShield',
        CatchDmgT: {normal:1, energy:1, explo:1},
        DmgReduction: 'energyField',
        ReductionUses: 'infinite',
        ResPath:'Res',
        Own: true,
    }],

    Res: {energyField: {R:20,M:20,T:0}, exploShield: {R:2,M:2,T:0}},
    Weapon:[
        {t:'refilResource', resource: 'energyField', gunSpeed: 60, maxSpeed: 2, doNextWeapon: true},
        {t:'refilResource', resource: 'exploShield', gunSpeed: 240, maxSpeed: 2, doNextWeapon: true},
        {t:'bomb', Speed: 10, Dec: 50, WeaponModRandom: 4, gunSpeed: 100, lastShot: 100, maxSpeed: 2, minAlarm: 5, minDistToEnemy: 400}
    ],

    doingNow: 'changeManouver',
    doingTime: -1,
    Manouver: 'goStraight',
    toDo: [
        {N:45,T:'lowerAlarmLvl', minAlarm: 5, minEnemyDontSeen: 15, gotoAlarm: 4, goToSpotLvl: 2},
        {N:35,T:'followEnemy', minAlarm: 5, goToSpotLvl: 3, doingTime: 30},
        {N:15,T:'changeManouver', maxAlarm: 4, straightMin: 60, straightPlus: 100, turnMin: 30, turnPlus: 70  },
    ],

    SpeedArr:[0,
        {S:1, T:1},
        {S:1, T:1},
        {S:1, T:1}
    ],
    LookTick: 8,
    LookArr: [0,
        {T:'single',Ref: 15, Rad: {SV:'spotRad'}},
        {T:'double',Ref: 10, Rad: {SV:'spotRad'}, Rad2: {SV:'spotRad2'}, Angle2: {SV:'spotAngle2'}},
        {T:'single',Ref: 45, Rad: {SV:'spotRad2'}}
    ],

    shipVariables:{
        spotRad: {Const: 180, RandInt: 80},
        spotRad2: {Const: 400, RandInt: 200},
        spotAngle2: {Const: 40, RandInt: 20}
    },

};
BBAdata.ObjectData.gargamon={
    LoadMods:{
        enemyShip:{},
    },
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

    Res: {'missilePack': {R:0,M:10,T:0}},
    Weapon:[
        {t:'refilResource', resource: 'missilePack', gunSpeed: 18, maxSpeed: 2, doNextWeapon: true},
        {t:'changeAction', makeAction: {doingNow:'shooting', doingTime: 33, Manouver:'goStraight'}, doingNow:'followEnemy', doingTime:1, usedRes:'missilePack', usedResR: 10},
        {t:'missileX5', DMG:{Dmg:1,T:'explo'}, Dec: 25, Speed: 14, gunSpeed: 8, lastShot: 0, doingNow:'shooting', minDistToEnemy: 500},
    ],

    doingNow: 'changeManouver',
    doingTime: -1,
    Manouver: 'goStraight',
    toDo: [
        {N:55,T:'followEnemy', minAlarm: 5, doingTime: 40, usedRes:'missilePack', usedResR: 10},
        {N:15,T:'changeManouver', maxAlarm: 5, straightMin: 60, straightPlus: 100, turnMin: 30, turnPlus: 70  },
    ],

    SpeedArr:[0,
        {S:1, T:1},
        {S:2, T:1.5},
        {S:7, T:0.2}
    ],
    LookTick: 8,
    LookArr: [0,
        {T:'single',Ref: 15, Rad: {SV:'spotRad'}},
        {T:'double',Ref: 10, Rad: {SV:'spotRad'}, Rad2: {SV:'spotRad2'}, Angle2: {SV:'spotAngle2'}},
        {T:'single',Ref: 45, Rad: {SV:'spotRad2'}}
    ],

    shipVariables:{
        spotRad: {Const: 180, RandInt: 80},
        spotRad2: {Const: 400, RandInt: 200},
        spotAngle2: {Const: 40, RandInt: 30}
    },
};
BBAdata.ObjectData.xaurus={
    LoadMods:{
        enemyShip:{},
    },
    view:{
        Letter: 'X',
        LetterSize: 60,
        Color: 'red',
        Angle: 270,
        HitPattern: 'HullFire_60',
    },

    lifeM: 33,
    radius: 27,



    Res: {'ammoPack': {R:0,M:10,T:0}},
    Weapon:[
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

    SpeedArr:[0,
        {S:{SV:'speed',Add:-2}, T:1},
        {S:{SV:'speed'},        T:{SV:'speedT',Add:1}},
        {S:{SV:'speed',Add:4},  T:{SV:'speedT'}}
    ],
    LookTick: 8,
    LookArr: [0,
        {T:'single',Ref: 15, Rad: {SV:'spotRad'}},
        {T:'double',Ref: 10, Rad: {SV:'spotRad'}, Rad2: {SV:'spotRad2'}, Angle2: {SV:'spotAngle2'}},
        {T:'single',Ref: 45, Rad: {SV:'spotRad2'}}
    ],

    shipVariables:{
        speed: {Const: 3, Rand: 2},
        speedT: {Const:  1, Rand: 2},
        spotRad: {Const: 180, RandInt: 80},
        spotRad2: {Const: 400, RandInt: 200},
        spotAngle2: {Const: 40, RandInt: 30}
    },
};
BBAdata.ObjectData.zarahiash={
    LoadMods:{
        enemyShip:{},
    },
    view:{
        Letter: 'Z',
        LetterSize: 20,
        Color: 'red',
        Angle: 0,
        HitPattern: 'HullFire_40',
    },

    lifeM: 13,
    radius: 15,

    Res: {'fieldCharges': {R:0,M:10,T:0}},
    Weapon:[
        {t:'killSquadMember', gunSpeed: 55, FlagsRequired:{squadFull:true},maxSpeed: 2},
        {t:'refilResource', resource: 'fieldCharges', gunSpeed: 20, maxSpeed: 2, doNextWeapon: true},
        {t:'produceSquad', gunSpeed: 1, lastShot: 100, usedRes:'fieldCharges', minDistToEnemy:500, usedResR: 10, doingNow:'followEnemy', makeAction:{doingNow:'followEnemy', doingTime:220, Manouver:'followEnemy',doNotInterupt:true}},
    ],

    squadScheme: [{
        type: 'Field',
        objName: 'ConeDestructionField',
        radius: 200,
        angle: 0,
        anglePlus: 180,
        Oid: -1,
        placementT:'directPlaces',
        Mod: {radius: 185, angle: 0, coneAngle: 18, coneRad2: 10, PeriodDMG:{Dmg:1,T:'normal'}, PeriodTime: 15, PeriodOffset: 10, particlesOnBoard:true, fieldAnimMoving:true},
    }],

    doingNow: 'changeManouver',
    doingTime: -1,
    Manouver: 'goStraight',
    toDo: [
        {N:55,T:'followEnemy', minAlarm: 5, gotoSpeed: 3, usedRes:'fieldCharges', usedResR: 10},
        {T:'changeSpeed', minSpeedLvl: 3, gotoSpeed: 2},
        {N:15,T:'changeManouver', maxAlarm: 5, straightMin: 60, straightPlus: 100, turnMin: 30, turnPlus: 70  },
    ],

    SpeedArr:[0,
        {S:{SV:'speed',Add:-2}, T:1},
        {S:{SV:'speed'},        T:{SV:'speedT',Add:-1}},
        {S:{SV:'speed',Add:3},  T:{SV:'speedT'}}
    ],
    LookTick: 8,
    LookArr: [0,
        {T:'single',Ref: 15, Rad: {SV:'spotRad'}},
        {T:'double',Ref: 10, Rad: {SV:'spotRad'}, Rad2: {SV:'spotRad2'}, Angle2: {SV:'spotAngle2'}},
        {T:'single',Ref: 45, Rad: {SV:'spotRad2'}}
    ],

    shipVariables:{
        speed: {Const: 4, Rand: 3},
        speedT: {Const: 1.5, Rand: 1.5},
        spotRad: {Const: 180, RandInt: 80},
        spotRad2: {Const: 400, RandInt: 200},
        spotAngle2: {Const: 40, RandInt: 30}
    },
};
BBAdata.ObjectData.durishka={
    LoadMods:{
        enemyShip:{},
    },
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

    ShieldsRejection:{maxShield:1},
    Weapon:[
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

    SpeedLvl: 1,
    SpeedArr:[0,
        {S:0, T:12},
        {S:2, T:4},
        {S:4, T:2}
    ],
    LookTick: 8,
    LookArr: [0,
        {T:'single',Ref: 15, Rad: {SV:'spotRad'}},
        {T:'single',Ref: 15, Rad: {SV:'spotRad'}},
        {T:'single',Ref: 45, Rad: {SV:'spotRad'}}
    ],

    shipVariables:{
        spotRad: {Const: 120, RandInt: 80},
    },
};
BBAdata.ObjectData.pitagoras={
    LoadMods:{
        enemyShip:{},
    },
    view:{
        Letter: 960,
        LetterSize: 40,
        Color: 'red',
        Angle: 0,
        HitPattern: 'HullFire_40',
    },

    lifeM: 4,
    radius: 20,

    WeaponMods:[{
        explodePreset: 'NailsCircleToCenter',
    }],

    Weapon:[{t:'bomb', Speed: 10, Dec: 50, WeaponModType: 0, gunSpeed: 40, lastShot: 100, maxSpeed: 2, minAlarm: 5, minDistToEnemy: 400}],

    doingNow: 'changeManouver',
    doingTime: -1,
    Manouver: 'goStraight',
    toDo: [
        {N:15,T:'changeManouver', maxAlarm: 3, straightMin: 60, straightPlus: 100, turnMin: 30, turnPlus: 70},
    ],

    SpeedArr:[0,
        {S:1, T:1},
        {S:3, T:2},
        {S:6, T:2}
    ],
    LookTick: 8,
    LookArr: [0,
        {T:'single',Ref: 15, Rad: {SV:'spotRad'}},
        {T:'double',Ref: 10, Rad: {SV:'spotRad'}, Rad2: {SV:'spotRad2'}, Angle2: {SV:'spotAngle2'}},
        {T:'single',Ref: 45, Rad: {SV:'spotRad2'}}
    ],

    shipVariables:{
        spotRad: {Const: 80, RandInt: 80},
        spotRad2: {Const: 300, RandInt: 200},
        spotAngle2: {Const: 30, RandInt: 30}
    },
};
BBAdata.ObjectData.patiarch={
    LoadMods:{
        enemyShip:{},
    },
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
    Weapon:[
        {t:'giveDamangeTransfer', gunSpeed: 12, lastShot: 100, Radius: 350, immunityTime: 15},
        {t:'healSelf', gunSpeed: 30, lastShot: 100}
    ],


    doingNow: 'changeManouver',
    doingTime: -1,
    Manouver: 'goStraight',
    toDo: [
        {N:15,T:'changeManouver', maxAlarm: 5, straightMin: 60, straightPlus: 100, turnMin: 30, turnPlus: 70  },
    ],

    SpeedArr:[0,
        {S:0.2, T:1},
        {S:0.3, T:1},
        {S:1,   T:1}
    ],
    LookTick: 8,
    LookArr: [0,
        {T:'single',Ref: 15, Rad: {SV:'spotRad'}},
        {T:'double',Ref: 10, Rad: {SV:'spotRad'}, Rad2: {SV:'spotRad2'}, Angle2: {SV:'spotAngle2'}},
        {T:'single',Ref: 45, Rad: {SV:'spotRad2'}}
    ],

    shipVariables:{
        spotRad: {Const: 180, RandInt: 80},
        spotRad2: {Const: 400, RandInt: 200},
        spotAngle2: {Const: 40, RandInt: 30}
    },
};
BBAdata.ObjectData.wariankiel={
    LoadMods:{
        enemyShip:{},
    },
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
    Weapon:[
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

    SpeedArr:[0,
        {S:0, T:4},
        {S:3, T:2},
        {S:5, T:2}
    ],
    LookTick: 8,
    LookArr: [0,
        {T:'single',Ref: 15, Rad: {SV:'spotRad'}},
        {T:'double',Ref: 10, Rad: {SV:'spotRad'}, Rad2: {SV:'spotRad2'}, Angle2: {SV:'spotAngle2'}},
        {T:'single',Ref: 45, Rad: {SV:'spotRad2'}}
    ],

    shipVariables:{
        spotRad: {Const: 180, RandInt: 80},
        spotRad2: {Const: 400, RandInt: 200},
        spotAngle2: {Const: 40, RandInt: 30}
    },
    Flags:{noStar:true},
};
BBAdata.ObjectData.vuvis={
    LoadMods:{
        enemyShip:{},
    },
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
    Weapon:[{t:'single', DMG:{Dmg:1,T:'normal'}, Dec: 50, Speed: 10, gunSpeed: 15, lastShot: 100, maxSpeed: 2, minAlarm: 5}],

    doingNow: 'changeManouver',
    doingTime: -1,
    Manouver: 'goStraight',
    toDo: [
        {N:57,T:'goAroundEnemy', minAlarm: 5},
        {N:15,T:'changeManouver', maxAlarm: 5, straightMin: 60, straightPlus: 100, turnMin: 30, turnPlus: 70  },
    ],

    SpeedArr:[0,
        {S:{SV:'speed',Add:-2}, T:1},
        {S:{SV:'speed'},        T:{SV:'speedT',Add:-1}},
        {S:{SV:'speed',Add:3},  T:{SV:'speedT'}}
    ],
    LookTick: 8,
    LookArr: [0,
        {T:'single',Ref: 15, Rad: {SV:'spotRad'}},
        {T:'double',Ref: 10, Rad: {SV:'spotRad'}, Rad2: {SV:'spotRad2'}, Angle2: {SV:'spotAngle2'}},
        {T:'single',Ref: 45, Rad: {SV:'spotRad2'}}
    ],

    shipVariables:{
        speed: {Const: 8, Rand: 4},
        speedT: {Const: 6, Rand: 1.5},
        spotRad: {Const: 180, RandInt: 80},
        spotRad2: {Const: 400, RandInt: 200},
        spotAngle2: {Const: 40, RandInt: 30}
    },
};
BBAdata.ObjectData.hirieshka={
    LoadMods:{
        enemyShip:{},
    },
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
    Weapon:[
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

    SpeedArr:[0,
        {S:{SV:'speed',Add:-2}, T:1},
        {S:{SV:'speed'},        T:{SV:'speedT',Add:-1}},
        {S:{SV:'speed',Add:3},  T:{SV:'speedT'}}
    ],
    LookTick: 8,
    LookArr: [0,
        {T:'single',Ref: 15, Rad: {SV:'spotRad'}},
        {T:'double',Ref: 10, Rad: {SV:'spotRad'}, Rad2: {SV:'spotRad2'}, Angle2: {SV:'spotAngle2'}},
        {T:'single',Ref: 45, Rad: {SV:'spotRad2'}}
    ],

    shipVariables:{
        speed: {Const: 4, Rand: 3},
        speedT: {Const: 1.5, Rand: 1.5},
        spotRad: {Const: 180, RandInt: 80},
        spotRad2: {Const: 400, RandInt: 200},
        spotAngle2: {Const: 40, RandInt: 30}
    },
};
BBAdata.ObjectData.nientes={
    LoadMods:{
        enemyShip:{},
    },
    view:{
        Letter: 948,
        LetterSize: 25,
        Color: 'red',
        Angle: 0,
        HitPattern: 'HullFire_20',
    },

    lifeM: 5,
    radius: 15,

    Res: {'fieldCharges': {R:10, M:10,T:0}},
    Weapon:[
        {t:'produceSquad', gunSpeed: 1, lastShot: 100, usedRes:'fieldCharges', usedResR: 10, maxSpeed: 2, FlagsRequired:{squadFull:false }},
        {t:'refilResource', resource: 'fieldCharges', gunSpeed: 16, maxSpeed: 2, FlagsRequired:{squadFull:false}, doNextWeapon: true},
    ],

    squadScheme: [{
        type: 'Field',
        objName: 'RoundElectricityField',
        radius: 50,
        angle: 0,
        Oid: -1,
        placementT: 'directPlaces',
        Mod: {radius: 40, OneTimeEffect: 1, OneTimeOffset: 3, OneTimeDMG:{Dmg:3,T:'energy'}, fieldAnimMoving:true}
    }],

    doingNow: 'changeManouver',
    doingTime: -1,
    Manouver: 'goStraight',
    toDo: [
        {N:55,T:'followEnemy', minAlarm: 5, gotoSpeed: 3, FlagsRequired:{squadFull:true}},
        {T:'changeSpeed', minSpeedLvl: 3, gotoSpeed: 2},
        {N:15,T:'changeManouver', maxAlarm: 5, straightMin: 60, straightPlus: 100, turnMin: 30, turnPlus: 70  },
    ],

    SpeedArr:[0,
        {S: {SV:'speed',Add:-2}, T:{SV:'speedT',Add:-0.6}},
        {S: {SV:'speed'}, T:{SV:'speedT'}},
        {S: {SV:'speed',Add:6}, T:{SV:'speedT'}}
    ],
    LookTick: 8,
    LookArr: [0,
        {T:'single',Ref: 20, Rad: {SV:'spotRad'}},
        {T:'double',Ref: 20, Rad: {SV:'spotRad'}, Rad2: {SV:'spotRad2'}, Angle2: {SV:'spotAngle2'}},
        {T:'single',Ref: 20, Rad: {SV:'spotRad2'}}
    ],

    shipVariables:{
        speed: {Const: 3, Rand: 3},
        speedT: {Const: 2.5, Rand: 1},
        spotRad: {Const: 80, RandInt: 80},
        spotRad2: {Const: 300, RandInt: 200},
        spotAngle2: {Const: 30, RandInt: 30}
    },
};
BBAdata.ObjectData.shieldoorz={
    LoadMods:{
        enemyShip:{},
    },
    view:{
        Letter: 1002,
        LetterSize: 50,
        Color: 'red',
        Angle: 0,
        HitPattern: 'HullFire_60',
    },

    lifeM: 13,
    radius: 25,

    Res: {'fieldCharges': {R:0,M:10,T:0}},
    Weapon:[
        {t:'killSquadMember', gunSpeed: 55, FlagsRequired:{squadFull:true}, minSpeed: 2},
        {t:'refilResource', resource: 'fieldCharges', gunSpeed: 30, minSpeed: 2, doNextWeapon: true},
        {t:'double2', Speed:10, Dec:50, DMG:{Dmg:1,T:'normal'}, Wide: 15, gunSpeed: 1, gunWork: 11, gunReload: 50, gunSiteChange: 3, maxSpeed:1, minSpeed:1},
        {t:'produceSquad', gunSpeed: 1, lastShot: 100, usedRes:'fieldCharges', usedResR: 10, maxSpeed: 0, doingNow:'followEnemy', makeAction: {Manuover:'followEnemy', doingNow:'followEnemy', doingTime: 120, doNotInterupt:true}},
        // {t:'changeAction', makeAction: {Manuover:'turnRight', doingNow:'shooting', doingTime:30, doNotInterupt:true}, gunSpeed: 110, lastShot: 100,  minAlarm: 5, minDistToEnemy: 400},
    ],

    squadScheme: [{
        type: 'Field',
        objName: 'ConeShellField',
        radius: 0,
        angle: 0,
        anglePlus: 0,
        Oid: -1,
        placementT:'directPlaces',
        Mod: {radius: 65, angle: 180, coneAngle: 90, coneRad2: 0, bounceType:'diagonal', fieldAnimMoving:true}
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

    SpeedArr:[{S:0, T:6},
        {S:0.5, T:{SV:'speedT',Add:2}},
        {S:{SV:'speed'},        T:{SV:'speedT',Add:-1}},
        {S:{SV:'speed',Add:3},  T:{SV:'speedT'}}
    ],
    LookTick: 8,
    LookArr: [0,
        {T:'single',Ref: 15, Rad: {SV:'spotRad'}},
        {T:'single',Ref: 10, Rad: {SV:'spotRad'}},
        {T:'single',Ref: 45, Rad: {SV:'spotRad'}}
    ],

    shipVariables:{
        speed: {Const: 4, Rand: 3},
        speedT: {Const: 1.5, Rand: 1.5},
        spotRad: {Const: 350, RandInt: 150},
    },
};
BBAdata.ObjectData.loliax={
    LoadMods:{
        enemyShip:{},
    },
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

    Weapon:[
        {t:'shootShieldAddMissile', Radius: 350, gunSpeed: 20, lastShot: 100},
    ],

    doingNow: 'changeManouver',
    doingTime: -1,
    Manouver: 'goStraight',
    toDo: [
        {N:15,T:'changeManouver', maxAlarm: 5, straightMin: 60, straightPlus: 100, turnMin: 30, turnPlus: 70  },
    ],

    SpeedArr:[0,
        {S:1, T:1},
        {S:2, T:1.5},
        {S:7, T:0.2}
    ],
    LookTick: 8,
    LookArr: [0,
        {T:'single',Ref: 15, Rad: {SV:'spotRad'}},
        {T:'double',Ref: 10, Rad: {SV:'spotRad'}, Rad2: {SV:'spotRad2'}, Angle2: {SV:'spotAngle2'}},
        {T:'single',Ref: 45, Rad: {SV:'spotRad2'}}
    ],

    shipVariables:{
        spotRad: {Const: 180, RandInt: 80},
        spotRad2: {Const: 400, RandInt: 200},
        spotAngle2: {Const: 40, RandInt: 30}
    },
};
BBAdata.ObjectData.slimensen={
    LoadMods:{
        enemyShip:{},
    },
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
    onDie: {Do:'explode', explodeType: 'putObjs', objRandAngle:true, objName:'slimensen1', objMin:2, objRand:2},

    Res: {'mergeAbility': {R:0,M:20,T:0}},
    Weapon:[
        {t:'refilResource', resource: 'mergeAbility', gunSpeed: 120, maxSpeed: 2, doNextWeapon: true},
        {t:'rose', DMG:{Dmg:1,T:'normal'}, Dec: 50, Speed: 7, gunSpeed: 20, lastShot: 100, AtOnce: 60, RoseAngle: 6, maxSpeed: 2, minAlarm: 5,minDistToEnemy:500},

    ],

    doingNow: 'changeManouver',
    doingTime: -1,
    Manouver: 'goStraight',
    toDo: [
        {N:55,T:'alarmAboutSpottedEnemy', minAlarm: 5, alarmRadius: 250},
        {N:45,T:'lowerAlarmLvl', minAlarm: 5, minEnemyDontSeen: 750, gotoAlarm: 4, goToSpotLvl: 2},
        {N:35,T:'followEnemy', minAlarm: 5, goToSpotLvl: 3 },
        {N:18,T:'changeManouver2', maxAlarm: 4, minAlarm: 3, straightMin: 20, straightPlus: 80, turnMin: 10, turnPlus: 80  },
        {N:15,T:'changeManouver', maxAlarm: 3, straightMin: 60, straightPlus: 100, turnMin: 30, turnPlus: 70  },
    ],

    SpeedArr:[0,
        {S:{SV:'speed',Add:-2}, T:1},
        {S:{SV:'speed'},        T:{SV:'speedT'}},
        {S:{SV:'speed',Add:3},  T:{SV:'speedT'}}
    ],
    LookTick: 8,
    LookArr: [0,
        {T:'single',Ref: 15, Rad: {SV:'spotRad'}},
        {T:'double',Ref: 10, Rad: {SV:'spotRad'}, Rad2: {SV:'spotRad2'}, Angle2: {SV:'spotAngle2'}},
        {T:'single',Ref: 45, Rad: {SV:'spotRad2'}}
    ],

    shipVariables:{
        speed: {Const: 2, Rand: 2},
        speedT: {Const: 2.5, Rand: 2.5},
        spotRad: {Const: 180, RandInt: 80},
        spotRad2: {Const: 400, RandInt: 200},
        spotAngle2: {Const: 40, RandInt: 30}
    },
};
BBAdata.ObjectData.slimensen1={
    LoadMods:{
        enemyShip:{},
    },
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
    onDie: {Do:'explode', explodeType: 'putObjs', objRandAngle:true, objName:'slimensen2', objMin:2, objRand:2},

    Weapon:[
        {t:'refilResource', resource: 'mergeAbility', gunSpeed: 60, maxSpeed: 2, doNextWeapon: true},
        {t:'mergeWith', doingNow: 'mergeWith', doNextWeapon: true},
        {t:'rose', DMG:{Dmg:1,T:'normal'}, Dec: 50, Speed: 13, gunSpeed: 30, lastShot: 100, AtOnce: 11, RoseAngle: 4, maxSpeed: 2, minAlarm: 5,minDistToEnemy:500},
    ],

    toDo: [
        {N:88,T:'mergeSearch',  usedRes:'mergeAbility', usedResR: 20, mergeWith: 'slimensen1', mergeDist: 750},
        {N:55,T:'alarmAboutSpottedEnemy', minAlarm: 5, alarmRadius: 250},
        {N:45,T:'lowerAlarmLvl', minAlarm: 5, minEnemyDontSeen: 750, gotoAlarm: 4, goToSpotLvl: 2},
        {N:35,T:'followEnemy', minAlarm: 5, goToSpotLvl: 3 },
        {N:18,T:'changeManouver2', maxAlarm: 4, minAlarm: 3, straightMin: 20, straightPlus: 80, turnMin: 10, turnPlus: 80  },
        {N:15,T:'changeManouver', maxAlarm: 3, straightMin: 60, straightPlus: 100, turnMin: 30, turnPlus: 70  },
    ],

    SpeedArr:[0,
        {S:{SV:'speed',Add:-2}, T:1},
        {S:{SV:'speed'},        T:{SV:'speedT'}},
        {S:{SV:'speed',Add:3},  T:{SV:'speedT'}}
    ],
    LookTick: 8,
    LookArr: [0,
        {T:'single',Ref: 15, Rad: {SV:'spotRad'}},
        {T:'double',Ref: 10, Rad: {SV:'spotRad'}, Rad2: {SV:'spotRad2'}, Angle2: {SV:'spotAngle2'}},
        {T:'single',Ref: 45, Rad: {SV:'spotRad2'}}
    ],

    shipVariables:{
        speed: {Const: 5, Rand: 3},
        speedT: {Const: 2.5, Rand: 1.5},
        spotRad: {Const: 180, RandInt: 80},
        spotRad2: {Const: 400, RandInt: 200},
        spotAngle2: {Const: 40, RandInt: 30}
    },
};
BBAdata.ObjectData.slimensen2={
    LoadMods:{
        enemyShip:{},
    },
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
    onDie: {Do:'explode', explodeType: 'putObjs', objRandAngle:true, objName:'slimensen3', objMin:2, objRand:2},

    Weapon:[
        {t:'refilResource', resource: 'mergeAbility', gunSpeed: 30, maxSpeed: 2, doNextWeapon: true},
        {t:'mergeWith', doingNow: 'mergeWith', doNextWeapon: true},
        {t:'double2', DMG:{Dmg:1,T:'normal'}, Dec: 50, Speed: 13, gunSpeed: 5, gunWork: 20, gunReload: 90, Wide:10, lastShot: 100, maxSpeed: 2, minAlarm: 5,minDistToEnemy:500},
    ],

    toDo: [
        {N:88,T:'mergeSearch',  usedRes:'mergeAbility', usedResR: 20, mergeWith: 'slimensen2', mergeDist: 750},
        {N:55,T:'alarmAboutSpottedEnemy', minAlarm: 5, alarmRadius: 250},
        {N:45,T:'lowerAlarmLvl', minAlarm: 5, minEnemyDontSeen: 750, gotoAlarm: 4, goToSpotLvl: 2},
        {N:35,T:'followEnemy', minAlarm: 5, goToSpotLvl: 3 },
        {N:18,T:'changeManouver2', maxAlarm: 4, minAlarm: 3, straightMin: 20, straightPlus: 80, turnMin: 10, turnPlus: 80  },
        {N:15,T:'changeManouver', maxAlarm: 3, straightMin: 60, straightPlus: 100, turnMin: 30, turnPlus: 70  },
    ],

    SpeedArr:[0,
        {S:{SV:'speed',Add:-2}, T:1},
        {S:{SV:'speed'},        T:{SV:'speedT'}},
        {S:{SV:'speed',Add:3},  T:{SV:'speedT'}}
    ],
    LookTick: 8,
    LookArr: [0,
        {T:'single',Ref: 15, Rad: {SV:'spotRad'}},
        {T:'double',Ref: 10, Rad: {SV:'spotRad'}, Rad2: {SV:'spotRad2'}, Angle2: {SV:'spotAngle2'}},
        {T:'single',Ref: 45, Rad: {SV:'spotRad2'}}
    ],

    shipVariables:{
        speed: {Const: 7, Rand: 2},
        speedT: {Const: 2, Rand: 1.5},
        spotRad: {Const: 180, RandInt: 80},
        spotRad2: {Const: 400, RandInt: 200},
        spotAngle2: {Const: 40, RandInt: 30}
    },
};
BBAdata.ObjectData.slimensen3={
    LoadMods:{
        enemyShip:{},
    },
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
    onDie: {Do:'explode', explodeType: 'putObjs', objRandAngle:true, objName:'slimensen4', objMin:2, objRand:2},

    Weapon:[
        {t:'refilResource', resource: 'mergeAbility', gunSpeed: 15, maxSpeed: 2, doNextWeapon: true},
        {t:'mergeWith', doingNow: 'mergeWith', doNextWeapon: true},
        {t:'single', DMG:{Dmg:1,T:'normal'}, Dec: 50, Speed: 13, gunSpeed: 5, gunWork: 20, gunReload: 90, lastShot: 100, maxSpeed: 2, minAlarm: 5,minDistToEnemy:500},
    ],

    toDo: [
        {N:88,T:'mergeSearch',  usedRes:'mergeAbility', usedResR: 20, mergeWith: 'slimensen3', mergeDist: 750},
        {N:55,T:'alarmAboutSpottedEnemy', minAlarm: 5, alarmRadius: 250},
        {N:45,T:'lowerAlarmLvl', minAlarm: 5, minEnemyDontSeen: 750, gotoAlarm: 4, goToSpotLvl: 2},
        {N:35,T:'followEnemy', minAlarm: 5, goToSpotLvl: 3 },
        {N:18,T:'changeManouver2', maxAlarm: 4, minAlarm: 3, straightMin: 20, straightPlus: 80, turnMin: 10, turnPlus: 80  },
        {N:15,T:'changeManouver', maxAlarm: 3, straightMin: 60, straightPlus: 100, turnMin: 30, turnPlus: 70  },
    ],

    SpeedArr:[0,
        {S:{SV:'speed',Add:-2}, T:1},
        {S:{SV:'speed'},        T:{SV:'speedT'}},
        {S:{SV:'speed',Add:3},  T:{SV:'speedT'}}
    ],
    LookTick: 8,
    LookArr: [0,
        {T:'single',Ref: 15, Rad: {SV:'spotRad'}},
        {T:'double',Ref: 10, Rad: {SV:'spotRad'}, Rad2: {SV:'spotRad2'}, Angle2: {SV:'spotAngle2'}},
        {T:'single',Ref: 45, Rad: {SV:'spotRad2'}}
    ],

    shipVariables:{
        speed: {Const: 8, Rand: 2},
        speedT: {Const: 1, Rand: 1},
        spotRad: {Const: 180, RandInt: 80},
        spotRad2: {Const: 400, RandInt: 200},
        spotAngle2: {Const: 40, RandInt: 30}
    },
};
BBAdata.ObjectData.slimensen4={
    LoadMods:{
        enemyShip:{},
    },
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

    Weapon:[
        {t:'refilResource', resource: 'mergeAbility', gunSpeed: 30, maxSpeed: 2, doNextWeapon: true},
        {t:'mergeWith', doingNow: 'mergeWith', doNextWeapon: true},
        {t:'single', DMG:{Dmg:1,T:'normal'}, Dec: 50, Speed: 13, gunSpeed: 30, lastShot: 100, maxSpeed: 2, minAlarm: 5,minDistToEnemy:500},
    ],

    toDo: [
        {N:88,T:'mergeSearch',  usedRes:'mergeAbility', usedResR: 20, mergeWith: 'slimensen4', mergeDist: 750},
        {N:55,T:'alarmAboutSpottedEnemy', minAlarm: 5, alarmRadius: 250},
        {N:45,T:'lowerAlarmLvl', minAlarm: 5, minEnemyDontSeen: 750, gotoAlarm: 4, goToSpotLvl: 2},
        {N:35,T:'followEnemy', minAlarm: 5, goToSpotLvl: 3 },
        {N:18,T:'changeManouver2', maxAlarm: 4, minAlarm: 3, straightMin: 20, straightPlus: 80, turnMin: 10, turnPlus: 80  },
        {N:15,T:'changeManouver', maxAlarm: 3, straightMin: 60, straightPlus: 100, turnMin: 30, turnPlus: 70  },
    ],

    SpeedArr:[0,
        {S:{SV:'speed',Add:-2}, T:1},
        {S:{SV:'speed'},        T:{SV:'speedT'}},
        {S:{SV:'speed',Add:3},  T:{SV:'speedT'}}
    ],
    LookTick: 8,
    LookArr: [0,
        {T:'single',Ref: 15, Rad: {SV:'spotRad'}},
        {T:'double',Ref: 10, Rad: {SV:'spotRad'}, Rad2: {SV:'spotRad2'}, Angle2: {SV:'spotAngle2'}},
        {T:'single',Ref: 45, Rad: {SV:'spotRad2'}}
    ],

    shipVariables:{
        speed: {Const: 10, Rand: 2},
        speedT: {Const: 1, Rand: 0.5},
        spotRad: {Const: 180, RandInt: 80},
        spotRad2: {Const: 400, RandInt: 200},
        spotAngle2: {Const: 40, RandInt: 30}
    },
};
BBAdata.ObjectData.thunderton={
    LoadMods:{
        enemyShip:{},
    },
    view:{
        Letter: 1006,
        LetterSize: 80,
        Color: 'red',
        Angle:  0,
        HitPattern: 'HullFire_80',
    },

    lifeM: 45,
    radius: 40,



    WeaponMods:[{
        onHitDieExpire:    {Do:'explode', DMG:{Dmg:7,T:'explo'}, Dist: 80},
    }],
    Shields:[{
        name: 'explosionShield',
        CatchDmgT: {explo:1},
        DmgReduction: 'infinite',
        ReductionUses: 'exploShield',
        HitDieAnimation: 'dontShow',
        ResPath: 'Res',
        Own: true,
    }],

    Res: {'exploShield': {R:4,M:4,T:0}},
    Weapon:[
        {t:'refilResource', resource: 'exploShield', gunSpeed: 240, maxSpeed: 2, doNextWeapon: true},
        {t:'bomb', Speed: 0.1, Teleport:{ Dist: 35, Angle: 270, AngleRand: 180}, Dec: 10, WeaponModType: 0, gunSpeed: 10, lastShot: 100, maxSpeed: 2, minAlarm: 5, gunWork:80, gunReload:900, minDistToEnemy:500},
    ],

    doingNow: 'changeManouver',
    doingTime: -1,
    Manouver: 'goStraight',
    toDo: [
        {N:15,T:'changeManouver', maxAlarm: 5, straightMin: 60, straightPlus: 100, turnMin: 30, turnPlus: 70  },
    ],

    SpeedArr:[0,
        {S:1, T:1},
        {S:1, T:1.5},
        {S:3, T:0.2}
    ],
    LookTick: 8,
    LookArr: [0,
        {T:'single',Ref: 15, Rad: {SV:'spotRad'}},
        {T:'double',Ref: 10, Rad: {SV:'spotRad'}, Rad2: {SV:'spotRad2'}, Angle2: {SV:'spotAngle2'}},
        {T:'single',Ref: 45, Rad: {SV:'spotRad2'}}
    ],

    shipVariables:{
        spotRad: {Const: 180, RandInt: 80},
        spotRad2: {Const: 400, RandInt: 200},
        spotAngle2: {Const: 40, RandInt: 30}
    },
};
BBAdata.ObjectData.doomderos={
    LoadMods:{
        enemyShip:{},
    },
    view:{
        Letter: 992,
        LetterSize: 60,
        Color: 'red',
        Angle: 180,
        HitPattern: 'HullFire_80',
    },

    lifeM: 18,
    radius: 30,

    Res: {'fieldCharges': {R:0,M:10,T:0}},
    Weapon:[
        {t:'shootSquadMember', Speed: 7, MemberAge: 130, DieTime: 100},
        {t:'produceSquad', gunSpeed: 1, makeAction: {doingNow:'followEnemyX', gotoSpeed: 0, doingTime: 130, Manouver:'followEnemy', doNotInterupt:true}, lastShot: 100, usedRes:'fieldCharges', usedResR: 10, maxSpeed: 2, FlagsRequired:{squadFull:false}, minDistToEnemy:450},
        {t:'refilResource', resource: 'fieldCharges', gunSpeed: 10, maxSpeed: 2, FlagsRequired:{squadFull:false}},
    ],

    squadScheme: [{
        type: 'Field',
        objName: 'RoundPlasmaField',
        radius: 50,
        angle: 0,
        Oid: -1,
        placementT: 'directPlaces',
        Mod: {radius: 40, PeriodDMG:{Dmg:1,T:'normal'}, PeriodTime: 1, PeriodOffset: 3, PeriodDelay: 130, fieldAnimMoving:true, onDie:{Do:'explode', DMG:{Dmg:13, T:'explo'}, Dist: 210}}
    }],

    doingNow: 'changeManouver',
    doingTime: -1,
    Manouver: 'goStraight',
    toDo: [
        {N:35,T:'changeSpeed', maxSpeedLvl: 0, gotoSpeed: 2},
        {N:15,T:'changeManouver', maxAlarm: 5, straightMin: 60, straightPlus: 100, turnMin: 10, turnPlus: 30  },
    ],

    SpeedArr:[{S: 0, T:3},
        {S: {SV:'speed',Add:-2}, T:{SV:'speedT',Add:-0.6}},
        {S: {SV:'speed'}, T:{SV:'speedT'}},
        {S: {SV:'speed',Add:6}, T:{SV:'speedT'}}
    ],
    LookTick: 8,
    LookArr: [0,
        {T:'single',Ref: 20, Rad: {SV:'spotRad'}},
        {T:'double',Ref: 20, Rad: {SV:'spotRad'}, Rad2: {SV:'spotRad2'}, Angle2: {SV:'spotAngle2'}},
        {T:'single',Ref: 20, Rad: {SV:'spotRad2'}}
    ],

    shipVariables:{
        speed: {Const: 3, Rand: 3},
        speedT: {Const: 2.5, Rand: 1},
        spotRad: {Const: 80, RandInt: 80},
        spotRad2: {Const: 300, RandInt: 200},
        spotAngle2: {Const: 30, RandInt: 30}
    },
};
BBAdata.ObjectData.hedgehog={
    LoadMods:{
        enemyShip:{},
    },
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

    ShieldsRejection:{maxShield:1},

    Res: {'prodSquad': {R:5,M:5,T:0}},
    Weapon:[
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
            objectType:'Mine',
            Mod:{explodePreset:'MineNailsConePalm',overWriteObjects:['MineMod_Cone','MineMod_hedgehog']},
            squadAngleType:'alongDirection',
            lifeM:1
    }},
    squadScheme: [],

    doingNow: 'changeManouver',
    doingTime: -1,
    Manouver: 'goStraight',

    SpeedArr:[0,
        {S:1, T:0.5},
        {S:2, T:2},
        {S:4, T:2}
    ],
    LookTick: 8,
    LookArr: [0,
        {T:'single',Ref: 15, Rad: {SV:'spotRad'}},
        {T:'double',Ref: 10, Rad: {SV:'spotRad'}, Rad2: {SV:'spotRad2'}, Angle2: {SV:'spotAngle2'}},
        {T:'single',Ref: 45, Rad: {SV:'spotRad2'}}
    ],

    shipVariables:{
        spotRad: {Const: 80, RandInt: 80},
        spotRad2: {Const: 300, RandInt: 200},
        spotAngle2: {Const: 30, RandInt: 30}
    },
};
BBAdata.ObjectData.urser={
    LoadMods:{
        enemyShip:{},
    },
    view:{
        Letter: 467,
        LetterSize: 35,
        Color: 'red',
        Angle: 0,
        HitPattern: 'HullFire_40',
    },

    lifeM: 13,
    radius: 20,

    Res: {'fieldCharges': {R:0,M:10,T:0}},
    Weapon:[
        {t:'killSquadMember', gunSpeed: 55, FlagsRequired:{squadFull:true},maxSpeed: 2},
        {t:'refilResource', resource: 'fieldCharges', gunSpeed: 20, maxSpeed: 2, doNextWeapon: true},
        {t:'produceSquad', gunSpeed: 1, lastShot: 100, usedRes:'fieldCharges', minDistToEnemy:500, usedResR: 10, doingNow:'followEnemy', makeAction:{doingNow:'followEnemy', doingTime:220, Manouver:'followEnemy',doNotInterupt:true}},
    ],

    squadScheme: [{
        type: 'Field',
        objName: 'ConeDestructionField',
        radius: 0,
        angle: 0,
        Oid: -1,
        placementT:'directPlaces',
        Mod: {radius: 180, angle: 0, coneAngle: 50, coneRad2: 24, PeriodDMG:{Dmg:1,T:'normal'}, PeriodTime: 7, PeriodOffset: 7, particlesOnBoard:true, fieldAnimMoving:true},
    }],

    doingNow: 'changeManouver',
    doingTime: -1,
    Manouver: 'goStraight',
    toDo: [
        {N:55,T:'followEnemy', minAlarm: 5, gotoSpeed: 3, usedRes:'fieldCharges', usedResR: 10},
        {T:'changeSpeed', minSpeedLvl: 3, gotoSpeed: 2},
        {N:15,T:'changeManouver', maxAlarm: 5, straightMin: 60, straightPlus: 100, turnMin: 30, turnPlus: 70  },
    ],

    SpeedArr:[0,
        {S:3,   T:1},
        {S:4,   T:3.5},
        {S:5.5, T:2}
    ],
    LookTick: 8,
    LookArr: [0,
        {T:'single',Ref: 15, Rad: {SV:'spotRad'}},
        {T:'double',Ref: 10, Rad: {SV:'spotRad'}, Rad2: {SV:'spotRad2'}, Angle2: {SV:'spotAngle2'}},
        {T:'single',Ref: 45, Rad: {SV:'spotRad2'}}
    ],

    shipVariables:{
        spotRad: {Const: 180, RandInt: 80},
        spotRad2: {Const: 400, RandInt: 200},
        spotAngle2: {Const: 40, RandInt: 30}
    },
};
BBAdata.ObjectData.talrax={
    LoadMods:{
        enemyShip:{},
    },
    view:{
        Letter: 5084,
        LetterSize: 80,
        Color: 'red',
        Angle: 180,
        HitPattern: 'HullFire_80',
    },

    lifeM: 12,
    radius: 40,

    WeaponMods:[
        {explodePreset:'StrikeOfEvil'},
        {explodePreset:'EyeOfEvil'},
        {explodePreset:'BubbleStorm'},
        {explodePreset:'ExplosionWorm2'},
    ],

    Weapon:[
        {t:'bomb', Speed: 10, Dec: 10, WeaponModRandom: 4, gunSpeed: 100, lastShot: 100, maxSpeed: 2, minAlarm: 5, minDistToEnemy: 600}
    ],

    doingNow: 'changeManouver',
    doingTime: -1,
    Manouver: 'goStraight',
    toDo: [
        {N:45,T:'lowerAlarmLvl', minAlarm: 5, minEnemyDontSeen: 15, gotoAlarm: 4, goToSpotLvl: 2},
        {N:35,T:'followEnemy', minAlarm: 5, goToSpotLvl: 3, doingTime: 30},
        {N:15,T:'changeManouver', maxAlarm: 4, straightMin: 60, straightPlus: 100, turnMin: 30, turnPlus: 70  },
    ],

    SpeedArr:[0,
        {S:0.1, T:1},
        {S:0.4, T:0.5},
        {S:1, T:0.2}
    ],
    LookTick: 8,
    LookArr: [0,
        {T:'single',Ref: 15, Rad: {SV:'spotRad'}},
        {T:'double',Ref: 10, Rad: {SV:'spotRad'}, Rad2: {SV:'spotRad2'}, Angle2: {SV:'spotAngle2'}},
        {T:'single',Ref: 45, Rad: {SV:'spotRad2'}}
    ],

    shipVariables:{
        spotRad: {Const: 180, RandInt: 80},
        spotRad2: {Const: 400, RandInt: 200},
        spotAngle2: {Const: 40, RandInt: 20}
    },
};
BBAdata.ObjectData.iskarianz={
    LoadMods:{
        enemyShip:{},
    },
    view:{
        Letter: 238,
        LetterSize: 30,
        Color: 'red',
        Angle: 180,
        HitPattern: 'HullFire_20',
        shieldsRadius: 14,
    },

    lifeM: 3,
    radius: 15,

    Shields:[{
        name: 'shieldAdder',
        CatchDmgT: {normal:1,energy:1,acid:1,explo:1},
        DmgReduction: 'infinite',
        ReductionUses: 'onHitMaxShield',
        ResPath: 'Res',
        Own: true,
        HitActionObj: 'remove',
        AddShield: {
            name:'maxShield',
            CatchDmgT:{normal:1,energy:1,acid:1,explo:1},
            DmgReduction: 'infinite',
            ReductionUses: 'infinite',
            ExpireTime: 45,
            HitActionObj: 'remove',
        },
    }],

    Res: {onHitMaxShield: {R:2,M:2,T:0}},
    Weapon:[
        {t:'refilResource', resource: 'onHitMaxShield', gunSpeed: 450, maxSpeed: 2, doNextWeapon: true},
        {t:'double2', DMG:{Dmg:1,T:'normal'}, Dec: 35, Speed: 12, gunSpeed: 5, gunWork: 20, gunReload: 90, lastShot: 100, maxSpeed: 2, minAlarm: 5},
    ],

    doingNow: 'changeManouver',
    doingTime: -1,
    Manouver: 'goStraight',
    toDo: [
        {N:55,T:'alarmAboutSpottedEnemy', minAlarm: 5, alarmRadius: 250},
        {N:45,T:'lowerAlarmLvl', minAlarm: 5, minEnemyDontSeen: 750, gotoAlarm: 4, goToSpotLvl: 2},
        {N:35,T:'followEnemy', minAlarm: 5, goToSpotLvl: 3 },
        {N:18,T:'changeManouver2', maxAlarm: 4, minAlarm: 3, straightMin: 20, straightPlus: 80, turnMin: 10, turnPlus: 80  },
        {N:15,T:'changeManouver', maxAlarm: 3, straightMin: 60, straightPlus: 100, turnMin: 30, turnPlus: 70  },
    ],

    SpeedArr:[0,
        {S: {SV:'speed',Add:-5}, T:{SV:'speedT',Add:-0.6}},
        {S: {SV:'speed'}, T:{SV:'speedT'}},
        {S: {SV:'speed',Add:4}, T:{SV:'speedT'}}
    ],
    LookTick: 8,
    LookArr: [0,
        {T:'single',Ref: 20, Rad: {SV:'spotRad'}},
        {T:'double',Ref: 20, Rad: {SV:'spotRad'}, Rad2: {SV:'spotRad2'}, Angle2: {SV:'spotAngle2'}},
        {T:'single',Ref: 20, Rad: {SV:'spotRad2'}}
    ],

    shipVariables:{
        speed: {Const: 7, Rand: 1.5},
        speedT: {Const: 2.5, Rand: 1},
        spotRad: {Const: 80, RandInt: 80},
        spotRad2: {Const: 300, RandInt: 200},
        spotAngle2: {Const: 30, RandInt: 30}
    },
};
BBAdata.ObjectData.prisander={
    LoadMods:{
        enemyShip:{},
    },
    view:{
        Letter: 338,
        LetterSize: 60,
        Color: 'red',
        Angle: 90,
        HitPattern: 'HullFire_60',
    },

    lifeM: 22,
    radius: 30,

    WeaponMods:[
        {explodePreset:'MineZen'},
        {explodePreset:'StrikeOfMines'},
    ],

    Weapon:[
        {t:'bomb', Speed: 10, Dec: 10, WeaponModRandom: 2, gunSpeed: 100, lastShot: 100, maxSpeed: 2, minAlarm: 5, minDistToEnemy: 600},
        {t:'missile', DMG:{Dmg:0,T:'normal'}, explodePreset:'EyeOfMines', Dec: 95, Speed: 12, gunSpeed: 120, lastShot: 0, minDistToEnemy: 400},
    ],

    doingNow: 'changeManouver',
    doingTime: -1,
    Manouver: 'goStraight',
    toDo: [
        {N:45,T:'lowerAlarmLvl', minAlarm: 5, minEnemyDontSeen: 15, gotoAlarm: 4, goToSpotLvl: 2},
        {N:35,T:'followEnemy', minAlarm: 5, goToSpotLvl: 3, doingTime: 30},
        {N:15,T:'changeManouver', maxAlarm: 4, straightMin: 60, straightPlus: 100, turnMin: 30, turnPlus: 70  },
    ],

    SpeedArr:[0,
        {S:1, T:3},
        {S:2, T:6},
        {S:3, T:2}
    ],
    LookTick: 8,
    LookArr: [0,
        {T:'single',Ref: 15, Rad: {SV:'spotRad'}},
        {T:'double',Ref: 10, Rad: {SV:'spotRad'}, Rad2: {SV:'spotRad2'}, Angle2: {SV:'spotAngle2'}},
        {T:'single',Ref: 45, Rad: {SV:'spotRad2'}}
    ],

    shipVariables:{
        spotRad: {Const: 180, RandInt: 80},
        spotRad2: {Const: 400, RandInt: 200},
        spotAngle2: {Const: 40, RandInt: 20}
    },
};
BBAdata.ObjectData.yehes={
    LoadMods:{
        enemyShip:{},
    },
    view:{
        Letter: 'Y',
        LetterSize: 80,
        Color: 'red',
        Angle: 0,
        HitPattern: 'HullFire_80',
    },

    lifeM: 32,
    radius: 40,

    WeaponMods:[
        {explodePreset:'TeleportConeField'},
        {explodePreset:'TeleFastField'},
        {explodePreset:'ElectroBubbleShield'},
    ],

    Weapon:[
        {t:'bomb', Speed: 10, Dec: 10, WeaponModRandom: 3, gunSpeed: 100, lastShot: 100, maxSpeed: 2, minAlarm: 5, minDistToEnemy: 600}
    ],

    doingNow: 'changeManouver',
    doingTime: -1,
    Manouver: 'goStraight',
    toDo: [
        {N:45,T:'lowerAlarmLvl', minAlarm: 5, minEnemyDontSeen: 15, gotoAlarm: 4, goToSpotLvl: 2},
        {N:35,T:'followEnemy', minAlarm: 5, goToSpotLvl: 3, doingTime: 30},
        {N:15,T:'changeManouver', maxAlarm: 4, straightMin: 60, straightPlus: 100, turnMin: 30, turnPlus: 70  },
    ],

    SpeedArr:[0,
        {S:0.1, T:1},
        {S:0.4, T:0.5},
        {S:1,   T:0.2}
    ],
    LookTick: 8,
    LookArr: [0,
        {T:'single', Ref: 30, Rad: 500},
        {T:'single', Ref: 30, Rad: 500},
        {T:'single', Ref: 30, Rad: 500}
    ],
    shipVariables:{},
};
BBAdata.ObjectData.yehestis={
    LoadMods:{
        enemyShip:{},
    },
    view:{
        Letter: 376,
        LetterSize: 80,
        Color: 'red',
        Angle: 0,
        HitPattern: 'HullFire_80',
    },

    lifeM: 32,
    radius: 40,

    WeaponMods:[
        {explodePreset:'WindField'},
        {explodePreset:'ShieldsBlobWall'},
        {explodePreset:'ShieldsBlobBomb'},
    ],

    Weapon:[
        {t:'bomb', Speed: 10, Dec: 10, WeaponModRandom: 3, gunSpeed: 80, lastShot: 100, maxSpeed: 2, minAlarm: 5, minDistToEnemy: 600}
    ],

    doingNow: 'changeManouver',
    doingTime: -1,
    Manouver: 'goStraight',
    toDo: [
        {N:45,T:'lowerAlarmLvl', minAlarm: 5, minEnemyDontSeen: 15, gotoAlarm: 4, goToSpotLvl: 2},
        {N:35,T:'followEnemy', minAlarm: 5, goToSpotLvl: 3, doingTime: 30},
        {N:15,T:'changeManouver', maxAlarm: 4, straightMin: 60, straightPlus: 100, turnMin: 30, turnPlus: 70  },
    ],

    SpeedArr:[0,
        {S:0.1, T:1},
        {S:0.4, T:0.5},
        {S:1, T:0.2}
    ],
    LookTick: 8,
    LookArr: [0,
        {T:'single',Ref: 30, Rad: 500},
        {T:'single',Ref: 30, Rad: 500},
        {T:'single',Ref: 30, Rad: 500}
    ],
    shipVariables:{},
};
BBAdata.ObjectData.yeheslar={
    LoadMods:{
        enemyShip:{},
    },
    view:{
        Letter: 590,
        LetterSize: 80,
        Color: 'red',
        Angle: 0,
        HitPattern: 'HullFire_80',
    },

    lifeM: 32,
    radius: 40,

    WeaponMods:[
        {explodePreset:'SlowDownConeFields'},
        {explodePreset:'EnergyBubbleShield'},
        {explodePreset:'TeleWall'},
    ],

    Weapon:[
        {t:'bomb', Speed: 10, Dec: 10, WeaponModRandom: 3, gunSpeed: 80, lastShot: 100, maxSpeed: 2, minAlarm: 5, minDistToEnemy: 600}
    ],

    doingNow: 'changeManouver',
    doingTime: -1,
    Manouver: 'goStraight',
    toDo: [
        {N:45,T:'lowerAlarmLvl', minAlarm: 5, minEnemyDontSeen: 15, gotoAlarm: 4, goToSpotLvl: 2},
        {N:35,T:'followEnemy', minAlarm: 5, goToSpotLvl: 3, doingTime: 30},
        {N:15,T:'changeManouver', maxAlarm: 4, straightMin: 60, straightPlus: 100, turnMin: 30, turnPlus: 70  },
    ],

    SpeedArr:[0,
        {S:0.1, T:1},
        {S:0.4, T:0.5},
        {S:1, T:0.2}
    ],
    LookTick: 8,
    LookArr: [0,
        {T:'single',Ref: 30, Rad: 500},
        {T:'single',Ref: 30, Rad: 500},
        {T:'single',Ref: 30, Rad: 500}
    ],
    shipVariables:{},
};
BBAdata.ObjectData.yebuhas={
    LoadMods:{
        enemyShip:{},
    },
    view:{
        Letter: 7822,
        LetterSize: 80,
        Color: 'red',
        Angle: 0,
        HitPattern: 'HullFire_80',
    },

    lifeM: 32,
    radius: 40,

    WeaponMods:[
        {explodePreset:'StasisBulletWall'},
        {explodePreset:'StatisBulletBomb'},
        {explodePreset:'GraviBall'},
    ],

    Weapon:[
        {t:'bomb', Speed: 10, Dec: 10, WeaponModRandom: 3, gunSpeed: 80, lastShot: 100, maxSpeed: 2, minAlarm: 5, minDistToEnemy: 600}
    ],

    doingNow: 'changeManouver',
    doingTime: -1,
    Manouver: 'goStraight',
    toDo: [
        {N:45,T:'lowerAlarmLvl', minAlarm: 5, minEnemyDontSeen: 15, gotoAlarm: 4, goToSpotLvl: 2},
        {N:35,T:'followEnemy', minAlarm: 5, goToSpotLvl: 3, doingTime: 30},
        {N:15,T:'changeManouver', maxAlarm: 4, straightMin: 60, straightPlus: 100, turnMin: 30, turnPlus: 70  },
    ],

    SpeedArr:[0,
        {S:0.1, T:1},
        {S:0.4, T:0.5},
        {S:1, T:0.2}
    ],
    LookTick: 8,
    LookArr: [0,
        {T:'single',Ref: 30, Rad: 500},
        {T:'single',Ref: 30, Rad: 500},
        {T:'single',Ref: 30, Rad: 500}
    ],
    shipVariables:{},
};
BBAdata.ObjectData.hesiolumbus={
    LoadMods:{
        enemyShip:{},
    },
    view:{
        Letter: 482,
        LetterSize: 80,
        Color: 'red',
        Angle: 180,
        HitPattern: 'HullFire_80',
    },

    lifeM: 32,
    radius: 40,

    WeaponMods:[
        {explodePreset:'HealingField'},
    ],

    Weapon:[
        {t:'shootHealingBomb', WeaponModType: 0, Speed: 6, Dec: 60, gunSpeed: 600, lastShot: 100, Radius: 360, minimalDmg: 8}
    ],

    doingNow: 'changeManouver',
    doingTime: -1,
    Manouver: 'goStraight',
    toDo: [
        {N:15,T:'changeManouver', maxAlarm: 4, straightMin: 60, straightPlus: 100, turnMin: 30, turnPlus: 70  },
    ],

    SpeedArr:[0,
        {S:0.1, T:1},
        {S:0.4, T:0.5},
        {S:1,   T:0.2}
    ],
    LookTick: 8,
    LookArr: [0,
        {T:'single', Ref: 30, Rad: 500},
        {T:'single', Ref: 30, Rad: 500},
        {T:'single', Ref: 30, Rad: 500}
    ],
    shipVariables:{},
};
BBAdata.ObjectData.saisung={
    LoadMods:{
        enemyShip:{},
    },
    view:{
        Letter: 1414,   // big S with I
        LetterSize: 50,
        Color: 'red',
        Angle: 0,
        HitPattern: 'HullFire_60',
    },

    lifeM: 40,
    radius: 25,

    Res: {'prodSquad': {R:18, M:18,T:0}},
    Weapon:[
        {t:'refilResource', resource: 'prodSquad', gunSpeed: 30, maxSpeed: 2, doNextWeapon: true},
        {t:'produceSquad', gunSpeed: 0, lastShot: 0, usedRes: 'prodSquad', usedResR: 3, maxSpeed: 2, minDistToEnemy:400, doNextWeapon: true},
    ],

    squadSchemeType: {t:'loose', count: 12, data:{type:'enemyShip', objectType:'vuvis'}},
    squadScheme: [],

    doingNow: 'changeManouver',
    doingTime: -1,
    Manouver: 'goStraight',
    toDo: [
        // {N:35,T:'followEnemy', minAlarm: 5},
        {N:15,T:'changeManouver', maxAlarm: 5, straightMin: 60, straightPlus: 100, turnMin: 30, turnPlus: 70  },
    ],

    SpeedArr:[0,
        {S:{SV:'speed',Add:-4}, T:1},
        {S:{SV:'speed'},        T:{SV:'speedT'}},
        {S:{SV:'speed',Add:3},  T:{SV:'speedT',Add:-1}}

    ],
    LookTick: 8,
    LookArr: [0,
        {T:'single',Ref: 15, Rad: {SV:'spotRad'}},
        {T:'double',Ref: 10, Rad: {SV:'spotRad'}, Rad2: {SV:'spotRad2'}, Angle2: {SV:'spotAngle2'}},
        {T:'single',Ref: 45, Rad: {SV:'spotRad2'}}
    ],

    shipVariables:{
        speed: {Const: 3, Rand: 2},
        speedT: {Const: 1.5, Rand: 1.5},
        spotRad: {Const: 180, RandInt: 80},
        spotRad2: {Const: 400, RandInt: 200},
        spotAngle2: {Const: 40, RandInt: 30}
    },
};
