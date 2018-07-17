if(BBAdata.GET.MAPSMODE == 2){
BBAdata.MAPS.TheNewBeginning={
    Ship:{Start:{X: 0, Y: 0, A:90}},
    TeamMods:{
        'team1':['orangeXColor'],
        'team2':['violetColor'],
        'team3':['greenColor'],
    },
    Place:[
        {What:{Gstar:3},Egzact:[{x:-150,y:-120},{x:150,y:-120},{x:0,y:150}],Mod:{bounceType:'diagonal',bounceTeleport:true}},
        // {Random:{X:700, Y:0, Radius: 100}, Team:'team2', What:[{t:'carras', q:1}]},
        // {Random:{X:700, Y:0, Radius: 100}, Team:'team1', What:[{t:'carras', q:13}]},
        {Random:{X:700, Y:0, Radius: 100}, Team:'team3', What:[{t:'carras', q:6}]},
        // {Random:{X:700, Y:0, Radius: 100}, Team:'team2', What:[{t:'carras', q:20}]},
        {Random:{X:700, Y:0, Radius: 100}, Team:'team3', What:[{t:'fariax', q:1}]},

        {Point:{X: -400, Y:900}, What:[{t:'routePoint', N:'routePoint1', Mod:{radius: 120}}]},
        {Point:{X: 400, Y:50}, What:[{t:'routePoint', N:'routePoint2'}]},
        {Point:{X: 200, Y:400}, What:[{t:'routePoint', N:'routePoint3'}]},
        {Point:{X:-330, Y:-940}, What:[{t:'routePoint', N:'C1'}]},
        {Point:{X:  0, Y:-1100}, What:[{t:'routePoint', N:'C2'}]},
        {Point:{X: 330, Y:-940}, What:[{t:'routePoint', N:'C3'}]},
        {Point:{X:-400, Y:-750}, What:[{t:'routePoint', N:'A1'}]},
        {Point:{X:   0, Y:-750}, What:[{t:'routePoint', N:'A2'}]},
        {Point:{X: 400, Y:-750}, What:[{t:'routePoint', N:'A3'}]},
        {Point:{X:-330, Y:-560}, What:[{t:'routePoint', N:'B1'}]},
        {Point:{X:   0, Y:-400}, What:[{t:'routePoint', N:'B2'}]},
        {Point:{X: 330, Y:-560}, What:[{t:'routePoint', N:'B3'}]},
    ],
    Routes:{
        R1:{T:'rand',repeat:1000, P:['C1','C3','B2']},
        R2:{T:'order',P:[
            'A1','A2','A3',
            {T:'rand',repeat:1, P:[
                {T:'order',repeat:3, P:['B3','B2','B1']},
                {T:'order',repeat:3, P:['C3','C2','C1']},
            ]}
        ]},
        R3:{T:'order',P:[
            'A2',
            {T:'randOrder',repeat:3, P:['A1','B1','C1']},
            'A2',
            {T:'randOnce',repeat:3, P:['A3','B3','C3']},
        ]},
        R4:{T:'rand',repeat:1000, P:['A2','A3','C3']},
    },
};
}
