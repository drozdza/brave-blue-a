GAMEobject.prototype.buildConstructs = function(o,constructType,distMin,distMax){
    var O = this.O[o];
    O.constructBuilder = constructType;
    O.constructsDone = {};

    var nearList = this.getCollidingWithCircle(O.x,O.y,distMax,['A']);
    for(var q in nearList){
        var Q = this.O[q];
        if(typeof Q.constructBuilder != 'undefined' && Q.constructBuilder==constructType)
            if(typeof Q.constructsDone[q+'_'+o] == 'undefined')
                this.trySetConstruct(O,o,Q,q, constructType,distMin,distMax);
    }
}

GAMEobject.prototype.trySetConstruct = function(O,o, Q,q, constructType,distMin,distMax){
    var x = O.x - Q.x;
    var y = O.y - Q.y;

    var dist = Math.sqrt(x*x- -y*y);
    var distReal = dist-O.radius-Q.radius;
    if(distReal >= distMin && distReal <= distMax){

        var angle = -Math.atan2(x,y)*(180/Math.PI);
        var xx = O.x- -O.radius*Math.sin((-180-angle)*(Math.PI/180));
        var yy = O.y- -O.radius*Math.cos((-180-angle)*(Math.PI/180));

        var L = this.putObj('SquareField','region',1,x,y);
        this.addBoardMod(L,{x:xx,y:yy,squareLen:distReal,squareAngle:angle,squareWidth:20,simpleFilling: 'rgba(255,255,0,0.6)', bounceType:'diagonal',bounceTeleport:true});
        Q.constructsDone[q+'_'+o] = L;
        O.constructsDone[o+'_'+q] = L;
        O.onDieDesroyConstructs = true;
        Q.onDieDesroyConstructs = true;
    }
}
GAMEobject.prototype.onDieDesroyConstructs = function(O,o){
    for(var c in O.constructsDone){
        var co = O.constructsDone[c];
        if(typeof this.O[co] == 'undefined') continue;
        CanvasManager.CBM.deleteObjectFromBackground(co);
        this.removeObj(co);
    }
}
