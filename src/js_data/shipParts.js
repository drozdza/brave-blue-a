BBAdata.SHIPempty={
    Price: 0,
    Weight: 20,
    lifeM: 1,

    EnergyM: 0,
    SpeedM: 0,

    engineMultiply: 0,
    speed: 0,
    speedAcl: 0,
    speedDcl: 0,
    speedT: 0,
    starBump: 3,
    maxSpeedCap: false,
    maxSpeedTCap: false,
    maxSpeedCapPlus: 0,
    maxSpeedTCapPlus: 0,

    AmmoStorage: 0,
    Ammo: 0,
    MissleStorage: 0,
    Missles: 0,
    BombStorage: 0,
    Bombs: 0,
    ShowFireRange: false,
    ShowAmmoIndicator: false,
    GlueFireToEstimated: false,
    GlueFireToLaser: false,
    KeysModules:{},
    Weapon1: false,
    Weapon2: false,
    MouseDown1: false,
    MouseDown2: false,
    EnergyFieldMax: 0,
    Storage:{},
    Weapon1s:[],
    Weapons:{},
    Modules:[],
};



BBAdata.SHIPelements={};

//================================= HULL =======================================

BBAdata.SHIPelements['simplePlate'] = {             Weight: 10, Price: 50,    where:'hull',
    name: 'Simple Plating',
    info: 'Increases number of life points',
    lifeM: 1,
    upgrades: {
        'lighter': {                                Weight: -4, Price: 250,
            name: 'Lighter plates'
        },
    },
    copies: {
        'I': {}, 'II': {}, 'III': {}, 'IV': {},
    },
};

BBAdata.SHIPelements['lightPlate'] = {              Weight: 3, Price: 5000,   where:'hull',
    name: 'Light Plating',
    info: 'Increases number of life points',
    lifeM: 1,
    copies: {
        'I': {}, 'II': {}, 'III': {}, 'IV': {}, 'V': {}, 'VI': {},
    },
};

BBAdata.SHIPelements['heavyPlate'] = {              Weight: 20, Price: 2000,  where:'hull',
    name: 'Heavy Plating',
    info: 'Increases number of life points',
    lifeM: 2,
    upgrades: {
        'tough': {                                  Weight: 0,  Price: 3000,
            lifeM: 1,
            name: 'Tougher plates',
        },
    },
    copies: {
        'I': {}, 'II': {}, 'III': {}, 'IV': {},
    },
};


//================================= ENERGY =====================================

BBAdata.SHIPelements['simpleEnergyCell'] = {        Weight: 3,  Price: 250,    where:'energy',
    name: 'Simple Energy Cell',
    EnergyM: 1,
    upgrades: {
        'up': {                                     Weight: 0,  Price: 3000,
            EnergyM: 1,
        },
        'up2': {                                    Weight: 0,  Price: 7000,
            EnergyM: 1,
        },
    },
    copies: {
        'I': {}, 'II': {}, 'III': {}, 'IV': {},
    },
};

BBAdata.SHIPelements['energyCrystal'] = {           Weight: 32, Price: 8500,  where:'energy',
    EnergyM: 6,
    upgrades: {
        'energy1': {                                Weight: 6,  Price: 4500,
            EnergyM: 2,
        },
        'energy2': {                                Weight: 6,  Price: 4500,
            EnergyM: 2,
        },
        'weight1': {                                Weight: -9, Price: 6500, },
        'weight2': {                                Weight: -9, Price: 6500, },
    },
    copies: {
        'I': {}, 'II': {},
    },
};

BBAdata.SHIPelements['heavyEnergyCell'] = {         Weight: 12, Price: 2000,  where:'energy',
    EnergyM: 2,
    upgrades: {
        'weight': {                                 Weight: -3, Price: 2000, },
    },
    copies: {
        'I': {}, 'II': {}, 'III': {}, 'IV': {}, 'V': {}, 'VI': {},
    },
};

BBAdata.SHIPelements['energyGeneratus'] = {         Weight: 64, Price: 22000, where:'energy',
    EnergyM: 16,
    maxSpeedCap: 3,
    maxSpeedTCap: 1,
    upgrades: {
        'up1': {                                    Weight: 0, Price: 3000,
            EnergyM: 8,
        },
        'up2': {                                    Weight: 0, Price: 3000,
            EnergyM: 8,
        },
        'up3': {                                    Weight: -12, Price: 4400,
            maxSpeedTCap: 0.8,
        },
        'up4': {                                    Weight: 0, Price: 3200,
            maxSpeedCapPlus: 1.3,
        },
        'up5': {                                    Weight: 0, Price: 3200,
            maxSpeedCapPlus: 1.3,
        },
    },
};


//================================= ENGINE =====================================

/* LOWER MAX energy usage */

BBAdata.SHIPelements['engineCoreI'] = {             Weight: 26, Price: 300,   where:'engine', exclude: ['engineCoreII','engineCoreIII','engineCoreIV'],
    engineMultiply: 1,
    speed: 7,
    speedAcl: 2,
    speedDcl: 2,
    speedT: 2.5,
    EnergyM: 6,
    upgrades: {
        'up1': {                                    Weight: 0, Price: 2700,
            engineMultiply: 0.2,
        },
        'up2': {                                    Weight: 0, Price: 2700,
            engineMultiply: 0.2,
        },
        'up3': {                                    Weight: 0, Price: 1100,
            speedT: 1,
        },
    },
};

