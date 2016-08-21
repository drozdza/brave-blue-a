BBAdata['MAPS']['Mines'] = {
    BoardMods:['sitOnMap','allAvoid'],
    Place:[
        {LineOf:{X:-1000, Y:-400, Angle: 0, Distance: 100}, What:{Mine:3}, objData:{explosivePreset:'MineExplosionRose'}},
        {LineOf:{X:-200, Y:-400, Angle: 0, Distance: 100}, What:{Mine:3}, objData:{explosivePreset:'NailedMine2'}},
        {LineOf:{X:0, Y:-400, Angle: 0, Distance: 100}, What:{Mine:3}, objData:{explosivePreset:'NailedMine',overWriteObjects:['MineMod_mediumCircle']}},
        {LineOf:{X:200, Y:-400, Angle: 0, Distance: 100}, What:{Mine:3}, objData:{explosivePreset:'ExplosionSize1',overWriteObjects:['MineMod_smallCircle']}},
        {LineOf:{X:400, Y:-400, Angle: 0, Distance: 100}, What:{Mine:3}, objData:{explosivePreset:'NailsConeMedium'}},
        {LineOf:{X:600, Y:-400, Angle: 0, Distance: 100}, What:{Mine:3}, objData:{explosivePreset:'DestructionFieldMedium'}},

        {LineOf:{X:-200, Y:400, Angle: 90, Distance: 100}, What:{Mine:5}, objData:{explosivePreset:'MineNailsConePalm',overWriteObjects:['MineMod_Cone']}},
    ],
};
