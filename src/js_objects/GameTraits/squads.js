
GAMEobject.prototype.prepareSquadScheme = function(O){
    O.squadScheme = [];
    var SSTs=[];
    if(O.squadSchemeType)
        SSTs[0] = O.squadSchemeType;
    if(O.squadSchemeTypeArray)
        SSTs = O.squadSchemeTypeArray;

    var membersTotal = 0;
    for(var ssX in SSTs){
        var SST = SSTs[ssX];

        if(SST.t == 'directPlaces'){
            var Pos = [];
            if(SST.placementT == 'round'){
                for(var ic= 0; ic<SST.count; ++ic){
                    Pos[ic] = {
                        angle: ((360/SST.count)*ic)%360,
                        radius: SST.radius
                    };
                }
            } else if(SST.placementT == 'conePart'){
                for(var ic= 0; ic<SST.count; ++ic){
                    Pos[ic] = {
                        angle: (SST.coneStart- -(SST.conePart/SST.count)*ic)%360,
                        radius: SST.radius
                    };
                }
            }
            var il = 0;
            if(SST.placement == 'random'){
                while(Pos.length){
                    var j = parseInt(Math.random()*Pos.length);
                    O.squadScheme[membersTotal- -(il++)] = {angle: Pos[j].angle, radius: Pos[j].radius, placementT:'directPlaces'};
                    Pos[j] = Pos[ Pos.length-1 ];
                    --Pos.length;
                }
            }
            else if(SST.placement == 'randomStart'){
                var u = parseInt(Math.random()*SST.count);
                for(ji=0; ji<SST.count; ++ji){
                    var j = (ji- -u)%SST.count;
                    O.squadScheme[membersTotal- -(il++)] = {angle: Pos[j].angle, radius: Pos[j].radius, placementT:'directPlaces'};
                }
            }
            else if(SST.placement == 'oddFirst'){
                for(j=0; j<SST.count; j-=-2)
                    O.squadScheme[membersTotal- -(il++)] = {angle: Pos[j].angle, radius: Pos[j].radius, placementT:'directPlaces'};
                for(j=1; j<SST.count; j-=-2)
                    O.squadScheme[membersTotal- -(il++)] = {angle: Pos[j].angle, radius: Pos[j].radius, placementT:'directPlaces'};
            }
            else {
                for(j=0; j<SST.count; ++j)
                    O.squadScheme[membersTotal- -j] = {angle: Pos[j].angle, radius: Pos[j].radius, placementT:'directPlaces'};
            }
        }
        if(SST.t == 'loose'){
            for(il=0; il<SST.count; ++il)
                O.squadScheme[membersTotal- -il] = {placementT:'loose'};
        }

        for(var il=0; il<SST.count; ++il){
            for(var j in SST.data)
                O.squadScheme[membersTotal- -il][j] = SST.data[j];

            if(SST.makeFirst && SST.makeFirst > membersTotal- -il){
                this.setSquadMember(O, membersTotal- -il, SST.life);
            } else {
                O.squadScheme[membersTotal- -il].Oid = -1;
            }
        }
        membersTotal-=-SST.count;
    }
}
GAMEobject.prototype.setSquadMember = function(O, i, life){
    console.log(O, O.squadScheme,i);
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
        var Sid = this.putObj('shieldBlob', O.S, iX, iY);
        var oS = this.O[Sid];
        oS.angle = iAngle;
        oS.life = life;
        oS.lifeM = OSS.lifeM;
        this.bindWithSquad(O, i, Sid);
    }
    if(OSS.type == 'RoundField'){
        var Sid = this.putObj('RoundField', 1, iX, iY);
        this.Omoving[Sid]=1;
        this.bindWithSquad(O, i, Sid);
    }
    if(OSS.type == 'ConeField'){
        var acType = 'region';
        if(OSS.acType) acType = OSS.acType;
        var Sid = this.putObj('ConeField', 1, iX, iY);
        this.putObj_changeMode(Sid, acType);
        this.Omoving[Sid]=1;
        this.bindWithSquad(O, i, Sid);
    }
    if(OSS.type == 'SquareField'){
        var Sid = this.putObj('SquareField', 1, iX, iY);
        this.Omoving[Sid]=1;
        this.bindWithSquad(O, i, Sid);
    }
    if(OSS.type == 'enemyShip'){
        var Sid = this.putObj(OSS.objectType, 1, iX, iY);
        this.bindWithSquad(O, i, Sid);
    }

    if(OSS.placementT == 'directPlaces'){
        CanvasManager.CBM.deleteObjectFromBackground(this.O[ Sid ]);
        delete this.O[ Sid ].view.onBackground;
    }

    this.addBoardMods(this.O[ Sid ]);

    if(typeof OSS.SquadMods !='undefined')
        this.addMod(this.O[ Sid ], OSS.SquadMods);

    if(typeof OSS.objData !='undefined')
        this.addMod(this.O[ Sid ], OSS.objData);
    this.O[ Sid ].Flags=[];

    CanvasManager.requestCanvas( this.O[ Sid ] );
    return Sid;
}
GAMEobject.prototype.bindWithSquad = function(O,i,s){
    var S = this.O[s];

    var OSS = O.squadScheme[i];
    if(OSS.placementT=='directPlaces'){
        S.squadDirectPlace = {o:O.o, i:i};
        S.speed = 0;
    }
    if(OSS.placementT=='loose'){
        S.squadMaster = {o:O.o, i:i};
    }
    OSS.Oid = s;
    this.setFlagSquadFull(O);
}
GAMEobject.prototype.unbindWithSquad = function(O,i,s){
    var oS = this.O[s];

    if(oS.squadDirectPlace){
        O.squadScheme[i].Oid=-1;
    }
    if(oS.squadMaster){
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
                    case 0:  this.explodeBomb( O.squadScheme[i].Oid, {Dist: 35, DMG:{Dmg:4,T:'explo'}} ); break;
                    case 1:  this.explodeBomb( O.squadScheme[i].Oid, {Dist: 80, DMG:{Dmg:7,T:'explo'}} ); break;
                    case 2:  this.explodeBomb( O.squadScheme[i].Oid, {Dist: 120, DMG:{Dmg:11,T:'explo'}} ); break;
                    default: this.explodeBomb( O.squadScheme[i].Oid, {Dist: 210, DMG:{Dmg:18,T:'explo'}} ); break;
                }
            }
            if(sO.squadT && sO.squadT == 'laserAim'){
                this.removeObj( O.squadScheme[i].Oid );
            }
            if(sO.T == 'Mine'){
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
