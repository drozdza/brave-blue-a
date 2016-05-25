function CanvasManagerObject(){
    this.C = {};

    this.start = function(){
        $('#CanvasPreviews').html('');

        this.simpleRenderNeeded();
        this.renderNeeded();
        this.prepareDirectRenders();

        this.CBM = new CanvasBackgroundManagerObject();
        this.CBM.start();
    }

    this.canvasId = function(O){
        var ID = '';
        ID+=O.T+'_';
        var View = O.view;
        if(typeof O.timeTick !='undefined')
                             ID+='frame_'+O.timeTick+'_';

        if(typeof View == 'undefined') return ID;

        if(View.Letter)      ID+=View.Letter+'_';
        // if(O.viewShape)       ID+=O.viewShape+'_';
        if(View.Color)       ID+=View.Color+'_';
        // if(O.viewXY)          ID+=O.viewXY+'_';
        if(View.LetterSize)  ID+=View.LetterSize+'_';
        if(View.GlobalAlpha) ID+=View.GlobalAlpha+'_';
        if(View.PathSize)    ID+=View.PathSize+'_';
        if(View.Angle)       ID+=View.Angle+'_';
        if(O.life > 0 && View.Cloaked)
                             ID+='cloaked_';
        if(View.HitPattern && O.life < O.lifeM)
                             ID+='life_'+O.life+'_';

        return ID;
    }

    this.getCanvas = function(O){
        var ID = this.canvasId(O);
        return this.C[ID];
    }

    this.requestCanvas = function(o){
        var O = GAME.O[o];

        if(typeof O.view == 'undefined') return false;

        var ID = this.canvasId(O);

        var Canvas={Id:false,X:0,Y:0};
        if(typeof this.C[ID] != 'undefined'){
            Canvas = this.C[ID];
        } else {
            Canvas = this.addCanvas(ID,O);
        }

        GAME.O[o].canvasId = Canvas.Id;
        GAME.O[o].canvasX = Canvas.X;
        GAME.O[o].canvasY = Canvas.Y;
    }

    this.addCanvas = function(ID,O){
        var Canvas={Id:false,X:0,Y:0};
        var X2=100,Y2=100;
        var View = O.view;

        if(View.XY)
            X2 = Y2 = View.XY;

        var X = Canvas.X = parseInt(X2/2);
        var Y = Canvas.Y = parseInt(Y2/2);


        if(View.LetterSizeYoffset)
            Y -=- View.LetterSizeYoffset;

        $('#CanvasPreviews').append('<canvas id="CanvasManager_'+ID+'" width="'+X2+'" height="'+Y2+'"></canvas>');
        Canvas.Id = document.getElementById('CanvasManager_'+ID);
        var CanCon = Canvas.Id.getContext('2d');

        if(View.GlobalAlpha){
            CanCon.globalAlpha = View.GlobalAlpha / 10;
        }

        var State = {};
        if(View.HitPattern && O.life < O.lifeM)
            State = this.getHitPattern(View.HitPattern, parseInt((O.life/O.lifeM)*100));

        if(typeof View.backgroundCircle != 'undefined'){
            CanCon.fillStyle = 'yellow';
            if(View.colorCircle) CanCon.fillStyle = 'rgba('+View.colorCircle[0]+','+View.colorCircle[1]+','+View.colorCircle[2]+','+View.colorCircle[3]+')';
            if(State.colorCircle) CanCon.fillStyle = 'rgba('+State.colorCircle[0]+','+State.colorCircle[1]+','+State.colorCircle[2]+','+State.colorCircle[3]+')';
            CanCon.beginPath();
            CanCon.arc(X, Y, View.backgroundCircle, 0, Math.PI*2, true);
            CanCon.fill();

        }

        if(typeof View.Letter != 'undefined'){
            CanCon.font = "bold "+View.LetterSize+"px Arial";
            CanCon.textAlign = 'center';
            CanCon.textBaseline = 'middle';
            CanCon.fillStyle = View.Color;
            CanCon.translate(X,Y);
            if(View.colorFill) CanCon.fillStyle = 'rgba('+View.colorFill[0]+','+View.colorFill[1]+','+View.colorFill[2]+','+View.colorFill[3]+')';
            if(State.colorFill) CanCon.fillStyle = 'rgba('+State.colorFill[0]+','+State.colorFill[1]+','+State.colorFill[2]+','+State.colorFill[3]+')';
            if(O.life > 0 && View.Cloaked) CanCon.fillStyle = '#111111';

            if(!isNaN(View.Letter)){
                CanCon.fillText(String.fromCharCode(View.Letter), 0, 0);
            }else{
                CanCon.fillText(View.Letter, 0, 0);
            }
        }

                    // 100:{letterAdd:'A',colorLetterAdd:[255,0,0,1],SizeLetterAdd:10,YOffsetLetterAdd:10},

        if(typeof State.letterAdd != 'undefined'){
            CanCon.font = "bold "+State.SizeLetterAdd+"px Arial";
            CanCon.textAlign = 'center';
            CanCon.textBaseline = 'middle';
            if(View.Angle)
                CanCon.rotate(-View.Angle*(Math.PI/180));
            if(State.colorLetterAdd) CanCon.fillStyle = 'rgba('+State.colorLetterAdd[0]+','+State.colorLetterAdd[1]+','+State.colorLetterAdd[2]+','+State.colorLetterAdd[3]+')';
            if(View.Cloaked) CanCon.fillStyle = '#111111';
            var Y7 = 0;
            if(State.YOffsetLetterAdd)
                Y7-=-State.YOffsetLetterAdd;

            if(!isNaN(State.letterAdd)){
                CanCon.fillText(String.fromCharCode(State.letterAdd), 0, Y7);
            }else{
                CanCon.fillText(State.letterAdd, 0, Y7);
            }
        }

        if(typeof View.LIBpath != 'undefined'){
            CanCon.fillStyle = View.Color;
            if(State.colorFill) CanCon.fillStyle = 'rgba('+State.colorFill[0]+','+State.colorFill[1]+','+State.colorFill[2]+','+State.colorFill[3]+')';

            var svgD='';
            var pathSize=View.PathSize/1000;
            var XYoffset = parseInt((X2 - View.PathSize)/2);
            var PATH = this.LIB[ View.LIBpath ];
            for(var s=0; s<PATH.length;++s)
                if(isNaN(PATH[s])) svgD+=PATH[s]+' ';
                        else       svgD+=((PATH[s]*pathSize).toFixed(2))+' ';
            var svgObj = new Path2D(svgD);

            CanCon.translate(XYoffset,XYoffset);
            CanCon.fill(svgObj);
        }

        /*
        if(typeof O.viewShape != 'undefined'){
            CanCon.fillStyle = O.viewColor;
            var XYoffset = parseInt(X2/2);
            CanCon.beginPath();
            CanCon.arc(XYoffset,XYoffset, O.radius, 0, Math.PI*2, true);
            CanCon.fill();
        }
        */
        if(O.T=='bullet'){
            CanCon.font = "bold 10px Arial";
            CanCon.fillStyle = 'yellow';
            CanCon.textAlign = 'center';
            CanCon.textBaseline = 'middle';
            CanCon.fillText('i', 50, 50);
        }



        this.C[ID]=Canvas;
        return Canvas;
    }

    this.simpleRenderNeeded = function(){
        var R;
        for(var nR in this.neededSimpleRenders){
            R = this.neededSimpleRenders[nR];
            var X2 = R.sizeX || 100;
            var Y2 = R.sizeY || 100;
            var X1 = parseInt(X2/2), Y1 = parseInt(Y2/2);
            var X = X1, Y = Y1;

            var ID = nR+'_';
            var Canvas={Id:false,X:X1,Y:Y1};
            $('#CanvasPreviews').append('<canvas id="CanvasManager_'+ID+'" width="'+X2+'" height="'+Y2+'"></canvas>');
            Canvas.Id = document.getElementById('CanvasManager_'+ID);
            var CanCon = Canvas.Id.getContext('2d');


            if(typeof R.Letter != 'undefined'){
                CanCon.save();
                CanCon.font = "bold "+R.LetterSize+"px Arial";
                CanCon.textAlign = 'center';
                CanCon.textBaseline = 'middle';
                CanCon.fillStyle = R.Color;
                if(!isNaN(R.Letter)){
                    CanCon.fillText(String.fromCharCode(R.Letter), X1, Y);
                }else{
                    CanCon.fillText(R.Letter, X1, Y);
                }
                CanCon.restore();
            }

            this.C[ID]=Canvas;
        }
    }

    this.renderNeeded = function(){
        var R;
        for(var nR in this.neededRenders){
            R = this.neededRenders[nR];
            var X2 = R.sizeX, Y2 = R.sizeY;
            var X1 = parseInt(X2/2), Y1 = parseInt(Y2/2);
            var X = X1, Y = Y1;

            // prepare full states array
            var LastSeen = false;
            var T = [];
            for(var i in R.states)
                T[ T.length ]=i;
            for(var i=0; i<T.length-1; ++i){
                var t1 = T[i];
                var t2 = T[i- -1];
                for(var j=t1- -1; j<t2; ++j){
                    var State = {};
                    for(var si in R.states[t1]){
                        if(typeof R.states[t2][si] == 'undefined'){
                            State[si]=R.states[t1][si];
                        }else if(si.substr(0,5)=='color'){
                            State[si]=[];
                            for(var k=0; k<3; ++k)
                                State[si][k] = R.states[t1][si][k]- -parseInt((R.states[t2][si][k]-R.states[t1][si][k]) * ((j-t1) / (t2-t1)));
                            State[si][3] = R.states[t1][si][3]- -((R.states[t2][si][3]-R.states[t1][si][3]) * ((j-t1) / (t2-t1)));
                        }else{
                            State[si] = R.states[t1][si]- -parseInt((R.states[t2][si]-R.states[t1][si]) * ((j-t1) / (t2-t1)));
                        }
                    }
                    R.states[j]=State;
                }
            }

            if(typeof R.smallStars !='undefined'){
                var SS=[];
                for(var i=0; i<R.smallStars; ++i){
                    var Radi = Math.random()*(R.sizeX/5)- -(R.sizeX/8);
                    var Angle = Math.random()*2*Math.PI;
                    SS[i]={};
                    SS[i].x = parseInt(Math.cos(Angle)*Radi);
                    SS[i].y = parseInt(Math.sin(Angle)*Radi);
                }
                R.smallStars = SS;
            }


            // make renders of states
            for(var i=0; i<R.frames; ++i){
                var ID = nR+'_frame_'+i+'_';
                var Canvas={Id:false,X:X1,Y:Y1};
                $('#CanvasPreviews').append('<canvas id="CanvasManager_'+ID+'" width="'+X2+'" height="'+Y2+'"></canvas>');
                Canvas.Id = document.getElementById('CanvasManager_'+ID);
                var CanCon = Canvas.Id.getContext('2d');

                if(R.states[i].Yoffset)
                    Y = parseInt(Y2/2)- R.states[i].Yoffset;

                if(BBAdata.GET.DEBUG){ CanCon.strokeStyle='white'; CanCon.beginPath();    CanCon.moveTo(0,Y1); CanCon.lineTo(X2,Y1); CanCon.stroke(); CanCon.beginPath();    CanCon.moveTo(X1,0); CanCon.lineTo(X1,Y2); CanCon.stroke(); }



                if(typeof R.states[i].circleRadius != 'undefined'){
                    CanCon.save();
                    CanCon.fillStyle = "rgba("+R.states[i].color2[0]+","+R.states[i].color2[1]+","+R.states[i].color2[2]+","+R.states[i].color2[3]+")";
                    CanCon.beginPath();
                    CanCon.arc(X1,Y,R.states[i].circleRadius,0,Math.PI*2,true);
                    CanCon.fill();
                    CanCon.restore();
                }

                if(typeof R.Letter != 'undefined'){
                    CanCon.save();
                    CanCon.font = "bold "+R.states[i].fontSize+"px Arial";
                    CanCon.textAlign = 'center';
                    CanCon.textBaseline = 'middle';
                    CanCon.fillStyle = "rgba("+R.states[i].color[0]+","+R.states[i].color[1]+","+R.states[i].color[2]+","+R.states[i].color[3]+")";
                    if(!isNaN(R.Letter)){
                        CanCon.fillText(String.fromCharCode(R.Letter), X1, Y);
                    }else{
                        CanCon.fillText(R.Letter, X1, Y);
                    }
                    CanCon.restore();
                }
                if(typeof R.LIBpath != 'undefined'){
                    var svgD='';
                    var pathSize=R.states[i].pathSize/1000;
                    var XYoffset = parseInt((X2 - R.states[i].pathSize)/2);
                    var PATH = this.LIB[ R.LIBpath ];
                    for(var s=0; s<PATH.length;++s)
                        if(isNaN(PATH[s]))    svgD+=PATH[s]+' ';
                                else         svgD+=((PATH[s]*pathSize).toFixed(2))+' ';
                    var svgObj = new Path2D(svgD);
                    CanCon.save();
                    CanCon.translate(XYoffset,XYoffset);
                    CanCon.fillStyle = "rgba("+R.states[i].color[0]+","+R.states[i].color[1]+","+R.states[i].color[2]+","+R.states[i].color[3]+")";
                    CanCon.fill(svgObj);
                    CanCon.restore();
                }

                if(typeof R.smallStars != 'undefined'){
                    for(var mi=0; mi<R.smallStars.length; ++mi){
                        var svgD='';
                        var pathSize=R.states[i].smallStarSize/1000;
                        var XYoffset = parseInt((X2 - R.states[i].pathSize)/2);
                        var PATH = this.LIB['StarPath'];
                        for(var s=0; s<PATH.length;++s)
                            if(isNaN(PATH[s]))    svgD+=PATH[s]+' ';
                                    else         svgD+=((PATH[s]*pathSize).toFixed(2))+' ';
                        CanCon.save();
                        CanCon.translate(((X2 - R.states[i].smallStarSize)/2)- -R.smallStars[mi].x, ((Y2 - R.states[i].smallStarSize)/2)- -R.smallStars[mi].y);
                        var svgObj = new Path2D(svgD);
                        CanCon.fillStyle = "rgba("+R.states[i].color[0]+","+R.states[i].color[1]+","+R.states[i].color[2]+","+R.states[i].color[3]+")";
                        CanCon.fill(svgObj);
                        CanCon.restore();
                    }
                }

                this.C[ID]=Canvas;
            }
        }
        // delete(this.neededRenders);
    }

    this.prepareDirectRenders = function(){
        var nR,R,i,j,k,T,t1,t2,si,State;
        for(nR in this.directRenders){
            R = this.directRenders[nR];
            T = [];
            for(i in R.states){
                T[ T.length ]=i;
            }
            for(i=0; i<T.length-1; ++i){
                t1 = T[i];
                t2 = T[i- -1];
                for(j=t1- -1; j<t2; ++j){
                    State = {};
                    for(si in R.states[t1]){
                        if(si.substr(0,5)!='color')
                            State[si] = R.states[t1][si]- -((R.states[t2][si]-R.states[t1][si]) * ((j-t1) / (t2-t1)));
                        else{
                            State[si]=[];
                            for(k=0; k<3; ++k)
                                State[si][k] = R.states[t1][si][k]- -parseInt((R.states[t2][si][k]-R.states[t1][si][k]) * ((j-t1) / (t2-t1)));
                                State[si][3] = R.states[t1][si][3]- -(R.states[t2][si][3]-R.states[t1][si][3]) * ((j-t1) / (t2-t1));
                        }
                    }
                    R.states[j]=State;
                }
            }
        }
    }

    this.directRender = function(CanCon,O){
        var P = GAME.O[0];
        var AnimData = O.Data;
        var Frame = O.timeTick;
        if(Frame < 0) return 1;
        var Type = O.T;
        var StyleData = this.directRenders[Type];

        if(Type=='TP_track' || Type=='TP_trackDark' || Type=='laserShoot'){
            CanCon.save();
            CanCon.lineCap = 'round';
            CanCon.strokeStyle = 'rgba('+StyleData.states[Frame].color[0]+','+StyleData.states[Frame].color[1]+','+StyleData.states[Frame].color[2]+','+StyleData.states[Frame].color[3]+')';
            CanCon.lineWidth = StyleData.states[Frame].width;
            if(O.pathD){
                var pe = new Path2D( this.build_path2D(O.pathD) );
                CanCon.stroke(pe);
            } else{
                CanCon.beginPath();
                CanCon.moveTo(AnimData.X1 -P.x- -(GAME.Dx/2).toFixed(0), AnimData.Y1 -P.y- -(GAME.Dy/2).toFixed(0));
                CanCon.lineTo(AnimData.X2 -P.x- -(GAME.Dx/2).toFixed(0), AnimData.Y2 -P.y- -(GAME.Dy/2).toFixed(0));
                CanCon.stroke();
            }
            CanCon.restore();
        }

        if(Type=='laserShoot'){
            CanCon.save();
            CanCon.lineCap = 'round';
            CanCon.strokeStyle = 'rgba('+StyleData.states[Frame].color2[0]+','+StyleData.states[Frame].color2[1]+','+StyleData.states[Frame].color2[2]+','+StyleData.states[Frame].color2[3]+')';
            CanCon.lineWidth = StyleData.states[Frame].width2;
            if(O.pathD){
                var pe = new Path2D( this.build_path2D(O.pathD) );
                CanCon.stroke(pe);
            } else{
                CanCon.beginPath();
                CanCon.moveTo(AnimData.X1 -P.x- -(GAME.Dx/2).toFixed(0), AnimData.Y1 -P.y- -(GAME.Dy/2).toFixed(0));
                CanCon.lineTo(AnimData.X2 -P.x- -(GAME.Dx/2).toFixed(0), AnimData.Y2 -P.y- -(GAME.Dy/2).toFixed(0));
                CanCon.stroke();
            }
            CanCon.restore();
        }
    }

    this.build_path2D = function(path){
        var P = GAME.O[0];
        var string = '';

        for(var i=0; i<path.length; ++i){
            if(typeof (path[i])== 'string'){
                string+=path[i]+' ';
            } else {
                string+=(path[i].x -P.x- -(GAME.Dx/2).toFixed(0))+' '+(path[i].y -P.y- -(GAME.Dy/2).toFixed(0))+' ';
            }
        }
        return string;
    }


    this.getHitPattern = function(HitPat,percent){
        var R = this.HitPatterns[HitPat];
        var LastSeen = false;
        var t1 = 0;
        var t2 = 100;
        percent = parseInt(percent);
        for(var I in R){
            if(parseInt(I) <= percent && parseInt(I) >= t1) t1 = parseInt(I);
            if(parseInt(I) >= percent && parseInt(I) <= t2) t2 = parseInt(I);
        }
        if(t1==t2) return R[t1];

        var State = {};
        for(var si in R[t1]){
            if(si.substr(0,5)=='color'){
                State[si]=[];
                for(var k=0; k<3; ++k)
                    State[si][k] = R[t1][si][k]- -parseInt((R[t2][si][k]-R[t1][si][k]) * ((percent-t1) / (t2-t1)));
                State[si][3] = R[t1][si][3]- -(R[t2][si][3]-R[t1][si][3]) * ((percent-t1) / (t2-t1));
            }else if(si.substr(0,6)=='letter'){
                State[si] = R[t1][si];
            }else{
                State[si] = R[t1][si]- -((R[t2][si]-R[t1][si]) * ((percent-t1) / (t2-t1)));
            }
        }
        return State;
    }

    this.regionAnim = function(CanCon,O){
        var P = GAME.O[0];
        var Px = (-P.x- -(GAME.Dx/2));
        var Py = (-P.y- -(GAME.Dy/2));
        var AD = O.animData;
        var DR = this.directRenders[ O.animType ];
        var Radi = Math.PI*2/360;

        if(O.TT=='regionAnim'){
            // Kolor kółka
            var BU = DR;
            if(DR.frames) BU = DR.states[ O.animTick ];
            CanCon.save();
            if(DR.gradientStops){
                var Gradient = CanCon.createRadialGradient(O.x- -Px, O.y- -Py, 0, O.x- -Px, O.y- -Py, O.radius);
                for(var i=0; i<DR.gradientStops; ++i)
                    Gradient.addColorStop(BU['stop'+i],'rgba('+BU['color'+i][0]+','+BU['color'+i][1]+','+BU['color'+i][2]+','+BU['color'+i][3]+')');
                CanCon.fillStyle = Gradient;
            }else{
                CanCon.fillStyle = 'rgba('+BU.color[0]+','+BU.color[1]+','+BU.color[2]+','+BU.color[3]+')';
            }
            CanCon.beginPath();

            if(O.squareCorners){
                CanCon.moveTo( (O.squareCorners.A.x- -Px).toFixed(1), (O.squareCorners.A.y- -Py).toFixed(1) );
                CanCon.lineTo( (O.squareCorners.B.x- -Px).toFixed(1), (O.squareCorners.B.y- -Py).toFixed(1) );
                CanCon.lineTo( (O.squareCorners.C.x- -Px).toFixed(1), (O.squareCorners.C.y- -Py).toFixed(1) );
                CanCon.lineTo( (O.squareCorners.D.x- -Px).toFixed(1), (O.squareCorners.D.y- -Py).toFixed(1) );
                CanCon.lineTo( (O.squareCorners.A.x- -Px).toFixed(1), (O.squareCorners.A.y- -Py).toFixed(1) );
            }else if(O.coneAngle){
                var Angle1 = (O.angle- -O.coneAngle-90)*Radi;
                var Angle2 = (O.angle - O.coneAngle-90)*Radi;
                CanCon.arc(O.x- -Px,O.y- -Py,O.radius,Angle1,Angle2,true);
                CanCon.arc(O.x- -Px,O.y- -Py,O.coneRad2,Angle2,Angle1,false);
                CanCon.closePath();
            }else{
                CanCon.arc(O.x- -Px, O.y- -Py, O.radius, 0, Math.PI*2, true);
            }

            CanCon.fill();
            CanCon.restore();

            ++O.animTick;
            if(AD.state=='start' && O.animTick >= DR.frames){
                AD.state='norm';
                O.animType = DR.onEnd;
                AD.Next = 0;
            }
            if(AD.state=='norm' && DR.toExpire- -GAME.tick >= O.DieTime){
                AD.state='end';
                O.animType = DR.onExpire;
                AD.Next=0;
                O.animTick=0;
            }

            if(DR.makeParticles){
                AD.Next -=- O.animPole/DR.makeParticles;
                while(AD.Next > 1){
                    var PX = this.regionAnim_findParticlePlace(O);
                    if(O.particlesOnBoard){
                        PX.x-=-O.x;
                        PX.y-=-O.y;
                    }

                    if(DR.particleAnim=='randomMove'){
                        var angle = parseInt(Math.random()*360);
                        var rotation = parseInt(Math.random()*360);
                        var rotate = -1;
                        if(angle > 180) rotate=1;
                        if(DR.particleAnimAngle && DR.particleAnimAngle=='withDirection'){
                            rotation = angle -180;
                            rotate = 0;
                        }
                        if(DR.particleAnimAngle && DR.particleAnimAngle=='noRotation'){
                            rotation = 0;
                            rotate = 0;
                        }
                        AD.P[ ++AD.Plen ]={time:0,x:PX.x,y:PX.y,angle: angle, rotation: rotation, rotate:rotate, speed: 1, particleId: DR.particleId, particleTime: DR.particleTime, particleXY: DR.particleXY};
                    }
                    if(DR.particleAnim=='toCenter'){
                        var angle =  parseInt(- (Math.atan2(PX.x,PX.y)*180/Math.PI))%360;
                        AD.P[ ++AD.Plen ]={time:0,x:PX.x,y:PX.y,angle: angle, rotation: angle, rotate:0, speed: 6, particleId: DR.particleId, particleTime: DR.particleTime, particleXY: DR.particleXY};
                    }
                    if(DR.particleAnim=='onOrbit'){
                        var angle =  parseInt(- (Math.atan2(PX.x,PX.y)*180/Math.PI))%360;
                        var obwod = Math.sqrt(PX.x*PX.x- -PX.y*PX.y)*2*Math.PI;
                        var angleChange = 360/(obwod/3);
                        if(Math.random() <= 0.5){
                            angle-=90;
                        }else{
                            angle-=-90;
                            angleChange=-angleChange;
                        }
                        AD.P[ ++AD.Plen ]={time:0,x:PX.x,y:PX.y,angle: angle, angleChange: angleChange, rotation: angle, rotate: angleChange, speed: 3, particleId: DR.particleId, particleTime: DR.particleTime, particleXY: DR.particleXY};
                    }
                    if(DR.particleAnim=='withWind'){
                        var angle =  O.windAngle;
                        AD.P[ ++AD.Plen ]={time:0,x:PX.x,y:PX.y,angle: angle, rotation: angle- -270, rotate:0, speed: 2, particleId: DR.particleId, particleTime: DR.particleTime, particleXY: DR.particleXY};
                    }
                    AD.Next-=1;
                }
            }

            for(var p in AD.P){
                var T = AD.P[p];
                if(++T.time > T.particleTime){
                    delete AD.P[p];
                    continue;
                }
                T.x-=- T.speed * Math.sin( (-parseInt(T.angle)-180)*(Math.PI/180));
                T.y-=- T.speed * Math.cos( (-parseInt(T.angle)-180)*(Math.PI/180));
                T.rotation-=-T.rotate;

                CanCon.save();
                if(O.particlesOnBoard)
                    CanCon.translate((Px- -T.x).toFixed(0), (Py- -T.y).toFixed(0));
                else
                    CanCon.translate((O.x- -Px- -T.x).toFixed(0), (O.y- -Py- -T.y).toFixed(0));
                CanCon.rotate(Radi*T.rotation);
                var IMG =document.getElementById('CanvasManager_'+T.particleId+'_frame_'+T.time+'_');
                CanCon.drawImage(IMG,-T.particleXY,-T.particleXY);
                CanCon.restore();

                if(T.angleChange) T.angle-=-T.angleChange;
            }
        }

    }
    this.regionAnim_findParticlePlace = function(O){
        var DR = this.directRenders[ O.animType ];
        var x=0,y=0,dist=0,angle=0;
        var Radi = Math.PI*2/360;


        if(O.squareCorners){
            var Width = O.squareWidth;
            var xA = Math.random()*O.squareLen;
            if(DR.particleAnim=='randomMove'){
                var xA = Width*0.2- -Math.random()*(O.squareLen - Width*0.4);
                Width*=0.8;
            }
            var yA = Math.random()*Width*2 - Width;

            var aA = -(O.squareAngle- -180)*Radi;

            x = xA*Math.sin(aA) - yA*Math.cos(aA);
            y = xA*Math.cos(aA) - yA*Math.sin(aA);

        }
        else if(O.coneAngle){
            var R2=O.coneRad2;
            var R1=O.radius-R2;
            var udaloSie=true;

            if(DR.particleAnim=='randomMove'){    R2-=-R1*0.20; R1*=0.6; }
            var rad = R2- -(Math.random()*R1);
            var angle = O.angle- -(Math.random()*O.coneAngle*2 - O.coneAngle)-180;

            x = rad*Math.sin(-angle*Radi);
            y = rad*Math.cos(-angle*Radi);
        }
        else{
            var R2=0;
            var R1=O.radius;
            if(DR.particleAnim=='randomMove'){ R1*=0.75; }
            if(DR.particleAnim=='toCenter'){   R2=R1*0.4; R1*=1.2; }
            if(DR.particleAnim=='onOrbit'){    R2=R1*0.2; }
            do{
                x = parseInt(Math.random()*R1*2-R1);
                y = parseInt(Math.random()*R1*2-R1);
                dist = Math.sqrt(x*x- -y*y);
            }while(!(dist > R2 && dist < R1));
        }

        if(DR.particleAnim=='withWind'){
            x-=-30*Math.sin((O.windAngle-90)*Radi);
            y-=-30*Math.cos((O.windAngle-90)*Radi);
        }

        return {x:x,y:y};
    }
    this.simpleFilling = function(CanCon,O){
        var P = GAME.O[0];
        var Px = (-P.x- -(GAME.Dx/2));
        var Py = (-P.y- -(GAME.Dy/2));
        var Radi = Math.PI*2/360;


        CanCon.save();
        CanCon.fillStyle = O.simpleFilling;
        CanCon.beginPath();

        if(O.squareCorners){
            CanCon.moveTo( (O.squareCorners.A.x- -Px).toFixed(1), (O.squareCorners.A.y- -Py).toFixed(1) );
            CanCon.lineTo( (O.squareCorners.B.x- -Px).toFixed(1), (O.squareCorners.B.y- -Py).toFixed(1) );
            CanCon.lineTo( (O.squareCorners.C.x- -Px).toFixed(1), (O.squareCorners.C.y- -Py).toFixed(1) );
            CanCon.lineTo( (O.squareCorners.D.x- -Px).toFixed(1), (O.squareCorners.D.y- -Py).toFixed(1) );
            CanCon.lineTo( (O.squareCorners.A.x- -Px).toFixed(1), (O.squareCorners.A.y- -Py).toFixed(1) );
        }else if(O.coneAngle){
            var Angle1 = (O.angle- -O.coneAngle-90)*Radi;
            var Angle2 = (O.angle - O.coneAngle-90)*Radi;
            CanCon.arc(O.x- -Px,O.y- -Py,O.radius,Angle1,Angle2,true);
            CanCon.arc(O.x- -Px,O.y- -Py,O.coneRad2,Angle2,Angle1,false);
            CanCon.closePath();
        }else{
            CanCon.arc(O.x- -Px, O.y- -Py, O.radius, 0, Math.PI*2, true);
        }

        CanCon.fill();
        CanCon.restore();
    }
}
