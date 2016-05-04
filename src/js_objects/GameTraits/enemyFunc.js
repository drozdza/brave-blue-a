
GAMEobject.prototype.shootBullet = function(o,Angle,Speed,Dec,Power){
    var O = this.O[o];
    var L = this.putObj('bullet','comp',O.S,O.x,O.y);
    this.O[L].speed = Speed;
    this.O[L].dec = Dec;
    this.O[L].angle = Angle;
    this.O[L].Power = Power;
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
GAMEobject.prototype.shootHealingMissle = function(o,Target,Angle){
    var O = this.O[o];
    var L = this.putObj('healing_missle','comp',O.S,O.x,O.y);
    this.O[L].angle = Angle;
    this.O[L].target = Target;
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
    if(bombData.onHit)    this.O[L].onHit = cloneObj(bombData.onHit);
    if(bombData.onDie)    this.O[L].onDie = cloneObj(bombData.onDie);
    if(bombData.onExpire) this.O[L].onExpire = cloneObj(bombData.onExpire);

}
GAMEobject.prototype.shootBomb = function(o,Angle,Speed,Dec,bombData){
    var O = this.O[o];
    var L = this.putObj('bullet_bomb','comp',O.S,O.x,O.y);
    this.O[L].speed = Speed || 10;
    this.O[L].doingTime = Dec || 30;
    this.O[L].angle = Angle;

    if(bombData.onHit)    this.O[L].onHit = cloneObj(bombData.onHit);
    if(bombData.onDie)    this.O[L].onDie = cloneObj(bombData.onDie);
    if(bombData.onExpire) this.O[L].onExpire = cloneObj(bombData.onExpire);
}
GAMEobject.prototype.explodeBomb = function(o,explodeObj){
    var i,L,O = this.O[o];

    if(explodeObj.explodeType=='nails'){
        for(i=0; i<360; i-=-explodeObj.NailsRad){
            if(explodeObj.NailsNeutral)
                L = this.putObj('bullet','comp',3,O.x,O.y);
            else
                L = this.putObj('bullet','comp',O.S,O.x,O.y);
            this.O[ L ].speed = explodeObj.NailsSpeed;
            if(explodeObj.NailsSpeedPlus)
                this.O[ L ].speed-=-Math.random()*explodeObj.NailsSpeedPlus;
            this.O[ L ].dec = explodeObj.NailsDec;
            if(explodeObj.NailsDecPlus)
                this.O[ L ].dec-=-parseInt(Math.random()*explodeObj.NailsDecPlus);
            this.O[ L ].angle = i;
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

                if(explodeObj.Shards.onHit)        this.O[L].onHit = cloneObj( explodeObj.Shards.onHit );
                if(explodeObj.Shards.onDie)        this.O[L].onDie = cloneObj( explodeObj.Shards.onDie );
                if(explodeObj.Shards.onExpire)    this.O[L].onExpire = cloneObj( explodeObj.Shards.onExpire );
            }
        } else {
            for(i in explodeObj.Shards){
                L = this.putObj('bullet_bomb','comp',O.S,O.x,O.y);
                this.O[L].angle = (O.angle- -explodeObj.Shards[i].Angle- -360)%360;
                this.O[L].speed = explodeObj.Shards[i].Speed;
                this.O[L].doingTime = explodeObj.Shards[i].Dec;

                this.O[L].onHit = cloneObj( explodeObj.Shards[i].onHit );
                this.O[L].onExpire = cloneObj( explodeObj.Shards[i].onExpire );
            }
        }

    this.removeObj(o);

    /*
    this.O[L].onHit = {Do:'explode',Power: 4, Dist: 35};
    this.O[L].onExpire = {Do:'explode',Power: 4, Dist: 35, ShardsNum: 5, Shards:{
        onHit: {Do:'explode',Power: 4, Dist: 35},
        onDie: {Do:'explode',explodeType: 'nails', NailsRad: 12, NailsSpeed: 5, NailsSpeedPlus: 5, NailsDec: 2, NailsDecPlus: 6},
        Dec: 12,
        DecPlus: 10,
        Speed: 3,
        SpeedPlus: 3,
    }};

    {Do:'explode',Power: 4, Dist: 35, explodeType: 'nails', NailsRad: 8, NailsSpeed: 10, NailsSpeedPlus: 0, NailsDec: 36, NailsDecPlus: 10, NailsAngleCenter: 8, NailsAngleBoth: 1};

    this.O[L].onExpire = {Do:'explode',Power: 4, Dist: 35, explodeType: 'nails', NailsRad: 12, NailsSpeed: 5, NailsSpeedPlus: 5, NailsDec: 6, NailsDecPlus: 6};

    this.O[L].onExpire = {Do:'explode',Power: 4, Dist: 35, explodeType: 'nails', NailsRad: 8, NailsSpeed: 5, NailsSpeedPlus: 5, NailsDec: 36, NailsDecPlus: 6, NailsAngleCenter: 8};

    this.O[L].onExpire = {Do:'explode',Power: 4, Dist: 35, explodeType: 'nails', NailsRad: 8, NailsSpeed: 0, NailsSpeedPlus: 10, NailsDec: 36, NailsDecPlus: 6, NailsAngleCenter: 8, NailsAngleBoth: 1};

    this.O[L].onHit = this.O[L].onExpire = this.O[L].onDie = {Do:'explode',explodeType: 'nailsCone', Nails: 40, NailsRad: 220, NailsSpeed: 5, NailsSpeedPlus: 2, NailsDec: 28, NailsDecPlus: 6, NailsAngleCenter: 3};

    Bullet mine:
    onHit: {Do:'explode',Power: 4, Dist: 35, explodeType: 'nails', NailsRad: 24, NailsSpeed: 4, NailsSpeedPlus: 6, NailsDec: 16, NailsDecPlus: 6, NailsNeutral: true},
    onDie: {Do:'explode',Power: 4, Dist: 35, explodeType: 'nails', NailsRad: 24, NailsSpeed: 4, NailsSpeedPlus: 6, NailsDec: 16, NailsDecPlus: 6, NailsNeutral: true}


    this.O[L].onExpire = {Do:'explode',explodeType: 'nailsCone', Nails: 20, NailsRad: 30, NailsSpeed: 5, NailsSpeedPlus: 5, NailsDec: 6, NailsDecPlus: 6};

    this.O[L].onExpire = {Do:'explode',explodeType: 'nailsCone', Nails: 20, NailsRad: 120, NailsSpeed: 5, NailsSpeedPlus: 2, NailsDec: 28, NailsDecPlus: 6, NailsAngleCenter: 3};

    this.O[L].onExpire = {Do:'explode',explodeType: 'roundField', radius:200, fieldAnim: 'DestructionField', PeriodDamage: 1, PeriodTime: 40, PeriodOffset: 50, dontHit:['B','BE']};

    this.O[L].onHit = {Do:'explode',Power: Power || 4, Dist: Dist || 35};
    this.O[L].onExpire = {Do:'explode',explodeType: 'roundField', radius:80, fieldAnim: 'DestructionField', PeriodDamage: 1, PeriodTime: 10, PeriodOffset: 10, ExpireTime: 300};
    this.O[L].onDie = {Do:'explode',explodeType: 'roundField', radius:30, fieldAnim: 'DestructionField', PeriodDamage: 1, PeriodTime: 10, PeriodOffset: 10, ExpireTime: 300};


    this.O[L].onExpire = {Do:'explode',Power: 4, Dist: 35, Shards:[
        {    Dec: 8, Speed: 7, Angle: -30,
            onHit: {Do:'explode',Power: 4, Dist: 35},
            onDie: {Do:'explode',Power: 4, Dist: 35, Shards:[
                {    Dec: 8, Speed: 7, Angle: -15,
                    onHit: {Do:'explode',Power: 4, Dist: 35},
                    onDie: {Do:'explode',Power: 4, Dist: 35, Shards:[
                        {    Dec: 12, Speed: 5, Angle: 0,
                            onHit: {Do:'explode',Power: 4, Dist: 80},
                            onDie: {Do:'explode',Power: 4, Dist: 80},
                        }]
                    },
                }]
            }
        },{    Dec: 16, Speed: 7, Angle: 0,
            onHit: {Do:'explode',Power: 4, Dist: 80},
            onDie: {Do:'explode',Power: 4, Dist: 80, Shards:[
                {    Dec: 12, Speed: 7, Angle: 0,
                    onHit: {Do:'explode',Power: 4, Dist: 120},
                    onDie: {Do:'explode',Power: 4, Dist: 120},
                }]
            }
        },{    Dec: 8, Speed: 7, Angle: 30,
            onHit: {Do:'explode',Power: 4, Dist: 35},
            onDie: {Do:'explode',Power: 4, Dist: 35, Shards:[
                {    Dec: 8, Speed: 7, Angle: 15,
                    onHit: {Do:'explode',Power: 4, Dist: 35},
                    onDie: {Do:'explode',Power: 4, Dist: 35, Shards:[
                        {    Dec: 12, Speed: 5, Angle: 0,
                            onHit: {Do:'explode',Power: 4, Dist: 80},
                            onDie: {Do:'explode',Power: 4, Dist: 80},
                        }]
                    },
                }]
            }
        }]
    };
    */

}
GAMEobject.prototype.addShield = function(o,Duration){
    var O = this.O[o];
    if(O.shieldDimmune) return false;
    O.shieldD = Duration;
}
