BBAdata['MAPS']['Backgrounds'] = {
    Backgrounds:{2: 0.7, 3: 0.3},
    Place:[
        // {RingOf:{X:0, Y:0, Radius: 200, RadiusPlus: 400}, What:{K: 1}},
        //
        // {CircleOf:{X: 0, Y:0, Radius: 1000, AngleStart: 0, AngleBy: 4}, What:{Mine:90},objData:{explosivePreset:'NailedMine'}},

        {What:{Star:1},objData:{x:0,y:0}},

        {RingOf:{X:0, Y:0, Angle: 0, Radius: 450, RadiusPlus: 1000},                  What:{RoundField:100}, objData:{radius:30, simpleFilling:'rgba(255,255,0,0.7)'}},
        {CircleOf:{X:0, Y:0, Radius: 400, AngleStart: 0, AngleBy: 15},                What:{RoundField:24},  objData:{radius:30, simpleFilling:'rgba(255,255,0,0.7)'}},
        {LineOf:{X:300, Y:0, Angle: 270, Distance: 100},                              What:{RoundField:7},   objData:{radius:30, simpleFilling:'rgba(255,255,0,0.7)'}},
        {LineOf:{X:0, Y:300, Angle: 0, Distance: 100},                                What:{RoundField:7},   objData:{radius:30, simpleFilling:'rgba(255,255,0,0.7)'}},

        {RingOf:{X:0, Y:0, Angle: 0, Radius: 400, RadiusPlus: 1000},    Background:2, What:{RoundField:100}, objData:{radius:20, simpleFilling:'rgba(0,0,120,0.7)'}},
        {CircleOf:{X:0, Y:0, Radius: 350, AngleStart: 10, AngleBy: 15}, Background:2, What:{RoundField:24},  objData:{radius:20, simpleFilling:'rgba(0,0,120,0.7)'}},
        {LineOf:{X:262, Y:0, Angle: 270, Distance: 87},                 Background:2, What:{RoundField:7},   objData:{radius:20, simpleFilling:'rgba(0,0,120,0.7)'}},
        {LineOf:{X:0, Y:262, Angle: 0, Distance: 87},                   Background:2, What:{RoundField:7},   objData:{radius:20, simpleFilling:'rgba(0,0,120,0.7)'}},

        {RingOf:{X:0, Y:0, Angle: 0, Radius: 350, RadiusPlus: 1000},    Background:3, What:{RoundField:100}, objData:{radius:10, simpleFilling:'rgba(0,120,0,1)'}},
        {CircleOf:{X:0, Y:0, Radius: 300, AngleStart: 0, AngleBy: 15},  Background:3, What:{RoundField:24},  objData:{radius:10, simpleFilling:'rgba(0,120,0,1)'}},
        {LineOf:{X:225, Y:0, Angle: 270, Distance: 75},                 Background:3, What:{RoundField:7},   objData:{radius:10, simpleFilling:'rgba(0,120,0,1)'}},
        {LineOf:{X:0, Y:225, Angle: 0, Distance: 75},                   Background:3, What:{RoundField:7},   objData:{radius:10, simpleFilling:'rgba(0,120,0,1)'}},


        // {Random:{X:0,Y:0,Radius:1000}, What:{RoundField:10}, objData:{radius:30, simpleFilling:'rgba(120,0,0,0.7)'}},
        // {Random:{X:0,Y:0,Radius:1000}, Background:2, What:{RoundField:10}, objData:{radius:20, simpleFilling:'rgba(0,0,120,0.7)'}},
        // {Random:{X:0,Y:0,Radius:1000}, Background:3, What:{RoundField:10}, objData:{radius:10, simpleFilling:'rgba(0,120,0,1)'}},

    ],
    EndPortal:{X:1700,Y:0},
};