BBAdata.SHIPelements['engineCoreII'] = {            Weight: 10, Price: 8100,  where:'engine', exclude: ['engineCoreI','engineCoreIII','engineCoreIV'],
    engineMultiply: 1.6,
    speed: 8,
    speedAcl: 3,
    speedDcl: 3,
    speedT: 2,
    EnergyM: 8,
    upgrades: {
        'up1': {                                    Weight: 0, Price: 8000,
            engineMultiply: 3,
        },
        'up2': {                                    Weight: 0, Price: 5500,
            speedT: 0.4,
        },
        'up3': {                                    Weight: 0, Price: 5500,
            speedT: 0.4,
        },
        'up4': {                                    Weight: 0, Price: 600,
            speed: 2,
        },
        'up5': {                                    Weight: 0, Price: 2700,
            starBump: 1,
        },
    },
};

BBAdata.SHIPelements['engineCoreIII'] = {           Weight: 32, Price: 16500, where:'engine', exclude: ['engineCoreI','engineCoreII','engineCoreIV'],
    engineMultiply: 2.2,
    spped: 8,
    speedAcl: 5,
    speedDcl: 5,
    speedT: 1.5,
    EnergyM: 12,
    upgrades: {
        'up1': {                                    Weight: 0, Price: 1400,
            EnergyM: 2,
            speed: 1,
        },
        'up2': {                                    Weight: 0, Price: 1400,
            EnergyM: 2,
            speed: 1,
        },
        'up3': {                                    Weight: 0, Price: 3000,
            speedT: 0.5,
            starBump: 0.5,
        },
        'up4': {                                    Weight: 0, Price: 3000,
            speedT: 0.5,
            starBump: 0.5,
        },
        'up5': {                                    Weight: 0, Price: 3000,
            speedT: 0.5,
            starBump: 0.5,
        },
        'up6': {                                    Weight: 0, Price: 7500,
            engineMultiply: 0.5,
        },
        'up7': {                                    Weight: 0, Price: 12000,
            maxSpeedCapPlus: 2.5,
            maxSpeedTCapPlus: 1.5,
        },
    },
};

BBAdata.SHIPelements['engineCoreIV'] = {            Weight: 22, Price: 45000, where:'engine', exclude: ['engineCoreI','engineCoreII','engineCoreIII'],
    engineMultiply: 3,
    speed: 8,
    speedAcl: 6,
    speedDcl: 6,
    speedT: 2,
    EnergyM: 16,
    upgrades: {
        'up1': {                                    Weight: 0, Price: 28000,
            speedT: 0.5,
            engineMultiply: 0.2,
            EnergyM: 6,
        },
        'up2': {                                    Weight: 0, Price: 9000,
            engineMultiply: 0.2,
        },
        'up3': {                                    Weight: 0, Price: 9000,
            engineMultiply: 0.2,
        },
        'up4': {                                    Weight: 0, Price: 6500,
            starBump: 1.5,
        },
        'up5': {                                    Weight: 0, Price: 6500,
            starBump: 1.5,
        },
        'up6': {                                    Weight: 0, Price: 6500,
            starBump: 1.5,
        },
        'up7': {                                    Weight: 0, Price: 3400,
            speed: 4,
        },
        'up8': {                                    Weight: 0, Price: 7500,
            maxSpeedCapPlus: 2.5,
            maxSpeedTCapPlus: 1.5,
        },
        'up9': {                                    Weight: 0, Price: 7500,
            maxSpeedCapPlus: 2.5,
            maxSpeedTCapPlus: 1.5,
        },
    },
};


//================================= WEAPONS ====================================

/* Low speed shooting guns can have "fast shooting/long reload" upgrades */

