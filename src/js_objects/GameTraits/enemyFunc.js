GAMEobject.prototype.shootBulletOnSide = function(o,Enemy,Speed,Dec,SideAngle,SideDist,DMG){
    var O = this.O[o];
    var Xp = O.x- -SideDist * Math.sin((-parseInt(O.angle- -SideAngle)-180)*(Math.PI/180));
    var Yp = O.y- -SideDist * Math.cos((-parseInt(O.angle- -SideAngle)-180)*(Math.PI/180));

    var X = Xp-this.O[Enemy].x;
    var Y = Yp-this.O[Enemy].y;
    var Angle = parseInt(- (Math.atan2(X,Y)*180/Math.PI))%360;

    var L = this.putBullet(O.S,Xp,Yp,Speed,Dec,Angle,DMG);
    return this.O[L];
}
GAMEobject.prototype.shootBulletOnSide2 = function(o,Enemy,Speed,Dec,SideAngle,SideDist,DMG){
    var O = this.O[o];

    var X = O.x-this.O[Enemy].x;
    var Y = O.y-this.O[Enemy].y;
    var Angle = parseInt(- (Math.atan2(X,Y)*180/Math.PI))%360;
    var Xp = O.x- -SideDist * Math.sin((-parseInt(O.angle- -SideAngle)-180)*(Math.PI/180));
    var Yp = O.y- -SideDist * Math.cos((-parseInt(O.angle- -SideAngle)-180)*(Math.PI/180));

    var L = this.putBullet(O.S,Xp,Yp,Speed,Dec,Angle,DMG);
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
GAMEobject.prototype.shootShieldAddMissle = function(o,Target){
    var O = this.O[o];
    var L = this.putObj('energy_field_missle','comp',O.S,O.x,O.y);
    this.O[L].angle = O.angle;
    this.O[L].FollowWho = Target;
    this.O[L].MaxEnergyField = parseInt(this.O[Target].lifeM/2);
}
GAMEobject.prototype.dropSpaceMine = function(S,x,y,Angle,bombData){
    var L = this.putObj('space_mine','comp',S,x,y);
    if(Angle){
        this.O[L].angle=Angle;
        this.O[L].speed=20;
        this.O[L].dec=20;
        this.O[L].toDo=[{T:'slowDown', doingTime: 3, slowBy: 4, doAtStop:{T:'produceSquad'}}];
        this.O[L].doingTime = 3;
    } else {
        delete this.Omoving[L];
    }

    this.cloneExplosionData(bombData, this.O[L]);
}
GAMEobject.prototype.shootBomb = function(o,Angle,Speed,Dec,bombData,teleportData){
    var O = this.O[o];
    var L = this.putObj('bullet_bomb','comp',O.S,O.x,O.y);
    this.O[L].speed = Speed || 10;
    this.O[L].doingTime = Dec || 30;
    this.O[L].angle = Angle;
    if(teleportData)
        this.O[L].TeleportMovement = teleportData;

    this.cloneExplosionData(bombData, this.O[L]);
}
GAMEobject.prototype.addKoriazShield = function(o,Duration,q){
    var L,O = this.O[o];

    if(this.addShield(O,o, {
        name:'koriazMax',
        CatchDmgT:{normal:1,energy:1,acid:1,explo:1},
        DmgReduction: 'infinite',
        ReductionUses: 'infinite',
        ExpireTime: Duration,
    })){
        L = this.putObj_directAnim('addShield', {timeDeath: 5});
        this.O[L].pathD = ['M', parseInt(o), 'L', parseInt(q)];
    }
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
GAMEobject.prototype.addDamageTransfer = function(o,q,Duration){
    if(this.addShield(this.O[o],o, {
        name: 'dmgTransfer',
        CatchDmgT:{normal:1,energy:1,acid:1,explo:1,super:1},
        DmgReduction: 'infinite',
        ReductionUses: 'infinite',
        DmgTransfer: q,
        ExpireTime: Duration,
    })) return true;
    return false;
}
GAMEobject.prototype.mergeShips = function(o,q){
    var O = this.O[o];
    var Q = this.O[q];

    var what = 'slimensen3';
    if(O.T=='slimensen3') what = 'slimensen2';
    if(O.T=='slimensen2') what = 'slimensen1';
    if(O.T=='slimensen1') what = 'slimensen';

    var x = parseInt(O.x- -(O.x-Q.x)/2);
    var y = parseInt(O.y- -(O.y-Q.y)/2);

    var L = this.putObj(what,'comp',O.S,x,y);
    this.O[L].angle = O.angle;
    this.addBoardMods(L);

    O.onDie = false;
    O.onDieDelete = true;
    O.onDieHideExplosion = true;

    Q.onDie = false;
    Q.onDieDelete = true;
    Q.onDieHideExplosion = true;

    this.dieObj(O,o);
    this.dieObj(Q,q);

}
