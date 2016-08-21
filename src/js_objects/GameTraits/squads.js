
GAMEobject.prototype.prepareSquadScheme = function(O,o){
    O.squadScheme = [];
    var SST = O.squadSchemeType;

    if(SST.t == 'directPlaces'){
        var Pos = [];
        if(SST.placementT == 'round'){
            for(var i= 0; i<SST.count; ++i){
                Pos[i] = {
                    angle: ((360/SST.count)*i)%360,
                    radius: SST.radius
                };
            }
        } else if(SST.placementT == 'conePart'){
            for(var i= 0; i<SST.count; ++i){
                Pos[i] = {
                    angle: (SST.coneStart- -(SST.conePart/SST.count)*i)%360,
                    radius: SST.radius
                };
            }
        }

        var i = 0;
        if(SST.placement == 'random'){
            while(Pos.length){
                var j = parseInt(Math.random()*Pos.length);
                O.squadScheme[i++] = {angle: Pos[j].angle, radius: Pos[j].radius, placementT:'directPlaces'};
                Pos[j] = Pos[ Pos.length-1 ];
                --Pos.length;
            }
        }
        else if(SST.placement == 'randomStart'){
            var u = parseInt(Math.random()*SST.count);
            for(ji=0; ji<SST.count; ++ji){
                var j = (ji- -u)%SST.count;
                O.squadScheme[i++] = {angle: Pos[j].angle, radius: Pos[j].radius, placementT:'directPlaces'};
            }
        }
        else if(SST.placement == 'oddFirst'){
            for(j=0; j<SST.count; j-=-2)
                O.squadScheme[i++] = {angle: Pos[j].angle, radius: Pos[j].radius, placementT:'directPlaces'};
            for(j=1; j<SST.count; j-=-2)
                O.squadScheme[i++] = {angle: Pos[j].angle, radius: Pos[j].radius, placementT:'directPlaces'};
        }
        else {
            for(i=0; i<SST.count; ++i)
                O.squadScheme[i] = {angle: Pos[i].angle, radius: Pos[i].radius, placementT:'directPlaces'};
        }
    }
    if(SST.t == 'loose'){
        for(i=0; i<SST.count; ++i)
            O.squadScheme[i] = {placementT:'loose'};
    }

    for(var i in O.squadScheme){
        for(var j in SST.data)
            O.squadScheme[i][j] = SST.data[j];

        if(SST.makeFirst && SST.makeFirst > i){
            this.setSquadMember(o,i,SST.life);
        } else {
            O.squadScheme[i].Oid = -1;
        }
    }
}
GAMEobject.prototype.setSquadMember = function(o,i,life){
    var O = this.O[o];
    var OSS = O.squadScheme[i];

    var iX = O.x;
    var iY = O.y;
    var iAngle = parseInt(Math.random()*360);

    if(OSS.placementT == 'directPlaces'){
        iX = O.x- -OSS.radius * Math.sin( (-parseInt(OSS.angle- -O.angle)-180)*(Math.PI/180));
        iY = O.y- -OSS.radius * Math.cos( (-parseInt(OSS.angle- -O.angle)-180)*(Math.PI/180));
        iAngle = O.angle;
    }

    if(OSS.type == 'shieldBlob'){
        var Sid = this.putObj('shieldBlob','moving',O.S,iX,iY);
        var oS = this.O[Sid];
        oS.angle = iAngle;
        oS.life = life;
        oS.lifeM = OSS.lifeM;
        this.bindWithSquad(o, i, Sid);
    }
    if(OSS.type == 'RoundField'){
        var Sid = this.putObj('RoundField','region',1,iX,iY);
        this.Omoving[Sid]=1;
        this.bindWithSquad(o, i, Sid);
    }
    if(OSS.type == 'ConeField'){
        var acType = 'region';
        if(OSS.acType) acType = OSS.acType;
        var Sid = this.putObj('ConeField',acType,1,iX,iY);
        this.Omoving[Sid]=1;
        this.bindWithSquad(o, i, Sid);
    }
    if(OSS.type == 'SquareField'){
        var Sid = this.putObj('SquareField','region',1,iX,iY);
        this.Omoving[Sid]=1;
        this.bindWithSquad(o, i, Sid);
    }
    if(OSS.type == 'enemyShip'){
        var Sid = this.putObj(OSS.objectType,'comp',1,iX,iY);
        this.bindWithSquad(o, i, Sid);
    }

    if(OSS.placementT == 'directPlaces'){
        CanvasManager.CBM.deleteObjectFromBackground( Sid );
        delete this.O[ Sid ].view.onBackground;
    }

    if(typeof OSS.objData !='undefined')
        this.addBoardMod(Sid,OSS.objData);
    this.O[Sid].Flags=[];

    CanvasManager.requestCanvas( Sid );
    return Sid;
}
GAMEobject.prototype.bindWithSquad = function(o,i,s){
    var O = this.O[o];
    var S = this.O[s];

    var OSS = O.squadScheme[i];
    if(OSS.placementT=='directPlaces'){
        S.squadDirectPlace = {o:o, i:i};
        S.speed = 0;
    }
    if(OSS.placementT=='loose'){
        S.squadMaster = {o:o, i:i};
    }
    OSS.Oid = s;
    this.setFlagSquadFull(O);
}
GAMEobject.prototype.unbindWithSquad = function(o,i,s){
    var oS = this.O[s];

    if(oS.squadDirectPlace){
        var O = this.O[o];
        O.squadScheme[i].Oid=-1;
    }
    if(oS.squadMaster){
        var O = this.O[o];
        O.squadScheme[i].Oid=-1;
    }

    delete oS.squadDirectPlace;
    delete oS.squadMaster;

    O.Flags['squadMemberDied']=true;
    O.Flags['squadFull']=false;
}

