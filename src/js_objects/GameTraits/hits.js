
GAMEobject.prototype.checkHits = function(o){
    var F,O = this.O[o];
    if(typeof O.squareCorners !='undefined'){
        var Found = this.getCollidingWithSquare(O,O.mapCollide);
    }else if(typeof O.coneAngle !='undefined'){
        var Found = this.getCollidingWithCone(O,O.mapCollide);
    }else
        var Found = this.getCollidingWithCircle(O.x,O.y,O.radius,O.mapCollide);
    for(F in Found)
        this.hit(o,F);
}

GAMEobject.prototype.checkShipHits = function(){
    var F,O = this.O[0];
    var Found = this.getCollidingWithCircle(O.x,O.y,O.radius,['A','ME','R']);
    for(F in Found){
        this.hit(0,F);
        this.hit(F,0);
    }
}

GAMEobject.prototype.hit = function(o,q){
    if(o==q) return 1;
    var O = this.O[o];
    var Q = this.O[q];
    if(typeof Q == 'undefined') return 1;
    if(typeof O == 'undefined') return 1;

    if(O.T=='star'){   var U=Q; Q=O; O=U; }
    if(O.T=='Gstar'){  var U=Q; Q=O; O=U; }
    if(Q.T=='bullet'){ var U=Q; Q=O; O=U; }

    if(O.dontHit){ for(var i=0; i<O.dontHit.length; ++i) if(O.dontHit[i]==Q.mapType) return 1; }
    if(Q.dontHit){ for(var i=0; i<Q.dontHit.length; ++i) if(Q.dontHit[i]==O.mapType) return 1; }

    if(typeof O.SlowDownTo !='undefined'){ this.regionSpeedChange(O,Q); return 1; }
    if(typeof Q.SlowDownTo !='undefined'){ this.regionSpeedChange(Q,O); return 1; }

    if(O.bounceType){    this.regionAngleChange(O,Q); return 1; }
    if(Q.bounceType){    this.regionAngleChange(Q,O); return 1; }

    if(O.stateIn){       this.regionStateIn(o,q); return 1; }
    if(Q.stateIn){       this.regionStateIn(q,o); return 1; }

    if(O.vectorType){    this.regionVectorChange(O,Q); return 1; }
    if(Q.vectorType){    this.regionVectorChange(Q,O); return 1; }

    if(O.teleportOnHit){ this.region_teleportOnHit(O,q); return 1; }
    if(Q.teleportOnHit){ this.region_teleportOnHit(Q,o); return 1; }

    if(O.T=='healing_missle' && O.FollowWho == q){
        if(!this.healObj(q,1,o))
            this.removeObj(o);
        return 1;
    }

    if(O.T=='energy_field_missle' && O.FollowWho == q){
        if(!this.giveEnergyField(q,1,o,O.MaxEnergyField))
            this.removeObj(o);
        return 1;
    }

    if(Q.SlowDown && O.T=='ship'){
        if(O.speed > Q.SlowDown) O.speed = Q.SlowDown;
        if(this.specialMove != -1 && this.SHIP.SpecialMoves)
            if(this.SHIP.SpecialMoves[ this.specialMove ].T=='changePosition'){
                this.specialMoveT = -1;
                this.specialMove = -1;
            }
    }

    if(O.onHit && O.onHit.Do=='explode' && Q.S!=O.S && Q.M!='region'){    this.explodeBomb(o,O.onHit);    return true; }

    if(O.PeriodTime)    this.makePeriodEffect(o,q);
    if(Q.PeriodTime)    this.makePeriodEffect(q,o);

    if(O.OneTimeEffect)    this.makeOneTimeEffect(o,q);
    if(Q.OneTimeEffect)    this.makeOneTimeEffect(q,o);

    if(O.T=='missle' || O.T=='bullet'){
        if(O.S==Q.S) return 1;

        if(Q.T=='ship'){
            this.makeDMG(q,O.DMG,o);
            this.shipFunc_showHealth();
        }
        if(Q.TT=='enemy' || Q.mapType=='A' || Q.T=='missle' || Q.T=='bullet_bomb' || Q.T=='shieldBlob')
            this.makeDMG(q,O.DMG,o);
        if(Q.T=='space_mine'){
            this.explodeBomb(q,Q.onDie);
            this.removeObj(o);
        }
        if(Q.T=='healing_missle' || Q.T=='energy_field_missle')
            this.removeObj(q);
    }
}
GAMEobject.prototype.makePeriodEffect = function(o,q){
    var O = this.O[o];
    var Q = this.O[q];

    if(O.PeriodDelay)
        if(O.PeriodDelay- -O.bornTime > this.tick) return 1;


    if(Q.T=='bullet_bomb' && (typeof O.dontHurtOwnMissle != 'undefined' && O.dontHurtOwnMissle==true) && O.S==Q.S) return 1;

    var makeAction = false;
    for(var P in Q.periodDMG)
        if(Q.periodDMG[P] < this.tick-1)
            delete Q.periodDMG[P];

    if(typeof Q.periodDMG[o] == 'undefined'){
        if(O.PeriodOffset)
            Q.periodDMG[o] = this.tick- -O.PeriodOffset;
        else
            makeAction = true;

    } else {
        if(Q.periodDMG[o] < this.tick)
            makeAction = true;
    }

    if(makeAction){
        if(O.PeriodDMG){
            if(this.makeDMG(q,O.PeriodDMG))
                Q.periodDMG[o] = this.tick- -O.PeriodTime;
        }
        if(O.PeriodHeal){
            this.healObj(q,O.PeriodHeal);
            Q.periodDMG[o] = this.tick- -O.PeriodTime;
        }
    }

}
GAMEobject.prototype.makeOneTimeEffect = function(o,q){
    var O = this.O[o];
    var Q = this.O[q];

    var makeAction = false;
    if(typeof Q.periodDMG[o] == 'undefined'){
        if(O.OneTimeOffset){
            Q.periodDMG[o] = this.tick- -O.OneTimeOffset;
        } else {
            makeAction = true;
        }
    } else {
        if(Q.periodDMG[o] == this.tick){
            makeAction = true;
            delete Q.periodDMG[o];
        }
        if(Q.periodDMG[o] < this.tick){
            Q.periodDMG[o] = this.tick- -O.OneTimeOffset;
        }
    }

    if(makeAction){
        if(O.OneTimeDMG){
            this.makeDMG(q,O.OneTimeDMG);
            delete(O.OneTimeDMG);
        }
        delete(O.OneTimeEffect);
        if(O.fieldAnim=='ElectricityField'){
            CanvasManager.change_regionAnim(O,o, 'EleFieldEnd', 'end', 24);
            if(O.squadDirectPlace)
                this.unbindWithSquad(O.squadDirectPlace.o, O.squadDirectPlace.i, o);
            if(O.squadMaster)
                this.unbindWithSquad(O.squadMaster.o, O.squadMaster.i, o);
        }
    }
}
GAMEobject.prototype.makeDMG = function(o,DMG,q){
    if(typeof this.O[o] == 'undefined') return 1;
    var O = this.O[o];

    var AnimHits, DMGval = DMG.Dmg;

    if(O.undestructible){
        if(q) this.removeObj(q);
        return true;
    }

    if(O.Shields){
        ShieldObj = this.testShields(O,o,DMG);
        AnimHits = DMGval = ShieldObj.DMGval;

        if(DMGval < 1 && ShieldObj.Action == 'die' && q){
            --AnimHits;
            this.removeObj(q);
        }
        if(DMGval < 1 && ShieldObj.Action == 'remove' && q)
            this.removeObj(q);

        if(ShieldObj.Action == 'bounce' && q){
            Q = this.O[q];
            var kat = (-Math.atan2(O.x-Q.x,O.y-Q.y)*(180/Math.PI)- -360)%360;
            var kat2 = (Q.angle - kat - -720)%360;
            if(kat2 > 90 && kat2 < 270)
                Q.angle = (kat- -180 - kat2)%360;
        }
    }

    if(DMGval < 1) return true;

    if(O.life < 1){
        console.log(O.T+' ['+o+'] is dead but got hit!');
        return true;
    }

    // ON HIT SHIELD
    if(O.onHitKoriazShield && O.onHitKoriazShield > 0){
        if(this.addShield(O,o,{
            name:'koriazMax',
            CatchDmgT:{normal:1,energy:1,acid:1,explo:1},
            DmgReduction: 'infinite',
            ReductionUses: 'infinite',
            ExpireTime: 45,
            HitActionObj: 'remove',
        })){
            --O.onHitKoriazShield;
            this.removeObj(q);
            return true;
        }
    }

    // ON HIT JUMP
    if(O.onHitJump && O.onHitJump > 0){
        if(this.teleportJump(o,170,Math.random()*360)){
            --O.onHitJump;
            this.checkHits(o);
            this.removeObj(q);
        }
        return true;
    }



    // HIT animation
    if(q){
        var Q = this.O[q];
        --AnimHits;
        this.putObj_animation('hit', Q.x, Q.y);
        this.removeObj(q);
    }
    this.showHits(O.x,O.y, Math.min(AnimHits,O.life),'hit');

    O.life-=DMGval;
    if(O.life < 0) O.life = 0;

    if(O.T=='ship') this.C['S_lifeLost']++;

    if(O.T=='ship') this.shipFunc_showHealth();
    CanvasManager.requestCanvas(o);
    if(O.view && O.view.onBackground)
        CanvasManager.CBM.changeObjectPosition(o);
    if(O.Flags) O.Flags.gotHitFlag = true;

    if(O.life <= 0) this.dieObj(O,o);
    return true;
}
GAMEobject.prototype.showHits = function(x,y,number,type){
    var U = 20;
    for(var Daga = 0; Daga < number; ++Daga){
        var DagaDagaX = parseInt(Math.random()*U*2-U);
        var DagaDagaY = parseInt(Math.random()*U*2-U);
        this.putObj_animation(type, (x-DagaDagaX), (y-DagaDagaY));
    }
}

