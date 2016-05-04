
GAMEobject.prototype.alarmAround = function(o,DistAlert,AlarmFlag){
    var uO,X,Y,Dist,O = this.O[o];

    for(var uo in this.Enemies) if(uo!=o){
        uO = this.O[uo];
        X = O.x-uO.x;
        Y = O.y-uO.y;
        Dist = Math.sqrt(X*X- -Y*Y);
        if(Dist < DistAlert){
            this.O[uo].Flags[AlarmFlag] = true;
        }
    }
}
GAMEobject.prototype.changeSpeedLvl = function(O,speedLvl){
    O.speedLvl = speedLvl;
    O.speed = O.speedArr[ speedLvl ].S;
    O.speedT = O.speedArr[ speedLvl ].T;
}
GAMEobject.prototype.makeAction = function(O,o,Action){
    if(Action.doingNow) O.doingNow = Action.doingNow;
    if(Action.doingTime) O.doingTime = Action.doingTime;
    if(Action.doNotInterupt) O.doNotInterupt = Action.doNotInterupt;
    if(Action.Manouver)  O.Manouver = Action.Manouver;
    if(Action.gotoSpeed) this.changeSpeedLvl(O, Action.gotoSpeed);
    if(Action.unCloak){
        delete O.viewCloaked;
        CanvasManager.requestCanvas(o);
    }
}


