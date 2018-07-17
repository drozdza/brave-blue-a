GAMEobject.prototype.oManouver_turnLeft = function(O){
    O.angle = (O.angle- -360- -O.speedT) %360;
    O.lastSpeedT = O.speedT;
}
GAMEobject.prototype.oManouver_turnRight = function(O){
    O.angle = (O.angle- -360-O.speedT) %360;
    O.lastSpeedT =-O.speedT;
}
GAMEobject.prototype.oManouver_goStraight = function(O){
    O.lastSpeedT = 0;
}
GAMEobject.prototype.oManouver_followObject = function(O){
    if (typeof this.O[O.Follow.o] == 'undefined' || this.O[O.Follow.o].life <= 0){
        O.Manouver = 'goStraight';
        O.lastSpeedT = 0;
        if(O.Follow.thinkOnLost)
            O.ThinkTick = this.tick;
        return false;
    }
    var Q = this.O[O.Follow.o];
    var Angle = getAngleAB(O, {x:Q.x- -O.Follow.x, y:Q.y- -O.Follow.y})- -O.Follow.a;
    var AngleDiff = (O.angle-Angle- -720)%360;
    var neededTurning = 180 - Math.abs(AngleDiff - 180);
    var speedT = O.speedT;
    if(neededTurning < speedT)
        speedT = neededTurning;

    if(AngleDiff > 180){
        O.angle = (O.angle- -speedT- -360)%360;
        O.lastSpeedT = speedT;
    }else{
        O.angle = (O.angle - speedT- -360)%360;
        O.lastSpeedT = -speedT;
    }

    if (isDistAB(O, {x:Q.x- -O.Follow.x, y:Q.y- -O.Follow.y}, O.speed)){
        O.Follow.been = true;
        if (O.Follow.thinkOnBeen) {
            O.ThinkTick = this.tick;
        }
        this.changeSpeedLvl(O, O.SpeedLvl);
    }

    if (!O.Follow.been && O.Follow.followAdjust && this.tick-O.Follow.followStart > 500) {
        O.Follow.followStart = this.tick;
        O.Manouver = 'goStraight';
        O.ThinkTick = this.tick- -15- -parseInt(Math.random()*15);
    }
}


//==============================================================================
//=============================== DEPRECATED ===================================
//==============================================================================


