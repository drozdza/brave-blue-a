if(BBAdata.GET.MAPSMODE == 1)
BBAdata.MAPS.Start = {
    Place:[
        {Random:{X:0, Y:0, Radius: 600}, What:{Star: 300, K: 1}},
        {LineOf:{X:-110, Y:-600, Angle: 0, Distance: 80}, What:{Mine:20},Mod:{explodePreset:'ExplosionSize1'}},
        {LineOf:{X: 110, Y:-600, Angle: 0, Distance: 80}, What:{Mine:20},Mod:{explodePreset:'ExplosionSize1'}},
        {LineOf:{X:-110, Y:-640, Angle: 0, Distance: 80}, What:{Star:20},Mod:{explodePreset:'ExplosionSize1'}},
        {LineOf:{X: 110, Y:-640, Angle: 0, Distance: 80}, What:{Star:20},Mod:{explodePreset:'ExplosionSize1'}},

        {CircleOf:{X:0, Y:-2500, Radius: 300, Angle: 160, AnglePlus: -7}, What:{Star:23},Mod:{explodePreset:'ExplosionSize1'}},
        {CircleOf:{X:0, Y:-2500, Radius: 300, Angle: 200, AnglePlus: 7}, What:{Star:23},Mod:{explodePreset:'ExplosionSize1'}},

        {RingOf:{X: 0, Y:0, Radius: 650, RadiusPlus: 200}, What:{Mine:150},Mod:{explodePreset:'NailedMine'}},

        {RingOf:{X: 0, Y:0, Radius: 1000}, What:{Mine:150},Mod:{explodePreset:'NailedMine'}},
    ],
};
