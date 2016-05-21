function MENUobject(){

    this.ShipPresetChoosen = 'start';
     this.start = function(){
        this.makeMenuBoards();
        this.makeMenuShip();
        this.showMenu='Boards';
        $('.ToggleMenu').click(function(){ MENU.toggleMenu(); });
    }

    this.getMenu = false;

    this.makeMenuBoards = function(){
        this.getMenu = new GetMenuObject();
        var html = '';
        html+='<div class="keys">';
            html+='<span>1-9 - change Fire Type</span>';
            html+='<span>P - pause</span>';
            html+='<span>ESC - end level</span>';
        html+='</div>';

        html+='<div class="ShipPresets"><span>Choose: </span>';
        for(var m in BBAdata['SHIPpresets'])
            html+='<div class="chooseShipPresets" id="chooseShipPresets_'+m+'">'+m+'</div>';
        html+='</div>';


        for(var m in BBAdata['MAPS'])
            html+='<div class="MainMenuButton" id="MainMenuButton_'+m+'">'+m+'</div>';

        $('#Menu').append(this.getMenu.makeHtml()+'<div id="MenuBoards">'+html+'</div>');

        $('.chooseShipPresets').unbind().click(function(){  MENU.click_chooseShipPresets( $(this).attr('id').split('_')[1] ); });
        $('#chooseShipPresets_'+this.ShipPresetChoosen).addClass('choosenPreset');
        
        $('.MainMenuButton').unbind().click(function(){  MENU.click_MainMenuButton( $(this).attr('id').split('_')[1] ); });
    }
    this.click_chooseShipPresets = function(id){
        $('.chooseShipPresets').removeClass('choosenPreset');
        $('#chooseShipPresets_'+id).addClass('choosenPreset');
        this.ShipPresetChoosen = id;
    }
    this.click_MainMenuButton = function(id){
        $('#Menu').hide();
        if(typeof GAME != 'undefined')
            delete GAME;
        if(typeof CanvasManager != 'undefined')
            delete CanvasManager;
        CanvasManager = new CanvasManagerObject();
        CanvasManager.start();
        GAME = new GAMEobject();
        GAME.start(BBAdata['MAPS'][id],cloneObj(BBAdata['SHIPpresets'][this.ShipPresetChoosen]));
    }
    this.toggleMenu = function(){
        if(this.showMenu=='Ship')    this.hideMenuShip();
                else                this.showMenuShip();
    }
    this.hideMenuShip = function(){
        this.showMenu = 'Boards';
        $('#MenuShip').animate({left:'100%'},500);
    }
    this.showMenuShip = function(){
        this.showMenu = 'Ship';
        $('#MenuShip').animate({left:'12%'},500);
    }


    this.makeMenuShip = function(){
        var html = '';
        html+='<div id="moneyTable">'+this.money+'</div>';
        html+='<div id="shipTable"></div>';
        html+='<div id="upgradesTable"></div>';
        html+='<div class="ToggleMenu"></div>';
        $('#Menu').append('<div id="MenuShip" style="left: 100%;">'+html+'</div>');
        this.showUpgrades();
        this.showShipTable();
    }

    this.money = 999000;

    this.SHIPempty={
        Weight: 20,
        lifeM: 1,
        EnergyM: 0,
        SpeedM: 0,
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
        FireTypes:[],
        Modules:[],
    };

    this.SHIP={};
    this.addedUpgrades={};

    this.showUpgrades = function(){
        var html='',up=['','','',''];
        for(var u in BBAdata['SHIPupgrades']){
            var U = BBAdata['SHIPupgrades'][u];
            up[U.K]+='<div class="upgrade upgradeClick" id="upgradeClick_'+u+'">'+U.T+'</div>';
        }
        for(var i=0; i < up.length; ++i)
            if(up[i]!='')
                html+='<div class="upgradesType" id="upgradesType_'+i+'"><div class="upgradesTitle">Upgr: '+i+'</div><div class="upgradesContent">'+up[i]+'</div></div>';
        $('#upgradesTable').html(html);
        $('.upgradesType').click(function(){ MENU.clickUpgradeTitle( $(this).attr('id').split('_')[1] );    });
        $('.upgradeClick').click(function(){ MENU.clickUpgrade( $(this).attr('id').split('_')[1] ); });
    }
    this.clickUpgradeTitle = function(id){
        $('.upgradesType').removeClass('wybrany');
        $('#upgradesType_'+id).addClass('wybrany');
    }
    this.showShipTable = function(){
        var html='';
        this.SHIP={};
        for(var e in this.SHIPempty){
            if(typeof this.SHIPempty[e] == 'array')    this.SHIP[e]=[];
            else if(typeof this.SHIPempty[e] == 'object')    this.SHIP[e]={};
            else this.SHIP[e] = this.SHIPempty[e];
        }
        var totPrice = 0;
        for(var u in this.addedUpgrades){
            var U = BBAdata['SHIPupgrades'][u];
            totPrice -=- U.price;
            for(var a in U.attr){
                for(var e in U.attr[a]){
                    this.SHIP[ e ] -=- U.attr[a][e];
                }
            }
        }
        html+='Weight: '+this.SHIP.Weight+'<br/>';
        html+='Life: '+this.SHIP.lifeM+'<br/>';
        html+='Energy: '+this.SHIP.EnergyM+'<br/>';
        $('#moneyTable').html(this.money-totPrice);
        $('#shipTable').html(html);
    }
    this.clickUpgrade = function(id){
        if(typeof this.addedUpgrades[id] == 'undefined')  this.addUpgrade(id);
                        else                              this.removeUpgrade(id);
        this.showShipTable();
    }
    this.addUpgrade = function(id){
        this.addedUpgrades[id] = 1;
        $('#upgradeClick_'+id).addClass('on_ship');
    }
    this.removeUpgrade = function(id){
        delete this.addedUpgrades[id];
        $('#upgradeClick_'+id).removeClass('on_ship');
    }
}
