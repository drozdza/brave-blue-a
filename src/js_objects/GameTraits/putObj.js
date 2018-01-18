// to do refaktoryzacji
GAMEobject.prototype.putObj_getModules = function(moduleName, moduleData){
    var Omods = {};

    if(typeof BBAdata.ObjectMod[moduleName] == 'undefined'){
        console.log('ObjectMod "'+moduleName+'" not found!');
        return {};
    }

    Omods = cloneObj(BBAdata.ObjectMod[moduleName]);

    if(Omods.LoadModules){
        for(var mmName in Omods.LoadModules){
            carefullyMergeObjects(Omods, this.putObj_getModules(mmName, Omods.LoadModules[mmName]) );
        }
    }
    carefullyMergeObjects(Omods, moduleData);
    return Omods;
}

GAMEobject.prototype.putObj_fromArray = function(O){

    if(typeof BBAdata.ObjectData[O.T] != 'undefined'){
        var OD = BBAdata.ObjectData[O.T];

        if(OD.LoadModules){
            Omods = {};
            for(var moduleName in OD.LoadModules)
                carefullyMergeObjects(Omods, this.putObj_getModules(moduleName, OD.LoadModules[moduleName]));
            carefullyMergeObjects(O, Omods);
        }

        carefullyMergeObjects(O, OD);
        // O = carefullyMergeObjects(OD, O);

        delete(O.LoadModules);
    }

    if(O.explodePreset || O.exploAddTo || O.onHitDieExpire)
        this.cloneExplosionData(O, O);

    return O;
}


GAMEobject.prototype.putObj = function(Type,Side,x,y){
    var MapRadius = 1000;
    if(typeof x === "undefined"){
        do{
            x = Math.random()*MapRadius*2-MapRadius;
            y = Math.random()*MapRadius*2-MapRadius;
        }while( Math.sqrt(x*x- -y*y) > MapRadius );
    }
    var L = this.Olen++;

    var O={};
    O.x = x;
    O.y = y;
    O.S = Side;
    O.T = Type;
    O.bornTime = this.tick;
    O.periodDMG = {};
    O.radius = 15;
    O.TT = 'dust';

    O = this.putObj_fromArray(O,Type);

    var Mode = O.M;


    if(O.shipVariables)
        this.putObj_shipVariables(O);

    if(O.TT=='enemy'){
        this.Enemies[ L ] = 1;
        O.angle           = parseInt(Math.random()*360);
        O.mapType         = 'E';
        O.mapCollide      = ['M'];
    }

    if(Type=='healing_missile' || Type=='energy_field_missile' || Type=='missile' || Type=='bullet_bomb' || Type=='space_mine' || Type=='shieldBlob'){
        if(Side==2){
            O.mapType = 'M';
            O.mapCollide = ['E','ME','A'];
        } else{
            O.mapType = 'ME';
            O.mapCollide = ['P','M'];
        }
    }

    if(Mode=='region'){
        O.mapType = 'R';
        O.mapCollide = ['P','E','M','ME','A'];
    }

    if(Type=='EndPortal'){
        O.mapType = 'A';
        O.mapCollide = ['P'];
    }

    if(O.T=='healing_missile' || O.T=='energy_field_missile'){
        O.mapCollide = ['E'];
    }

    O.life = O.lifeM;

    this.O[ L ] = O;

    this.putObj_changeMode(L, Mode);
    this.tryBuildSquads(O,L);

    if(Type!='shieldBlob')
        CanvasManager.requestCanvas( L );

    if(O.view && O.view.onBackground)
        CanvasManager.CBM.addObjectToBackground( L );

    this.putOnXY( L );
    return L;
}
GAMEobject.prototype.putObj_changeMode = function(L, newMode){
    var O = this.O[L];
    var oldMode = O.M;
    O.M = newMode;

    if(oldMode == 'comp' && newMode != 'comp')
        delete this.Ocomp[ L ];
    if(newMode == 'comp')
        this.Ocomp[ L ] = O.S;

    if(oldMode == 'region' && newMode != 'region')
        delete this.Oregion[ L ];
    if(newMode == 'region')
        this.Oregion[ L ] = 1;

    if((oldMode=='static' || oldMode=='region') && (newMode!='static' && newMode!='region'))
        delete this.Omoving[ L ];
    if(newMode!='static' && newMode!='region')
        this.Omoving[ L ] = 1;

}
GAMEobject.prototype.putBullet = function(Side,x,y,Speed,Dec,Angle,DMG){
    var O={};
    O.x = x;
    O.y = y;
    O.S = Side;
    O.T = 'bullet';
    O.M = 'comp';
    O.bornTime = this.tick;
    O.periodDMG={};
    O.TT = 'dust';

    O.speed  = Speed || 12;
    O.angle  = Angle  || 0;
    O.radius = 4;
    O.dec    = Dec || 30;
    O.DMG  = DMG || {Dmg:1,T:'normal'};

    ++this.C['B_bullets'];
    ++this.C['B_s'+Side+'_bullets'];

    if(Side==3){
        O.mapType = 'B';
        O.mapCollide = ['P','M','E','ME','A','R'];
    }else if(Side==2){
        O.mapType = 'B';
        O.mapCollide = ['E','ME','A','R'];
    }else{
        O.mapType = 'BE';
        O.mapCollide = ['P','M','R'];
    }

    var L = this.Olen++;
    this.Obullet[ L ] = Side;
    this.Omoving[ L ] = 1;
    this.O[ L ]= O;

    return L;
}

