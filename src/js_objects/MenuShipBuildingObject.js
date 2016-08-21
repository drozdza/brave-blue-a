function MenuShipBuildingObject(){

    this.start = function(){


    }
    this.start();


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
        FireTypes:[],
        Modules:[],
    };

    this.SHIP={};
    this.addedUpgrades={};

    this.showUpgrades = function(){
        var html='',up=[];
        for(var u in BBAdata['SHIPupgrades']){
            var U = BBAdata['SHIPupgrades'][u];
            if(typeof up[U.K] == 'undefined') up[U.K]='';
            up[U.K]+='<div class="upgrade upgradeClick" id="upgradeClick_'+u+'">'+U.T+'</div>';
        }

        for(var i in up)
            if(up[i]!='')
                html+='<div class="upgradesType" id="upgradesType_'+i+'"><div class="upgradesTitle">'+BBAdata['SHIPupgradesK'][i]+'</div><div class="upgradesContent">'+up[i]+'</div></div>';

        $('#upgradesTable').html(html);
        $('.upgradesType').click(function(){ MENU.SB.clickUpgradeTitle( $(this).attr('id').split('_')[1] );    });
        $('.upgradeClick').click(function(){ MENU.SB.clickUpgrade( $(this).attr('id').split('_')[1] ); });
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
        this.SHIP.SpeedM = (Math.sqrt(this.SHIP.EnergyM*this.SHIP.engineMultiply))/(this.SHIP.Weight/50);

        html+='Weight: '+this.SHIP.Weight+'<br/>';
        html+='Life: '+this.SHIP.lifeM+'<br/>';
        html+='Energy: '+this.SHIP.EnergyM+'<br/>';
        html+='Engine: '+this.SHIP.engineMultiply+'<br/>';
        html+='MaxSpeed: '+this.SHIP.SpeedM.toFixed(2)+'<br/>';

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
