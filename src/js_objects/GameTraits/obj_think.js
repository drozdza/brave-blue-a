
GAMEobject.prototype.oThink = function(O){
    for(var iThink in O.Thinks){
        var Think = O.Thinks[iThink];
        // =============== Clasify:
        if (Think.S && typeof Think.S[O.TheState] == 'undefined') continue;
        // if (Think.skipChance && Math.random()*100 > Think.skipChance) continue;
        if (Think.MaxEnemyDist && getDistAB(this.O[0], O) > Think.MaxEnemyDist) continue;
        if (Think.FlagMinTime && O.Flags[Think.FlagMinTime.Flag]- -Think.FlagMinTime.Time > this.tick) continue;

        // =============== Do:
        this['oThink_'+Think.T](O, Think);
    }
}

GAMEobject.prototype.oThink_followEnemy = function(O,Think){
    O.speed = O.SpeedArr[O.SpeedLvl].S;

    var Radius = 100;
    if (typeof Think.Radius != 'undefined') Radius = Think.Radius;
    var Angle = 0;
    if (typeof Think.AnglePlus != 'undefined') Angle = Think.AnglePlus;
    this.enemy_setFollow(O, 0, Radius, Angle);
    var time = 30;
    if (Think.Time)     time = Think.Time;
    if (Think.TimePlus) time -=- parseInt(Math.random()*Think.TimePlus);
    O.ThinkTick = this.tick- -time;
}

GAMEobject.prototype.oThink_followRoutePoint = function(O,Think){
    var RoutePoint = Think.RoutePoint;

    // var Radius = 100;
    // if (typeof Think.Radius != 'undefined') Radius = Think.Radius;
    // var Angle = 0;
    // if (typeof Think.AnglePlus != 'undefined') Angle = Think.AnglePlus;
    // this.enemy_setFollow(O, 0, Radius, Angle);
    // var time = 30;
    // if (Think.Time)     time = Think.Time;
    // if (Think.TimePlus) time -=- parseInt(Math.random()*Think.TimePlus);
    // O.ThinkTick = this.tick- -time;
}

GAMEobject.prototype.oThink_changeManouver = function(O,Think){
    O.speed = O.SpeedArr[O.SpeedLvl].S;
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
    var rName = Think.Route;
    var Route = this.MapSetting.Routes[rName];
    if(typeof O.routes == 'undefined') {
        O.routes = {Stack:[-1], Repeats:[0], RandOnce:[], Point:false};
        O.Follow = {been:true};
    }

    if (O.Follow.been){
        do {
            var keepGoing = true;
            var lvl = O.routes.Stack.length-1;
            var R = Route;
            for (var i=0; i<lvl; ++i)
                R = R.P[ O.routes.Stack[i] ];

            ++O.routes.Repeats[lvl];
            if(R.repeat && O.routes.Repeats[lvl] > R.repeat){
                O.routes.Stack.pop();
                O.routes.Repeats.pop();
                --lvl;
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
            if (typeof R.P[ ilvl ] == 'object') {
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

        // To by trzeba od razu zamienić
        if (isNaN(RN)) {
            for (var oR in this.Oroute) {
                if (this.O[oR].rName == RN) {
                    RN = oR;
                    R.P[ ilvl ] = oR;
                }
            }
        }
        this.enemy_setFollow(O, RN, this.O[RN].radius, 0, true, true);
    }
}

GAMEobject.prototype.oThink_avoidIncomingFire = function(O,Think){
    if(O.lastSpeedT > 0) {
        O.Manouver = 'turnRight';
    } else if(O.lastSpeedT < 0) {
        O.Manouver = 'turnLeft';
    } else if(parseInt(Math.random()*2)){
        O.Manouver = 'turnRight';
    } else {
        O.Manouver = 'turnLeft';
    }

    var tick = this.tick- -10;
    if(Think.Time) tick = this.tick- -Think.Time;
    if(Think.TimePlus) tick-=-parseInt(Math.random()*Think.TimePlus);
    O.ThinkTick = tick;

    if(Think.dontInterupt)
        O.DoNotInteruptThinksUntil = O.ThinkTick;
}

GAMEobject.prototype.oThink_changeTheState = function(O,Think){
    O.Follow.been = true;
    this.oTheState(O,Think.TheState);
}

// HELPERS:

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

//==============================================================================
//============================== DEPRECATED ====================================
//==============================================================================


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
GAMEobject.prototype.changeSpeedLvl = function(O,SpeedLvl){
    O.SpeedLvl = SpeedLvl;
    O.speed = O.SpeedArr[ SpeedLvl ].S;
    O.speedT = O.SpeedArr[ SpeedLvl ].T;
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


GAMEobject.prototype.decide = function(O){
    var P = this.O[0];
    O.lastSpeedT = 0;

    var PlayerDist = getDistAB(O,P);
    var PlayerAngle = getAngleAB(O,P);

    if(O.TeleportMovement){
        var TELE = O.TeleportMovement;
        var Angle = (O.angle - -TELE.Angle- -360)%360;
        if(TELE.AngleRand)
            Angle -=- parseInt(Math.random()*TELE.AngleRand);
        this.teleportJump(O.o,TELE.Dist,Angle,'TP_trackDark');

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
    }

    // Jak się skończy czas to szukamy kolejnego zadania
    if((--O.doingTime) < 0){
        O.doNotInterupt = false;

        for(var toDo in O.toDo){
            var TD = O.toDo[toDo];

            // Sprawdzamy Czy akcja się nadaje
            if(TD.minAlarm && TD.minAlarm > O.alarmLvl) continue;
            if(TD.maxAlarm && TD.maxAlarm < O.alarmLvl) continue;
            if(!isNaN(TD.maxSpeedLvl) && TD.maxSpeedLvl < O.SpeedLvl) continue;
            if(TD.minSpeedLvl && TD.minSpeedLvl > O.SpeedLvl) continue;
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
                if(O.SpeedLvl < 3){
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
                        this.removeObj(O.o);
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
                    delete this.Omoving[O.o];
                    break;
                }
            }

            if(TD.T=='die'){
                if(O.onDie){
                    if(O.onDie.Do=='explode'){
                        this.explodeBomb(O.o,O.onDie);
                    }
                } else
                    this.removeObj(O.o);
                return true;
            }
            if(TD.T=='expire'){
                if(O.onExpire){
                    if(O.onExpire.Do=='explode'){
                        this.explodeBomb(O.o,O.onExpire);
                    }
                } else
                    this.removeObj(O.o);
                return true;
            }

            if(TD.T=='regionStateOut'){
                this.regionStateOut(O.o);
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
                    this.O[L].pathD = ['M', parseInt(O.o), 'L', parseInt(mergeI)];

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
            if(TD.goToSpotLvl)  O.lookLvl = TD.goToSpotLvl;

            O.doingNow = TD.T;
            break;
        }
    }

    // Strzelamy

    if(O.Shields){
        this.checkShields(O);
    }
}
