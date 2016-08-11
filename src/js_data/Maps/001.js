BBAdata['MAPS']['001'] = {
    BoardMods:['sitOnMap','allAvoid'],
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
