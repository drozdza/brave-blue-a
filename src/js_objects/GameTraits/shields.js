GAMEobject.prototype.addShield = function(O,o,Shield){
    if(O.ShieldsRejection)
        if(O.ShieldsRejection[Shield.name])
            return false;

    if(typeof O.Shields == 'undefined') O.Shields = [];

    var isThere = false;
    for(var s in O.Shields)
        if(O.Shields[s].name == Shield.name){
            isThere = s;
            break;
        }

    if(isThere === false){
        var SHI=[];
        var V = this.ShieldValues;
        if(O.Shields.length == 0){
            SHI[ isThere=0 ] = Shield;
        }else{
            var sOld = 9999;
            var sNew = 9999;
            for(var s in O.Shields){
                sOld = sNew;
                sNew = V[O.Shields[s].name];
                if(sOld > V[ Shield.name ] && sNew < V[ Shield.name ])
                    SHI[ isThere=SHI.length ]= Shield;
                SHI[ SHI.length ]=O.Shields[s];
            }
            if(sNew > V[ Shield.name ])
                SHI[ isThere=SHI.length ]= Shield;
        }
        O.Shields = SHI;
    }

    var SH = O.Shields[isThere];
    if(Shield.ExpireTime && Shield.ExpireTime != 'infinite')
        O.Shields[isThere].ExpireTime = Shield.ExpireTime- -this.tick;

    if(Shield.DmgTransfer)
        O.Shields[isThere].DmgTransfer = Shield.DmgTransfer;

    return true;
}
GAMEobject.prototype.ShieldValues={
    koriazMax: 15,
    bulletShield: 11,
    explosionShield: 10,
    absorbtionShield: 9,
    dmgTransfer: 3,
};
GAMEobject.prototype.checkShields = function(O,o){
    var sh,SH;
    for(sh in O.Shields){
        SH = O.Shields[sh];
        if(SH.ExpireTime != 'infinite' && SH.ExpireTime < this.tick){
            this.removeShield(O,o,sh);
            this.checkShields(O,o);
            break;
        }
    }
}
GAMEobject.prototype.removeShield = function(O,o,sh){
    var si,se=0,S2=[];
    if(O.Shields[sh].Own) return false;
    for(si in O.Shields){
        if(si!=sh){
            S2[se++]=O.Shields[si];
        } else {
            delete(O.Shields[si]);
        }
    }
    O.Shields = S2;

    if(O.Shields.length == 0)
        delete(O.Shields);

}

GAMEobject.prototype.testShields = function(O,o,DMG){
    var DMGtype = DMG.T;
    var DMGval = DMG.Dmg;
    var ShieldHits = 0;
    var Action = 'die';

    var sh,SH,DMGmin,DMGMaxReduce,DMGreduce,DMGReduceMax,DMGpercent,P;

    var ToDelete=[];

    for(var sh in O.Shields){
        var SH = O.Shields[sh];

        if(SH.CatchDmgT[DMGtype]){

            if(SH.ShieldProbability)
                if(Math.random()*100 > SH.ShieldProbability)
                    continue;

            if(SH.ReductionUses != 'infinite' && O[SH.ReductionUses] < 1)
                continue;

            if(o==0) var DmgReductionCount = O.ShieldStorage[SH.DmgReduction].R;
                else var DmgReductionCount = O[SH.DmgReduction];

            if(SH.DmgReduction && (SH.DmgReduction=='infinite' || DmgReductionCount > 0)){
                DMGreduce = 99999;
                if(SH.PartialReduction){
                    P = SH.PartialReduction;
                    if(DMGval > P.MinLeft){
                        DMGReduceMax = DMGval - P.MinLeft;
                        DMGMaxReduce = P.Reduce;
                        if(P.Reduce == 'infinite') DMGreduce = DMGReduceMax;
                                else               DMGreduce = Math.min(DMGReduceMax, P.Reduce);
                        if(P.MaxPercent)
                            DMGreduce = Math.min(DMGreduce, P.Reduce, parseInt(DMGval*P.MaxPercent/100));
                    }
                }

                if(SH.DmgReduction == 'infinite'){
                    DMGreduce = Math.min(DMGreduce, DMGval);

                    ShieldHits-=-DMGreduce;
                    DMGval -= DMGreduce;
                }else{
                    DMGreduce = Math.min(DMGval, DmgReductionCount, DMGreduce);

                    ShieldHits-=-DMGreduce;
                    DMGval -= DMGreduce;
                    if(o==0) O.ShieldStorage[SH.DmgReduction].R -= DMGreduce;
                        else O[SH.DmgReduction] -= DMGreduce;
                }
            }

            if(DMGreduce > 0 && SH.ReductionUses!='infinite')
                --O[SH.ReductionUses];

            if(SH.DmgTransfer){
                var DTF = SH.DmgTransfer;
                if(this.O[DTF].life > 0){
                    this.makeDMG(SH.DmgTransfer,{Dmg:DMGreduce,T:'transform'},false);
                    var L = this.putObj_directAnim('dmgTransfer', {timeDeath: 10});
                    this.O[L].pathD = ['M', parseInt(o), 'L', parseInt(SH.DmgTransfer)];
                }else{
                    DMGval-=-DMGreduce;
                }
            }

            // {
            //     name: 'koriazMax' / ,
            //     CatchDmgT: {normal:1, energy:1, acid:1, explo:1},
            //     ShieldProbability: 70,
            //     PartialReduction: {MinLeft: 1, Reduce: 4, MaxPercent: 30},
            //     DmgReduction: 'infinite' / O[resource_name],
            //     ReductionUses: 'infinite' / O[resource_name],
            //     DmgTransfer: 'O[id]',
            //     ExpireTime: 'infinite' / , expireTick,
            //     Own: true,
            //     HitActionObj: 'bounce',
            //     HitDieAnimation: 'hit_energyField',
            // }

            if(SH.HitActionObj)
                Action = SH.HitActionObj;

            if((O[SH.DmgReduction]==0 || O[SH.ReductionUses]==0) && !SH.Own)
                ToDelete[ ToDelete.length ] = sh;

            if(DMGreduce > 0 && Action =='die'){
                if(SH.HitDieAnimation){
                    if(SH.HitDieAnimation!='dontShow')
                        this.showHits(O.x, O.y, DMGreduce, SH.HitDieAnimation);
                }else
                    this.showHits(O.x, O.y, DMGreduce, 'hit_energyField');
            }
        }
        // All damage reduced
        if(DMGval < 1) break;
    }

    for(var i in ToDelete)
        this.removeShield(O,o,ToDelete[i]);

    return {DMGval:DMGval,Action:Action};
}


