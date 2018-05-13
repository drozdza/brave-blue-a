BBAdata.SHIPpresetsOld={};


BBAdata.SHIPpresetsOld['start']={
    radius: 7,
    S: 2,
    T: 'ship',
    speedM: 0,
    lastSpeedT: 0,
    M: 'moving',
    view:{
        Letter: 'A',
        LetterSize: 16,
        Color: 'blue',
        Angle: 0,
        HitPattern: 'HullFire_20',
        shieldsRadius: 14,
        Shields:{
            absorbtionShield:{
              strokeStyle: 'rgba(154,255,255,0.8)',
              fillStyle: 'rgba(154,255,255,0.2)',
            },
        },
    },
    mapType: 'P',
    periodDMG: {},
    Flags: {},


    Weight: 25,
    lifeM: 6,
    life: 6,
    EnergyM: 20,
    engineMultiply: 2,
    speed: 8,
    speedAcl: 3,
    speedDcl: 10,
    speedT: 10,
    Storage:{
        Ammo: {R:0, M:1, Hidden:1},
    },
    ShowFireRange: false,
    ShowAmmoIndicator: true,
    GlueFireToEstimated: 100,
    GlueFireToLaser: 70,
    KeysModules:{69:[0]},
    Weapon1: 0,
    Weapon2: 1,
    MouseDown1: false,
    MouseDown2: false,
    Weapons:[
        {T:'single', gunS:0,gunU:0, GunSpeed: 1, Speed: 17, Dec: 30, shotsToReload: 3, reloadTime: 12, Use:{'Ammo':1}, DMG:{Dmg:1,T:'normal'},},
        {T:'rose',   gunS:0,gunU:0, GunSpeed: 4, AtOnce: 9, Use:{'Ammo':5}, RoseAngle: 3, Speed: 15, Dec: 90, DMG:{Dmg:1,T:'normal'},},
        {T:'single', gunS:0,gunU:0, GunSpeed: 20, Speed: 17, Dec: 70, Use:{'Ammo':1}, DMG:{Dmg:11,T:'normal'},},
    ],
    Modules:[
        {T:'Prod',subT:'Bullet',Storage:'Ammo',Disabled:0,Emin:2,Emax:4,E:0,Prod:0,ifProd:20 },
        {T:'Prod',subT:'Bullet',Storage:'Ammo',Disabled:0,Emin:2,Emax:4,E:0,Prod:0,ifProd:20 },
    ],
    SpecialMoves:{
        1:{T:'changePosition', Dec:6, timesBy:2, Dist: 10, Angle: -120},
        2:{T:'changePosition', Dec:6, timesBy:2, Dist: 10, Angle: 120},
        1:{T:'changeAngle',    Dec:6, angleBy: -15},
        2:{T:'changeAngle',    Dec:6, angleBy: 15},
    },
    ChangeSpeedStops:{
        up: {8:1},
        down: {8:1}
    },
    ChangeSpeedDelay:15,
};
BBAdata.SHIPpresetsOld['destFields']={
    radius: 7,
    S: 2,
    T: 'ship',
    speedM: 0,
    lastSpeedT: 0,
    M: 'moving',
    view:{
        Letter: 'A',
        LetterSize: 16,
        Color: 'blue',
        Angle: 0,
        HitPattern: 'HullFire_20',
        shieldsRadius: 14,
        Shields:{
            absorbtionShield:{
              strokeStyle: 'rgba(154,255,255,0.8)',
              fillStyle: 'rgba(154,255,255,0.2)',
            },
        },
    },
    mapType: 'P',
    periodDMG: {},
    Flags: {},



    Weight: 25,
    life: 11,
    lifeM: 11,
    Shields:[{
        name: 'absorbtionShield',
        CatchDmgT: {normal:1, energy:1, explo:1},
        DmgReduction: 'absorbtion',
        ResPath: 'ShieldStorage',
        ReductionUses: 'infinite',
        Own: true,
    }],
    EnergyFieldMax: 10,
    EnergyM: 32,
    engineMultiply: 1,
    speed: 8,
    speedAcl: 3,
    speedDcl: 10,
    speedT: 4,
    Storage:{
        Missile: {R:10,M:10},
    },
    ModStorage:{
        TeleJump: {R:0,M:6},
    },
    ShieldStorage:{
        absorbtion: {R:0, M:10},
    },
    ShowFireRange: false,
    ShowAmmoIndicator: true,
    GlueFireToEstimated: 100,
    GlueFireToLaser: 70,
    KeysModules:{69:[0,5],82:[11],84:[2],81:[4],70:[8]},
    Weapon1: 2,
    Weapon2: 3,
    MouseDown1: false,
    MouseDown2: false,
    Weapons:[
        {T:'missile',  gunS:0,GunSpeed: 10, Use:{'Missile':1}, Speed: 12, SpeedT: 6, Dec: 130, AimRadius: 60, explodePreset:'MissileDestructionFieldGiant'},
        {T:'missileR', gunS:0,GunSpeed: 6, Use:{'Missile':5}, Speed: 12, AtOnce: 8, SpeedT: 6, Dec: 95, AimRadius: 60, explodePreset:'MissileDestructionFieldSmall'},
        {T:'bombT',   gunS:0,GunSpeed: 5,  Distance: 500, offTime: 0, explodePreset:'DestructionFieldMedium'},
        {T:'tele',    gunS:0,GunSpeed: 3, ModUse:{TeleJump:1}, Speed: 400, Dec: 1},
    ],
    Modules:[
        {T:'shieldProd',Disabled:0,Emin:0.1,Emax:1,E:0,Prod:0,ifProd:30, ShieldStorage:'absorbtion' },
        {T:'spotRegion',Disabled:1,Emin:4,Emax:4,E:0,Prod:0,ifProd:4 },
        {T:'moduleProd',Disabled:0,Emin:2,Emax:4,E:0,Prod:0,ifProd:60, subT:'TeleJump',ModStorage:'TeleJump'},
        {T:'healerProd',Disabled:0,Emin:4,Emax:16,E:0,Prod:0,ifProd:1440 },
        {T:'Prod',      subT:'Missile',Storage:'Missile',Disabled:0,Emin:1,Emax:6,E:0,Prod:0,ifProd:6 },
        {T:'radar',Disabled:1,Emin:1,Emax:30,E:0,Prod:0,ifProd:540,Radius:2500},
    ],
};
BBAdata.SHIPpresetsOld['bombs1']={
    radius: 7,
    S: 2,
    T: 'ship',
    speedM: 0,
    lastSpeedT: 0,
    M: 'moving',
    view:{
        Letter: 'A',
        LetterSize: 16,
        Color: 'blue',
        Angle: 0,
        HitPattern: 'HullFire_20',
        shieldsRadius: 14,
        Shields:{
            absorbtionShield:{
              strokeStyle: 'rgba(154,255,255,0.8)',
              fillStyle: 'rgba(154,255,255,0.2)',
            },
        },
    },
    mapType: 'P',
    periodDMG: {},
    Flags: {},



    Weight: 25,
    life: 11,
    lifeM: 11,
    Shields:[{
        name: 'absorbtionShield',
        CatchDmgT: {normal:1, energy:1, explo:1},
        DmgReduction: 'absorbtion',
        ResPath: 'ShieldStorage',
        ReductionUses: 'infinite',
        Own: true,
    }],
    EnergyFieldMax: 10,
    EnergyM: 32,
    engineMultiply: 1,
    speed: 8,
    speedAcl: 3,
    speedDcl: 10,
    speedT: 4,
    Storage:{
        Bomb: {R:12, M:12},
    },
    ModStorage:{
        TeleJump: {R:0,M:6},
    },
    ShieldStorage:{
        absorbtion: {R:0, M:10},
    },
    ShowFireRange: true,
    ShowAmmoIndicator: true,
    GlueFireToEstimated: 100,
    GlueFireToLaser: 70,
    KeysModules:{69:[0,5],82:[11],84:[2],81:[4],70:[8]},
    Weapon1: 3,
    Weapon2: 4,
    MouseDown1: false,
    MouseDown2: false,
    Weapons:[
        {T:'bombD',   gunS:0,GunSpeed: 5, Use:{'Bomb':1}, Speed: 10, Dec: 50, explodePreset:'NailsBigCircle'},
        {T:'bombD',   gunS:0,GunSpeed: 5, Use:{'Bomb':1}, Speed: 10, Dec: 60, explodePreset:'NailsWirlpool'},
        {T:'bombD',   gunS:0,GunSpeed: 5, Use:{'Bomb':1}, Speed: 10, Dec: 50, explodePreset:'ExplosionSize1',minDec:6},
        {T:'bombD',   gunS:0,GunSpeed: 5, Use:{'Bomb':1}, Speed: 10, Dec: 40, explodePreset:'ExplosionSize3',minDec:13},
        {T:'tele',    gunS:0,GunSpeed: 3, ModUse:{TeleJump:1}, Speed: 400, Dec: 1},
    ],
    Modules:[
        {T:'shieldProd',Disabled:0,Emin:0.1,Emax:1,E:0,Prod:0,ifProd:30, ShieldStorage:'absorbtion' },
        {T:'spotRegion',Disabled:1,Emin:4,Emax:4,E:0,Prod:0,ifProd:4 },
        {T:'moduleProd',Disabled:0,Emin:2,Emax:4,E:0,Prod:0,ifProd:60, subT:'TeleJump',ModStorage:'TeleJump'},
        {T:'healerProd',Disabled:0,Emin:4,Emax:16,E:0,Prod:0,ifProd:1440 },
        {T:'Prod',subT:'Bomb',Storage:'Bomb',Disabled:0,Emin:1,Emax:6,E:0,Prod:0,ifProd:6 },
        {T:'radar',Disabled:1,Emin:1,Emax:30,E:0,Prod:0,ifProd:540,Radius:2500},
    ],
};
BBAdata.SHIPpresetsOld['bombs2']={
    radius: 7,
    S: 2,
    T: 'ship',
    speedM: 0,
    lastSpeedT: 0,
    M: 'moving',
    view:{
        Letter: 'A',
        LetterSize: 16,
        Color: 'blue',
        Angle: 0,
        HitPattern: 'HullFire_20',
        shieldsRadius: 14,
        Shields:{
            absorbtionShield:{
              strokeStyle: 'rgba(154,255,255,0.8)',
              fillStyle: 'rgba(154,255,255,0.2)',
            },
        },
    },
    mapType: 'P',
    periodDMG: {},
    Flags: {},



    Weight: 25,
    life: 11,
    lifeM: 11,
    Shields:[{
        name: 'absorbtionShield',
        CatchDmgT: {normal:1, energy:1, explo:1},
        DmgReduction: 'absorbtion',
        ResPath: 'ShieldStorage',
        ReductionUses: 'infinite',
        Own: true,
    }],
    EnergyFieldMax: 10,
    EnergyM: 32,
    engineMultiply: 1,
    speed: 8,
    speedAcl: 3,
    speedDcl: 10,
    speedT: 4,
    Storage:{
        Bomb: {R:12, M:12},
    },
    ModStorage:{
        TeleJump: {R:0,M:6},
    },
    ShieldStorage:{
        absorbtion: {R:0, M:10},
    },
    ShowFireRange: true,
    ShowAmmoIndicator: true,
    GlueFireToEstimated: 100,
    GlueFireToLaser: 70,
    KeysModules:{69:[0,5],82:[11],84:[2],81:[4],70:[8]},
    Weapon1: 2,
    Weapon2: 6,
    MouseDown1: false,
    MouseDown2: false,
    Weapons:[
        {T:'bomb',    gunS:0,GunSpeed: 5, Use:{'Bomb':1}, Distance: 400, explodePreset:'NailsCircleToCenter'},
        {T:'bombT',   gunS:0,GunSpeed: 5, Use:{'Bomb':1}, Distance: 400, offTime: 60, explodePreset:'NailsBigCircle'},
        {T:'bombT',   gunS:0,GunSpeed: 5, Use:{'Bomb':1}, Distance: 400, offTime: 60, explodePreset:'NailsBigLongCircle'},
        {T:'bombT',   gunS:0,GunSpeed: 5, Use:{'Bomb':1}, Distance: 400, offTime: 120, explodePreset:'NailsWirlpool', dontCollide:true},
        {T:'bombT',   gunS:0,GunSpeed: 5, Use:{'Bomb':1}, Distance: 500, offTime: 60, explodePreset:'ExplosionSize1'},
        {T:'bombT',   gunS:0,GunSpeed: 5, Use:{'Bomb':1}, Distance: 500, offTime: 0, explodePreset:'ExplosionSize3'},
        {T:'tele',    gunS:0,GunSpeed: 3, ModUse:{TeleJump:1}, Speed: 400, Dec: 1},
    ],
    Modules:[
        {T:'shieldProd',Disabled:0,Emin:0.1,Emax:1,E:0,Prod:0,ifProd:30, ShieldStorage:'absorbtion' },
        {T:'spotRegion',Disabled:1,Emin:4,Emax:4,E:0,Prod:0,ifProd:4 },
        {T:'moduleProd',  Disabled:0,Emin:2,Emax:4,E:0,Prod:0,ifProd:60, subT:'TeleJump', ModStorage:'TeleJump'},
        {T:'healerProd',Disabled:0,Emin:4,Emax:16,E:0,Prod:0,ifProd:1440 },
        {T:'Prod',      subT:'Bomb',Storage:'Bomb',Disabled:0,Emin:1,Emax:6,E:0,Prod:0,ifProd:6 },
        {T:'radar',     Disabled:1,Emin:1,Emax:30,E:0,Prod:0,ifProd:540,Radius:2500},
    ],
};
BBAdata.SHIPpresetsOld['moves1']={
    radius: 7,
    S: 2,
    T: 'ship',
    speedM: 0,
    lastSpeedT: 0,
    M: 'moving',
    view:{
        Letter: 'A',
        LetterSize: 16,
        Color: 'blue',
        Angle: 0,
        HitPattern: 'HullFire_20',
        shieldsRadius: 14,
        Shields:{
            absorbtionShield:{
              strokeStyle: 'rgba(154,255,255,0.8)',
              fillStyle: 'rgba(154,255,255,0.2)',
            },
        },
    },
    mapType: 'P',
    periodDMG: {},
    Flags: {},



    Weight: 25,
    life: 11,
    lifeM: 11,
    EnergyM: 27,
    engineMultiply: 1,
    speed: 8,
    speedAcl: 3,
    speedDcl: 10,
    speedT: 4,
    Storage:{
        Ammo: {R:0, M:50},
        Bomb: {R:12, M:12},
    },
    ModStorage:{
        Moves: {R:0, M:8},
    },
    ShieldStorage:{},
    ShowFireRange: false,
    ShowAmmoIndicator: true,
    GlueFireToEstimated: 100,
    GlueFireToLaser: 70,
    KeysModules:{69:[0,1],82:[11],84:[2],81:[4],70:[5]},
    Weapon1: 0,
    Weapon2: 3,
    MouseDown1: false,
    MouseDown2: false,
    Weapons:[
        {T:'single',  gunS:0,GunSpeed: 5, Speed: 17, Dec: 30, Use:{'Ammo':1}, DMG:{Dmg:1,T:'normal'},},
        {T:'double',  gunS:0,GunSpeed: 1, Speed: 15, Dec: 30, Use:{'Ammo':2}, DMG:{Dmg:1,T:'normal'},},
        {T:'rose',    gunS:0,GunSpeed: 4, AtOnce: 9, Use:{'Ammo':5}, RoseAngle: 3, Speed: 15, Dec: 30, DMG:{Dmg:1,T:'normal'},},
        {T:'bomb',    gunS:0,GunSpeed: 5, Use:{'Bomb':1}, Speed: 10, Dec: 30, explodePreset:'ExplosionSize2'},
    ],
    Modules:[
        {T:'Prod', subT:'Bullet',Storage:'Ammo', Disabled:0,Emin:2,Emax:4,E:0,Prod:0,ifProd:12 },
        {T:'Prod', subT:'Bomb',  Storage:'Bomb', Disabled:0,Emin:1,Emax:10,E:0,Prod:0,ifProd:100 },
        {T:'moduleProd',Disabled:0,Emin:2,Emax:4,E:0,Prod:0,ifProd:80, subT:'Moves', ModStorage:'Moves'},
        {T:'healerProd',Disabled:0,Emin:1,Emax:16,E:0,Prod:0,ifProd:144 },
    ],
    SpecialMoves:{
        1:{T:'changeAngle',    ModUse:{'Moves':1}, Dec:6, angleBy: -15},
        2:{T:'changeAngle',    ModUse:{'Moves':1}, Dec:6, angleBy: 15},
        3:{T:'changeSpeed',    ModUse:{'Moves':1}, Dec:5, speedBy: 1},
        4:{T:'changePosition', ModUse:{'Moves':1}, Dec:12, timesBy: 3, Dist: 10, Angle: 180},
    },
};
BBAdata.SHIPpresetsOld['best']={
    radius: 7,
    S: 2,
    T: 'ship',
    speedM: 0,
    lastSpeedT: 0,
    M: 'moving',
    view:{
        Letter: 'A',
        LetterSize: 16,
        Color: 'blue',
        Angle: 0,
        HitPattern: 'HullFire_20',
        shieldsRadius: 14,
        Shields:{
            absorbtionShield:{
              strokeStyle: 'rgba(154,255,255,0.8)',
              fillStyle: 'rgba(154,255,255,0.2)',
            },
        },
    },
    mapType: 'P',
    periodDMG: {},
    Flags: {},




    Weight: 25,
    life: 11,
    lifeM: 11,
    Shields:[{
        name: 'absorbtionShield',
        CatchDmgT: {normal:1, energy:1, explo:1},
        DmgReduction: 'absorbtion',
        ResPath: 'ShieldStorage',
        ReductionUses: 'infinite',
        Own: true,
    }],
    EnergyFieldMax: 10,
    EnergyM: 32,
    engineMultiply: 1,
    speed: 8,
    speedAcl: 3,
    speedDcl: 10,
    speedT: 4,
    Storage:{
        Ammo: {R:0, M:50},
        Missile: {R:10,M:10},
        Bomb: {R:12, M:12},
    },
    ModStorage:{
        TeleJump: {R:0,M:6},
        Laser: {R:0,M:4}
    },
    ShieldStorage:{
        absorbtion: {R:0, M:10},
    },
    ShowFireRange: false,
    ShowAmmoIndicator: true,
    GlueFireToEstimated: 100,
    GlueFireToLaser: 70,
    KeysModules:{66:[6],69:[0,5],73:[3,9,10],77:[7],84:[2],81:[4],70:[8],82:[11]},
    Weapon1: 0,
    Weapon2: 8,
    MouseDown1: false,
    MouseDown2: false,
    Weapons:[
        {T:'single',  gunS:0,GunSpeed: 5,  Use:{Ammo:1}, Speed: 17, Dec: 30, DMG:{Dmg:1,T:'normal'},},
        {T:'double',  gunS:0,GunSpeed: 1,  Use:{Ammo:2}, Speed: 15, Dec: 30, DMG:{Dmg:1,T:'normal'},},
        {T:'rose',    gunS:0,GunSpeed: 4,  Use:{Ammo:5}, AtOnce: 9, RoseAngle: 3, Speed: 15, Dec: 30, DMG:{Dmg:1,T:'normal'},},
        {T:'laser',   gunS:0,GunSpeed: 10, ModUse:{Laser:1}, Speed: 650, Dec: 1, DMG:{Dmg:5,T:'energy'},},
        {T:'bomb',    gunS:0,GunSpeed: 5,  Use:{Ammo:3}, Speed: 0.1, Teleport:{ Dist: 35, Angle: 270, AngleRand: 180}, Dec: 10, onHitDieExpire:    {Do:'explode',DMG:{Dmg:7,T:'explo'}, Dist: 80}},
        {T:'missile',  gunS:0,GunSpeed: 10, Use:{Missile:1}, Speed: 12, SpeedT: 4, Dec: 400, AimRadius: 120, DMG:{Dmg:3,T:'explo'},},
        {T:'missileR', gunS:0,GunSpeed: 6,  Use:{Missile:5}, Speed: 12, AtOnce: 8, SpeedT: 6, Dec: 95, AimRadius: 60, DMG:{Dmg:3,T:'explo'},},
        {T:'bomb',    gunS:0,GunSpeed: 5,  Use:{Bomb:1}, Speed: 10, Dec: 30, explodePreset:'NailsBigCircle'},
        {T:'tele',    gunS:0,GunSpeed: 3,  ModUse:{TeleJump:1}, Speed: 400, Dec: 1},
    ],
    Modules:[
        {T:'shieldProd',Disabled:0,Prod:0,E:0,Emin:0.1,Emax:1,ifProd:30, ShieldStorage:'absorbtion' },
        {T:'spotRegion',Disabled:1,Prod:0,E:0,Emin:4,Emax:4, ifProd:4 },
        {T:'moduleProd',Disabled:0,Prod:0,E:0,Emin:2,Emax:4, ifProd:60, subT:'TeleJump', ModStorage:'TeleJump'},
        {T:'Prod',      Disabled:0,Prod:0,E:0,Emin:2,Emax:4, ifProd:10,subT:'Bullet',Storage:'Ammo'},
        {T:'esteemProd',Disabled:1,Prod:0,E:0,Emin:1,Emax:1, ifProd:9000 },
        {T:'healerProd',Disabled:0,Prod:0,E:0,Emin:4,Emax:16,ifProd:1440 },
        {T:'Prod',      Disabled:0,Prod:0,E:0,Emin:1,Emax:10,ifProd:60,subT:'Bomb',Storage:'Bomb'},
        {T:'Prod',      Disabled:0,Prod:0,E:0,Emin:1,Emax:6, ifProd:6,subT:'Missile',Storage:'Missile'},
        {T:'moduleProd',Disabled:1,Prod:0,E:0,Emin:2,Emax:4, ifProd:160, subT:'Laser', ModStorage:'Laser'},
        {T:'Prod',      Disabled:0,Prod:0,E:0,Emin:2,Emax:4, ifProd:60,subT:'Bullet',Storage:'Ammo'},
        {T:'Prod',      Disabled:0,Prod:0,E:0,Emin:6,Emax:12,ifProd:150,subT:'Bullet',Storage:'Ammo'},
        {T:'radar',     Disabled:1,Prod:0,E:0,Emin:1,Emax:30,ifProd:5400,Radius:2500},
    ],
    SpecialMoves:{
        1:{T:'changeAll', Dec: 16, angleBy: -7, timesBy:3, Dist: 10, Angle: 180},
        2:{T:'changeAll', Dec: 16, angleBy: 7 , timesBy:3, Dist: 10, Angle: 180},
        3:{T:'teleportTo', Dec: 10, Dist: 70, Angle: -90, AngleRand: 190},
        4:{T:'changePosition', Dec:12, timesBy: 5, Dist: 10, Angle: 180},
    },
};
BBAdata.SHIPpresetsOld['bestJumper']={
    radius: 7,
    S: 2,
    T: 'ship',
    speedM: 0,
    lastSpeedT: 0,
    M: 'moving',
    view:{
        Letter: 'A',
        LetterSize: 16,
        Color: 'blue',
        Angle: 0,
        HitPattern: 'HullFire_20',
        shieldsRadius: 14,
        Shields:{
            absorbtionShield:{
              strokeStyle: 'rgba(154,255,255,0.8)',
              fillStyle: 'rgba(154,255,255,0.2)',
            },
        },
    },
    mapType: 'P',
    periodDMG: {},
    Flags: {},


    Weight: 25,
    life: 11,
    lifeM: 11,
    Shields:[{
        name: 'absorbtionShield',
        CatchDmgT: {normal:1, energy:1, explo:1},
        DmgReduction: 'absorbtion',
        ResPath: 'ShieldStorage',
        ReductionUses: 'infinite',
        Own: true,
    },{
        name: 'jumpShield',
        CatchDmgT: {normal:1, energy:1, explo:1},
        DmgReduction: 'infinite',
        ReductionUses: 'infinite',
        ResPath: 'ModStorage',
        jumpOnHit: 200,
        Own: true,
        HitDieAnimation: 'dontShow',
    }],
    EnergyFieldMax: 10,
    EnergyM: 32,
    engineMultiply: 1,
    speed: 8,
    speedAcl: 3,
    speedDcl: 10,
    speedT: 4,
    Storage:{
        Ammo: {R:0, M:50},
        Missile: {R:10,M:10},
        Bomb: {R:12, M:12},
    },
    ModStorage:{
        TeleJump: {R:0,M:6},
        Laser: {R:0,M:4}
    },
    ShieldStorage:{
        absorbtion: {R:0, M:10},
    },
    ShowFireRange: false,
    ShowAmmoIndicator: true,
    GlueFireToEstimated: 100,
    GlueFireToLaser: 70,
    KeysModules:{66:[6],69:[0,5],73:[3,9,10],77:[7],84:[2],81:[4],70:[8],82:[11]},
    Weapon1: 0,
    Weapon2: 8,
    MouseDown1: false,
    MouseDown2: false,
    Weapons:[
        {T:'bomb',    gunS:0,GunSpeed: 5,  Use:{Bomb:1}, Speed: 10, Dec: 1, explodePreset:'SmallWindField'},
        {T:'double',  gunS:0,GunSpeed: 1,  Use:{Ammo:2}, Speed: 15, Dec: 30, DMG:{Dmg:1,T:'normal'},},
        {T:'rose',    gunS:0,GunSpeed: 4,  Use:{Ammo:5}, AtOnce: 9, RoseAngle: 3, Speed: 15, Dec: 30, DMG:{Dmg:1,T:'normal'},},
        {T:'laser',   gunS:0,GunSpeed: 10, ModUse:{Laser:1}, Speed: 650, Dec: 1, DMG:{Dmg:5,T:'energy'},},
        {T:'bomb',    gunS:0,GunSpeed: 5,  Use:{Ammo:3}, Speed: 0.1, Teleport:{ Dist: 35, Angle: 270, AngleRand: 180}, Dec: 10, onHitDieExpire:    {Do:'explode',DMG:{Dmg:7,T:'explo'}, Dist: 80}},
        {T:'missile',  gunS:0,GunSpeed: 10, Use:{Missile:1}, Speed: 12, SpeedT: 4, Dec: 400, AimRadius: 120, DMG:{Dmg:3,T:'explo'},},
        {T:'missileR', gunS:0,GunSpeed: 6,  Use:{Missile:5}, Speed: 12, AtOnce: 8, SpeedT: 6, Dec: 95, AimRadius: 60, DMG:{Dmg:3,T:'explo'},},
        {T:'bomb',    gunS:0,GunSpeed: 5,  Use:{Bomb:1}, Speed: 10, Dec: 30, explodePreset:'NailsBigCircle'},
        {T:'tele',    gunS:0,GunSpeed: 3,  ModUse:{TeleJump:1}, Speed: 400, Dec: 1},
    ],
    Modules:[
        {T:'shieldProd',Disabled:0,Prod:0,E:0,Emin:0.1,Emax:1,ifProd:30, ShieldStorage:'absorbtion' },
        {T:'spotRegion',Disabled:1,Prod:0,E:0,Emin:4,Emax:4, ifProd:4 },
        {T:'moduleProd',Disabled:0,Prod:0,E:0,Emin:2,Emax:4, ifProd:60, subT:'TeleJump', ModStorage:'TeleJump'},
        {T:'Prod',      Disabled:0,Prod:0,E:0,Emin:2,Emax:4, ifProd:10,subT:'Bullet',Storage:'Ammo'},
        {T:'esteemProd',Disabled:1,Prod:0,E:0,Emin:1,Emax:1, ifProd:9000 },
        {T:'healerProd',Disabled:0,Prod:0,E:0,Emin:4,Emax:16,ifProd:1440 },
        {T:'Prod',      Disabled:0,Prod:0,E:0,Emin:1,Emax:10,ifProd:60,subT:'Bomb',Storage:'Bomb'},
        {T:'Prod',      Disabled:0,Prod:0,E:0,Emin:1,Emax:6, ifProd:6,subT:'Missile',Storage:'Missile'},
        {T:'moduleProd',Disabled:1,Prod:0,E:0,Emin:2,Emax:4, ifProd:160, subT:'Laser', ModStorage:'Laser'},
        {T:'Prod',      Disabled:0,Prod:0,E:0,Emin:2,Emax:4, ifProd:60,subT:'Bullet',Storage:'Ammo'},
        {T:'Prod',      Disabled:0,Prod:0,E:0,Emin:6,Emax:12,ifProd:150,subT:'Bullet',Storage:'Ammo'},
        {T:'radar',     Disabled:1,Prod:0,E:0,Emin:1,Emax:30,ifProd:5400,Radius:2500},
    ],
    SpecialMoves:{
        1:{T:'changeAll', Dec: 16, angleBy: -7, timesBy:3, Dist: 10, Angle: 180},
        2:{T:'changeAll', Dec: 16, angleBy: 7 , timesBy:3, Dist: 10, Angle: 180},
        3:{T:'teleportTo', Dec: 10, Dist: 70, Angle: -90, AngleRand: 190},
        4:{T:'changePosition', Dec:12, timesBy: 5, Dist: 10, Angle: 180},
    },
};
BBAdata.SHIPpresetsOld['bombardier']={
    radius: 7,
    S: 2,
    T: 'ship',
    speedM: 0,
    lastSpeedT: 0,
    M: 'moving',
    view:{
        Letter: 'A',
        LetterSize: 16,
        Color: 'blue',
        Angle: 0,
        HitPattern: 'HullFire_20',
        shieldsRadius: 14,
        Shields:{
            absorbtionShield:{
              strokeStyle: 'rgba(154,255,255,0.8)',
              fillStyle: 'rgba(154,255,255,0.2)',
            },
        },
    },
    mapType: 'P',
    periodDMG: {},
    Flags: {},




    Weight: 25,
    life: 11,
    lifeM: 11,
    Shields:[{
        name: 'absorbtionShield',
        CatchDmgT: {normal:1, energy:1, explo:1},
        DmgReduction: 'absorbtion',
        ResPath: 'ShieldStorage',
        ReductionUses: 'infinite',
        Own: true,
    }],
    EnergyM: 32,
    engineMultiply: 1,
    speed: 8,
    speedAcl: 3,
    speedDcl: 10,
    speedT: 4,
    Storage:{
        Bomb: {R:42, M:42},
    },
    ModStorage:{
        TeleJump: {R:0,M:6},
        Laser: {R:0,M:4}
    },
    ShieldStorage:{
        absorbtion: {R:0, M:10},
    },
    ShowFireRange: false,
    ShowAmmoIndicator: true,
    GlueFireToEstimated: 100,
    GlueFireToLaser: 70,
    KeysModules:{69:[0,5],82:[11],84:[2],81:[4],70:[8]},
    Weapon1: 0,
    Weapon2: 8,
    MouseDown1: false,
    MouseDown2: false,
    Weapons:[
        {T:'bomb',    gunS:0,GunSpeed: 5,  Use:{Bomb:1}, Speed: 15, Dec: 10, explodePreset:'NailsConePalm'},
        {T:'bomb',    gunS:0,GunSpeed: 5,  Use:{Bomb:1}, Speed: 15, Dec: 10, explodePreset:'HugeNailsConePalm'},
        {T:'bomb',    gunS:0,GunSpeed: 5,  Use:{Bomb:1}, Speed: 8, Dec: 70, explodePreset:'HugeExplosionRose'},
        {T:'bomb',    gunS:0,GunSpeed: 5,  Use:{Bomb:1}, Speed: 0.1, Teleport:{ Dist: 55, Angle: 270, AngleRand: 180}, Dec: 60, onHitDieExpire:    {Do:'explode',DMG:{Dmg:11,T:'explo'}, Dist: 120}},
        {T:'bomb',    gunS:0,GunSpeed: 5,  Use:{Bomb:1}, Speed: 8, Dec: 10, explodePreset:'BubbleStorm'},
        {T:'bomb',    gunS:0,GunSpeed: 5,  Use:{Bomb:1}, Speed: 8, Dec: 10, explodePreset:'StrikeOfEvil'},
        {T:'bomb',    gunS:0,GunSpeed: 5,  Use:{Bomb:1}, Speed: 12, Dec: 10, explodePreset:'ExplosionWorm2'},
        {T:'bomb',    gunS:0,GunSpeed: 5,  Use:{Bomb:1}, Speed: 8, Dec: 50, explodePreset:'EyeOfEvil'},
        {T:'tele',    gunS:0,GunSpeed: 3,  ModUse:{TeleJump:1}, Speed: 400, Dec: 1},
    ],
    Modules:[
        {T:'shieldProd',Disabled:0,Emin:0.1,Emax:1,E:0,Prod:0,ifProd:30, ShieldStorage:'absorbtion' },
        {T:'moduleProd',Disabled:0,Emin:2,Emax:4,E:0,Prod:0,ifProd:60, subT:'TeleJump', ModStorage:'TeleJump'},
        {T:'healerProd',Disabled:0,Emin:4,Emax:16,E:0,Prod:0,ifProd:1440 },
        {T:'Prod',      Disabled:0,subT:'Bomb',Storage:'Bomb',Emin:1,Emax:10,E:0,Prod:0,ifProd:200 },
        {T:'Prod',      Disabled:0,subT:'Bomb',Storage:'Bomb',Emin:1,Emax:10,E:0,Prod:0,ifProd:200 },
        {T:'Prod',      Disabled:0,subT:'Bomb',Storage:'Bomb',Emin:1,Emax:10,E:0,Prod:0,ifProd:200 },
        {T:'radar',     Disabled:1,Emin:1,Emax:30,E:0,Prod:0,ifProd:5400,Radius:2500},
    ],
    SpecialMoves:{
        1:{T:'changeAll', Dec: 16, angleBy: -7, timesBy:3, Dist: 10, Angle: 180},
        2:{T:'changeAll', Dec: 16, angleBy: 7 , timesBy:3, Dist: 10, Angle: 180},
        3:{T:'teleportTo', Dec: 10, Dist: 70, Angle: -90, AngleRand: 190},
        4:{T:'changePosition', Dec:12, timesBy: 5, Dist: 10, Angle: 180},
    },
};
BBAdata.SHIPpresetsOld['bombardier2']={
    radius: 7,
    S: 2,
    T: 'ship',
    speedM: 0,
    lastSpeedT: 0,
    M: 'moving',
    view:{
        Letter: 'A',
        LetterSize: 16,
        Color: 'blue',
        Angle: 0,
        HitPattern: 'HullFire_20',
        shieldsRadius: 14,
        Shields:{
            absorbtionShield:{
              strokeStyle: 'rgba(154,255,255,0.8)',
              fillStyle: 'rgba(154,255,255,0.2)',
            },
        },
    },
    mapType: 'P',
    periodDMG: {},
    Flags: {},

    Weight: 25,
    life: 11,
    lifeM: 11,
    Shields:[{
        name: 'absorbtionShield',
        CatchDmgT: {normal:1, energy:1, explo:1},
        DmgReduction: 'absorbtion',
        ResPath: 'ShieldStorage',
        ReductionUses: 'infinite',
        Own: true,
    },{
        name: 'jumpShield',
        CatchDmgT: {normal:1, energy:1, explo:1},
        DmgReduction: 'infinite',
        ReductionUses: 'infinite',
        ResPath: 'ModStorage',
        jumpOnHit: 200,
        Own: true,
        HitDieAnimation: 'dontShow',
    }],
    EnergyM: 32,
    engineMultiply: 1,
    speed: 8,
    speedAcl: 3,
    speedDcl: 10,
    speedT: 4,
    Storage:{
        Bomb: {R:42, M:42},
    },
    ModStorage:{
        TeleJump: {R:0,M:6},
        Laser: {R:0,M:4}
    },
    ShieldStorage:{
        absorbtion: {R:0, M:10},
    },
    ShowFireRange: false,
    ShowAmmoIndicator: true,
    GlueFireToEstimated: 100,
    GlueFireToLaser: 70,
    KeysModules:{69:[0,5],82:[11],84:[2],81:[4],70:[8]},
    Weapon1: 5,
    Weapon2: 7,
    MouseDown1: false,
    MouseDown2: false,
    Weapons:[
        {T:'bomb',    gunS:0,GunSpeed: 5,  Use:{Bomb:1}, Speed: 15, Dec: 10, explodePreset:'NailsConeMicro'},
        {T:'bomb',    gunS:0,GunSpeed: 5,  Use:{Bomb:1}, Speed: 15, Dec: 10, explodePreset:'NailsConeMedium'},
        {T:'bomb',    gunS:0,GunSpeed: 5,  Use:{Bomb:1}, Speed: 15, Dec: 10, explodePreset:'HugeNailsConePalm'},
        {T:'bomb',    gunS:0,GunSpeed: 5,  Use:{Bomb:1}, Speed: 15, Dec: 40, explodePreset:'NailsWirlpool'},
        {T:'bomb',    gunS:0,GunSpeed: 5,  Use:{Bomb:1}, Speed: 15, Dec: 40, explodePreset:'NailsWirlpool2'},
        {T:'bomb',    gunS:0,GunSpeed: 5,  Use:{Bomb:1}, Speed: 15, Dec: 40, explodePreset:'HugeNailsWirlpool2'},
        {T:'bomb',    gunS:0,GunSpeed: 5,  Use:{Bomb:1}, Speed: 15, Dec: 40, explodePreset:'NailsBigLongCircle'},
        {T:'tele',    gunS:0,GunSpeed: 3,  ModUse:{TeleJump:1}, Speed: 400, Dec: 1},
    ],
    Modules:[
        {T:'shieldProd',Disabled:0,Emin:0.1,Emax:1,E:0,Prod:0,ifProd:30, ShieldStorage:'absorbtion' },
        {T:'moduleProd',Disabled:0,Emin:2,Emax:4,E:0,Prod:0,ifProd:60, subT:'TeleJump', ModStorage:'TeleJump'},
        {T:'healerProd',Disabled:0,Emin:4,Emax:16,E:0,Prod:0,ifProd:1440 },
        {T:'Prod',      Disabled:0,subT:'Bomb',Storage:'Bomb',Emin:1,Emax:10,E:0,Prod:0,ifProd:150 },
        {T:'Prod',      Disabled:0,subT:'Bomb',Storage:'Bomb',Emin:1,Emax:10,E:0,Prod:0,ifProd:150 },
        {T:'Prod',      Disabled:0,subT:'Bomb',Storage:'Bomb',Emin:1,Emax:10,E:0,Prod:0,ifProd:50 },
        {T:'radar',     Disabled:1,Emin:1,Emax:30,E:0,Prod:0,ifProd:5400,Radius:4500},
    ],
    SpecialMoves:{
        1:{T:'changeAll', Dec: 16, angleBy: -7, timesBy:3, Dist: 10, Angle: 180},
        2:{T:'changeAll', Dec: 16, angleBy: 7 , timesBy:3, Dist: 10, Angle: 180},
        3:{T:'teleportTo', Dec: 10, Dist: 70, Angle: -90, AngleRand: 190},
        4:{T:'changePosition', Dec:12, timesBy: 5, Dist: 10, Angle: 180},
    },
};
BBAdata.SHIPpresetsOld['kagelis']={
    radius: 7,
    S: 2,
    T: 'ship',
    speedM: 0,
    lastSpeedT: 0,
    M: 'moving',
    view:{
        Letter: 'A',
        LetterSize: 16,
        Color: 'blue',
        Angle: 0,
        HitPattern: 'HullFire_20',
        shieldsRadius: 14,
        Shields:{
            absorbtionShield:{
              strokeStyle: 'rgba(154,255,255,0.8)',
              fillStyle: 'rgba(154,255,255,0.2)',
            },
        },
    },
    mapType: 'P',
    periodDMG: {},
    Flags: {},




    Weight: 25,
    life: 11,
    lifeM: 11,
    Shields:[{
        name: 'absorbtionShield',
        CatchDmgT: {normal:1, energy:1, explo:1},
        DmgReduction: 'absorbtion',
        ResPath: 'ShieldStorage',
        ReductionUses: 'infinite',
        Own: true,
    }],
    EnergyFieldMax: 10,
    EnergyM: 32,
    engineMultiply: 1,
    speed: 8,
    speedAcl: 3,
    speedDcl: 10,
    speedT: 4,
    Storage:{
        Ammo: {R:0, M:50},
        Missile: {R:10,M:10},
        Bomb: {R:12, M:12},
    },
    ModStorage:{
        TeleJump: {R:0,M:6},
        Laser: {R:0,M:4}
    },
    ShieldStorage:{
        absorbtion: {R:0, M:10},
    },
    ShowFireRange: false,
    ShowAmmoIndicator: true,
    GlueFireToEstimated: 100,
    GlueFireToLaser: 70,
    KeysModules:{66:[6],69:[0,5],73:[3,9,10],77:[7],84:[2],81:[4],70:[8],82:[11]},
    Weapon1: 1,
    Weapon2: 6,
    MouseDown1: false,
    MouseDown2: false,
    Weapons:[
        {T:'triple',   gunS:0,GunSpeed: 1,  Use:{Ammo:2}, Speed: 15, Dec: 30, DMG:{Dmg:1,T:'normal'},},
        {T:'missileR', gunS:0,GunSpeed: 6,  Use:{Missile:5}, Speed: 12, AtOnce: 8, SpeedT: 6, Dec: 95, AimRadius: 60, explodePreset:'DirectLaser'},
        {T:'bomb',     gunS:0,GunSpeed: 5,  Use:{Bomb:1}, Speed: 12, Dec: 80, explodePreset:'LaserBomb'},
        {T:'bomb',     gunS:0,GunSpeed: 5,  Use:{Bomb:1}, Speed: 12, Dec: 80, explodePreset:'LaserABoom'},
        {T:'missileR', gunS:0,GunSpeed: 6,  Use:{Missile:5}, Speed: 12, AtOnce: 8, SpeedT: 6, Dec: 95, AimRadius: 60, explodePreset:'LaserRay'},
        {T:'bomb',     gunS:0,GunSpeed: 5,  Use:{Bomb:1}, Speed: 0, Dec: 1, explodePreset:'GoombaLaser'},
        {T:'tele',    gunS:0,GunSpeed: 3, ModUse:{TeleJump:1}, Speed: 550, Dec: 1},
    ],
    Modules:[
        {T:'shieldProd',Disabled:0,Prod:0,E:0,Emin:0.1,Emax:1,ifProd:30, ShieldStorage:'absorbtion' },
        {T:'spotRegion',Disabled:1,Prod:0,E:0,Emin:4,Emax:4, ifProd:4 },
        {T:'moduleProd',Disabled:0,Emin:2,Emax:4,E:0,Prod:0,ifProd:60, subT:'TeleJump',ModStorage:'TeleJump'},
        {T:'Prod',      Disabled:0,Prod:0,E:0,Emin:2,Emax:4, ifProd:10,subT:'Bullet',Storage:'Ammo'},
        {T:'esteemProd',Disabled:1,Prod:0,E:0,Emin:1,Emax:1, ifProd:9000 },
        {T:'healerProd',Disabled:0,Prod:0,E:0,Emin:4,Emax:16,ifProd:1440 },
        {T:'Prod',      Disabled:0,Prod:0,E:0,Emin:1,Emax:10,ifProd:60,subT:'Bomb',Storage:'Bomb'},
        {T:'Prod',      Disabled:0,Prod:0,E:0,Emin:1,Emax:6, ifProd:6,subT:'Missile',Storage:'Missile'},
        {T:'Prod',      Disabled:0,Prod:0,E:0,Emin:2,Emax:4, ifProd:60,subT:'Bullet',Storage:'Ammo'},
        {T:'Prod',      Disabled:0,Prod:0,E:0,Emin:6,Emax:12,ifProd:150,subT:'Bullet',Storage:'Ammo'},
        {T:'radar',     Disabled:1,Prod:0,E:0,Emin:1,Emax:30,ifProd:5400,Radius:2500},
    ],
    SpecialMoves:{
        1:{T:'changeAll', Dec: 16, angleBy: -7, timesBy:3, Dist: 10, Angle: 180},
        2:{T:'changeAll', Dec: 16, angleBy: 7 , timesBy:3, Dist: 10, Angle: 180},
        3:{T:'teleportTo', Dec: 10, Dist: 70, Angle: -90, AngleRand: 190},
        4:{T:'changePosition', Dec:12, timesBy: 5, Dist: 10, Angle: 180},
    },
};
BBAdata.SHIPpresetsOld['ethernal']={
    radius: 7,
    S: 2,
    T: 'ship',
    speedM: 0,
    lastSpeedT: 0,
    M: 'moving',
    view:{
        Letter: 'A',
        LetterSize: 16,
        Color: 'blue',
        Angle: 0,
        HitPattern: 'HullFire_20',
        shieldsRadius: 14,
        Shields:{
            absorbtionShield:{
              strokeStyle: 'rgba(154,255,255,0.8)',
              fillStyle: 'rgba(154,255,255,0.2)',
            },
        },
    },
    mapType: 'P',
    periodDMG: {},
    Flags: {},




    Weight: 25,
    life: 'x',
    lifeM: 'x',
    engineMultiply: 1,
    speed: 8,
    speedAcl: 3,
    speedDcl: 10,
    speedT: 8,
    Storage:{
        Ammo: {R:0, M:50},
        Bomb: {R:12, M:12},
        Missile: {R:12, M:12},
    },
    ShowFireRange: false,
    ShowAmmoIndicator: true,
    GlueFireToEstimated: 100,
    GlueFireToLaser: 70,
    KeysModules:{69:[0,1],82:[11],84:[2],81:[4],70:[5]},
    Weapon1: 0,
    Weapon2: 3,
    MouseDown1: false,
    MouseDown2: false,
    Weapons:[
        {T:'triple',  gunS:0,GunSpeed: 5, Speed: 17, Dec: 30, Use:{'Ammo':1}, DMG:{Dmg:1,T:'normal'},},
        {T:'triple',  gunS:0,GunSpeed: 1, Speed: 15, Dec: 30, Use:{'Ammo':2}, DMG:{Dmg:1,T:'normal'},},
        {T:'rose',    gunS:0,GunSpeed: 4, AtOnce: 36, Use:{'Ammo':5}, RoseAngle: 10, Speed: 15, Dec: 30, DMG:{Dmg:1,T:'normal'},},
        {T:'bomb',    gunS:0,GunSpeed: 5, Use:{'Bomb':1}, Speed: 10, Dec: 30, explodePreset:'ExplosionSize2'},
        {T:'bomb',    gunS:0,GunSpeed: 5, Use:{'Bomb':1,Ammo:5}, Speed: 10, Dec:30, explodePreset:'NailsBigCircle'},
        {T:'missileR', gunS:0,GunSpeed: 6, Use:{'Missile':1}, Speed: 12, AtOnce: 8, SpeedT: 6, Dec: 95, AimRadius: 60, explodePreset:'ExplosionSize2'},
        {T:'missileR', gunS:0,GunSpeed: 6, Use:{'Missile':1}, Speed: 12, AtOnce: 8, SpeedT: 6, Dec: 95, AimRadius: 60, explodePreset:'NailedBomb2'},
        {T:'missile',  gunS:0,GunSpeed: 3, Use:{Missile:1}, Speed: 12, SpeedT: 4, Dec: 400, AimRadius: 60, explodePreset:'NailsCircleToCenter2'},
    ],
    Modules:[
        {T:'Prod', subT:'Bullet',Storage:'Ammo', Disabled:0,Emin:2,Emax:4,E:0,Prod:0,ifProd:12 },
        {T:'Prod', subT:'Bomb',  Storage:'Bomb', Disabled:0,Emin:1,Emax:10,E:0,Prod:0,ifProd:100 },
        {T:'Prod',      subT:'Missile',Storage:'Missile',Disabled:0,Emin:1,Emax:6,E:0,Prod:0,ifProd:6 },
        {T:'Prod', subT:'Bullet',Storage:'Ammo', Disabled:0,Emin:2,Emax:4,E:0,Prod:0,ifProd:12 },
    ],
    SpecialMoves:{
        1:{T:'changePosition', Dec:12, timesBy:3, Dist: 10, Angle: -50},
        2:{T:'changePosition', Dec:12, timesBy:3, Dist: 10, Angle: 50},
        3:{T:'teleportTo', Dec: 1, Dist: 600, Angle: -10, AngleRand: 20},
        4:{T:'changeAngle', Dec:9, angleBy: 20},
    },
};




