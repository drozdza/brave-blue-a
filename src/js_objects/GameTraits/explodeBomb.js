GAMEobject.prototype.explodeBomb = function(o,explodeObj){
    var i,L,O = this.O[o];

    if(explodeObj.explodeType=='nails'){
        for(i=0; i<360; i-=-explodeObj.NailsRad){
            var x = O.x;
            var y = O.y;
            if(explodeObj.ringRadius){
                x-=-explodeObj.ringRadius*Math.sin((-i)*(Math.PI/180));
                y-=-explodeObj.ringRadius*Math.cos((-i)*(Math.PI/180));
            }
            if(explodeObj.NailsNeutral)
                L = this.putBullet(3,x,y);
            else
                L = this.putBullet(O.S,x,y);
            this.O[ L ].speed = explodeObj.NailsSpeed;
            if(explodeObj.NailsSpeedPlus)
                this.O[ L ].speed-=-Math.random()*explodeObj.NailsSpeedPlus;
            this.O[ L ].dec = explodeObj.NailsDec;
            if(explodeObj.NailsDecPlus)
                this.O[ L ].dec-=-parseInt(Math.random()*explodeObj.NailsDecPlus);
            this.O[ L ].angle = i;
            if(explodeObj.ringRadius)
                if(explodeObj.NailsAngleBoth==1 && L%2==0)
                    this.O[ L ].angle-=-90;
                else
                    this.O[ L ].angle-= 90;


            this.O[ L ].Power = 1;
            if(explodeObj.NailsAngleCenter){
                if(explodeObj.NailsAngleBoth==1 && L%2==0)
                    this.O[ L ].speedT = - explodeObj.NailsAngleCenter;
                else
                    this.O[ L ].speedT = explodeObj.NailsAngleCenter;
            }
        }
    }
    else if(explodeObj.explodeType=='nailsCone'){
        for(i=0; i<explodeObj.Nails; ++i){
            if(explodeObj.NailsNeutral)
                L = this.putBullet(3,O.x,O.y);
            else
                L = this.putBullet(O.S,O.x,O.y);
            this.O[ L ].angle = O.angle - explodeObj.NailsRad/2- -i*(explodeObj.NailsRad/explodeObj.Nails);
            this.O[ L ].speed = explodeObj.NailsSpeed;
            if(explodeObj.NailsSpeedPlus)
                this.O[ L ].speed-=-Math.random()*explodeObj.NailsSpeedPlus;
            this.O[ L ].dec = explodeObj.NailsDec;
            if(explodeObj.NailsDecPlus)
                this.O[ L ].dec-=-parseInt(Math.random()*explodeObj.NailsDecPlus);
            this.O[ L ].Power = 1;
            if(explodeObj.NailsAngleCenter)
                this.O[ L ].speedT = -((i- -0.5)/(explodeObj.Nails/2)- 1) * explodeObj.NailsAngleCenter;
        }
    }
    else if(explodeObj.explodeType=='roundField'){

        L = this.putObj('RoundField','region',O.S,O.x,O.y);
        this.O[ L ].radius = explodeObj.radius;
        if(explodeObj.PeriodDamage){
            this.O[ L ].PeriodDamage = explodeObj.PeriodDamage;
            this.O[ L ].PeriodTime = explodeObj.PeriodTime;
            this.O[ L ].PeriodOffset = explodeObj.PeriodOffset;
        }
        if(explodeObj.OneTimeEffect){
            this.O[ L ].OneTimeEffect = explodeObj.OneTimeEffect;
            this.O[ L ].OneTimeOffset = explodeObj.OneTimeOffset;
            this.O[ L ].OneTimeDamage = explodeObj.OneTimeDamage;
            this.O[ L ].OnDamageExpire = explodeObj.OnDamageExpire;
        }
        if(explodeObj.dontHit){
            this.O[ L ].dontHit = cloneObj(explodeObj.dontHit);
        }
        if(explodeObj.BounceForce){
            this.O[ L ].bounceForce = explodeObj.BounceForce;
            this.O[ L ].bounceType = explodeObj.BounceAngle;
        }
        if(explodeObj.teleportOnHit){
            this.O[ L ].teleportOnHit = explodeObj.teleportOnHit;
            this.O[ L ].teleportOnHitDist = explodeObj.teleportOnHitDist;
            this.O[ L ].teleportOnHitDistPlus = explodeObj.teleportOnHitDistPlus;
        }

        if(explodeObj.simpleFilling)
            this.O[ L ].simpleFilling = cloneObj(explodeObj.simpleFilling);

        this.O[ L ].DieTime = this.tick- -explodeObj.ExpireTime;
        if(explodeObj.fieldAnim){
            this.O[ L ].fieldAnim = explodeObj.fieldAnim;
            this.setRegionAnimation(L,explodeObj.fieldAnim);
        }
        if(explodeObj.moveAlong){
            this.O[ L ].angle = O.angle;
            this.O[ L ].speed = explodeObj.moveAlong;
            this.O[ L ].fieldAnimMoving = true;
            this.Omoving[ L ]=1;
        }
    }
    else if(explodeObj.explodeType=='putObjs'){
        var objNumb = explodeObj.objMin;
        if(explodeObj.objRand) objNumb-=-parseInt(Math.random()*(explodeObj.objRand- -1));
        for(var i=0; i<objNumb; ++i){
            L = this.putObj(explodeObj.objName,explodeObj.objType,O.S,O.x,O.y);
            this.addBoardMods(L);
        }
    }
    else if(explodeObj.explodeType=='none'){}
    else {
        L = this.putObj('destruction_field','region',O.S,O.x,O.y);
        this.O[L].radius = explodeObj.Dist;
        this.O[L].ActiveTime = this.tick- -2;
        this.O[L].DieTime = this.tick- -6;
        this.O[L].PeriodDamage = explodeObj.Power;
        this.O[L].PeriodTime = 10;
        this.O[L].dontHurtOwnMissle = true;
        this.O[L].dontHit=['B','BE'];
        this.O[L].undestructible=1;
        this.O[L].fiewOff=true;
        this.putObj_animation('explosion_'+explodeObj.Dist, O.x, O.y);
    }

    if(explodeObj.Shards)
        for(var s in explodeObj.Shards){
            var Sh = explodeObj.Shards[s];
            var ShardsNum = 1;
            if(Sh.ShardsNum) ShardsNum = Sh.ShardsNum;

            var iAngle = (O.angle- -Sh.Angle- -360)%360;
            if(Sh.AnglePlus) iAngle-=-parseInt(Math.random()*Sh.AnglePlus);

            for(var i=0; i<ShardsNum; ++i){
                L = this.putObj('bullet_bomb','comp',O.S,O.x,O.y);

                if(i!=0 || Sh.AngleNext == 'undefined'){
                    if(Sh.AnglePlus) iAngle-=-parseInt(Math.random()*Sh.AnglePlus);
                }
                if(i!=0){
                    if(Sh.AngleNext) iAngle -=- Sh.AngleNext;
                }

                this.O[L].angle = iAngle;
                this.O[L].speed = Sh.Speed;
                this.O[L].doingTime = Sh.Dec;

                if(Sh.SpeedPlus) this.O[ L ].speed-=-Math.random()*Sh.SpeedPlus;
                if(Sh.DecPlus)   this.O[ L ].doingTime-=-parseInt(Math.random()*Sh.DecPlus);
                this.cloneExplosionData(Sh, this.O[L]);
            }
        }

    if(O.squadScheme)
        this.disbandSquad(O);
    if(O.squadDirectPlace)
        this.unbindWithSquad(O.squadDirectPlace.o,O.squadDirectPlace.i,o);


    this.removeObj(o);
}
GAMEobject.prototype.cloneExplosionData = function(D,O){
    if(D.onHit)    O.onHit    = cloneObj( D.onHit );
    if(D.onDie)    O.onDie    = cloneObj( D.onDie );
    if(D.onExpire) O.onExpire = cloneObj( D.onExpire );
    if(D.onHitDieExpire){
        O.onHit    = cloneObj( D.onHitDieExpire );
        O.onDie    = cloneObj( D.onHitDieExpire );
        O.onExpire = cloneObj( D.onHitDieExpire );
    }

    if(D.explodePreset)
        this.cloneExplosionData(BBAdata['ExplosivesPresets'][ D.explodePreset ], O);

    if(D.exploAddTo)
        for(var onX in D.exploAddTo){
            var onY = {}; onY[onX]=1;
            if(onX == 'onHitDieExpire')
                onY = {onHit:1,onDie:1,onExpire:1};
            for(var onU in onY){
                for(var addX in D.exploAddTo[onX])
                    O[onU][addX] = cloneObj(D.exploAddTo[onX][addX]);

                if(O[onU].radiusPlus) O[onU].radius -=- parseInt(Math.random()*O[onU].radiusPlus);

                if(O[onU].Shards)
                    for(var i in O[onU].Shards)
                        if(O[onU].Shards[i].CopyShardTimes > 0){
                            O[onU].Shards[i].exploAddTo = {};
                            O[onU].Shards[i].exploAddTo[ onX ] = cloneObj( D.exploAddTo[ onX ] );
                            O[onU].Shards[i].exploAddTo[ onX ].Shards[i].CopyShardTimes--;
                        }
            }
        }
}