BBAdata.SHIPelements['basicGun'] = {                Weight: 5, Price: 100,    where:'weapons',
    WeaponData:{'single':{
        W:'single',
        gunS:0,
        gunU:0,
        GunSpeed: 30,
        Use:{Ammo:1},
        Speed: 8,
        Dec: 20,
        DMG: {Dmg:1,T:'normal'}
    }},
    upgrades: {
        'up9': {                                    Weight: 0, Price: 300,
            WeaponData:{'single':{GunSpeed:-10}},
        },
        'up10': {                                   Weight: 0, Price: 500,
            WeaponData:{'single':{GunSpeed:-5}},
        },
        'up11': {                                   Weight: 0, Price: 800,
            WeaponData:{'single':{GunSpeed:-5}},
        },
        'up12': {                                   Weight: 0, Price: 1200,
            WeaponData:{'single':{GunSpeed:-2}},
        },
        'up13': {                                   Weight: 0, Price: 2100,
            WeaponData:{'single':{GunSpeed:-2}},
        },
        'up14': {                                   Weight: 0, Price: 3400,
            WeaponData:{'single':{GunSpeed:-2}},
        },
        'up15': {                                   Weight: 0, Price: 5000,
            WeaponData:{'single':{GunSpeed:-1}},
        },
        'up16': {                                   Weight: 0, Price: 9800,
            WeaponData:{'single':{GunSpeed:-1}},
        },
        'up1': {                                    Weight: 0, Price: 2000,
            WeaponData:{'single':{Speed:2}},
        },
        'up2': {                                    Weight: 0, Price: 2000,
            WeaponData:{'single':{Speed:2}},
        },
        'up3': {                                    Weight: 0, Price: 5500,
            WeaponData:{'single':{Speed:1}},
        },
        'up4': {                                    Weight: 0, Price: 5500,
            WeaponData:{'single':{Speed:1}},
        },
        'up5': {                                    Weight: 0, Price: 5500,
            WeaponData:{'single':{Speed:1}},
        },
        'up6': {                                    Weight: 0, Price: 800,
            WeaponData:{'single':{Dec:15}},
        },
        'up7': {                                    Weight: 0, Price: 800,
            WeaponData:{'single':{Dec:15}},
        },
        'up8': {                                    Weight: 0, Price: 6200,
            WeaponData:{'single':{Dec:10}},
        },
        'up17': {                                   Weight: 0, Price: 300,
            WeaponData:{'single':{ShowFireRange: true}},
        },
        'up18': {                                   Weight: 0, Price: 0,
            WeaponData:{'single':{EstimateShootRad: 100}},
        },
    },
};

BBAdata.SHIPelements['doubleGun'] = {               Weight: 8, Price: 2700,   where:'weapons',
    WeaponData:{'double':{
        W:'double',
        gunS:0,
        gunU:0,
        GunSpeed: 30,
        Use:{Ammo:2},
        Speed: 8,
        Dec: 30,
        ShootTime: 40,
        BreakTime: 30,
        DMG: {Dmg:1,T:'normal'}
    }},
    upgrades: {
        'up1': {                                    Weight: 0, Price: 4800,
            WeaponData:{'double':{GunSpeed:-10}},
        },
        'up2': {                                    Weight: 0, Price: 7800,
            WeaponData:{'double':{GunSpeed:-8}},
        },
        'up3': {                                    Weight: 0, Price: 12300,
            WeaponData:{'double':{GunSpeed:-6}},
        },
        'up4': {                                    Weight: 0, Price: 18500,
            WeaponData:{'double':{GunSpeed:-3}},
        },
        'up5': {                                    Weight: 0, Price: 42000,
            WeaponData:{'double':{GunSpeed:-1}},
        },
        'up6': {                                    Weight: 0, Price: 6200,
            WeaponData:{'double':{Speed:2}},
        },
        'up7': {                                    Weight: 0, Price: 6200,
            WeaponData:{'double':{Speed:2}},
        },
        'up8': {                                    Weight: 0, Price: 6200,
            WeaponData:{'double':{Speed:2}},
        },
        'up9': {                                    Weight: 0, Price: 7000,
            WeaponData:{'double':{Dec:10}},
        },
        'up10': {                                   Weight: 0, Price: 27000,
            WeaponData:{'double':{Dec:10}},
        },
        'up11': {                                   Weight: 0, Price: 36800,
            WeaponData:{'double':{Use:{Ammo:-1}}},
        },
        'up12': {                                   Weight: 0, Price: 4200,
            WeaponData:{'double':{ShootTime: 20}},
        },
        'up13': {                                   Weight: 0, Price: 8000,
            WeaponData:{'double':{
                ShootTime: 10,
                BreakTime: -10,
            }},
        },
        'up14': {                                   Weight: 0, Price: 14500,
            WeaponData:{'double':{BreakTime: -20}},
        },
        'up15': {                                   Weight: 0, Price: 300,
            WeaponData:{'double':{ShowFireRange: true}},
        },
        'up16': {                                   Weight: 0, Price: 0,
            WeaponData:{'double':{EstimateShootRad: 100}},
        },
        'up17': {                                   Weight: 0, Price: 125000,
            WeaponData:{'double':{T:'triple'}},
        },
    },
};

