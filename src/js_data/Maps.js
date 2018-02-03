BBAdata.MAPS={};
BBAdata.MapGroups = {};

if(BBAdata.GET.MAPSMODE){

BBAdata.MAPS.Start='load';
BBAdata.MAPS.U1='load';
BBAdata.MAPS.U2='load';
BBAdata.MAPS.U3='load';
BBAdata.MAPS.U4='load';
BBAdata.MAPS.M1='load';
BBAdata.MAPS['001']='load';
BBAdata.MAPS.First={
    StarMap:{ x:-200, y:-200, mouseRadius: 25, shipRadius: 20,
        Anims:[
            {t:'static', letter: '+100', size: 12, color:'yellow', x:0, y:0, r: 0, qStart:90, qV:-2, qDir:0},
        ],
    },
    BoardMods:['sitOnMap','allAvoid'],
    Ship:{Start:{X: 0, Y: -400, A:180}},
    Place:[{Random:{X: 400, Y: 0, Radius: 200}, What:{StarL:5,StarM:5,Star:5,StarS:5}}],
    WinningConds:[{T:'Main',C:{'E:enemies':{max:0,D:'killLeft'}}, RewardGold:100000, RewardFlags:{C_First:1}}],
    Routes:{C_First:{
            'First_A':{A:'First',B:'A'},
            'First_U':{A:'First',B:'U'},
            'First_S':{A:'First',B:'S'},
            'First_001':{A:'First',B:'001'},
    }},

};
BBAdata.MAPS.A={
    StarMap:{ x:210, y:-90, mouseRadius: 25, shipRadius: 20,
        Anims:[
            {t:'static', letter: 'A', size: 12, color:'red', x:0, y:0, r: 0, qStart:90, qV:-2, qDir:0},
        ],
    },
    BoardMods:['sitOnMap','allAvoid'],
    Place:[{Random:{X: 400, Y: 0, Radius: 200}, What:{Star: 5, A: 25}}],
};
BBAdata.MAPS.U={
    StarMap:{ x:140, y:-200, mouseRadius: 25, shipRadius: 20,
        Anims:[
            {t:'static', letter: 'U', size: 12, color:'red', x:0, y:0, r: 0, qStart:90, qV:-2, qDir:0},
        ],
    },
    BoardMods:['sitOnMap','allAvoid'],
    Place:[{Random:{X: 400, Y: 0, Radius: 200}, What:{Star: 5, U: 6}}],
};
BBAdata.MAPS.S={
    StarMap:{ x:340, y:-140, mouseRadius: 25, shipRadius: 20,
        Anims:[
            {t:'static', letter: 'S', size: 12, color:'red', x:0, y:0, r: 0, qStart:90, qV:-2, qDir:0},
        ],
    },
    BoardMods:['sitOnMap','allAvoid'],
    Place:[{Random:{X: 400, Y: 0, Radius: 200}, What:{Star: 5, S: 8}}],
};
BBAdata.MAPS.Constructs={
    BoardMods:['sitOnMap','allAvoid'],
    Place:[
        {Random:{X:0,Y:0,Radius:100},What:{I:5}},

        // Huge circle
        {Random:{X: 2400, Y: 0, Radius: 1400}, What:{Star: 120},
            Construct:{N:'build1',Min:60,Max:250}},
        {RingOf:{X: 2400, Y: 0, Radius: 1400, RadiusPlus: 350}, What:{Star: 100},
            Construct:{N:'build1',Min:60,Max:250}},
        {CircleOf:{X: 2400, Y: 0, Radius: 1820, Angle: 0, AnglePlus: 10}, What:{Star: 36},
            Construct:{N:'build1',Min:60,Max:400}},
        {CircleOf:{X: 2400, Y: 0, Radius: 1880, Angle: 5, AnglePlus: 10}, What:{Star: 36},
            Construct:{N:'build2',Min:100,Max:400}},

        // Circle with construct
        {CircleOf:{X: -1800, Y: 0, Radius: 800, Angle: 0, AnglePlus: 15}, What:{Star: 24},
            Construct:{N:'build3',Min:60,Max:300}},
        {CircleOf:{X: -1800, Y: 0, Radius: 1000, Angle: 7.5, AnglePlus: 15}, What:{Star: 24},
            Construct:{N:'build3',Min:100,Max:300}},
        {LineOf:{X: -1900, Y: 1000, Angle: 0, Distance: 200}, What:{Star: 20},
            Construct:{N:'build3',Min:60,Max:330}},
        {LineOf:{X: -1700, Y: 1000, Angle: 0, Distance: 200}, What:{Star: 20},
            Construct:{N:'build3',Min:100,Max:330}},
        {CircleOf:{X: -1800, Y: 1300, Radius: 200, Angle: 30, AnglePlus: 60}, What:{Star: 6},
            Construct:{N:'build3',Min:50,Max:210}},
        {CircleOf:{X: -1800, Y: 1760, Radius: 200, Angle: 30, AnglePlus: 60}, What:{Star: 6},
            Construct:{N:'build4',Min:50,Max:210}},
        {CircleOf:{X: -2200, Y: 1530, Radius: 200, Angle: 30, AnglePlus: 60}, What:{Star: 6},
            Construct:{N:'build5',Min:50,Max:210}},
        {CircleOf:{X: -1400, Y: 1530, Radius: 200, Angle: 30, AnglePlus: 60}, What:{Star: 6},
            Construct:{N:'build6',Min:50,Max:210}},

        // Hex construct
        {CircleOf:{X: -0, Y: -500, Radius: 120, Angle: 30, AnglePlus: 60}, What:{Star: 6},
            Construct:{N:'build4',Min:50,Max:133}},
        {CircleOf:{X: -180, Y: -809, Radius: 120, Angle: 30, AnglePlus: 60}, What:{Star: 6},
            Construct:{N:'build4',Min:50,Max:133}},
        {CircleOf:{X: 180, Y: -809, Radius: 120, Angle: 30, AnglePlus: 60}, What:{Star: 6},
            Construct:{N:'build4',Min:50,Max:133}},
        {CircleOf:{X: -0, Y: -1118, Radius: 120, Angle: 30, AnglePlus: 60}, What:{Star: 6},
            Construct:{N:'build4',Min:50,Max:133}},
        {CircleOf:{X: -180, Y: -1427, Radius: 120, Angle: 30, AnglePlus: 60}, What:{Star: 6},
            Construct:{N:'build4',Min:50,Max:133}},
        {CircleOf:{X: 180, Y: -1427, Radius: 120, Angle: 30, AnglePlus: 60}, What:{Star: 6},
            Construct:{N:'build4',Min:50,Max:133}},
        {CircleOf:{X: -540, Y: -809, Radius: 120, Angle: 30, AnglePlus: 60}, What:{Star: 6},
            Construct:{N:'build4',Min:50,Max:133}},
        {CircleOf:{X: -720, Y: -1118, Radius: 120, Angle: 30, AnglePlus: 60}, What:{Star: 6},
            Construct:{N:'build4',Min:50,Max:133}},
        {CircleOf:{X: -360, Y: -1118, Radius: 120, Angle: 30, AnglePlus: 60}, What:{Star: 6},
            Construct:{N:'build4',Min:50,Max:133}},
        {CircleOf:{X: 540, Y: -809, Radius: 120, Angle: 30, AnglePlus: 60}, What:{Star: 6},
            Construct:{N:'build4',Min:50,Max:133}},
        {CircleOf:{X: 720, Y: -1118, Radius: 120, Angle: 30, AnglePlus: 60}, What:{Star: 6},
            Construct:{N:'build4',Min:50,Max:133}},
        {CircleOf:{X: 360, Y: -1118, Radius: 120, Angle: 30, AnglePlus: 60}, What:{Star: 6},
            Construct:{N:'build4',Min:50,Max:133}},
    ],
};
BBAdata.MAPS.I={
    BoardMods:['sitOnMap','allAvoid'],
    Place:[{Random:{X: 400, Y: 0, Radius: 200}, What:{Star: 20, I: 20}}],
};
BBAdata.MAPS.D={
    BoardMods:['sitOnMap','allAvoid'],
    Place:[{Random:{X: 400, Y: 0, Radius: 200}, What:{Star: 20, D:10, M:5, A:5}}],
};
BBAdata.MAPS.M={
    BoardMods:['sitOnMap'],
    Place:[{Random:{X: 400, Y: 0, Radius: 200}, What:{Star: 20, M:15}}],
};
BBAdata.MAPS.N={
    BoardMods:['sitOnMap'],
    Place:[{Random:{X: 400, Y: 0, Radius: 200}, What:{Star: 20, N:15}}],
};
BBAdata.MAPS.J={
    BoardMods:['sitOnMap'],
    Place:[{Random:{X: 400, Y: 0, Radius: 200}, What:{Star: 20, J:5}}],
};
BBAdata.MAPS.W={
    BoardMods:['sitOnMap'],
    Place:[{Random:{X: 400, Y: 0, Radius: 200}, What:{Star: 20, W:5}}],
};
BBAdata.MAPS.T={
    BoardMods:['sitOnMap'],
    Place:[{Random:{X: 400, Y: 0, Radius: 200}, What:{Star: 20, T:10}}],
    WinningConds:[
        {T:'Main',C:{'E:enemies':{max:0,D:'killAll'}}, Reward:{Conquer:1}, EndPortal:{X:100,Y:200}},
    ]
};
BBAdata.MAPS.E={
    BoardMods:['sitOnMap'],
    Place:[{Random:{X: 400, Y: 0, Radius: 200}, What:{Star: 20, E:10}}],
};
BBAdata.MAPS.C={
    BoardMods:['sitOnMap'],
    Place:[{Random:{X: 400, Y: 0, Radius: 200}, What:{Star: 20, C:10}}],
};
BBAdata.MAPS.G={
    BoardMods:['sitOnMap'],
    Place:[{Random:{X: 400, Y: 0, Radius: 200}, What:{Star: 20, G:10}}],
};
BBAdata.MAPS.R={
    BoardMods:['sitOnMap'],
    Place:[{Random:{X: 400, Y: 0, Radius: 200}, What:{Star: 20, R:10}}],
};
BBAdata.MAPS.H={
    BoardMods:['sitOnMap'],
    Place:[{Random:{X: 400, Y: 0, Radius: 200}, What:{Star: 20, H:10, T:10}}],
};
BBAdata.MAPS.B={
    BoardMods:['sitOnMap'],
    Place:[{Random:{X: 400, Y: 0, Radius: 200}, What:{Star: 20, B:10}}],
};
BBAdata.MAPS.V={
    BoardMods:['sitOnMap'],
    Place:[{Random:{X: 400, Y: 0, Radius: 200}, What:{Star: 20, V:10}}],
};
BBAdata.MAPS.K={
    BoardMods:['sitOnMap'],
    Place:[{Random:{X: 400, Y: 0, Radius: 200}, What:{Star: 20, K:10, A:10, D:3, J:3, G:3}}],
};
BBAdata.MAPS.F={
    BoardMods:['sitOnMap'],
    Place:[{Random:{X: 400, Y: 0, Radius: 200}, What:{Star: 20, F:10, A:10, M:10}}],
};
BBAdata.MAPS.Q={
    BoardMods:['sitOnMap'],
    Place:[
        {Random:{X: 0, Y: 0, Radius: 800}, What:{Star: 20, Q:3, K:2},Mod:['greenColor','greenSquadMembers']},
        {Random:{X: 0, Y: 0, Radius: 800}, What:{Star: 20, Q:3, K:2},Mod:['orangeColor','orhenesShipsI']},
    ],
};
BBAdata.MAPS.Q2={
    BoardMods:['sitOnMap'],
    Place:[
        {Random:{X: 0, Y: 0, Radius: 800}, What:{Star: 20, Q:2, K:2},Mod:['orangeColor','orhenesShipsI']},
        {Random:{X: 0, Y: 0, Radius: 800}, What:{Q:4},Mod:['orhenesSecure5']},
    ],
};
BBAdata.MAPS.X={
    BoardMods:['sitOnMap'],
    Place:[{Random:{X: 0, Y: 0, Radius: 800}, What:{Star: 20, X:6, K:2}}],
};
BBAdata.MAPS.Z={
    BoardMods:['sitOnMap','allAvoid'],
    Place:[{Random:{X: 0, Y: 0, Radius: 800}, What:{Star: 20, Z:6, K:2}}],
};
BBAdata.MAPS.Lx272={
    BoardMods:['sitOnMap','allAvoid'],
    Place:[
        {Random:{X: 0, Y: 0, Radius: 800}, What:{Star: 20, K:2, A:8}},
        {RingOf:{X: 0, Y: 0, Radius: 500,RadiusPlus:300}, What:{iD:20}},
    ],
};
BBAdata.MAPS.Lx294={
    BoardMods:['sitOnMap','allAvoid'],
    Place:[{Random:{X: 0, Y: 0, Radius: 800}, What:{Star: 20, Ht:20, K:2, A:8}}],
};
BBAdata.MAPS.Lx171={
    BoardMods:['sitOnMap','allAvoid'],
    Place:[
        {Random:{X: 0, Y: 0, Radius: 800}, What:{Star: 20, v:20, K:2}},
        {Random:{X: 0, Y: 0, Radius: 800}, What:{v:20}, Mod:['violetColor','vuvisOrbit']},
    ],
};
BBAdata.MAPS.Lx1130={
    BoardMods:['sitOnMap','allAvoid'],
    Place:[{Random:{X: 0, Y: 0, Radius: 800}, What:{Star: 20, WP:5, A:20, K:1, F:3}}],
};
BBAdata.MAPS.Lx960={
    BoardMods:['sitOnMap','allAvoid'],
    Place:[{Random:{X: 0, Y: 0, Radius: 800}, What:{Star: 20, PI:20}}],
};
BBAdata.MAPS.Lx373={
    BoardMods:['sitOnMap','allAvoid'],
    Place:[{Random:{X: 0, Y: 0, Radius: 800}, What:{StarL:15,StarM:15,Star:15,StarS:15, Wi:10}}],
};
BBAdata.MAPS.Lx948={
    BoardMods:['sitOnMap','allAvoid'],
    Place:[{Random:{X: 0, Y: 0, Radius: 800}, What:{StarL:15,StarM:15,Star:15,StarS:15, Ni:20}}],
};
BBAdata.MAPS.Lx1002={
    BoardMods:['sitOnMap','allAvoid'],
    Place:[
        {RingOf:{X: 0, Y: 0, Radius: 800}, What:{StarL:15,StarM:15,Star:15,StarS:15}},
        {Random:{X: 0, Y: 0, Radius: 800}, What:{SH:20}}
    ],
};
BBAdata.MAPS.L={
    BoardMods:['sitOnMap','allAvoid'],
    Place:[{Random:{X: 0, Y: 0, Radius: 1000}, What:{StarL:15,StarM:15,Star:15,StarS:15, L:10, F:5, M:10, T:10, K:3}}],
};
BBAdata.MAPS.Lx3450={
    BoardMods:['sitOnMap','allAvoid'],
    Place:[
        {RingOf:{X: 0, Y: 0, Radius: 800, RadiusPlus:200}, What:{StarL:15,StarM:15,Star:15,StarS:15}},
        {Random:{X: 0, Y: 0, Radius: 800}, What:{SL2:12,SL3:12,SL4:12}}
    ],
};
BBAdata.MAPS.Lx1006={
    BoardMods:['sitOnMap','allAvoid'],
    Place:[
        {RingOf:{X: 0, Y: 0, Radius: 800, RadiusPlus:200}, What:{StarL:15,StarM:15,Star:15,StarS:15}},
        {RingOf:{X: 0, Y: 0, Radius: 1200}, What:{TT:6}}
    ],
};
BBAdata.MAPS.Lx992={
    BoardMods:['sitOnMap','allAvoid'],
    Place:[
        {RingOf:{X: 0, Y: 0, Radius: 800, RadiusPlus:200}, What:{StarL:15,StarM:15,Star:15,StarS:15}},
        {Random:{X: 0, Y: 0, Radius: 800}, What:{CD:8}}
    ],
};
BBAdata.MAPS.Lx937={
    BoardMods:['sitOnMap','allAvoid'],
    Place:[
        {RingOf:{X: 0, Y: 0, Radius: 800, RadiusPlus:200}, What:{StarL:15,StarM:15,Star:15,StarS:15}},
        {RingOf:{X: 0, Y: 0, Radius: 1000}, What:{HH:10,L:1}}
    ],
};
BBAdata.MAPS.Lx467={
    BoardMods:['sitOnMap','allAvoid'],
    Place:[
        {RingOf:{X: 0, Y: 0, Radius: 800, RadiusPlus:200}, What:{StarL:15,StarM:15,Star:15,StarS:15}},
        {RingOf:{X: 0, Y: 0, Radius: 1000}, What:{UU:20,L:1,K:4}}
    ],
};
BBAdata.MAPS.Lx5084={
    BoardMods:['sitOnMap','allAvoid'],
    Place:[
        {RingOf:{X: 0, Y: 0, Radius: 800, RadiusPlus:200}, What:{StarL:15,StarM:15,Star:15,StarS:15}},
        {RingOf:{X: 0, Y: 0, Radius: 1000}, What:{Tu:10,Q:6,F:4,K:4}}
    ],
};
BBAdata.MAPS.Lx5084={
    Place:[
        {RingOf:{X: 0, Y: 0, Radius: 300}, What:{Tu:8,Q:6}},
        {RingOf:{X: 1000, Y: 0, Radius: 50}, What:{Tu:4}},
        {RingOf:{X: 0, Y: 1000, Radius: 50}, What:{Tu:4}},
        {RingOf:{X: 0, Y: -1000, Radius: 50}, What:{Tu:4}},
        {RingOf:{X: -1000, Y: 0, Radius: 50}, What:{Tu:4}},
    ],
};
BBAdata.MAPS.Lx238={
    Place:[
        {RingOf:{X: 0, Y: 0, Radius: 50}, What:{Ii:10}},
    ],
};
BBAdata.MAPS.Lx338={
    Place:[
        {RingOf:{X: 0, Y: 0, Radius: 300}, What:{Pr:8,Q:6}},
    ],
};
BBAdata.MAPS.Y={
    BoardMods:['sitOnMap','allAvoid'],
    Place:[
        {RingOf:{X: 0, Y: 0, Radius: 300}, What:{Y:8,Q:6}},
    ],
};
BBAdata.MAPS.Lx376={
    BoardMods:['sitOnMap','allAvoid'],
    Place:[
        {RingOf:{X: 0, Y: 0, Radius: 300}, What:{Yi:8,Q:6}},
    ],
};
BBAdata.MAPS.Lx590={
    BoardMods:['sitOnMap','allAvoid'],
    Place:[
        {RingOf:{X: 0, Y: 0, Radius: 300}, What:{Yl:8,Q:6}},
    ],
};
BBAdata.MAPS.Lx7822={
    BoardMods:['sitOnMap','allAvoid'],
    Place:[
        {RingOf:{X: 0, Y: 0, Radius: 300}, What:{Yb:8,Q:6}},
    ],
};
BBAdata.MAPS.Lx482={
    Place:[
        {RingOf:{X: 0, Y: 0, Radius: 300}, What:{HS:8,Q:6,F:3,M:10,R:4,J:2}},
    ],
};
BBAdata.MAPS.Lx1414={
    BoardMods:['sitOnMap','allAvoid','vuvisPlusSpeed'],
    Place:[
        {Random:{X: 0, Y: 0, Radius: 800}, What:{Star: 20, K:2, SI:6}},
        {Random:{X: 0, Y: 0, Radius: 800}, What:{SI:6},Mod:['saisungVuvisOrbiters']}
    ],
};

BBAdata.MAPS.HealthSplit={
    BoardMods:['sitOnMap','allAvoid','healthSplit','carras25health'],
    Place:[{Random:{X: 0, Y: 0, Radius: 1000}, What:{StarL:10,StarM:10,Star:10,StarS:10, A: 10}}],
};
BBAdata.MAPS.Stars={
    BoardMods:['sitOnMap','allAvoid'],
    Place:[{Random:{X: 0, Y: 0, Radius: 2200}, What:{StarL:30,StarM:30,Star:30,StarS:30, I:20, C:20}}],
};
BBAdata.MAPS.Followers={
    BoardMods:['sitOnMap','allAvoid'],
    Place:[{Random:{X: 0, Y: 0, Radius: 2200}, What:{Star:120, A:15, U:10, S:10, I:10, C:10, V:10, K:10, F:10}}],
};
BBAdata.MAPS.Backgrounds='load';
BBAdata.MAPS.Mines='load';
BBAdata.MAPS.Secure='load';
BBAdata.MAPS.Secure2='load';
BBAdata.MAPS.Secure3='load';
BBAdata.MAPS.BigOnes={
    BoardMods:['sitOnMap','allAvoid'],
    WinningConds:[
        {T:'Main',C:{'E:enemies':{max:0,D:'killLeft'}}, RewardGold:150, RewardFlags:{Conquer:1}, EndPortal:{X:0,Y:0}},
        {T:'Add',C:{'E:koriaz':{max:0,D:'killMax'}}},
        {T:'Add',C:{'E:thunderton':{max:0,D:'killMax'}}},
        {T:'Add',C:{'E:talrax':{max:0,D:'killMax'}}},
    ],
    Place:[
        {Random:{X: 0, Y: 0, Radius: 2200}, What:{Star:120, D:10, M:10, N:10, J:10, W:5, T:10, E:10, G:10, R:10, B:10, K:10, F:10, Q:5,X:5,TT:10,Tu:5}},
        {CircleOf:{X:0, Y:-3000, Radius: 120, Angle: 0, AnglePlus: 22.5}, What:{Star:16}},
        {What:{RoundField:1},Mod:{x:0,y: -3000, radius: 50, fieldAnim: 'HealingField', PeriodTime: 50, PeriodOffset: 5, PeriodHeal: 1, dontHit:['B','E','BE']}},
    ],
};
BBAdata.MAPS.HardCore={
    BoardMods:['sitOnMap','allAvoid','violetColor'],
    EndPortal:{X:0,Y:-120},
    WinningConds:[
        {T:'Main',C:{'E:enemies':{max:0,D:'killLeft'}}, RewardGold:150, RewardFlags:{Conquer:1}, EndPortal:{X:0,Y:0}},
        {T:'Add',C:{'E:koriaz':{max:0,D:'killMax'}}},
        {T:'Add',C:{'E:hedgehog':{max:0,D:'killMax'}}},
        {T:'Add',C:{'E:thunderton':{max:0,D:'killMax'}}},
        {T:'Add',C:{'E:patiarch':{max:0,D:'killMax'}}},
    ],
    Ship:{Start:{X: 2400, Y: 0, A:90}},
    Place:[
        {Random:{X: 0, Y: 0, Radius: 2200}, What:{
            A:5, U:5, S:5, I:10, D:10, M:5, N:5, J:5, T:5, E:10, C:5, G:5, R:5, H:5, B:5, V:5,
            K:10, L:10, F:10,
            W:5,
            Q:5, X:6, Z:5, PI:5, WP:5, Ni:10,
            SH:10, TT:10, CD:5, HH:5, UU:5, Tu:8, Ii:5, HS:5, HS:8,
            Y:2, Yi:2, Yl:2, Yb:2,
        }},
        {RingOf:{X: 0, Y:0, Radius: 1200, RadiusPlus: 600}, What:{StarL:40,StarM:30,Star:40,StarS:40,iD:10,Wi:10}},
        {What:{Gstar:1},Mod:{x:0,y:0,bounceType:'diagonal',bounceTeleport:true}},
        {CircleOf:{X:0, Y:-3000, Radius: 120, Angle: 0, AnglePlus: 22.5}, What:{Star:16}},
        {What:{RoundField:1},Mod:{x:0,y: -3000, radius: 50, fieldAnim: 'HealingField', PeriodTime: 50, PeriodOffset: 5, PeriodHeal: 1, dontHit:['B','E','BE']}},
    ]
};

BBAdata.MAPS.BuildTry={
    BoardMods:[
        'sitOnMap',
        'allAvoid',
        'violetColor',
    ],
    TeamMods:{
        team1:['greenColor'],
        team2:['orangeColor'],
    },
    Place:[
        {Random:{X:0, Y:0, Radius: 100}, What:[
            // {t:'carras',q:5, Team:'team1'},
        ]},
        {Random:{X:500, Y:0, Radius: 100}, Team:'team2', What:[
            // {t:'carras',q:5},
            {t:'tartaros',q:1}
        ]},
        {Random:{X:500, Y:0, Radius: 100}, Team:'team2', What:{
            M:2, D:5,
        }},
        // {Random:{X:-400, Y:0, Radius: 300}, What:[
        //     {t:['Star','StarS','StarL','StarM'],q:30},
        // ]},
        {Point:{X: -400, Y:0}, What:[{t:'routePoint', Mod:{radius: 120, rName:'routePoint1'}}]},
        {Point:{X: 200, Y:-400}, What:[{t:'routePoint', Mod:{rName:'routePoint2'}}]},
        {Point:{X: 200, Y:400}, What:[{t:'routePoint', Mod:{rName:'routePoint3'}}]},
    ],
};

BBAdata.MAPS.BuildTry2={
    PlaceGroups:{
        huge_circle:{
            Add:[
                {CircleOf:{X:0, Y:0, Radius: 1000, Angle: 0, AnglePlus:5}, N:'mainCircle', What:{
                    0:{t:'Star',q:70},
                }},
                {CircleOf:{X:0, Y:0, Radius: 1100, Angle: 2.5, AnglePlus:5}, N:'mainCircle', What:{
                    0:{t:'StarS',q:70},
                }},
            ],
        },
        towersAndPortals:{
            Add:[
                {CircleOf:{X:0, Y:0, Radius: 1000, Angle: 22.5, AnglePlus:45}},
            ],
            AddShuffle:true,
        },
        portal:{
            Add:[
                {CircleOf:{X:0, Y:0, Radius: 220, Angle: 30, AnglePlus:10, Max:12}},
                {CircleOf:{X:0, Y:0, Radius: 220, Angle:-30, AnglePlus:-10, Max:12}},
            ],
            Remove:[
                {Circle:{X:0,Y:0, Radius: 230}, N:'mainCircle'},
            ],
        },
        tower:{
            Add:[
                {CircleOf:{X:0, Y:0, Radius: 300, Angle:210, AnglePlus:10, Max:31}},
                {CircleOf:{X:0, Y:0, Radius: 350, Angle:210, AnglePlus:10, Max:31}},
            ],
            Remove:[
                {Circle:{X:0,Y:0, Radius: 320}, N:'mainCircle'},
            ],
        }
    },
    Place:[
        {PlaceGroup:{N:'huge_circle', X:0, Y:0}, What:{
            0:{t:'StarL',q:144},
        }},
        {PlaceGroup:{N:'towersAndPortals', X:0, Y:0}, What:{
            0:{PlaceGroup:{N:'tower', X:200, Y:0}, q:3, What:{
                0:{t:'StarM', q:99}
            }},
            1:{PlaceGroup:{N:'portal', X:50, Y:0}, q:2, What:{
                0:{t:'StarM', q:99}
            }},
        }},
    ],
};
BBAdata.MAPS.Empty={
    Place:[
        {CircleOf:{X:0, Y:0, Radius: 100, Angle: 0, AnglePlus: 60}, What:{StarL:6}},
    ]
};



}
