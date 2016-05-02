
GAMEobject.prototype.shipShoot = function(AngleMod,Speed,Dec,Power){
    var O = this.O[0];
    var Angle = parseInt(- (Math.atan2(this.mouseX-O.x,this.mouseY-O.y)*180/Math.PI)- -180)%360;
    if(AngleMod) Angle-=-AngleMod;
    this.shootBullet(0,Angle,(Speed || 15),(Dec || 30),Power);
}
GAMEobject.prototype.shipShootOnSide = function(SideAngle,SideDist,Speed,Dec,Power){
    var O = this.O[0];
    var Xp = O.x- -SideDist * Math.sin((-parseInt(O.angle- -SideAngle)-180)*(Math.PI/180));
    var Yp = O.y- -SideDist * Math.cos((-parseInt(O.angle- -SideAngle)-180)*(Math.PI/180));

    var Angle = parseInt(- (Math.atan2(this.mouseX-O.x,this.mouseY-O.y)*180/Math.PI)- -180)%360;
    var L = this.putObj('bullet','comp',O.S,Xp,Yp);
    this.O[L].speed = Speed || 15;
    this.O[L].dec = Dec || 30;
    this.O[L].angle = Angle;
    this.O[L].Power = Power;
}
GAMEobject.prototype.shipShootMissle = function(Enemy,Angle,Speed,Dec,SpeedT,Power){
    var O = this.O[0];
    var E = this.O[Enemy];

    var L = this.putObj('missle','comp',O.S,O.x,O.y);
    this.O[L].speed = Speed || 12;
    this.O[L].speedT = SpeedT || 3;
    this.O[L].doingTime = Dec || 30;
    this.O[L].FollowWho = Enemy;
    this.O[L].Power = Power;
    this.O[L].angle = Angle;
    this.O[L].onHit = {Do:'explode',Power: 3,Dist: 35};
    // this.O[L].onDie = {Do:'explode',Power: 3,Dist: 35};
    this.O[L].onExpire = {Do:'explode',Power: 3,Dist: 35};
}
GAMEobject.prototype.shipShootBomb = function(Speed,Dec,Power,Dist){
    var O = this.O[0];
    var Angle = parseInt(- (Math.atan2(this.mouseX-O.x,this.mouseY-O.y)*180/Math.PI)- -180)%360;
    var L = this.putObj('bullet_bomb','comp',O.S,O.x,O.y);
    this.O[L].speed = Speed || 10;
    this.O[L].doingTime = Dec || 30;
    this.O[L].angle = Angle;

    this.O[L].onHit = this.O[L].onDie = this.O[L].onExpire = {Do:'explode',Power: 7, Dist: 80};
}
GAMEobject.prototype.shipShootLaser = function(Distance,Damage){
    var O = this.O[0];
    var Angle = parseInt(- (Math.atan2(this.mouseX-O.x,this.mouseY-O.y)*180/Math.PI)- -180)%360;
    this.shootLaser(0,Distance,Damage,Angle);
}
