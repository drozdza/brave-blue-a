if(BBAdata.GET.MAPSMODE)
BBAdata.MAPS.Backgrounds = {
    Backgrounds:{2: 0.7, 3: 0.3},
    Place:[
        // {RingOf:{X:0, Y:0, Radius: 200, RadiusPlus: 400}, What:{K: 1}},
        //
        // {CircleOf:{X: 0, Y:0, Radius: 1000, Angle: 0, AnglePlus: 4}, What:{Mine:90},Mod:{explodePreset:'NailedMine'}},

        {RingOf:{X:0, Y:0, Angle: 0, Radius: 450, RadiusPlus: 1000},    Background:1, What:{RoundField:100}, Mod:{radius:30, simpleFilling:'rgba(255,255,0,0.7)'}},
        {CircleOf:{X:0, Y:0, Radius: 400, Angle: 0, AnglePlus: 15},  Background:1, What:{RoundField:24},  Mod:{radius:30, simpleFilling:'rgba(255,255,0,0.7)'}},
        {LineOf:{X:300, Y:0, Angle: 270, Distance: 100},                Background:1, What:{RoundField:7},   Mod:{radius:30, simpleFilling:'rgba(255,255,0,0.7)'}},
        {LineOf:{X:0, Y:300, Angle: 0, Distance: 100},                  Background:1, What:{RoundField:7},   Mod:{radius:30, simpleFilling:'rgba(255,255,0,0.7)'}},

        {RingOf:{X:0, Y:0, Angle: 0, Radius: 400, RadiusPlus: 1000},    Background:2, What:{RoundField:100}, Mod:{radius:20, simpleFilling:'rgba(0,0,120,0.7)'}},
        {CircleOf:{X:0, Y:0, Radius: 350, Angle: 0, AnglePlus: 15},  Background:2, What:{RoundField:24},  Mod:{radius:20, simpleFilling:'rgba(0,0,120,0.7)'}},
        {LineOf:{X:262, Y:0, Angle: 270, Distance: 87},                 Background:2, What:{RoundField:7},   Mod:{radius:20, simpleFilling:'rgba(0,0,120,0.7)'}},
        {LineOf:{X:0, Y:262, Angle: 0, Distance: 87},                   Background:2, What:{RoundField:7},   Mod:{radius:20, simpleFilling:'rgba(0,0,120,0.7)'}},

        {RingOf:{X:0, Y:0, Angle: 0, Radius: 350, RadiusPlus: 1000},    Background:3, What:{RoundField:100}, Mod:{radius:10, simpleFilling:'rgba(0,120,0,1)'}},
        {CircleOf:{X:0, Y:0, Radius: 300, Angle: 0, AnglePlus: 15},  Background:3, What:{RoundField:24},  Mod:{radius:10, simpleFilling:'rgba(0,120,0,1)'}},
        {LineOf:{X:225, Y:0, Angle: 270, Distance: 75},                 Background:3, What:{RoundField:7},   Mod:{radius:10, simpleFilling:'rgba(0,120,0,1)'}},
        {LineOf:{X:0, Y:225, Angle: 0, Distance: 75},                   Background:3, What:{RoundField:7},   Mod:{radius:10, simpleFilling:'rgba(0,120,0,1)'}},


        // {Random:{X:0,Y:0,Radius:1000}, What:{RoundField:10}, Mod:{radius:30, simpleFilling:'rgba(120,0,0,0.7)'}},
        // {Random:{X:0,Y:0,Radius:1000}, Background:2, What:{RoundField:10}, Mod:{radius:20, simpleFilling:'rgba(0,0,120,0.7)'}},
        // {Random:{X:0,Y:0,Radius:1000}, Background:3, What:{RoundField:10}, Mod:{radius:10, simpleFilling:'rgba(0,120,0,1)'}},

    ],
    EndPortal:{X:1700,Y:0},
};
