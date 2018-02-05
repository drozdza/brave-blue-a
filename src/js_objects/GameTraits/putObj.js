GAMEobject.prototype.putObj_getFromType = function(Type,o){
    var O = {o:o};

    if(typeof BBAdata.ObjectData[Type] != 'undefined'){
        var OD = BBAdata.ObjectData[Type];

        if(OD.LoadMods){
            var modO = this.loadInheritedMods(OD.LoadMods, o);
            carefullyMergeObjects(O, modO);
        } else {
            O = cloneObj(OD);
        }
    }
    if(!O.modNames) O.modNames={};
    O.modNames[Type] = 1;

    carefullyMergeObjects(O, BBAdata.ObjectData[Type]);

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

    var o = this.Olen++;
    var O = this.putObj_getFromType(Type,o);
    O.o = o;
    O.x = x;
    O.y = y;
    O.S = Side;
    O.T = Type;
    O.bornTime = this.tick;
    O.periodDMG = {};
    // O.TT = 'dust';

    var Mode = O.M;


    if(O.TT=='enemy'){
        this.Enemies[ O.o ] = 1;
        O.angle           = parseInt(Math.random()*360);
        O.mapType         = 'E';
        O.mapCollide      = ['M'];
    }

    if(Type=='healing_missile' || Type=='energy_field_missile' || Type=='missile' || Type=='bullet_bomb' || Type=='Mine' || Type=='shieldBlob'){
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

    this.O[ O.o ] = O;

    this.addBoardMods(O);

    return O.o;
}

GAMEobject.prototype.initObject = function(O){
    O.life = O.lifeM;
    if(O.lifeTo){
        O.life = O.lifeTo;
        delete(O.lifeTo);
    }

    if(O.shipVariables){
        this.putObj_shipVariables(O);
    }

    CanvasManager.requestCanvas( O );

    if(O.view && O.view.onBackground){
        CanvasManager.CBM.addObjectToBackground( O );
    }
    this.tryBuildSquads(O);

    if(O.explodePreset || O.exploAddTo || O.onHitDieExpire){
        this.cloneExplosionData(O, O);
    }

    if(typeof O.lists == 'undefined') console.log(O.T+' nie ma list!');
    for (var list in O.lists) {
        this[list][O.o] = O.S;
    }

    if(O.M != 'routePoint'){
        this.putOnXY( O );
    }
}

GAMEobject.prototype.putObj_changeLists = function(O, lists){
    for(var list in lists)
        if(typeof O.lists[list] == 'undefined')
            this[list][O.o] = O.S;

    for(var list in O.lists)
        if(typeof lists[list] == 'undefined')
            delete this[list][O.o];

    O.lists = lists;
}

GAMEobject.prototype.putBullet = function(Side,x,y,Speed,Dec,Angle,DMG){
    var O={};
    O.x = x;
    O.y = y;
    O.S = Side;
    O.T = 'bullet';
    O.M = 'comp';
    O.bornTime = this.tick;
    O.periodDMG = {};
    O.TT = 'dust';

    O.speed  = Speed || 12;
    O.angle  = Angle  || 0;
    O.radius = 4;
    O.dec    = Dec || 30;
    O.DMG   = DMG || {Dmg:1,T:'normal'};

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

    var o = this.Olen++;
    this.Obullet[ o ] = Side;
    this.Omoving[ o ] = 1;
    this.O[ o ] = O;
    this.O[ o ].o = o;

    return o;
}

GAMEobject.prototype.tryBuildSquads = function(O){
    if(O.squadSchemeType || O.squadSchemeTypeArray)
        this.prepareSquadScheme(O);
    if(O.prepareSquadScheme || O.squadScheme)
        this.setFlagSquadFull(O);
}
GAMEobject.prototype.putObj_shipVariables = function(O){
    if(typeof O.shipVariables == 'undefined') return false;

    for(var i in {speedArr:1,spotArr:1}){
        for(var j=0; j<4; ++j){
            for(var k in O[i][j]){
                if(typeof O[i][j][k] == 'object' && typeof O[i][j][k].shipVar != 'undefined'){
                    O[i][j][k] = this.getShipVariable(O, O[i][j][k]);
                }
            }
        }
    }

    delete O.shipVariables;
    this.changeSpeedLvl(O, O.speedLvl);
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
    if(typeof this.O[o] == 'undefined'){
        // debugLog('Error: Object '+o+' allready not exists. Cannot removeObj()');
        return false;
    }
    if(this.O[o].notInited){
        errorLog('Error: Object '+this.O[o].t+'['+o+'] not inited yet.');
    }

    if(this.O[o].T=='Mine'){
        ++this.C['B_minesExplode'];
        --this.C['E:mines'];
    }

    if(this.O[o].T!='bullet' && this.O[o].TT!='bgStars' && this.O[o].TT!='anim' && this.O[o].TT!='dirAnim'){    // Czyli co?

        if(this.O[o].TT=='enemy') this.removeFromXY(this.O[o],true);
                else              this.removeFromXY(this.O[o]);
        delete this.Enemies[o];

        if(typeof this.O[o].squadId !='undefined'){
            var S = this.Squads[ this.O[o].squadId ];
            if(o == S.Leader)
                this.disbandSquad( this.O[o].squadId );
            else
                delete S.Members[o];
        }
    }
    if(this.O[o].TT == 'bgStars') this.removeFromXY(this.O[o],true);

    if(this.O[o].TT == 'anim' || this.O[o].TT == 'dirAnim')
        delete this.Oanim[o];

    if(this.O[o].TT == 'enemy' && !this.O[o].onDieDelete){
        this.Odead[ o ]={T:this.O[o].T,x:this.O[o].x,y:this.O[o].y};
        CanvasManager.CBM.addObjectToBackground(this.O[o]);
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
