GAMEobject.prototype.mapPlace = function(Setting,Place,defXY){
    var Odata,Otype;

    if(typeof defXY == 'undefined') defXY = {x:0,y:0,a:0};

    // tu trzeba podać defX, defY, defA;
    this.mapPlace_setPlaceDef(Setting,Place,defXY);

    for(var placeWhat in Place.What){
        if(isNaN(placeWhat)) Odata = {t:placeWhat, q:Place.What[placeWhat]};
                else         Odata = Place.What[placeWhat];

        for(var elemI=0; elemI < Odata.q; ++elemI){

            var mapXY = this.mapPlace_getPlace(defXY, elemI);
            if(mapXY === false){
                console.log('ERROR: not enough mapPlaces!');
                break;
            }
            if(Odata.PlaceGroup){
                this.mapPlace(Setting, Odata, mapXY);
                // console.log('mamy to');
                continue;
            }

            if(Array.isArray(Odata.t)) Otype = Odata.t[ parseInt(Math.random()*Odata.t.length) ];
                        else           Otype = Odata.t;

            if(typeof BBAdata.ShipNames[Otype] != 'undefined') Otype = BBAdata.ShipNames[Otype];

            if(Otype=='StarX'){
                var LI = ['','M','S','L'];
                var L = this.putObj('Star'+LI[ parseInt(Math.random()*4) ], 1, mapXY.x, mapXY.y);
            }else if(Otype=='RoundField'){
                var L = this.putObj('RoundField', 1, mapXY.x, mapXY.y);
            }else if(Otype=='SquareField'){
                var L = this.putObj('SquareField', 1, mapXY.x, mapXY.y);
            }else if(Otype=='ConeField'){
                var L = this.putObj('ConeField',1, mapXY.x, mapXY.y);
            }else if(Otype=='Mine'){
                var L = this.putObj('space_mine',1, mapXY.x, mapXY.y);
                ++this.C['B_minesSet'];
                ++this.C['E:mines'];
            } else {
                var L = this.putObj(Otype,1, mapXY.x, mapXY.y);
                this.addBoardMods(L);
                if(typeof Place.GroupMods !='undefined')
                    for(var k in Place.GroupMods)
                        this.addBoardMod(L,Place.GroupMods[k]);

                var Team = false;
                if(typeof Place.Team != 'undefined') Team = Place.Team;
                if(typeof Odata.Team != 'undefined') Team = Odata.Team;
                if(Team){
                    // this.addToTeam(L, Team);
                    this.addTeamMods(L, Team);
                }
            }
            if(mapXY.N)
                this.O[L].mapBuildName = mapXY.N;

            if(typeof Place.Construct != 'undefined')
                this.buildConstructs(L, Place.Construct);

            if(typeof Place.Background != 'undefined'){
                CanvasManager.CBM.deleteObjectFromBackground(L,false,1);
                CanvasManager.CBM.addObjectToBackground(L,Place.Background);
                this.removeFromXY(L);
                this.O[L].mapType = false;
            }

            if(typeof Place.objData !='undefined' && L!=-1)
                this.addBoardMod(L,Place.objData);
        }
    }
    this.mapPlace_removePlaceDef();
}
GAMEobject.prototype.mapPlace_setPlaceDef = function(Setting,Place,defXY){
    if(typeof this.mapPlaceDefs == 'undefined'){
        this.mapPlaceDefs = [];
    }
    var DEF = {};
    if(Place.Random)   DEF.Random   = cloneObj(Place.Random);
    if(Place.LineOf)   DEF.LineOf   = cloneObj(Place.LineOf);
    if(Place.RingOf)   DEF.RingOf   = cloneObj(Place.RingOf);
    if(Place.CircleOf) DEF.CircleOf = cloneObj(Place.CircleOf);

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
                        console.log('TOO LOOPY!!!!!!!!!!!!!!!');
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

    if(DEF.Random)   SET = DEF.Random;
    if(DEF.LineOf)   SET = DEF.LineOf;
    if(DEF.RingOf)   SET = DEF.RingOf;
    if(DEF.CircleOf) SET = DEF.CircleOf;

    var centerXY = sumTwoXYA(defXY, {x:SET.X || 0, y:SET.Y || 0, a:SET.Angle || 0});

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
