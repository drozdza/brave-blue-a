function MenuShipBuildingObject(){

    this.money = 999000;
    this.width = 100;
    this.height = 100;

    this.useShipyardShip = false; // to drop later

    this.SHIPelems = {};
    this.SHIP = false; // Current Ship
    this.elementsType = 'hull';
    this.sliderMouseMovement = false;


    // =================== Inicjalization ======================================
    this.startAnimation = function(){
        this.resize();
        this.useShipyardShip = true;
    }
    this.stopAnimation = function(){}

    this.resize = function(){
        this.width = $(window).width();
        this.height = $(window).height();

        $('#shipyardContainer')
            .attr({width: this.width+'px',height: this.height+'px'})
            .css( {width: this.width+'px',height: this.height+'px'});
    }

    this.makeMenuShip = function(){
        this.resize();

        this.SHIPelems = {};
        for(var e in BBAdata.SHIPelements)
            this.SHIPelems[e] = {S:false};

        var html ='';
        html += '<div id="GoToStarMap">StarMap</div>';
        html += '<div class="shipProperties"></div>';
        html += '<div class="elementsTypeMenu"></div>';
        html += '<div class="detailedShipProperties"></div>';
        html += '<div class="shipElements advancedScroll"></div>';
        html += '<div class="elementsList advancedScroll"></div>';
        $('#shipyardContainer').html(html);

        this.buildAdvancedScrolling();

        this.buildShip();

        this.showElementsTypeMenu();
        this.showShipProperties();

        this.showShipElementsPropertiesList();
        this.showShipElementsList();
        this.toggleShipElementsList();

        this.buildEminMaxSliders();

        $('.typeMenuElement').click(function(){ MENU.SB.changeElementsType( $(this).attr('typeMenuElement') ); });

        $(window).on('resize', function(){ MENU.SB.resize(); });

        $('#GoToStarMap').click(function(){ MENU.startStarMapMenu(); });

        $('#shipyardContainer').on('click','.shipElement:not(.disabled)',function(){
            console.log('UU');
            MENU.SB.toggleShipElement( $(this).attr('elementName') );
        });
    }

    // ==================== JS FUNCTIONS =======================================
    this.buildAdvancedScrolling = function(){
        __advancedScrollNumber = 0;
        $('.advancedScroll').each(function(){
            $(this).html(
                  '<div class="containerHandler">'
                    + '<div class="container"  scrollNumber="'+__advancedScrollNumber+'" style="top: 10px;"></div>'
                + '</div>'
                + '<div class="scrollHandler">'
                    + '<div class="scrollUp" scrollNumber="'+__advancedScrollNumber+'"></div>'
                    + '<div class="scrollBox">'
                        + '<div class="scrollBit"></div>'
                    + '</div>'
                    + '<div class="scrollDown" scrollNumber="'+__advancedScrollNumber+'"></div>'
                + '</div>'
            );
            __advancedScrollNumber++;
        });
        delete __advancedScrollNumber;
        $('.advancedScroll .scrollUp').click(function(){
            var scrollNumber = $(this).attr('scrollNumber');
            $('.container[scrollNumber='+scrollNumber+']').css({'top': '-=-90'});
        });
        $('.advancedScroll .scrollDown').click(function(){
            var scrollNumber = $(this).attr('scrollNumber');
            $('.container[scrollNumber='+scrollNumber+']').css({'top': '-=90'});
        });
    }

    this.buildEminMaxSliders = function(){
        $('.EminMax .minEmin').click(function(){
            var elementName = $(this).parents('.EminMax').attr('elementName');
            MENU.SB.changeSliderEminMax(elementName, '-', 'min');
        });
        $('.EminMax .maxEmin').click(function(){
            var elementName = $(this).parents('.EminMax').attr('elementName');
            MENU.SB.changeSliderEminMax(elementName, '+', 'min');
        });
        $('.EminMax .minEmax').click(function(){
            var elementName = $(this).parents('.EminMax').attr('elementName');
            MENU.SB.changeSliderEminMax(elementName, '-', 'max');
        });
        $('.EminMax .maxEmax').click(function(){
            var elementName = $(this).parents('.EminMax').attr('elementName');
            MENU.SB.changeSliderEminMax(elementName, '+', 'max');
        });

        $('.EminMax .sliderMinAchnor').mousedown(function(event){
            var elementName = $(this).parents('.EminMax').attr('elementName');
            MENU.SB.sliderMouseMoveStart(elementName, event.offsetX, 'min');

        });
        $('.EminMax .sliderMaxAchnor').mousedown(function(event){
            var elementName = $(this).parents('.EminMax').attr('elementName');
            MENU.SB.sliderMouseMoveStart(elementName, event.offsetX, 'max');
        });
        $(document).mouseup(function(){
            MENU.SB.sliderMouseMovement = false;
        }).mousemove(function(event){
            if(MENU.SB.sliderMouseMovement){
                MENU.SB.sliderMouseMoved(event);
            }
        });

        this.setEminMaxSliders();
    }
    this.changeSliderEminMax = function(elementName, what, minMax){
        var Evar = this.SHIPelems[elementName];
        var Edata = BBAdata.SHIPelements[elementName].ModData;
        var Emin = Edata.Emin;
        var Emax = Edata.Emax;

        if(what == '+'){
            if(minMax=='max')
                if(Evar.Emax- -0.1 <= Emax.max) Evar.Emax -=- 0.1;
            if(minMax=='min')
                if(Evar.Emin- -0.1 <= Emin.max && Evar.Emin- -0.1 <= Evar.Emax) Evar.Emin -=- 0.1;
        }
        if(what == '-'){
            if(minMax=='max')
                if(Evar.Emax-0.1 >= Emax.min && Evar.Emax-0.1 >= Evar.Emin) Evar.Emax -= 0.1;
            if(minMax=='min')
                if(Evar.Emin-0.1 >= Emin.min) Evar.Emin -= 0.1;
        }
        this.showChangesSliderEminMax(elementName);
    }
    this.sliderMouseMoveStart = function(elementName, offsetX, minMax)
    {
        this.sliderMouseMovement = {
            elementName: elementName,
            offsetX: offsetX,
            minMax: minMax,
        };
    }
    this.sliderMouseMoved = function(event){
        var e = this.sliderMouseMovement.elementName;
        var offsetX = this.sliderMouseMovement.offsetX;
        var minMax = this.sliderMouseMovement.minMax;

        var Evar = this.SHIPelems[e];
        var Edata = BBAdata.SHIPelements[e].ModData;
        var Emin = Edata.Emin;
        var Emax = Edata.Emax;

        var RangeMin = Emin.min;
        var RangeMax = Emax.max;
        var Range = RangeMax-RangeMin;

        var TotWidth = $('.EminMax[elementName="'+e+'"] .EminMaxSlider').width();
        var SliderX = $('.EminMax[elementName="'+e+'"] .EminMaxSlider').offset().left;


        var Pos = event.clientX - offsetX;
        if(minMax=='max') Pos-=- 5;
        if(minMax=='min') Pos-=- 22;
        var PosX = Pos-SliderX;
        var Percente = PosX/TotWidth;
        var TrySet = RangeMin- -Percente*Range;
        TrySet = parseInt(TrySet*10)/10;

        if(minMax=='max'){
            Evar.Emax = TrySet;
            if(Evar.Emax < Emax.min) Evar.Emax = Emax.min;
            if(Evar.Emax < Evar.Emin) Evar.Emax = Evar.Emin;
            if(Evar.Emax > Emax.max) Evar.Emax = Emax.max;
        }
        if(minMax=='min'){
            Evar.Emin = TrySet;
            if(Evar.Emin > Evar.Emax) Evar.Emin = Evar.Emax;
            if(Evar.Emin > Emin.max) Evar.Emin = Emin.max;
            if(Evar.Emin < Emin.min) Evar.Emin = Emin.min;

        }

        this.showChangesSliderEminMax(e);
    }
    this.setEminMaxSliders = function(){
        $('.EminMax').each(function(){
            var elementName = $(this).attr('elementName');
            MENU.SB.showChangesSliderEminMax(elementName);
        });
    }
    this.showChangesSliderEminMax = function(elementName){
        console.log(elementName);
        var Evar = this.SHIPelems[elementName];
        var Edata = BBAdata.SHIPelements[elementName].ModData;
        var Emin = Edata.Emin;
        var Emax = Edata.Emax;

        var RangeMin = Emin.min;
        var RangeMax = Emax.max;
        var Range = RangeMax-RangeMin;

        if(typeof Evar.Emin == 'undefined'){
            Evar.Emin = Emin.min;
            Evar.Emax = Emax.max;
        }

        $('.EminMax[elementName="'+elementName+'"] .sliderMinAchnor').css({right: ((RangeMax-Evar.Emin)/Range)*100+'%'});
        $('.EminMax[elementName="'+elementName+'"] .sliderMaxAchnor').css({left: ((Evar.Emax-RangeMin)/Range)*100+'%'});
        $('.EminMax[elementName="'+elementName+'"] .activeSliderPart').css({
            left: ((Evar.Emin-RangeMin)/Range)*100+'%',
            width: ((Evar.Emax-Evar.Emin)/Range)*100+'%'
        });
        console.log(Evar.Emin);
        $('.EminMax[elementName="'+elementName+'"] .actualEmin').html(Evar.Emin.toFixed(1));
        $('.EminMax[elementName="'+elementName+'"] .actualEmax').html(Evar.Emax.toFixed(1));
    }

    this.showElementsTypeMenu = function(){
        var TypeMenu = {
            hull:    'Hull',
            engine:  'Engine',
            weapons: 'Weapons',
            modules: 'Modules',
        };
        var html = '';
        for(var tm in TypeMenu){
            html +='<div class="typeMenuElement" typeMenuElement="'+tm+'">'+TypeMenu[tm]+'</div>';
        }
        $('.elementsTypeMenu').html(html);
    }

    // =================== SHOW SHIP PROPERTIES ================================
    this.showShipProperties = function(){
        var html='';

        html += '<div class="goldTotal">';
            html +=' '+(MENU.CM.goldTotal - this.SHIP.Price);
            html +='<span class="goldTotal">'+MENU.CM.goldTotal+'</span>';
        html +='</div>';
        html +='<div class="basicProperties">';
            html += '<span>Price:  '+this.SHIP.Price+'</span>';
            html += '<span>Weight: '+this.SHIP.Weight+'</span>';
            html += '<span>Life:   '+this.SHIP.lifeM+'</span>';
            html += '<span>Energy: '+this.SHIP.EnergyM+'</span>';
            html += '<span>Speed:  '+this.SHIP.speedM+'</span>';
        html += '</div>';

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


    // ======================= SHIP ELEMENTS PROPERTIES LIST ===================
    this.showShipElementsPropertiesList = function(){
        var html = '';
        for(var e in BBAdata.SHIPelements){
            html += this.showShipElementProperties(BBAdata.SHIPelements[e], e);
        }

        $('.shipElements .container').html(html);
    }
    this.showShipElementProperties = function(E,e){
        var html = '';

        html+='<div class="shipElementProp" elementName="'+e+'"';
            if(!this.SHIPelems[e].S) html+=' style="display: none;"';
        html+='>';
            html+=e;

            if(typeof E.ModSet != 'undefined')
                for(var ms in E.ModSet){
                    if(ms =='EminMax') html+=this.showShipElement_EminMax(E,e);
                }
            // tutaj duzo html
        html+='</div>';

        return html;
    }
    this.showShipElement_EminMax = function(E,e){
        var html='';

        var Edata = BBAdata.SHIPelements[e].ModData;
        var Emin = Edata.Emin;
        var Emax = Edata.Emax;

        html +='<div class="EminMax" elementName="'+e+'">';
            html +='<div class="EminMaxTitle">Module Energy Input</div>';
            html +='<div class="EminProp">';
                html +='<div class="minEmin">'+Emin.min+'</div>';
                html +='<div class="actualEmin">'+Emin.min+'</div>';
                html +='<div class="maxEmin">'+Emin.max+'</div>';
            html +='</div>';
            html +='<div class="EminMaxSliderBackground">';
                html +='<div class="EminMaxSlider">';
                    html +='<div class="activeSliderPart"></div>';
                    html +='<div class="sliderMinAchnor"></div>';
                    html +='<div class="sliderMaxAchnor"></div>';
                html +='</div>';
            html +='</div>';
            html +='<div class="EmaxProp">';
                html +='<div class="minEmax">'+Emax.min+'</div>';
                html +='<div class="actualEmax">'+Emax.max+'</div>';
                html +='<div class="maxEmax">'+Emax.max+'</div>';
            html +='</div>';
        html +='</div>';

        return html;
    }
    // ======================= SHIP ELEMENTS LIST ==============================
    this.showShipElementsList = function(){
        var html1='',html2='';
        for(var e in BBAdata.SHIPelements){
            var E = BBAdata.SHIPelements[e];
            if(typeof E.whereElem != 'undefined')
                html1 += this.showShipElement(E,e);
            else if(typeof E.where != 'undefined')
                html2 += this.showShipElement(E,e);
        }

        $('.elementsList .container').html(html1+'<hr>'+html2);
    }
    this.showShipElement = function(E,e){
        var html = '';

        html+='<div class="shipElement';
        if(this.SHIPelems[e].S) html+=' choosen';
        html+='" elementName="'+e+'">';
            html+=e;
            html+='<span class="weight">'+E.Weight+'</span>';
            html+='<span class="price">'+E.Price+'</span>';
        html+='</div>';
        return html;
    }
    this.toggleShipElementsList = function(){
        $('.shipElement').hide().removeClass('disabled');
        var goldLeft = MENU.CM.goldTotal - this.SHIP.Price;
        for(var e in BBAdata.SHIPelements){
            var E = BBAdata.SHIPelements[e];
            var show = true;
            var disable = false;

            if(typeof E.whereElem !='undefined' && this.SHIPelems[ E.whereElem ].S === false)
                show = false;

            if(typeof E.where !='undefined' && E.where != this.elementsType)
                show = false;

            if(goldLeft < E.Price)
                disable = true;

            if(typeof E.EnergyM != 'undefined' && this.SHIP.EnergyM- -E.EnergyM < 0)
                disable = true;

            if(typeof E.campainFlags != 'undefined'){
                // require some quest flags
                // ...
                show = false;
            }

            if(show)    $('.shipElement[elementName="'+e+'"]').show();
            if(disable) $('.shipElement[elementName="'+e+'"]:not(.choosen)').addClass('disabled');
        }

    }

    this.toggleShipElement = function(elementName){
        if(this.SHIPelems[elementName].S === false){
            $('.shipElement[elementName="'+elementName+'"]').addClass('choosen');
            $('.shipElementProp[elementName="'+elementName+'"]').show();
            this.SHIPelems[elementName].S = true;
        }else{
            $('.shipElement[elementName="'+elementName+'"]').removeClass('choosen');
            $('.shipElementProp[elementName="'+elementName+'"]').hide();
            this.SHIPelems[elementName].S = false;
        }
        this.buildShip();
        this.showShipProperties();
        this.toggleShipElementsList();
    }
    this.changeElementsType = function(elementsType){
        this.elementsType = elementsType;
        this.toggleShipElementsList();
    }
    // ===================== Building the Ship Stats ===========================
    this.buildShip = function(){
        this.SHIP = cloneObj(BBAdata.SHIPempty);

        // adding Elements
        for(var elementName in this.SHIPelems){
            var Evar = this.SHIPelems[elementName];
            var Edata = BBAdata.SHIPelements[elementName];

            if(!Evar.S) continue;

            for(var i in Edata){
                switch(i){
                    case 'Weight':
                    case 'lifeM':
                    case 'EnergyM':
                    case 'Price':
                    case 'speed':
                    case 'engineMultiply':
                        this.SHIP[i]-=-Edata[i];
                    break;
                    case 'Storage':
                        this.buildShip_Storage(Edata.Storage);
                    break;
                    case 'WeaponData':
                        this.buildShip_WeaponData(Edata.WeaponData);
                    break;
                    case 'ModData':
                        this.buildShip_ModData(Edata);
                    break;
                }
            }
        }

        // counting maxSpeed
        this.SHIP.speedM = Energy2Speed(this.SHIP.EnergyM, this.SHIP.Weight, this.SHIP.engineMultiply);
        // full life at start
        this.SHIP.life = this.SHIP.lifeM;
        // start speed under max speed
        if(this.SHIP.speed > this.SHIP.speedM) this.SHIP.speed = this.SHIP.speedM;
    }
    this.buildShip_Storage = function(StorageData){
        for(var storageType in StorageData){
            if(typeof this.SHIP.Storage[storageType] == 'undefined')
                this.SHIP.Storage[storageType] = {M:0,R:0};

            for(var i in StorageData[storageType])
                this.SHIP.Storage[storageType][i] -=- StorageData[storageType][i];
        }
    }
    this.buildShip_WeaponData = function(WeaponData){
        var FireTypeI = this.SHIP.FireTypes.length;
        console.log(FireTypeI);
        this.SHIP.FireTypes[FireTypeI] = cloneObj(WeaponData);

        if(this.SHIP.FireType === false) this.SHIP.FireType = FireTypeI;
        if(this.SHIP.FireType2 === false) this.SHIP.FireType2 = FireTypeI;
        return FireTypeI;
    }

    this.buildShip_ModData = function(ShipData){
        var ModI = ShipData.ModPlace;
        this.SHIP.Modules[ModI] = cloneObj(ShipData.ModData);
    }
}

// =============================================
/*
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
};*/

BBAdata.SHIPempty={
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
    ShowFireRange: false,
    ShowAmmoIndicator: false,
    GlueFireToEstimated: false,
    GlueFireToLaser: false,
    KeysModules:{},
    FireType: false,
    FireType2: false,
    MouseDown1: false,
    MouseDown2: false,
    EnergyFieldMax: 0,
    Storage:{},
    FireTypes:[],
    Modules:[],
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
    KeysModules:{66:[6],69:[0,5],73:[3,9,10],77:[7],84:[2],81:[4],70:[8],82:[11]},
    FireType: 0,
    FireType2: 8,
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
