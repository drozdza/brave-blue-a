
GAMEobject.prototype.regionAngleChange = function(Q,O){
    if(Q.bounceType=='wind'){
        var kat = Q.windAngle;
        var kat2 = (O.angle - kat- -720)%360;
        var BF=1;
        if(Q.bounceForce) BF = Q.bounceForce;
        if(kat2 < 180-BF)    O.angle = (O.angle - BF)%360;
        if(kat2 > 180- -BF)    O.angle = (O.angle- -BF)%360;
        return O;
    }

    if(Q.coneAngle)    return this.regionAngleChange_fieldCone(Q,O);
    if(Q.squareCorners)    return this.regionAngleChange_fieldSquare(Q,O);

    if(Q.bounceType=='straight'){
        var kat = (-Math.atan2(Q.x-O.x,Q.y-O.y)*(180/Math.PI))%360;
        O.angle = kat;
        return O;
    }
    if(Q.bounceType=='diagonal'){
        var kat = (-Math.atan2(Q.x-O.x,Q.y-O.y)*(180/Math.PI)- -360)%360;
        var kat2 = (O.angle - kat - -720)%360;
        if(kat2 > 90 && kat2 < 270)
            O.angle = (kat- -180 - kat2)%360;
        return O;
    }
    if(Q.bounceType=='gentle'){
        var kat = (-Math.atan2(Q.x-O.x,Q.y-O.y)*(180/Math.PI)- -360)%360;
        var dist = Math.sqrt(Math.pow(Q.x-O.x,2),Math.pow(Q.y-O.y,2));
        var kat2 = (O.angle - kat- -720)%360;
        var BF=1;
        if(Q.bounceForce) BF = Q.bounceForce;
        if(O.speed) BF = BF*(O.speed/10) / (dist/100);
        if(BF > 90) BF = 90;
        if(kat2 <= 180)    O.angle = (O.angle - BF)%360;
        if(kat2 > 180)    O.angle = (O.angle- -BF)%360;
        return O;
    }
    if(Q.bounceType=='orbital'){
        var kat = (-Math.atan2(Q.x-O.x,Q.y-O.y)*(180/Math.PI)- -360)%360;
        var kat2 = (O.angle - kat- -720)%360;
        var BF1 = 2, BF2 = 2;
        if(Q.bounceForce1) BF1 = Q.bounceForce1;
        if(Q.bounceForce2) BF2 = Q.bounceForce2;
        if(kat2 <= 90)                O.angle = (O.angle- -BF2)%360;
        if(kat2 > 90 && kat2 <= 180)  O.angle = (O.angle - BF1)%360;
        if(kat2 > 180 && kat2 <= 270) O.angle = (O.angle- -BF1)%360;
        if(kat2 > 270)                O.angle = (O.angle - BF2)%360;
        return O;
    }
    if(Q.bounceType=='gravity'){
        var kat = (-Math.atan2(Q.x-O.x,Q.y-O.y)*(180/Math.PI)- -360)%360;
        var dist = Math.sqrt(Math.pow(Q.x-O.x,2),Math.pow(Q.y-O.y,2));
        var kat2 = (O.angle - kat- -720)%360;
        var BF=1;
        if(Q.bounceForce) BF = Q.bounceForce;
        if(O.speed) BF = BF*(O.speed/10) / (dist/130);
        if(BF > 20) BF = 20;
        if(kat2 < 180-BF)    O.angle = (O.angle- -BF)%360;
        if(kat2 > 180- -BF)    O.angle = (O.angle - BF)%360;
        return O;
    }

    return O;
}
GAMEobject.prototype.regionAngleChange_fieldCone = function(Q,O){
    var hitAngle='outside';
    var aX = Q.x-O.x;
    var aY = Q.y-O.y;
    var Radi = Math.PI/180;

    var dist = Math.sqrt(aX*aX- -aY*aY);
    if(Q.radius-dist > dist-Q.coneRad2) hitAngle='inside';

    var oldX = O.x- -20*Math.sin((-parseInt(O.angle))*Radi);    // stare po�o�enie
    var oldY = O.y- -20*Math.cos((-parseInt(O.angle))*Radi);
    var uX = Q.x-oldX;    // odleg�o�� od �rodka ro�ka
    var uY = Q.y-oldY;
    var oAngle = (-Math.atan2(aX,aY)/Radi- -720)%360;
    var oldAngle = -Math.atan2(uX,uY)/Radi;
    var coneAngle1 = (Q.angle - Q.coneAngle- -720)%360;
    var coneAngle2 = (Q.angle- -Q.coneAngle- -720)%360;

    var beenOut = 'nop';
    if(!betweenAngles(oldAngle,coneAngle1,coneAngle2)) beenOut='yes';

    if(beenOut=='yes'){
        var varA1 = Math.abs(oAngle - coneAngle1);
        var varA2 = Math.abs(oAngle - coneAngle2);
        if(varA1 < varA2) beenOut='tryLeft';
                else      beenOut='tryRight';


        if(beenOut=='tryLeft'){
            uX = Q.x- -Q.coneRad2 * Math.sin((-coneAngle1-180)*Radi);
            uY = Q.y- -Q.coneRad2 * Math.cos((-coneAngle1-180)*Radi);
            varA1 = (-Math.atan2(O.x-uX,O.y-uY)/Radi- -180)%360;

            uX = Q.x- -Q.radius * Math.sin((-coneAngle1-180)*Radi);
            uY = Q.y- -Q.radius * Math.cos((-coneAngle1-180)*Radi);
            varA2 = (-Math.atan2(O.x-uX,O.y-uY)/Radi- -180)%360;

            if(betweenAngles(O.angle,varA1,varA2)) hitAngle='left';
        }
        if(beenOut=='tryRight'){
            uX = Q.x- -Q.radius * Math.sin((-coneAngle2-180)*Radi);
            uY = Q.y- -Q.radius * Math.cos((-coneAngle2-180)*Radi);
            varA1 = (-Math.atan2(O.x-uX,O.y-uY)/Radi- -180)%360;

            uX = Q.x- -Q.coneRad2 * Math.sin((-coneAngle2-180)*Radi);
            uY = Q.y- -Q.coneRad2 * Math.cos((-coneAngle2-180)*Radi);
            varA2 = (-Math.atan2(O.x-uX,O.y-uY)/Radi- -180)%360;

            if(betweenAngles(O.angle,varA1,varA2)) hitAngle='right';
        }
    }


    if(hitAngle=='left'){
        if(Q.bounceType=='straight'){
            var kat = (coneAngle1-90 - -360)%360;
            O.angle = kat;
            return O;
        }
        if(Q.bounceType=='diagonal'){
            var kat = (coneAngle1-90 - -360)%360;
            var kat2 = (O.angle - kat - -720)%360;
            if(kat2 > 90 && kat2 < 270)
                O.angle = (kat- -180 - kat2)%360;
            return O;
        }
    }
    if(hitAngle=='right'){
        if(Q.bounceType=='straight'){
            var kat = (coneAngle2- -90 - -360)%360;
            O.angle = kat;
            return O;
        }
        if(Q.bounceType=='diagonal'){
            var kat = (coneAngle2- -90 - -360)%360;
            var kat2 = (O.angle - kat - -720)%360;
            if(kat2 > 90 && kat2 < 270)
                O.angle = (kat- -180 - kat2)%360;
            return O;
        }
    }
    if(hitAngle=='outside'){
        if(Q.bounceType=='straight'){
            var kat = (-Math.atan2(aX,aY)*(180/Math.PI))%360;
            O.angle = kat;
            return O;
        }
        if(Q.bounceType=='diagonal'){
            var kat = (-Math.atan2(aX,aY)*(180/Math.PI)- -360)%360;
            var kat2 = (O.angle - kat - -720)%360;
            if(kat2 > 90 && kat2 < 270)
                O.angle = (kat- -180 - kat2)%360;
            return O;
        }
    }
    if(hitAngle=='inside'){
        if(Q.bounceType=='straight'){
            var kat = (-Math.atan2(aX,aY)*(180/Math.PI)- -180)%360;
            O.angle = kat;
            return O;
        }
        if(Q.bounceType=='diagonal'){
            var kat2 = (O.angle - oAngle - -720)%360;
            if(kat2 < 90 || kat2 > 270)
                O.angle = (oAngle- -180 - kat2)%360;
            return O;
        }
    }

    //  return O;
}
GAMEobject.prototype.regionAngleChange_fieldSquare = function(Q,O){
    var A1,A2,M,N,Mar = ['A','B','C','D','A'];
    var Radi = Math.PI/180;

    for(var i=0; i<4; ++i){
        M = Q.squareCorners[Mar[i]];
        N = Q.squareCorners[Mar[i- -1]];

        A1 = (-Math.atan2(O.x-N.x,O.y-N.y)/Radi- -180)%360;
        A2 = (-Math.atan2(O.x-M.x,O.y-M.y)/Radi- -180)%360;

        if(betweenAngles(O.angle,A1,A2)){
            //  this.putObj_animation('hit', M.x, M.y);
            //  this.putObj_animation('hit', N.x, N.y);
            if(Q.bounceType=='straight'){
                var kat = (-Math.atan2(M.x-N.x,M.y-N.y)*(180/Math.PI)- -90)%360;
                O.angle = kat;
                return O;
            }
            if(Q.bounceType=='diagonal'){
                var kat = (-Math.atan2(M.x-N.x,M.y-N.y)*(180/Math.PI)- -90)%360;
                var kat2 = (O.angle - kat - -720)%360;
                if(kat2 > 90 && kat2 < 270)
                    O.angle = (kat- -180 - kat2)%360;
                return O;
            }
            return O;
        }
    }
    return O;
}
GAMEobject.prototype.regionVectorChange = function(Q,O){
    if(Q.vectorType=='wind'){
        if( typeof O.vector == 'undefined') O.vector = [];
        O.vector[ O.vector.length ] = {angle: Q.windAngle, speed: Q.vectorForce};
        return O;
    }
    if(Q.vectorType=='gentle'){
        var dist = Math.sqrt(Math.pow(Q.x-O.x,2),Math.pow(Q.y-O.y,2));
        var angleToCenter = (-Math.atan2(Q.x-O.x,Q.y-O.y)*(180/Math.PI)- -180)%360;
        var force = Q.vectorForce * ((Q.radius - dist)/Q.radius);
        if( typeof O.vector == 'undefined') O.vector = [];
        O.vector[ O.vector.length ] = {angle: angleToCenter, speed: force};
        return O;
    }
    if(Q.vectorType=='orbital'){
        var dist = Math.sqrt(Math.pow(Q.x-O.x,2),Math.pow(Q.y-O.y,2));
        var angleToCenter = (-Math.atan2(Q.x-O.x,Q.y-O.y)*(180/Math.PI)- -90)%360;
        var force = Q.vectorForce- -Q.vectorForceAdd * ((Q.radius - dist)/Q.radius);
        if( typeof O.vector == 'undefined') O.vector = [];
        O.vector[ O.vector.length ] = {angle: angleToCenter, speed: force};
        return O;
    }
    if(Q.vectorType=='gravity'){
        var angleToCenter = (-Math.atan2(Q.x-O.x,Q.y-O.y)*(180/Math.PI)- -180)%360;
        if( typeof O.vector == 'undefined') O.vector = [];
        O.vector[ O.vector.length ] = {angle: angleToCenter, speed: Q.vectorForce};
        return O;
    }
    return O;
}
GAMEobject.prototype.region_teleportOnHit = function(TP,o){
    var Angle=0,Dist=100,O = this.O[o];

    //  {What:{RoundField:1},objData:{x:-700,y:-67, radius:10, simpleFilling: 'rgba(155,155,255,0.8)', teleportOnHit: 'random', teleportOnHitDist: 500}},
    //  {What:{RoundField:1},objData:{x:-600,y:0, radius:10, simpleFilling: 'rgba(155,155,255,0.8)', teleportOnHit: 120,  teleportOnHitDist: 300, teleportOnHitDistPlus: 300}},
    //  {What:{RoundField:1},objData:{x:-700,y:67, radius:10, simpleFilling: 'rgba(155,155,255,0.8)', teleportOnHit: 'aligned', teleportOnHitDist: 1000}},

    if(!isNaN(TP.teleportOnHit)){
        Angle = TP.teleportOnHit;
    } else if(TP.teleportOnHit=='random'){
        Angle = parseInt(Math.random()*360);
    } else if(TP.teleportOnHit=='aligned'){
        Angle = O.angle;
    }
    Dist = TP.teleportOnHitDist;
    if(TP.teleportOnHitDistPlus) Dist-=- parseInt(Math.random()*TP.teleportOnHitDistPlus);

    if(this.teleportJump(o,Dist,Angle)){
        this.checkHits(o);
    }
}
GAMEobject.prototype.regionSpeedChange = function(Q,O){
    if(Q.SlowDownTo >= O.speed) return 1;
    if(Q.SlowDownBy){
        O.speed-=Q.SlowDownBy;
        if(O.speed < Q.SlowDownTo)
            O.speed = Q.SlowDownTo;
    }else{
        O.speed = Q.SlowDownTo;
    }
}

GAMEobject.prototype.regionStateIn = function(q,o){
    var Q = this.O[q];
    var SI = Q.stateIn;

    console.log('regionStateIn!');

    for(var i in SI)
        if(SI[i] != Q[i]){
            if(i=='changeCount'){
                this.changeCount(SI[i]);
            } else {
                Q[i] = SI[i];
            }
            if(i=='fieldAnim') this.setRegionAnimation(q,SI.fieldAnim);
        }
    if(Q.stateOut){
        this.Ocomp[q]=1;
        Q.doingTime=1;
        Q.toDo=[{T:'regionStateOut'}];
        Q.Flags=[];
    }
}

GAMEobject.prototype.regionStateOut = function(q){
    var Q = this.O[q];
    delete(this.Ocomp[q]);

    var SI = Q.stateOut;
    for(var i in SI)
        if(SI[i] != Q[i]){
            Q[i] = SI[i];
            if(i=='fieldAnim') this.setRegionAnimation(q,SI.fieldAnim);
        }
}
