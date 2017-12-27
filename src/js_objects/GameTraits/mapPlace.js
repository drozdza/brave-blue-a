GAMEobject.prototype.mapPlace = function(Setting,Place,defX,defY){
    var Odata,Otype;

    if(typeof defX == 'undefined'){
        defX = 0;
        defY = 0;
    }

    this.mapPlace_setPlaceDef(Setting,Place);

    for(var placeWhat in Place.What){
        if(isNaN(placeWhat)) Odata = {t:placeWhat, q:Place.What[placeWhat]};
                else         Odata = Place.What[placeWhat];

        for(var j=0; j < Odata.q; ++j){

            var mapXY = this.mapPlace_getPlace(defX, defY, j);
            if(mapXY === false){
                console.log('ERROR: not enough mapPlaces!');
                break;
            }
            if(Odata.PlaceGroup){
                this.mapPlace(Setting, Odata, mapXY.x, mapXY.y);
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
GAMEobject.prototype.mapPlace_setPlaceDef = function(Setting,Place){
    console.log('mapPlace_setPlaceDef');
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
        var x = DEF.PlaceGroup.X;
        var y = DEF.PlaceGroup.Y;

        DEF.Spots={};
        DEF.FreeSpots=[];
        var iSpot = 0;

        for(var iAdd in PG.Add){
            var ADD = PG.Add[iAdd];

            var iMax = 1;
            for(var i=0; i<iMax; ++i){
                var mapXY = this.mapPlace_getPosFromDEF(ADD, x, y, i);
                if(mapXY !== false){
                    DEF.Spots[iSpot] = {x:mapXY.x, y:mapXY.y};
                    if(ADD.N) DEF.Spots[iSpot].N = ADD.N;
                    DEF.FreeSpots.push(iSpot);
                    ++iSpot;
                    ++iMax;
                }
                if(iMax > 500){
                    console.log('TOO LOOPY!!!!!!!!!!!!!!!');
                    break;
                }
            }
        }

    }

    this.mapPlaceDefs.push(DEF);
}
GAMEobject.prototype.mapPlace_removePlaceDef = function(){
    console.log('mapPlace_removePlaceDef');
    delete (this.mapPlaceDefs[ this.mapPlaceDefs.length-1 ]);
    this.mapPlaceDefs.length--;
}
/*
BBAdata.MAPS.BuildTry2={
    PlaceGroups:{
        huge_circle:{
            Add:[
                {CircleOf:{X:0, Y:0, Radius: 1000, AngleStart: 0, AngleBy:5}, N:'mainCircle'},
                {CircleOf:{X:0, Y:0, Radius: 1100, AngleStart: 2.5, AngleBy:5}, N:'mainCircle'},
            ],
        },
        towersAndPortals:{
            Add:[
                {CircleOf:{X:0, Y:0, Radius: 1000, AngleStart: 22.5, AngleBy:45}},
            ],
        },
        portal:{
            Add:[
                {CircleOf:{X:0, Y:0, Radius: 220, AngleStart: 30, AngleBy:10, Max:12}},
                {CircleOf:{X:0, Y:0, Radius: 220, AngleStart:-30, AngleBy:-10, Max:12}},
            ],
            Remove:[
                {Circle:{X:0,Y:0, Radius: 200}, N:'mainCircle'},
            ],
        },
        tower:{
            Add:[
                {CircleOf:{X:0, Y:0, Radius: 300, AngleStart:30, AngleBy:10, Max:30}},
                {CircleOf:{X:0, Y:0, Radius: 350, AngleStart:30, AngleBy:10, Max:30}},
            ],
            Remove:[
                {Circle:{X:0,Y:0, Radius: 280}, N:'mainCircle'},
            ],
        }
    },
    Place:[
        {PlaceGroup:{N:'huge_circle', X:0, Y:-1500}, What:{
            0:{t:'StarL',q:99},
        }},
        {PlaceGroup:{N:'towersAndPortals', X:0, Y:-1500}, What:{
            0:{PlaceGroup:{N:'tower', X:0, Y:0}, q:3, What:{
                0:{t:'Star', q:99}
            }},
            1:{PlaceGroup:{N:'portal', X:0, Y:0}, q:2, What:{
                0:{t:'StarM', q:99}
            }},
        }},
    ],
};
*/

GAMEobject.prototype.mapPlace_getPlace = function(defX, defY, j){
    var DEF = this.mapPlaceDefs[ this.mapPlaceDefs.length-1 ];
    var mapXY = false;

    if(DEF.PlaceGroup){
        if(DEF.FreeSpots.length < 1){
            return false;
        }
        var iSpot = DEF.FreeSpots.shift();
        mapXY = DEF.Spots[ iSpot ];
    } else {
        mapXY = this.mapPlace_getPosFromDEF(DEF, defX, defY, j);
    }

    return mapXY;
}

GAMEobject.prototype.mapPlace_getPosFromDEF = function(DEF, defX, defY, j){
    var x,y,Radi = Math.PI*2/360;

    if(DEF.Random){
        var SET = DEF.Random;
        do{
            x = Math.random()*SET.Radius*2-SET.Radius;
            y = Math.random()*SET.Radius*2-SET.Radius;
        }while( (x*x- -y*y) > SET.Radius*SET.Radius );
        x-=-SET.X;
        y-=-SET.Y;
    }
    if(DEF.LineOf){
        var SET = DEF.LineOf;
        x = SET.X- -j*SET.Distance*Math.sin((-parseInt(SET.Angle)-180)*Radi);
        y = SET.Y- -j*SET.Distance*Math.cos((-parseInt(SET.Angle)-180)*Radi);
    }
    if(DEF.CircleOf){
        var SET = DEF.CircleOf;
        if(SET.AngleBy*j >= 360 || SET.AngleBy*j <= -360) return false;
        x = SET.X- -SET.Radius*Math.sin((-parseInt(SET.AngleStart- -j*SET.AngleBy)-180)*Radi);
        y = SET.Y- -SET.Radius*Math.cos((-parseInt(SET.AngleStart- -j*SET.AngleBy)-180)*Radi);
    }
    if(DEF.RingOf){
        var SET = DEF.RingOf;
        var rAngle = Math.random()*360;
        var Dist = SET.Radius;
        if(SET.RadiusPlus) Dist-=-Math.random()*SET.RadiusPlus;
        x = SET.X- -Dist*Math.sin((-parseInt(rAngle)-180)*Radi);
        y = SET.Y- -Dist*Math.cos((-parseInt(rAngle)-180)*Radi);
    }
    return {x:x- -defX, y:y- -defY};
}
