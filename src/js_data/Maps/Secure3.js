if(BBAdata.GET.MAPSMODE)
BBAdata.MAPS.Secure3 = {
    BoardMods:['sitOnMap','allAvoid','colorGold'],
    WinningConds:[
        {T:'Main',C:{'E:enemies':{max:0,D:'killLeft'}}, RewardGold:150,RewardFlags:{Conquer:1}, EndPortal:{X:200,Y:0}},
        {T:'Main',C:{'D:orhenes':{min:6,D:'killMin'},'D:koriaz':{max:0,D:'DsaveMax'}}, RewardGold:100},
        {T:'Main',C:{'D:carras':{min:100,D:'killMin'}}, RewardGold:100,RewardFlags:{Conquer:1}},
        {T:'Add',C:{seconds:{max:140,D:'timeTo'},gameEnded:{min:1,D:'hidden'}}, hideOnFial:true},
        {T:'Add',C:{seconds:{max:60,D:'timeTo'},'E:koriaz':{max:0,D:'killMax'}}, hideOnFial:true},
        {T:'Add',C:{seconds:{max:60,D:'timeTo'},'E:fariax':{max:0,D:'killMax'}}, hideOnFial:true},
        {T:'Add',C:{S_lifeHealed:{max:0},gameEnded:{min:1,D:'hidden'}}, RewardGold:100},
        {T:'Add',C:{'D:carras':{max:0}}, RewardGold:100},
        {T:'Add',C:{'D:carras':{min:20}}, hideOnPending: true},
        {T:'Add',C:{'D:carras':{min:100,D:'killMin'},S_lifeLost:{max:0},S_shieldLost:{max:0}}, RewardGold:100},
    ],
    EndPortal:{X:1200,Y:0},
    Ship:{Start:{X: 0, Y: 0, A:0}},
    Place:[
        {RingOf:{X: 0, Y:0, Radius: 800, RadiusPlus: 0}, What:{Star:60}},
        {RingOf:{X: 0, Y:0, Radius: 800, RadiusPlus: 1400}, What:{StarL:30,StarM:30,Star:30,StarS:30}},
        {RingOf:{X: 0, Y:0, Radius: 1200, RadiusPlus: 600}, What:{StarL:30,StarM:30,Star:30,StarS:30}},
        {RingOf:{X: 0, Y:0, Radius: 1400, RadiusPlus: 200}, What:{StarL:30,StarM:30,Star:30,StarS:30}},
        {RingOf:{X: 0, Y:0, Radius: 2200}, What:{Star:180}},
        {Random:{X: 0, Y: 0, Radius: 2200}, What: {Q:4}, PlaceMods:['orhenesSecure1']},
        {Random:{X: 0, Y: 0, Radius: 2200}, What: {Q:4}, PlaceMods:['orhenesSecure2']},
        {CircleOf:{X:0, Y:-3000, Radius: 120, Angle: 0, AnglePlus: 22.5}, What:{Star:16}},
        {What:{RoundField:1},Mod:{x:0,y: -3000, radius: 50, fieldAnim: 'HealingField', PeriodTime: 50, PeriodOffset: 5, PeriodHeal: 1, dontHit:['B','E','BE']}},
    ],
};
