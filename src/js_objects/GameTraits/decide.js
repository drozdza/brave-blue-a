
GAMEobject.prototype.oThink = function(o){
    var O = this.O[o];


    for(var iThink in O.Thinks){
        var Think = O.Thinks[iThink];
        // =============== Clasify:
        if (Think.S && typeof Think.S[O.ThinkState] == 'undefined') continue;
        if (Think.skipChance && Math.random()*100 > Think.skipChance) continue;

        // =============== Do:
        switch(iThink){
            case 'followEnemy':    this.oThink_followEnemy(O, Think); break;
            case 'changeManouver': this.oThink_changeManouver(O, Think); break;
            case 'followRoute':    this.oThink_followRoute(O,Think); break;
        }

        if (!Think.continueThinks) break;
    }
}

GAMEobject.prototype.oThink_followEnemy = function(O,Think){
    var Radius = 100;
    if (typeof Think.Radius != 'undefined') Radius = Think.Radius;
    this.enemy_setFollow(O, 0, Radius, 0 || Think.AnglePlus);
    var time = 30;
    if (Think.Time)     time = Think.Time;
    if (Think.TimePlus) time -=- parseInt(Math.random()*Think.TimePlus);
    O.ThinkTick = this.tick- -time;
}
GAMEobject.prototype.enemy_setFollow = function(O, Obj, Radius, Angle, thinkOnBeen, adjustSpeed){
    var xy = randXYinDist(Radius);
    O.Follow = {
        o: Obj,
        x: xy.x,
        y: xy.y,
        a: 0 || Angle,
        been: false,
        followStart: this.tick,
        followAdjust: false || adjustSpeed,
        thinkOnBeen: false || thinkOnBeen,
    }

    if (adjustSpeed) {
        var sx = isAAbleToGetB({x:O.x, y:O.y}, O.angle, O.speed, O.speedT, {x:this.O[Obj].x- -O.Follow.x, y:this.O[Obj].y- -O.Follow.y});
        if(!sx) O.speed -= 2;
        while(!isAAbleToGetB({x:O.x, y:O.y}, O.angle, O.speed, O.speedT, {x:this.O[Obj].x- -O.Follow.x, y:this.O[Obj].y- -O.Follow.y})) {
            O.speed -= 1;
            if (O.speed < 5) O.speed -=- 0.5;
            if (O.speed < 1) O.speed -=- 0.4;
        }
    }

    O.Manouver = 'followObject';
}
GAMEobject.prototype.oThink_changeManouver = function(O,Think){
    var i = 0;
    for (var d in Think.D)
        if (!(Think.D[d].notTwice && O.Manouver == Think.D[d].M))
            ++i;

    var ri = parseInt(Math.random()*i);
    if(Think.D[ri].notTwice && O.Manouver == Think.D[ri].M) ++ri;
    var D = Think.D[ri];
    O.Manouver = D.M;
    var time = D.Time;
    if(D.TimePlus) time -=- parseInt(Math.random()*D.TimePlus);
    if(D.maxTurn){
        var maxTurnTime = parseInt(D.maxTurn/O.speedT);
        if(time > maxTurnTime) time = maxTurnTime;
    }
    O.ThinkTick = this.tick- -time;
}

