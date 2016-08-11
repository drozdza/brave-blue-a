BBAdata['MAPS']['Secure'] = {
    BoardMods:['sitOnMap','allAvoid'],
    WinningConds:[
        {T:'Main',maxC:{enemy:0}, Revard:{Conquer:1}},
        {T:'Main',minC:{'D:orhenes:6','E:koriaz':10}, Revard:{}},
        {T:'Add',maxC:{seconds:360}, Revard:{}},
        {T:'Add',maxC:{S_lifeHealed:0}, Revard:{}},
        {T:'Add',maxC:{'D:carras':0}, Revard:{}},
        {T:'Add',minC:{'D:carras':100), maxC:{S_lifeLost:0,S_shieldLost:0}, Revard:{}},
    ],
    Place:[
        {Random:{X: 0, Y: 0, Radius: 2200}, What:{Star:120, Q:6, F:10, K: 10}},
        {What:{RoundField:1},objData:{x:0,y: -3000, radius:20, fieldAnim: 'HealingField', PeriodTime: 50, PeriodOffset: 5, PeriodHeal: 1, dontHit:['B','E','BE']}},
    ]
};
