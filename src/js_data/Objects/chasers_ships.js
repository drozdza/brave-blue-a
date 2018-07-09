

BBAdata.ObjectData.carras={
    LoadMods:{
        enemyShip2:{},
        viewLetterSmall:{view:{Letter: 'A', LetterSize: 16}},
    },

    lifeM: 5,
    radius: 15,

    WeaponTypes: {},
    Weapons:{
        single:{t:'single', DMG:{Dmg:1,T:'normal'}, Dec: 50, Speed: 10, gunSpeed: 15, lastShot: 0, minDistToEnemy:450},
    },

    Manouver: 'goStraight',

    TheState: 'defending',
    TheStateLists: {
        fleeing:{
            speed:{T:'speed', SpeedLvl:'max'},
        },
        attacking: {
            speed:{T:'speed', SpeedLvl:'normal'},
            shot:{T:'shot', WeaponTypes: {single:1}},
            look:{T:'look', LookType:'fighting'},
        },
        patroling: {
            look:{T:'look', LookType:'curious'},
        }
    },

    ThinkNow: 'followRoute',
    ThinkTick: 0,
    Thinks: {
        goToCenter:{T:'followRoutePoint', S:{defending:1}, Time: 20, TimePlus: 20, RoutePoint: 'routePoint1', Radius: 100, MinFromRoutePoint: 400},
        followEnemy:{T:'followEnemy', S:{defending:1}, Time: 30, TimePlus: 60, Radius: 0, MaxEnemyDist: 400},
        changeManouver:{T:'changeManouver', S:{defending:1}, D:[
            {M:'goStraight', Time:20, TimePlus:30, notTwice:1},
            {M:'turnLeft', Time:20, TimePlus:50, maxTurn:180},
            {M:'turnRight', Time:20, TimePlus:50, maxTurn:180},
        ]},

        fleeFromEnemy:{T:'followEnemy', S:{fleeing:1}, Time: 20, TimePlus: 20, Radius: 50, AnglePlus:180, MaxEnemyDist: 200},
        fleeToCenter:{T:'followRoutePoint', S:{fleeing:1}, Time: 20, TimePlus: 20, RoutePoint: 'routePoint1', Radius: 100},

        resignFromFight:{T:'changeTheState', S:{attacking:1}, TheState: 'patroling', Time: 5, FlagMinTime:{Flag:'V_NearbySeesEnemy',Time:240}},
        followEnemy:{T:'followEnemy', S:{attacking:1}, Time: 200, TimePlus: 200, Radius: 50},

        followRoute:{T:'followRoute', S:{patroling:1}, Route:'R2'},

        avoidIncomingFire:{T:'avoidIncomingFire', S:{}, Time: 8, TimePlus: 10, dontInterupt:true},
    },
    FlagReactions: {
        I_ReadyForEnemy:{
            changeTheState: {T:'changeTheState', TheState:'patroling', reqTheState:{ off:1, idle:1 }},
        },
        II_EnemyIsThere:{
            changeTheState: {T:'changeTheState', TheState:'patroling', reqTheState:{ off:1, idle:1 }},
            emitReadiness: {T:'emitFlagLater', Flag:'II_EnemyIsThere', Radius: 200, periodOffTime: 50, offTime: 2, periodTime: 60, nPeriods: 15},
        },
        V_NearbySeesEnemy:{
            addFlags:{T:'addFlags', Flags:['I_ReadyForEnemy','II_EnemyIsThere','III_SomeoneSeenEnemy']},
            emitNearbySeesEnemy: {T:'emitFlagXY', Flag:'V_NearbySeesEnemy', Radius: 50, offTime: 7, pChance: 25},
            changeTheState: {T:'changeTheState', TheState:'attacking', reqTheState:{ off:1, idle:1, patroling:1 }},
        },
        VI_ISeeEnemy:{
            addFlags: {T:'addFlags', Flags:['V_NearbySeesEnemy','IV_SeenEnemy']},
            emitNearbySeesEnemy: {T:'emitFlagXY', Flag:'V_NearbySeesEnemy', Radius: 50, offTime: 7},
            changeTheState: {T:'changeTheState', TheState:'attacking', reqTheState:{ off:1, idle:1, patroling:1 }},
        },
        IGotHit:{
            addFlags:{T:'addFlags', Flags:['I_ReadyForEnemy','II_EnemyIsThere']},
            emitGotHit: {T:'emitFlagXY', Flag:'NearbyGotHit', Radius: 150},
            makeThink: {T:'makeThink', Think:'avoidIncomingFire', notTheState:{ beeingHeroic:1 }}
        },
        NearbyGotHit:{
            addFlags:{T:'addFlags', Flags:['I_ReadyForEnemy','II_EnemyIsThere']},
            makeThink: {T:'makeThink', Think:'avoidIncomingFire', notTheState:{ beeingHeroic:1 }}
        },
        LowLife:{
            changeTheState: {T:'changeTheState', TheState:'fleeing', notTheState:{ beeingHeroic:1 }},
        },
    },

    SpeedArr:{
        slow:   {S: {SV:'speed',Add:-2}, T:0.7},
        normal: {S: {SV:'speed'}, T:2.5},
        max:    {S: {SV:'speed',Add:3}, T:2.5}
    },
    LookTick: 8,
    LookType: false,
    LookArr: {
        sleepy: {T:'single', ticks: 20, Rad: {SV:'spotRad'}},
        curious: {T:'double', ticks: 7, Rad: {SV:'spotRad'}, Rad2: {SV:'spotRad2'}, Angle2: {SV:'spotAngle2'}},
        fighting: {T:'single', ticks: 20, Rad: {SV:'spotRad2'}}
    },

    shipVariables:{
        speed: {Const: 6.5, Rand: 1},
        spotRad: {Const: 80, RandInt: 80},
        spotRad2: {Const: 300, RandInt: 200},
        spotAngle2: {Const: 30, RandInt: 30}
    },
};