BBAdata['SHIPpresets']={
    'start2':{
        "simplePlate":{
            "I":{"_main":1,"lighter":1,},
            "IV":{"_main":1,"lighter":1,},
            "III":{"_main":1,"lighter":1,},
            "II":{"_main":1,"lighter":1,},
        },
        "lightPlate":{
            "I":{"_main":1,},
            "VI":{"_main":1,},
            "V":{"_main":1,},
            "IV":{"_main":1,},
            "III":{"_main":1,},
            "II":{"_main":1,},
        },
        "heavyPlate":{
            "I":{"_main":1,"tough":1,},
            "IV":{"_main":1,"tough":1,},
            "III":{"_main":1,"tough":1,},
            "II":{"_main":1,"tough":1,},
        },
        "simpleEnergyCell":{
            "IV":{"_main":1,"up2":1,"up":1,},
            "III":{"_main":1,"up2":1,"up":1,},
            "II":{"_main":1,"up2":1,"up":1,},
            "I":{"_main":1,"up2":1,"up":1,},
        },
        "energyCrystal":{
            "II":{"_main":1,"weight2":1,"weight1":1,"energy2":1,"energy1":1,},
            "I":{"_main":1,"weight2":1,"weight1":1,"energy2":1,"energy1":1,},
        },
        "heavyEnergyCell":{
            "VI":{"_main":1,"weight":1,},
            "V":{"_main":1,"weight":1,},
            "IV":{"_main":1,"weight":1,},
            "III":{"_main":1,"weight":1,},
            "II":{"_main":1,"weight":1,},
            "I":{"_main":1,"weight":1,},
        },
        "energyGeneratus":{
            "I":{"_main":1,"up5":1,"up4":1,"up2":1,"up3":1,"up1":1,},
        },
        "engineCoreIV":{
            "I":{"_main":1,"up9":1,"up8":1,"up7":1,"up6":1,"up5":1,"up4":1,"up2":1,"up3":1,"up1":1,},
        },
        "basicGun":{
            "I":{"_main":1,"up18":1,"up17":1,"up8":1,"up7":1,"up6":1,"up5":1,"up4":1,"up3":1,"up2":1,"up1":1,"up16":1,"up15":1,"up14":1,"up13":1,"up12":1,"up11":1,"up10":1,"up9":1,},
        },
        "ammoStorage":{
            "I":{"_main":1,"lighter":1,"fullOnStart":1,},
            "IV":{"_main":1,"lighter":1,},
            "III":{"_main":1,"lighter":1,},
            "II":{"_main":1,"lighter":1,},
        },
    },
};
