BBAdata['MAPS']={
    'Start':'load',
    'U1':'load',
    'U2':'load',
    'U3':'load',
    'U4':'load',
    'M1':'load',
    '001':'load',
    'A':{
        BoardMods:['sitOnMap','allAvoid'],
        Place:[{Random:{X: 400, Y: 0, Radius: 200}, What:{Star: 5, A: 25}}],
    },
    'U':{
        BoardMods:['sitOnMap','allAvoid'],
        Place:[{Random:{X: 400, Y: 0, Radius: 200}, What:{Star: 5, U: 6}}],
    },
    'S':{
        BoardMods:['sitOnMap','allAvoid'],
        Place:[{Random:{X: 400, Y: 0, Radius: 200}, What:{Star: 5, S: 8}}],
    },
    'I':{
        BoardMods:['sitOnMap','allAvoid'],
        Place:[{Random:{X: 400, Y: 0, Radius: 200}, What:{Star: 20, I: 20}}],
    },
    'D':{
        BoardMods:['sitOnMap','allAvoid'],
        Place:[{Random:{X: 400, Y: 0, Radius: 200}, What:{Star: 20, D:10, M:5, A:5}}],
    },
    'M':{
        BoardMods:['sitOnMap'],
        Place:[{Random:{X: 400, Y: 0, Radius: 200}, What:{Star: 20, M:15}}],
    },
    'N':{
        BoardMods:['sitOnMap'],
        Place:[{Random:{X: 400, Y: 0, Radius: 200}, What:{Star: 20, N:15}}],
    },
    'J':{
        BoardMods:['sitOnMap'],
        Place:[{Random:{X: 400, Y: 0, Radius: 200}, What:{Star: 20, J:5}}],
    },
    'W':{
        BoardMods:['sitOnMap'],
        Place:[{Random:{X: 400, Y: 0, Radius: 200}, What:{Star: 20, W:5}}],
    },
    'T':{
        BoardMods:['sitOnMap'],
        Place:[{Random:{X: 400, Y: 0, Radius: 200}, What:{Star: 20, T:10}}],
        WinningConds:[
            {T:'Main',C:{'E:enemies':{max:0,D:'killAll'}}, Reward:{Conquer:1}, EndPortal:{X:100,Y:200}},
        ]
    },
    'E':{
        BoardMods:['sitOnMap'],
        Place:[{Random:{X: 400, Y: 0, Radius: 200}, What:{Star: 20, E:10}}],
    },
    'C':{
        BoardMods:['sitOnMap'],
        Place:[{Random:{X: 400, Y: 0, Radius: 200}, What:{Star: 20, C:10}}],
    },
    'G':{
        BoardMods:['sitOnMap'],
        Place:[{Random:{X: 400, Y: 0, Radius: 200}, What:{Star: 20, G:10}}],
    },
    'R':{
        BoardMods:['sitOnMap'],
        Place:[{Random:{X: 400, Y: 0, Radius: 200}, What:{Star: 20, R:10}}],
    },
    'H':{
        BoardMods:['sitOnMap'],
        Place:[{Random:{X: 400, Y: 0, Radius: 200}, What:{Star: 20, H:10, T:10}}],
    },
    'B':{
        BoardMods:['sitOnMap'],
        Place:[{Random:{X: 400, Y: 0, Radius: 200}, What:{Star: 20, B:10}}],
    },
    'V':{
        BoardMods:['sitOnMap'],
        Place:[{Random:{X: 400, Y: 0, Radius: 200}, What:{Star: 20, V:10}}],
    },
    'K':{
        BoardMods:['sitOnMap'],
        Place:[{Random:{X: 400, Y: 0, Radius: 200}, What:{Star: 20, K:10, A:10, D:3, J:3, G:3}}],
    },
    'F':{
        BoardMods:['sitOnMap'],
        Place:[{Random:{X: 400, Y: 0, Radius: 200}, What:{Star: 20, F:10, A:10, M:10}}],
    },
    'Q':{
        BoardMods:['sitOnMap'],
        Place:[{Random:{X: 0, Y: 0, Radius: 800}, What:{Star: 20, Q:6, K:5}}],
    },
    'X':{
        BoardMods:['sitOnMap'],
        Place:[{Random:{X: 0, Y: 0, Radius: 800}, What:{Star: 20, X:6, K:2}}],
    },
    'Z':{
        BoardMods:['sitOnMap','allAvoid'],
        Place:[{Random:{X: 0, Y: 0, Radius: 800}, What:{Star: 20, Z:6, K:2}}],
    },
    'Lx272':{
        BoardMods:['sitOnMap','allAvoid'],
        Place:[
            {Random:{X: 0, Y: 0, Radius: 800}, What:{Star: 20, K:2, A:8}},
            {RingOf:{X: 0, Y: 0, Radius: 500,RadiusPlus:300}, What:{iD:20}},
        ],
    },
    'Lx294':{
        BoardMods:['sitOnMap','allAvoid'],
        Place:[{Random:{X: 0, Y: 0, Radius: 800}, What:{Star: 20, Ht:20, K:2, A:8}}],
    },
    'Lx171':{
        BoardMods:['sitOnMap','allAvoid'],
        Place:[{Random:{X: 0, Y: 0, Radius: 800}, What:{Star: 20, v:20, K:2}}],
    },
    'Lx1130':{
        BoardMods:['sitOnMap','allAvoid'],
        Place:[{Random:{X: 0, Y: 0, Radius: 800}, What:{Star: 20, WP:5, A:20, K:1, F:3}}],
    },
    'Lx960':{
        BoardMods:['sitOnMap','allAvoid'],
        Place:[{Random:{X: 0, Y: 0, Radius: 800}, What:{Star: 20, PI:20}}],
    },
    'Lx373':{
        BoardMods:['sitOnMap','allAvoid'],
        Place:[{Random:{X: 0, Y: 0, Radius: 800}, What:{StarX: 60, Wi:10}}],
    },
    'Lx948':{
        BoardMods:['sitOnMap','allAvoid'],
        Place:[{Random:{X: 0, Y: 0, Radius: 800}, What:{StarX: 60, Ni:20}}],
    },
    'Lx1002':{
        BoardMods:['sitOnMap','allAvoid'],
        Place:[
            {RingOf:{X: 0, Y: 0, Radius: 800}, What:{StarX: 60}},
            {Random:{X: 0, Y: 0, Radius: 800}, What:{SH:20}}
        ],
    },
    'L':{
        BoardMods:['sitOnMap','allAvoid'],
        Place:[{Random:{X: 0, Y: 0, Radius: 1000}, What:{StarX: 60, L:10, F:5, M:10, T:10, K:3}}],
    },
    'Lx3096':{
        BoardMods:['sitOnMap','allAvoid'],
        Place:[
            {RingOf:{X: 0, Y: 0, Radius: 800, RadiusPlus:200}, What:{StarX: 60}},
            {Random:{X: 0, Y: 0, Radius: 800}, What:{SL2:12,SL3:12,SL4:12}}
        ],
    },
    'Lx1006':{
        BoardMods:['sitOnMap','allAvoid'],
        Place:[
            {RingOf:{X: 0, Y: 0, Radius: 800, RadiusPlus:200}, What:{StarX: 60}},
            {RingOf:{X: 0, Y: 0, Radius: 1200}, What:{TT:6}}
        ],
    },
    'Lx992':{
        BoardMods:['sitOnMap','allAvoid'],
        Place:[
            {RingOf:{X: 0, Y: 0, Radius: 800, RadiusPlus:200}, What:{StarX: 60}},
            {Random:{X: 0, Y: 0, Radius: 800}, What:{CD:8}}
        ],
    },
    'Lx937':{
        BoardMods:['sitOnMap','allAvoid'],
        Place:[
            {RingOf:{X: 0, Y: 0, Radius: 800, RadiusPlus:200}, What:{StarX: 60}},
            {RingOf:{X: 0, Y: 0, Radius: 1000}, What:{HH:10,L:1}}
        ],
    },
    'Lx467':{
        BoardMods:['sitOnMap','allAvoid'],
        Place:[
            {RingOf:{X: 0, Y: 0, Radius: 800, RadiusPlus:200}, What:{StarX: 60}},
            {RingOf:{X: 0, Y: 0, Radius: 1000}, What:{UU:20,L:1,K:4}}
        ],
    },
    'Lx5084':{
        BoardMods:['sitOnMap','allAvoid'],
        Place:[
            {RingOf:{X: 0, Y: 0, Radius: 800, RadiusPlus:200}, What:{StarX: 60}},
            {RingOf:{X: 0, Y: 0, Radius: 1000}, What:{Tu:10,Q:6,F:4,K:4}}
        ],
    },
    'Lx5084':{
        Place:[
            {RingOf:{X: 0, Y: 0, Radius: 300}, What:{Tu:8,Q:6}},
            {RingOf:{X: 1000, Y: 0, Radius: 50}, What:{Tu:4}},
            {RingOf:{X: 0, Y: 1000, Radius: 50}, What:{Tu:4}},
            {RingOf:{X: 0, Y: -1000, Radius: 50}, What:{Tu:4}},
            {RingOf:{X: -1000, Y: 0, Radius: 50}, What:{Tu:4}},
        ],
    },
    'Lx238':{
        Place:[
            {RingOf:{X: 0, Y: 0, Radius: 50}, What:{Ii:10}},
        ],
    },
    'Lx338':{
        Place:[
            {RingOf:{X: 0, Y: 0, Radius: 300}, What:{Pr:8,Q:6}},
        ],
    },
    'Y':{
        Place:[
            {RingOf:{X: 0, Y: 0, Radius: 300}, What:{Y:8,Q:6}},
        ],
    },
    'Lx376':{
        Place:[
            {RingOf:{X: 0, Y: 0, Radius: 300}, What:{Yi:8,Q:6}},
        ],
    },
    'Lx590':{
        Place:[
            {RingOf:{X: 0, Y: 0, Radius: 300}, What:{Yl:8,Q:6}},
        ],
    },
    'Lx590 test':{
        Place:[
            {RingOf:{X: 0, Y: 0, Radius: 300}, What:{Yl:1}},
        ],
    },
    'Lx482':{
        Place:[
            {RingOf:{X: 0, Y: 0, Radius: 300}, What:{HS:8,Q:6,F:3,M:10,R:4,J:2}},
        ],
    },


    'HealthSplit':{
        BoardMods:['sitOnMap','allAvoid','healthSplit','carras25health'],
        Place:[{Random:{X: 0, Y: 0, Radius: 1000}, What:{StarX: 25, A: 10}}],
    },
    'Stars':{
        BoardMods:['sitOnMap','allAvoid'],
        Place:[{Random:{X: 0, Y: 0, Radius: 2200}, What:{StarX:120, I:20, C:20}}],
    },
    'Followers':{
        BoardMods:['sitOnMap','allAvoid'],
        Place:[{Random:{X: 0, Y: 0, Radius: 2200}, What:{Star:120, A:15, U:10, S:10, I:10, C:10, V:10, K:10, F:10}}],
    },
    'Backgrounds':'load',
    'Mines':'load',
    'Secure':'load',
    'BigOnes':{
        BoardMods:['sitOnMap','allAvoid'],
        Place:[{Random:{X: 0, Y: 0, Radius: 2200}, What:{Star:120, D:10, M:10, N:10, J:10, W:5, T:10, E:10, G:10, R:10, B:10, K:10, F:10, Q:5,X:5,TT:10,Tu:5}}],
    },
    'HardCore':{
        BoardMods:['sitOnMap','allAvoid'],
        EndPortal:{X:0,Y:-120},
        WinningConds:[
            {T:'Main',C:{'E:enemies':{max:0,D:'killLeft'}}, Reward:{Cash:150,Conquer:1}, EndPortal:{X:0,Y:0}},
            {T:'Add',C:{'E:koriaz':{max:0,D:'killMax'}}},
            {T:'Add',C:{'E:hedgehog':{max:0,D:'killMax'}}},
        ],
        Ship:{Start:{X: 2400, Y: 0, A:90}},
        Place:[
            {Random:{X: 0, Y: 0, Radius: 2200}, What:{
                A:5, U:5, S:5, I:10, D:10, M:5, N:5, J:5, W:5, T:5, E:10, C:5, G:5, R:5, H:5, B:5, V:5, K:10, F:10, Q:5, X:6, Z:5, PI:5, WP:5, Ni:10,
                SH:10, L:5, TT:10, CD:5, HH:5, UU:5, Tu:8, Ii:5,
            }},
            {RingOf:{X: 0, Y:0, Radius: 1200, RadiusPlus: 600}, What:{StarX:150,iD:10,Wi:10}},
            {What:{Gstar:1},objData:{x:0,y:0,bounceType:'diagonal',bounceTeleport:true}}
        ]
    },
};
