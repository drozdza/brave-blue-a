GAMEobject.prototype.setEventEmitter = function(tick, Event){
    if(tick > this.tick){
        if(typeof this.DelayedEvents[tick])
            this.DelayedEvents[tick] = [];
        this.DelayedEvents[tick].push(Event);
    }else{
        this['oEvent_'+Event.T](Event);
    }
}

GAMEobject.prototype.oEvent_emitFlag = function(Event){
    var inRange = this.getCollidingWithCircle(Event.x,Event.y,Event.r,['E']);
    for(var o in inRange)
        this.oFlagAdd(this.O[o], Event.FlagName, Event.eventTick);
}
