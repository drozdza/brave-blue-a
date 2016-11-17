if(BBAdata.GET.MAPSMODE)
BBAdata.MAPS['001'] = {
    StarMap:{ x:100, y:50, mouseRadius: 70, shipRadius: 20,
        Anims:[
            {t:'static', LIBpath: 'StarPath', size: 35, color:'white', x:0, y:0, q:0},
            {t:'around', letter: 'A', size: 12, color:'red', x:0, y:0, r: 50, qStart:90, qV:-2, qDir:0},
            {t:'around', letter: 'A', size: 12, color:'red', x:0, y:0, r: 58, qStart:75, qV:-2, qDir:0},
            {t:'around', letter: 'A', size: 12, color:'red', x:0, y:0, r: 66, qStart:90, qV:-2, qDir:0},
            {t:'around', letter: 'Q', size: 30, color:'red', x:0, y:0, r: 30, qStart:90, qV:1, qDir:180},
        ],
    },
    BoardMods:['sitOnMap','allAvoid','colorGold'],
    Place:[
        {Random:{X: 1000, Y: 1000, Radius: 200}, What:{Star: 20, A: 20}},
        {Random:{X: 1000, Y: -1000, Radius: 200}, What:{Star: 20, M: 10}},
        {Random:{X: -1000, Y: -1000, Radius: 100}, What:{Q: 10}},

        {What:{RoundField:1},objData:{x:0,y:-400, radius:200, fieldAnim: 'GravityField', bounceType:'gentle',bounceForce:1}},
        {What:{Gstar:1},objData:{x:-140,y:900,bounceType:'diagonal',}},
        {What:{Gstar:1},objData:{x:140,y:900,bounceType:'diagonal',}},
        {What:{J:1},objData:{x:0,y:600,angle:90,toDo:[{N:0,T:'sleeping',maxAlarm:0,straightMin:10,straightPlus:50}],alarmLvl:0}},
        {What:{Star:1},objData:{x:100,y:600}},
        {What:{Star:1},objData:{x:100,y:640}},
        {What:{Star:1},objData:{x:100,y:680}},
        {What:{Star:1},objData:{x:100,y:720}},
        {What:{Star:1},objData:{x:100,y:760}},
        {What:{Star:1},objData:{x:100,y:800}},
    ],
};