GAMEobject.prototype.viewShields={
    koriazMax:{
        strokeStyle:'rgba(100,180,255,0.8)',
        fillStyle:'rgba(100,180,255,0.2)',
    },
    dmgTransfer:{ viewOff: true },
    absorbtionShield:{
        strokeStyle: 'rgba(0,255,0,0.8)',
        fillStyle: 'rgba(0,255,0,0.2)',
    },
    bulletShield:{
        strokeStyle: 'rgba(255,255,0,0.8)',
        fillStyle: 'rgba(255,255,0,0.2)',
    },
    explosionShield:{
        circlePerPoint:true,
        strokeStyle: 'rgba(255,0,0,0.8)',
        fillStyle: 'rgba(255,0,0,0.1)',
    },
};
GAMEobject.prototype.drawShields = function(O,o,CH){
    if(O.life < 1) return false;
    var lineWidth,ToDraw = [];
    for(var s in O.Shields){
        var SH = O.Shields[s];
        if(SH.name == 'koriazMax'){
            ToDraw = [{n:'koriazMax',w:2}];
            break;
        }
        if(SH.name == 'dmgTransfer'
          || SH.name == 'absorbtionShield'
          || SH.name =='bulletShield'){
            if(this.viewShields[ SH.name ].viewOff) continue;

            if(SH.DmgReduction == 'infinite'){
                lineWidth = 2;
            } else {
                lineWidth = O[SH.DmgReduction];
                if(lineWidth == 0) continue;
            }
            if(lineWidth > 2) lineWidth = 2- -(lineWidth-2)/2;
            ToDraw[ ToDraw.length ] = {n:SH.name,w:lineWidth};
        }
        if(SH.name == 'explosionShield'){
            var lineWidth = O[SH.ReductionUses];
            if(lineWidth == 0) continue;
            lineWidth *= 3;
            ToDraw[ ToDraw.length ] = {n:SH.name,w:lineWidth};
        }
    }

    var RadiusSum = 0;
    for(var s in ToDraw)
        RadiusSum -=- ToDraw[s].w;

    var Radius = O.radius;
    if(O.view.shieldsRadius)
        Radius = O.view.shieldsRadius;

    for(var s in ToDraw){
        var view = this.viewShields[ ToDraw[s].n ];
        if(O.view && O.view.Shields && O.view.Shields[ ToDraw[s].n ])
            view = O.view.Shields[ ToDraw[s].n ];

        CH.beginPath();
        CH.strokeStyle = view.strokeStyle;
        CH.fillStyle   = view.fillStyle;
        if(view.circlePerPoint){
            for(var i=0; i<ToDraw[s].w/3; ++i){
                CH.arc(0,0,(Radius- -i*3),0,Math.PI*2,true);
                CH.lineWidth = 1.5;
            }
        }else{
            CH.arc(0,0,Radius- -parseInt(ToDraw[s].w/2),0,Math.PI*2,true);
            CH.lineWidth = ToDraw[s].w;
        }
        CH.stroke();
        CH.fill();

        Radius -=- ToDraw[s].w;
    }
}
