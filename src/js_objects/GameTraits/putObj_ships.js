GAMEobject.prototype.putObj_iskariot = function(O){
    O.speedLvl = 2;
    O.speed =  7 - Math.random()*1.5;
    O.speedT  = 2.5- -Math.random();
    O.speedArr = [0,
        {S: O.speed-5, T:O.speedT- -0.6},
        {S: O.speed, T:O.speedT},
        {S: O.speed- -4, T:O.speedT}
    ];

    var spotRad1 = 80- -parseInt(Math.random()*80);
    var spotRad2 = 300- -parseInt(Math.random()*200);
    O.spotTick = 8;
    O.spotArr=[0,
        { T: 'single', Ref: 15, Rad: spotRad1},
        { T: 'double', Ref: 10, Rad: spotRad1, Rad2: spotRad2, Angle2: 30- -parseInt(Math.random()*30)},
        { T: 'single', Ref: 45, Rad: spotRad2}
    ];
    return O;
};


GAMEobject.prototype.putObj_carras = function(O){
    O.speedLvl = 2;
    O.speed = 6.5- -Math.random();
    O.speedT    = 2.5; //- -Math.random();
    O.speedArr = [0,
        {S: O.speed-2, T:O.speedT- -2},
        {S: O.speed, T:O.speedT},
        {S: O.speed- -3, T:O.speedT}
    ];

    var spotRad1 = 80- -parseInt(Math.random()*80);
    var spotRad2 = 300- -parseInt(Math.random()*200);
    O.spotTick = 8;
    O.spotArr=[0,
        { T: 'single', Ref: 15, Rad: spotRad1},
        { T: 'double', Ref: 10, Rad: spotRad1, Rad2: spotRad2, Angle2: 30- -parseInt(Math.random()*30)},
        { T: 'single', Ref: 45, Rad: spotRad2}
    ];
    return O;
}

GAMEobject.prototype.putObj_dregos = function(O){
    O.speedLvl = 2;
    O.speed = 7- -Math.random()*1.5;
    O.speedT    = 2.5- -Math.random();
    O.speedArr = [0,
        {S: O.speed-5, T:O.speedT- -2},
        {S: O.speed, T:O.speedT},
        {S: O.speed- -3, T:O.speedT}
    ];

    var spotRad1 = 80- -parseInt(Math.random()*80);
    var spotRad2 = 300- -parseInt(Math.random()*200);
    O.spotTick = 8;
    O.spotArr=[0,
        { T: 'single', Ref: 15, Rad: spotRad1},
        { T: 'double', Ref: 10, Rad: spotRad1, Rad2: spotRad2, Angle2: 30- -parseInt(Math.random()*30)},
        { T: 'single', Ref: 45, Rad: spotRad2}
    ];
    return O;
}

GAMEobject.prototype.putObj_hajaher = function(O){
    O.speedLvl = 2;
    O.speed = 5- -Math.random()*4;
    O.speedT    = 2- -Math.random()*2;
    O.speedArr = [0,
        {S: O.speed-4, T:O.speedT- -1.5},
        {S: O.speed, T:O.speedT},
        {S: O.speed- -3, T:O.speedT}
    ];

    var spotRad1 = 80- -parseInt(Math.random()*80);
    var spotRad2 = 300- -parseInt(Math.random()*200);
    O.spotTick = 8;
    O.spotArr=[0,
        { T: 'single', Ref: 15, Rad: spotRad1},
        { T: 'double', Ref: 10, Rad: spotRad1, Rad2: spotRad2, Angle2: 30- -parseInt(Math.random()*30)},
        { T: 'single', Ref: 45, Rad: spotRad2}
    ];
    return O;
}

GAMEobject.prototype.putObj_muerto = function(O){
    O.speedLvl = 2;
    O.speed = 3;
    O.speedT = 2; //- -Math.random();
    O.speedArr = [0,
        {S: O.speed-2, T:O.speedT- -1},
        {S: O.speed, T:O.speedT},
        {S: O.speed- -3, T:O.speedT}
    ];

    var spotRad1 = 80- -parseInt(Math.random()*80);
    var spotRad2 = 300- -parseInt(Math.random()*200);
    O.spotTick = 8;
    O.spotArr=[0,
        { T: 'single', Ref: 15, Rad: spotRad1},
        { T: 'double', Ref: 10, Rad: spotRad1, Rad2: spotRad2, Angle2: 30- -parseInt(Math.random()*30)},
        { T: 'single', Ref: 45, Rad: spotRad2}
    ];

    O.weapon=[
        {t:'rose', Power:1, Dec: 50, Speed: 10, gunSpeed: 50, lastShot: 100, AtOnce: 9, RoseAngle: 4, maxSpeed: 2, minAlarm: 5, minDistToEnemy: spotRad2}
    ];
    return O;
}

