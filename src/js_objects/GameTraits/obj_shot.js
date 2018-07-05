
GAMEobject.prototype.oShot_single = function(O){
    var WP = O.Weapons.single;
    if(!this.oShotCheck(O,WP)) return false;

    var PlayerAngle = getAngleAB(O,this.O[0]);
    this.putBullet(O.S,O.x,O.y,WP.Speed,WP.Dec,PlayerAngle,WP.DMG);
    WP.lastShot = this.tick;
}

GAMEobject.prototype.oShotCheck = function(O,WP){
    if(WP.gunSpeed > (this.tick-WP.lastShot)) return false;
    if(WP.maxSpeed && WP.maxSpeed < O.SpeedLvl) return false;
    if(WP.minDistToEnemy && WP.minDistToEnemy < getDistAB(O,this.O[0])) return false;
    if(WP.doingNow && WP.doingNow != O.doingNow) return false;
    if(WP.doingTime && WP.doingTime != O.doingTime) return false;
    if(WP.usedRes && O.Res[ WP.usedRes ].R < WP.usedResR) return false;

    // ????
    // if(WP.FlagsRequired){
    //     var notAllFlags = false;
    //     for(var flag in WP.FlagsRequired)
    //         if(O.Flags[ flag ] !== WP.FlagsRequired[ flag ])
    //             notAllFlags = true;
    //     if(notAllFlags) return false;
    // }

    //========== GUN RELOAD
    if(WP.gunReload){
        if(typeof WP.lastGunReload == 'undefined')
            WP.lastGunReload = this.tick;
        if(WP.lastGunReload- -WP.gunReload <= this.tick)
            WP.lastGunReload = this.tick;
        if(WP.lastGunReload- -WP.gunWork <= this.tick)
            return false;
    }
    return true;
}

