if(BBAdata.GET.MAPSMODE == 1)
BBAdata.MAPS.U3 = {
    BoardMods:['sitOnMap','allAvoid'],
    Place:[
        {Random:{X: 0, Y: 0, Radius: 200}, What: {K:1}},

        {What:{ConeField:1},Mod:{x:0,y:0, radius: 1600, angle: 90, coneAngle: 179, coneRad2: 1300, simpleFilling: 'rgba(255,255,0,0.6)', bounceType:'diagonal',bounceTeleport:true}},
    ],
};