// EKHM... more than 1 setting
BBAdata.SHIPelements['roseGun'] = {                 Weight: 12, Price: 1500,  where:'weapons',
    WeaponData:{'rose':{
        W:'rose',
        gunS:0,
        gunU:0,
        GunSpeed: 4,
        Use:{Ammo:3},
        AtOnce: 3,
        RoseAngle: 3,
        Speed: 15,
        Dec: 30,
        DMG:{Dmg:1,T:'normal'},
    }},
    upgrades: {
        'up1': {                                    Weight: -6, Price: 300,
        },
        'up2': {                                    Weight: 0, Price: 300,
            WeaponData:{'rose':{
                Use:{Ammo:2},
                AtOnce: 2,
            }},
        },
        'up3': {                                    Weight: 0, Price: 600,
            WeaponData:{'rose':{Use:{Ammo:-2}}},
        },
        'up4': {                                    Weight: 0, Price: 300,
            WeaponData:{'rose':{
                Use:{Ammo:2},
                AtOnce: 2,
            }},
        },
        'up5': {                                    Weight: 0, Price: 500,
            WeaponData:{'rose':{
                Use:{Ammo:2},
                AtOnce: 2,
            }},
        },
        'up6': {                                    Weight: 0, Price: 1200,
            WeaponData:{'rose':{Use:{Ammo:-2}}},
        },
        'up7': {                                    Weight: 0, Price: 700,
            WeaponData:{'rose':{
                Use:{Ammo:2},
                AtOnce: 2,
            }},
        },
        'up8': {                                    Weight: 0, Price: 700,
            WeaponData:{'rose':{
                Use:{Ammo:3},
                AtOnce: 3,
            }},
        },
        'up9': {                                    Weight: 0, Price: 300,
            WeaponData:{'rose':{Use:{Ammo:-3}}},
        },
        'up10': {                                   Weight: 0, Price: 300,
            WeaponData:{'rose':{
                Use:{Ammo:4},
                AtOnce: 4,
            }},
        },
        'up11': {                                   Weight: 0, Price: 300,
            WeaponData:{'rose':{Use:{Ammo:-3}}},
        },
        'up12': {                                   Weight: 0, Price: 300,
            WeaponData:{'rose':{
                Use:{Ammo:6},
                AtOnce: 6,
            }},
        },
        'up13': {                                   Weight: 0, Price: 300,
            WeaponData:{'rose':{
                W:'rose',
                Use:{Ammo:-3},
            }},
        },
        'up14': {                                   Weight: 0, Price: 2500,
            WeaponData:{'rose':{
                Use:{Ammo:16},
                AtOnce: 16,
            }},
        },
        'up15': {                                   Weight: 0, Price: 3100,
            WeaponData:{'rose':{Use:{Ammo:-12}}},
        },
        'up16': {                                   Weight: 0, Price: 4100,
            WeaponData:{'rose':{Use:{Ammo:-6}}},
        },
    },
};


BBAdata.SHIPelements['ammoStorage'] = {             Weight: 5, Price: 100, where:'weapons',
    name: 'Ammo Storage',
    StorageData:{Ammo:{R:0, M:10}},
    upgrades: {
        'lighter': {                                Weight: -3,  Price: 3000,
            lifeM: 1,
            name: 'Lighter Storages',
        },
        'fullOnStart': {                            Price: 4000,
            StorageData:{Ammo:{R:10}},
        },
    },
    copies: {
        'I': {}, 'II': {}, 'III': {}, 'IV': {},
    },
};

