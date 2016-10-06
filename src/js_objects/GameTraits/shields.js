GAMEobject.prototype.addShield = function(){}
GAMEobject.prototype.checkShields = function(){}
GAMEobject.prototype.removeShields = function(){}

GAMEobject.prototype.testShields = function(O,o,DMG){

    var DMGtype = DMG.T;
    var DMGval = DMG.Dmg;
    var ShieldHits = 0;


    for(var sh in O.Shields){
        var SH = O.Shields[sh];
        if(SH.CatchDmgT[DMGtype]){

            if(SH.DmgReduction){
                if(SH.DmgReduction == 'infinite'){
                    ShieldHits = DMGval;
                    DMGval = 0;
                }else{
                    var DMGmin = Math.min(DMGval,SH.DmgReduction);
                    DMGval -= DMGmin;
                    O.Shields[sh].DmgReduction -= DMGmin;
                    ShieldHits = DMGmin;
                }
            }

            if(SH.PartialReduction){
                var P = SH.PartialReduction;
                if(DMGval > P.MinLeft){

                }
            }

            if(SH.ReductionUses != 'infinite'){
                --O.Shields[sh].ReductionUses;
            }
            // DmgTransfer: true,
            // ExpireTime: -1 / 2939,
            // HitActionObj: 'die' / 'redirect' / 'ignore',
            // PartialReduction:{Reduce:5, MaxPercent:70 MinLeft:3}


            if(SH.DmgReduction==0 || SH.ReductionUses==0){}
        }
        if(DMGval < 1) break;
    }


    return DMGval;
}