GAMEobject.prototype.dieObj = function(O,o){
    if(O.TT=='enemy'){
        this.C['D:enemies']++;
        var umo = 'D:'+O.T;
        if(typeof this.C[umo] == 'undefined')
            this.C[umo]=0;
        ++this.C[umo];
    }
    if(O.T!='missle' && O.T!='bullet_bomb' && O.T!='space_mine' && !O.onDieHideExplosion)
        this.putObj_animation('hitBig', O.x, O.y);

    if(O.squadDirectPlace)
        this.unbindWithSquad(O.squadDirectPlace.o, O.squadDirectPlace.i, o);
    if(O.squadMaster)
        this.unbindWithSquad(O.squadMaster.o, O.squadMaster.i, o);

    if(O.squadScheme)
        this.disbandSquad(O);

    if(O.onDieRemove){
        for(var i in O.onDieRemove){
            if(typeof this.O[ O.onDieRemove[i] ] != 'undefined')
                this.removeObj(O.onDieRemove[i]);
        }
    }

    if(O.T=='space_mine') {
        O.toDo=[{T:'explode'}];
        O.Flags.gotHitFlag = false;
        O.doingTime = 3;
    }
    else if(O.onDie){
        this.explodeBomb(o,O.onDie);
    }
    else
        this.removeObj(o,true);


    return true;
}
GAMEobject.prototype.healObj = function(q,DMG,o){
    var Q = this.O[q];
    if(Q.life == Q.lifeM) return false;
    if(o){
        this.putObj_animation('hit_healing', this.O[o].x, this.O[o].y);
        this.removeObj(o);
    } else{
        this.putObj_animation('hit_healing', Q.x, Q.y);
    }
    Q.life-=-DMG;
    if(Q.life > Q.lifeM) Q.life = Q.lifeM;
    if(q == 0)
        this.shipFunc_showHealth();
    CanvasManager.requestCanvas( q );
    if(Q.view && Q.view.onBackground)
        CanvasManager.CBM.changeObjectPosition(q);

}
GAMEobject.prototype.hitEnergyField = function(o,q,DMG){
    var O = this.O[o];
    if(q > 0)
        this.putObj_animation('hit_energyField', this.O[q].x, this.O[q].y);
    else {
        for(var Daga=0; Daga < DMG; ++Daga){
            var U = 20;
            var DagaDagaX = parseInt(Math.random()*U*2-U);
            var DagaDagaY = parseInt(Math.random()*U*2-U);
            this.putObj_animation('hit_energyField', (O.x-DagaDagaX), (O.y-DagaDagaY));
        }
    }
    O.energyField-=DMG;
    if(O.energyField < 0) O.energyField = 0;
    if(O.T=='ship') this.shipFunc_showHealth();

}
GAMEobject.prototype.giveEnergyField = function(q,DMG,o,max){
    var Q = this.O[q];
    if(typeof Q.energyField == 'undefined')
        Q.energyField = 0;
    if(Q.energyField >= max) return false;
    this.addShield(Q,q,{
        name: 'absorbtionShield',
        CatchDmgT: {normal:1, energy:1, explo:1},
        DmgReduction: 'energyField',
        ReductionUses: 'infinite',
    });
    if(o){
        this.putObj_animation('hit_healing', this.O[o].x, this.O[o].y);
        this.removeObj(o);
    }else{
        this.putObj_animation('hit_healing', Q.x, Q.y);
    }
    Q.energyField-=-DMG;
}
