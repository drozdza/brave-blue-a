GAMEobject.prototype.oTheState = function(O, NewState){
    if (O.TheState == NewState) return true;

    for(var iStateThing in O.TheStateLists[O.TheState]){
        var StateThing = O.TheStateLists[O.TheState][iStateThing];
        this['oTheStageRemove_'+StateThing.T](O, StateThing);
    }

    O.TheState = NewState;

    for(var iStateThing in O.TheStateLists[O.TheState]){
        var StateThing = O.TheStateLists[O.TheState][iStateThing];
        this['oTheStageAdd_'+StateThing.T](O, StateThing);
    }

    O.ThinkTick = this.tick; // ?
}

GAMEobject.prototype.oTheStageRemove_look = function(O, StateThing){
    delete(this.Olook[O.o]);
}
GAMEobject.prototype.oTheStageAdd_look = function(O, StateThing){
    O.LookType = StateThing.LookType;
    if (typeof this.Olook[O.o] == 'undefined') {
        this.Olook[O.o] = 1;
    }
    O.LookTick = this.tick;
}

GAMEobject.prototype.oTheStageRemove_shot = function(O, StateThing){
    delete(this.Oshot[O.o]);
}
GAMEobject.prototype.oTheStageAdd_shot = function(O, StateThing){
    O.WeaponTypes = cloneObj(StateThing.WeaponTypes);
    if (typeof this.Oshot[O.o] == 'undefined') {
        this.Oshot[O.o] = 1;
    }
}

GAMEobject.prototype.oTheStageRemove_speed = function(O, StateThing){}
GAMEobject.prototype.oTheStageAdd_speed = function(O, StateThing){
    this.changeSpeedLvl(O, StateThing.SpeedLvl);
}

GAMEobject.prototype.oTheStageRemove_markPoint = function(O, StateThing){
    if(O.childMarkPoint) {
        this.removeObj(O.childMarkPoint);
        delete(O.childMarkPoint);
    }
}
GAMEobject.prototype.oTheStageAdd_markPoint = function(O, StateThing){
    var o = this.putObj('routePoint'+StateThing.pT,1,O.x,O.y);

    this.O[o].radius = StateThing.Radius;
    this.O[o].rName='Obj['+O.o+']: healing';

    this.O[o].lists['Omoving'] = 1;
    this.O[o].parentDirectXY = O.o;
    this.O[o].moveFunc = 'parentDirectXY';
    O.childMarkPoint = o;

    this.initObject(this.O[o]);
}
