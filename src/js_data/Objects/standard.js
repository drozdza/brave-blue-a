
BBAdata.ObjectData.routePoint={
    T: 'routePoint',
    M: 'routePoint',
    lists:{},
    radius: 20,
    pointColor: '20,0,40',
    textColor: '40,0,80',
};

BBAdata.ObjectData.routePointHealing={
    T: 'routePoint',
    M: 'routePoint',
    lists:{},
    radius: 20,
    pointColor: '0,60,0',
    textColor: '0,120,0',
};



// STANDARD OBJECTS

BBAdata.ObjectData.destruction_field={
    M: 'region',
    TT: 'dust',
    lists:{Oregion:1},
    mapType: 'F',
};
BBAdata.ObjectMods.missile={
    M: 'comp',
    TT: 'dust',
    lists:{Othink:1,Omoving:1},
    moveFunc: 'move',
    mapType: 'EM',

    lifeM: 1,
    radius: 10,

    ThinkNow: '',
    Thinks: {
        expire:{T:'expire'},
    },
    ThinkTick: 0,

    Manouver: 'followObject',

    Flags:{},
    FlagReactions:{},
};
BBAdata.ObjectData.missile={
    LoadMods:{
        missile:{},
    },
    view:{
        Letter: 'Y',
        LetterSize: 12,
        Color: '#ff0',
        Angle: 0,
    },

    speed: 15,
    speedT: 3,

    DMG:{Dmg:1,T:'explo'},
};
BBAdata.ObjectData.healing_missile={
    LoadMods:{
        missile:{},
    },
    mapCollide: ['E','EMF','F'],
    view:{
        Letter: 'J',
        LetterSize: 12,
        Color: '#0f0',
        Angle: 180,
    },

    speed: 13,
    speedT: 20,

    Heal: 1,
};
BBAdata.ObjectData.energy_field_missile={
    LoadMods:{
        missile:{},
    },
    mapCollide: ['E','EMF','F'],
    view:{
        Letter: 'E',
        LetterSize: 12,
        Color: '#0f0',
        Angle: 180,
    },

    speed: 13,
    speedT: 20,
    doingTime: 230,
    onHit:{},
    toDo: [{T:'expire'}],
    Manouver: 'followEntity',
};

BBAdata.ObjectData.bullet_bomb={
    M: 'comp',
    TT: 'dust',
    lists:{Ocomp:1,Omoving:1},
    moveFunc: 'move',
    mapType: 'EM',
    view:{
        Letter: 'P',
        LetterSize: 12,
        Color: '#ff0',
        Angle: 0,
    },

    lifeM: 1,
    radius: 10,
    speed: 15,
    speedT: 2,
    doingTime: 35,
    toDo: [{T:'expire'}],
    Manouver: 'goStraight',
    Flags:{},
    FlagReactions:{},
};


BBAdata.ObjectMods.aliveUnit={
    lifeM: 1,
};
BBAdata.ObjectMods.Star={
    view:{
        LIBpath:'StarPath',
        PathSize:30,
        Color:'white',
        Angle:0,
        HitPattern:'StarHit',
        onBackground: 1,
    },
    radius:15,

    SlowDown:3,
    M: 'static',
    lists:{Oregion:1},
    Flags:{},
    FlagReactions:{},
    mapType:'A',
    TT:'bgStars',
};

BBAdata.ObjectData.Star={
    LoadMods:{
        Star:{},
        aliveUnit:{lifeM:6},
    },
};
BBAdata.ObjectData.StarS={
    LoadMods:{
        Star:{view:{PathSize: 18}, radius: 9},
        aliveUnit:{lifeM:6},
    },
};
BBAdata.ObjectData.StarM={
    LoadMods:{
        Star:{view:{PathSize: 60}, radius: 30},
        aliveUnit:{lifeM:9},
    },
};
BBAdata.ObjectData.StarL={
    LoadMods:{
        Star:{view:{PathSize: 80}, radius: 40},
        aliveUnit:{lifeM:17},
    },
};

BBAdata.ObjectData.Gstar={
    view:{
        LIBpath:'StarPath',
        PathSize:170,
        Color:'yellow',
        Angle:0,
        XY:180,
        onBackground: 1,
    },
    M:'static',
    lists:{Oregion:1},
    TT: 'dust',
    radius: 90,
    undestructible: 1,
    bounceType: 'straight',
    Flags:{},
    FlagReactions:{},
    mapType:'A',
};
BBAdata.ObjectData.EndPortal={
    view:{
        onBackground: 1,
    },
    M: 'static',
    mapType: 'PF',

    TT: 'regionAnim',
    animTick: 0,
    animType: 'EndPortalStart',
    radius: 50,
    undestructible: 1,
    lists:{},
    stateIn:{
        changeCount:{gameEnded:1},
        changeAnim:{name:'EndPortalEnd',type:'end',time:45},
    },
};
BBAdata.ObjectData.shieldBlob={
    M: 'moving',
    mapType: 'A',

    lists:{Omoving:1},
    moveFunc: 'move',
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
};
