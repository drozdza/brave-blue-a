BBAdata['SHIPpresets']={
    'start':{
        Weight: 25,
        lifeM: 6,
        life: 6,
        EnergyM: 20,
        SpeedM: 20,
        speed: 8,
        Storage:{
            Ammo: {R:0, M:20},
        },
        ShowFireRange: false,
        ShowAmmoIndicator: true,
        GlueFireToEstimated: 100,
        GlueFireToLaser: 70,
        KeysModules:{69:[0]},
        FireType: 0,
        FireType2: 1,
        res:{},
        MouseDown1: false,
        MouseDown2: false,
        FireTypes:[
            {T:'single',  gunS:0,GunSpeed: 5, Speed: 17, Dec: 30, Use:{'Ammo':1}, Power: 1},
            {T:'rose',    gunS:0,GunSpeed: 4, AtOnce: 9, Use:{'Ammo':5}, RoseAngle: 3, Speed: 15, Dec: 30, Power: 1},
        ],
        Modules:[
            {T:'Prod',subT:'Bullet',Storage:'Ammo',Disabled:0,Emin:2,Emax:4,ProdX:4,E:0,Prod:0,ifProd:40 },
        ],
    },
    'destFields':{
        Weight: 25,
        life: 11,
        lifeM: 11,
        EnergyFieldMax: 10,
        EnergyM: 32,
        SpeedM: 20,
        speed: 8,
        Storage:{
            Missile: {R:10,M:10},
        },
        ModStorage:{
            TeleJump: {R:0,M:6},
        },
        ShowFireRange: false,
        ShowAmmoIndicator: true,
        GlueFireToEstimated: 100,
        GlueFireToLaser: 70,
        ShowRadar: true,
        KeysModules:{69:[0,5],82:[11],84:[2],81:[4],70:[8]},
        FireType: 0,
        FireType2: 1,
        res:{},
        MouseDown1: false,
        MouseDown2: false,
        FireTypes:[
            {T:'missleR', gunS:0,GunSpeed: 6, Use:{'Missile':5}, Speed: 12, AtOnce: 8, SpeedT: 6, Dec: 95, AimRadius: 60, explosivePreset:'MissileDestructionFieldSmall'},
            {T:'tele',    gunS:0,GunSpeed: 3, ModUse:{TeleJump:1}, Speed: 400, Dec: 1},
        ],
        Modules:[
            {T:'shieldProd',Disabled:0,Emin:0.1,Emax:1,ProdX:1,E:0,Prod:0,ifProd:30 },
            {T:'spotRegion',Disabled:1,Emin:4,Emax:4,ProdX:1,E:0,Prod:0,ifProd:1 },
            {T:'moduleProd',Disabled:0,Emin:2,Emax:4,ProdX:4,E:0,Prod:0,ifProd:60, subT:'TeleJump',ModStorage:'TeleJump'},
            {T:'healerProd',Disabled:0,Emin:4,Emax:16,ProdX:1,E:0,Prod:0,ifProd:90 },
            {T:'Prod',      subT:'Missile',Storage:'Missile',Disabled:0,Emin:1,Emax:6,ProdX:4,E:0,Prod:0,ifProd:4 },
            {T:'radar',     Disabled:1,Emin:1,Emax:30,ProdX:20,E:0,Prod:0,ifProd:360,Radius:2500},
        ],
    },
    'bombs1':{
        Weight: 25,
        life: 11,
        lifeM: 11,
        EnergyFieldMax: 10,
        EnergyM: 32,
        SpeedM: 20,
        speed: 8,
        Storage:{
            Bomb: {R:12, M:12},
        },
        ModStorage:{
            TeleJump: {R:0,M:6},
        },
        ShowFireRange: true,
        ShowAmmoIndicator: true,
        GlueFireToEstimated: 100,
        GlueFireToLaser: 70,
        ShowRadar: true,
        KeysModules:{69:[0,5],82:[11],84:[2],81:[4],70:[8]},
        FireType: 3,
        FireType2: 4,
        res:{},
        MouseDown1: false,
        MouseDown2: false,
        FireTypes:[
            {T:'bombD',   gunS:0,GunSpeed: 5, Use:{'Bomb':1}, Speed: 10, Dec: 50, explosivePreset:'NailsBigCircle'},
            {T:'bombD',   gunS:0,GunSpeed: 5, Use:{'Bomb':1}, Speed: 10, Dec: 60, explosivePreset:'NailsWirlpool'},
            {T:'bombD',   gunS:0,GunSpeed: 5, Use:{'Bomb':1}, Speed: 10, Dec: 50, explosivePreset:'ExplosionSize1',minDec:6},
            {T:'bombD',   gunS:0,GunSpeed: 5, Use:{'Bomb':1}, Speed: 10, Dec: 40, explosivePreset:'ExplosionSize3',minDec:13},
            {T:'tele',    gunS:0,GunSpeed: 3, ModUse:{TeleJump:1}, Speed: 400, Dec: 1},
        ],
        Modules:[
            {T:'shieldProd',Disabled:0,Emin:0.1,Emax:1,ProdX:1,E:0,Prod:0,ifProd:30 },
            {T:'spotRegion',Disabled:1,Emin:4,Emax:4,ProdX:1,E:0,Prod:0,ifProd:1 },
            {T:'moduleProd',Disabled:0,Emin:2,Emax:4,ProdX:4,E:0,Prod:0,ifProd:60, subT:'TeleJump',ModStorage:'TeleJump'},
            {T:'healerProd',Disabled:0,Emin:4,Emax:16,ProdX:1,E:0,Prod:0,ifProd:90 },
            {T:'Prod',      subT:'Bomb',Storage:'Bomb',Disabled:0,Emin:1,Emax:6,ProdX:4,E:0,Prod:0,ifProd:4 },
            {T:'radar',     Disabled:1,Emin:1,Emax:30,ProdX:20,E:0,Prod:0,ifProd:360,Radius:2500},
        ],
    },
    'bombs2':{
        Weight: 25,
        life: 11,
        lifeM: 11,
        EnergyFieldMax: 10,
        EnergyM: 32,
        SpeedM: 20,
        speed: 8,
        Storage:{
            Bomb: {R:12, M:12},
        },
        ModStorage:{
            TeleJump: {R:0,M:6},
        },
        ShowFireRange: true,
        ShowAmmoIndicator: true,
        GlueFireToEstimated: 100,
        GlueFireToLaser: 70,
        ShowRadar: true,
        KeysModules:{69:[0,5],82:[11],84:[2],81:[4],70:[8]},
        FireType: 3,
        FireType2: 4,
        res:{},
        MouseDown1: false,
        MouseDown2: false,
        FireTypes:[
            {T:'bombT',   gunS:0,GunSpeed: 5, Use:{'Bomb':1}, Distance: 400, offTime: 60, explosivePreset:'NailsBigCircle'},
            {T:'bombT',   gunS:0,GunSpeed: 5, Use:{'Bomb':1}, Distance: 400, offTime: 120, explosivePreset:'NailsWirlpool', dontCollide:true},
            {T:'bombT',   gunS:0,GunSpeed: 5, Use:{'Bomb':1}, Distance: 500, offTime: 60, explosivePreset:'ExplosionSize1'},
            {T:'bombT',   gunS:0,GunSpeed: 5, Use:{'Bomb':1}, Distance: 500, offTime: 0, explosivePreset:'ExplosionSize3'},
            {T:'tele',    gunS:0,GunSpeed: 3, ModUse:{TeleJump:1}, Speed: 400, Dec: 1},
        ],
        Modules:[
            {T:'shieldProd',Disabled:0,Emin:0.1,Emax:1,ProdX:1,E:0,Prod:0,ifProd:30 },
            {T:'spotRegion',Disabled:1,Emin:4,Emax:4,ProdX:1,E:0,Prod:0,ifProd:1 },
            {T:'moduleProd',  Disabled:0,Emin:2,Emax:4,ProdX:4,E:0,Prod:0,ifProd:60, subT:'TeleJump', ModStorage:'TeleJump'},
            {T:'healerProd',Disabled:0,Emin:4,Emax:16,ProdX:1,E:0,Prod:0,ifProd:90 },
            {T:'Prod',      subT:'Bomb',Storage:'Bomb',Disabled:0,Emin:1,Emax:6,ProdX:4,E:0,Prod:0,ifProd:4 },
            {T:'radar',     Disabled:1,Emin:1,Emax:30,ProdX:20,E:0,Prod:0,ifProd:360,Radius:2500},
        ],
    },
    'moves1':{
        Weight: 25,
        life: 11,
        lifeM: 11,
        EnergyM: 27,
        SpeedM: 20,
        speed: 8,
        Storage:{
            Ammo: {R:0, M:50},
            Bomb: {R:12, M:12},
        },
        ModStorage:{
            Moves: {R:0, M:8},
        },
        ShowFireRange: false,
        ShowAmmoIndicator: true,
        GlueFireToEstimated: 100,
        GlueFireToLaser: 70,
        KeysModules:{69:[0,1],82:[11],84:[2],81:[4],70:[5]},
        FireType: 0,
        FireType2: 3,
        res:{},
        MouseDown1: false,
        MouseDown2: false,
        FireTypes:[
            {T:'single',  gunS:0,GunSpeed: 5, Speed: 17, Dec: 30, Use:{'Ammo':1}, Power: 1},
            {T:'double',  gunS:0,GunSpeed: 1, Speed: 15, Dec: 30, Use:{'Ammo':2}, Power: 1},
            {T:'rose',    gunS:0,GunSpeed: 4, AtOnce: 9, Use:{'Ammo':5}, RoseAngle: 3, Speed: 15, Dec: 30, Power: 1},
            {T:'bomb',    gunS:0,GunSpeed: 5, Use:{'Bomb':1}, Speed: 10, Dec: 30, explosivePreset:'ExplosionSize2'},
        ],
        Modules:[
            {T:'Prod', subT:'Bullet',Storage:'Ammo', Disabled:0,Emin:2,Emax:4,ProdX:1,E:0,Prod:0,ifProd:3 },
            {T:'Prod', subT:'Bomb',  Storage:'Bomb', Disabled:0,Emin:1,Emax:10,ProdX:1,E:0,Prod:0,ifProd:10 },
            {T:'moduleProd',Disabled:0,Emin:2,Emax:4,ProdX:6,E:0,Prod:0,ifProd:240, subT:'Moves', ModStorage:'Moves'},
            {T:'healerProd',Disabled:0,Emin:1,Emax:16,ProdX:1,E:0,Prod:0,ifProd:9 },
        ],
        SpecialMoves:{
            1:{T:'changeAngle',    ModUse:{'Moves':1}, Dec:6, changeBy: -15},
            2:{T:'changePosition', ModUse:{'Moves':3}, Dec:6, timesBy:1, Dist: 25, Angle: 90},
            3:{T:'changeSpeed',    ModUse:{'Moves':1}, Dec:5, changeBy: 1},
            4:{T:'changePosition', ModUse:{'Moves':6}, Dec:4, timesBy: 10, Dist: 10, Angle: 180},
        },
    },
    'best':{
        Weight: 25,
        life: 11,
        lifeM: 11,
        EnergyFieldMax: 10,
        EnergyM: 32,
        SpeedM: 20,
        speed: 8,
        Storage:{
            Ammo: {R:0, M:50},
            Missile: {R:10,M:10},
            Bomb: {R:12, M:12},
        },
        ModStorage:{
            TeleJump: {R:0,M:6},
            Laser: {R:0,M:4}
        },
        ShowFireRange: false,
        ShowAmmoIndicator: true,
        GlueFireToEstimated: 100,
        GlueFireToLaser: 70,
        ShowRadar: true,
        KeysModules:{69:[0,5],82:[11],84:[2],81:[4],70:[8]},
        FireType: 0,
        FireType2: 8,
        res:{},
        MouseDown1: false,
        MouseDown2: false,
        FireTypes:[
            {T:'single',  gunS:0,GunSpeed: 5,  Use:{Ammo:1}, Speed: 17, Dec: 30, Power: 1},
            {T:'double',  gunS:0,GunSpeed: 1,  Use:{Ammo:2}, Speed: 15, Dec: 30, Power: 1},
            {T:'rose',    gunS:0,GunSpeed: 4,  Use:{Ammo:5}, AtOnce: 9, RoseAngle: 3, Speed: 15, Dec: 30, Power: 1},
            {T:'laser',   gunS:0,GunSpeed: 10, ModUse:{Laser:1}, Speed: 650, Dec: 1, Power: 5},
            {T:'rose',    gunS:0,GunSpeed: 7,  Use:{Ammo:10}, AtOnce: 37, RoseAngle: 5, Speed: 17, Dec: 12, Power: 1},
            {T:'missle',  gunS:0,GunSpeed: 2,  Use:{Missile:1}, Speed: 12, SpeedT: 4, Dec: 400, AimRadius: 120, Power: 2},
            {T:'missleR', gunS:0,GunSpeed: 6,  Use:{Missile:5}, Speed: 12, AtOnce: 8, SpeedT: 6, Dec: 95, AimRadius: 60, Power:1},
            {T:'bomb',    gunS:0,GunSpeed: 5,  Use:{Bomb:1}, Speed: 10, Dec: 30, explosivePreset:'NailsBigCircle'},
            {T:'tele',    gunS:0,GunSpeed: 3,  ModUse:{TeleJump:1}, Speed: 400, Dec: 1},
        ],
        Modules:[
            {T:'shieldProd',Disabled:0,Emin:0.1,Emax:1,ProdX:1,E:0,Prod:0,ifProd:30 },
            {T:'spotRegion',Disabled:1,Emin:4,Emax:4,ProdX:1,E:0,Prod:0,ifProd:1 },
            {T:'moduleProd',Disabled:0,Emin:2,Emax:4,ProdX:4,E:0,Prod:0,ifProd:60, subT:'TeleJump', ModStorage:'TeleJump'},
            {T:'Prod',      Disabled:0,subT:'Bullet',Storage:'Ammo',Emin:2,Emax:4,ProdX:4,E:0,Prod:0,ifProd:40 },
            {T:'esteemProd',Disabled:1,Emin:1,Emax:1,ProdX:1,E:0,Prod:0,ifProd:9000 },
            {T:'healerProd',Disabled:0,Emin:4,Emax:16,ProdX:1,E:0,Prod:0,ifProd:90 },
            {T:'Prod',      Disabled:0,subT:'Bomb',Storage:'Bomb',Emin:1,Emax:10,ProdX:1,E:0,Prod:0,ifProd:60 },
            {T:'Prod',      Disabled:0,subT:'Missile',Storage:'Missile',Emin:1,Emax:6,ProdX:4,E:0,Prod:0,ifProd:4 },
            {T:'moduleProd',Disabled:1,Emin:2,Emax:4,ProdX:6,E:0,Prod:0,ifProd:240, subT:'Laser', ModStorage:'Laser'},
            {T:'Prod',      Disabled:0,subT:'Bullet',Storage:'Ammo',Emin:2,Emax:4,ProdX:4,E:0,Prod:0,ifProd:60 },
            {T:'Prod',      Disabled:0,subT:'Bullet',Storage:'Ammo',Emin:6,Emax:12,ProdX:4,E:0,Prod:0,ifProd:5 },
            {T:'radar',     Disabled:1,Emin:1,Emax:30,ProdX:20,E:0,Prod:0,ifProd:360,Radius:2500},
        ],
    },
    'ethernal':{
        Weight: 25,
        life: 'x',
        lifeM: 'x',
        SpeedM: 20,
        speed: 8,
        Storage:{
            Ammo: {R:0, M:50},
            Bomb: {R:12, M:12},
        },
        ShowFireRange: false,
        ShowAmmoIndicator: true,
        GlueFireToEstimated: 100,
        GlueFireToLaser: 70,
        KeysModules:{69:[0,1],82:[11],84:[2],81:[4],70:[5]},
        FireType: 0,
        FireType2: 3,
        res:{},
        MouseDown1: false,
        MouseDown2: false,
        FireTypes:[
            {T:'single',  gunS:0,GunSpeed: 5, Speed: 17, Dec: 30, Use:{'Ammo':1}, Power: 1},
            {T:'double',  gunS:0,GunSpeed: 1, Speed: 15, Dec: 30, Use:{'Ammo':2}, Power: 1},
            {T:'rose',    gunS:0,GunSpeed: 4, AtOnce: 9, Use:{'Ammo':5}, RoseAngle: 3, Speed: 15, Dec: 30, Power: 1},
            {T:'bomb',    gunS:0,GunSpeed: 5, Use:{'Bomb':1}, Speed: 10, Dec: 30, explosivePreset:'ExplosionSize2'},
            {T:'bomb',    gunS:0,GunSpeed: 5, Use:{'Bomb':1,Ammo:5}, Speed: 10, Dec:30, explosivePreset:'NailsBigCircle'},
        ],
        Modules:[
            {T:'Prod', subT:'Bullet',Storage:'Ammo', Disabled:0,Emin:2,Emax:4,ProdX:1,E:0,Prod:0,ifProd:3 },
            {T:'Prod', subT:'Bomb',  Storage:'Bomb', Disabled:0,Emin:1,Emax:10,ProdX:1,E:0,Prod:0,ifProd:10 },
        ],
    },
};
