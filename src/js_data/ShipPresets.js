BBAdata['SHIPpresets']={
    1:{
        Weight: 25,
        lifeM: 6,
        life: 6,
        EnergyM: 20,
        SpeedM: 20,
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
    99:{
        Weight: 25,
        life: 'x',
        lifeM: 'x',
        SpeedM: 20,
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
            {T:'bomb',    gunS:0,GunSpeed: 5, Use:{'Bomb':1}, Speed: 10, Dec: 30, Power: 4, Dist: 80},
        ],
        Modules:[
            {T:'Prod', subT:'Bullet',Storage:'Ammo', Disabled:0,Emin:2,Emax:4,ProdX:1,E:0,Prod:0,ifProd:3 },
            {T:'Prod', subT:'Bomb',  Storage:'Bomb', Disabled:0,Emin:1,Emax:10,ProdX:1,E:0,Prod:0,ifProd:10 },
        ],
    },
    17:{
        Weight: 25,
        life: 11,
        lifeM: 11,
        EnergyFieldMax: 10,
        EnergyM: 32,
        SpeedM: 20,
        Storage:{
            Ammo: {R:0, M:50},
            Missile: {R:10,M:10},
            Bomb: {R:12, M:12},
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
            {T:'single',  gunS:0,GunSpeed: 5, Speed: 17, Dec: 30, Use:{'Ammo':1}, Power: 1},
            {T:'double',  gunS:0,GunSpeed: 1, Speed: 15, Dec: 30, Use:{'Ammo':2}, Power: 1},
            {T:'rose',    gunS:0,GunSpeed: 4, AtOnce: 9, Use:{'Ammo':5}, RoseAngle: 3, Speed: 15, Dec: 30, Power: 1},
            {T:'laser',   gunS:0,GunSpeed: 10, Speed: 650, Dec: 1, Power: 5},
            {T:'rose',    gunS:0,GunSpeed: 7, AtOnce: 37, Use:{'Ammo':10}, RoseAngle: 5, Speed: 17, Dec: 12, Power: 1},
            {T:'missle',  gunS:0,GunSpeed: 2, Use:{'Missile':1}, Speed: 12, SpeedT: 4, Dec: 400, AimRadius: 120, Power: 2},
            {T:'missleR', gunS:0,GunSpeed: 6, Use:{'Missile':5}, Speed: 12, AtOnce: 8, SpeedT: 6, Dec: 95, AimRadius: 60, Power: 2},
            {T:'bomb',    gunS:0,GunSpeed: 5, Use:{'Bomb':1}, Speed: 10, Dec: 30, Power: 4, Dist: 80},
            {T:'tele',    gunS:0,GunSpeed: 3, Speed: 400, Dec: 1},
        ],
        Modules:[
            {T:'shieldProd',Disabled:0,Emin:0.1,Emax:1,ProdX:1,E:0,Prod:0,ifProd:30 },
            {T:'spotRegion',Disabled:1,Emin:4,Emax:4,ProdX:1,E:0,Prod:0,ifProd:1 },
            {T:'teleProd',  Disabled:0,Emin:2,Emax:4,ProdX:4,E:0,Prod:0,ifProd:60, TeleLoad: 0, TeleLoadM: 6 },
            {T:'Prod',      subT:'Bullet',Storage:'Ammo',Disabled:0,Emin:2,Emax:4,ProdX:4,E:0,Prod:0,ifProd:40 },
            {T:'esteemProd',Disabled:1,Emin:1,Emax:1,ProdX:1,E:0,Prod:0,ifProd:9000 },
            {T:'healerProd',Disabled:0,Emin:4,Emax:16,ProdX:1,E:0,Prod:0,ifProd:90 },
            {T:'Prod',      subT:'Bomb',Storage:'Bomb',Disabled:0,Emin:1,Emax:10,ProdX:1,E:0,Prod:0,ifProd:60 },
            {T:'Prod',      subT:'Missile',Storage:'Missile',Disabled:0,Emin:1,Emax:6,ProdX:4,E:0,Prod:0,ifProd:4 },
            {T:'laserProd', Disabled:1,Emin:2,Emax:4,ProdX:6,E:0,Prod:0,ifProd:240, LaserLoad: 0, LaserLoadM: 4 },
            {T:'Prod',      subT:'Bullet',Storage:'Ammo',Disabled:0,Emin:2,Emax:4,ProdX:4,E:0,Prod:0,ifProd:60 },
            {T:'Prod',      subT:'Bullet',Storage:'Ammo',Disabled:0,Emin:6,Emax:12,ProdX:4,E:0,Prod:0,ifProd:5 },
            {T:'radar',     Disabled:1,Emin:1,Emax:30,ProdX:20,E:0,Prod:0,ifProd:360,Radius:2500},
        ],
    },
};