GAMEobject.prototype.putObj_nemezis = function(O){
    O.speedLvl = 2;
    O.speed = 3;
    O.speedT = 2;
    O.speedArr = [0,
        {S: O.speed-2, T:O.speedT},
        {S: O.speed, T:O.speedT},
        {S: O.speed- -2, T:O.speedT}
    ];

    var spotRad1 = 80- -parseInt(Math.random()*80);
    var spotRad2 = 300- -parseInt(Math.random()*200);
    O.spotTick = 8;
    O.spotArr=[0,
        { T: 'single', Ref: 15, Rad: spotRad1},
        { T: 'double', Ref: 10, Rad: spotRad1, Rad2: spotRad2, Angle2: 30- -parseInt(Math.random()*30)},
        { T: 'single', Ref: 45, Rad: spotRad2}
    ];

    return O;
}

GAMEobject.prototype.putObj_juggernaut = function(O){
    O.speedLvl = 2;
    O.speed = 1;
    O.speedT = 1;
    O.speedArr = [0,
        {S: O.speed, T:O.speedT},
        {S: O.speed, T:O.speedT},
        {S: O.speed, T:O.speedT}
    ];

    var spotRad1 = 180- -parseInt(Math.random()*80);
    var spotRad2 = 400- -parseInt(Math.random()*200);
    O.spotTick = 8;
    O.spotArr=[0,
        { T: 'single', Ref: 15, Rad: spotRad1},
        { T: 'double', Ref: 10, Rad: spotRad1, Rad2: spotRad2, Angle2: 30- -parseInt(Math.random()*30)},
        { T: 'single', Ref: 45, Rad: spotRad2}
    ];

    return O;
}

GAMEobject.prototype.putObj_warastein = function(O){
    O.speedLvl = 2;
    O.speed = 7;
    O.speedT = 3;
    O.speedArr = [0,
        {S: 3, T: 4},
        {S: O.speed, T:O.speedT},
        {S: O.speed, T:O.speedT}
    ];

    var spotRad1 = 120- -parseInt(Math.random()*80);
    var spotRad2 = 300- -parseInt(Math.random()*200);
    O.spotTick = 8;
    O.spotArr=[0,
        { T: 'single', Ref: 15, Rad: spotRad1},
        { T: 'double', Ref: 10, Rad: spotRad1, Rad2: spotRad2, Angle2: 30- -parseInt(Math.random()*30)},
        { T: 'single', Ref: 45, Rad: spotRad2}
    ];

    return O;
}

GAMEobject.prototype.putObj_dandares = function(O){
    O.speedLvl    = 2;
    O.speed     = 4;
    O.speedT    = 2;
    O.speedArr = [0,
        {S: O.speed - 3, T:O.speedT- -1.5},
        {S: O.speed, T:O.speedT},
        {S: O.speed- -4, T:O.speedT}
    ];

    var spotRad1 = 100- -parseInt(Math.random()*60);
    var spotRad2 = 160 -parseInt(Math.random()*60);
    O.spotTick = 8;
    O.spotArr=[0,
        { T: 'single', Ref: 35, Rad: spotRad1},
        { T: 'double', Ref: 20, Rad: spotRad1, Rad2: spotRad2, Angle2: 100- -parseInt(Math.random()*20)},
        { T: 'single', Ref: 45, Rad: spotRad2}
    ];
    return O;
}

GAMEobject.prototype.putObj_tartaros = function(O){
    O.speedLvl = 2;
    O.speed =  5;
    O.speedT  = 6;
    O.speedArr = [0,
        {S: O.speed-3, T:O.speedT-3},
        {S: O.speed, T:O.speedT},
        {S: O.speed- -2, T:O.speedT}
    ];

    var spotRad1 = 80- -parseInt(Math.random()*80);
    var spotRad2 = 300- -parseInt(Math.random()*200);
    O.spotTick = 8;
    O.spotArr=[0,
        { T: 'single', Ref: 15, Rad: spotRad1},
        { T: 'double', Ref: 10, Rad: spotRad1, Rad2: spotRad2, Angle2: 30- -parseInt(Math.random()*30)},
        { T: 'single', Ref: 45, Rad: spotRad2}
    ];
    return O;
}