/*
Basic Weapons:
    Rose Gun
        - Gun Speed upgrade
        - Bullets number upgrade
        - Bullets Usage Downgrade
        - Rose Angle Upgrade (one and other way)
        - Bullet Speed, Bullet Distance
        - ShowFireRange
        - ShowEstimetmentMeetingPoint - and size

ShipMovementEstimator (range, energy used)



BBAdata.SHIPelements={
    hullUp:{        Weight: 10, Price: 50,   where:'hull',
        lifeM: 4,
    },
    eleProd1:{      Weight: 2,  Price: 300,  where:'hull',
        EnergyM: 25,
    },
    eleProd2:{      Weight: 2,  Price: 300,  where:'hull',
        EnergyM: 5,
    },
    eleProd3:{      Weight: 2,  Price: 300,  where:'hull',
        EnergyM: 5,
    },
    eleProd4:{      Weight: 2,  Price: 300,  where:'hull',
        EnergyM: 5,
    },
    engine_1:{      Weight: 2,  Price: 100,  where:'engine',
        engineMultiply: 0.3
    },
    startSpeed_4:{  Weight: 0,  Price: 500,  where:'engine',
        speed: 4,
    },
    startSpeed_4x:{ Weight: 0,  Price: 1200, where:'engine',
        speed: 4,
    },
    ammoStorageX:{  Weight: 3,  Price: 200,  where:'hull',
        Storage:{Ammo:{M:10}},
    },
    ammoStorageXX:{ Weight: 3,  Price: 200,  where:'hull',
        Storage:{Ammo:{M:20}},
    },
    ammoOnStart:{   Weight: 0,  Price: 1050, where:'hull',
        Storage:{Ammo:{R:10}},
    },
    ammoOnStartX:{  Weight: 0,  Price: 1050, where:'hull',
        Storage:{Ammo:{R:20}},
    },
    normalShield:{  Weight: 2,  Price: 100,  where:'hull',
        setFunc:{
            'absorbtionShield':['energyField'],
        },
        energyField: 0,
        EnergyFieldMax: 1,
        EnergyM: -1,
    },
    shieldProduction:{ Weight: 1, Price: 300,  where:'hull',
        Mod: 'shieldProd',
        ModPlace: 0,
        ModKey: false,
        ModData:{
            T:'shieldProd',
            Disabled: 0,
            Emin: {min:1,max:5},
            Emax: {min:3,max:5},
            ProdX: 1,
            E: 0,
            Prod: 0,
            ifProd: 30,
        },
        ModDisabled: false,
        ModSet:{
            EminMax:true,
        },
    },
    shieldProduction_Mod1:{ Weight: 0, Price: 100, where:'hull', whereElem:['shieldProduction'],
        ModData:{Emin:{A:0.5}},
    },

    simpleWeapon:{ Weight: 5,  Price: 500,  where:'weapons',
        WeaponData:{
            T:'single',
            gunS:0,
            GunSpeed: 15,
            Use:{Ammo:1},
            Speed: 12,
            Dec: 20,
            DMG: {Dmg:1,T:'normal'}
        }
    },
    ammoProduction:{ Weight: 1, Price: 300, where:'modules',
        Mod: 'Prod',
        ModPlace: 0,
        ModKey: false,
        ModData:{
            T:'Prod',
            Disabled:0,
            Prod:0,
            E:0,
            Emin:{min:2,max:4},
            Emax:{min:2,max:4},
            ProdX:4,
            ifProd:40,
            subT:'Bullet',
            Storage:'Ammo'
        },
        ModDisabled: false,
        ModSet:{
            EminMax:true,
        },
    },
    //{T:'shieldProd',Disabled:0,Emin:0.1,Emax:1,ProdX:1,E:0,Prod:0,ifProd:30 },
};




Movements:
    - Change speed Stops
        - Number of them
        - Change speed delays

- One module, multiple actions
SpecialMoves:
    teleportTo
        - Dec - teleport X turns in a row
        - Dist - Distance of each Teleportation
        - Angle - teleportationAngle
        - AngleRand - teleportation Random[0...X] Addition
    changePosition
        - Dec - procedure run X turns in a row
        - Dist - lenght of single PositionChange
        - Angle - angle of positionChange (compared to ship angle)
        - timesBy - changes per turn
    changeAngle
        - Dec - procedure run X turns in a row
        - angleBy - ship changes angle at the end of the turn
    changeAll
        - Dec
        - Dist
        - Angle
        - AngleRandChange - Random[-X...X] Angle addition
        - timesBy
        - angleBy
        - teleportBy - Dist in teleportBy

    - What Special Move Uses:
        ModUse:{'Moves':1}
        ModUse:{'TeleJump':1}
    - Teleport angle / rotation can be not accurate


Storage:
    - Ammo Storage
    - Ammo Storage Start filling

    - Missle/Bomb Storage - Different Types - Set in bomb booths



SHIP MAIN UPGRADES:
    - second mouse button
    - Show Ammo Indicator
    - Radar






Other Weapons:
    Laser:
        - Range
        - ... laser types?
        - Damage (Module Thingy)
        - Freeze before shoot time
        - Additional: Laser Estimation size
    Teleport
        - Jump Distance
        - Reload Time
        - AngleAccuracy


Modules - Production:
    Produce Bullets
        - Min Energy
        - Max Energy
        - Production Speed
    Produce Missles:
        - Min Energy, Max Energy, Prod Speed
        - Different Types of missles

Modules - other:

    },
'destFields':{
    Shields:[{
        name: 'absorbtionShield',
        CatchDmgT: {normal:1, energy:1, explo:1},
        DmgReduction: 'energyField',
        ReductionUses: 'infinite',
        Own: true,
    }],
    EnergyFieldMax: 10,
    Storage:{
        Missile: {R:10,M:10},
    },
    ModStorage:{
        TeleJump: {R:0,M:6},
    },
    KeysModules:{69:[0,5],82:[11],84:[2],81:[4],70:[8]},
    Weapon1s:[
        {T:'missle',  gunS:0,GunSpeed: 10, Use:{'Missile':1}, Speed: 12, SpeedT: 6, Dec: 130, AimRadius: 60, explodePreset:'MissileDestructionFieldGiant'},
        {T:'missleR', gunS:0,GunSpeed: 6, Use:{'Missile':5}, Speed: 12, AtOnce: 8, SpeedT: 6, Dec: 95, AimRadius: 60, explodePreset:'MissileDestructionFieldSmall'},
        {T:'bombT',   gunS:0,GunSpeed: 5,  Distance: 500, offTime: 0, explodePreset:'DestructionFieldMedium'},
    ],
    Modules:[
        {T:'shieldProd',Disabled:0,Emin:0.1,Emax:1,ProdX:1,E:0,Prod:0,ifProd:30 },
        {T:'spotRegion',Disabled:1,Emin:4,Emax:4,ProdX:1,E:0,Prod:0,ifProd:1 },
        {T:'moduleProd',Disabled:0,Emin:2,Emax:4,ProdX:4,E:0,Prod:0,ifProd:60, subT:'TeleJump',ModStorage:'TeleJump'},
        {T:'healerProd',Disabled:0,Emin:4,Emax:16,ProdX:1,E:0,Prod:0,ifProd:90 },
        {T:'radar',     Disabled:1,Emin:1,Emax:30,ProdX:20,E:0,Prod:0,ifProd:360,Radius:2500},
    ],
},
'bombs1':{
    Shields:[{
        name: 'absorbtionShield',
        CatchDmgT: {normal:1, energy:1, explo:1},
        DmgReduction: 'energyField',
        ReductionUses: 'infinite',
        Own: true,
    }],
    EnergyFieldMax: 10,
    Storage:{
        Bomb: {R:12, M:12},
    },
    ModStorage:{
        TeleJump: {R:0,M:6},
    },
    KeysModules:{69:[0,5],82:[11],84:[2],81:[4],70:[8]},
    Weapon1s:[
        {T:'bombD',   gunS:0,GunSpeed: 5, Use:{'Bomb':1}, Speed: 10, Dec: 50, explodePreset:'NailsBigCircle'},
        {T:'bombD',   gunS:0,GunSpeed: 5, Use:{'Bomb':1}, Speed: 10, Dec: 60, explodePreset:'NailsWirlpool'},
        {T:'bombD',   gunS:0,GunSpeed: 5, Use:{'Bomb':1}, Speed: 10, Dec: 50, explodePreset:'ExplosionSize1',minDec:6},
        {T:'bombD',   gunS:0,GunSpeed: 5, Use:{'Bomb':1}, Speed: 10, Dec: 40, explodePreset:'ExplosionSize3',minDec:13},
    ],
    Modules:[
        {T:'shieldProd',Disabled:0,Emin:0.1,Emax:1,ProdX:1,E:0,Prod:0,ifProd:30 },
        {T:'spotRegion',Disabled:1,Emin:4,Emax:4,ProdX:1,E:0,Prod:0,ifProd:1 },
        {T:'moduleProd',Disabled:0,Emin:2,Emax:4,ProdX:4,E:0,Prod:0,ifProd:60, subT:'TeleJump',ModStorage:'TeleJump'},
        {T:'healerProd',Disabled:0,Emin:4,Emax:16,ProdX:1,E:0,Prod:0,ifProd:90 },
        {T:'Prod',      subT:'Bomb',Storage:'Bomb',Disabled:0,Emin:1,Emax:6,ProdX:4,E:0,Prod:0,ifProd:4 },
    ],
},
'bombs2':{
    Shields:[{
        name: 'absorbtionShield',
        CatchDmgT: {normal:1, energy:1, explo:1},
        DmgReduction: 'energyField',
        ReductionUses: 'infinite',
        Own: true,
    }],
    EnergyFieldMax: 10,
    Storage:{
        Bomb: {R:12, M:12},
    },
    ModStorage:{
        TeleJump: {R:0,M:6},
    },
    KeysModules:{69:[0,5],82:[11],84:[2],81:[4],70:[8]},
    Weapon1s:[
        {T:'bomb',    gunS:0,GunSpeed: 5, Use:{'Bomb':1}, Distance: 400, explodePreset:'NailsCircleToCenter'},
        {T:'bombT',   gunS:0,GunSpeed: 5, Use:{'Bomb':1}, Distance: 400, offTime: 60, explodePreset:'NailsBigCircle'},
        {T:'bombT',   gunS:0,GunSpeed: 5, Use:{'Bomb':1}, Distance: 400, offTime: 60, explodePreset:'NailsBigLongCircle'},
        {T:'bombT',   gunS:0,GunSpeed: 5, Use:{'Bomb':1}, Distance: 400, offTime: 120, explodePreset:'NailsWirlpool', dontCollide:true},
        {T:'bombT',   gunS:0,GunSpeed: 5, Use:{'Bomb':1}, Distance: 500, offTime: 60, explodePreset:'ExplosionSize1'},
        {T:'bombT',   gunS:0,GunSpeed: 5, Use:{'Bomb':1}, Distance: 500, offTime: 0, explodePreset:'ExplosionSize3'},
    ],
    Modules:[
        {T:'shieldProd',Disabled:0,Emin:0.1,Emax:1,ProdX:1,E:0,Prod:0,ifProd:30 },
        {T:'spotRegion',Disabled:1,Emin:4,Emax:4,ProdX:1,E:0,Prod:0,ifProd:1 },
        {T:'moduleProd',  Disabled:0,Emin:2,Emax:4,ProdX:4,E:0,Prod:0,ifProd:60, subT:'TeleJump', ModStorage:'TeleJump'},
        {T:'healerProd',Disabled:0,Emin:4,Emax:16,ProdX:1,E:0,Prod:0,ifProd:90 },
        {T:'Prod',      subT:'Bomb',Storage:'Bomb',Disabled:0,Emin:1,Emax:6,ProdX:4,E:0,Prod:0,ifProd:4 },
    ],
},
'moves1':{
    Storage:{
        Ammo: {R:0, M:50},
        Bomb: {R:12, M:12},
    },
    ModStorage:{
        Moves: {R:0, M:8},
    },
    KeysModules:{69:[0,1],82:[11],84:[2],81:[4],70:[5]},
    Weapon1s:[
        {T:'single',  gunS:0,GunSpeed: 5, Speed: 17, Dec: 30, Use:{'Ammo':1}, DMG:{Dmg:1,T:'normal'},},
        {T:'double',  gunS:0,GunSpeed: 1, Speed: 15, Dec: 30, Use:{'Ammo':2}, DMG:{Dmg:1,T:'normal'},},
        {T:'rose',    gunS:0,GunSpeed: 4, AtOnce: 9, Use:{'Ammo':5}, RoseAngle: 3, Speed: 15, Dec: 30, DMG:{Dmg:1,T:'normal'},},
        {T:'bomb',    gunS:0,GunSpeed: 5, Use:{'Bomb':1}, Speed: 10, Dec: 30, explodePreset:'ExplosionSize2'},
    ],
    Modules:[
        {T:'Prod', subT:'Bomb',  Storage:'Bomb', Disabled:0,Emin:1,Emax:10,ProdX:1,E:0,Prod:0,ifProd:10 },
        {T:'moduleProd',Disabled:0,Emin:2,Emax:4,ProdX:1,E:0,Prod:0,ifProd:20, subT:'Moves', ModStorage:'Moves'},
        {T:'healerProd',Disabled:0,Emin:1,Emax:16,ProdX:1,E:0,Prod:0,ifProd:9 },
    ],
},
'best':{
    Shields:[{
        name: 'absorbtionShield',
        CatchDmgT: {normal:1, energy:1, explo:1},
        DmgReduction: 'energyField',
        ReductionUses: 'infinite',
        Own: true,
    }],
    EnergyFieldMax: 10,
    Storage:{
        Ammo: {R:0, M:50},
        Missile: {R:10,M:10},
        Bomb: {R:12, M:12},
    },
    ModStorage:{
        TeleJump: {R:0,M:6},
        Laser: {R:0,M:4}
    },
    KeysModules:{66:[6],69:[0,5],73:[3,9,10],77:[7],84:[2],81:[4],70:[8],82:[11]},
    Weapon1s:[
        {T:'bomb',    gunS:0,GunSpeed: 5,  Use:{Ammo:3}, Speed: 0.1, Teleport:{ Dist: 35, Angle: 270, AngleRand: 180}, Dec: 10, onHitDieExpire:    {Do:'explode',DMG:{Dmg:7,T:'explo'}, Dist: 80}},
        {T:'missle',  gunS:0,GunSpeed: 10, Use:{Missile:1}, Speed: 12, SpeedT: 4, Dec: 400, AimRadius: 120, DMG:{Dmg:3,T:'explo'},},
        {T:'missleR', gunS:0,GunSpeed: 6,  Use:{Missile:5}, Speed: 12, AtOnce: 8, SpeedT: 6, Dec: 95, AimRadius: 60, DMG:{Dmg:3,T:'explo'},},
        {T:'bomb',    gunS:0,GunSpeed: 5,  Use:{Bomb:1}, Speed: 10, Dec: 30, explodePreset:'NailsBigCircle'},
    ],
    Modules:[
        {T:'shieldProd',Disabled:0,Prod:0,E:0,Emin:0.1,Emax:1,ProdX:1,ifProd:30 },
        {T:'spotRegion',Disabled:1,Prod:0,E:0,Emin:4,Emax:4, ProdX:1,ifProd:1 },
        {T:'moduleProd',Disabled:0,Prod:0,E:0,Emin:2,Emax:4, ProdX:4,ifProd:60, subT:'TeleJump', ModStorage:'TeleJump'},
        {T:'esteemProd',Disabled:1,Prod:0,E:0,Emin:1,Emax:1, ProdX:1,ifProd:9000 },
        {T:'healerProd',Disabled:0,Prod:0,E:0,Emin:4,Emax:16,ProdX:1,ifProd:90 },
        {T:'Prod',      Disabled:0,Prod:0,E:0,Emin:1,Emax:10,ProdX:1,ifProd:60,subT:'Bomb',Storage:'Bomb'},
        {T:'Prod',      Disabled:0,Prod:0,E:0,Emin:1,Emax:6, ProdX:4,ifProd:4,subT:'Missile',Storage:'Missile'},
        {T:'moduleProd',Disabled:1,Prod:0,E:0,Emin:2,Emax:4, ProdX:6,ifProd:240, subT:'Laser', ModStorage:'Laser'},
    ],
},
'bombardier':{
    Shields:[{
        name: 'absorbtionShield',
        CatchDmgT: {normal:1, energy:1, explo:1},
        DmgReduction: 'energyField',
        ReductionUses: 'infinite',
        Own: true,
    }],
    EnergyFieldMax: 10,
    Storage:{
        Bomb: {R:42, M:42},
    },
    ModStorage:{
        TeleJump: {R:0,M:6},
        Laser: {R:0,M:4}
    },
    KeysModules:{69:[0,5],82:[11],84:[2],81:[4],70:[8]},
    Weapon1s:[
        {T:'bomb',    gunS:0,GunSpeed: 5,  Use:{Bomb:1}, Speed: 15, Dec: 10, explodePreset:'NailsConePalm'},
        {T:'bomb',    gunS:0,GunSpeed: 5,  Use:{Bomb:1}, Speed: 15, Dec: 10, explodePreset:'HugeNailsConePalm'},
        {T:'bomb',    gunS:0,GunSpeed: 5,  Use:{Bomb:1}, Speed: 8, Dec: 70, explodePreset:'HugeExplosionRose'},
        {T:'bomb',    gunS:0,GunSpeed: 5,  Use:{Bomb:1}, Speed: 0.1, Teleport:{ Dist: 55, Angle: 270, AngleRand: 180}, Dec: 60, onHitDieExpire:    {Do:'explode',DMG:{Dmg:11,T:'explo'}, Dist: 120}},
        {T:'bomb',    gunS:0,GunSpeed: 5,  Use:{Bomb:1}, Speed: 8, Dec: 10, explodePreset:'BubbleStorm'},
        {T:'bomb',    gunS:0,GunSpeed: 5,  Use:{Bomb:1}, Speed: 8, Dec: 10, explodePreset:'StrikeOfEvil'},
        {T:'bomb',    gunS:0,GunSpeed: 5,  Use:{Bomb:1}, Speed: 12, Dec: 10, explodePreset:'ExplosionWorm2'},
        {T:'bomb',    gunS:0,GunSpeed: 5,  Use:{Bomb:1}, Speed: 8, Dec: 50, explodePreset:'EyeOfEvil'},
    ],
    Modules:[
        {T:'shieldProd',Disabled:0,Emin:0.1,Emax:1,ProdX:1,E:0,Prod:0,ifProd:30 },
        {T:'moduleProd',Disabled:0,Emin:2,Emax:4,ProdX:4,E:0,Prod:0,ifProd:60, subT:'TeleJump', ModStorage:'TeleJump'},
        {T:'healerProd',Disabled:0,Emin:4,Emax:16,ProdX:1,E:0,Prod:0,ifProd:90 },
        {T:'Prod',      Disabled:0,subT:'Bomb',Storage:'Bomb',Emin:1,Emax:10,ProdX:1,E:0,Prod:0,ifProd:20 },
        {T:'Prod',      Disabled:0,subT:'Bomb',Storage:'Bomb',Emin:1,Emax:10,ProdX:1,E:0,Prod:0,ifProd:20 },
        {T:'Prod',      Disabled:0,subT:'Bomb',Storage:'Bomb',Emin:1,Emax:10,ProdX:1,E:0,Prod:0,ifProd:20 },
    ],
},
'bombardier2':{
    Shields:[{
        name: 'absorbtionShield',
        CatchDmgT: {normal:1, energy:1, explo:1},
        DmgReduction: 'energyField',
        ReductionUses: 'infinite',
        Own: true,
    }],
    EnergyFieldMax: 10,
    Storage:{
        Bomb: {R:42, M:42},
    },
    ModStorage:{
        TeleJump: {R:0,M:6},
        Laser: {R:0,M:4}
    },
    KeysModules:{69:[0,5],82:[11],84:[2],81:[4],70:[8]},
    Weapon1s:[
        {T:'bomb',    gunS:0,GunSpeed: 5,  Use:{Bomb:1}, Speed: 15, Dec: 10, explodePreset:'NailsConeMicro'},
        {T:'bomb',    gunS:0,GunSpeed: 5,  Use:{Bomb:1}, Speed: 15, Dec: 10, explodePreset:'NailsConeMedium'},
        {T:'bomb',    gunS:0,GunSpeed: 5,  Use:{Bomb:1}, Speed: 15, Dec: 10, explodePreset:'HugeNailsConePalm'},
        {T:'bomb',    gunS:0,GunSpeed: 5,  Use:{Bomb:1}, Speed: 15, Dec: 40, explodePreset:'NailsWirlpool'},
        {T:'bomb',    gunS:0,GunSpeed: 5,  Use:{Bomb:1}, Speed: 15, Dec: 40, explodePreset:'NailsWirlpool2'},
        {T:'bomb',    gunS:0,GunSpeed: 5,  Use:{Bomb:1}, Speed: 15, Dec: 40, explodePreset:'HugeNailsWirlpool2'},
        {T:'tele',    gunS:0,GunSpeed: 3,  ModUse:{TeleJump:1}, Speed: 400, Dec: 1},
    ],
    Modules:[
        {T:'shieldProd',Disabled:0,Emin:0.1,Emax:1,ProdX:1,E:0,Prod:0,ifProd:30 },
        {T:'moduleProd',Disabled:0,Emin:2,Emax:4,ProdX:4,E:0,Prod:0,ifProd:60, subT:'TeleJump', ModStorage:'TeleJump'},
        {T:'healerProd',Disabled:0,Emin:4,Emax:16,ProdX:1,E:0,Prod:0,ifProd:90 },
        {T:'Prod',      Disabled:0,subT:'Bomb',Storage:'Bomb',Emin:1,Emax:10,ProdX:1,E:0,Prod:0,ifProd:20 },
        {T:'Prod',      Disabled:0,subT:'Bomb',Storage:'Bomb',Emin:1,Emax:10,ProdX:1,E:0,Prod:0,ifProd:20 },
        {T:'Prod',      Disabled:0,subT:'Bomb',Storage:'Bomb',Emin:1,Emax:10,ProdX:1,E:0,Prod:0,ifProd:20 },
    ],
},
'ethernal':{
    Storage:{
        Ammo: {R:0, M:50},
        Bomb: {R:12, M:12},
    },
    KeysModules:{69:[0,1],82:[11],84:[2],81:[4],70:[5]},
    Weapon1s:[
        {T:'bomb',    gunS:0,GunSpeed: 5, Use:{Bomb:1}, Speed: 10, Dec: 30, explodePreset:'ExplosionSize2'},
        {T:'bomb',    gunS:0,GunSpeed: 5, Use:{Bomb:1,Ammo:5}, Speed: 10, Dec:30, explodePreset:'NailsBigCircle'},
    ],
    Modules:[
        {T:'Prod', subT:'Bomb',  Storage:'Bomb', Disabled:0,Emin:1,Emax:10,ProdX:1,E:0,Prod:0,ifProd:10 },
    ],
},
*/
