BBAdata['MAPS']['Secure'] = {
    BoardMods:['sitOnMap','allAvoid'],
    WinningConds:[
        {T:'Main',C:{'D:carras':{min:100,D:'killMin'}}, Revard:{Conquer:1}},
        {T:'Main',C:{'E:enemies':{max:0,D:'killAll'}}, Revard:{Conquer:1}, EndPortal:{X:100,Y:200}},
        {T:'Main',C:{'D:orhenes':{min:6,D:'killMin'},'D:koriaz':{max:0}}, Revard:{}},
        {T:'Add',C:{seconds:{max:140,D:'timeTo'},gameEnded:{min:1,D:'hidden'}}, hideOnFial:true, Revard:{}},
        {T:'Add',C:{seconds:{max:60,D:'timeTo'},'E:koriaz':{max:0,D:'killMax'}}, hideOnFial:true, Revard:{}},
        {T:'Add',C:{seconds:{max:60,D:'timeTo'},'E:fariax':{max:0,D:'killMax'}}, hideOnFial:true, Revard:{}},
        {T:'Add',C:{S_lifeHealed:{max:0},gameEnded:{min:1,D:'hidden'}}, Revard:{}},
        {T:'Add',C:{'D:carras':{max:0}}, Revard:{}},
        {T:'Add',C:{'D:carras':{min:20}}, hideOnPending: true, Revard:{}},
        {T:'Add',C:{'D:carras':{min:100},S_lifeLost:{max:0},S_shieldLost:{max:0}}, Revard:{}},
    ],
    EndPortal:{X:1200,Y:0},
    Ship:{Start:{X: 0, Y: 0, A:0}},
    Place:[
        {RingOf:{X: 0, Y:0, Radius: 800, RadiusPlus: 0}, What:{Star:60}},
        {RingOf:{X: 0, Y:0, Radius: 800, RadiusPlus: 1400}, What:{Star:120}},
        {RingOf:{X: 0, Y:0, Radius: 2200}, What:{Star:80}},
        {Random:{X: 0, Y: 0, Radius: 2200}, What: {K:10,F:10,Q:6}},
        {What:{RoundField:1},objData:{x:0,y: -3000, radius:20, fieldAnim: 'HealingField', PeriodTime: 50, PeriodOffset: 5, PeriodHeal: 1, dontHit:['B','E','BE']}},
    ]
};
