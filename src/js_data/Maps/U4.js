if(BBAdata.GET.MAPSMODE)
BBAdata.MAPS.U4 = {
    BoardMods:['sitOnMap','allAvoid'],
    WinningConds:[
        {T:'Main',C:{'D:gargamon':{min:1,D:'killLeft'}}, Reward:{Conquer:1}},
    ],

    Ship:{Start:{X: 300, Y: 0, A:180}},
    Place:[
        {Random:{X: 600, Y: 0, Radius: 500}, What: {G:10}},
        {RingOf:{X: 0, Y:0, Radius: 100, RadiusPlus: 0}, What:{Star:10}},
    ],
};
