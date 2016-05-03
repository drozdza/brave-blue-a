
GAMEobject.prototype.putObj_shipVariables = function(O){

    for(var i in {speedArr:1,spotArr:1})
        for(var j=0; j<4; ++j)
            for(var k in O[i][j])
                if(typeof O[i][j][k] == 'object' && typeof O[i][j][k].shipVar != 'undefined')
                    O[i][j][k] = this.getShipVariable(O, O[i][j][k]);

    delete O.shipVariables;
    this.changeSpeedLvl(O,O.speedLvl);
    return O;
}

GAMEobject.prototype.getShipVariable = function(O,VarRequest){
    var variable;

    var VarDef = O.shipVariables[ VarRequest.shipVar ];
    if(VarDef.Rand){
        VarDef.Const -=- Math.random()*VarDef.Rand;
        delete VarDef.Rand;
    }
    if(VarDef.RandInt){
        VarDef.Const -=- parseInt(Math.random()*VarDef.RandInt);
        delete VarDef.RandInt;
    }

    var V = O.shipVariables[ VarRequest.shipVar ].Const;
    if(VarRequest.Add) V -=- VarRequest.Add;
    return V;
}
