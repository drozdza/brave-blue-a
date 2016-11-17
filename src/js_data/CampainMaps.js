if(!BBAdata.GET.MAPSMODE){

BBAdata.MAPS.First = {
    StarMap:{ x:0, y:0, mouseRadius: 25, shipRadius: 20,
        Anims:[
            {t:'static', letter: 'A', size: 12, color:'#00cc00', x:0, y:0, r: 0, qStart:90, qV:-2, qDir:0},
        ],
    },
    WinningConds:[
        {T:'Main',C:{'E:enemies':{max:0,D:'killLeft'}}, RewardGold:100, RewardFlags:{Conquer:1}, EndPortal:{X:0,Y:0}},
    ],
    Routes:{
        Conquer:{
            'First_Second':{A:'First',B:'Second'},
        },
    },
    Ship:{Start:{X: -500, Y: 0, A:90}},
    BoardMods:['sitOnMap','greenColor'],
    Place:[
        {Random:{X: 1000, Y: 0, Radius: 200}, What:{A:3,}},
    ]
};

BBAdata.MAPS.Second = {
    StarMap:{ x:160, y:-40, mouseRadius: 25, shipRadius: 20,
        Anims:[
            {t:'static', letter: 'A', size: 12, color:'#00cc00', x:-8, y:0, r: 0, qStart:90, qV:-2, qDir:0},
            {t:'static', letter: 'A', size: 12, color:'#00cc00', x:8, y:0, r: 0, qStart:90, qV:-2, qDir:0},
        ],
    },
    WinningConds:[
        {T:'Main',C:{'E:enemies':{max:0,D:'killLeft'}}, RewardGold:100, RewardFlags:{Conquer:1}, EndPortal:{X:0,Y:0}},
    ],
    Routes:{
        Conquer:{
            'First_Second':{A:'First',B:'Second'},
            'Second_Third':{A:'Second',B:'Third'},
        },
    },
    Ship:{Start:{X: -500, Y: 0, A:90}},
    BoardMods:['sitOnMap','greenColor'],
    Place:[
        {Random:{X: 2000, Y: 0, Radius: 500}, What:{A:6}},
    ]
};

BBAdata.MAPS.Third = {
    StarMap:{ x:260, y:-180, mouseRadius: 30, shipRadius: 20,
        Anims:[
            {t:'static', letter: 'A', size: 12, color:'#00cc00', x:0, y:-8, r: 0, qStart:90, qV:-2, qDir:0},
            {t:'static', letter: 'A', size: 12, color:'#00cc00', x:-8, y:8, r: 0, qStart:90, qV:-2, qDir:0},
            {t:'static', letter: 'A', size: 12, color:'#00cc00', x:8, y:8, r: 0, qStart:90, qV:-2, qDir:0},
        ],
    },
    WinningConds:[
        {T:'Main',C:{'E:enemies':{max:0,D:'killLeft'}}, RewardGold:100, RewardFlags:{Conquer:1,TroLoLo:1}, EndPortal:{X:0,Y:0}},
    ],
    Routes:{
        Conquer:{
            'Second_Third':{A:'Second',B:'Third'},
        },
    },
    Ship:{Start:{X: -500, Y: 0, A:90}},
    BoardMods:['sitOnMap','greenColor'],
    Place:[
        {Random:{X: 2000, Y: 0, Radius: 500}, What:{A:12}},
    ]
};


}
