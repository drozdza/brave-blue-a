// MINES

BBAdata.ObjectData.Mine={
    M: 'comp',
    lists:{Ocomp:1,Omoving:1},
    mapType: 'EM',
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
        type: 'Field',
        objName: 'RoundField',
        radius: 0,
        angle: 0,
        Oid: -1,
        placementT:'directPlaces',
        onDisbandRemove:1,
        Mod: {
            simpleFilling: 'transparent',
            radius: 80,
            mapType: 'PF',
            stateIn: {explodeMaster:1},
        },
    },{
        type: 'Field',
        objName: 'RoundField',
        radius: 0,
        angle: 0,
        Oid: -1,
        placementT:'directPlaces',
        onDisbandRemove:1,
        Mod: {
            viewOff: true,
            radius: 200,
            mapType: 'PF',
            stateIn: {informMaster:'enemyClose'},
            stateOut: {informMaster:'enemyFar'},
        },
    }],

    Flags:{}
};
BBAdata.ObjectData.MineMod_mediumCircle={
    squadScheme: [{
        type: 'Field',
        objName: 'RoundField',
        radius: 0,
        angle: 0,
        Oid: -1,
        placementT:'directPlaces',
        onDisbandRemove:1,
        Mod: {
            simpleFilling: 'transparent',
            mapType: 'PF',
            radius: 50,
            stateIn: {explodeMaster:1},
        },
    },{
        type: 'Field',
        objName: 'RoundField',
        radius: 0,
        angle: 0,
        Oid: -1,
        placementT:'directPlaces',
        onDisbandRemove:1,
        Mod: {
            viewOff: true,
            radius: 150,
            mapType: 'PF',
            stateIn: {informMaster:'enemyClose'},
            stateOut: {informMaster:'enemyFar'},
        },
    }],
};
BBAdata.ObjectData.MineMod_smallCircle={
    squadScheme: [{
        type: 'Field',
        objName: 'RoundField',
        radius: 0,
        angle: 0,
        Oid: -1,
        placementT:'directPlaces',
        onDisbandRemove:1,
        Mod: {
            simpleFilling: 'transparent',
            radius: 35,
            mapType: 'PF',
            stateIn: {explodeMaster:1},
        },
    },{
        type: 'Field',
        objName: 'RoundField',
        radius: 0,
        angle: 0,
        Oid: -1,
        placementT:'directPlaces',
        onDisbandRemove:1,
        Mod: {
            viewOff: true,
            radius: 130,
            mapType: 'PF',
            stateIn: {informMaster:'enemyClose'},
            stateOut: {informMaster:'enemyFar'},
        },
    }],
};
BBAdata.ObjectData.MineMod_Cone={
    squadScheme: [{
        type: 'Field',
        objName: 'ConeField',
        radius: 0,
        angle: 0,
        Oid: -1,
        placementT:'directPlaces',
        onDisbandRemove:1,
        Mod: {
            simpleFilling: 'transparent',
            radius: 210,
            coneRad2: 0,
            coneAngle: 20,
            mapType: 'PF',
            stateIn: {explodeMaster:1},
        },
    },{
        type: 'Field',
        objName: 'ConeField',
        radius: -100,
        angle: 0,
        Oid: -1,
        placementT:'directPlaces',
        onDisbandRemove:1,
        Mod: {
            viewOff: true,
            radius: 380,
            coneRad2: 60,
            coneAngle: 20,
            mapType: 'PF',
            stateIn: {informMaster:'enemyClose'},
            stateOut: {informMaster:'enemyFar'},
        },
    }],
};
BBAdata.ObjectData.MineMod_hedgehog={
    view:{
        Letter: 'A',
        LetterSize: 10,
        Color: '#f00',
        Angle: 0,
    },
};
