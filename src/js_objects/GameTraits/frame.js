
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
    var o,O,oldX,oldY;
    var P = this.O[0];
    var CH = this.CanvasHandle;
    var Px = P.x-(this.Dx/2);
    var Py = P.y-(this.Dy/2);

    CH.save();
    CH.fillStyle="rgba(0,0,0,0.12)";
    if(GET['BLUR'] > 1) CH.translate(this.shipMoveX,this.shipMoveY);
    if(!GET['BLUR'])
        CH.fillStyle="black";
    CH.fillRect(0, 0, this.Dx, this.Dy);
    CH.restore();
    var Radi = Math.PI/180;

    for(o in this.O){
        O = this.O[o];
        if(GET['DEBUG']){
            CH.save();
            CH.strokeStyle = 'white';
            CH.beginPath();
            if(O.squareCorners){
                CH.moveTo( (O.squareCorners.A.x-Px).toFixed(1), (O.squareCorners.A.y-Py).toFixed(1) );
                CH.lineTo( (O.squareCorners.B.x-Px).toFixed(1), (O.squareCorners.B.y-Py).toFixed(1) );
                CH.lineTo( (O.squareCorners.C.x-Px).toFixed(1), (O.squareCorners.C.y-Py).toFixed(1) );
                CH.lineTo( (O.squareCorners.D.x-Px).toFixed(1), (O.squareCorners.D.y-Py).toFixed(1) );
                CH.lineTo( (O.squareCorners.A.x-Px).toFixed(1), (O.squareCorners.A.y-Py).toFixed(1) );
            }else if(O.coneAngle){
                var Angle1 = (O.angle- -O.coneAngle-90)*Radi;
                var Angle2 = (O.angle - O.coneAngle-90)*Radi;
                CH.arc(O.x-Px,O.y-Py,O.radius,Angle1,Angle2,true);
                CH.arc(O.x-Px,O.y-Py,O.coneRad2,Angle2,Angle1,false);
                CH.closePath();
            }else{
                CH.arc((O.x-Px).toFixed(0), (O.y-Py).toFixed(0),O.radius,0,Math.PI*2,true);
            }
            CH.stroke();
            CH.restore();
        }

        if(typeof O.canvasId != 'undefined'){
            CH.save();
            CH.translate((O.x-Px).toFixed(0), (O.y-Py).toFixed(0));
            if(O.viewAngle)
                CH.rotate(Radi*(O.angle- -O.viewAngle));
            else if(O.angle)
                CH.rotate(Radi*O.angle);
            CH.drawImage(O.canvasId,-O.canvasX,-O.canvasY);

            if(O.energyField && O.energyField > 0 && !O.shieldD){
                CH.beginPath();
                var Radius = O.radius;
                var lineWidth = O.energyField;
                if(lineWidth > 2)
                    lineWidth = 2- -(lineWidth-2)/2;

                if(o==0){
                    CH.strokeStyle = 'rgba(154,255,255,0.8)';
                    CH.fillStyle = 'rgba(154,255,255,0.2)';
                    Radius-=-7;
                } else {
                    CH.strokeStyle = 'rgba(0,255,0,0.8)';
                    CH.fillStyle = 'rgba(0,255,0,0.2)';
                }
                CH.arc(0,0,Radius- -parseInt(lineWidth/2),0,Math.PI*2,true);
                CH.lineWidth = lineWidth;
                CH.stroke();
                CH.fill();
            }
            if(O.shieldD){
                CH.beginPath();
                var Radius = O.radius;

                CH.strokeStyle = 'rgba(100,180,255,0.8)';
                CH.fillStyle = 'rgba(100,180,255,0.2)';

                CH.arc(0,0,Radius- -1,0,Math.PI*2,true);
                CH.lineWidth = 2;
                CH.stroke();
                CH.fill();
            }
            CH.restore();
        }
        if(O.TT=='anim'){
            CH.save();
            CH.translate((O.x-Px).toFixed(0), (O.y-Py).toFixed(0));
            var Canvas = CanvasManager.getCanvas(O);
            if(O.angle != 0) CH.rotate(Radi*O.angle);
            CH.drawImage(Canvas.Id, -Canvas.X, -Canvas.Y);
            CH.restore();
            continue;
        }
        if(O.TT=='dirAnim'){
            CanvasManager.directRender(CH,O);
            continue;
        }
        if(O.TT=='regionAnim'){
            CanvasManager.regionAnim(CH,O);
            continue;
        }
        if(O.TT=='simpleFilling'){
            CanvasManager.simpleFilling(CH,O);
            continue;
        }
    }
    ++this.tickD;
    this.MSdraw-=-((new Date()).getTime() - MS);
}

GAMEobject.prototype.frame = function(){
    if(GET['FRAMES']==0){
        this.frame_move();
        this.frame_decide();
        this.frame_draw();
    }else if(GET['FRAMES'] > 0){
        var FR = parseInt( 1000/this.Frames )-2;
        var now = new Date().getTime();
        var PASSED = now - this.FRAME_TIME;
        if(PASSED < FR){
            this.intervalIndex = window.requestAnimationFrame(function(){ GAME.frame(); });
            return true;
        }
        if(GET['FRAMES']==1){
            this.FRAME_TIME = now;
        }
        if(GET['FRAMES']==2){
            this.FRAME_TIME-=-FR;
        }
        this.frame_move();
        this.frame_decide();
        if(GET['FRAMES']==3 || GET['FRAMES']==4){
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


    if(GET['FPS'] > 0){
        var D = parseInt(new Date().getTime()/1000);
        if(D != this.FPSx){
            var FPS = this.tick - this.FPSy;
            var FPSu = this.tickD - this.FPSz;
            if(GET['FPS'] > 1){
                $('#FPSpillar').prepend('<div><div style="height: '+FPS*3+'px;"><div style="height: '+FPSu*3+'px;"></div></div></div>');
                $('#FPSpillar div:nth-child(151)').remove();
            }
            var html = '';
            html += parseInt(this.O[0].x)+' '+parseInt(this.O[0].y)+'<br/>';
            html += FPSu+' / '+FPS+' fps';
            $('#FPSnum').html(html);
            this.FPSy=this.tick;
            this.FPSz=this.tickD;

            if(GET['FPS'] > 2){
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
        if(GET['FRAMES'] < 4)
            this.intervalIndex = window.requestAnimationFrame(function(){ GAME.frame(); });
        else
            this.intervalIndex = setTimeout(function(){ GAME.frame(); }, 1);
}