GAMEobject.prototype.oThink_followRoute = function(O,Think){
    O.ThinkTick = this.tick + 30;
    O.Manouver = 'followObject';
    // console.log('oThink_followRoute()');
    var rName = Think.Route;
    var Route = this.MapSetting.Routes[rName];
    if(typeof O.routes == 'undefined') {
        O.routes = {Stack:[-1], Repeats:[0], RandOnce:[], Point:false};
        O.Follow = {been:true};
    }

    if (O.Follow.been){
        // console.log("I've been in previous point.");
        do {
            var keepGoing = true;
            var lvl = O.routes.Stack.length-1;
            var R = Route;
            for (var i=0; i<lvl; ++i)
                R = R.P[ O.routes.Stack[i] ];

            // console.log(O.routes.Stack, lvl , R);
            ++O.routes.Repeats[lvl];
            if(R.repeat && O.routes.Repeats[lvl] > R.repeat){
                // console.log('to many repeats');
                O.routes.Stack.pop();
                O.routes.Repeats.pop();
                --lvl;
                // O.routes.Stack[lvl] = -1;
                continue;
            }
            if (R.T=='randOnce' && O.routes.Stack[lvl] == -1) {
                O.routes.RandOnce[lvl] = [];
                for(var i in R.P) O.routes.RandOnce[lvl].push(i);
                O.routes.RandOnce[lvl] = ArrayShuffle(O.routes.RandOnce[lvl]);
            }
            if (R.T=='randOnce') {
                O.routes.Stack[lvl] = O.routes.RandOnce[lvl].pop();
            }
            if (R.T=='rand' || (R.T=='randOrder' && O.routes.Stack[lvl] == -1)) {
                O.routes.Stack[lvl] = parseInt(Math.random()*R.P.length);
            }
            if (R.T=='order' || (R.T=='randOrder' && O.routes.Stack[lvl] != -1)) {
                ++O.routes.Stack[lvl];
                if(O.routes.Stack[lvl] >= R.P.length)
                    O.routes.Stack[lvl] = 0;
            }

            var ilvl = O.routes.Stack[lvl];
            // console.log('[',ilvl,']');

            if (typeof R.P[ ilvl ] == 'object') {
                // console.log('CurrentPoint is object');
                O.routes.Stack.push(-1);
                O.routes.Repeats.push(0);
                continue;
            } else {
                break;
                keepGoing = false;
            }

        } while(keepGoing);

        var ilvl = O.routes.Stack[lvl];
        var R = Route;
        for (var i=0; i<lvl; ++i)
            R = R.P[ O.routes.Stack[i] ];

        var RN = R.P[ ilvl ];

        // console.log('CHOSEN >>', RN);
        if (isNaN(RN)) {
            for (var oR in this.Oroute) {
                if (this.O[oR].rName == RN) {
                    RN = oR;
                    R.P[ ilvl ] = oR;
                }
            }
        }
        // console.log(this.O[RN])
        this.enemy_setFollow(O, RN, this.O[RN].radius, 0, true, true);
    }
}


