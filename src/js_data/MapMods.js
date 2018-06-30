if(typeof BBAdata.ObjectMods == 'undefined') BBAdata.ObjectMods = {};

/*
            {N:74,T:'alarmAboutIncomingFire', FlagsRequired:{gotHitFlag:true}, minAlarm: 5, alarmRadius: 220},
            {N:73,T:'avoidIncomingFire', FlagsRequired:{gotHitFlag:true}, minAlarm: 2, avoidTime: 12},
            {N:72,T:'avoidIncomingFire', FlagsRequired:{incomingFireFlag:true}, minAlarm: 5, avoidTime: 12},

            {N:67,T:'lowerSpeedForResources', minAlarm: 0, wantedRes: 'missilePack', wantedResR: 20, gotoSpeed: 1},
            {N:66,T:'speedUpIfResources', minAlarm: 0, wantedRes: 'missilePack', wantedResR: 20, gotoSpeed: 2},
            {N:61,T:'speedUp', maxSpeedLvl: 1, gotoSpeed: 2},

            {N:55,T:'alarmAboutSpottedEnemy', minAlarm: 5, alarmRadius: 250},
            {N:45,T:'lowerAlarmLvl', minAlarm: 5, minEnemyDontSeen: 750, gotoAlarm: 4, goToSpotLvl: 2},
            {N:35,T:'followEnemy', minAlarm: 5, goToSpotLvl: 3 },
            {N:23,T:'stayInRegion', X:0, Y:0, Radius: 1700 },
            {N:18,T:'changeManouver2', maxAlarm: 4, minAlarm: 3, straightMin: 20, straightPlus: 80, turnMin: 10, turnPlus: 80  },
            {N:15,T:'changeManouver', maxAlarm: 3, straightMin: 60, straightPlus: 100, turnMin: 30, turnPlus: 70  },
            {N:1, T:'goStraight', straightMin: 200, straightPlus: 100 },
*/



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
    weapon:[{t:'healthSplit', gunSpeed: 5, lastShot: 100, minHealth: 1, Radius: 200, doNextWeapon: true}],
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
