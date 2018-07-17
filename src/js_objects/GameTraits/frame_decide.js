GAMEobject.prototype.frame_decide = function(){
    var MS = (new Date()).getTime();
    $('#gameboardMarkers').html('');

    // Check Hits of Player Ship
    this.checkHits(0);

    if(this.C.playerDead===0 && this.playerEndGame===false)
        this.player_decide();


    this.MSship-=- ((new Date()).getTime() - MS);

    var MS = (new Date()).getTime();
    var o,O,oldX,oldY;
    var P = this.O[0];

    // Squads Decide
    for(s in this.Squads)
        this.decide_squad(s);

    // Bullet Decide
    for(o in this.Obullet){
        O = this.O[o];
        if(O.speedT) O.angle -=- O.speedT;
        if(O.speedSlowBy && O.speed > 0){
            O.speed *= O.speedSlowBy;
            if(O.speed < 0.2) O.speed = 0;
        }

        if(this.Obullet[o]==1){
            var X = O.x-P.x;
            var Y = O.y-P.y;
            var Dist = Math.sqrt(X*X- -Y*Y);
            if(Dist < 2- -P.radius)    this.hit(o,0);
                      else             this.checkHits(o);
        } else
            this.checkHits(o);

        if(--O.dec < 0)
            this.removeObj(o);
    }

    // Comp Decide
    for(o in this.Ocomp)
        this.decide(this.O[o]);

    for(o in this.Olook)
        if(this.O[o].LookTick <= this.tick)
            this.oLook(this.O[o]);

    for(o in this.Othink)
        this.checkHits(o);
    for(o in this.Othink)
        if(this.O[o].ThinkTick <= this.tick)
            this.oThink(this.O[o]);

    for(o in this.Oshot)
        for(w in this.O[o].WeaponTypes)
            this['oShot_'+w](this.O[o]);

    for(e in this.DelayedEvents[this.tick]){
        var Event = this.DelayedEvents[this.tick][e];
        this['oEvent_'+Event.T](Event);
    }
    delete(this.DelayedEvents[this.tick]);

    // Animations Decide
    for(o in this.Oanim)
        if(++this.O[o].timeTick >= this.O[o].timeDeath)
            this.removeObj(o);

    for(o in this.Oregion){
        if(this.tick < this.O[o].ActiveTime) continue;
        if(this.tick > this.O[o].DieTime){
            if(this.O[o].squadDirectPlace)
                this.unbindWithSquad(this.O[ this.O[o].squadDirectPlace.o ], this.O[o].squadDirectPlace.i, o);

            if(this.O[o].onDie){
                if(this.O[o].onDie.Do=='explode')
                    this.explodeBomb(o,this.O[o].onDie);
            } else
                this.removeObj(o);
            continue;
        }
        this.checkHits(o);
    }

    if(this.O[0].life < 1)
        this.killPlayer();

    for(o in this.O){
        O = this.O[o];
        if(O.TT=='regionAnim')
            CanvasManager.age_regionAnim(O,o);
    }


    ++this.tick;
    if(this.tick%30==0) this.showCounts();

    this.MSdecide-=-((new Date()).getTime() - MS);
}
