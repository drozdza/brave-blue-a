if(!BBAdata.GET.MAPSMODE){

BBAdata.MAPS.First = {
    StarMap:{ x:0, y:0, mouseRadius: 25, shipRadius: 20, MapGroup: 'Tutorial',
        Anims:[
            {t:'static', letter: 'A', size: 12, color:'#00cc00', x:0, y:0, r: 0, qStart:90, qV:-2, qDir:0},
        ],
    },
    WinningConds:[
        {T:'Main',C:{'E:enemies':{max:0,D:'killLeft'}}, RewardGold:100, RewardFlags:{C_First:1}, EndPortal:{X:0,Y:0}},
    ],
    Routes:{
        C_First:{
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
    StarMap:{ x:160, y:-40, mouseRadius: 50, shipRadius: 20, MapGroup: 'Tutorial',
        VisibleIf:['C_First'],
        Anims:[
            {t:'static', letter: 'A', size: 12, color:'#00cc00', x:-8, y:0, r: 0, qStart:90, qV:-2, qDir:0},
            {t:'static', letter: 'A', size: 12, color:'#00cc00', x:8, y:0, r: 0, qStart:90, qV:-2, qDir:0},
        ],
    },
    WinningConds:[
        {T:'Main',C:{'E:enemies':{max:0,D:'killLeft'}}, RewardGold:100, RewardFlags:{C_Second:1}, EndPortal:{X:0,Y:0}},
        {T:'Main',C:{'E:enemies':{max:0,D:'killLeft'}}, RewardGold:100, RewardFlags:{C_Second:1}, EndPortal:{X:0,Y:0}},
    ],
    Routes:{
        C_Second:{
            'First_Second':{A:'First',B:'Second'},
            'Second_Third':{A:'Second',B:'Third'},

            // 'First_Third':{A:'First',B:'Third'},
            // 'First_HardX':{A:'First',B:'HardX'},
            // 'Second_HardX':{A:'Second',B:'HardX'},
            // 'Third_HardX':{A:'Third',B:'HardX'},
        },
    },
    Ship:{Start:{X: -500, Y: 0, A:90}},
    BoardMods:['sitOnMap','greenColor'],
    Place:[
        {Random:{X: 2000, Y: 0, Radius: 500}, What:{A:6}},
    ]
};
BBAdata.MAPS.Third = {
    StarMap:{ x:260, y:-180, mouseRadius: 30, shipRadius: 20, MapGroup: 'Tutorial',
        VisibleIf:['C_First'],
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
            'Third_HardX':{A:'Third',B:'HardX'},
        },
    },
    Ship:{Start:{X: -500, Y: 0, A:90}},
    BoardMods:['sitOnMap','greenColor'],
    Place:[
        {Random:{X: 2000, Y: 0, Radius: 500}, What:{A:12}},
    ]
};


BBAdata.MAPS.HardX = {
    StarMap:{ x:0, y:0, mouseRadius: 70, shipRadius: 40, MapGroup: 'HardOnes',
        Anims:[
            {t:'static', LIBpath: 'StarPath', size: 35, color:'white', x:0, y:0, q:0},
            {t:'around', letter: 'Q', size: 30, color:'red', x:0, y:0, r: 30, qStart:90, qV:1, qDir:180},
            {t:'around', letter: 'A', size: 12, color:'red', x:0, y:0, r: 50, qStart:90, qV:-2, qDir:0},
            {t:'around', letter: 'A', size: 12, color:'red', x:0, y:0, r: 58, qStart:75, qV:-2, qDir:0},
            {t:'around', letter: 'A', size: 12, color:'red', x:0, y:0, r: 66, qStart:90, qV:-2, qDir:0},
        ],
    },
    WinningConds:[
        {T:'Main',C:{'E:enemies':{max:0,D:'killLeft'}}, RewardGold:100, RewardFlags:{Conquer:1}, EndPortal:{X:0,Y:0}},
    ],
    Routes:{
        Conquer:{},
    },
    Ship:{Start:{X: -500, Y: 0, A:90}},
    BoardMods:['sitOnMap'],
    Place:[
        {Random:{X: 1000, Y: 0, Radius: 500}, What:{StarL:20,StarM:20,Star:20,StarS:20}},
        {Random:{X: 2000, Y: 0, Radius: 500}, What:{Q:12}},
    ]
};
BBAdata.MapGroups = {};
BBAdata.MapGroups.Tutorial = {x:0, y:0,
    Backgrounds:{
        0:[
            {x:100,y:100, Anims:[
                {t:'static', LIBpath: 'StarPath', size: 45, color:'white', x:0, y:0, q:0},
                {t:'static', LIBpath: 'StarPath', size: 35, color:'white', x:0, y:-50, q:0},
                {t:'static', LIBpath: 'StarPath', size: 35, color:'white', x:-50, y:20, q:0},
                {t:'static', LIBpath: 'StarPath', size: 25, color:'white', x:-30, y:40, q:0},
                {t:'static', LIBpath: 'StarPath', size: 25, color:'white', x:20, y:70, q:0},
            ]},
        ],
        1:[
            {x:100,y:100, Anims:[
                {t:'static', LIBpath: 'StarPath', size: 25, color:'yellow', x:0, y:0, q:0},
                {t:'static', LIBpath: 'StarPath', size: 15, color:'yellow', x:0, y:-50, q:0},
                {t:'static', LIBpath: 'StarPath', size: 15, color:'yellow', x:-50, y:20, q:0},
                {t:'static', LIBpath: 'StarPath', size: 8, color:'yellow', x:-30, y:40, q:0},
                {t:'static', LIBpath: 'StarPath', size: 8, color:'yellow', x:20, y:70, q:0},
            ]},
            {x:300,y:-200, Anims:[
                {t:'static', LIBpath: 'StarPath', size: 25, color:'yellow', x:0, y:0, q:0},
                {t:'static', LIBpath: 'StarPath', size: 15, color:'yellow', x:0, y:-50, q:0},
                {t:'static', LIBpath: 'StarPath', size: 15, color:'yellow', x:-50, y:20, q:0},
                {t:'static', LIBpath: 'StarPath', size: 8, color:'yellow', x:-30, y:40, q:0},
                {t:'static', LIBpath: 'StarPath', size: 8, color:'yellow', x:20, y:70, q:0},
            ]},
        ],
        2:[
            {x:100,y:100, Anims:[
                {t:'static', LIBpath: 'StarPath', size: 25, color:'orange', x:0, y:0, q:0},
                {t:'static', LIBpath: 'StarPath', size: 15, color:'orange', x:0, y:-50, q:0},
                {t:'static', LIBpath: 'StarPath', size: 15, color:'orange', x:-50, y:20, q:0},
                {t:'static', LIBpath: 'StarPath', size: 8, color:'orange', x:-30, y:40, q:0},
                {t:'static', LIBpath: 'StarPath', size: 8, color:'orange', x:20, y:70, q:0},
            ]},
            {x:-100,y:-200, Anims:[
                {t:'static', LIBpath: 'StarPath', size: 25, color:'orange', x:0, y:0, q:0},
                {t:'static', LIBpath: 'StarPath', size: 15, color:'orange', x:0, y:-50, q:0},
                {t:'static', LIBpath: 'StarPath', size: 15, color:'orange', x:-50, y:20, q:0},
                {t:'static', LIBpath: 'StarPath', size: 8, color:'orange', x:-30, y:40, q:0},
                {t:'static', LIBpath: 'StarPath', size: 8, color:'orange', x:20, y:70, q:0},
            ]},
        ],
    },
};
BBAdata.MapGroups.HardOnes = {x:500, y:200, VisibleIf:['TroLoLo'],
    Backgrounds:{
        2:[
            {x:100,y:-100, Anims:[
                {t:'static', LIBpath: 'StarPath', size: 25, color:'orange', x:0, y:0, q:0},
                {t:'static', LIBpath: 'StarPath', size: 15, color:'orange', x:0, y:-50, q:0},
                {t:'static', LIBpath: 'StarPath', size: 15, color:'orange', x:-50, y:20, q:0},
                {t:'static', LIBpath: 'StarPath', size: 8, color:'orange', x:-30, y:40, q:0},
                {t:'static', LIBpath: 'StarPath', size: 8, color:'orange', x:20, y:70, q:0},
            ]},
            {x:-100,y:-200, Anims:[
                {t:'static', LIBpath: 'StarPath', size: 25, color:'orange', x:0, y:0, q:0},
                {t:'static', LIBpath: 'StarPath', size: 15, color:'orange', x:0, y:-50, q:0},
                {t:'static', LIBpath: 'StarPath', size: 15, color:'orange', x:-50, y:20, q:0},
                {t:'static', LIBpath: 'StarPath', size: 8, color:'orange', x:-30, y:40, q:0},
                {t:'static', LIBpath: 'StarPath', size: 8, color:'orange', x:20, y:70, q:0},
            ]},
        ],
    },
};

}
