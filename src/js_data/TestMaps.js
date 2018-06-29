if(BBAdata.GET.MAPSMODE == 2){
BBAdata.MAPS.TheNewBegining={
    Place:[
        {What:{Gstar:3},Egzact:[{x:-150,y:-120},{x:150,y:-120},{x:0,y:150}],Mod:{bounceType:'diagonal',bounceTeleport:true}},
        {Random:{X:500, Y:0, Radius: 100}, Team:'team2', What:[
            {t:'carras', q:1},
        ]},
        {Point:{X: -400, Y:0}, What:[{t:'routePoint', Mod:{radius: 120, rName:'routePoint1'}}]},
        {Point:{X: 200, Y:-400}, What:[{t:'routePoint', Mod:{rName:'routePoint2'}}]},
        {Point:{X: 200, Y:400}, What:[{t:'routePoint', Mod:{rName:'routePoint3'}}]},

    ]
};
}