GAMEobject.prototype.oManouver = function(O){
    switch(O.Manouver){
        case 'goAroundEnemy':{
            var Tyk = (O.angle-PlayerAngle- -360)%360;
            var Ei = 180 - Math.abs(Tyk - 180);
            if(PlayerDist < 150) Tyk = (Tyk- -180)%360;
            var speedT = O.speedT;
            O.Tyk = Tyk;
            if(Ei < speedT) speedT = Ei;
            if(Tyk > 180){  O.angle = (O.angle- -speedT- -360)%360; O.lastSpeedT = speedT; }
            if(Tyk <= 180){ O.angle = (O.angle - speedT- -360)%360; O.lastSpeedT = -speedT; }
        }break;
        case 'goOrbit':{
            var Tyk = (O.angle-PlayerAngle- -360)%360;
            var Ei = 180 - Math.abs(Tyk - 180);
            if(PlayerDist > 160){
                var speedT = O.speedT;
                O.Tyk = Tyk;
                if(Ei < speedT) speedT = Ei;
                if(Tyk > 180){  O.angle = (O.angle- -speedT- -360)%360; O.lastSpeedT = speedT;  errorLog('Ax');}
                if(Tyk <= 180){ O.angle = (O.angle - speedT- -360)%360; O.lastSpeedT = -speedT; errorLog('Ay');}
            }else if(PlayerDist < 100){
                Tyk = (Tyk- -180)%360;
                var speedT = O.speedT;
                O.Tyk = Tyk;
                if(Ei < speedT) speedT = Ei;
                if(Tyk > 180){  O.angle = (O.angle- -speedT- -360)%360; O.lastSpeedT = speedT; errorLog('Bx');}
                if(Tyk <= 180){ O.angle = (O.angle - speedT- -360)%360; O.lastSpeedT = -speedT; errorLog('By');}
            }else{
                O.lastSpeedT = 0;
                Tyk = (Tyk- -180)%360;
                var speedT = O.speedT;
                O.Tyk = Tyk;
                if(Ei < speedT) speedT = Ei;
                if(Tyk > 90 && Tyk <= 270){ O.angle = (O.angle- -speedT- -360)%360; O.lastSpeedT = speedT; errorLog('Cx');}
                if(Tyk <= 90 || Tyk > 270){ O.angle = (O.angle - speedT- -360)%360; O.lastSpeedT = -speedT; errorLog('Cy');}
            }
        }break;
        case 'decay':{
            if(O.doingTime%10 == 0){
                if(O.life > 1){
                    O.life--;
                    CanvasManager.requestCanvas(O);
                } else this.removeObj(o);
                return true;
            }
        }break;
        case 'goToStar':{
            var dO = this.O[O.goingToStar];
            if(typeof dO == 'undefined'){
                O.speed = 0;
                O.Manouver = 'goStraight';
                return 1;
            }
            if(dO.life < 1){
                O.doingTime = -1;
                O.goingToStar = false;
            }
            var diX = O.x-dO.x;
            var diY = O.y-dO.y;
            var miDist = Math.sqrt(diX*diX- -diY*diY);
            if(miDist <= dO.radius){
                O.myStar = O.goingToStar;
                O.angle = parseInt(-Math.atan2(diX,diY)*180/Math.PI- -180)%360;
                O.Flags.noStar = false;
                O.doingTime = -1;
            }else{
                O.angle = parseInt(- (Math.atan2(diX,diY)*180/Math.PI))%360;
            }
        }break;
        case 'followEnemyAroundStar':{
            if(O.myStar === false){
                O.Flags.noStar = true;
                O.doingTime = -1;
            }
            var dO = this.O[O.myStar];
            if(typeof dO == 'undefined'){
                O.speed = 0;
                O.Manouver = 'goStraight';
                return 1;
            }
            if(dO.life < 1){
              O.Flags.noStar = true;
              O.myStar = false;
              O.doingTime = -1;
            }

            var Tyk = (O.angle-PlayerAngle- -360)%360;
            var Ei = 180 - Math.abs( Tyk - 180);
            var speedT = O.speedT;
            O.Tyk = Tyk;
            if(Ei < speedT) speedT = Ei;
            if(Tyk > 180){  O.angle = (O.angle- -speedT- -360)%360; O.lastSpeedT = speedT; }
            if(Tyk <= 180){ O.angle = (O.angle - speedT- -360)%360; O.lastSpeedT = -speedT; }

            var oldX = O.x, oldY = O.y;
            O.x = dO.x- -dO.radius*Math.sin((-O.angle- -180)*Math.PI/180);
            O.y = dO.y- -dO.radius*Math.cos((-O.angle- -180)*Math.PI/180);
            this.putOnXY(O, oldX, oldY);
        }break;
        case 'turnLeftOnStar':{
            if(O.myStar === false){
                O.Flags.noStar = true;
                O.doingTime = -1;
            }
            var dO = this.O[O.myStar];
            if(typeof dO == 'undefined'){
                O.speed = 0;
                O.myStar = false;
                O.Manouver = 'goStraight';
                return 1;
            }
            if(dO.life < 1){
              O.Flags.noStar = true;
              O.doingTime = -1;
            }

            O.angle = (O.angle- -360- -O.speedT) %360;
            var oldX = O.x, oldY = O.y;
            O.x = dO.x- -dO.radius*Math.sin((-O.angle- -180)*Math.PI/180);
            O.y = dO.y- -dO.radius*Math.cos((-O.angle- -180)*Math.PI/180);
            this.putOnXY(O, oldX, oldY);
        }break;
        case 'turnRightOnStar':{
            if(O.myStar === false){
                O.Flags.noStar = true;
                O.doingTime = -1;
            }
            var dO = this.O[O.myStar];
            if(typeof dO == 'undefined'){
                O.speed = 0;
                O.Manouver = 'goStraight';
                return 1;
            }
            if(dO.life < 1){
              O.Flags.noStar = true;
              O.doingTime = -1;
            }

            O.angle = (O.angle- -360-O.speedT) %360;
            var oldX = O.x, oldY = O.y;
            O.x = dO.x- -dO.radius*Math.sin((-O.angle- -180)*Math.PI/180);
            O.y = dO.y- -dO.radius*Math.cos((-O.angle- -180)*Math.PI/180);
            this.putOnXY(O, oldX, oldY);
        }break;
        case 'iddleOnStar':{
            if(O.myStar === false || typeof O.myStar == 'undefined'){
                O.Flags.noStar = true;
                O.doingTime = -1;
                break;
            }
            var dO = this.O[O.myStar];
            if(typeof dO == 'undefined' || dO.life < 1){
              O.Flags.noStar = true;
              O.doingTime = -1;
          }else{
              var oldX = O.x, oldY = O.y;
              O.x = dO.x- -dO.radius*Math.sin((-O.angle- -180)*Math.PI/180);
              O.y = dO.y- -dO.radius*Math.cos((-O.angle- -180)*Math.PI/180);
              this.putOnXY(O, oldX, oldY);
          }
      }break;
    }

}
