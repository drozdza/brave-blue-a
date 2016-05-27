
GAMEobject.prototype.findTabTiles = function(o,ox,oy,M){
    var X1,Y1,X2,Y2,xi,yi,x,y, X,Y, tabS={}, O = this.O[o];

    if(typeof O.squareCorners !='undefined'){
        X1 = O.squareCorners.E.x1;
        Y1 = O.squareCorners.E.y1;
        X2 = O.squareCorners.E.x2;
        Y2 = O.squareCorners.E.y2;
    }else{
        X1 = ox - O.radius;
        Y1 = oy - O.radius;
        X2 = ox- -O.radius;
        Y2 = oy- -O.radius;
    }

    xi = parseInt(X1/M); if(X1<0) xi-=1;
    yi = parseInt(Y1/M); if(Y1<0) yi-=1;
    X = parseInt(X2/M); if(X2<0) X-=1;
    Y = parseInt(Y2/M); if(Y2<0) Y-=1;

    for(x=xi; x<=X; ++x){
        for(y=yi; y<=Y; ++y)
            tabS[ x+'_'+y ]=1;
    }
    return tabS;
}

GAMEobject.prototype.putOnXY = function(o,ox,oy){
    var O = this.O[o];
    var s,oldS={},newS={};

    if(typeof oy!='undefined'){
        oldS = this.findTabTiles(o,ox,oy,this.MapTileSize);
    } else {
        this.Omap[O.mapType].elems++;
    }

    newS = this.findTabTiles(o,O.x,O.y,this.MapTileSize);

    for(s in oldS)
        if(newS[s]!=1)
            if(typeof this.Omap[O.mapType][s] !='undefined' && typeof this.Omap[O.mapType][s][o] !='undefined')
                delete this.Omap[O.mapType][s][o];

    for(s in newS)
        if(oldS[s]!=1){
            if(typeof this.Omap[O.mapType][s] == 'undefined')
                this.Omap[O.mapType][s]={};
            this.Omap[O.mapType][s][o]=1;
        }
}
GAMEobject.prototype.removeFromXY = function(o,addToDead){    //!!
    var O = this.O[o];
    var s,oldS={};

    oldS = this.findTabTiles(o,O.x,O.y,this.MapTileSize);

    this.Omap[O.mapType].elems--;

    for(s in oldS)
        if(typeof this.Omap[O.mapType][s] !='undefined' && typeof this.Omap[O.mapType][s][o] !='undefined')
            delete this.Omap[O.mapType][s][o];

    if(addToDead)
        for(s in oldS){
            if(typeof this.Omap['D'][s]=='undefined')
                this.Omap['D'][s]={};
            this.Omap['D'][s][o]=1;
        }
}
GAMEobject.prototype.getCollidingWithCircle = function(x,y,radius,collisionTab){
    var yi,oX,oY,oR,X,Y,F,Map,Found={},FoundR={};
    var X1 = x - radius;
    var Y1 = y - radius;
    var X2 = x- -radius;
    var Y2 = y- -radius;
    var M = this.MapTileSize;
    var xi = X1;

    var jestCokolwiek = false;
    for(var ColT in collisionTab)
        if(this.Omap[ collisionTab[ColT] ].elems > 0){ jestCokolwiek=true; break; }
    if(!jestCokolwiek) return {};

    while(true){
        if(xi>X2) xi=X2;
        yi=Y1;
        while(true){
            if(yi>Y2) yi=Y2;
            for(var ColT in collisionTab){
                X = parseInt(xi/M); if (xi<0) X-=1;
                Y = parseInt(yi/M); if (yi<0) Y-=1;
                if(typeof this.Omap[ collisionTab[ColT] ][ X+'_'+Y ] !='undefined'){
                    Map = this.Omap[ collisionTab[ColT] ][ X+'_'+Y ];
                    for(F in Map)
                        Found[F]=1;
                }
            }
            if(yi==Y2) break;
            yi-=-M;
        }
        if(xi==X2) break;
        xi-=-M;
    }

    for(F in Found) if(typeof this.O[F] != 'undefined'){
        if(typeof this.O[F].squareCorners != 'undefined'){
            if(this.checkSquareAndCircle(this.O[F],x,y,radius)){
                FoundR[F]=1;
            }
        }else if(typeof this.O[F].coneAngle != 'undefined'){
            if(this.checkConeAndCircle(this.O[F],x,y,radius)){
                FoundR[F]=1;
            }
        } else {
            oX = this.O[F].x-x;
            oY = this.O[F].y-y;
            oR = this.O[F].radius- -radius;
            if(oR*oR > oX*oX- -oY*oY){
                FoundR[F]=1;
            }
        }
    }
    return FoundR;
}
GAMEobject.prototype.getCollidingWithSquare = function(O,collisionTab){
    var yi,oX,oY,oR,X,Y,F,Map,Found={},FoundR={};
    var X1 = O.squareCorners.E.x1;
    var Y1 = O.squareCorners.E.y1;
    var X2 = O.squareCorners.E.x2;
    var Y2 = O.squareCorners.E.y2;
    var M = this.MapTileSize;
    var xi = X1;

    var jestCokolwiek = false;
    for(var ColT in collisionTab)
        if(this.Omap[ collisionTab[ColT] ].elems > 0){ jestCokolwiek=true; break; }
    if(!jestCokolwiek) return {};

    while(true){
        if(xi>X2) xi=X2;
        yi=Y1;
        while(true){
            if(yi>Y2) yi=Y2;
            for(var ColT in collisionTab){
                X = parseInt(xi/M); if (xi<0) X-=1;
                Y = parseInt(yi/M); if (yi<0) Y-=1;
                if(typeof this.Omap[ collisionTab[ColT] ][ X+'_'+Y ] !='undefined'){
                    Map = this.Omap[ collisionTab[ColT] ][ X+'_'+Y ];
                    for(F in Map)
                        Found[F]=1;
                }
            }
            if(yi==Y2) break;
            yi-=-M;
        }
        if(xi==X2) break;
        xi-=-M;
    }

    for(F in Found) if(typeof this.O[F] !='undefined'){
        if(this.checkSquareAndCircle(O,this.O[F].x,this.O[F].y,this.O[F].radius)){
            FoundR[F]=1;
        }
    }
    return FoundR;
}
GAMEobject.prototype.getCollidingWithCone = function(O,collisionTab){
    var IDs={},yi,X,Y,F,Map,Found={},FoundR={};
    var X1 = O.x - O.radius;
    var Y1 = O.y - O.radius;
    var X2 = O.x- -O.radius;
    var Y2 = O.y- -O.radius;
    var M = this.MapTileSize;
    var xi = X1;

    var jestCokolwiek = false;
    for(var ColT in collisionTab)
        if(this.Omap[ collisionTab[ColT] ].elems > 0){ jestCokolwiek=true; break; }
    if(!jestCokolwiek) return {};

    while(true){
        if(xi>X2) xi=X2;
        yi=Y1;
        while(true){
            if(yi>Y2) yi=Y2;
            X = parseInt(xi/M); if (xi<0) X-=1;
            Y = parseInt(yi/M); if (yi<0) Y-=1;
            IDs[ X+'_'+Y ]=1;
            if(yi==Y2) break;
            yi-=-M;
        }
        if(xi==X2) break;
        xi-=-M;
    }

    for(var ID in IDs)
        for(var ColT in collisionTab)
            if(typeof this.Omap[ collisionTab[ColT] ][ ID ] !='undefined'){
                Map = this.Omap[ collisionTab[ColT] ][ ID ];
                for(F in Map)
                        Found[F]=1;
            }

    for(F in Found) if(typeof this.O[F] !='undefined'){
        if(this.checkConeAndCircle(O,this.O[F].x,this.O[F].y,this.O[F].radius)){
            FoundR[F]=1;
        }
    }

    return FoundR;
}
GAMEobject.prototype.checkSquareAndCircle = function(O,Qx,Qy,Qradius){
    var Radi=Math.PI/180;
    var x2 = O.x- -O.squareLen*Math.sin( (-parseInt(O.squareAngle)-180)*Radi);
    var y2 = O.y- -O.squareLen*Math.cos( (-parseInt(O.squareAngle)-180)*Radi);

    var A = Qx - O.x- -Qradius*Math.sin((-parseInt(O.squareAngle)-180)*Radi);
    var B = Qy - O.y- -Qradius*Math.cos((-parseInt(O.squareAngle)-180)*Radi);
    var C = x2 - O.x- -2*Qradius*Math.sin((-parseInt(O.squareAngle)-180)*Radi);
    var D = y2 - O.y- -2*Qradius*Math.cos((-parseInt(O.squareAngle)-180)*Radi);

    var dot = A*C- -B*D;
    var len_sq = C*C- -D*D;
    var param = -1;
    if (len_sq != 0)
        param = dot / len_sq;

    if(param >=0 && param <= 1){
        var oX = Qx - O.x - param*C;
        var oY = Qy - O.y - param*D;
        var oR = Qradius- -O.squareWidth;
        if(oR*oR > oX*oX- -oY*oY){
            return true;
        }
    }
    return false;
}
GAMEobject.prototype.checkConeAndCircle = function(O,Qx,Qy,Qradius){
    var oX = O.x-Qx;
    var oY = O.y-Qy;
    var oR = O.radius- -Qradius;
    if(oR*oR < oX*oX- -oY*oY)
        return false;

    if(O.coneRad2 != 0){
        oR = O.coneRad2 - Qradius;
        if(oR*oR > oX*oX- -oY*oY)
            return false;
    }

    if(O.coneAngle < 180){
        var oA = parseInt(-Math.atan2(oX,oY)*(180/Math.PI)- -360)%360;
        var qA1 = (O.angle - O.coneAngle- -360)%360;
        var qA2 = (O.angle- -O.coneAngle- -360)%360;
        if(qA1 > qA2){
            if(!(oA > qA1 || oA < qA2)) return false;
        }else{
            if(!(oA > qA1 && oA < qA2)) return false;
        }
    }
    return true;
}
GAMEobject.prototype.countSquareCorners = function(x,y,angle,len,width){
    var sC={A:{},B:{},C:{},D:{},E:{}};
    var Radi=Math.PI/180;

    sC.A.x = x - width * Math.sin( (-parseInt(angle) - 90)*Radi);
    sC.A.y = y - width * Math.cos( (-parseInt(angle) - 90)*Radi);
    sC.D.x = x - width * Math.sin( (-parseInt(angle)- -90)*Radi);
    sC.D.y = y - width * Math.cos( (-parseInt(angle)- -90)*Radi);

    x -=- len * Math.sin( (-parseInt(angle)-180)*Radi);
    y -=- len * Math.cos( (-parseInt(angle)-180)*Radi);

    sC.B.x = x - width * Math.sin( (-parseInt(angle) - 90)*Radi);
    sC.B.y = y - width * Math.cos( (-parseInt(angle) - 90)*Radi);
    sC.C.x = x - width * Math.sin( (-parseInt(angle)- -90)*Radi);
    sC.C.y = y - width * Math.cos( (-parseInt(angle)- -90)*Radi);

    sC.E.x1 = sC.A.x;
    sC.E.x2 = sC.A.x;
    sC.E.y1 = sC.A.y;
    sC.E.y2 = sC.A.y;

    for(var j in {'B':1,'C':1,'D':1}){
        if(sC.E.x1 > sC[j].x) sC.E.x1 = sC[j].x;
        if(sC.E.x2 < sC[j].x) sC.E.x2 = sC[j].x;
        if(sC.E.y1 > sC[j].y) sC.E.y1 = sC[j].y;
        if(sC.E.y2 < sC[j].y) sC.E.y2 = sC[j].y;
    }

    return sC;
}
