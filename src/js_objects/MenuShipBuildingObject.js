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
    this.UPHtml={};

    this.showUpgrades = function(){
        this.prepareUpgradesHtml();
        var html='';

        for(var i in this.UPHtml)
            html+='<div class="upgradesType" id="upgradesType_'+i+'"><div class="upgradesTitle">'+BBAdata['SHIPupgradesK'][i]+'</div><div class="upgradesContent">'+this.UPHtml[i].join('')+'</div></div>';

        $('#upgradesTable')
            .html(html)
            .on('click','.upgradesType',function(){ MENU.SB.clickUpgradeTitle( $(this).attr('id').split('_')[1] );    })
            .on('click','.upgradeClickAdd',function(){ MENU.SB.clickUpgradeAdd( $(this).attr('id').split('_')[1] ); })
            .on('click','.upgradeClickDel',function(){ MENU.SB.clickUpgradeDel( $(this).attr('id').split('_')[1] ); });
    }
    this.prepareUpgradesHtml = function(){
        this.UPHtml={};
        for(var u in BBAdata['SHIPupgrades'])
            this.showUpgrade(u,true);
    }
    this.showUpgrade = function(u,dontPutNewHtmlOnPlace){
        var U = BBAdata['SHIPupgrades'][u];
        var html = '';

        html += '<div class="upgrade">';

        html += U.T;

        html += '<div class="upgradeClickAdd" id="upgradeClickAdd_'+u+'">+</div>';
        html += '<div class="upgradeClickDel" id="upgradeClickDel_'+u+'">-</div>';


        html += '</div>';

        if(typeof this.UPHtml[U.K] == 'undefined') this.UPHtml[U.K]=[];
        this.UPHtml[U.K][U.P] = html;

        if(!dontPutNewHtmlOnPlace)
            $('#upgradesType_'+U.K).html('<div class="upgradesTitle">'+BBAdata['SHIPupgradesK'][U.K]+'</div><div class="upgradesContent">'+this.UPHtml[U.K].join('')+'</div>');
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
    this.clickUpgradeAdd = function(id){
        if(!this.ableToAddUpgrade(id))
            return false;
        if(typeof this.addedUpgrades[id] == 'undefined')
            this.addedUpgrades[id] = 0;
        ++this.addedUpgrades[id];

        this.showUpgrade(id);
        this.showShipTable();
    }
    this.clickUpgradeDel = function(id){
        --this.addedUpgrades[id];
        if(this.addedUpgrades[id]==0)
            delete this.addedUpgrades[id];
        this.showUpgrade(id);
        this.showShipTable();
    }
}
