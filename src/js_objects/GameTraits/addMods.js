GAMEobject.prototype.addBoardMods = function(o){
    var Setting = this.MapSetting;

    if(typeof Setting.BoardMods !='undefined')
        for(var k in Setting.BoardMods)
            this.addMod(o,Setting.BoardMods[k]);
}

GAMEobject.prototype.addTeamMods = function(o, Team){
    var Setting = this.MapSetting;

    if(typeof Setting.TeamMods != 'undefined' && typeof Setting.TeamMods[Team] != 'undefined')
        for(var k in Setting.TeamMods[Team])
            this.addMod(o,Setting.TeamMods[Team][k]);
}

GAMEobject.prototype.addMod = function(o,MODnameORobject){
    var MOD,O = this.O[o];

    if(typeof MODnameORobject == 'string') MOD = cloneObj(BBAdata.ObjectMods[MODnameORobject]);
            else                           MOD = cloneObj(MODnameORobject);

    if(typeof MOD.who != 'undefined'){
        var jest=false;
        for(var i=0; i<MOD.who.length; ++i)
            if(MOD.who[i]==O.T){
                jest=true;
                break;
            }
        if(!jest) return false;
    }
    var ACTIONS = MOD.MapModActions;
    delete(MOD.who);
    delete(MOD.MapModActions);

    for(var KI in MOD){
        switch(KI){
            case 'overWriteObjects':
                for(var i in MOD[KI])
                    this.addMod(o,BBAdata['ObjectData'][ MOD[KI][i] ]);
            break; case 'removeToDo':
            console.log('removeToDo');
                for(var i in MOD.removeToDo)
                    this.removeFromToDoList(o,MOD.removeToDo[i]);
            break; case 'toDo':
                for(var i in MOD.toDo)
                    this.addToToDoList(o,MOD.toDo[i]);
            break; case 'weapon':
                for(var i in MOD.weapon)
                    this.addToWeapon(o,MOD.weapon[i]);
            break; case 'x':
                var oldX = O.x;
                var oldY = O.y;
                O.x = MOD.x;
                O.y = MOD.y;
                this.putOnXY(o,oldX,oldY);
            break; case 'y':
            break; case 'mergeArrays':
                for(var u in MOD[KI])
                    O[u] = mergeArrays(O[u],MOD[KI][u]);
            break; default:
            if(typeof O[KI] != 'undefined'){
                gentleCloneObj(O,MOD,KI);
            }else{
                O[KI] = cloneObj(MOD[KI]);
            }
        }
    }
    for(var a in ACTIONS){
        var A = ACTIONS[a];
        if(A.t=='tryBuildSquads')
            this.tryBuildSquads(O,o);
        if(A.t=='addShield')
            this.addShield(O,o,A.shield);
    }

    if(typeof MOD.fieldAnim != 'undefined')
        this.setRegionAnimation(o, MOD.fieldAnim);

    if(typeof MOD.simpleFilling != 'undefined')
        O.TT='simpleFilling';

    if(typeof MOD.squareAngle != 'undefined'){
        O.squareCorners = this.countSquareCorners(O.x,O.y,O.squareAngle,O.squareLen,O.squareWidth);
    }

    if(typeof MOD.explodePreset != 'undefined'){
        this.cloneExplosionData(O,O);
    }

    if(O.view && O.view.onBackground)
        CanvasManager.CBM.changeObjectPosition( o );
    CanvasManager.requestCanvas( o );
    this.putOnXY( o );
}
GAMEobject.prototype.addToToDoList = function(o,toDo){
    if(typeof this.O[o].toDo == 'undefined'){
        return true;
    }

    var OtoDo = this.O[o].toDo;
    var NtoDo=[];
    var N = toDo.N;
    for(var i=0; i<OtoDo.length; ++i){
        if(N!=false && N > OtoDo[i].N){
            NtoDo[ NtoDo.length ] = toDo;
            N=false;
        }
        NtoDo.push( OtoDo[i] );
    }
    if(N!=false)
        NtoDo[ NtoDo.length ] = toDo;

    this.O[o].toDo = NtoDo;
}
GAMEobject.prototype.removeFromToDoList = function(o,name){
    console.log(name);
    var OtoDo = this.O[o].toDo;
    var NtoDo=[];
    for(var i=0; i<OtoDo.length; ++i){
        if(isNaN(name) && OtoDo[i].T != name
        || !isNaN(name) && OtoDo[i].N != name){
            NtoDo.push( OtoDo[i] );
        }
    }
    this.O[o].toDo = NtoDo;
}
GAMEobject.prototype.addToWeapon = function(o,Weapon){
    this.O[o].weapon.unshift(cloneObj(Weapon));
}
GAMEobject.prototype.addToTeam = function(o,Team){
    this.O[o].Team = Team;
}

GAMEobject.prototype.setRegionAnimation = function(o,animType){
    if(animType===false) return true;
    var O = this.O[o];
    O.TT = 'regionAnim';
    O.animTick = 0;
    O.animData = { state: 'start', Next:0, Plen:0, P:{}};

    if(typeof O.squareCorners !='undefined'){
        O.animPole = O.squareLen * O.squareWidth * 2;
    } else
        O.animPole = parseInt(Math.PI*O.radius*O.radius/1000);
    if(typeof O.coneAngle != 'undefined'){
        if(O.coneRad2 != 0)
            O.animPole -= parseInt(Math.PI*O.coneRad2*O.coneRad2/1000);
        if(O.coneAngle < 180)
            O.animPole = parseInt(O.animPole*(O.coneAngle/180));
    }

    CanvasManager.CBM.deleteObjectFromBackground(o);
    delete O.view.onBackground;

    if(animType=='DestructionField') O.animType = 'DestrFieldStart';
    if(animType=='ElectricityField') O.animType = 'EleFieldStart';
    if(animType=='PlasmaField')      O.animType = 'PlasmaFieldStart';
    if(animType=='HealingField')     O.animType = 'HealFieldStart';
    if(animType=='GravityField')     O.animType = 'GravFieldStart';
    if(animType=='OrbitalField')     O.animType = 'OrbFieldStart';
    if(animType=='ShellField')       O.animType = 'ShellFieldStart';
    if(animType=='WindField')        O.animType = 'WindFieldStart';
    if(animType=='EndPortal')        O.animType = 'EndPortalStart';
}
