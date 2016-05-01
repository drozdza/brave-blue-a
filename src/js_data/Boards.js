BOARDS={
    'u1':{
        MapRadius:60,MapRadius2:2400,
        BoardMods:['sitOnMap','allAvoid'],
        Place:[
            {Random:{X: 0, Y: 0, Radius: 200}, What: {K:1}},

            {What:{SquareField:1},objData:{x:59,y:-933, squareAngle: 45, squareLen: 500, squareWidth: 30, fieldAnim: 'DestructionField', PeriodDamage: 1, PeriodTime: 20, PeriodOffset: 20}},

            {What:{SquareField:1},objData:{x:0,y:-1000, squareAngle: 45, squareLen: 500, squareWidth: 30, fieldAnim: 'WindField', bounceType:'wind',bounceForce:5,windAngle:60}},

            {What:{SquareField:1},objData:{x:800,y:-730, squareAngle: 45, squareLen: 500, squareWidth: 70, fieldAnim: 'WindField', vectorType:'wind', vectorForce:5, windAngle:60}},

            {What:{ConeField:1},objData:{x:400,y:-1000, radius: 220, angle: 110, coneAngle: 40, coneRad2: 40, fieldAnim: 'DestructionField', PeriodDamage: 1, PeriodTime: 20, PeriodOffset: 20}},
            {What:{ConeField:1},objData:{x:-200,y:-1000, radius: 220, angle: 270, coneAngle: 110, coneRad2: 0, fieldAnim:'WindField', bounceType:'wind',bounceForce:1,windAngle:60}},

            {What:{RoundField:1},objData:{x:-1500,y:100, radius:160, fieldAnim: 'WindField', bounceType:'wind',bounceForce:1,windAngle:60}},
            {What:{RoundField:1},objData:{x:-1000,y:400, radius:160, fieldAnim: 'GravityField', bounceType:'gravity',bounceForce:8}},
            {What:{RoundField:1},objData:{x:1400,y:-850, radius:160, fieldAnim: 'GravityField', vectorType:'gravity',vectorForce:8}},
            {What:{RoundField:1},objData:{x:1800,y:-1100, radius:160, fieldAnim: 'GravityField', vectorType:'gentle',vectorForce:8}},
            {What:{RoundField:1},objData:{x:-1000,y:-400, radius:200, fieldAnim: 'OrbitalField', bounceType:'orbital',bounceForce1:2,bounceForce2:6}},
            {What:{RoundField:1},objData:{x:1400,y:-1300, radius:200, fieldAnim: 'OrbitalField', vectorType:'orbital',vectorForce:4,vectorForceAdd:4}},
            {What:{RoundField:1},objData:{x:-1300,y:-100, radius:80, fieldAnim: 'ShellField', bounceType:'gentle',bounceForce:5}},
            {What:{Star:1},objData:{x:-1300,y:-100}},
            {What:{RoundField:1},objData:{x:-1500,y:-150, radius:50, fieldAnim: 'ShellField', bounceType:'gentle',bounceForce:5}},
            {What:{Star:1},objData:{x:-1500,y:-150}},
            {What:{RoundField:1},objData:{x:-1700,y:-50, radius:50, fieldAnim: 'ShellField', bounceType:'gentle',bounceForce:1}},
            {What:{Star:1},objData:{x:-1700,y:-50}},
            {What:{J:1},objData:{x:-1000,y:600,angle:90,toDo:[{N:0,T:'sleeping',maxAlarm:0,straightMin:10,straightPlus:50}],AlarmLvl:0}},

            {What:{ConeField:1},objData:{x:50,y:-500, radius: 250, angle: 10, coneAngle: 40, coneRad2: 50, simpleFilling: 'rgba(255,255,0,0.6)', bounceType:'diagonal',bounceTeleport:true}},

            {What:{ConeField:1},objData:{x:50,y:-400, radius: 250, angle: 100, coneAngle: 30, coneRad2: 50, simpleFilling: 'rgba(255,255,0,0.6)', bounceType:'diagonal',bounceTeleport:true}},

            {What:{ConeField:1},objData:{x:-50,y:-400, radius: 250, angle: 230, coneAngle: 40, coneRad2: 50, simpleFilling: 'rgba(255,255,0,0.6)', bounceType:'diagonal',bounceTeleport:true}},

            {What:{ConeField:1},objData:{x:-50,y:-500, radius: 250, angle: 300, coneAngle: 30, coneRad2: 50, simpleFilling: 'rgba(255,255,0,0.6)', bounceType:'diagonal',bounceTeleport:true}},


            {What:{SquareField:1},objData:{x:-500,y:300, squareAngle: 90, squareLen: 300, squareWidth: 60, simpleFilling: 'rgba(255,255,0,0.6)', bounceType:'diagonal',bounceTeleport:true}},
            {What:{SquareField:1},objData:{x:-500,y:420, squareAngle: 86, squareLen: 303, squareWidth: 20, simpleFilling: 'rgba(255,255,0,0.6)', bounceType:'diagonal',bounceTeleport:true}},
            {What:{SquareField:1},objData:{x:7,y:400, squareAngle: 230, squareLen: 200, squareWidth: 100, simpleFilling: 'rgba(255,255,0,0.6)', bounceType:'diagonal',bounceTeleport:true}},

            {What:{SquareField:1},objData:{x:667,y:-67, squareAngle: 45, squareLen: 210, squareWidth: 30, simpleFilling: 'rgba(255,255,0,0.6)', bounceType:'diagonal',bounceTeleport:true}},
            {What:{ConeField:1},objData:{x:600,y:0, radius: 400, angle: 70, coneAngle: 120, coneRad2: 300, simpleFilling: 'rgba(255,255,0,0.6)', bounceType:'diagonal',bounceTeleport:true}},
            {What:{RoundField:1},objData:{x:600,y:0, radius:100, simpleFilling: 'rgba(255,255,0,0.6)', bounceType:'diagonal',bounceTeleport:true}},

            {What:{ConeField:1},objData:{x:2000,y:0, radius: 600, angle: 90, coneAngle: 170, coneRad2: 550, simpleFilling: 'rgba(0,180,0,0.6)', bounceType:'diagonal',bounceTeleport:true}},
            {What:{RoundField:1},objData:{x:2000,y:0, radius: 480, angle: 90, simpleFilling: 'rgba(0,180,0,0.6)', bounceType:'diagonal',bounceTeleport:true}},

            {What:{RoundField:1},objData:{x:-700,y:-67, radius:10, simpleFilling: 'rgba(155,155,255,0.8)', teleportOnHit: 'random', teleportOnHitDist: 500}},
            {What:{RoundField:1},objData:{x:-600,y:0, radius:10, simpleFilling: 'rgba(155,155,255,0.8)', teleportOnHit: 120,  teleportOnHitDist: 520, teleportOnHitDistPlus: 200}},
            {What:{RoundField:1},objData:{x:-700,y:67, radius:10, simpleFilling: 'rgba(155,155,255,0.8)', teleportOnHit: 'aligned', teleportOnHitDist: 1000}},


            {What:{RoundField:1},objData:{x:-600,y:-1200, radius:200, fieldAnim: 'DestructionField', PeriodDamage: 1, PeriodTime: 6, PeriodOffset: 20, dontHit:['B','BE']}},
            {What:{RoundField:1},objData:{x:-975,y:-905, radius:200, fieldAnim: 'ElectricityField', OneTimeEffect: 1, OneTimeOffset: 20, OneTimeDamage: 4, dontHit:['B','BE']}},
            {What:{RoundField:1},objData:{x:-600,y:-600, radius:200, fieldAnim: 'ShellField', PeriodDamage: 1, PeriodTime: 20, PeriodOffset: 20, SlowDownTo: 2, SlowDownBy: 3, dontHit:['E','P']}},

            {What:{RoundField:1},objData:{x:-910,y: 850, radius:60, fieldAnim: 'ElectricityField', OneTimeEffect: 1, OneTimeOffset: 20, OneTimeDamage: 4, dontHit:['B','BE']}},
            {What:{RoundField:1},objData:{x:-800,y: 1020, radius:60, fieldAnim: 'ElectricityField', OneTimeEffect: 1, OneTimeDamage: 4, dontHit:['B','BE']}},
            {What:{RoundField:1},objData:{x:-600,y: 1100, radius:60, fieldAnim: 'ElectricityField', OneTimeEffect: 1, OneTimeOffset: 20, OneTimeDamage: 4, dontHit:['B','BE']}},
            {What:{RoundField:1},objData:{x:-600,y: 800, radius:200, fieldAnim: 'HealingField', PeriodTime: 50, PeriodOffset: 5, PeriodHeal: 1, dontHit:['B','E','BE']}},

            {What:{LineOfMines:1},objData:{x:280, y:830, radius:500, angle: 45, distance: 80}},
            {What:{LineOfMines:1},objData:{x:480, y:830, radius:500, angle: 45, distance: 80}},
            {What:{LineOfMines:1},objData:{x:680, y:830, radius:500, angle: 45, distance: 80}},

            {What:{Gstar:1},objData:{x:-140,y:900,bounceType:'diagonal',bounceTeleport:true}},
            {What:{Gstar:1},objData:{x:140,y:900,bounceType:'diagonal',bounceTeleport:true}},
        ],
    },
    '*1':{
        MapRadius:60,MapRadius2:2400,
        BoardMods:['sitOnMap','allAvoid'],
        Place:[
            {Random:{X: 1000, Y: 1000, Radius: 200}, What:{Star: 20, A: 20}},
            {Random:{X: 1000, Y: -1000, Radius: 200}, What:{Star: 20, M: 10}},
            {Random:{X: -1000, Y: -1000, Radius: 100}, What:{Q: 10}},

            {What:{RoundField:1},objData:{x:0,y:-400, radius:200, fieldAnim: 'GravityField', bounceType:'gentle',bounceForce:1}},
            {What:{Gstar:1},objData:{x:-140,y:900,bounceType:'diagonal',}},
            {What:{Gstar:1},objData:{x:140,y:900,bounceType:'diagonal',}},
            {What:{J:1},objData:{x:0,y:600,angle:90,toDo:[{N:0,T:'sleeping',maxAlarm:0,straightMin:10,straightPlus:50}],AlarmLvl:0}},
            {What:{Star:1},objData:{x:100,y:600}},
            {What:{Star:1},objData:{x:100,y:640}},
            {What:{Star:1},objData:{x:100,y:680}},
            {What:{Star:1},objData:{x:100,y:720}},
            {What:{Star:1},objData:{x:100,y:760}},
            {What:{Star:1},objData:{x:100,y:800}},
        ],
    },
    '*A':{
        BoardMods:['sitOnMap','allAvoid'],
        Place:[
            {Random:{X: 200, Y: 200, Radius: 200}, What:{Star: 5, A: 25}},
        ],
    },
    '*U':{
        BoardMods:['sitOnMap','allAvoid'],
        Place:[
            {Random:{X: 200, Y: 200, Radius: 200}, What:{Star: 5, U: 6}},
        ],
    },
    '*S':{
        BoardMods:['sitOnMap','allAvoid'],
        Place:[
            {Random:{X: 300, Y: 0, Radius: 200}, What:{Star: 5, S: 8}},
        ],
    },
    '*I':{
        BoardMods:['sitOnMap','allAvoid'],
        Place:[
            {Random:{X: 200, Y: 200, Radius: 200}, What:{Star: 20, I: 20}},
        ],
    },
    '*D':{
        BoardMods:['sitOnMap','allAvoid'],
        Place:[
            {Random:{X: 200, Y: 200, Radius: 200}, What:{Star: 20, D: 10, M: 5, A: 5}},
        ],
    },
    '*M':{
        BoardMods:['sitOnMap'],
        Place:[
            {Random:{X: 200, Y: 200, Radius: 200}, What:{Star: 20, M: 15}},
        ],
    },
    '*N':{
        BoardMods:['sitOnMap'],
        Place:[
            {Random:{X: 200, Y: 200, Radius: 200}, What:{Star: 20, N: 15}},
        ],
    },
    'Start':{MapRadius:600,MapRadius2:2400,O:{ K:1, Star: 300}},
    'Q':{MapRadius:1000,MapRadius2:1000,O:{ Q: 3, Star: 10}},
    'T':{MapRadius:1000,MapRadius2:1000,O:{ T: 10, Star: 10}},
    'B':{MapRadius:1000,MapRadius2:1000,O:{ B: 115, Star: 10}},
    'K':{MapRadius:1000,MapRadius2:1000,O:{ K: 5, A:15, Star: 10}},
    'C':{MapRadius:1000,MapRadius2:1000,O:{ C: 10, Star: 10}},
    'F':{MapRadius:1000,MapRadius2:1000,O:{ F: 10, Q:2, A:10, Star: 10}},
    'G':{MapRadius:1000,MapRadius2:1000,O:{ G:6, Star: 10}},
    'J':{MapRadius:1100,MapRadius2:1100,O:{ J: 8, N: 1, K:2, Star: 10}},
    'V':{MapRadius:1100,MapRadius2:1100,O:{ V: 10, Star: 50}},
    'E':{MapRadius:1100,MapRadius2:1100,O:{ E: 10, Star: 10}},
    'H':{MapRadius:1100,MapRadius2:1100,O:{ H: 10, T:10, Star: 10}},
    'W':{MapRadius:1100,MapRadius2:1100,O:{ W: 10, K:2, Star: 10}},
    'R':{MapRadius:1500,MapRadius2:1800,O:{ R: 10, Star: 10}},
    'ShieldTest':{MapRadius:1500,MapRadius2:1500,GiveEnergyFields:25,O:{ F: 2, U:2, Q:1, T:2, K:1,C:1,B:1,N:1,M:1, A:5, Star: 20}},
    'SuperSecure':{MapRadius:1000,MapRadius2:1000,O:{ F: 10, K:10, Q:1, A:10, Star: 10}},
    'Followers':{MapRadius:2700,MapRadius2:3200,O:{  U:10, A:10, S:10, V:10, Star: 100}},
    'BigOnes':{MapRadius:2700,MapRadius2:3200,O:{  Q:10, F:10, K:10, D:10, G:10, J:10, W:10, Star: 100}},
    'HardCore':{MapRadius:2700,MapRadius2:3200,O:{ M:10, T:10, B:10, N:20, Q:4, U:10, A:12, K:10, F:10, C:10, G:4, S:10, D:10, J:6, V:10, E:10, H:10, R:10, W:4, I:10, Star: 100}},
};
