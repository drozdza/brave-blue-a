
GAMEobject.prototype.shipShoot = function(AngleMod,Speed,Dec,DMG){
    var O = this.O[0];
    var Angle = parseInt(- (Math.atan2(this.mouseX-O.x,this.mouseY-O.y)*180/Math.PI)- -180)%360;
    if(AngleMod) Angle-=-AngleMod;
    this.putBullet(O.S,O.x,O.y,(Speed || 15),(Dec || 30),Angle,DMG);
}
GAMEobject.prototype.shipShootOnSide = function(SideAngle,SideDist,Speed,Dec,DMG){
    var O = this.O[0];
    var Xp = O.x- -SideDist * Math.sin((-parseInt(O.angle- -SideAngle)-180)*(Math.PI/180));
    var Yp = O.y- -SideDist * Math.cos((-parseInt(O.angle- -SideAngle)-180)*(Math.PI/180));

    var Angle = parseInt(- (Math.atan2(this.mouseX-O.x,this.mouseY-O.y)*180/Math.PI)- -180)%360;
    var L = this.putBullet(O.S,Xp,Yp, Speed || 15, Dec || 30, Angle, DMG);
}
GAMEobject.prototype.shipShootMissile = function(Enemy,Angle,Speed,Dec,SpeedT,destrData){
    var O = this.O[0];
    var E = this.O[Enemy];

    var L = this.putObj('missile',O.S,O.x,O.y);
    this.O[L].speed = Speed || 12;
    this.O[L].speedT = SpeedT || 3;
    this.O[L].doingTime = Dec || 30;
    this.O[L].FollowWho = Enemy;
    this.O[L].angle = Angle;

    if(destrData.DMG)
        this.O[L].DMG = cloneObj(destrData.DMG);
    if(destrData.explodePreset)
        this.cloneExplosionData(destrData, this.O[L]);

    ++this.C['B_missiles'];
    ++this.C['B_s'+O.S+'_missiles'];
}
GAMEobject.prototype.shipShootBomb = function(Speed,Dec,bombData,teleportData){
    var O = this.O[0];
    var Angle = parseInt(- (Math.atan2(this.mouseX-O.x,this.mouseY-O.y)*180/Math.PI)- -180)%360;
    var L = this.putObj('bullet_bomb',O.S,O.x,O.y);
    this.O[L].speed = Speed || 10;
    this.O[L].doingTime = Dec || 30;
    this.O[L].angle = Angle;

    if(teleportData)
        this.O[L].TeleportMovement = teleportData;

    this.cloneExplosionData(bombData, this.O[L]);

    ++this.C['B_bombsShot'];
    ++this.C['B_s'+O.S+'_bombsShot'];
}
GAMEobject.prototype.shipShootLaser = function(Distance,Damage){
    var P = this.O[0];
    var Angle = parseInt(- (Math.atan2(this.mouseX-P.x,this.mouseY-P.y)*180/Math.PI)- -180)%360;
    this.shootLaser(P,Distance,Damage,Angle);
}
GAMEobject.prototype.shipTeleportBomb = function(Distance,offTime,bombData){
    var O = this.O[0];

    var iX = O.x-this.mouseX;
    var iY = O.y-this.mouseY;
    var iDist = Math.sqrt(iX*iX- -iY*iY);
    var iRad = parseInt(- (Math.atan2(iX,iY)*180/Math.PI))%360;
    if(iDist > Distance)
        iDist = Distance;

    var Angle = parseInt(- (Math.atan2(this.mouseX-O.x,this.mouseY-O.y)*180/Math.PI)- -180)%360;
    var L = this.putObj('bullet_bomb',O.S,O.x,O.y);
    this.O[L].speed = 0;
    this.O[L].doingTime = offTime;
    this.O[L].angle = iRad;
    this.cloneExplosionData(bombData, this.O[L]);

    if(bombData.dontCollide){
        this.O[L].mapCollide = [];
        this.O[L].mapType = 'A';
    }

    ++this.C['B_bombsShot'];
    ++this.C['B_s'+O.S+'_bombsShot'];

    return this.teleportJump(L,iDist,iRad,'TP_trackDark');
}
GAMEobject.prototype.shipShootDistanceBomb = function(Speed,Dec,offTime,bombData){
    var O = this.O[0];

    var Distance = Speed*Dec;
    var iX = O.x-this.mouseX;
    var iY = O.y-this.mouseY;
    var iDist = Math.sqrt(iX*iX- -iY*iY);
    var iRad = parseInt(- (Math.atan2(iX,iY)*180/Math.PI))%360;
    if(iDist > Distance){
        iDist = Distance;
    } else {
        Dec = parseInt((iDist/Speed)- -0.49);
    }
    if(bombData.minDec && bombData.minDec > Dec)
        Dec = bombData.minDec;


    this.shipShootBomb(Speed,Dec,bombData);
}
