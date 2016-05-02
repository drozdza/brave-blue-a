
GAMEobject.prototype.prepareSquadScheme = function(O,o){
    O.squadScheme = [];
    var SST = O.squadSchemeType;

    var Pos = [];
    if(SST.t == 'round')
        for(var i= 0; i<SST.count; ++i){
            Pos[i] = {
                angle: ((360/SST.count)*i)%360,
                radius: SST.radius
            };
        }

    var i = 0;
    if(SST.placement == 'random'){
        while(Pos.length){
            var j = parseInt(Math.random()*Pos.length);
            O.squadScheme[i++] = {angle: Pos[j].angle, radius: Pos[j].radius};
            Pos[j] = Pos[ Pos.length-1 ];
            --Pos.length;
        }
    }
    else if(SST.placement == 'randomStart'){
        var u = parseInt(Math.random()*SST.count);
        for(ji=0; ji<SST.count; ++ji){
            var j = (ji- -u)%SST.count;
            O.squadScheme[i++] = {angle: Pos[j].angle, radius: Pos[j].radius};
        }
    }
    else if(SST.placement == 'oddFirst'){
        for(j=0; j<SST.count; j-=-2)
            O.squadScheme[i++] = {angle: Pos[j].angle, radius: Pos[j].radius};
        for(j=1; j<SST.count; j-=-2)
            O.squadScheme[i++] = {angle: Pos[j].angle, radius: Pos[j].radius};
    }
    else {
        for(i=0; i<SST.count; ++i)
            O.squadScheme[i] = {angle: Pos[i].angle, radius: Pos[i].radius};
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
    var iX = O.x- -OSS.radius * Math.sin( (-parseInt(OSS.angle- -O.angle)-180)*(Math.PI/180));
    var iY = O.y- -OSS.radius * Math.cos( (-parseInt(OSS.angle- -O.angle)-180)*(Math.PI/180));

    if(OSS.type == 'shieldBlob'){
        var Sid = this.putObj('shieldBlob','moving',O.S,iX,iY);
        var oS = this.O[Sid];
        oS.angle = O.angle;
        oS.life = life;
        oS.lifeM = OSS.lifeM;
        this.bindWithSquad(o, i, Sid);
    }
    if(OSS.type == 'RoundField'){
        var Sid = this.putObj('RoundField','region',1,iX,iY);
        this.Omoving[Sid]=1;
        this.bindWithSquad(o, i, Sid);
    }
    if(typeof OSS.objData !='undefined')
        this.addBoardMod(Sid,OSS.objData);

    CanvasManager.requestCanvas( Sid );
}
GAMEobject.prototype.bindWithSquad = function(o,i,s){
    var O = this.O[o];
    var S = this.O[s];

    S.squadDirectPlace = {o:o, i:i};
    S.speed = 0;
    O.squadScheme[i].Oid = s;
}
GAMEobject.prototype.unbindWithSquad = function(o,i,s){
    var oS = this.O[s];

    if(oS.squadDirectPlace){
        var O = this.O[o];
        O.squadScheme[i].Oid=-1;
    }


}

GAMEobject.prototype.disbandSquad = function(O){
    // Maybe we want to change squad chef?

    // If we disband, then:
    for(var i=0; i<O.squadScheme.length; ++i)
        if(O.squadScheme[i].Oid != -1){
            var sO = this.O[ O.squadScheme[i].Oid ];
            if(sO.T=='shieldBlob'){
                sO.speed = 8;
                sO.angle = O.angle- -O.squadScheme[i].angle;
                this.Ocomp[ O.squadScheme[i].Oid ]=1;
                sO.M = 'comp';
                sO.Manouver = 'decay';
                sO.doingTime = 500;
            }
            if(sO.fieldAnim=='ElectricityField'){
                sO.animType='EleFieldEnd';
                sO.animTick = 0;
                sO.DieTime = this.tick- -24;
            }
            delete sO.squadDirectPlace;
        }
}
GAMEobject.prototype.checkSquadSchemeMakes = function(O){

    //  0:{ angle: 0, radius: 0, id: -1, make: {What:{RoundField:1},objData:{x:0,y:-1000, angle: 0, radius: 150, colorInactive: false, colorActive: 'rgba(255,0,0,0.4)', OneTimeEffect: 1, OneTimeOffset: 10, OneTimeDetect: 1, dontHit:['B','BE','E','M','ME','A']}}}

    for(var i in O.squadScheme)
        if(typeof O.squadScheme[i].make != 'undefined'){


        }

}
