function MenuShipBuildingObject(){

    this.start = function(){


    }
    this.start();

    this.money = 999000;
    this.width = 100;
    this.height = 100;

    this.SHIPelems = {};
    this.SHIP = false; // Current Ship
    this.SHIPempty={
        Price: 0,
        Weight: 20,
        lifeM: 1,
        EnergyM: 0,
        SpeedM: 0,
        engineMultiply:1,
        speed: 0,
        AmmoStorage: 0,
        Ammo: 0,
        MissleStorage: 0,
        Missles: 0,
        BombStorage: 0,
        Bombs: 0,
        ShowFireRange: true,
        ShowAmmoIndicator: false,
        GlueFireToEstimated: false,
        GlueFireToLaser: false,
        ShowRadar: false,
        KeysModules:{},
        FireType: 0,
        FireType2: false,
        MouseDown1: false,
        MouseDown2: false,
        EnergyFieldMax: 0,
        Storage:{},
        FireTypes:[],
        Modules:[],
    };


    this.resize = function(){
        this.width = $(window).width();
        this.height = $(window).height();

        $('#shipyardContainer')
            .attr({width: this.width+'px',height: this.height+'px'})
            .css( {width: this.width+'px',height: this.height+'px'});
    }

    this.makeMenuShip = function(){
        this.resize();

        this.buildShip();

        this.showShipProperties();
        this.showShipElements();

        $(window).on('resize', function(){ MENU.SB.resize(); });
        $('#shipyardContainer').on('click','.shipElement',function(){
            MENU.SB.toggleShipElement( $(this).attr('elementName') );
        });
    }



    this.showShipProperties = function(){
        var html='';

        html += '<span>Price:  '+this.SHIP.Price+'</span>';
        html += '<span>Weight: '+this.SHIP.Weight+'</span>';
        html += '<span>Life:   '+this.SHIP.lifeM+'</span>';
        html += '<span>Energy: '+this.SHIP.EnergyM+'</span>';
        html += '<span>Speed:  '+this.SHIP.speedM+'</span>';


        $('.shipProperties').html(html);
        this.showDetailedShipProperties();
        this.showDetailedShipStorage();
    }
    this.showDetailedShipProperties = function(){
        var html='';

        html += '<tr><td>EnginePower:</td><td>'+this.SHIP.engineMultiply+'</td></tr>';

        $('.detailedShipProperties').html('<table>'+html+'</table>');
    }
    this.showDetailedShipStorage = function(){
        var html='';

        html += '<tr><td colspan="3">Storage</td></tr>';
        html += '<tr><td>Type</td><td>Max.</td><td>Start</td></tr>';
        for(var i in this.SHIP.Storage)
            html += '<tr><td>'+i+'</td><td>'+this.SHIP.Storage[i].M+'</td><td>'+this.SHIP.Storage[i].R+'</td></tr>';

        $('.detailedShipProperties').append('<table>'+html+'</table>');

    }
    this.showShipElements = function(){
        var html='';
        for(var e in BBAdata.SHIPelements){
            var E = BBAdata.SHIPelements[e];
            html+='<div class="shipElement" elementName="'+e+'">'+e+'</div>';
        }

        $('.shipElements').html(html);
    }

    this.toggleShipElement = function(elementName){
        if(typeof this.SHIPelems[elementName] == 'undefined'){
            $('.shipElement[elementName="'+elementName+'"]').addClass('choosen');
            this.SHIPelems[elementName] = {};
        }else{
            $('.shipElement[elementName="'+elementName+'"]').removeClass('choosen');
            delete this.SHIPelems[elementName];
        }
        this.buildShip();
        this.showShipProperties();
    }


    this.buildShip = function(){
        this.SHIP = cloneObj(this.SHIPempty);

        // adding Elements
        for(var elementName in this.SHIPelems){
            var Evar = this.SHIPelems[elementName];
            var Edata = BBAdata.SHIPelements[elementName];

            for(var i in Edata){
                switch(i){
                    case 'Weight':
                    case 'lifeM':
                    case 'EnergyM':
                    case 'Price':
                    case 'engineMultiply':
                        this.SHIP[i]-=-Edata[i];
                    break;
                    case 'Storage':
                        this.buildShip_Storage(Edata.Storage);
                    break;
                }
            }
        }

        // counting maxSpeed
        this.SHIP.speedM = parseInt((Math.sqrt(this.SHIP.EnergyM*this.SHIP.engineMultiply))/(this.SHIP.Weight/50)*10)/10;
    }
    this.buildShip_Storage = function(StorageData){
        for(var storageType in StorageData){
            if(typeof this.SHIP.Storage[storageType] == 'undefined')
                this.SHIP.Storage[storageType] = {M:0,R:0};

            for(var i in StorageData[storageType])
                this.SHIP.Storage[storageType][i] -=- StorageData[storageType][i];
        }
    }
}



