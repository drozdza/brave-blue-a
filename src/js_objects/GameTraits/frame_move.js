GAMEobject.prototype.frame_move = function(){
    var MS = (new Date()).getTime();
    var o,O,oldX,oldY;
    var PIx = Math.PI / 180;

    for(o in this.Omoving){
        O = this.O[o];

        // TO REMOVE
        if(O.M == 'static'){
            console.log(O.T+'['+O.o+']: moving but static!');
            continue;
        }

        if(O.Manouver) this['oManouver_'+O.Manouver](O);

        // TO REMOVE
        if(typeof O.moveFunc == 'undefined'){
            console.log(O.T+'['+O.o+']: no moving func!');
        }

        this['frame_move_'+O.moveFunc](O);
    }

    this.MSmove-=-((new Date()).getTime() - MS);
}

GAMEobject.prototype.frame_move_squadDirectPlace = function(O){
    var PIx = Math.PI / 180;
    var oldX = O.x;
    var oldY = O.y;

    var Master = this.O[ O.squadDirectPlace.o ];
    var MasterS = Master.squadScheme[ O.squadDirectPlace.i ];

    O.x = Master.x- -MasterS.radius * Math.sin( (-parseInt(MasterS.angle- -Master.angle)-180)*PIx );
    O.y = Master.y- -MasterS.radius * Math.cos( (-parseInt(MasterS.angle- -Master.angle)-180)*PIx );

    if(O.squadT && O.squadT == 'laserAim')
        O.squareAngle = Master.laserAngle;
    if(O.squareCorners)
        O.squareCorners = this.countSquareCorners(O.x,O.y,O.squareAngle,O.squareLen,O.squareWidth);

    if(typeof MasterS.squadAngleType != 'undefined' && MasterS.squadAngleType == 'alongDirection'){
         O.angle = Master.angle- -MasterS.angle;
    } else {
        O.angle = Master.angle;
        if(MasterS.anglePlus)
            O.angle = (O.angle- -MasterS.anglePlus)%360;
    }

    this.putOnXY(O, oldX, oldY);
}

GAMEobject.prototype.frame_move_parentDirectXY = function(O){
    var oldX = O.x;
    var oldY = O.y;

    var Parent = this.O[ O.parentDirectXY ];
    O.x = Parent.x;
    O.y = Parent.y;

    this.putOnXY(O, oldX, oldY);
}

GAMEobject.prototype.frame_move_move = function(O){
    var PIx = Math.PI / 180;
    var oldX = O.x;
    var oldY = O.y;

    O.x -=- O.speed * Math.sin( (-parseInt(O.angle)-180)*PIx);
    O.y -=- O.speed * Math.cos( (-parseInt(O.angle)-180)*PIx);

    if(O.vector){
        for(var i in O.vector){
            var V = O.vector[i];
            O.x -=- V.speed * Math.sin( (-parseInt(V.angle)-180)*PIx);
            O.y -=- V.speed * Math.cos( (-parseInt(V.angle)-180)*PIx);
        }
        delete(O.vector);
    }

    this.putOnXY(O, oldX, oldY);
}

GAMEobject.prototype.frame_move_bullet = function(O){
    var PIx = Math.PI / 180;

    O.x -=- O.speed * Math.sin( (-parseInt(O.angle)-180)*PIx);
    O.y -=- O.speed * Math.cos( (-parseInt(O.angle)-180)*PIx);

    if(O.vector){
        for(var i in O.vector){
            var V = O.vector[i];
            O.x -=- V.speed * Math.sin( (-parseInt(V.angle)-180)*PIx);
            O.y -=- V.speed * Math.cos( (-parseInt(V.angle)-180)*PIx);
        }
        delete(O.vector);
    }
}
