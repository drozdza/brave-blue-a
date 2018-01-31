
GAMEobject.prototype.mapPlace = function(Setting,Place,defXY){
    if(typeof defXY == 'undefined') defXY = {x:0,y:0,a:0};

    this.mapPlace_setPlaceDef(Setting, Place, defXY);
    this.mapPlace_What(Setting, Place, Place.What, defXY);
    this.mapPlace_removePlaceDef();
}
GAMEobject.prototype.mapPlace_What = function(Setting, Place, What, defXY){
    var Odata,Otype,w,elemI,mapXY,o;
    for(w in What){
        if(isNaN(w)) Odata = {t:w, q:What[w]};
            else     Odata = What[w];

        if(typeof Odata.q == 'undefined')
            Odata.q = 1;

        for(elemI=0; elemI < Odata.q; ++elemI){

            mapXY = this.mapPlace_getPlace(defXY, elemI);
            if(mapXY === false){
                console.log('Error: Not enough mapPlaces!');
                break;
            }
            if(Odata.PlaceGroup){
                this.mapPlace(Setting, Odata, mapXY);
                continue;
            }

            if(Array.isArray(Odata.t)) Otype = Odata.t[ parseInt(Math.random()*Odata.t.length) ];
                        else           Otype = Odata.t;

            if(typeof BBAdata.ShipShortNames[Otype] != 'undefined')
                Otype = BBAdata.ShipShortNames[Otype];

            o = this.putObj(Otype, 1, mapXY.x, mapXY.y);

            if(Odata.Team) this.addToTeam(o, Odata.Team);
            if(Place.Team) this.addToTeam(o, Place.Team);

            if(Odata.Mod) this.addMod(o, Odata.Mod);
            if(Place.Mod) this.addMod(o, Place.Mod);

            if(mapXY.N)
                this.O[o].mapBuildName = mapXY.N;

            if(typeof Place.Construct != 'undefined')
                this.buildConstructs(o, Place.Construct);

            if(typeof Place.Background != 'undefined'){
                CanvasManager.CBM.deleteObjectFromBackground(o,false,1);
                CanvasManager.CBM.addObjectToBackground(o,Place.Background);
                this.removeFromXY(o);
                this.O[o].mapType = false;
            }
        }
    }
}

GAMEobject.prototype.mapPlace_setPlaceDef = function(Setting,Place,defXY){
    if(typeof this.mapPlaceDefs == 'undefined'){
        this.mapPlaceDefs = [];
    }
    var DEF = {};
         if(Place.Random)   DEF.Random   = cloneObj(Place.Random);
    else if(Place.LineOf)   DEF.LineOf   = cloneObj(Place.LineOf);
    else if(Place.RingOf)   DEF.RingOf   = cloneObj(Place.RingOf);
    else if(Place.CircleOf) DEF.CircleOf = cloneObj(Place.CircleOf);
    else if(Place.Point)    DEF.Point    = cloneObj(Place.Point);
    else                    DEF.Point    = {X:0,Y:0};


    if(Place.PlaceGroup){
        DEF.PlaceGroup = cloneObj(Place.PlaceGroup);
        var PG = Setting.PlaceGroups[DEF.PlaceGroup.N];

        defXY = sumTwoXYA(defXY, {x:DEF.PlaceGroup.X || 0, y:DEF.PlaceGroup.Y || 0, a:DEF.PlaceGroup.Angle || 0});

        if(PG.Add){
            DEF.Spots={};
            DEF.FreeSpots=[];
            var iSpot = 0;
            for(var iAdd in PG.Add){
                var ADD = PG.Add[iAdd];
                var iMax = 500;
                for(var placeI = 0; placeI < iMax; ++placeI){
                    var mapXY = this.mapPlace_getPosFromDEF(ADD, defXY, placeI);
                    if(mapXY === false) break;

                    DEF.Spots[iSpot] = cloneObj(mapXY);
                    if(ADD.N) DEF.Spots[iSpot].N = ADD.N;
                    DEF.FreeSpots.push(iSpot);
                    ++iSpot;

                    if(placeI > 500){
                        console.log('Error: TOO LOOPY!!!!!!!!!!!!!!!');
                        break;
                    }
                }

            }
            if(PG.AddShuffle) DEF.FreeSpots = ArrayShuffle(DEF.FreeSpots);
        }
        if(PG.Remove)
            for(var iRemove in PG.Remove)
                this.mapPlace_removeTagFromDEF(PG.Remove[iRemove], defXY);
    }

    this.mapPlaceDefs.push(DEF);

    if(PG = Place.PalceGroup && PG.Add){
        for(var iAdd in PG.Add){
            if(PG.Add[iAdd].What){
                this.mapPlace_What(Setting, PG.Add[iAdd], PG.Add[iAdd].What, defXY);
            }
        }
    }
}
GAMEobject.prototype.mapPlace_removePlaceDef = function(){
    delete (this.mapPlaceDefs[ this.mapPlaceDefs.length-1 ]);
    this.mapPlaceDefs.length--;
}

