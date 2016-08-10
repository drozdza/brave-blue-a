
GAMEobject.prototype.putObj_fromArray = function(O){
    var isEnemyShip = false;
    for(var i in BBAdata['ShipNames']){
        if(O.T==BBAdata['ShipNames'][i]){
            isEnemyShip=true;
            break;
        }
    }

    if(isEnemyShip){
        for(var i in BBAdata.ObjectDatas.enemyShip){
            var X = BBAdata.ObjectDatas.enemyShip[i];
            if(typeof X == 'object') O[i] = cloneObj(X);
                else                 O[i] = X;
        }
    }
    if(typeof BBAdata.ObjectDatas[O.T] != 'undefined'){
        if(typeof BBAdata.ObjectDatas[O.T].extends != 'undefined'){
            var U = BBAdata.ObjectDatas[ BBAdata.ObjectDatas[O.T].extends ];
            for(var i in U){
                var X = U[i];
                if(typeof X == 'object') O[i] = cloneObj(X);
                    else                 O[i] = X;
            }
        }

        for(var i in BBAdata.ObjectDatas[O.T]){
            var X = BBAdata.ObjectDatas[O.T][i];
            if(typeof X == 'object') O[i] = cloneObj(X);
                else                 O[i] = X;
        }
    }

    if(typeof O.mergeArrays != 'undefined'){
        for(var mA in O.mergeArrays)
            O[mA] = mergeArrays(O[mA],O.mergeArrays[mA]);
    }

    delete(O.extends);
    delete(O.mergeArrays);

    if(O.explosivePreset || O.exploAddTo || O.onHitDieExpire)
        this.cloneExplosionData(O, O);

    return O;
}


GAMEobject.prototype.putObj = function(Type,Mode,Side,x,y){
    if(typeof x === "undefined"){
        do{
            x = Math.random()*this.MapRadius*2-this.MapRadius;
            y = Math.random()*this.MapRadius*2-this.MapRadius;
        }while( Math.sqrt(x*x- -y*y) > this.MapRadius );
    }
    var L = this.Olen++;
    var Enemy='';


    var O={};
    O.x = x;
    O.y = y;
    O.S = Side;
    O.T = Type;
    O.M = Mode;
    O.bornTime = this.tick;
    O.periodDMG={};
    O.radius = 15;
    O.TT = 'dust';

    if(Type!='bullet')
        O = this.putObj_fromArray(O,Type);

    else {
      O.speed  = 12;
      O.angle  = 0;
      O.radius = 4;
      O.dec    = 30;
      O.Power  = 1;
    }

    if(O.shipVariables)
        this.putObj_shipVariables(O);

    if(O.TT=='enemy'){
        Enemy=' enemy';
        this.Enemies[ L ] = 1;
        O.angle           = parseInt(Math.random()*360);
        O.mapType         = 'E';
        O.mapCollide      = ['M'];
    }

    if(Type=='healing_missle' || Type=='energy_field_missle' || Type=='missle' || Type=='bullet_bomb' || Type=='space_mine' || Type=='shieldBlob'){
        if(Side==2){
            O.mapType = 'M';
            O.mapCollide = ['E','ME','A'];
        } else{
            O.mapType = 'ME';
            O.mapCollide = ['P','M'];
        }
    }
    if(Type=='bullet'){
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
    }

    if(Mode=='region'){
        O.mapType = 'R';
        O.mapCollide = ['P','E','M','ME','A'];
    }

    if(O.T=='healing_missle' || O.T=='energy_field_missle'){
        O.mapCollide = ['E'];
    }

    O.life = O.lifeM;

    if(Mode!='static' && Mode!='region')
        this.Omoving[ L ] = 1;
    if(Mode=='region')
        this.Oregion[ L ] = 1;

    if(Mode=='comp')
        if(Type!='bullet') this.Ocomp[ L ] = Side;
              else         this.Obullet[ L ] = Side;

    this.O[ L ]= O;

    if(O.squadSchemeType)
        this.prepareSquadScheme(O,L);
    if(O.prepareSquadScheme || O.squadScheme)
        this.setFlagSquadFull(O);


    if(Type!='shieldBlob' && Type!='bullet')
        CanvasManager.requestCanvas( L );

    if(O.view && O.view.onBackground)
        CanvasManager.CBM.addObjectToBackground( L );

    if(Type!='bullet')
        this.putOnXY( L );
    return L;
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


GAMEobject.prototype.removeObj = function(o,saveDiv){
    if(o==0) return false;
    if(typeof this.O[o] =='undefined') return false;
    // if(!saveDiv) $('#O_'+o).remove();

    if(this.O[o].T!='bullet' && this.O[o].mapType!='A' && this.O[o].TT!='anim' && this.O[o].TT!='dirAnim'){    // Czyli co?

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
    if(this.O[o].mapType=='A') this.removeFromXY(o,true);

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
    if(this.O[o].TT!='enemy' && this.O[o].mapType!='A'){
        delete this.O[o];
    }else if(this.O[o].onDieDelete){
        delete this.O[o];
    }
}
