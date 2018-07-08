GAMEobject.prototype.setEventEmitter = function(tick, Event){
    if(tick > this.tick){
        if(typeof this.DelayedEvents[tick])
            this.DelayedEvents[tick] = [];
        this.DelayedEvents[tick].push(Event);
    }else{
        this['oEvent_'+Event.T](Event);
    }
}

GAMEobject.prototype.oEvent_emitFlagXY = function(Event){
    var inRange = this.getCollidingWithCircle(Event.x,Event.y,Event.r,['E']);
    for(var o in inRange)
        this.oFlagAdd(this.O[o], Event.FlagName, Event.eventTick);
}

GAMEobject.prototype.oEvent_emitFlagLater = function(Event){
    if(typeof this.O[Event.o] == 'undefined') return false;
    var O = this.O[Event.o];

    console.log(Event);

    var tick = this.tick;
    if(typeof Event.offTime != 'undefined') tick -=- Event.offTime;

    this.setEventEmitter(tick, {
        T: 'emitFlagXY',
        x: O.x,
        y: O.y,
        r: Event.r,
        FlagName: Event.FlagName,
        eventTick: O.Flags[Event.FlagName],
    });

    if(--Event.nPeriods < 1) return false;

    var tick = this.tick;
    if(typeof Event.offTime != 'undefined') tick -=- Event.periodTime;


    this.setEventEmitter(tick, {
        T:'emitFlagLater',
        o: O.o,
        r: Event.r,
        FlagName: Event.FlagName,
        eventTick: O.Flags[Event.FlagName],
        offTime: Event.offTime,
        periodTime: Event.periodTime,
        nPeriods: Event.nPeriods,
    });

}

/*    this.setEventEmitter(tick, {
        T:'emitFlagLater',
        o:O.o,
        r:FlagReaction.Radius,
        FlagName: FlagReaction.Flag,
        eventTick:eventTick,
        offTime: FlagReaction.offTime,
        periodTime: FlagReaction.periodTime,
        nPeriods: FlagReaction.nPeriods,
    }); */