GAMEobject.prototype.tryBuildSquads = function(O,L){
    if(O.squadSchemeType || O.squadSchemeTypeArray)
        this.prepareSquadScheme(O,L);
    if(O.prepareSquadScheme || O.squadScheme)
        this.setFlagSquadFull(O);
}
GAMEobject.prototype.putObj_shipVariables = function(O){

    for(var i in {speedArr:1,spotArr:1})
        for(var j=0; j<4; ++j)
            for(var k in O[i][j])
                if(typeof O[i][j][k] == 'object' && typeof O[i][j][k].shipVar != 'undefined')
                    O[i][j][k] = this.getShipVariable(O, O[i][j][k]);

    delete O.shipVariables;
    this.changeSpeedLvl(O,O.speedLvl);
    return O;
}

GAMEobject.prototype.getShipVariable = function(O,VarRequest){
    var variable;

    var VarDef = O.shipVariables[ VarRequest.shipVar ];
    if(VarDef.Rand){
        VarDef.Const -=- Math.random()*VarDef.Rand;
        delete VarDef.Rand;
    }
    if(VarDef.RandInt){
        VarDef.Const -=- parseInt(Math.random()*VarDef.RandInt);
        delete VarDef.RandInt;
    }

    var V = O.shipVariables[ VarRequest.shipVar ].Const;
    if(VarRequest.Add) V -=- VarRequest.Add;
    return V;
}


GAMEobject.prototype.putObj_animation = function(Type,X,Y,Angle){
    var O = {};
    var o = this.Olen++;

    O.T = Type;
    O.TT = 'anim';
    O.M = 'anim';
    O.x = X;
    O.y = Y;
    O.radius = 15;
    O.angle = 0;
    O.timeTick = 0;


    if(Type=='shipShadow' || Type=='accelerationFire'){
        O.timeDeath = 20;
        O.radius = 15;
        O.angle = Angle;
    }

    if(Type=='hit_healing'){
        O.timeDeath = 25;
        O.radius = 15;
    }
    if(Type=='hit' || Type=='hit_energyField' || Type=='hit_blue' || Type=='hit_red'){
        O.timeDeath = 25;
        O.radius = 30;
    }
    if(Type=='hitBig'){
        O.timeDeath = 21;
        O.radius = 60;
    }
    if(Type=='explosion_35'){
        O.timeDeath = 25;
        O.radius = 35;
        O.angle = parseInt(Math.random()*360);
    }
    if(Type=='explosion_80'){
        O.timeDeath = 25;
        O.radius = 80;
        O.angle = parseInt(Math.random()*360);
    }
    if(Type=='explosion_120'){
        O.timeDeath = 25;
        O.radius = 120;
        O.angle = parseInt(Math.random()*360);
    }
    if(Type=='explosion_210'){
        O.timeDeath = 25;
        O.radius = 210;
        O.angle = parseInt(Math.random()*360);
    }

    this.Oanim[o] = 1;
    this.O[o] = O;
}

GAMEobject.prototype.putObj_directAnim = function(Type,Data){
    var O = {};
    var o = this.Olen++;

    O.T = Type;
    O.TT = 'dirAnim';
    O.M = 'dirAnim';
    O.Data = Data;
    O.x = 0;
    O.y = 0;
    O.timeTick = -1;
    O.timeDeath = Data.timeDeath;

    this.Oanim[o] = 1;
    this.O[o] = O;

    return o;
}


GAMEobject.prototype.removeObj = function(o){
    if(o==0) return false;
    if(typeof this.O[o] == 'undefined') return false;

    if(this.O[o].T=='space_mine'){
        ++this.C['B_minesExplode'];
        --this.C['E:mines'];
    }

    if(this.O[o].T!='bullet' && this.O[o].TT!='bgStars' && this.O[o].TT!='anim' && this.O[o].TT!='dirAnim'){    // Czyli co?

        if(this.O[o].TT=='enemy') this.removeFromXY(o,true);
                else              this.removeFromXY(o);
        delete this.Enemies[o];

        if(typeof this.O[o].squadId !='undefined'){
            var S = this.Squads[ this.O[o].squadId ];
            if(o == S.Leader)
                this.disbandSquad( this.O[o].squadId );
            else
                delete S.Members[o];
        }
    }
    if(this.O[o].TT == 'bgStars') this.removeFromXY(o,true);

    if(this.O[o].TT == 'anim' || this.O[o].TT == 'dirAnim')
        delete this.Oanim[o];

    if(this.O[o].TT == 'enemy' && !this.O[o].onDieDelete){
        this.Odead[ o ]={T:this.O[o].T,x:this.O[o].x,y:this.O[o].y};
        CanvasManager.CBM.addObjectToBackground(o);
    }


    delete this.Omoving[o];
    delete this.Ocomp[o];
    delete this.Obullet[o];
    delete this.Oregion[o];
    if(this.O[o].TT!='enemy' && this.O[o].TT!='bgStars'){
        delete this.O[o];
    }else if(this.O[o].onDieDelete){
        delete this.O[o];
    }
}