GAMEobject.prototype.decide = function(o){
    var O = this.O[o];
    var P = this.O[0];
    O.lastSpeedT = 0;

    var X = O.x-P.x;
    var Y = O.y-P.y;
    var PlayerDist = Math.sqrt(X*X- -Y*Y);
    var PlayerAngle = parseInt(- (Math.atan2(X,Y)*180/Math.PI))%360;

    // Spotting
    if(O.spotLvl){
        if(this.tick % (O.spotArr[ O.spotLvl ].Ref) == 0){
            var SP = O.spotArr[ O.spotLvl ];
            if((SP.T=='single' || SP.T=='double') && PlayerDist < SP.Rad){
                O.Flags.spotEnemyFlag = true;
            }
            if(SP.T=='double' && !O.Flags.spotEnemyFlag){
                var A = (PlayerAngle -O.angle- -720- -SP.Angle2)%360;
                if(PlayerDist < SP.Rad2 && A < SP.Angle2*2){
                    O.Flags.spotEnemyFlag = true;
                }
            }
            // Szukamy grupy i pocisku
            if(!O.Flags.awareAboutEnemy){
                for(var U in this.Odead){
                    var uX = O.x-this.Odead[U].x;
                    var uY = O.y-this.Odead[U].y;
                    var uDist = Math.sqrt(uX*uX- -uY*uY);
                    var uAngle = parseInt(- (Math.atan2(uX,uY)*180/Math.PI))%360;
                    if((SP.T=='single' || SP.T=='double') && uDist < SP.Rad){
                        O.Flags.awareAboutEnemy = true;
                        break;
                    }
                    if(SP.T=='double' && !O.Flags.spotEnemyFlag){
                        var uA = (uAngle -O.angle- -720- -SP.Angle2)%360;
                        if(uDist < SP.Rad2 && uA < SP.Angle2*2){
                            O.Flags.awareAboutEnemy = true;
                            break;
                        }
                    }
                }
            }
        }
    }

    /*
    O.Flags.spotEnemyFlag = false;
    O.Flags.gotHitFlag = false;
    O.Flags.heardExplosionFlag = false;
    O.Flags.newOrderFlag = false;
    O.Flags.incomingFireFlag = false;
    O.Flags.awareAboutEnemy = false;
    O.Flags.lastSeenEnemy = -1;
    O.Flags.squadMemberDied = false;
    O.Flags.squadFull = true;
    */
    // Sprawdzamy czy flagi mogą przerwać obecne zadanie
    if(!O.doNotInterupt){
        if(O.Flags.awareAboutEnemy && O.alarmLvl < 3){
            O.alarmLvl = 4;
            O.doingTime = -1;
        }
        if(O.Flags.spotEnemyFlag){
            if(O.alarmLvl < 5){
                O.alarmLvl = 5;
                O.doingTime = -1;
            }
            O.Flags.lastSeenEnemy = this.tick;
            O.Flags.awareAboutEnemy = true;
        }

        if(O.Flags.gotHitFlag==true && O.T!='avoidIncomingFire')
            O.doingTime = -1;
        if(O.Flags.incomingFireFlag==true && O.T!='avoidIncomingFire')
            O.doingTime = -1;
    }

    // Jak się skończy czas to szukamy kolejnego zadania
    if((--O.doingTime) < 0){

        for(var toDo in O.toDo){
            var TD = O.toDo[toDo];

            // Sprawdzamy Czy akcja się nadaje
            if(TD.minAlarm && TD.minAlarm > O.alarmLvl) continue;
            if(TD.maxAlarm && TD.maxAlarm < O.alarmLvl) continue;
            if(TD.maxSpeedLvl && TD.maxSpeedLvl < O.speedLvl) continue;
            if(TD.minSpeedLvl && TD.minSpeedLvl > O.speedLvl) continue;
            if(TD.usedRes && O[ TD.usedRes ] < TD.usedResR) continue;

            if(TD.FlagsRequired){
                var notAllFlags = false;
                for(var flag in TD.FlagsRequired)
                    if(O.Flags[ flag ] !== TD.FlagsRequired[ flag ])
                        notAllFlags = true;
                if(notAllFlags) continue;
            }


            if(TD.T=='lowerSpeedForResources'){
                if(O[ TD.wantedRes ] < TD.wantedResR)
                    this.changeSpeedLvl(O,TD.gotoSpeed);
                continue;
            }
            if(TD.T=='speedUpIfResources'){
                if(O[ TD.wantedRes ] >= TD.wantedResR)
                    this.changeSpeedLvl(O,TD.gotoSpeed);
                continue;
            }

            if(TD.T=='speedUp'){
                this.changeSpeedLvl(O,TD.gotoSpeed);
                continue;
            }

            if(TD.T=='stayInRegion'){
                var uX = TD.X - O.x;
                var uY = TD.Y - O.y;
                if(Math.sqrt(uX*uX- -uY*uY) < TD.Radius) continue;
            }
            if(TD.T=='lowerAlarmLvl' && ((this.tick - O.Flags.lastSeenEnemy) < TD.minEnemyDontSeen)) continue;

            if(TD.T=='stayInRegion'){
                O.Manouver = 'goToXY';
                O.goToX = TD.X;
                O.goToY = TD.Y;
                O.doingTime = 160;
            }

            if(TD.T=='alarmAboutSpottedEnemy'){
                this.alarmAround(o,TD.alarmRadius,'spotEnemyFlag');
                continue;
            }
            if(TD.T=='alarmAboutIncomingFire'){
                this.alarmAround(o,TD.alarmRadius,'incomingFireFlag');
                continue;
            }

            if(TD.T=='changeManouver'){
                var maxTurnTime = parseInt(180/O.speedT);
                switch(parseInt(Math.random()*3)){
                    case 0: O.Manouver = 'goStraight'; O.doingTime = TD.straightMin- -parseInt(Math.random()*TD.straightPlus); break;
                    case 1: O.Manouver = 'turnRight';  O.doingTime = TD.turnMin- -parseInt(Math.random()*TD.turnPlus); if(O.doingTime > maxTurnTime) O.doingTime = maxTurnTime; break;
                    case 2: O.Manouver = 'turnLeft';  O.doingTime = TD.turnMin- -parseInt(Math.random()*TD.turnPlus); if(O.doingTime > maxTurnTime) O.doingTime = maxTurnTime; break;
                }
            }

            if(TD.T=='changeManouver2'){
                if(O.Manouver =='goStraight'){
                    var maxTurnTime = parseInt(180/O.speedT);
                    switch(parseInt(Math.random()*2)){
                        case 0: O.Manouver = 'turnRight';  O.doingTime = TD.turnMin- -parseInt(Math.random()*TD.turnPlus); if(O.doingTime > maxTurnTime) O.doingTime = maxTurnTime; break;
                        case 1: O.Manouver = 'turnLeft';  O.doingTime = TD.turnMin- -parseInt(Math.random()*TD.turnPlus); if(O.doingTime > maxTurnTime) O.doingTime = maxTurnTime; break;
                    }
                }else{
                    O.Manouver = 'goStraight';
                    O.doingTime = TD.straightMin- -parseInt(Math.random()*TD.straightPlus);
                }
            }

            if(TD.T=='avoidIncomingFire'){
                switch(parseInt(Math.random()*2)){
                    case 0: O.Manouver = 'turnRight';  O.doingTime = TD.avoidTime; break;
                    case 1: O.Manouver = 'turnLeft';  O.doingTime = TD.avoidTime; break;
                }
            }

            if(TD.T=='followEnemy'){
                O.doingTime = TD.doingTime || 50;
                O.Manouver = 'followEnemy';
                if(TD.gotoSpeed)
                    this.changeSpeedLvl(O,TD.gotoSpeed);
            }

            if(TD.T=='followEnemyCloaked'){
                O.doingTime = TD.doingTime || 400;
                O.Manouver = 'followEnemy';
                if(O.speedLvl < 3){
                    this.putObj_animation('hit_blue', O.x, O.y);
                    this.changeSpeedLvl(O,3);
                    O.viewCloaked = true;
                    CanvasManager.requestCanvas(o);
                }
            }

            if(TD.T=='slowDownAndDie'){
                if(O.speed > 0){
                  O.speed -= 2;
                  O.doingTime = 3;
                } else {
                    --O.life;
                    if(O.life < 1){
                        this.removeObj(o);
                    }else{
                        O.doingTime=15;
                        CanvasManager.requestCanvas(o);
                    }
                }
            }
            if(TD.T=='slowDown'){
                if(O.speed > 0){
                    O.speed -= TD.slowBy || 2;
                    O.doingTime = TD.doingTime || 3;
                } else {
                    delete this.Omoving[o];
                }
            }


            if(TD.T=='die'){
                if(O.onDie){
                    if(O.onDie.Do=='explode'){
                        this.explodeBomb(o,O.onDie);
                    }
                } else
                    this.removeObj(o);
                return true;
            }
            if(TD.T=='expire'){
                if(O.onExpire){
                    if(O.onExpire.Do=='explode'){
                        this.explodeBomb(o,O.onExpire);
                    }
                } else
                    this.removeObj(o);
                return true;
            }

            if(TD.T=='explode'){
                this.explodeBomb(o,O.onDie);
                return true;
            }

            if(TD.T=='goStraight'){
                O.Manouver = 'goStraight';
                O.doingTime = TD.straightMin- -parseInt(Math.random()*TD.straightPlus);
            }

            // Dodatkowe wywołania akcji
            if(TD.goToAlarmLvl) O.alarmLvl = TD.goToAlarmLvl;
            if(TD.goToSpotLvl)  O.spotLvl = TD.goToSpotLvl;

            O.doingNow = TD.T;
            break;
        }
    }

    // Wykonujemy zadanie
    switch(O.Manouver){
        case 'followEntity':{
            if(typeof this.O[O.FollowWho] == 'undefined' || this.O[O.FollowWho].life <= 0){
                O.Manouver = 'goStraight';
                O.lastSpeedT = 0;
            }
            if(typeof this.O[O.FollowWho] !='undefined'){
                var wiX = O.x-this.O[O.FollowWho].x;
                var wiY = O.y-this.O[O.FollowWho].y;
            }
            if(typeof wiX!='undefined'){
                var Angle = parseInt(- (Math.atan2(wiX,wiY)*180/Math.PI)- -360)%360;
                var Tyk = (O.angle-Angle- -360)%360;
                var Ei = 180 - Math.abs( Tyk - 180);
                var speedT = O.speedT;
                O.Tyk = Tyk;
                if(Ei < speedT) speedT = Ei;
                if(Tyk > 180){    O.angle = (O.angle- -speedT- -360)%360; O.lastSpeedT = speedT; }
                if(Tyk <= 180){    O.angle = (O.angle-speedT- -360)%360;     O.lastSpeedT = -speedT; }
            }
        }break;
        case 'followEnemy':{
            var Tyk = (O.angle-PlayerAngle- -360)%360;
            var Ei = 180 - Math.abs( Tyk - 180);
            var speedT = O.speedT;
            O.Tyk = Tyk;
            if(Ei < speedT) speedT = Ei;
            if(Tyk > 180){    O.angle = (O.angle- -speedT- -360)%360; O.lastSpeedT = speedT; }
            if(Tyk <= 180){    O.angle = (O.angle-speedT- -360)%360;     O.lastSpeedT = -speedT; }
        }break;
        case 'goToXY':{
            var wiX = O.x-O.goToX;
            var wiY = O.y-O.goToY;
            var Angle = parseInt(- (Math.atan2(wiX,wiY)*180/Math.PI)- -360)%360;
            var Tyk = (O.angle-Angle- -360)%360;
            var Ei = 180 - Math.abs( Tyk - 180);
            var speedT = O.speedT;
            if(Ei < speedT) speedT = Ei;
            if(Tyk > 180){    O.angle = (O.angle- -speedT- -360)%360; O.lastSpeedT = speedT; }
            if(Tyk <= 180){    O.angle = (O.angle-speedT- -360)%360;     O.lastSpeedT = -speedT; }
        }break;
        case 'turnLeft':{
            O.angle = (O.angle- -360- -O.speedT) %360;
            O.lastSpeedT = O.speedT;
        }break;
        case 'turnRight':{
            O.angle = (O.angle- -360-O.speedT) %360;
            O.lastSpeedT =-O.speedT;
        }break;
        case 'goStraight':{
            O.lastSpeedT = 0;
        }break;
        case 'decay':{
            if(O.doingTime%10 == 0){
                if(O.life > 1){
                    O.life--;
                    CanvasManager.requestCanvas(o);
                } else this.removeObj(o);
                return true;
            }
        }break;
    }

    // Strzelamy
    if(O.weapon){
        for(var wp in O.weapon){
            var WP = O.weapon[wp];

            if(WP.minAlarm && WP.minAlarm > O.alarmLvl) continue;
            if(WP.maxAlarm && WP.maxAlarm < O.alarmLvl) continue;
            if(WP.maxSpeed && WP.maxSpeed < O.speedLvl) continue;
            if(WP.minSpeed && WP.minSpeed > O.speedLvl) continue;    // Czy w ogóle kiedyś użyjemy tego?
            if(WP.minDistToEnemy && WP.minDistToEnemy < PlayerDist) continue;
            if(WP.gunSpeed > (this.tick-WP.lastShot)) continue;
            if(WP.doingNow && WP.doingNow != O.doingNow) continue;
            if(WP.doingTime && WP.doingTime != O.doingTime) continue;
            if(WP.usedRes && O[ WP.usedRes ] < WP.usedResR) continue;

            if(WP.FlagsRequired){
                var notAllFlags = false;
                for(var flag in WP.FlagsRequired)
                    if(O.Flags[ flag ] !== WP.FlagsRequired[ flag ])
                        notAllFlags = true;
                if(notAllFlags) continue;
            }


            if(WP.t == 'getAcurateAngle'){
                var WU = this.countFutureShoot(0,O.x,O.y,WP.Speed,WP.Dec);
                if(WU.r)  PlayerAngle = WU.a;
            }

            if(WP.t == 'single'){
                this.shootBullet(o,PlayerAngle,WP.Speed,WP.Dec,WP.Power);
                WP.lastShot = this.tick;
            }
            if(WP.t == 'double'){
                this.shootBulletOnSide(o,0,WP.Speed,WP.Dec,45,30,WP.Power);
                this.shootBulletOnSide(o,0,WP.Speed,WP.Dec,-45,30,WP.Power);
                WP.lastShot = this.tick;
            }
            if(WP.t == 'double2'){
                this.shootBulletOnSide2(o,0,WP.Speed,WP.Dec,45,5,WP.Power);
                this.shootBulletOnSide2(o,0,WP.Speed,WP.Dec,-45,5,WP.Power);
                WP.lastShot = this.tick;
            }
            if(WP.t == 'rose'){
                for(var i = -parseInt(WP.AtOnce/2); i<= parseInt(WP.AtOnce/2); ++i)
                    this.shootBullet(o,PlayerAngle-i*WP.RoseAngle,WP.Speed,WP.Dec,WP.Power);
                WP.lastShot = this.tick;
            }

            if(WP.t == 'misslesDouble'){
                this.shootMissle(o,PlayerAngle - 20,15,150);
                this.shootMissle(o,PlayerAngle- -20,15,150);
                O[ WP.usedRes ] -= WP.usedResR;
                WP.lastShot = this.tick;
            }
            if(WP.t == 'missleX5'){
                if(O.doingTime == 32) this.shootMissle(o,O.angle- -40,15,150);
                if(O.doingTime == 24) this.shootMissle(o,O.angle- -20,15,150);
                if(O.doingTime == 16) this.shootMissle(o,O.angle     ,15,150);
                if(O.doingTime == 8)  this.shootMissle(o,O.angle - 20,15,150);
                if(O.doingTime == 0)  this.shootMissle(o,O.angle - 40,15,150);
                WP.lastShot = this.tick;
            }
            if(WP.t == 'missleCrown'){
                var Pe = [80,280,100,260,120,240,140,220];

                for(var iki=0; iki<8; ++iki)
                    this.shootMissle(o, (PlayerAngle- -Pe[iki])%360, (WP.Speed-parseInt(iki/2)*2),(WP.Dec- -parseInt(iki/2)*20),(6-parseInt(iki/2)));

                WP.lastShot = this.tick;
            }

            if(WP.t == 'bomb'){
                var bombData = false;
                if(typeof WP.BombType !='undefined') bombData = O.Bombs[ WP.BombType ];
                if(WP.BombRandom) bombData = O.Bombs[ parseInt(Math.random()*WP.BombRandom) ];
                this.shootBomb(o,PlayerAngle,WP.Speed,WP.Dec,bombData);
                WP.lastShot = this.tick;
                if(WP.makeAction) this.makeAction(O,o,WP.makeAction);
            }

            if(WP.t == 'laserAim'){
                O.laserAngle = PlayerAngle;
                this.makeAction(O,o,WP.makeAction);

                if(O.squadScheme[0].Oid != -1){
                    this.removeObj(O.squadScheme[0].Oid);
                    O.squadScheme[0].Oid = -1;
                }
                var Sid = this.setSquadMember(o,0,1);
                var oS = this.O[Sid];
                oS.squadT = 'laserAim';
                oS.squareAngle = O.laserAngle;
                oS.squareCorners = this.countSquareCorners(oS.x,oS.y,oS.squareAngle,oS.squareLen,oS.squareWidth);

                WP.lastShot = this.tick;

            }
            if(WP.t == 'laserShoot'){
                this.makeAction(O,o,WP.makeAction);
                if(O.squadScheme[0].Oid != -1){
                    this.removeObj(O.squadScheme[0].Oid);
                    O.squadScheme[0].Oid = -1;
                }
                this.shootLaser(o,WP.Distance,WP.Power);
                WP.lastShot = this.tick;
            }

            if(WP.t == 'refilResource'){
                if(++O.Res[WP.resource].T >= WP.gunSpeed){
                    if(++O[WP.resource] > O.Res[WP.resource].M)
                        O[WP.resource] = O.Res[WP.resource].M;
                    O.Res[WP.resource].T = 0;
                }
            }
            if(WP.t == 'changeAction'){
                this.makeAction(O,o,WP.makeAction);
                WP.lastShot = this.tick;
                if(WP.usedRes)
                    O[ WP.usedRes ] -= WP.usedResR;
            }

            if(WP.t == 'produceSquad'){
                do{
                    var weMadeSomething = false;
                    var iUnset = false;
                    for(var i=0; i < O.squadScheme.length; ++i)
                        if(O.squadScheme[i].Oid == -1){
                            iUnset = i;
                            break;
                        }

                    if(iUnset !== false){
                        this.setSquadMember(o,iUnset,1);

                        O[ WP.usedRes ] -= WP.usedResR;
                        WP.lastShot = this.tick;
                        if(O[ WP.usedRes ] < WP.usedResR) break;
                        weMadeSomething = true;
                    }
                }while(weMadeSomething);
            }
            if(WP.t == 'healSquad'){
                do{
                    var weMadeSomething = false;
                    var iLowLife = false, lowLifeMin = 999;
                    for(var i=0; i < O.squadScheme.length; ++i)
                        if(O.squadScheme[i].type == 'shieldBlob')
                            if(O.squadScheme[i].Oid != -1){
                                var oS = this.O[ O.squadScheme[i].Oid ];
                                if( oS.life < lowLifeMin && oS.life < oS.lifeM){
                                    lowLifeMin = oS.life;
                                    iLowLife = i;
                                }
                            }

                    if(iLowLife === false) break;
                    var OSS = O.squadScheme[iLowLife];

                    if(OSS.type == 'shieldBlob'){
                        this.O[ OSS.Oid].life -=- 1;
                        CanvasManager.requestCanvas( OSS.Oid );

                        WP.lastShot = this.tick;
                        O[ WP.usedRes ] -= WP.usedResR;
                        if(O[ WP.usedRes ] < WP.usedResR) break;
                        weMadeSomething = true;
                    }

                }while(weMadeSomething);
            }

            if(WP.t == 'shotShieldBlob'){
                var L = this.putObj('shieldBlob','comp',O.S,O.x,O.y);
                this.O[L].angle = PlayerAngle - parseInt(Math.random()*WP.RandAngle*2)- -WP.RandAngle;
                this.O[L].speed = WP.Speed;
                this.O[L].dec = WP.Dec;
                this.O[L].Flags = [];
                this.O[L].toDo = [{T:'slowDownAndDie'}];
                this.O[L].doingTime = 3;
                this.O[L].life = 3;
                this.O[L].lifeM = 3;
                CanvasManager.requestCanvas( L );
                WP.lastShot = this.tick;
            }

            if(WP.t == 'dropSpaceMine'){
                bombData = O.Bombs[ WP.BombType ];
                if(WP.ShotMine) this.dropSpaceMine(o,PlayerAngle,bombData);
                    else        this.dropSpaceMine(o,false,bombData);
                WP.lastShot = this.tick;
            }
            /*
            if(Fx.T=='missle' && S.Missles >= Fx.MissleUse && this.missleAim!=false){
                this.shipShootMissle(this.missleAim,O.angle,Fx.Speed,Fx.Dec,Fx.SpeedT,Fx.Power);
                Fx.gunS=0;
                S.Missles-=Fx.MissleUse;
            }
            */


            if(WP.doNextWeapon) continue;

            break;
        }
    }
    O.Flags.spotEnemyFlag = false;
    O.Flags.incomingFireFlag = false;
    O.Flags.gotHitFlag = false;
    O.Flags.squadMemberDied = false;
}