GAMEobject.prototype.oLook = function(o){

}
GAMEobject.prototype.oShot = function(o){

}

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
// WEAPONS MAKE ACTION
GAMEobject.prototype.makeAction = function(O, Action){
    if(Action.doingNow)          O.doingNow = Action.doingNow;
    if(Action.doingTime)         O.doingTime = Action.doingTime;
    if(Action.doNotInterupt)     O.doNotInterupt = Action.doNotInterupt;
    if(Action.Manouver)          O.Manouver = Action.Manouver;
    if(!isNaN(Action.gotoSpeed)) this.changeSpeedLvl(O, Action.gotoSpeed);
    if(Action.gotoAlarm)         O.alarmLvl = Action.gotoAlarm;
    if(Action.unCloak){          delete O.view.Cloaked;
                                 CanvasManager.requestCanvas(O);
    }
    if(Action.changeView){       O.view = O[ Action.changeView ];
                                 CanvasManager.requestCanvas(O);
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


    if(O.TeleportMovement){
        var TELE = O.TeleportMovement;
        var Angle = (O.angle - -TELE.Angle- -360)%360;
        if(TELE.AngleRand)
            Angle -=- parseInt(Math.random()*TELE.AngleRand);
        this.teleportJump(o,TELE.Dist,Angle,'TP_trackDark');

    }

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
        O.doNotInterupt = false;

        for(var toDo in O.toDo){
            var TD = O.toDo[toDo];

            // Sprawdzamy Czy akcja się nadaje
            if(TD.minAlarm && TD.minAlarm > O.alarmLvl) continue;
            if(TD.maxAlarm && TD.maxAlarm < O.alarmLvl) continue;
            if(!isNaN(TD.maxSpeedLvl) && TD.maxSpeedLvl < O.speedLvl) continue;
            if(TD.minSpeedLvl && TD.minSpeedLvl > O.speedLvl) continue;
            if(TD.usedRes && O.Res[ TD.usedRes ].R < TD.usedResR) continue;
            if(TD.minDistToEnemy && TD.minDistToEnemy < PlayerDist) continue;

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

            if(TD.T=='changeSpeed'){
                    this.changeSpeedLvl(O,TD.gotoSpeed);
                if(TD.doingTime){
                    O.doingTime = TD.doingTime;
                    break;
                }
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

            if(TD.T=='avoidIncomingFire'){
                switch(parseInt(Math.random()*2)){
                    case 0: O.Manouver = 'turnRight';  O.doingTime = TD.avoidTime; break;
                    case 1: O.Manouver = 'turnLeft';  O.doingTime = TD.avoidTime; break;
                }
            }

            if(TD.T=='followEnemy'){
                O.doingTime = TD.doingTime || 50;
                O.Manouver = 'followEnemy';
                if(!isNaN(TD.gotoSpeed))
                    this.changeSpeedLvl(O,TD.gotoSpeed);
            }

            if(TD.T=='goAroundEnemy'){
                O.doingTime = TD.doingTime || 50;
                O.Manouver = 'goAroundEnemy';
                if(!isNaN(TD.gotoSpeed))
                    this.changeSpeedLvl(O,TD.gotoSpeed);
            }

            if(TD.T=='goOrbit'){
                O.doingTime = TD.doingTime || 50;
                O.Manouver = 'goOrbit';
                if(!isNaN(TD.gotoSpeed))
                    this.changeSpeedLvl(O,TD.gotoSpeed);
            }

            if(TD.T=='followEnemyCloaked'){
                O.doingTime = TD.doingTime || 400;
                O.Manouver = 'followEnemy';
                if(O.speedLvl < 3){
                    this.putObj_animation('hit_blue', O.x, O.y);
                    this.changeSpeedLvl(O,3);
                    O.view.Cloaked = true;
                    CanvasManager.requestCanvas(O);
                }
            }

            if(TD.T=='slowDownAndDie'){
                if(O.speed > 0){
                  O.speed -= TD.slowDownBy || 2;
                  if(O.speed <= 0){
                      O.speed = 0;
                      O.doingTime = TD.dieOffset || 0;
                  } else {
                      O.doingTime = TD.slowDownSpeed || 3;
                  }
                } else {
                    --O.life;
                    if(O.life < 1){
                        this.removeObj(o);
                    }else{
                        O.doingTime= TD.dieSpeed || 15;
                        CanvasManager.requestCanvas(O);
                    }
                }
            }
            if(TD.T=='slowDown'){
                if(O.speed > 0){
                    O.speed -= TD.slowBy || 2;
                    O.doingTime = TD.doingTime || 3;
                } else {
                    O.toDo = [cloneObj(TD.doAtStop)];
                    delete this.Omoving[o];
                    break;
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

            if(TD.T=='regionStateOut'){
                this.regionStateOut(o);
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

            if(TD.T=='goToStar'){
                var miDist = 9999;
                var miO = -1;
                for(var mio in this.O)
                    if(this.O[mio].mapType == 'A' && this.O[mio].life > 0){
                        var poX = this.O[mio].x-O.x;
                        var poY = this.O[mio].y-O.y;
                        var poDist = Math.sqrt(poX*poX- -poY*poY);
                        if(miDist > poDist){
                            miDist = poDist;
                            miO = mio;
                        }
                    }
                if(miO != -1){
                    O.goingToStar = miO;
                    O.Manouver = 'goToStar';
                }
                this.changeSpeedLvl(O,TD.gotoSpeed);
            }
            if(TD.T=='followEnemyAroundStar'){
                O.Manouver = 'followEnemyAroundStar';
                this.changeSpeedLvl(O,TD.gotoSpeed);
            }
            if(TD.T=='goRandomAroundStar'){
                O.Manouver = 'goRandomAroundStar';
                this.changeSpeedLvl(O,TD.gotoSpeed);

                switch(parseInt(Math.random()*3)){
                    case 0: O.Manouver = 'iddleOnStar'; O.doingTime = TD.straightMin- -parseInt(Math.random()*TD.straightPlus); break;
                    case 1: O.Manouver = 'turnRightOnStar';  O.doingTime = TD.turnMin- -parseInt(Math.random()*TD.turnPlus); if(O.doingTime > maxTurnTime) O.doingTime = maxTurnTime; break;
                    case 2: O.Manouver = 'turnLeftOnStar';  O.doingTime = TD.turnMin- -parseInt(Math.random()*TD.turnPlus); if(O.doingTime > maxTurnTime) O.doingTime = maxTurnTime; break;
                }
            }

            if(TD.T=='mergeSearch'){
                var inRange = this.getCollidingWithCircle(O.x,O.y,TD.mergeDist,['E']);
                if(O.doingNow == 'mergeWith') continue;
                var mergeI = false;
                for(var i in inRange)
                    if(i != o && this.O[i].T==TD.mergeWith && this.O[i].doingNow != 'mergeWith'){
                        mergeI = i;
                        break;
                    }

                if(mergeI){
                    var Q = this.O[ mergeI ];

                    O.doingNow = 'mergeWith';
                    O.doingTime = 100;
                    O.mergeWith = mergeI;
                    O.doNotInterupt = true;

                    Q.doingNow = 'mergeWith';
                    Q.doingTime = 100;
                    Q.mergeWith = o;
                    Q.doNotInterupt = true;

                    L = this.putObj_directAnim('megreBeam', {timeDeath: 100});
                    this.O[L].pathD = ['M', parseInt(o), 'L', parseInt(mergeI)];

                    O.onDieRemove=[L];
                    Q.onDieRemove=[L];
                    break;
                }
                continue;
            }

            if(TD.T=='produceSquad'){
                do{
                    var weMadeSomething = false;
                    var iUnset = false;
                    for(var i=0; i < O.squadScheme.length; ++i)
                        if(O.squadScheme[i].Oid == -1){
                            iUnset = i;
                            break;
                        }

                    if(iUnset !== false){
                        this.setSquadMember(O,iUnset,1);
                        weMadeSomething = true;
                    }
                }while(weMadeSomething);

                O.doingTime = 500;
            }

            // Dodatkowe wywołania akcji
            if(TD.gotoAlarm) O.alarmLvl = TD.gotoAlarm;
            if(TD.goToSpotLvl)  O.spotLvl = TD.goToSpotLvl;

            O.doingNow = TD.T;
            break;
        }
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
            if(WP.usedRes && O.Res[ WP.usedRes ].R < WP.usedResR) continue;

            if(WP.FlagsRequired){
                var notAllFlags = false;
                for(var flag in WP.FlagsRequired)
                    if(O.Flags[ flag ] !== WP.FlagsRequired[ flag ])
                        notAllFlags = true;
                if(notAllFlags) continue;
            }

            if(WP.gunReload){
                if(typeof WP.lastGunReload == 'undefined')
                    WP.lastGunReload = this.tick;
                if(WP.lastGunReload- -WP.gunReload <= this.tick)
                    WP.lastGunReload = this.tick;
                if(WP.lastGunReload- -WP.gunWork <= this.tick)
                    continue;
            }

            if(WP.makeAction) this.makeAction(O,o,WP.makeAction);

            if(WP.t == 'getAcurateAngle'){
                var WU = this.countFutureShoot(0,O.x,O.y,WP.Speed,WP.Dec);
                if(WU.r)  PlayerAngle = WU.a;
            }

            if(WP.t == 'single'){
                this.putBullet(O.S,O.x,O.y,WP.Speed,WP.Dec,PlayerAngle,WP.DMG);
                WP.lastShot = this.tick;
            }
            if(WP.t == 'double'){
                if(WP.gunSiteChange){
                    var Kuk = -45;
                    if(parseInt((this.tick-WP.lastGunReload)/WP.gunSiteChange)%2 == 0)
                        Kuk = 45;
                    this.shootBulletOnSide(o,0,WP.Speed,WP.Dec,Kuk,WP.Wide || 30,WP.DMG);
                }else{
                    this.shootBulletOnSide(o,0,WP.Speed,WP.Dec,45, WP.Wide || 30,WP.DMG);
                    this.shootBulletOnSide(o,0,WP.Speed,WP.Dec,-45,WP.Wide || 30,WP.DMG);
                }
                WP.lastShot = this.tick;
            }
            if(WP.t == 'double2'){
                if(WP.gunSiteChange){
                    var Kuk = -45;
                    if(parseInt((this.tick-WP.lastGunReload)/WP.gunSiteChange)%2 == 0)
                        Kuk = 45;
                    this.shootBulletOnSide2(o,0,WP.Speed,WP.Dec,Kuk,WP.Wide || 5,WP.DMG);
                }else{
                    this.shootBulletOnSide2(o,0,WP.Speed,WP.Dec,45, WP.Wide || 5,WP.DMG);
                    this.shootBulletOnSide2(o,0,WP.Speed,WP.Dec,-45,WP.Wide || 5,WP.DMG);
                }
                WP.lastShot = this.tick;
            }
            if(WP.t == 'rose'){
                for(var i = -parseInt(WP.AtOnce/2); i<= parseInt(WP.AtOnce/2); ++i)
                    this.putBullet(O.S,O.x,O.y,WP.Speed,WP.Dec,PlayerAngle-i*WP.RoseAngle,WP.DMG);

                WP.lastShot = this.tick;
            }
            if(WP.t == 'crabBullets'){
                var B,CU,cU = [
                    {s:0,  t:1,  a:30},
                    {s:0.5,t:1.5,a:35},
                    {s:1,  t:2,  a:40},
                    {s:1.5,t:2.5,a:45},
                    {s:2,  t:3,  a:50},
                    {s:2.5,t:3.5,a:55},
                    {s:3,  t:4,  a:60},
                ];
                for(var cu in cU){
                    CU = cU[cu];
                    B = this.shootBulletOnSide(o,0,WP.Speed-CU.s,WP.Dec,60- -O.doingTime,27,WP.DMG);
                    B.speedT =-CU.t;
                    B.angle -=-CU.a - O.doingTime;
                    B = this.shootBulletOnSide(o,0,WP.Speed-CU.s,WP.Dec,-60-O.doingTime,27,WP.DMG);
                    B.speedT = CU.t;
                    B.angle -= CU.a- -O.doingTime;
                }

                WP.lastShot = this.tick;
            }


            if(WP.t == 'missile'){
                this.shootMissile(o,PlayerAngle,15,150,3,WP.DMG,WP.explodePreset);
                O.Res[ WP.usedRes ].R -= WP.usedResR;
                WP.lastShot = this.tick;
            }
            if(WP.t == 'missilesDouble'){
                this.shootMissile(o,PlayerAngle - 20,15,150,3,WP.DMG,WP.explodePreset);
                this.shootMissile(o,PlayerAngle- -20,15,150,3,WP.DMG,WP.explodePreset);
                O.Res[ WP.usedRes ].R -= WP.usedResR;
                WP.lastShot = this.tick;
            }
            if(WP.t == 'missileX5'){
                if(O.doingTime == 32) this.shootMissile(o,O.angle- -40,15,150,3,WP.DMG,WP.explodePreset);
                if(O.doingTime == 24) this.shootMissile(o,O.angle- -20,15,150,3,WP.DMG,WP.explodePreset);
                if(O.doingTime == 16) this.shootMissile(o,O.angle     ,15,150,3,WP.DMG,WP.explodePreset);
                if(O.doingTime == 8)  this.shootMissile(o,O.angle - 20,15,150,3,WP.DMG,WP.explodePreset);
                if(O.doingTime == 0)  this.shootMissile(o,O.angle - 40,15,150,3,WP.DMG,WP.explodePreset);
                WP.lastShot = this.tick;
            }
            if(WP.t == 'missileCrown'){
                var Pe = [80,280,100,260,120,240,140,220];

                for(var iki=0; iki<8; ++iki)
                    this.shootMissile(o, (PlayerAngle- -Pe[iki])%360, (WP.Speed-parseInt(iki/2)*2),(WP.Dec- -parseInt(iki/2)*20),(6-parseInt(iki/2)),WP.DMG,WP.explodePreset);

                WP.lastShot = this.tick;
            }

            if(WP.t == 'bomb'){
                var bombModData = false;
                if(typeof WP.WeaponModType !='undefined') bombModData = O.WeaponMods[ WP.WeaponModType ];
                if(WP.WeaponModRandom) bombModData = O.WeaponMods[ parseInt(Math.random()*WP.WeaponModRandom) ];
                var teleportData = false;
                if(typeof WP.Teleport !='undefined') teleportData = WP.Teleport;
                this.shootBomb(o,PlayerAngle,WP.Speed,WP.Dec,bombModData,teleportData);
                WP.lastShot = this.tick;
            }

            if(WP.t == 'laserAim'){
                O.laserAngle = PlayerAngle;

                if(O.squadScheme[0].Oid != -1){
                    this.removeObj(O.squadScheme[0].Oid);
                    O.squadScheme[0].Oid = -1;
                }
                var Sid = this.setSquadMember(O,0,1);
                var oS = this.O[Sid];
                oS.squadT = 'laserAim';
                oS.squareAngle = O.laserAngle;
                oS.squareCorners = this.countSquareCorners(oS.x,oS.y,oS.squareAngle,oS.squareLen,oS.squareWidth);

                WP.lastShot = this.tick;

            }
            if(WP.t == 'laserShoot'){
                if(O.squadScheme[0].Oid != -1){
                    this.removeObj(O.squadScheme[0].Oid);
                    O.squadScheme[0].Oid = -1;
                }
                this.shootLaser(O,WP.Distance,WP.DMG);
                WP.lastShot = this.tick;
            }

            if(WP.t == 'refilResource'){
                if(++O.Res[WP.resource].T >= WP.gunSpeed){
                    if(++O.Res[WP.resource].R > O.Res[WP.resource].M)
                        O.Res[WP.resource].R = O.Res[WP.resource].M;
                    O.Res[WP.resource].T = 0;
                }
            }
            if(WP.t == 'changeAction'){
                WP.lastShot = this.tick;
                if(WP.usedRes) O.Res[ WP.usedRes ].R -= WP.usedResR;
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
                        this.setSquadMember(O,iUnset,1);

                        O.Res[ WP.usedRes ].R -= WP.usedResR;
                        WP.lastShot = this.tick;
                        if(O.Res[ WP.usedRes ].R < WP.usedResR) break;
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
                        CanvasManager.requestCanvas( this.O[ OSS.Oid ] );

                        WP.lastShot = this.tick;
                        O.Res[ WP.usedRes ].R -= WP.usedResR;
                        if(O.Res[ WP.usedRes ].R < WP.usedResR) break;
                        weMadeSomething = true;
                    }

                }while(weMadeSomething);
            }
            if(WP.t == 'killSquadMember'){
                for(var i in O.squadScheme){
                    if(O.squadScheme[i].Oid != -1){
                        var s = O.squadScheme[i].Oid;
                        var S = this.O[s];
                        if(S.fieldAnim=='DestructionField'){
                            CanvasManager.change_regionAnim(S,s, 'DestrFieldEnd', 'end');
                        }else{
                            this.unbindWithSquad(this.O[o],i,s);
                            this.removeObj(s);
                        }
                        break;
                    }
                }
                WP.lastShot = this.tick;
            }

            if(WP.t == 'shotShieldBlob'){
                var L = this.putObj('shieldBlob',O.S,O.x,O.y);
                this.putObj_changeLists(this.O[L], {Ocomp:1, Omoving:1});
                this.O[L].angle = PlayerAngle - parseInt(Math.random()*WP.RandAngle*2)- -WP.RandAngle;
                this.O[L].speed = WP.Speed;
                this.O[L].dec = WP.Dec;
                this.O[L].Flags = [];
                this.O[L].toDo = [{T:'slowDownAndDie'}];
                this.O[L].doingTime = 3;
                this.O[L].life = 3;
                this.O[L].lifeM = 3;
                CanvasManager.requestCanvas( this.O[ L ] );
                this.initObject(this.O[L]);
                WP.lastShot = this.tick;
            }

            if(WP.t == 'dropSpaceMine'){
                bombModData = false;
                if(typeof WP.WeaponModType !='undefined') bombModData = O.WeaponMods[ WP.WeaponModType ];
                if(WP.WeaponModRandom) bombModData = O.WeaponMods[ parseInt(Math.random()*WP.WeaponModRandom) ];

                if(WP.ShotMine) this.dropSpaceMine(O.S,O.x,O.y,PlayerAngle,bombModData);
                    else        this.dropSpaceMine(O.S,O.x,O.y,false,bombModData);
                WP.lastShot = this.tick;
            }

            if(WP.t == 'addMaxShield'){
                var inRange = this.getCollidingWithCircle(O.x,O.y,WP.Radius,['E']);
                for(var i in inRange)
                    this.addMaxShield(i,WP.shieldTime,o);
                WP.lastShot = this.tick;
            }
            if(WP.t == 'shootHealingMissile'){
                var inRange = this.getCollidingWithCircle(O.x,O.y,WP.Radius,['E']);
                for(var i in inRange) if(i != o)
                    if(this.O[i].life < this.O[i].lifeM){
                        this.shootHealingMissile(o,i);
                        WP.lastShot = this.tick;
                        break;
                    }
            }
            if(WP.t == 'shootHealingBomb'){
                var inRange = this.getCollidingWithCircle(O.x,O.y,WP.Radius,['E']);
                for(var i in inRange) if(i != o)
                    if(this.O[i].lifeM - this.O[i].life >= WP.minimalDmg){
                        var X = O.x-this.O[i].x;
                        var Y = O.y-this.O[i].y;
                        var Dist = Math.sqrt(X*X- -Y*Y);
                        var Angle = parseInt(- (Math.atan2(X,Y)*180/Math.PI))%360;
                        var Dec = Math.min(parseInt(Dist / WP.Speed), WP.Dec);

                        var bombModData = false;
                        if(typeof WP.WeaponModType !='undefined') bombModData = O.WeaponMods[ WP.WeaponModType ];
                        if(WP.WeaponModRandom) bombModData = O.WeaponMods[ parseInt(Math.random()*WP.WeaponModRandom) ];
                        var teleportData = false;
                        if(typeof WP.Teleport !='undefined') teleportData = WP.Teleport;
                        this.shootBomb(o,Angle,WP.Speed,Dec,bombModData,teleportData);
                        WP.lastShot = this.tick;

                        break;
                    }
            }
            if(WP.t == 'shootShieldAddMissile'){
                var inRange = this.getCollidingWithCircle(O.x,O.y,WP.Radius,['E']);
                for(var i in inRange) if(i != o){
                    var eO = this.O[i];
                    if((typeof eO.Res == 'undefined' || typeof eO.Res['energyField'] == 'undefined' || eO.Res['energyField'].R < parseInt(eO.lifeM/2)) && (!eO.ShieldsRejection || eO.ShieldsRejection.absorbtionShield)){
                        this.shootShieldAddMissile(o,i);
                        WP.lastShot = this.tick;
                        break;
                    }
                }
            }

            if(WP.t == 'healthSplit'){
                if(O.life- -1 >= WP.minHealth)
                    this.trySplitHealth(o,WP.Radius);
                WP.lastShot = this.tick;
            }

            if(WP.t == 'giveDamangeTransfer'){
                var inRange = this.getCollidingWithCircle(O.x,O.y,WP.Radius,['E']);
                for(var i in inRange)
                    this.addDamageTransfer(i,o,WP.immunityTime);
                WP.lastShot = this.tick;
            }

            if(WP.t == 'healSelf'){
                if(O.life < O.lifeM)
                    this.healObj(o,1);
                WP.lastShot = this.tick;
            }

            if(WP.t == 'mergeWith'){
                var Q = this.O[O.mergeWith];
                if(typeof Q != 'undefined'){
                    var X = O.x-Q.x;
                    var Y = O.y-Q.y;
                    if(Math.sqrt(X*X+Y*Y) < 20){
                        this.mergeShips(o,O.mergeWith);
                        return 1;
                    } else {
                        var Angle = parseInt(- (Math.atan2(X,Y)*180/Math.PI))%360;
                        O.x -=- 5*Math.sin((-Angle- -180)*Math.PI/180);
                        O.y -=- 5*Math.cos((-Angle- -180)*Math.PI/180);
                    }
                }
            }


            if(WP.t == 'shootSquadMember'){
                var iMember = false;
                for(var i=0; i < O.squadScheme.length; ++i)
                    if(O.squadScheme[i].Oid != -1){
                        iMember = i;
                        break;
                    }
                if(iMember === false) continue;
                var M = this.O[ O.squadScheme[iMember].Oid ];
                if(M.bornTime- -WP.MemberAge > this.tick) continue;

                this.unbindWithSquad(this.O[o], iMember, O.squadScheme[iMember].Oid );

                M.speed = WP.Speed || 5;
                M.DieTime = this.tick- -100;
                M.fieldAnimMoving = true;
            }

            if(WP.doNextWeapon) continue;
            break;
        }
    }

    O.Flags.spotEnemyFlag = false;
    O.Flags.incomingFireFlag = false;
    O.Flags.gotHitFlag = false;
    O.Flags.squadMemberDied = false;

    if(O.Shields){
        this.checkShields(O,o);
    }
}
