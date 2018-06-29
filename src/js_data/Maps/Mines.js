if(BBAdata.GET.MAPSMODE == 1)
BBAdata.MAPS.Mines = {
    BoardMods:['sitOnMap','allAvoid'],
    Place:[
        {LineOf:{X:-1000, Y:-400, Angle: 0, Distance: 100}, What:{Mine:3}, Mod:{explodePreset:'MineExplosionRose'}},
        {LineOf:{X:-200, Y:-400, Angle: 0, Distance: 100}, What:{Mine:3}, Mod:{explodePreset:'NailedMine2'}},
        {LineOf:{X:0, Y:-400, Angle: 0, Distance: 100}, What:{Mine:3}, Mod:{explodePreset:'NailedMine',overWriteObjects:['MineMod_mediumCircle']}},
        {LineOf:{X:200, Y:-400, Angle: 0, Distance: 100}, What:{Mine:3}, Mod:{explodePreset:'ExplosionSize1',overWriteObjects:['MineMod_smallCircle']}},
        {LineOf:{X:400, Y:-400, Angle: 0, Distance: 100}, What:{Mine:3}, Mod:{explodePreset:'NailsConeMedium'}},
        {LineOf:{X:600, Y:-400, Angle: 0, Distance: 100}, What:{Mine:3}, Mod:{explodePreset:'DestructionFieldMedium'}},

        {LineOf:{X:-200, Y:400, Angle: 90, Distance: 100}, What:{Mine:5}, Mod:{explodePreset:'MineNailsConePalm',overWriteObjects:['MineMod_Cone']}},
    ],
};
