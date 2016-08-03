
GAMEobject.prototype.shootBullet = function(o,Angle,Speed,Dec,Power){
    var O = this.O[o];
    var L = this.putObj('bullet','comp',O.S,O.x,O.y);
    this.O[L].speed = Speed;
    this.O[L].dec = Dec;
    this.O[L].angle = Angle;
    this.O[L].Power = Power;
    return this.O[L];
}
GAMEobject.prototype.shootBulletOnSide = function(o,Enemy,Speed,Dec,SideAngle,SideDist,Power){
    var O = this.O[o];
    var Xp = O.x- -SideDist * Math.sin((-parseInt(O.angle- -SideAngle)-180)*(Math.PI/180));
    var Yp = O.y- -SideDist * Math.cos((-parseInt(O.angle- -SideAngle)-180)*(Math.PI/180));

    var X = Xp-this.O[Enemy].x;
    var Y = Yp-this.O[Enemy].y;
    var Angle = parseInt(- (Math.atan2(X,Y)*180/Math.PI))%360;

    var L = this.putObj('bullet','comp',O.S,Xp,Yp);
    this.O[L].speed = Speed;
    this.O[L].dec = Dec;
    this.O[L].angle = Angle;
    this.O[L].Power = Power;
    return this.O[L];
}
GAMEobject.prototype.shootBulletOnSide2 = function(o,Enemy,Speed,Dec,SideAngle,SideDist,Power){
    var O = this.O[o];

    var X = O.x-this.O[Enemy].x;
    var Y = O.y-this.O[Enemy].y;
    var Angle = parseInt(- (Math.atan2(X,Y)*180/Math.PI))%360;
    var Xp = O.x- -SideDist * Math.sin((-parseInt(O.angle- -SideAngle)-180)*(Math.PI/180));
    var Yp = O.y- -SideDist * Math.cos((-parseInt(O.angle- -SideAngle)-180)*(Math.PI/180));

    var L = this.putObj('bullet','comp',O.S,Xp,Yp);
    this.O[L].speed = Speed;
    this.O[L].dec = Dec;
    this.O[L].angle = Angle;
    this.O[L].Power = Power;
    return this.O[L];
}
GAMEobject.prototype.shootMissle = function(o,Angle,Speed,Dec,SpeedT){
    var O = this.O[o];
    var L = this.putObj('missle','comp',O.S,O.x,O.y);
    this.O[L].speed = Speed;
    this.O[L].doingTime = Dec;
    this.O[L].Manouver = 'followEnemy';
    this.O[L].angle = Angle;
    this.O[L].speedT = SpeedT || 3;
}
GAMEobject.prototype.shootHealingMissle = function(o,Target){
    var O = this.O[o];
    var L = this.putObj('healing_missle','comp',O.S,O.x,O.y);
    this.O[L].angle = O.angle;
    this.O[L].FollowWho = Target;
}
GAMEobject.prototype.shootEnergyFieldMissle = function(o,Target){
    var O = this.O[o];
    var L = this.putObj('energy_field_missle','comp',O.S,O.x,O.y);
    this.O[L].angle = O.angle;
    this.O[L].FollowWho = Target;
    this.O[L].MaxEnergyField = parseInt(this.O[Target].lifeM/2);
}
GAMEobject.prototype.dropSpaceMine = function(o,Angle,bombData){
    var O = this.O[o];
    var L = this.putObj('space_mine','comp',O.S,O.x,O.y);
    if(Angle){
        this.O[L].angle=Angle;
        this.O[L].speed=20;
        this.O[L].dec=20;
        this.O[L].toDo=[{T:'slowDown', doingTime: 3, slowBy: 4}];
        this.O[L].doingTime = 3;
    } else {
        delete this.Omoving[L];
    }

    this.cloneExplosionData(bombData, this.O[L]);
}
GAMEobject.prototype.shootBomb = function(o,Angle,Speed,Dec,bombData){
    var O = this.O[o];
    var L = this.putObj('bullet_bomb','comp',O.S,O.x,O.y);
    this.O[L].speed = Speed || 10;
    this.O[L].doingTime = Dec || 30;
    this.O[L].angle = Angle;

    this.cloneExplosionData(bombData, this.O[L]);
}
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
                L = this.putObj('bullet','comp',3,x,y);
            else
                L = this.putObj('bullet','comp',O.S,x,y);
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
                L = this.putObj('bullet','comp',3,O.x,O.y);
            else
                L = this.putObj('bullet','comp',O.S,O.x,O.y);
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
        if(explodeObj.dontHit){
            this.O[ L ].dontHit = cloneObj(explodeObj.dontHit);
        }
        if(explodeObj.BounceForce){
            this.O[ L ].bounceForce = explodeObj.BounceForce;
            this.O[ L ].bounceType = explodeObj.BounceAngle;
        }
        this.O[L].DieTime = this.tick- -explodeObj.ExpireTime;
        this.setRegionAnimation(L,explodeObj.fieldAnim);
    }
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
        if(explodeObj.ShardsNum){
            var iRad = parseInt(Math.random()*360);
            for(i=0; i < explodeObj.ShardsNum; ++i){
                L = this.putObj('bullet_bomb','comp',O.S,O.x,O.y);
                this.O[L].angle = parseInt(iRad- -i*(360/explodeObj.ShardsNum)- -360)%360;
                this.O[L].speed = explodeObj.Shards.Speed;
                this.O[L].doingTime = explodeObj.Shards.Dec;
                if(explodeObj.Shards.SpeedPlus)
                    this.O[ L ].speed-=-Math.random()*explodeObj.Shards.SpeedPlus;
                if(explodeObj.Shards.DecPlus)
                    this.O[ L ].doingTime-=-parseInt(Math.random()*explodeObj.Shards.DecPlus);

                this.cloneExplosionData(explodeObj.Shards, this.O[L]);
            }
        } else {
            for(i in explodeObj.Shards){
                L = this.putObj('bullet_bomb','comp',O.S,O.x,O.y);
                this.O[L].angle = (O.angle- -explodeObj.Shards[i].Angle- -360)%360;
                this.O[L].speed = explodeObj.Shards[i].Speed;
                this.O[L].doingTime = explodeObj.Shards[i].Dec;

                this.cloneExplosionData( explodeObj.Shards[i], this.O[L] );
            }
        }

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

    if(D.explosivePreset)
        this.cloneExplosionData(BBAdata['ExplosivesPresets'][ D.explosivePreset ], O);
    if(D.exploAddTo)
        for(var onX in D.exploAddTo)
            for(var addX in D.exploAddTo[onX])
                O[onX][addX] = cloneObj(D.exploAddTo[onX][addX]);
}
GAMEobject.prototype.addShield = function(o,Duration,q){
    var L,O = this.O[o];
    if(O.shieldDimmune) return false;

    L = this.putObj_directAnim('addShield', {timeDeath: 5});
    this.O[L].pathD = ['M', parseInt(o), 'L', parseInt(q)];

    O.shieldD = Duration;
}
GAMEobject.prototype.trySplitHealth = function(o,Radius){
    var Q,O = this.O[o];
    if(O.beenSplitHealed && O.beenSplitHealed == this.tick) return false;
    var inRange = this.getCollidingWithCircle(O.x,O.y,Radius,['E']);
    for(var q in inRange){
        Q = this.O[q];
            if(Q.life < Q.lifeM)
                if(Q.life < O.life-1){
                    this.healObj(q,1);
                    Q.beenSplitHealed = this.tick;
                    this.makeDMG(o,1);
                    L = this.putObj_directAnim('dmgTransfer', {timeDeath: 10});
                    this.O[L].pathD = ['M', parseInt(o), 'L', parseInt(q)];
                    break;
                }
    }

}
GAMEobject.prototype.giveDamageTransfer = function(o,q,Duration){
    var O = this.O[o];
    if(O.DamangeTransferImmune) return false;
    O.damageTransferTime = Duration;
    O.damageTransferFrom = q;
}
