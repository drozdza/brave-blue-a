
GAMEobject.prototype.frame_decide = function(){
    var MS = (new Date()).getTime();
    $('#gameboardMarkers').html('');

    // Check Hits of Player Ship
    this.checkHits(0);

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

        if(this.Obullet[o]==1){
            var X = O.x-P.x;
            var Y = O.y-P.y;
            var Dist = Math.sqrt(X*X- -Y*Y);
            if(Dist < 2- -P.radius)    this.hit(o,0,O.Power);
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
                this.unbindWithSquad(this.O[o].squadDirectPlace.o,this.O[o].squadDirectPlace.i,o);
            this.removeObj(o);
            continue;
        }
        this.checkHits(o);
    }

    ++this.tick;

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

            O.angle = Master.angle;
            if(MasterS.angleAddon)
                O.angle = (O.angle- -MasterS.angleAddon)%360;
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
            this.putOnXY(o,oldX,oldY);

        if(o==0){
            this.ShipMoveX = O.x - oldX;
            this.ShipMoveY = O.x - oldY;
        }

    }

    $('#countEnemies').html(this.EnemiesC);
    // $('#gameboard').css({left: (-this.O[0].x- -(this.Dx/2))+'px',top: (-this.O[0].y- -(this.Dy/2))+'px'});

    this.MSmove-=-((new Date()).getTime() - MS);
}

GAMEobject.prototype.frame_draw = function(){
    var MS = (new Date()).getTime();
    var o,O;
    var P = this.O[0];
    var CH = this.CanvasHandle;
    var Px = P.x-(this.Dx/2);
    var Py = P.y-(this.Dy/2);
    var Cbull = CanvasManager.C['bullet_'];
    var Radi = Math.PI/180;

    CH.save();
    CH.fillStyle="rgba(0,0,0,0.12)";
    if(BBAdata.GET.BLUR > 1) CH.translate(this.shipMoveX,this.shipMoveY);
    if(!BBAdata.GET.BLUR)
        CH.fillStyle="transparent";
    CH.clearRect(0, 0, this.Dx, this.Dy);
    CH.restore();

    for(o in this.O){
        O = this.O[o];

        if(O && O.TT=='regionAnim'){
            var DR = CanvasManager.directRenders[ O.animType ];
            if(DR.makeParticles){
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

    for(o in this.O){
        O = this.O[o];
        if(O.TT=='regionAnim')
            CanvasManager.age_regionAnim(O,o);
    }

    CanvasManager.CPM.showParticles(CH,Px,Py);

    CanvasManager.CBM.drawBackgroundTiles(this.UnderCanvasHandle, this.Dx, this.Dy, Px, Py);
    ++this.tickD;
    this.MSdraw-=-((new Date()).getTime() - MS);
}

GAMEobject.prototype.frame = function(){
    if(BBAdata.GET.FRAMES==0){
        this.frame_move();
        this.frame_decide();
        this.frame_draw();
    }else if(BBAdata.GET.FRAMES > 0){
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
        this.frame_move();
        this.frame_decide();
        if(BBAdata.GET.FRAMES==3 || BBAdata.GET.FRAMES==4){
            PASSED-=FR;
            this.FRAME_TIME-=-FR;
            var X = 0;
            while(PASSED > FR){
                this.frame_move();
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

    if(this.EnemiesC < 1 || this.O[0].life < 1)
        this.endGame();

    if(!this.pause && !this.doEndGame)
        if(BBAdata.GET.FRAMES < 4)
            this.intervalIndex = window.requestAnimationFrame(function(){ GAME.frame(); });
        else
            this.intervalIndex = setTimeout(function(){ GAME.frame(); }, 1);
}
