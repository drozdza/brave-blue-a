
// FIELDS

BBAdata.ObjectMods.RoundField={
    view:{
        circleColor:[255,255,255,0.2],
        onBackground: 1,
    },

    M: 'region',
    lists:{Oregion:1},
    mapType: 'F',
    TT: 'dust',

    radius: 50,
    undestructible: 1,
};
BBAdata.ObjectMods.SquareField={
    view:{
        color: 'red',
        onBackground: 1,
    },

    M: 'region',
    lists:{Oregion:1},
    mapType: 'F',
    TT: 'dust',

    radius: 50,
    squareAngle: 0,
    squareLen: 50,
    squareWidth: 15,
    undestructible: 1,
};
BBAdata.ObjectMods.ConeField={
    view:{
        color: 'red',
        onBackground: 1,
    },

    M: 'region',
    lists:{Oregion:1},
    mapType: 'F',
    TT: 'dust',

    radius: 50,
    coneAngle: 180,
    coneRad2: 50,
    angle: 50,
    undestructible: 1,
    Flags:{},
};

BBAdata.ObjectData.RoundField={
    LoadMods:{
        RoundField:{},
    },
};
BBAdata.ObjectData.SquareField={
    LoadMods:{
        SquareField:{},
    },
};
BBAdata.ObjectData.ConeField={
    LoadMods:{
        ConeField:{},
    },
};

BBAdata.ObjectMods.DestructionField={
    radius:200,
    fieldAnim: 'DestructionField',
    PeriodDMG: {Dmg:1,T:'normal'},
    PeriodTime: 40,
    PeriodOffset: 50,
    ExpireTime: 300,
    mapType: 'F',

};
BBAdata.ObjectData.RoundDestructionField={
    LoadMods:{
        RoundField:{},
        DestructionField:{},
    },
};
BBAdata.ObjectData.ConeDestructionField={
    LoadMods:{
        ConeField:{},
        DestructionField:{},
    },
    mapType: 'PMF',
};

BBAdata.ObjectMods.ElectricityField={
    radius: 160,
    fieldAnim: 'ElectricityField',
    OneTimeEffect: 1,
    OneTimeOffset: 0,
    OneTimeDMG: {Dmg:3, T:'energy'},
    OnDamageExpire: 1,
    ExpireTime: 60,
    mapType: 'PF',
};
BBAdata.ObjectData.RoundElectricityField={
    LoadMods:{
        RoundField:{},
        ElectricityField:{},
    },
};

BBAdata.ObjectMods.HealingField={
    radius: 160,
    fieldAnim: 'HealingField',
    ExpireTime: 360,
    PeriodTime: 30,
    PeriodOffset: 5,
    PeriodHeal: 1,
    mapType: 'EF',
};
BBAdata.ObjectData.RoundHealingField={
    LoadMods:{
        RoundField:{},
        HealingField:{},
    },
};

BBAdata.ObjectMods.PlasmaField={
    radius: 40,
    fieldAnim: 'PlasmaField',
    PeriodDMG:{Dmg:1, T:'normal'},
    PeriodTime: 1,
    PeriodOffset: 1,
    PeriodDelay: 130,
    mapType: 'F',
    dontHit:['EB','BE'],
    fieldAnimMoving: true,
    onDie:{Do:'explode', DMG:{Dmg:13, T:'explo'}, Dist: 210},
};
BBAdata.ObjectData.RoundPlasmaField={
    LoadMods:{
        RoundField:{},
        PlasmaField:{},
    },
};

BBAdata.ObjectMods.TeleField={
    radius: 30,
    simpleFilling: 'rgba(0,0,255,0.2)',
    teleportOnHit: 'withAngle',
    teleportOnHitDist: 520,
    teleportOnHitDistPlus: 200,
    mapType: 'F',
    dontHit: ['E','EB','EM'],
};
BBAdata.ObjectData.RoundTeleField={
    LoadMods:{
        RoundField:{},
        TeleField:{},
    },
};
BBAdata.ObjectData.ConeTeleField={
    LoadMods:{
        ConeField:{},
        TeleField:{},
    },
};
BBAdata.ObjectMods.PlayerTeleField={
    LoadMods:{
        TeleField:{},
    },
    mapType:'PF',
    dontHit:[],
};
BBAdata.ObjectData.RoundPlayerTeleField={
    LoadMods:{
        RoundField:{},
        PlayerTeleField:{},
    },
};

BBAdata.ObjectMods.ShellField={
    radius: 45,
    fieldAnim: 'ShellField',
    bounceType: 'diagonal',
    angle: 0,
    mapType: 'F',
    dontHit:['E','EM','EB'],
};
BBAdata.ObjectData.RoundShellField={
    LoadMods:{
        RoundField:{},
        ShellField:{},
    },
};
BBAdata.ObjectData.ConeShellField={
    LoadMods:{
        ConeField:{},
        ShellField:{},
    },
    dontHit:['P','E','EM','EB'],
};

BBAdata.ObjectMods.SlowDownShellField={
    fieldAnim: 'ShellField',
    SlowDownTo: 2.5,
    SlowDownBy: 11,
    mapType: 'F',
    dontHit: ['E','EM','EB'],
};
BBAdata.ObjectData.ConeSlowDownShellField={
    LoadMods:{
        ConeField:{},
        SlowDownShellField:{},
    },
};

BBAdata.ObjectMods.WindField={
    radius: 55,
    fieldAnim: 'WindField',
    vectorType: 'wind',
    vectorForce: 5,
    mapType: 'F',
    dontHit: ['E','EM','EB'],
};
BBAdata.ObjectData.RoundWindField={
    LoadMods:{
        RoundField:{},
        WindField:{},
    },
};
BBAdata.ObjectData.ConeWindField={
    LoadMods:{
        ConeField:{},
        WindField:{},
    },
};

BBAdata.ObjectMods.GravityField={
    radius: 120,
    fieldAnim: 'GravityField',
    vectorType: 'gravity',
    vectorForce: 9,
    mapType: 'F',
    dontHit: ['E','EM','EB'],
};
BBAdata.ObjectData.RoundGravityField={
    LoadMods:{
        RoundField:{},
        GravityField:{},
    },
};

BBAdata.ObjectData.LaserMarker={
    LoadMods:{
        SquareField:{},
    },
    radius: 0,
    squareAngle: 20,
    squareLen: 450,
    squareWidth: 0.5,
    simpleFilling: 'red',
    dontHit:['EB','BE','E','P','EM','A','RF'],
};
