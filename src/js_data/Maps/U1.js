BBAdata['MAPS']['U1'] = {
    BoardMods:['sitOnMap','allAvoid'],
    Place:[
        {Random:{X: 0, Y: 0, Radius: 200}, What: {K:1}},

        {What:{RoundField:1},objData:{x:-10,y:-450, radius:90, simpleFilling:'transparent',
            stateIn:{simpleFilling:'rgba(255,0,0,0.5)'},
            stateOut:{simpleFilling:'rgba(0,0,255,0.1)'}
        }},


        {What:{SquareField:1},objData:{x:59,y:-933, squareAngle: 45, squareLen: 500, squareWidth: 30, fieldAnim: 'DestructionField', PeriodDMG:{Dmg:1,T:'normal'}, PeriodTime: 20, PeriodOffset: 20}},

        {What:{SquareField:1},objData:{x:0,y:-1000, squareAngle: 45, squareLen: 500, squareWidth: 30, fieldAnim: 'WindField', bounceType:'wind',bounceForce:5,windAngle:60}},

        {What:{SquareField:1},objData:{x:800,y:-730, squareAngle: 45, squareLen: 500, squareWidth: 70, fieldAnim: 'WindField', vectorType:'wind', vectorForce:5, windAngle:60}},

        {What:{ConeField:1},objData:{x:400,y:-1000, radius: 220, angle: 110, coneAngle: 40, coneRad2: 40, fieldAnim: 'DestructionField', PeriodDMG:{Dmg:1,T:'normal'}, PeriodTime: 20, PeriodOffset: 20}},
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


        {What:{RoundField:1},objData:{x:-600,y:-1200, radius:200, fieldAnim: 'DestructionField', PeriodDMG:{Dmg:1,T:'normal'}, PeriodTime: 6, PeriodOffset: 20, dontHit:['B','BE']}},
        {What:{RoundField:1},objData:{x:-975,y:-905, radius:200, fieldAnim: 'ElectricityField', OneTimeEffect: 1, OneTimeOffset: 20, OneTimeDMG:{Dmg:4,T:'energy'}, dontHit:['B','BE']}},
        {What:{RoundField:1},objData:{x:-600,y:-600, radius:200, fieldAnim: 'ShellField', PeriodDMG:{Dmg:1,T:'normal'}, PeriodTime: 20, PeriodOffset: 20, SlowDownTo: 2, SlowDownBy: 3, dontHit:['E','P']}},

        {What:{RoundField:1},objData:{x:-910,y: 850, radius:60, fieldAnim: 'ElectricityField', OneTimeEffect: 1, OneTimeOffset: 20, OneTimeDMG:{Dmg:4,T:'energy'}, dontHit:['B','BE']}},
        {What:{RoundField:1},objData:{x:-800,y: 1020, radius:60, fieldAnim: 'ElectricityField', OneTimeEffect: 1, OneTimeDMG:{Dmg:4,T:'energy'}, dontHit:['B','BE']}},
        {What:{RoundField:1},objData:{x:-600,y: 1100, radius:60, fieldAnim: 'ElectricityField', OneTimeEffect: 1, OneTimeOffset: 20, OneTimeDMG:{Dmg:4,T:'energy'}, dontHit:['B','BE']}},
        {What:{RoundField:1},objData:{x:-600,y: 800, radius:200, fieldAnim: 'HealingField', PeriodTime: 50, PeriodOffset: 5, PeriodHeal: 1, dontHit:['B','E','BE']}},

        {LineOf:{X:225, Y:750, Angle: 45, Distance: 80}, What:{Mine:7},objData:{explodePreset:'NailedMine2'}},
        {LineOf:{X:280, Y:1030, Angle: 45, Distance: 80}, What:{Mine:11},objData:{explodePreset:'NailedMine'}},
        {LineOf:{X:585, Y:900, Angle: 45, Distance: 80}, What:{Mine:4},objData:{explodePreset:'ExplosionSize1'}},


        {What:{Gstar:1},objData:{x:-140,y:900,bounceType:'diagonal',bounceTeleport:true}},
        {What:{Gstar:1},objData:{x:140,y:900,bounceType:'diagonal',bounceTeleport:true}},
    ],
};
