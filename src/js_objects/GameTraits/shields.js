GAMEobject.prototype.addShield = function(){


}
GAMEobject.prototype.checkShields = function(O,o){
    var sh,SH;
    for(sh in O.Shields){
        SH = O.Shields[sh];
        if(SH.ExpireTime != 'infinite' && SH.ExpireTime < this.tick){
            this.removeShield(O,o,sh);
        }
    }
}
GAMEobject.prototype.removeShield = function(O,o,sh){


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

            }

            // {
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
