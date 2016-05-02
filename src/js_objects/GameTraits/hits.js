
GAMEobject.prototype.checkHits = function(o){
    var F,O = this.O[o];
    if(typeof O.squareCorners !='undefined'){
        var Found = this.getCollidingWithSquare(O,O.mapCollide);
    }else if(typeof O.coneAngle !='undefined'){
        var Found = this.getCollidingWithCone(O,O.mapCollide);
    }else
        var Found = this.getCollidingWithCircle(O.x,O.y,O.radius,O.mapCollide);
    for(F in Found)
        this.hit(o,F,O.Power);
}

GAMEobject.prototype.hit = function(o,q,DMG){
    if(o==q) return 1;
    var O = this.O[o];
    var Q = this.O[q];
    if(typeof O=='undefined') return 1;

    if(O.T=='star'){            var U=Q; Q=O; O=U; }
    if(O.T=='Gstar'){            var U=Q; Q=O; O=U; }
    if(Q.T=='bullet'){            var U=Q; Q=O; O=U; }

    if(O.dontHit){ for(var i=0; i<O.dontHit.length; ++i) if(O.dontHit[i]==Q.mapType) return 1; }
    if(Q.dontHit){ for(var i=0; i<Q.dontHit.length; ++i) if(Q.dontHit[i]==O.mapType) return 1; }

    if(typeof O.SlowDownTo !='undefined'){ this.regionSpeedChange(O,Q); return 1; }
    if(typeof Q.SlowDownTo !='undefined'){ this.regionSpeedChange(Q,O); return 1; }

    if(O.bounceType){    this.regionAngleChange(O,Q); return 1; }
    if(Q.bounceType){    this.regionAngleChange(Q,O); return 1; }

    if(O.vectorType){    this.regionVectorChange(O,Q); return 1; }
    if(Q.vectorType){    this.regionVectorChange(Q,O); return 1; }

    if(O.teleportOnHit){ this.region_teleportOnHit(O,q); return 1; }
    if(Q.teleportOnHit){ this.region_teleportOnHit(Q,o); return 1; }

    if((Q.T=='star' || Q.T=='shieldBlob') && O.T=='ship')
        if(O.speed > 3) O.speed=3;

    if(O.onHit && O.onHit.Do=='explode' && Q.S!=O.S && Q.M!='region'){    this.explodeBomb(o,O.onHit);    return true; }

    if(O.PeriodTime)    this.makePeriodEffect(o,q);
    if(Q.PeriodTime)    this.makePeriodEffect(q,o);

    if(O.OneTimeEffect)    this.makeOneTimeEffect(o,q);
    if(Q.OneTimeEffect)    this.makeOneTimeEffect(q,o);

    DMG=O.Power;

    if(O.T=='missle' || O.T=='bullet'){
        if(O.S==Q.S) return 1;

        if(Q.T=='ship'){
            this.makeDMG(q,DMG,o);
            this.shipFunc_showHealth();
        }
        if(Q.TT=='enemy' || Q.T=='star' || Q.T=='missle' || Q.T=='bullet_bomb' || Q.T=='shieldBlob')
            this.makeDMG(q,DMG,o);
        if(Q.T=='space_mine'){
            this.explodeBomb(q,Q.onDie);
            this.removeObj(o);
        }
        if(Q.T=='healing_missle')
            this.removeObj(q);
    }
}
GAMEobject.prototype.makePeriodEffect = function(o,q){
    var O = this.O[o];
    var Q = this.O[q];

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
        if(O.PeriodDamage){
            if(this.makeDMG(q,O.PeriodDamage))
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
        if(O.OneTimeDamage){
            this.makeDMG(q,O.OneTimeDamage);
            delete(O.OneTimeDamage);
        }
        delete(O.OneTimeEffect);
        if(O.fieldAnim=='ElectricityField'){
            O.animType='EleFieldEnd';
            O.animTick = 0;
            O.DieTime = this.tick- -24;
            if(O.squadDirectPlace){
                this.unbindWithSquad(O.squadDirectPlace.o, O.squadDirectPlace.i, o);
            }

        }
    }
}
GAMEobject.prototype.makeDMG = function(o,DMG,q){
    var O = this.O[o];
    if(O.life < 1) return false;
    if(O.shieldD > 0){
        if(q) this.removeObj(q);
        return false;
    }
    if(O.undestructible){
        if(q) this.removeObj(q);
        return false;
    }
    if(O.energyField > 0){
        if(!q) q=-1;
        this.hitEnergyField(o,q,DMG);
        if(q) this.removeObj(q);
        return true;
    }
    if(O.jump && O.jump > 0){
        if(this.teleportJump(o,170,Math.random()*360)){
            --O.jump;
            this.checkHits(o);
            this.removeObj(q);
        }
        return false;
    }

    if(q){
        var Q = this.O[q];
        this.putObj_animation('hit', Q.x, Q.y);
        this.removeObj(q);
    } else {
        this.putObj_animation('hit', O.x, O.y);
    }
    for(var Daga=1; Daga < DMG; ++Daga){
        if(Daga >= O.life) break;
        var U = 20;
        DagaDagaX = parseInt(Math.random()*U*2-U);
        DagaDagaY = parseInt(Math.random()*U*2-U);
        this.putObj_animation('hit', (O.x-DagaDagaX), (O.y-DagaDagaY));
    }

    O.life-=DMG;
    if(O.T=='ship') this.shipFunc_showHealth();
    CanvasManager.requestCanvas(o);
    O.Flags.gotHitFlag = true;

    if(O.life <= 0){
        this.dieObj(O,o);
    }
    return true;
}
GAMEobject.prototype.dieObj = function(O,o){
    if(O.TT=='enemy') --this.EnemiesC;
    if(O.T!='missle' && O.T!='bullet_bomb' && O.T!='space_mine')
        this.putObj_animation('hitBig', O.x, O.y);

    if(O.squadDirectPlace){
        this.unbindWithSquad(O.squadDirectPlace.o, O.squadDirectPlace.i, o);
    }
    if(O.squadScheme)
        this.disbandSquad(O);

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
        this.putObj_animation('hit_blue', this.O[o].x, this.O[o].y);
        this.removeObj(o);
    } else{
        this.putObj_animation('hit_healing', Q.x, Q.y);
    }
    Q.life-=-DMG;
    if(Q.life > Q.lifeM) Q.life = Q.lifeM;
    if(q == 0)
        this.shipFunc_showHealth();
    CanvasManager.requestCanvas( q );
}
GAMEobject.prototype.hitEnergyField = function(o,q,DMG){
    var O = this.O[o];
    if(q > 0)
        this.putObj_animation('hit_energyField', this.O[q].x, this.O[q].y);
    else {
        this.putObj_animation('hit_energyField', O.x, O.y);
        if(DMG >1)     this.putObj_animation('hit_energyField', (O.x-10), (O.y- -5));
        if(DMG >2)     this.putObj_animation('hit_energyField', (O.x- -5), (O.y- -10));
        if(DMG >3)     this.putObj_animation('hit_energyField',  (O.x- -10), (O.y-5));
    }
    O.energyField-=DMG;
    if(O.energyField < 0) O.energyField = 0;
    if(O.T=='ship') this.shipFunc_showHealth();

}
