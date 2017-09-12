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
    Weapons:[],
    Modules:[],
    ModStorage:{},
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
        'tough': {                                   Price: 3000,
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
        'up': {                                      Price: 3000,
            EnergyM: 1,
        },
        'up2': {                                     Price: 7000,
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
        'up1': {                                    Price: 3000,
            EnergyM: 8,
        },
        'up2': {                                    Price: 3000,
            EnergyM: 8,
        },
        'up3': {                                    Weight: -12, Price: 4400,
            maxSpeedTCap: 0.8,
        },
        'up4': {                                    Price: 3200,
            maxSpeedCapPlus: 1.3,
        },
        'up5': {                                    Price: 3200,
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
        'up1': {                                    Price: 2700,
            engineMultiply: 0.2,
        },
        'up2': {                                    Price: 2700,
            engineMultiply: 0.2,
        },
        'up3': {                                    Price: 1100,
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
        'up1': {                                    Price: 8000,
            engineMultiply: 3,
        },
        'up2': {                                    Price: 5500,
            speedT: 0.4,
        },
        'up3': {                                    Price: 5500,
            speedT: 0.4,
        },
        'up4': {                                    Price: 600,
            speed: 2,
        },
        'up5': {                                    Price: 2700,
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
        'up1': {                                    Price: 1400,
            EnergyM: 2,
            speed: 1,
        },
        'up2': {                                    Price: 1400,
            EnergyM: 2,
            speed: 1,
        },
        'up3': {                                    Price: 3000,
            speedT: 0.5,
            starBump: 0.5,
        },
        'up4': {                                    Price: 3000,
            speedT: 0.5,
            starBump: 0.5,
        },
        'up5': {                                    Price: 3000,
            speedT: 0.5,
            starBump: 0.5,
        },
        'up6': {                                    Price: 7500,
            engineMultiply: 0.5,
        },
        'up7': {                                    Price: 12000,
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
        'up1': {                                    Price: 28000,
            speedT: 0.5,
            engineMultiply: 0.2,
            EnergyM: 6,
        },
        'up2': {                                    Price: 9000,
            engineMultiply: 0.2,
        },
        'up3': {                                    Price: 9000,
            engineMultiply: 0.2,
        },
        'up4': {                                    Price: 6500,
            starBump: 1.5,
        },
        'up5': {                                    Price: 6500,
            starBump: 1.5,
        },
        'up6': {                                    Price: 6500,
            starBump: 1.5,
        },
        'up7': {                                    Price: 3400,
            speed: 4,
        },
        'up8': {                                    Price: 7500,
            maxSpeedCapPlus: 2.5,
            maxSpeedTCapPlus: 1.5,
        },
        'up9': {                                    Price: 7500,
            maxSpeedCapPlus: 2.5,
            maxSpeedTCapPlus: 1.5,
        },
    },
};


//================================= WEAPONS ====================================

/* Low speed shooting guns can have "fast shooting/long reload" upgrades */

BBAdata.SHIPelements['basicGun'] = {                Weight: 5, Price: 100,    where:'weapons',
    WeaponData:{
        T:'single',
        gunS:0,
        gunU:0,
        GunSpeed: 30,
        Use:{Ammo:1},
        Speed: 8,
        Dec: 20,
        DMG: {Dmg:1,T:'normal'}
    },
    StorageData:{Ammo:{R:0,M:1,Hidden:1}},
    upgrades: {
        'up9':{  Price: 300,   WeaponData:{GunSpeed:-10}},
        'up10':{ Price: 500,   WeaponData:{GunSpeed:-5}},
        'up11':{ Price: 800,   WeaponData:{GunSpeed:-5}},
        'up12':{ Price: 1200,  WeaponData:{GunSpeed:-2}},
        'up13':{ Price: 2100,  WeaponData:{GunSpeed:-2}},
        'up14':{ Price: 3400,  WeaponData:{GunSpeed:-2}},
        'up15':{ Price: 5000,  WeaponData:{GunSpeed:-1}},
        'up16':{ Price: 9800,  WeaponData:{GunSpeed:-1}},
        'up1':{  Price: 2000,  WeaponData:{Speed:2}},
        'up2':{  Price: 2000,  WeaponData:{Speed:2}},
        'up3':{  Price: 5500,  WeaponData:{Speed:1}},
        'up4':{  Price: 5500,  WeaponData:{Speed:1}},
        'up5':{  Price: 5500,  WeaponData:{Speed:1}},
        'up6':{  Price: 800,   WeaponData:{Dec:15}},
        'up7':{  Price: 800,   WeaponData:{Dec:15}},
        'up8':{  Price: 6200,  WeaponData:{Dec:10}},
        'up17':{ Price: 300,   WeaponData:{ShowFireRange: true}},
        'up18':{ Price: 0,     WeaponData:{EstimateShootRad: 100}},
    },
};

BBAdata.SHIPelements['doubleGun'] = {               Weight: 8, Price: 2700,   where:'weapons',
    WeaponData:{
        T:'double',
        gunS:0,
        gunU:0,
        GunSpeed: 30,
        Use:{Ammo:2},
        Speed: 8,
        Dec: 30,
        ShootTime: 40,
        BreakTime: 30,
        DMG: {Dmg:1,T:'normal'}
    },
    StorageData:{Ammo:{R:0,M:2,Hidden:2}},
    upgrades: {
        'up1': {                                    Price: 4800,
            WeaponData:{GunSpeed:-10},
        },
        'up2': {                                    Price: 7800,
            WeaponData:{GunSpeed:-8},
        },
        'up3': {                                    Price: 12300,
            WeaponData:{GunSpeed:-6},
        },
        'up4': {                                    Price: 18500,
            WeaponData:{GunSpeed:-3},
        },
        'up5': {                                    Price: 42000,
            WeaponData:{GunSpeed:-1},
        },
        'up6': {                                    Price: 6200,
            WeaponData:{Speed:2},
        },
        'up7': {                                    Price: 6200,
            WeaponData:{Speed:2},
        },
        'up8': {                                    Price: 6200,
            WeaponData:{Speed:2},
        },
        'up9': {                                    Price: 7000,
            WeaponData:{Dec:10},
        },
        'up10': {                                   Price: 27000,
            WeaponData:{Dec:10},
        },
        'up11': {                                   Price: 36800,
            WeaponData:{Use:{Ammo:-1}},
            StorageData:{Ammo:{M:-1,Hidden:-1}},
        },
        'up12': {                                   Price: 4200,
            WeaponData:{ShootTime: 20},
        },
        'up13': {                                   Price: 8000,
            WeaponData:{
                ShootTime: 10,
                BreakTime: -10,
            },
        },
        'up14': {                                   Price: 14500,
            WeaponData:{BreakTime: -20},
        },
        'up15': {                                   Price: 300,
            WeaponData:{ShowFireRange: true},
        },
        'up16': {                                   Price: 0,
            WeaponData:{EstimateShootRad: 100},
        },
        'up17': {                                   Price: 125000,
            WeaponData:{T:'triple'},
        },
    },
};

// EKHM... more than 1 setting
BBAdata.SHIPelements['roseGun'] = {                 Weight: 12, Price: 1500,  where:'weapons',
    WeaponData:{
        T:'rose',
        gunS:0,
        gunU:0,
        GunSpeed: 4,
        Use:{Ammo:3},
        AtOnce: 3,
        RoseAngle: 3,
        Speed: 15,
        Dec: 30,
        DMG:{Dmg:1,T:'normal'},
    },
    StorageData:{Ammo:{R:0,M:3,Hidden:3}},
    upgrades: {
        'up1': {                                    Weight: -6, Price: 300,
        },
        'up2': {                                    Price: 300,
            WeaponData:{
                Use:{Ammo:2},
                AtOnce: 2,
            },
            StorageData:{Ammo:{M:2,Hidden:2}},
        },
        'up3': {                                    Price: 600,
            WeaponData:{Use:{Ammo:-2}},
            StorageData:{Ammo:{M:-2,Hidden:-2}},
        },
        'up4': {                                    Price: 300,
            WeaponData:{
                Use:{Ammo:2},
                AtOnce: 2,
            },
            StorageData:{Ammo:{M:2,Hidden:2}},
        },
        'up5': {                                    Price: 500,
            WeaponData:{
                Use:{Ammo:2},
                AtOnce: 2,
            },
            StorageData:{Ammo:{M:2,Hidden:2}},
        },
        'up6': {                                    Price: 1200,
            WeaponData:{Use:{Ammo:-2}},
            StorageData:{Ammo:{M:-2,Hidden:-2}},
        },
        'up7': {                                    Price: 700,
            WeaponData:{
                Use:{Ammo:2},
                AtOnce: 2,
            },
            StorageData:{Ammo:{M:2,Hidden:2}},
        },
        'up8': {                                    Price: 700,
            WeaponData:{
                Use:{Ammo:3},
                AtOnce: 3,
            },
            StorageData:{Ammo:{M:3,Hidden:3}},
        },
        'up9': {                                    Price: 300,
            WeaponData:{Use:{Ammo:-3}},
            StorageData:{Ammo:{M:-3,Hidden:-3}},
        },
        'up10': {                                   Price: 300,
            WeaponData:{
                Use:{Ammo:4},
                AtOnce: 4,
            },
            StorageData:{Ammo:{M:4,Hidden:4}},
        },
        'up11': {                                   Price: 300,
            WeaponData:{Use:{Ammo:-3}},
            StorageData:{Ammo:{M:-3,Hidden:-3}},
        },
        'up12': {                                   Price: 300,
            WeaponData:{
                Use:{Ammo:6},
                AtOnce: 6,
            },
            StorageData:{Ammo:{M:6,Hidden:6}},
        },
        'up13': {                                   Price: 300,
            WeaponData:{
                Use:{Ammo:-3},
            },
            StorageData:{Ammo:{M:-3,Hidden:-3}},
        },
        'up14': {                                   Price: 2500,
            WeaponData:{
                Use:{Ammo:16},
                AtOnce: 16,
            },
            StorageData:{Ammo:{M:16,Hidden:16}},
        },
        'up15': {                                   Price: 3100,
            WeaponData:{Use:{Ammo:-12}},
            StorageData:{Ammo:{M:-12,Hidden:-12}},
        },
        'up16': {                                   Price: 4100,
            WeaponData:{Use:{Ammo:-6}},
            StorageData:{Ammo:{M:-6,Hidden:-6}},
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


BBAdata.SHIPelements['laserGun'] = {                Weight: 5, Price: 100,    where:'weapons',
    name: 'Laser',
    WeaponData:{
        T:'laser',
        gunS:0,
        GunSpeed: 20,
        ModUse:{Laser:1},
        Speed: 400,
        Dec: 1,
        DMG:{Dmg:3,T:'energy'},
    },
    ModStorageData:{Laser:{R:0,M:0}},
    upgrades:{
        'up1':{ Price: 300,  WeaponData:{Speed:200}},
        'up2':{ Price: 300,  WeaponData:{Speed:50}},
        'up3':{ Price: 300,  WeaponData:{Speed:150}},
        'up4':{ Price: 300,  WeaponData:{DMG:{Dmg:1}}},
        'up5':{ Price: 300,  WeaponData:{DMG:{Dmg:1}}},
        'up6':{ Price: 300,  WeaponData:{DMG:{Dmg:1}}},
        'up7':{ Price: 300,  WeaponData:{GunSpeed:-5}},
        'up8':{ Price: 300,  WeaponData:{GunSpeed:-5}},
        'up9':{ Price: 100,  GlueFireToLaser: 30},
        'up10':{ Price: 100,  GlueFireToLaser: 30},
        'up11':{ Price: 100,  GlueFireToLaser: 100},
        'up11':{ Price: 100,  GlueFireToLaser: 200},
    },
};

//============================= MODULES ========================================

BBAdata.SHIPelements['bulletProd'] = {             Weight: 5, Price: 100, where:'modules',
    name: 'Ammo Prod',
    ModulesData: {
        T: 'Prod',
        subT: 'Bullet',
        Storage: 'Ammo',
        E: 0,
        Prod: 0,
        Disabled: 0,
        Emin: 2,
        Emax: 4,
        ifProd: 100,
    },
    upgrades: {
        'lowerMin':{    Price: 100, ModulesData: {Emin:-1}},
        'lowerMin2':{   Price: 100, ModulesData: {Emin:-0.6}},
        'higherMax':{   Price: 100, ModulesData: {Emax: 1}},
        'higherMax2':{  Price: 100, ModulesData: {Emax: 2}},
        'higherMax3':{  Price: 100, ModulesData: {Emax: 3}},
        'faster':{      Price: 100, ModulesData: {ifProd:-20}},
        'faster2':{     Price: 100, ModulesData: {ifProd:-20}},
    },
    copies: {
        'I': {}, 'II': {}, 'III': {}, 'IV': {},
    },
};


BBAdata.SHIPelements['laserProd'] = {              Weight: 5, Price: 100, where:'modules',
    name: 'Laser Prod',
    ModulesData: {
        T:'moduleProd',
        Disabled: 0,
        Prod: 0,
        E: 0,
        Emin: 2,
        Emax: 4,
        ifProd: 400,
        subT: 'Laser',
        ModStorage: 'Laser'
    },
    ModStorageData:{Laser:{R:0,M:1}},
    upgrades: {
        'up1':{ModStorageData:{Laser:{M:1}}},
        'up2':{ModStorageData:{Laser:{M:2}}},
        'up3':{ModulesData:{Emax:2}},
        'up4':{ModulesData:{Emax:2}},
        'up5':{ModulesData:{Emax:2}},
        'up6':{ModulesData:{Emin:-0.5}},
        'up7':{ModulesData:{Emin:-0.5}},
        'up8':{ModulesData:{ifProd:-100}},
        'up9':{ModulesData:{ifProd:-100}},
        'up10':{ModulesData:{ifProd:-150}},
    }
};


BBAdata.SHIPelements['healMod'] = {                  Weight: 10, Price: 4000, where:'modules',
    name: 'Healing',
    ModulesData: {
        T:'healerProd',
        Disabled:0,
        Emin:6,
        Emax:10,
        E:0,
        Prod:0,
        ifProd:1440
    },
    upgrades: {
        'up1':{ModulesData:{Emin:-2,Emax:6}},
        'up2':{ModulesData:{Emin:-2,Emax:6}},
        'up3':{ModulesData:{Emin:-1,Emax:8}},
        'up4':{ModulesData:{ifProd:-220}},
        'up5':{ModulesData:{ifProd:-220}},
        'up6':{ModulesData:{ifProd:-200}},
        'up7':{ModulesData:{ifProd:-100}},
    },
    copies: {'I': {}, 'II': {}, 'III': {}},
};

BBAdata.SHIPelements['radar'] = {                  Weight: 10, Price: 4000, where:'modules',
    name: 'Radar',
    ModulesData: {
        T:'radar',
        Disabled: 0,
        Emin: 5,
        Emax: 10,
        E: 0,
        Prod: 0,
        ifProd: 6000,
        Radius: 1500
    },
    upgrades: {
        'up1':{ModulesData:{Emin:-1,Emax:5}},
        'up2':{ModulesData:{Emin:-1,Emax:5}},
        'up3':{ModulesData:{Emin:-2,Emax:10}},
        'up4':{ModulesData:{ifProd:-1000}},
        'up5':{ModulesData:{ifProd:-1000}},
        'up6':{ModulesData:{ifProd:-1000}},
        'up7':{ModulesData:{ifProd:-1000}},
        'up8':{ModulesData:{ifProd:-1000}},
        'up9':{ModulesData:{ifProd:1200,Radius:1000}},
        'up10':{ModulesData:{ifProd:1200,Radius:1000}},
        'up11':{ModulesData:{ifProd:1200,Radius:1000}},
        'up12':{ModulesData:{ifProd:1200,Radius:1000}},
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

*/
