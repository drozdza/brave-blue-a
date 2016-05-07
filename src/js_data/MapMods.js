
/*
            {N:74,T:'alarmAboutIncomingFire', FlagsRequired:{gotHitFlag:true}, minAlarm: 5, alarmRadius: 220},
            {N:73,T:'avoidIncomingFire', FlagsRequired:{gotHitFlag:true}, minAlarm: 2, avoidTime: 12},
            {N:72,T:'avoidIncomingFire', FlagsRequired:{incomingFireFlag:true}, minAlarm: 5, avoidTime: 12},

            {N:67,T:'lowerSpeedForResources', minAlarm: 0, wantedRes: 'misslePack', wantedResR: 20, gotoSpeed: 1},
            {N:66,T:'speedUpIfResources', minAlarm: 0, wantedRes: 'misslePack', wantedResR: 20, gotoSpeed: 2},
            {N:61,T:'speedUp', maxSpeedLvl: 1, gotoSpeed: 2},

            {N:55,T:'alarmAboutSpottedEnemy', minAlarm: 5, alarmRadius: 250},
            {N:45,T:'lowerAlarmLvl', minAlarm: 5, minEnemyDontSeen: 750, goToAlarmLvl: 4, goToSpotLvl: 2},
            {N:35,T:'followEnemy', minAlarm: 5, goToSpotLvl: 3 },
            {N:23,T:'stayInRegion', X:0, Y:0, Radius: 1700 },
            {N:18,T:'changeManouver2', maxAlarm: 4, minAlarm: 3, straightMin: 20, straightPlus: 80, turnMin: 10, turnPlus: 80  },
            {N:15,T:'changeManouver', maxAlarm: 3, straightMin: 60, straightPlus: 100, turnMin: 30, turnPlus: 70  },
            {N:1, T:'goStraight', straightMin: 200, straightPlus: 100 },
*/



BBAdata['MapMODS']={
    sitOnMap:{
        toDo:[
            {N:22,T:'stayInRegion', X:0, Y:0, Radius: 700 },
            {N:1, T:'goStraight', straightMin: 200, straightPlus: 100 },
        ],
    },
    allAvoid:{
        who:['A','S','C','U','H','Z','V'],
        toDo:[
            {N:74,T:'alarmAboutIncomingFire', FlagsRequired:{gotHitFlag:true}, minAlarm: 5, alarmRadius: 150},
            {N:73,T:'avoidIncomingFire', FlagsRequired:{gotHitFlag:true}, minAlarm: 2, avoidTime: 12},
            {N:72,T:'avoidIncomingFire', FlagsRequired:{incomingFireFlag:true}, minAlarm: 5, avoidTime: 12},
        ],
    },

};
