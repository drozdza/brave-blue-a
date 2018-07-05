// ENEMIES


BBAdata.ObjectMods.enemyShip2={
    M: 'comp',
    lists:{Enemies:1,Othink:1,Omoving:1},
    TT: 'enemy',
    mapType: 'E',
    lastSpeedT: 0,
    doSquad: -1,   //??
    dec: 50,       //??
    ammo: -50,     //??
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

    Manouver: 'goStraight',

    ThinkNow:'',
    ThinkTick: 0,
    TheState: 'patroling',
    ThinkLists: {},
    Thinks: {},

    WeaponType: false,
    Weapons:{},
    LookTick: 0,
    LookType: false,
    speedLvl: 'normal',
};
BBAdata.ObjectMods.fighterEnemy={

};
BBAdata.ObjectMods.biggerEnemy={
    doingNow: 'changeManouver',
    doingTime: -1,
    Manouver: 'goStraight',
    toDo: [
        {N:15,T:'changeManouver', maxAlarm: 3, straightMin: 60, straightPlus: 100, turnMin: 30, turnPlus: 70  },
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
BBAdata.ObjectMods.viewLetterSmall={
    view:{
        Letter: 'A',
        LetterSize: 16,
        Color: 'red',
        Angle: 0,
        HitPattern: 'HullFire_20',
    },
};
BBAdata.ObjectMods.viewLetterMedium={
    view:{
        Letter: 'A',
        LetterSize: 40,
        Color: 'red',
        Angle: 0,
        HitPattern: 'HullFire_40',
    },
};
BBAdata.ObjectMods.viewLetterBig={
    view:{
        Letter: 'A',
        LetterSize: 80,
        Color: 'red',
        Angle: 0,
        HitPattern: 'HullFire_80',
    },
};



// OLD MODS


BBAdata.ObjectMods.sitOnMap={
    toDo:[
        {N:23,T:'stayInRegion', X:0, Y:0, Radius: 700 },
        {N:1, T:'goStraight', straightMin: 200, straightPlus: 100 },
    ],
};
BBAdata.ObjectMods.vuvisPlusSpeed={
    addTo:['vuvis'],
    shipVariables:{
        speed: {Const: 34, Rand: 6},    // dont work
    },
};
BBAdata.ObjectMods.startWithShield={
    energyField: 5,
    MapModActions:[{
        t:'addShield',
        shield:{
            name: 'absorbtionShield',
            CatchDmgT: {normal:1, energy:1, explo:1},
            DmgReduction: 'energyField',
            ReductionUses: 'infinite',
        },
    }],
};
BBAdata.ObjectMods.colorGold={      view:{Color: 'gold'}, addTo:['enemyShip2'], dontAddTo:['durishka'], };
BBAdata.ObjectMods.darkGreenColor={ view:{Color: '#070'}, addTo:['enemyShip2'], dontAddTo:['durishka'], };
BBAdata.ObjectMods.greenColor={     view:{Color: '#0C0'}, addTo:['enemyShip2'], dontAddTo:['durishka'], };
BBAdata.ObjectMods.orangeColor={    view:{Color: '#FC0'}, addTo:['enemyShip2'], dontAddTo:['durishka'], };
BBAdata.ObjectMods.orangeXColor={   view:{Color: 'orange'}, addTo:['enemyShip2'], dontAddTo:['durishka'], };
BBAdata.ObjectMods.violetColor={    view:{Color: '#408'}, addTo:['enemyShip2'], dontAddTo:['durishka'], };
BBAdata.ObjectMods.whiteColor={     view:{Color: 'white'}, addTo:['enemyShip2'], dontAddTo:['durishka'], };

BBAdata.ObjectMods.allAvoid={
    addTo:['carras','hajaher','cloaker','dregos','hiacynt','zarahiash','vitotas','slimensen','slimensen1','slimensen2','slimensen3','slimensen4'],
    toDo:[
        {N:74,T:'alarmAboutIncomingFire', FlagsRequired:{gotHitFlag:true}, minAlarm: 5, alarmRadius: 150},
        {N:73,T:'avoidIncomingFire', FlagsRequired:{gotHitFlag:true}, minAlarm: 2, avoidTime: 12},
        {N:72,T:'avoidIncomingFire', FlagsRequired:{incomingFireFlag:true}, minAlarm: 5, avoidTime: 12},
    ],
};
BBAdata.ObjectMods.healthSplit={
    addTo:['carras'],
    Weapon:[{t:'healthSplit', gunSpeed: 5, lastShot: 100, minHealth: 1, Radius: 200, doNextWeapon: true}],
};
BBAdata.ObjectMods.carras25health={
    addTo:['carras'],
    lifeM:25,
    life:25,
};
BBAdata.ObjectMods.greenSquadMembers={
    squadSchemeType: {data:{Mod:['greenColor']}},
    MapModActions:[{t:'tryBuildSquads'}],
};
BBAdata.ObjectMods.orhenesShipsI={
    addTo:['orhenes'],
    view:{Color: 'white'},
    squadSchemeType: {t:'loose', count: 8, data:{type:'enemyShip', objectType:'iskariot', Mod:['whiteColor']}},
    MapModActions:[{t:'tryBuildSquads'}],
};
BBAdata.ObjectMods.orhenesSecure1={
    addTo:['orhenes'],
    squadSchemeTypeArray: [
        {t:'loose', count: 2, data:{type:'enemyShip', objectType:'fariax'}},
        {t:'loose', count: 2, data:{type:'enemyShip', objectType:'koriaz'}},
        {t:'loose', count: 4, data:{type:'enemyShip', objectType:'carras'}},
    ],
    MapModActions:[{t:'tryBuildSquads'}],
};
BBAdata.ObjectMods.orhenesSecure2={
    addTo:['orhenes'],
    view: {Color:'#408'},
    squadSchemeTypeArray: [
        {t:'loose', count: 4, data:{type:'enemyShip', objectType:'iskariot', Mod:['violetColor']}},
        {t:'loose', count: 2, data:{type:'enemyShip', objectType:'muerto',   Mod:['violetColor']}},
        {t:'loose', count: 4, data:{type:'enemyShip', objectType:'dregos',   Mod:['violetColor']}},
    ],
    MapModActions:[{t:'tryBuildSquads'}],
};
BBAdata.ObjectMods.orhenesSecure3={
    addTo:['orhenes'],
    view: {Color:'#070'},
    squadSchemeTypeArray: [
        {t:'loose', count: 3, data:{type:'enemyShip', objectType:'loliax', Mod:['darkGreenColor']}},
        {t:'loose', count: 2, data:{type:'enemyShip', objectType:'royale', Mod:['darkGreenColor']}},
        {t:'loose', count: 5, data:{type:'enemyShip', objectType:'dregos', Mod:['darkGreenColor']}},
    ],
    MapModActions:[{t:'tryBuildSquads'}],
};
BBAdata.ObjectMods.orhenesSecure4={
    addTo:['orhenes'],
    view: {Color:'#0C0'},
    squadSchemeTypeArray: [
        {t:'loose', count: 1, data:{type:'enemyShip', objectType:'patiarch', Mod:['greenColor']}},
        {t:'loose', count: 2, data:{type:'enemyShip', objectType:'urser',    Mod:['greenColor']}},
        {t:'loose', count: 5, data:{type:'enemyShip', objectType:'nientes',  Mod:['greenColor']}},
    ],
    MapModActions:[{t:'tryBuildSquads'}],
};
BBAdata.ObjectMods.orhenesSecure5={
    addTo:['orhenes'],
    view: {Color:'#408'},
    squadSchemeTypeArray: [
        {t:'loose', count: 8, data:{type:'enemyShip', objectType:'dregos',   Mod:['violetColor','startWithShield']}},
    ],
    MapModActions:[{t:'tryBuildSquads'}],
};
BBAdata.ObjectMods.saisungVuvisOrbiters={
    addTo:['saisung'],
    view: {Color:'#408'},
    squadSchemeTypeArray: [
        {t:'loose', count: 6, data:{type:'enemyShip', objectType:'vuvis', Mod:['violetColor','vuvisOrbit']}},
    ],
    MapModActions:[{t:'tryBuildSquads'}],
};
BBAdata.ObjectMods.vuvisOrbit={
    addTo:['vuvis'],
    toDo:[
        {N:58,T:'goOrbit', minAlarm: 5},
    ],
};


// DEPRECATED:

BBAdata.ObjectMods.enemyShip={
    M: 'comp',
    lists:{Enemies:1,Ocomp:1,Omoving:1},
    TT: 'enemy',
    mapType: 'E',
    lastSpeedT: 0,
    doSquad: -1,   //??
    dec: 50,       //??
    ammo: -50,     //??
    radius: 15,
    Flags:{
        ResourcesEnds: false,
        ResourcesLow: false,
        WeaponEnds: false,
        LastWeaponShot: 0,
        WeaponLoading: false,

        I_ReadyForEnemy: -1000,
        II_EnemyIsThere: -1000,
        III_SomeoneSeenEnemy: -1000,
        IV_SeenEnemy: -1000,
        V_NearbySeesEnemy: -1000,
        VI_ISeeEnemy: -1000,

        LowLife: false,
        NearbyGotHit: -1000,
        IGotHit: -1000,
    },

    Res:{},
    toDo:[],
    doingTime: -1,
    Manouver: 'goStraight',


    speedLvl: 2,
    LookType: 2,
};
