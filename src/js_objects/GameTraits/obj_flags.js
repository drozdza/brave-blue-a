GAMEobject.prototype.oFlag_Add = function(O, FlagName, eventTick){

    // This as settings
    if (FlagName == 'VI_ISeeEnemy') {
        this.oTheState(O, 'attacking');
    }

    O.Flags['FlagName'] = eventTick;
}

GAMEobject.prototype.oTheState = function(O, NewState){
    if (O.TheState == NewState)
        return true;

    if(typeof O.TheStateLists[O.TheState] != 'undefined'){
        for(var iStateThing in O.TheStateLists[O.TheState]){
            var StateThing = O.TheStateLists[O.TheState][iStateThing];
            switch(StateThing.T){
                case 'lookAround': this.oTheStageRemove_lookAround(O, StateThing); break;
                case 'shot':       this.oTheStageRemove_shot(O, StateThing); break;
            }
        }
    }

    O.TheState = NewState;

    if(typeof O.TheStateLists[O.TheState] != 'undefined'){
        for(var iStateThing in O.TheStateLists[O.TheState]){
            var StateThing = O.TheStateLists[O.TheState][iStateThing];
            switch(StateThing.T){
                case 'lookAround': this.oTheStageAdd_lookAround(O, StateThing); break;
                case 'shot':       this.oTheStageAdd_shot(O, StateThing); break;
            }
        }
    }

    O.ThinkTick = this.tick; // ?
}

GAMEobject.prototype.oTheStageRemove_lookAround = function(O, StateThing){
    delete(this.Olook[O.o]);
}
GAMEobject.prototype.oTheStageAdd_lookAround = function(O, StateThing){
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
    O.WeaponType = StateThing.WeaponType;
    if (typeof this.Oshot[O.o] == 'undefined') {
        this.Oshot[O.o] = 1;
    }
}
