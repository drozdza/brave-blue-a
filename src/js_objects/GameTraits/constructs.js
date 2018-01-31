GAMEobject.prototype.buildConstructs = function(o,SETconstruct){
    var O = this.O[o];
    O.constructBuilder = SETconstruct.N;
    O.constructsDone = {};

    var nearList = this.getCollidingWithCircle(O.x,O.y,SETconstruct.Max,['A']);
    for(var q in nearList){
        var Q = this.O[q];
        if(typeof Q.constructBuilder != 'undefined' && Q.constructBuilder==SETconstruct.N)
            if(typeof Q.constructsDone[q+'_'+o] == 'undefined'){
                var x = O.x - Q.x;
                var y = O.y - Q.y;

                var dist = Math.sqrt(x*x- -y*y);
                var distReal = dist-O.radius-Q.radius;
                if(distReal >= SETconstruct.Min && distReal <= SETconstruct.Max){

                    var angle = -Math.atan2(x,y)*(180/Math.PI);
                    var xx = O.x- -O.radius*Math.sin((-180-angle)*(Math.PI/180));
                    var yy = O.y- -O.radius*Math.cos((-180-angle)*(Math.PI/180));

                    var objData = {
                        x: xx,
                        y: yy,
                        squareLen: distReal,
                        squareAngle: angle,
                        squareWidth: 20,
                        simpleFilling: 'rgba(255,255,0,0.6)',
                        bounceType: 'diagonal',
                        bounceTeleport:true,
                    };

                    var L = this.putObj('SquareField',1,x,y);
                    this.addMod(L, objData);
                    Q.constructsDone[q+'_'+o] = L;
                    O.constructsDone[o+'_'+q] = L;
                    O.onDieDesroyConstructs = true;
                    Q.onDieDesroyConstructs = true;
                }
            }
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
