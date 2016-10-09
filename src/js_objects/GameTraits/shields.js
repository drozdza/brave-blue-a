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
    if(Shield.ExpireTime != 'infinite')
        O.Shields[isThere].ExpireTime = Shield.ExpireTime- -this.tick;

    if(Shield.ReductionUses != 'infinite')
        O.Shields[isThere].ReductionUses -=- Shield.ReductionUses;

    if(Shield.DmgReduction != 'infinite')
        O.Shields[isThere].DmgReduction -=- Shield.DmgReduction;

    if(Shield.DmgTransfer)
        O.Shields[isThere].DmgTransfer = Shield.DmgTransfer;

    return true;
}
GAMEobject.prototype.ShieldValues={
    koriazMax: 15,
    dmgTransfer: 10,
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

    var sh,SH,DMGmin,DMGMaxReduce,DMGreduce,DMGReduceMax,DMGpercent,P;

    for(var sh in O.Shields){
        var SH = O.Shields[sh];
        if(SH.CatchDmgT[DMGtype]){
            if(SH.DmgReduction){
                DMGreduce = 99999;
                // Partial Reduction
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
                    DMGreduce = Math.min(DMGval, SH.DmgReduction, DMGreduce);

                    ShieldHits-=-DMGreduce;
                    DMGval -= DMGreduce;
                    O.Shields[sh].DmgReduction -= DMGreduce;
                }
            }

            if(SH.ReductionUses != 'infinite'){
                --O.Shields[sh].ReductionUses;
            }

            if(SH.DmgTransfer){
                var DTF = SH.DmgTransfer;
                if(this.O[DTF].life > 0){
                    this.makeDMG(SH.DmgTransfer,{Dmg:DMGreduce,T:'transform'},false);
                    var L = this.putObj_directAnim('dmgTransfer', {timeDeath: 10});
                    this.O[L].pathD = ['M', parseInt(o), 'L', parseInt(SH.DmgTransfer)];
                }
            }

            // {
            //     name: 'koriazMax' / ,
            //     CatchDmgT: {bullet:1, energy:1, acid:1},
            //     PartialReduction: {MinLeft: 1, Reduce: 4, MaxPercent: 30},
            //     DmgReduction: 'infinite' / 12,
            //     ReductionUses: 'infinite' / 1,
            //     DmgTransfer: 'O[id]',
            //     ExpireTime: 'infinite' / , expireTick,
            // }


            if(SH.DmgReduction==0 || SH.ReductionUses==0){
                this.removeShield(O,o,sh);
            }
        }
        // All damage reduced
        if(DMGval < 1) break;
    }
    return DMGval;
}


GAMEobject.prototype.viewShields={
    koriazMax:{
        strokeStyle:'rgba(100,180,255,0.8)',
        fillStyle:'rgba(100,180,255,0.2)',
    },
    dmgTransfer:{ viewOff: true },
    absorbingShield:{
        strokeStyle: 'rgba(0,255,0,0.8)',
        fillStyle: 'rgba(0,255,0,0.2)',
    },
};
GAMEobject.prototype.drawShields = function(O,o,CH){
    var ToDraw = [];
    for(var s in O.Shields){
        var SH = O.Shields[s];
        if(SH.name == 'koriazMax'){
            ToDraw = [{n:'koriazMax',w:2}];
            break;
        }
        if(SH.name == 'dmgTransfer' || SH.name == 'absorbingShield'){
            if(this.viewShields[ SH.name ].viewOff) continue;
            var lineWidth = SH.DmgReduction;
            if(lineWidth == 'infinite') lineWidth = 2;
            if(lineWidth > 2) lineWidth = 2- -(lineWidth-2)/2;
            ToDraw[ ToDraw ] = {n:SH.name,w:lineWidth};
        }
    }

    for(var s in ToDraw){
        var view = this.viewShields[ ToDraw[s].n ];
        if(O.view && O.view.Shields && O.view.Shields[ ToDraw[s].n ])
            view = O.view.Shields[ ToDraw[s].n ];

        CH.beginPath();
        var Radius = O.radius;

        CH.strokeStyle = view.strokeStyle;
        CH.fillStyle   = view.fillStyle;

        CH.arc(0,0,Radius- -parseInt(ToDraw[s].w/2),0,Math.PI*2,true);
        CH.lineWidth = ToDraw[s].w;
        CH.stroke();
        CH.fill();
    }
}