GAMEobject.prototype.disbandSquad = function(O){
    // Maybe we want to change squad master?

    // If we disband, then:
    for(var i=0; i<O.squadScheme.length; ++i)
        if(O.squadScheme[i].Oid != -1){
            var sO = this.O[ O.squadScheme[i].Oid ];
            if(typeof sO == 'undefined') continue;
            if(sO.T=='shieldBlob'){
                sO.speed = 8;
                sO.angle = O.angle- -O.squadScheme[i].angle;
                this.Ocomp[ O.squadScheme[i].Oid ]=1;
                sO.M = 'comp';
                sO.Manouver = 'decay';
                sO.doingTime = 500;
            }
            if(sO.fieldAnim=='ElectricityField'){
                CanvasManager.change_regionAnim(sO,O.squadScheme[i].Oid, 'EleFieldEnd', 'end', 24);
            }
            if(sO.fieldAnim=='DestructionField'){
                CanvasManager.change_regionAnim(sO,O.squadScheme[i].Oid, 'DestrFieldEnd', 'end', 48);
            }
            if(sO.fieldAnim=='ShellField'){
                CanvasManager.change_regionAnim(sO,O.squadScheme[i].Oid, 'ShellFieldEnd', 'end', 48);
            }
            if(sO.fieldAnim=='PlasmaField'){
                CanvasManager.change_regionAnim(sO,O.squadScheme[i].Oid, 'ShellFieldEnd', 'end', 48);
                var kuTime = this.tick - this.O[ O.squadScheme[i].Oid ].bornTime;
                this.O[ O.squadScheme[i].Oid ].S = 1;
                switch(parseInt(kuTime/30)){
                    case 0:  this.explodeBomb( O.squadScheme[i].Oid, {Dist: 35, Power: 4} ); break;
                    case 1:  this.explodeBomb( O.squadScheme[i].Oid, {Dist: 80, Power: 7} ); break;
                    case 2:  this.explodeBomb( O.squadScheme[i].Oid, {Dist: 120, Power: 11} ); break;
                    default: this.explodeBomb( O.squadScheme[i].Oid, {Dist: 210, Power: 18} ); break;
                }
            }
            if(sO.squadT && sO.squadT == 'laserAim'){
                this.removeObj( O.squadScheme[i].Oid );
            }
            if(sO.T == 'space_mine'){
                this.explodeBomb( O.squadScheme[i].Oid, sO.onDie );
                this.removeObj(O.squadScheme[i].Oid);
            }
            if(O.squadScheme[i].onDisbandRemove){
                this.removeObj( O.squadScheme[i].Oid );
            }
            delete sO.squadDirectPlace;
        }
}

GAMEobject.prototype.setFlagSquadFull = function(O){
    var full = true;
    for(var i in O.squadScheme)
        if(O.squadScheme[i].Oid == -1){
            full = false;
            break;
        }
    O.Flags['squadFull'] = full;
}

GAMEobject.prototype.squad_AlarmMaster = function(o,type,action){
    var O = this.O[o];
    var Mi = O.squadDirectPlace.o;
    var M = this.O[ Mi ];

    if(type=='informMaster'){
        if(typeof M.squadActions == 'undefined') return false;

        var Action = M.squadActions[action];

        var Oid = M.squadScheme[ Action.squadMember ].Oid;

        if(Oid==-1) return false;

        for(var k in Action.change)
            this.O[Oid][k] = Action.change[k];

    } else if(type=='explodeMaster'){
        this.explodeBomb(Mi,M.onDie);
        this.removeObj(o);

    }

}
