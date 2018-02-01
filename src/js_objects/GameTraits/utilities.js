
GAMEobject.prototype.shootLaser = function(o,Distance,Damage,angle){
    var X,Y,Ox,Oy,Found,D,F,shipShoot=false, O = this.O[o];

    if(typeof O == 'undefined') return false;

    var Angle = 0;
    if(typeof O != 'undefined' && typeof O.laserAngle != 'undefined')
        Angle = O.laserAngle;
    if(typeof angle != 'undefined')
        Angle = angle;

    var enemyArr=['P','M','E','R'];
    if(O.S==2) enemyArr=['E','ME','A','R'];

    var animType = 'laserShoot';
    var animsTab = ['violet', 'blue', 'lightblue', 'lightgreen', 'yellow', 'orange', 'red'];
    animType = 'laserShoot_' + animsTab[ parseInt(Math.random()*7) ];

    var L = this.putObj_directAnim(animType, {timeDeath: 12});
    Ox = O.x;
    Oy = O.y;

    var pathD =['M',{x: Ox, y: Oy}];
    var Damaged={};
    for(D=0; D<=Distance; D+=10){
        Ox = Ox- - 10 * Math.sin( (-parseInt(Angle)-180)*(Math.PI/180));
        Oy = Oy- - 10 * Math.cos( (-parseInt(Angle)-180)*(Math.PI/180));

        Found = this.getCollidingWithCircle(Ox, Oy, 10, enemyArr);

        for(F in Found){
            if(this.O[F].bounceType){
                pathD=pathD.concat(['L',{x: Ox, y: Oy}]);
                Angle = this.regionAngleChange(this.O[F],{x:Ox,y:Oy,angle:Angle,speed:20}).angle;
            } else {
                Damaged[F]=1;
            }
        }
    }
    this.O[ L ].pathD = pathD.concat(['L',{x: Ox, y: Oy}]);

    delete(Damaged[o]);
    for(var d in Damaged)
        this.makeDMG(d,Damage);
    return {x: Ox, y: Oy};
}

GAMEobject.prototype.teleportJump = function(o,Distance,angle,graphicType){
    var L,Angle,F,Found,oldX,oldY,Ox,Oy,O = this.O[o];
    var graphic = graphicType || 'TP_track';

    if(graphic == 'TP_track')
        this.putObj_animation('hit_blue', O.x, O.y);
    L = this.putObj_directAnim(graphic, {timeDeath: 18});
    oldX = Ox = O.x;
    oldY = Oy = O.y;
    Angle = angle;

    var pathD =['M',{x: Ox, y: Oy}];
    var K =10;
    for(var D=0; D<=Distance;){
        Ox = Ox- - K * Math.sin( (-parseInt(Angle)-180)*(Math.PI/180));
        Oy = Oy- - K * Math.cos( (-parseInt(Angle)-180)*(Math.PI/180));

        Found = this.getCollidingWithCircle(Ox, Oy, O.radius, ['A','R']);
        for(F in Found)
            if(this.O[F].bounceTeleport){
                pathD = pathD.concat(['L',{x: Ox, y: Oy}]);
                Angle = this.regionAngleChange(this.O[F],{x:Ox,y:Oy,angle:Angle,speed:K}).angle;
            }
        if(D==Distance) break;
        D+=10;
        if(D>Distance){
            K = Distance-D- -10;
            D = Distance;
        }
    }
    O.x = Ox;
    O.y = Oy;
    this.O[ L ].pathD=pathD.concat(['L',{x: Ox, y: Oy}]);
    if(O.T!='bullet')
        this.putOnXY(O, oldX, oldY);
    if(graphic == 'TP_track')
        this.putObj_animation('hit_blue', Ox, Oy);
    if(graphic == 'TP_trackDark')
        this.putObj_animation('hit_red', Ox, Oy);

    return true;
}

GAMEobject.prototype.countFutureShoot = function(o,Sx,Sy,Speed,Dec){
    var R=false,X=0,Y=0,A=0,O = this.O[o];
    var Ox=O.x;
    var Oy=O.y;
    var Oa=O.angle;
    var Rad=0;
    for(var d=0; d<Dec; ++d){
        Ox -=- O.speed * Math.sin( (-parseInt(Oa)-180)*(Math.PI/180));
        Oy -=- O.speed * Math.cos( (-parseInt(Oa)-180)*(Math.PI/180));
        Ox = Ox.toFixed(2);
        Oy = Oy.toFixed(2);
        Oa -=- O.lastSpeedT;
        Rad-=-Speed;
        if(Rad >= Math.sqrt(Math.pow(Sx-Ox,2)- -Math.pow(Sy-Oy,2))){
            X=Ox;
            Y=Oy;
            R=true;
            A=parseInt(- (Math.atan2(Sx-Ox,Sy-Oy)*180/Math.PI))%360;
            break;
        }
    }
    return {r:R,x:X,y:Y,a:A};
}
