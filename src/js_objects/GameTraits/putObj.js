
GAMEobject.prototype.putObj_fromArray = function(O){
    var isEnemyShip = false;
    for(var i in NAMES.Ships){
        if(O.T==NAMES.Ships[i]){
            isEnemyShip=true;
            break;
        }
    }

    if(isEnemyShip){
        for(var i in ObjectPutDatas.enemyShip){
            var X = ObjectPutDatas.enemyShip[i];
            if(typeof X == 'object')    O[i] = cloneObj(X);
                else                     O[i] = X;
        }
    }
    if(typeof ObjectPutDatas[O.T] != 'undefined'){
        for(var i in ObjectPutDatas[O.T]){
            var X = ObjectPutDatas[O.T][i];
            if(typeof X == 'object')    O[i] = cloneObj(X);
                else                     O[i] = X;
        }
    }

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
        ++this.EnemiesC;
        this.Enemies[ L ] = 1;
        O.angle           = parseInt(Math.random()*360);
        O.mapType         = 'E';
        O.mapCollide      = ['M'];
    }

    if(Type=='healing_missle' || Type=='missle' || Type=='bullet_bomb' || Type=='space_mine' || Type=='shieldBlob'){
        if(Side==2){
            O.mapType = 'M';
            O.mapCollide = ['E','ME','A'];
        } else{
            O.mapType = 'ME';
            O.mapCollide = ['P','M'];
        }
    }
    if(Type=='star' || Type=='Gstar'){
        O.mapType = 'A';
        // O.mapCollide = ['P','M','ME'];
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

    O.life = O.lifeM;

    if(Type=='koriaz'){
        O.speedM    = O.speed    = 4;
        O.speedT    = 1;
    }
    if(Type=='fariax'){
        O.speedM    = O.speed    = 4;
        O.speedT    = 1;
    }
    if(Type=='vitotas'){
        O.speedM    = O.speed    = 7.5- -Math.random()*1.5;
        O.speedT    = 2- -Math.random()*2;
        O.Distance = 650;
        O.Damage  = 5;
        O.LaserAim = 20;
    }


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
        this.setSquadFull(O);


    if(Type!='shieldBlob')
        CanvasManager.requestCanvas( L );

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


GAMEobject.prototype.putObj_animation = function(Type,X,Y){
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

    if(Type=='hit_healing'){
        O.timeDeath = 25;
        O.radius = 15;
    }
    if(Type=='hit' || Type=='hit_energyField' || Type=='hit_blue'){
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

    if(this.O[o].T!='bullet' && this.O[o].T!='star' && this.O[o].TT!='anim' && this.O[o].TT!='dirAnim'){    // Czyli co?

        if(this.O[o].TT=='enemy')    this.removeFromXY(o,true);
                else                this.removeFromXY(o);
        delete this.Enemies[o];

        if(typeof this.O[o].squadId !='undefined'){
            var S = this.Squads[ this.O[o].squadId ];
            if(o == S.Leader)
                this.disbandSquad( this.O[o].squadId );
            else
                delete S.Members[o];
        }
    }
    if(this.O[o].T=='star')    this.removeFromXY(o,true);

    if(this.O[o].TT == 'anim' || this.O[o].TT == 'dirAnim')
        delete this.Oanim[o];

    if(this.O[o].TT == 'enemy')
        this.Odead[ o ]={T:this.O[o].T,x:this.O[o].x,y:this.O[o].y};

    delete this.Omoving[o];
    delete this.Ocomp[o];
    delete this.Obullet[o];
    delete this.Oregion[o];
    if(this.O[o].TT!='enemy' && this.O[o].T!='star')
        delete this.O[o];
}