// =============================================

BBAdata.SHIPelements={
    hullUp:{
        Weight: 10,
        Price: 50,
        lifeM: 4,
    },
    eleProd1:{
        Weight: 2,
        Price: 300,
        EnergyM: 5,
    },
    eleProd2:{
        Weight: 2,
        Price: 300,
        EnergyM: 5,
    },
    eleProd3:{
        Weight: 2,
        Price: 300,
        EnergyM: 5,
    },
    eleProd4:{
        Weight: 2,
        Price: 300,
        EnergyM: 5,
    },
    engine_1:{
        Weight: 2,
        Price: 100,
        engineMultiply: 0.3
    },
    ammoStorageX:{
        Weight: 3,
        Price: 200,
        Storage:{Ammo:{M:10}},
    },
    ammoStorageXX:{
        Weight: 3,
        Price: 200,
        Storage:{Ammo:{M:20}},
    },
    ammoOnStart:{
        Price: 1050,
        Storage:{Ammo:{R:10}},
    },
    normalShield:{
        Weight: 2,
        Price: 100,
        setFunc:{
            'absorbtionShield':['energyField'],
        },
        energyField: 0,
        EnergyFieldMax: 1,
        EnergyM: -1,
    },
    shieldProduction:{
        Weight: 1,
        Price: 300,
        Mod: 'shieldProd',
        ModPlace: 0,
        ModKey: false,
        ModData:{
            T:'shieldProd',
            Disabled: 0,
            Emin: {A:1,B:5},
            Emax: {B:3,C:5},
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
    shieldProduction_Mod1:{
        Weight: 0,
        Price: 100,
        ModData:{Emin:{A:0.5}},
    },



    //{T:'shieldProd',Disabled:0,Emin:0.1,Emax:1,ProdX:1,E:0,Prod:0,ifProd:30 },


    weaponX:{

    },
};



Best = {
    Weight: 25,
    life: 11,
    lifeM: 11,
    Shields:[{
        name: 'absorbtionShield',
        CatchDmgT: {normal:1, energy:1, explo:1},
        DmgReduction: 'energyField',
        ReductionUses: 'infinite',
        Own: true,
    }],
    EnergyFieldMax: 10,
    EnergyM: 32,
    SpeedM: 20,
    engineMultiply: 1,
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
    KeysModules:{66:[6],69:[0,5],73:[3,9,10],77:[7],84:[2],81:[4],70:[8],82:[11]},
    FireType: 0,
    FireType2: 8,
    res:{},
    MouseDown1: false,
    MouseDown2: false,
    FireTypes:[
        {T:'single',  gunS:0,GunSpeed: 5,  Use:{Ammo:1}, Speed: 17, Dec: 30, DMG:{Dmg:1,T:'normal'},},
        {T:'double',  gunS:0,GunSpeed: 1,  Use:{Ammo:2}, Speed: 15, Dec: 30, DMG:{Dmg:1,T:'normal'},},
        {T:'rose',    gunS:0,GunSpeed: 4,  Use:{Ammo:5}, AtOnce: 9, RoseAngle: 3, Speed: 15, Dec: 30, DMG:{Dmg:1,T:'normal'},},
        {T:'laser',   gunS:0,GunSpeed: 10, ModUse:{Laser:1}, Speed: 650, Dec: 1, DMG:{Dmg:5,T:'energy'},},
        {T:'bomb',    gunS:0,GunSpeed: 5,  Use:{Ammo:3}, Speed: 0.1, Teleport:{ Dist: 35, Angle: 270, AngleRand: 180}, Dec: 10, onHitDieExpire:    {Do:'explode',DMG:{Dmg:7,T:'explo'}, Dist: 80}},
        {T:'missle',  gunS:0,GunSpeed: 10, Use:{Missile:1}, Speed: 12, SpeedT: 4, Dec: 400, AimRadius: 120, DMG:{Dmg:3,T:'explo'},},
        {T:'missleR', gunS:0,GunSpeed: 6,  Use:{Missile:5}, Speed: 12, AtOnce: 8, SpeedT: 6, Dec: 95, AimRadius: 60, DMG:{Dmg:3,T:'explo'},},
        {T:'bomb',    gunS:0,GunSpeed: 5,  Use:{Bomb:1}, Speed: 10, Dec: 30, explodePreset:'NailsBigCircle'},
        {T:'tele',    gunS:0,GunSpeed: 3,  ModUse:{TeleJump:1}, Speed: 400, Dec: 1},
    ],
    Modules:[
        {T:'shieldProd',Disabled:0,Prod:0,E:0,Emin:0.1,Emax:1,ProdX:1,ifProd:30 },
        {T:'spotRegion',Disabled:1,Prod:0,E:0,Emin:4,Emax:4, ProdX:1,ifProd:1 },
        {T:'moduleProd',Disabled:0,Prod:0,E:0,Emin:2,Emax:4, ProdX:4,ifProd:60, subT:'TeleJump', ModStorage:'TeleJump'},
        {T:'Prod',      Disabled:0,Prod:0,E:0,Emin:2,Emax:4, ProdX:4,ifProd:40,subT:'Bullet',Storage:'Ammo'},
        {T:'esteemProd',Disabled:1,Prod:0,E:0,Emin:1,Emax:1, ProdX:1,ifProd:9000 },
        {T:'healerProd',Disabled:0,Prod:0,E:0,Emin:4,Emax:16,ProdX:1,ifProd:90 },
        {T:'Prod',      Disabled:0,Prod:0,E:0,Emin:1,Emax:10,ProdX:1,ifProd:60,subT:'Bomb',Storage:'Bomb'},
        {T:'Prod',      Disabled:0,Prod:0,E:0,Emin:1,Emax:6, ProdX:4,ifProd:4,subT:'Missile',Storage:'Missile'},
        {T:'moduleProd',Disabled:1,Prod:0,E:0,Emin:2,Emax:4, ProdX:6,ifProd:240, subT:'Laser', ModStorage:'Laser'},
        {T:'Prod',      Disabled:0,Prod:0,E:0,Emin:2,Emax:4, ProdX:4,ifProd:60,subT:'Bullet',Storage:'Ammo'},
        {T:'Prod',      Disabled:0,Prod:0,E:0,Emin:6,Emax:12,ProdX:4,ifProd:5,subT:'Bullet',Storage:'Ammo'},
        {T:'radar',     Disabled:1,Prod:0,E:0,Emin:1,Emax:30,ProdX:20,ifProd:360,Radius:2500},
    ],
    SpecialMoves:{
        1:{T:'changeAll', Dec: 16, angleBy: -7, timesBy:3, Dist: 10, Angle: 180},
        2:{T:'changeAll', Dec: 16, angleBy: 7 , timesBy:3, Dist: 10, Angle: 180},
        3:{T:'teleportTo', Dec: 10, Dist: 70, Angle: -90, AngleRand: 190},
        4:{T:'changePosition', Dec:12, timesBy: 5, Dist: 10, Angle: 180},
    },
};
