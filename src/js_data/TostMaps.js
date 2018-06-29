if(BBAdata.GET.MAPSMODE == 2){
BBAdata.MAPS.TheNewBegining={
    TeamMods:{
        'team1':['orangeColor'],
        'team2':['violetColor'],
    },
    Place:[
        {What:{Gstar:3},Egzact:[{x:-150,y:-120},{x:150,y:-120},{x:0,y:150}],Mod:{bounceType:'diagonal',bounceTeleport:true}},
        {Random:{X:500, Y:0, Radius: 100}, Team:'team2', What:[
            {t:'carras', q:1},
        ]},
        {Random:{X:500, Y:0, Radius: 100}, Team:'team1', What:[
            {t:'carras', q:3},
        ]},
        {Point:{X: -400, Y:0}, What:[{t:'routePoint', Mod:{radius: 120, rName:'routePoint1'}}]},
        {Point:{X: 400, Y:50}, What:[{t:'routePoint', Mod:{rName:'routePoint2'}}]},
        {Point:{X: 200, Y:400}, What:[{t:'routePoint', Mod:{rName:'routePoint3'}}]},
        {Point:{X:-330, Y:-940}, What:[{t:'routePoint', Mod:{rName:'C1'}}]},
        {Point:{X:  0, Y:-1100}, What:[{t:'routePoint', Mod:{rName:'C2'}}]},
        {Point:{X: 330, Y:-940}, What:[{t:'routePoint', Mod:{rName:'C3'}}]},
        {Point:{X:-400, Y:-750}, What:[{t:'routePoint', Mod:{rName:'A1'}}]},
        {Point:{X:   0, Y:-750}, What:[{t:'routePoint', Mod:{rName:'A2'}}]},
        {Point:{X: 400, Y:-750}, What:[{t:'routePoint', Mod:{rName:'A3'}}]},
        {Point:{X:-330, Y:-560}, What:[{t:'routePoint', Mod:{rName:'B1'}}]},
        {Point:{X:   0, Y:-400}, What:[{t:'routePoint', Mod:{rName:'B2'}}]},
        {Point:{X: 330, Y:-560}, What:[{t:'routePoint', Mod:{rName:'B3'}}]},
    ],
    Routes:{
        R1:{T:'rand',P:['C1','C3','B2']},
        R2:{T:'inOrder',P:[
                'A1','A2','A3',
                {T:'oneOf',P:[
                    {T:'inOrder',P:['B3','B2','B1']},
                    {T:'inOrder',P:['C3','C2','C1']}
                ]}
            ]}
    },
};
}
