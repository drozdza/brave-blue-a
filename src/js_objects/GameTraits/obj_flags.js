GAMEobject.prototype.oFlagAdd = function(O, FlagName, eventTick){
    for(var fr in O.FlagReactions[FlagName]){
        var FlagReaction = O.FlagReactions[FlagName][fr];
        this['oFlag_'+FlagReaction.T](O, FlagReaction, eventTick);
    }

    O.Flags[FlagName] = eventTick;
}

GAMEobject.prototype.oFlag_addFlags = function(O, FlagReaction, eventTick){
    for(var f in FlagReaction.Flags)
        this.oFlagAdd(O, FlagReaction.Flags[f], eventTick);
}
GAMEobject.prototype.oFlag_emitFlagXY = function(O, FlagReaction, eventTick){
    if (FlagReaction.pChance && Math.random()*100 > FlagReaction.pChance) return false;

    var tick = this.tick;
    if(typeof FlagReaction.offTime != 'undefined') tick -=- FlagReaction.offTime;

    this.setEventEmitter(tick, {
        T: 'emitFlagXY',
        x: O.x,
        y: O.y,
        r: FlagReaction.Radius,
        FlagName: FlagReaction.Flag,
        eventTick:eventTick
    });
}
GAMEobject.prototype.oFlag_emitFlagLater = function(O, FlagReaction, eventTick){
    // if (FlagReaction.pChance && Math.random()*100 > FlagReaction.pChance) return false;
    if(O.emitLater) return false;
    O.emitLater = true;

    var tick = this.tick;
    if(typeof FlagReaction.periodOffTime != 'undefined') tick -=- FlagReaction.periodOffTime;

    this.setEventEmitter(tick, {
        T: 'emitFlagLater',
        o: O.o,
        r: FlagReaction.Radius,
        FlagName: FlagReaction.Flag,
        offTime: FlagReaction.offTime,
        periodTime: FlagReaction.periodTime,
        nPeriods: FlagReaction.nPeriods,
    });
}
GAMEobject.prototype.oFlag_changeTheState = function(O, FlagReaction, eventTick){
    if(!this.oFlagCheckTheStates(O, FlagReaction)) return false;

    this.oTheState(O, FlagReaction.TheState);
}
GAMEobject.prototype.oFlag_makeThink = function(O, FlagReaction, eventTick){
    if(O.DoNotInteruptThinksUntil > this.tick) return false;
    if(!this.oFlagCheckTheStates(O, FlagReaction)) return false;

    var Think = O.Thinks[ FlagReaction.Think ];
    this['oThink_'+Think.T](O, Think);
}

GAMEobject.prototype.oFlagCheckTheStates = function(O, FlagReaction){
    if (FlagReaction.reqTheState) {
        var isReqTheState = false;
        for(var theState in FlagReaction.reqTheState)
            if (O.TheState == theState)
                isReqTheState = true;
        if (!isReqTheState) return false;
    }

    if (FlagReaction.notTheState) {
        var isNotTheState = true;
        for(var theState in FlagReaction.notTheState)
            if (O.TheState == theState)
                isNotTheState = false;
        if (!isNotTheState) return false;
    }

    return true;
}