GAMEobject.prototype.mapPlace_getPlace = function(defXY, elemI){
    var DEF = this.mapPlaceDefs[ this.mapPlaceDefs.length-1 ];
    var mapXY = false;

    if(DEF.PlaceGroup){
        if(DEF.FreeSpots.length < 1) return false;
        var iSpot = DEF.FreeSpots.shift();
        mapXY = DEF.Spots[ iSpot ];
    } else {
        mapXY = this.mapPlace_getPosFromDEF(DEF, defXY, elemI);
    }

    return mapXY;
}

GAMEobject.prototype.mapPlace_getPosFromDEF = function(DEF, defXY, elemI){
    var x,y,a,SET,Radi = Math.PI/180;

    if(DEF.Point)    SET = DEF.Point;
    if(DEF.Random)   SET = DEF.Random;
    if(DEF.LineOf)   SET = DEF.LineOf;
    if(DEF.RingOf)   SET = DEF.RingOf;
    if(DEF.CircleOf) SET = DEF.CircleOf;

    var centerXY = sumTwoXYA(defXY, {x:SET.X || 0, y:SET.Y || 0, a:SET.Angle || 0});

    x = centerXY.x;
    y = centerXY.y;
    a = centerXY.a;

    if(DEF.Random){
        do{
            x = Math.random()*SET.Radius*2-SET.Radius;
            y = Math.random()*SET.Radius*2-SET.Radius;
        }while( (x*x- -y*y) > SET.Radius*SET.Radius );
        x-=-centerXY.x;
        y-=-centerXY.y;
    }
    if(DEF.LineOf){
        x = centerXY.x- -elemI*SET.Distance*Math.cos(centerXY.a*Radi);
        y = centerXY.y- -elemI*SET.Distance*Math.sin(centerXY.a*Radi);
    }
    if(DEF.CircleOf){
        if(SET.Max && SET.Max <= elemI) return false;
        if(SET.AnglePlus*elemI >= 360 || SET.AnglePlus*elemI <= -360) return false;
        a = centerXY.a- -elemI*SET.AnglePlus;
        x = centerXY.x- -SET.Radius*Math.cos(a*Radi);
        y = centerXY.y- -SET.Radius*Math.sin(a*Radi);
    }
    if(DEF.RingOf){
        var rAngle = Math.random()*360;
        var Dist = SET.Radius;
        if(SET.RadiusPlus) Dist-=-Math.random()*SET.RadiusPlus;
        x = centerXY.x- -Dist*Math.cos(rAngle*Radi);
        y = centerXY.y- -Dist*Math.sin(rAngle*Radi);
    }
    return {x:x, y:y, a:a};
}

GAMEobject.prototype.mapPlace_removeTagFromDEF = function(DEF, defXY){
    if(DEF.Circle) SET = DEF.Circle;

    var centerXY = sumTwoXYA(defXY, {x:SET.X || 0, y:SET.Y || 0, a:SET.Angle || 0});

    if(DEF.Circle){
        for(var o in this.O){
            var O = this.O[o];
            if(O.mapBuildName && O.mapBuildName == DEF.N){
                var vX = centerXY.x - O.x;
                var vY = centerXY.y - O.y;
                if(Math.sqrt(vX*vX- -vY*vY) < SET.Radius){
                    O.TT='toDelete';
                    CanvasManager.CBM.deleteObjectFromBackground(o);
                    this.dieObj(o);
                    this.removeObj(o);
                }
            }
        }
    }
}
