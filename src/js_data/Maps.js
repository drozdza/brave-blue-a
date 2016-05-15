BBAdata['MAPS']={
    'Start':{
        Place:[
            {Random:{X:0, Y:0, Radius: 600}, What:{Star: 300, K: 1}},
            {LineOf:{X:-110, Y:-600, Angle: 0, Distance: 80}, What:{Mine:20},objData:{explosivePreset:'ExplosionSize1'}},
            {LineOf:{X: 110, Y:-600, Angle: 0, Distance: 80}, What:{Mine:20},objData:{explosivePreset:'ExplosionSize1'}},
            {LineOf:{X:-110, Y:-640, Angle: 0, Distance: 80}, What:{Star:20},objData:{explosivePreset:'ExplosionSize1'}},
            {LineOf:{X: 110, Y:-640, Angle: 0, Distance: 80}, What:{Star:20},objData:{explosivePreset:'ExplosionSize1'}},

            {CircleOf:{X:0, Y:-2500, Radius: 300, AngleStart: 160, AngleBy: -7}, What:{Star:23},objData:{explosivePreset:'ExplosionSize1'}},
            {CircleOf:{X:0, Y:-2500, Radius: 300, AngleStart: 200, AngleBy: 7}, What:{Star:23},objData:{explosivePreset:'ExplosionSize1'}},

            {RingOf:{X: 0, Y:0, Radius: 650, RadiusPlus: 200}, What:{Mine:150},objData:{explosivePreset:'NailedMine'}},

            {RingOf:{X: 0, Y:0, Radius: 1000}, What:{Mine:150},objData:{explosivePreset:'NailedMine'}},
        ],
    },
    'm1':{
        Place:[
            {Random:{X:-400, Y:0, Radius: 50}, What:{Mine: 60},objData:{explosivePreset:'ExplosionSize1'}},
            {Random:{X:-400, Y:0, Radius: 50}, What:{K: 3},objData:{explosivePreset:'ExplosionSize3'}},
            {LineOf:{X:-230, Y:-200, Angle: 0, Distance: 20}, What:{Mine:20},objData:{explosivePreset:'ExplosionSize1'}},
            {LineOf:{X: 130, Y:-200, Angle: 0, Distance: 10}, What:{Mine:40},objData:{explosivePreset:'ExplosionSize1'}},
            {LineOf:{X: 180, Y:-200, Angle: 0, Distance: 10}, What:{Mine:40},objData:{explosivePreset:'ExplosionSize1'}},
            {LineOf:{X: 230, Y:-200, Angle: 0, Distance: 10}, What:{Mine:40},objData:{explosivePreset:'ExplosionSize1'}},
            {LineOf:{X: 280, Y:-200, Angle: 0, Distance: 10}, What:{Mine:40},objData:{explosivePreset:'ExplosionSize1'}},
            {LineOf:{X: 330, Y:-200, Angle: 0, Distance: 10}, What:{Mine:40},objData:{explosivePreset:'ExplosionSize1'}},
            {LineOf:{X: 380, Y:-200, Angle: 0, Distance: 10}, What:{Mine:40},objData:{explosivePreset:'ExplosionSize1'}},
            {LineOf:{X:-110, Y:-200, Angle: 0, Distance: 20}, What:{Star:20},objData:{explosivePreset:'ExplosionSize1'}},
            {CircleOf:{X:-400, Y:-200, Radius: 40, AngleStart: 0, AngleBy: 15}, What:{Mine:32},objData:{explosivePreset:'ExplosionSize1'}},
        ],
    },
    'u1':{
        MapRadius:60,MapRadius2:2400,
        BoardMods:['sitOnMap','allAvoid'],
        Place:[
            {Random:{X: 0, Y: 0, Radius: 200}, What: {K:1}},

            {What:{RoundField:1},objData:{x:-10,y:-450, radius:90, simpleFilling:'transparent',
                stateIn:{simpleFilling:'rgba(255,0,0,0.5)'},
                stateOut:{simpleFilling:'transparent'}
            }},


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
            {What:{J:1},objData:{x:-1000,y:600,angle:90,toDo:[{N:0,T:'sleeping',maxAlarm:0,straightMin:10,straightPlus:50}],alarmLvl:0}},

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

            {LineOf:{X:225, Y:750, Angle: 45, Distance: 80}, What:{Mine:7},objData:{explosivePreset:'NailedMine2'}},
            {LineOf:{X:280, Y:1030, Angle: 45, Distance: 80}, What:{Mine:11},objData:{explosivePreset:'NailedMine'}},
            {LineOf:{X:585, Y:900, Angle: 45, Distance: 80}, What:{Mine:4},objData:{explosivePreset:'ExplosionSize1'}},


            {What:{Gstar:1},objData:{x:-140,y:900,bounceType:'diagonal',bounceTeleport:true}},
            {What:{Gstar:1},objData:{x:140,y:900,bounceType:'diagonal',bounceTeleport:true}},
        ],
    },
    '1':{
        MapRadius:60,MapRadius2:2400,
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
    },
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
    'iD':{
        BoardMods:['sitOnMap','allAvoid'],
        Place:[
            {Random:{X: 0, Y: 0, Radius: 800}, What:{Star: 20, K:2, A:8}},
            {RingOf:{X: 0, Y: 0, Radius: 500,RadiusPlus:300}, What:{iD:20}},
        ],
    },
    'Ht':{
        BoardMods:['sitOnMap','allAvoid'],
        Place:[{Random:{X: 0, Y: 0, Radius: 800}, What:{Star: 20, Ht:20, K:2, A:8}}],
    },
    'v':{
        BoardMods:['sitOnMap','allAvoid'],
        Place:[{Random:{X: 0, Y: 0, Radius: 800}, What:{Star: 20, v:20, K:2}}],
    },
    'Followers':{
        BoardMods:['sitOnMap','allAvoid'],
        Place:[{Random:{X: 0, Y: 0, Radius: 2200}, What:{Star:120, A:15, U:10, S:10, I:10, C:10, V:10, K:10, F:10}}],
    },
    'BigOnes':{
        BoardMods:['sitOnMap','allAvoid'],
        Place:[{Random:{X: 0, Y: 0, Radius: 2200}, What:{Star:120, D:10, M:10, N:10, J:10, W:5, T:10, E:10, G:10, R:10, B:10, K:10, F:10, Q:5,X:5}}],
    },
    'Secure':{
        BoardMods:['sitOnMap','allAvoid'],
        Place:[
            {Random:{X: 0, Y: 0, Radius: 2200}, What:{Star:120, Q:6, F:10, K: 10}},
            {What:{RoundField:1},objData:{x:0,y: -3000, radius:20, fieldAnim: 'HealingField', PeriodTime: 50, PeriodOffset: 5, PeriodHeal: 1, dontHit:['B','E','BE']}},
        ]

    },
    'HardCore':{
        BoardMods:['sitOnMap','allAvoid'],
        Place:[{Random:{X: 0, Y: 0, Radius: 2200}, What:{Star:120, A:15, U:10, S:10, I:10, D:10, M:10, N:10, J:10, W:5, T:10, E:10, C:10, G:10, R:10, H:10, B:10, V:10, K:10, F:10, Q:5, X:6, Z:5}}],
    },
    '*ShieldTest':{MapRadius:1500,MapRadius2:1500,GiveEnergyFields:25,O:{ F: 2, U:2, Q:1, T:2, K:1,C:1,B:1,N:1,M:1, A:5, Star: 20}},
    '*SuperSecure':{MapRadius:1000,MapRadius2:1000,O:{ F: 10, K:10, Q:1, A:10, Star: 10}},

};
