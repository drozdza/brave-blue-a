
GAMEobject.prototype.frame_initObjects = function(){
    var o;
    while(o = this.initObjectsQueue.pop()){
        // console.log(o);
        this.initObject(this.O[o]);
    }
}

GAMEobject.prototype.frame_decide = function(){
    var MS = (new Date()).getTime();
    $('#gameboardMarkers').html('');

    // Check Hits of Player Ship
    this.checkHits(0);

    if(this.C.playerDead===0 && this.playerEndGame===false)
        this.decide_ship();


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
        this.checkHits(o);
    for(o in this.Ocomp)
        this.decide(o);


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

GAMEobject.prototype.frame_move = function(){
    var MS = (new Date()).getTime();
    var o,O,oldX,oldY;
    var PIx = Math.PI / 180;

    for(o in this.Omoving){
        O = this.O[o];
        if(O.M=='static') continue;
        oldX = O.x;
        oldY = O.y;

        if( O.squadDirectPlace ){
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
        }
        else {
            O.x -=- O.speed * Math.sin( (-parseInt(O.angle)-180)*PIx);
            O.y -=- O.speed * Math.cos( (-parseInt(O.angle)-180)*PIx);

            if (O.vector){
                for(var i in O.vector){
                    var V = O.vector[i];
                    O.x -=- V.speed * Math.sin( (-parseInt(V.angle)-180)*PIx);
                    O.y -=- V.speed * Math.cos( (-parseInt(V.angle)-180)*PIx);
                }
                delete(O.vector);
            }
        }

        if(O.T!='bullet')
            this.putOnXY(O, oldX, oldY);

        if(o==0){
            this.ShipMoveX = O.x - oldX;
            this.ShipMoveY = O.x - oldY;
        }

    }

    this.MSmove-=-((new Date()).getTime() - MS);
}

GAMEobject.prototype.frame_draw = function(frameCenter){
    var MS = (new Date()).getTime();
    var o,O;
    var P = this.O[0];
    var CH = this.CanvasHandle;
    var Px = P.x-(this.Dx/2);
    var Py = P.y-(this.Dy/2);
    if(frameCenter){
        var Px = frameCenter.x-(this.Dx/2);
        var Py = frameCenter.y-(this.Dy/2);
    }
    var Cbull = CanvasManager.C['bullet_'];
    var Radi = Math.PI/180;

    this.mainCanvas = {CH:CH,Px,Py};

    if(BBAdata.GET.BLUR){
        this.BlurCanvasHandle.clearRect(0, 0, this.Dx, this.Dy);
        this.BlurCanvasHandle.globalAlpha = 0.88;
        this.BlurCanvasHandle.drawImage(document.getElementById('MainCanvas'), 0, 0);
        CH.clearRect(0, 0, this.Dx, this.Dy);
        if(BBAdata.GET.BLUR == 1)
            CH.drawImage(document.getElementById('BlurCanvas'), 0, 0);
        else{
            var shipMoveX = this.shipX-P.x;
            var shipMoveY = this.shipY-P.y;
            this.shipX = P.x;
            this.shipY = P.y;
            CH.drawImage(document.getElementById('BlurCanvas'), shipMoveX, shipMoveY);
        }

    }else{
        CH.clearRect(0, 0, this.Dx, this.Dy);
    }

    if(BBAdata.GET.DEBUG >= 2) CanvasManager.drawMapHitboxLines(CH, this.MapTileSize, this.Dx, this.Dy, Px, Py, false);
    if(BBAdata.GET.DEBUG >= 3) CanvasManager.drawMapHitboxLines(CH, this.MapTileSize, this.Dx, this.Dy, Px, Py, true);

    for(o in this.O){
        O = this.O[o];

        if(O && O.TT=='regionAnim'){
            var DR = CanvasManager.directRenders[ O.animType ];
            if(DR.Particles){
                CanvasManager.CPM.addParticles(O, O.animData);
            }
        }

        if(O.viewOff || (O.view && O.view.onBackground)) continue;

        if(O.T=='bullet'){
            CH.save();
            CH.translate((O.x-Px).toFixed(0), (O.y-Py).toFixed(0));
            CH.rotate(Radi*O.angle);
            CH.drawImage(Cbull.Id,-Cbull.X,-Cbull.Y);
            CH.restore();
            continue;
        }

        this.drawObject(O,o, CH, Px,Py);
    }


    CanvasManager.CPM.showParticles(CH,Px,Py);

    CanvasManager.CBM.drawBackgroundTiles(this.UnderCanvasHandle, this.Dx, this.Dy, Px, Py);
    ++this.tickD;
    this.MSdraw-=-((new Date()).getTime() - MS);
}

GAMEobject.prototype.frame = function(){
    // debugLog('Frame');
    if(BBAdata.GET.FRAMES==0){
        // debugLog('Frame: initObjects');
        this.frame_initObjects();
        // debugLog('Frame: move');
        this.frame_move();
        // debugLog('Frame: decide');
        this.frame_decide();
        // debugLog('Frame: draw');
        this.frame_draw();
    }else if(BBAdata.GET.FRAMES > 0){
        // debugLog('Frame: initObjects');
        this.frame_initObjects();
        var FR = parseInt( 1000/this.Frames )-2;
        var now = new Date().getTime();
        var PASSED = now - this.FRAME_TIME;
        if(PASSED < FR){
            this.intervalIndex = window.requestAnimationFrame(function(){ GAME.frame(); });
            return true;
        }
        if(BBAdata.GET.FRAMES==1){
            this.FRAME_TIME = now;
        }
        if(BBAdata.GET.FRAMES==2){
            this.FRAME_TIME-=-FR;
        }
        // debugLog('Frame: move');
        this.frame_move();
        // debugLog('Frame: decide');
        this.frame_decide();
        if(BBAdata.GET.FRAMES==3 || BBAdata.GET.FRAMES==4){
            PASSED-=FR;
            this.FRAME_TIME-=-FR;
            var X = 0;
            while(PASSED > FR){
                // debugLog('Frame: move');
                this.frame_move();
                // debugLog('Frame: decide');
                this.frame_decide();
                PASSED-=FR;
                this.FRAME_TIME-=-FR;
                if(++X >=3){
                    this.FRAME_TIME=now;
                    break;
                }
            }
        } else {
        }
        // debugLog('Frame: draw');
        this.frame_draw();
    }


    if(BBAdata.GET.FPS > 0){
        var D = parseInt(new Date().getTime()/1000);
        if(D != this.FPSx){
            var FPS = this.tick - this.FPSy;
            var FPSu = this.tickD - this.FPSz;
            if(BBAdata.GET.FPS > 1){
                $('#FPSpillar').prepend('<div><div style="height: '+FPS*3+'px;"><div style="height: '+FPSu*3+'px;"></div></div></div>');
                $('#FPSpillar div:nth-child(151)').remove();
            }
            var html = '';
            html += parseInt(this.O[0].x)+' '+parseInt(this.O[0].y)+'<br/>';
            html += FPSu+' / '+FPS+' fps';
            $('#FPSnum').html(html);
            this.FPSy=this.tick;
            this.FPSz=this.tickD;

            if(BBAdata.GET.FPS > 2){
                var u = 1000 - this.MSship - this.MSdecide - this.MSmove - this.MSdraw;
                html = '';
                html += '<div class="FPS_MS">'+this.MSship+'<div class="" style="height: '+parseInt(this.MSship/10)+'px;">[s]</div></div>';
                html += '<div class="FPS_MS">'+this.MSdecide+'<div class="" style="height: '+parseInt(this.MSdecide/10)+'px;">[d]</div></div>';
                html += '<div class="FPS_MS">'+this.MSmove+'<div class="" style="height: '+parseInt(this.MSmove/10)+'px;">[m]</div></div>';
                html += '<div class="FPS_MS">'+this.MSdraw+'<div class="" style="height: '+parseInt(this.MSdraw/10)+'px;">[c]</div></div>';
                html += '<div class="FPS_MS">'+u+'<div class="" style="height: '+parseInt(u/10)+'px;"></div></div>';

                $('#FPS_MS').html(html);

                this.MSdraw = 0;
                this.MSdecide = 0;
                this.MSship = 0;
                this.MSmove = 0;
            }

        }
        this.FPSx=D;
    }

    if(!this.pause && !this.doEndGame && GAME)
        if(BBAdata.GET.FRAMES < 4)
            this.intervalIndex = window.requestAnimationFrame(function(){ GAME.frame(); });
        else
            this.intervalIndex = setTimeout(function(){ GAME.frame(); }, 1);
}