GAMEobject.prototype.oShot = function(O){

    for(var wp in O.Weapons){
        var WP = O.Weapons[wp];

        //========== CONDITIONS

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
                this.shootBulletOnSide(O.o,0,WP.Speed,WP.Dec,Kuk,WP.Wide || 30,WP.DMG);
            }else{
                this.shootBulletOnSide(O.o,0,WP.Speed,WP.Dec,45, WP.Wide || 30,WP.DMG);
                this.shootBulletOnSide(O.o,0,WP.Speed,WP.Dec,-45,WP.Wide || 30,WP.DMG);
            }
            WP.lastShot = this.tick;
        }
        if(WP.t == 'double2'){
            if(WP.gunSiteChange){
                var Kuk = -45;
                if(parseInt((this.tick-WP.lastGunReload)/WP.gunSiteChange)%2 == 0)
                    Kuk = 45;
                this.shootBulletOnSide2(O.o,0,WP.Speed,WP.Dec,Kuk,WP.Wide || 5,WP.DMG);
            }else{
                this.shootBulletOnSide2(O.o,0,WP.Speed,WP.Dec,45, WP.Wide || 5,WP.DMG);
                this.shootBulletOnSide2(O.o,0,WP.Speed,WP.Dec,-45,WP.Wide || 5,WP.DMG);
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
                B = this.shootBulletOnSide(O.o,0,WP.Speed-CU.s,WP.Dec,60- -O.doingTime,27,WP.DMG);
                B.speedT =-CU.t;
                B.angle -=-CU.a - O.doingTime;
                B = this.shootBulletOnSide(O.o,0,WP.Speed-CU.s,WP.Dec,-60-O.doingTime,27,WP.DMG);
                B.speedT = CU.t;
                B.angle -= CU.a- -O.doingTime;
            }

            WP.lastShot = this.tick;
        }


        if(WP.t == 'missile'){
            this.shootMissile(O.o,PlayerAngle,15,150,3,WP.DMG,WP.explodePreset);
            O.Res[ WP.usedRes ].R -= WP.usedResR;
            WP.lastShot = this.tick;
        }
        if(WP.t == 'missilesDouble'){
            this.shootMissile(O.o,PlayerAngle - 20,15,150,3,WP.DMG,WP.explodePreset);
            this.shootMissile(O.o,PlayerAngle- -20,15,150,3,WP.DMG,WP.explodePreset);
            O.Res[ WP.usedRes ].R -= WP.usedResR;
            WP.lastShot = this.tick;
        }
        if(WP.t == 'missileX5'){
            if(O.doingTime == 32) this.shootMissile(O.o,O.angle- -40,15,150,3,WP.DMG,WP.explodePreset);
            if(O.doingTime == 24) this.shootMissile(O.o,O.angle- -20,15,150,3,WP.DMG,WP.explodePreset);
            if(O.doingTime == 16) this.shootMissile(O.o,O.angle     ,15,150,3,WP.DMG,WP.explodePreset);
            if(O.doingTime == 8)  this.shootMissile(O.o,O.angle - 20,15,150,3,WP.DMG,WP.explodePreset);
            if(O.doingTime == 0)  this.shootMissile(O.o,O.angle - 40,15,150,3,WP.DMG,WP.explodePreset);
            WP.lastShot = this.tick;
        }
        if(WP.t == 'missileCrown'){
            var Pe = [80,280,100,260,120,240,140,220];

            for(var iki=0; iki<8; ++iki)
                this.shootMissile(O.o, (PlayerAngle- -Pe[iki])%360, (WP.Speed-parseInt(iki/2)*2),(WP.Dec- -parseInt(iki/2)*20),(6-parseInt(iki/2)),WP.DMG,WP.explodePreset);

            WP.lastShot = this.tick;
        }

        if(WP.t == 'bomb'){
            var bombModData = false;
            if(typeof WP.WeaponModType !='undefined') bombModData = O.WeaponMods[ WP.WeaponModType ];
            if(WP.WeaponModRandom) bombModData = O.WeaponMods[ parseInt(Math.random()*WP.WeaponModRandom) ];
            var teleportData = false;
            if(typeof WP.Teleport !='undefined') teleportData = WP.Teleport;
            this.shootBomb(O.o,PlayerAngle,WP.Speed,WP.Dec,bombModData,teleportData);
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
                        this.unbindWithSquad(O,i,s);
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
                this.addMaxShield(i,WP.shieldTime,O.o);
            WP.lastShot = this.tick;
        }
        if(WP.t == 'shootHealingMissile'){
            var inRange = this.getCollidingWithCircle(O.x,O.y,WP.Radius,['E']);
            for(var i in inRange) if(i != O.o)
                if(this.O[i].life < this.O[i].lifeM){
                    this.shootHealingMissile(O.o,i);
                    WP.lastShot = this.tick;
                    break;
                }
        }

        if(WP.t == 'shootHealingBomb'){
            var inRange = this.getCollidingWithCircle(O.x,O.y,WP.Radius,['E']);
            for(var i in inRange) if(i != O.o)
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
                    this.shootBomb(O.o,Angle,WP.Speed,Dec,bombModData,teleportData);
                    WP.lastShot = this.tick;

                    break;
                }
        }

        if(WP.t == 'shootShieldAddMissile'){
            var inRange = this.getCollidingWithCircle(O.x,O.y,WP.Radius,['E']);
            for(var i in inRange) if(i != O.o){
                var eO = this.O[i];
                if((typeof eO.Res == 'undefined' || typeof eO.Res['energyField'] == 'undefined' || eO.Res['energyField'].R < parseInt(eO.lifeM/2)) && (!eO.ShieldsRejection || eO.ShieldsRejection.absorbtionShield)){
                    this.shootShieldAddMissile(O.o,i);
                    WP.lastShot = this.tick;
                    break;
                }
            }
        }

        if(WP.t == 'healthSplit'){
            if(O.life- -1 >= WP.minHealth)
                this.trySplitHealth(O.o,WP.Radius);
            WP.lastShot = this.tick;
        }

        if(WP.t == 'giveDamangeTransfer'){
            var inRange = this.getCollidingWithCircle(O.x,O.y,WP.Radius,['E']);
            for(var i in inRange)
                this.addDamageTransfer(i,O.o,WP.immunityTime);
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
                    this.mergeShips(O.o,O.mergeWith);
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

            this.unbindWithSquad(O, iMember, O.squadScheme[iMember].Oid );

            M.speed = WP.Speed || 5;
            M.DieTime = this.tick- -100;
            M.fieldAnimMoving = true;
        }

        if(WP.doNextWeapon) continue;
        break;
    }
}
