function CanvasManagerObject(){
    this.C = {};

    this.start = function(){
        $('#CanvasPreviews').html('');

        this.renderNeeded();
        this.prepareDirectRenders();
    }

    this.canvasId = function(O){
        var ID = '';
        ID+=O.T+'_';
        if(O.viewLetter)         ID+=O.viewLetter+'_';
        // if(O.viewShape)         ID+=O.viewShape+'_';
        if(O.viewColor)         ID+=O.viewColor+'_';
        // if(O.viewXY)             ID+=O.viewXY+'_';
        if(O.viewLetterSize)    ID+=O.viewLetterSize+'_';
        if(O.viewGlobalAlpha)    ID+=O.viewGlobalAlpha+'_';
        if(O.viewAngle)         ID+=O.viewAngle+'_';
        if(typeof O.timeTick !='undefined')
                                ID+='frame_'+O.timeTick+'_';
        if(O.viewHitPattern && O.life < O.lifeM)
                                ID+='life_'+O.life+'_';
        return ID;
    }

    this.getCanvas = function(O){
        var ID = this.canvasId(O);
        return this.C[ID];
    }

    this.requestCanvas = function(o){
        var O = GAME.O[o];
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

        if(O.viewXY)
            X2 = Y2 = O.viewXY;

        var X = Canvas.X = parseInt(X2/2);
        var Y = Canvas.Y = parseInt(Y2/2);


        if(O.viewLetterSizeYoffset)
            Y -=- O.viewLetterSizeYoffset;

        $('#CanvasPreviews').append('<canvas id="CanvasManager_'+ID+'" width="'+X2+'" height="'+Y2+'"></canvas>');
        Canvas.Id = document.getElementById('CanvasManager_'+ID);
        var CanCon = Canvas.Id.getContext('2d');

        if(O.viewGlobalAlpha){
            CanCon.globalAlpha = O.viewGlobalAlpha / 10;
        }

        var State = {};
        if(O.viewHitPattern && O.life < O.lifeM)
            State = this.getHitPattern(O.viewHitPattern, parseInt((O.life/O.lifeM)*100));

        if(typeof O.backgroundCircle != 'undefined'){
            CanCon.fillStyle = 'yellow';
            if(O.colorCircle) CanCon.fillStyle = 'rgba('+O.colorCircle[0]+','+O.colorCircle[1]+','+O.colorCircle[2]+','+O.colorCircle[3]+')';
            if(State.colorCircle) CanCon.fillStyle = 'rgba('+State.colorCircle[0]+','+State.colorCircle[1]+','+State.colorCircle[2]+','+State.colorCircle[3]+')';
            CanCon.beginPath();
            CanCon.arc(X, Y, O.backgroundCircle, 0, Math.PI*2, true);
            CanCon.fill();

        }

        if(typeof O.viewLetter != 'undefined'){
            CanCon.font = "bold "+O.viewLetterSize+"px Arial";
            CanCon.textAlign = 'center';
            CanCon.textBaseline = 'middle';
            CanCon.fillStyle = O.viewColor;
            CanCon.translate(X,Y);
            if(O.colorFill) CanCon.fillStyle = 'rgba('+O.colorFill[0]+','+O.colorFill[1]+','+O.colorFill[2]+','+O.colorFill[3]+')';
            if(State.colorFill) CanCon.fillStyle = 'rgba('+State.colorFill[0]+','+State.colorFill[1]+','+State.colorFill[2]+','+State.colorFill[3]+')';

            if(!isNaN(O.viewLetter)){
                CanCon.fillText(String.fromCharCode(O.viewLetter), 0, 0);
            }else{
                CanCon.fillText(O.viewLetter, 0, 0);
            }
        }

                    // 100:{letterAdd:'A',colorLetterAdd:[255,0,0,1],SizeLetterAdd:10,YOffsetLetterAdd:10},

        if(typeof State.letterAdd != 'undefined'){
            CanCon.font = "bold "+State.SizeLetterAdd+"px Arial";
            CanCon.textAlign = 'center';
            CanCon.textBaseline = 'middle';
            if(O.viewAngle)
                CanCon.rotate(-O.viewAngle*(Math.PI/180));
            if(State.colorLetterAdd) CanCon.fillStyle = 'rgba('+State.colorLetterAdd[0]+','+State.colorLetterAdd[1]+','+State.colorLetterAdd[2]+','+State.colorLetterAdd[3]+')';
            var Y7 = 0;
            if(State.YOffsetLetterAdd)
                Y7-=-State.YOffsetLetterAdd;

            if(!isNaN(State.letterAdd)){
                CanCon.fillText(String.fromCharCode(State.letterAdd), 0, Y7);
            }else{
                CanCon.fillText(State.letterAdd, 0, Y7);
            }
        }

        if(typeof O.viewLIBpath != 'undefined'){
            CanCon.fillStyle = O.viewColor;
            if(State.colorFill) CanCon.fillStyle = 'rgba('+State.colorFill[0]+','+State.colorFill[1]+','+State.colorFill[2]+','+State.colorFill[3]+')';

            var svgD='';
            var pathSize=O.viewPathSize/1000;
            var XYoffset = parseInt((X2 - O.viewPathSize)/2);
            var PATH = this.LIB[ O.viewLIBpath ];
            for(var s=0; s<PATH.length;++s)
                if(isNaN(PATH[s]))    svgD+=PATH[s]+' ';
                        else         svgD+=((PATH[s]*pathSize).toFixed(2))+' ';
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

    this.LIB={
        StarPath:['M',94,',',832,'C',163,',',755,234,',',681,309,',',611,'C',338,',',582,357,',',564,364,',',556,'C',340,',',553,272,',',537,160,',',509,'C',79,',',489,25,',',474,0,',',467,'L',84,',',213,'C',209,',',264,320,',',319,419,',',380,'C',396,',',225,384,',',98,384,',',0,'L',638,',',0,'C',638,',',69,626,',',197,600,',',383,'C',619,',',376,660,',',357,723,',',328,'C',809,',',288,888,',',255,961,',',227,'L',1036,',',485,'C',931,',',508,808,',',532,669,',',555,'L',840,',',748,'C',874,',',787,901,',',819,921,',',843,'L',703,',',990,'L',510,',',671,'C',452,',',774,385,',',884,310,',',1000,'z'],
    };

    this.neededRenders={
        hit:{
            viewLIBpath: 'StarPath', // *
            frames: 25,
            sizeX: 60,
            sizeY: 60,
            states:{
                0:{pathSize: 5, color: [255,255,255,1]},
                10:{pathSize: 15, color: [255,255,0,1]},
                24:{pathSize: 30, color: [255,0,0,1]},
            }
        },
        hit_blue:{
            viewLIBpath: 'StarPath', // *
            frames: 25,
            sizeX: 60,
            sizeY: 60,
            states:{
                0:{pathSize: 5, color: [255,255,255,1]},
                10:{pathSize: 15, color: [173,216,230,1]},
                24:{pathSize: 30, color: [0,0,255,1]},
            }
        },
        hit_energyField:{
            viewLIBpath: 'StarPath', // *
            frames: 25,
            sizeX: 60,
            sizeY: 60,
            states:{
                0:{pathSize: 5, color: [0,255,0,1]},
                10:{pathSize: 15, color: [128,255,128,1]},
                24:{pathSize: 30, color: [255,255,255,1]},
            }
        },
        hitBig:{
            viewLIBpath: 'StarPath', // *
            frames: 21,
            sizeX: 140,
            sizeY: 140,
            states:{
                0:{pathSize: 5, color: [255,255,255,1]},
                10:{pathSize: 80, color: [255,255,0,1]},
                20:{pathSize: 120, color: [255,0,0,1]},
            }
        },
        hit_healing:{
            viewLIBpath: 'StarPath', // *
            frames: 25,
            sizeX: 30,
            sizeY: 30,
            states:{
                0:{pathSize: 5, color: [128,255,128,1]},
                12:{pathSize: 12, color: [0,255,0,1]},
                24:{pathSize: 20, color: [0,128,0,1]},
            }
        },
        explosion_35:{
            viewLIBpath: 'StarPath', // *
            frames: 25,
            sizeX: 80,
            sizeY: 80,
            smallStars: 6,
            states:{
                0:{pathSize: 10, circleRadius: 5, color: [255,255,255,1], color2: [255,255,255,1], smallStarSize: 5, color3: [255,255,255,1]},
                3:{pathSize: 27, circleRadius: 13, color: [255,255,128,1], color2: [255,255,128,1], smallStarSize: 15, color3: [255,255,0,1]},
                7:{pathSize: 45, circleRadius: 20, color: [255,255,0,1], color2: [255,255,0,0.5], smallStarSize: 25, color3: [255,0,0,1]},
                14:{pathSize: 78, circleRadius: 35, color: [255,0,0,1], color2: [255,0,0,1]},
                24:{pathSize: 78, circleRadius: 35, color: [128,0,0,0.3], color2: [128,0,0,0]},
            }
        },
        explosion_80:{
            viewLIBpath: 'StarPath', // *
            frames: 25,
            sizeX: 180,
            sizeY: 180,
            smallStars: 6,
            states:{
                0:{pathSize: 10, circleRadius: 5, color: [255,255,255,1], color2: [255,255,255,1], smallStarSize: 10, color3: [255,255,255,1]},
                3:{pathSize: 50, circleRadius: 25, color: [255,255,128,1], color2: [255,255,128,1], smallStarSize: 25, color3: [255,255,0,1]},
                7:{pathSize: 90, circleRadius: 40, color: [255,255,0,1], color2: [255,255,0,0.5], smallStarSize: 40, color3: [255,0,0,1]},
                14:{pathSize: 176, circleRadius: 80, color: [255,0,0,1], color2: [255,0,0,1]},
                24:{pathSize: 176, circleRadius: 80, color: [128,0,0,0.3], color2: [128,0,0,0]},
            }
        },
        explosion_120:{
            viewLIBpath: 'StarPath', // *
            frames: 25,
            sizeX: 260,
            sizeY: 260,
            smallStars: 6,
            states:{
                0:{pathSize: 10, circleRadius: 5, color: [255,255,255,1], color2: [255,255,255,1], smallStarSize: 10, color3: [255,255,255,1]},
                3:{pathSize: 65, circleRadius: 30, color: [255,255,128,1], color2: [255,255,128,1], smallStarSize: 45, color3: [255,255,0,1]},
                7:{pathSize: 120, circleRadius: 50, color: [255,255,0,1], color2: [255,255,0,0.5], smallStarSize: 80, color3: [255,0,0,1]},
                14:{pathSize: 250, circleRadius: 120, color: [255,0,0,1], color2: [255,0,0,1]},
                24:{pathSize: 250, circleRadius: 120, color: [128,0,0,0.3], color2: [128,0,0,0]},
            }
        },
        explosion_210:{
            viewLIBpath: 'StarPath', // *
            frames: 25,
            sizeX: 460,
            sizeY: 460,
            smallStars: 6,
            states:{
                0:{pathSize: 10, circleRadius: 5, color: [255,255,255,1], color2: [255,255,255,1], smallStarSize: 10, color3: [255,255,255,1]},
                3:{pathSize: 115, circleRadius: 65, color: [255,255,128,1], color2: [255,255,128,1], smallStarSize: 65, color3: [255,255,0,1]},
                7:{pathSize: 220, circleRadius: 125, color: [255,255,0,1], color2: [255,255,0,0.5], smallStarSize: 120, color3: [255,0,0,1]},
                14:{pathSize: 450, circleRadius: 210, color: [255,0,0,1], color2: [255,0,0,1]},
                24:{pathSize: 450, circleRadius: 210, color: [128,0,0,0.3], color2: [128,0,0,0]},
            }
        },
        des_field:{
            viewLIBpath: 'StarPath', // *
            frames: 60,
            sizeX: 70,
            sizeY: 70,
            states:{
                0:{pathSize: 5, color: [255,0,0,0.8]},
                20:{pathSize: 30, color: [255,0,0,0.4]},
                60:{pathSize: 70, color: [255,0,0,0]},
            }
        },
        grav_field:{
            viewLetter: 'G',
            frames: 20,
            sizeX: 50,
            sizeY: 50,
            states:{
                0:{fontSize: 50, color: [30,30,30,0.8]},
                10:{fontSize: 15, color: [30,30,30,0.8]},
                20:{fontSize: 10, color: [100,100,100,0.8]},
            }
        },
        wind_field:{
            viewLetter: 'W',
            frames: 40,
            sizeX: 30,
            sizeY: 30,
            states:{
                0:{fontSize: 5, color: [30,30,30,0.2]},
                20:{fontSize: 25, color: [100,100,100,0.4]},
                40:{fontSize: 5, color: [30,30,30,0.2]},
            }
        },
        ele_field:{
            viewLetter: 8623,    // pr�d
            frames: 40,
            sizeX: 40,
            sizeY: 40,
            states:{
                0:{fontSize: 5, color: [0,120,255,0.2]},
                20:{fontSize: 35, color: [0,120,255,0.7]},
                40:{fontSize: 5, color: [0,120,255,0,0.2]},
            }
        },
        heal_field:{
            viewLetter: '+',
            frames: 40,
            sizeX: 50,
            sizeY: 50,
            states:{
                0:{fontSize: 5, color: [0,255,0,0.2]},
                20:{fontSize: 50, color: [0,255,0,0.7]},
                40:{fontSize: 10, color: [0,255,0,1]},
            }
        },
    };

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

                if(GET['DEBUG']){ CanCon.strokeStyle='white'; CanCon.beginPath();    CanCon.moveTo(0,Y1); CanCon.lineTo(X2,Y1); CanCon.stroke(); CanCon.beginPath();    CanCon.moveTo(X1,0); CanCon.lineTo(X1,Y2); CanCon.stroke(); }



                if(typeof R.states[i].circleRadius != 'undefined'){
                    CanCon.save();
                    CanCon.fillStyle = "rgba("+R.states[i].color2[0]+","+R.states[i].color2[1]+","+R.states[i].color2[2]+","+R.states[i].color2[3]+")";
                    CanCon.beginPath();
                    CanCon.arc(X1,Y,R.states[i].circleRadius,0,Math.PI*2,true);
                    CanCon.fill();
                    CanCon.restore();
                }

                if(typeof R.viewLetter != 'undefined'){
                    CanCon.save();
                    CanCon.font = "bold "+R.states[i].fontSize+"px Arial";
                    CanCon.textAlign = 'center';
                    CanCon.textBaseline = 'middle';
                    CanCon.fillStyle = "rgba("+R.states[i].color[0]+","+R.states[i].color[1]+","+R.states[i].color[2]+","+R.states[i].color[3]+")";
                    if(!isNaN(R.viewLetter)){
                        CanCon.fillText(String.fromCharCode(R.viewLetter), X1, Y);
                    }else{
                        CanCon.fillText(R.viewLetter, X1, Y);
                    }
                    CanCon.restore();
                }
                if(typeof R.viewLIBpath != 'undefined'){
                    var svgD='';
                    var pathSize=R.states[i].pathSize/1000;
                    var XYoffset = parseInt((X2 - R.states[i].pathSize)/2);
                    var PATH = this.LIB[ R.viewLIBpath ];
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

    this.directRenders={
        TP_track:{
            frames: 18,
            states:{
                0:{ width: 1, color: [0,0,255,1]},
                8:{ width: 4, color: [128,128,255,1]},
                17:{ width: 2, color: [255,255,255,1]}
            },
        },
        laserShoot:{
            frames: 12,
            states:{
                0:{ width2: 2, color2: [0,0,255,1], color: [0,0,0,0], width: 4},
                5:{ width2: 8, color2: [128,128,255,1], color: [255,255,255,0.5], width: 10},
                11:{ width2: 4, color2: [255,255,255,1], color: [255,255,255,0.1], width: 12}
            },
        },
        DestrFieldStart:{
            frames: 15,
            states:{
                0:{color:[255,0,0,0]},
                15:{color:[255,0,0,0.3]},
            },
            onEnd:'DestrFieldGoing',
            makeParticles:7,
            particleId:'des_field',
            particleTime:59,
            particleXY: 35,
            particleAnim:'randomMove',
        },
        DestrFieldGoing:{
            color:[255,0,0,0.3],
            makeParticles:60,
            particleId:'des_field',
            particleTime:59,
            particleXY: 35,
            particleAnim:'randomMove',
            onExpire:'DestrFieldEnd',
            toExpire:50,
        },
        DestrFieldEnd:{
            frames: 50,
            states:{
                0:{color:[255,0,0,0.3]},
                37:{color:[255,0,0,0.1]},
                50:{color:[255,0,0,0]},
            },
        },
        GravFieldStart:{
            frames: 15,
            gradientStops: 4,
            states:{
                0:{color0:[180,180,255,0],        color1:[180,180,180,0],        color2:[180,180,180,0],        color3:[0,0,0,0],    stop0:0,stop1:0.1,stop2:0.2,stop3:1},
                15:{color0:[180,180,255,0.2],    color1:[180,180,180,0.1],    color2:[180,180,180,0.1],    color3:[0,0,0,0],    stop0:0.15,stop1:0.85,stop2:1,stop3:1},
            },
            onEnd:'GravFieldGoing',
            makeParticles:30,
            particleId:'grav_field',
            particleTime:19,
            particleXY: 25,
            particleAnim:'toCenter',
        },
        GravFieldGoing:{
            gradientStops: 4,
            color0:[180,180,255,0.2],    color1:[180,180,180,0.1],    color2:[180,180,180,0.1],    color3:[0,0,0,0],    stop0:0.15,stop1:0.85,stop2:1,stop3:1,
            makeParticles:40,
            particleId:'grav_field',
            particleTime:19,
            particleXY: 25,
            particleAnim:'toCenter',
            onExpire:'GravFieldEnd',
            toExpire:50,
        },
        GravFieldEnd:{
            frames: 50,
            gradientStops: 4,
            states:{
                0:{color0:[180,180,255,0.2],    color1:[180,180,180,0.1],    color2:[180,180,180,0.1],    color3:[0,0,0,0],    stop0:0.15,stop1:0.85,stop2:1,stop3:1},
                40:{color0:[180,180,255,0.2],    color1:[180,180,180,0.1],    color2:[180,180,180,0.1],    color3:[0,0,0,0],    stop0:0.7,stop1:1,stop2:1,stop3:1},
                50:{color0:[180,180,255,0],        color1:[180,180,180,0],        color2:[180,180,180,0],        color3:[0,0,0,0],    stop0:1,stop1:1,stop2:1,stop3:1},
            },
        },
        OrbFieldStart:{
            frames: 15,
            gradientStops: 4,
            states:{
                0:{color0:[180,180,255,0],        color1:[180,180,180,0],        color2:[180,180,180,0],        color3:[0,0,0,0],    stop0:0,stop1:0.1,stop2:0.2,stop3:1},
                15:{color0:[180,180,255,0.2],    color1:[180,180,180,0.1],    color2:[180,180,180,0.1],    color3:[0,0,0,0],    stop0:0.15,stop1:0.85,stop2:1,stop3:1},
            },
            onEnd:'OrbFieldGoing',
            makeParticles:30,
            particleId:'wind_field',
            particleTime:30,
            particleXY: 15,
            particleAnim:'onOrbit',
        },
        OrbFieldGoing:{
            gradientStops: 4,
            color0:[180,180,255,0.2],    color1:[180,180,180,0.1],    color2:[180,180,180,0.1],    color3:[0,0,0,0],    stop0:0.15,stop1:0.85,stop2:1,stop3:1,
            makeParticles:40,
            particleId:'wind_field',
            particleTime:30,
            particleXY: 15,
            particleAnim:'onOrbit',
            onExpire:'OrbFieldEnd',
            toExpire:50,
        },
        OrbFieldEnd:{
            frames: 50,
            gradientStops: 4,
            states:{
                0:{color0:[180,180,255,0.2],    color1:[180,180,180,0.1],    color2:[180,180,180,0.1],    color3:[0,0,0,0],    stop0:0.15,stop1:0.85,stop2:1,stop3:1},
                40:{color0:[180,180,255,0.2],    color1:[180,180,180,0.1],    color2:[180,180,180,0.1],    color3:[0,0,0,0],    stop0:0.7,stop1:1,stop2:1,stop3:1},
                50:{color0:[180,180,255,0],        color1:[180,180,180,0],        color2:[180,180,180,0],        color3:[0,0,0,0],    stop0:1,stop1:1,stop2:1,stop3:1},
            },
        },
        WindFieldStart:{
            frames: 15,
            states:{
                0:{color:[80,80,80,0]},
                15:{color:[80,80,80,0.2]},
            },
            onEnd:'WindFieldGoing',
            makeParticles:30,
            particleId:'wind_field',
            particleTime:30,
            particleXY: 15,
            particleAnim:'withWind',
        },
        WindFieldGoing:{
            color:[80,80,80,0.2],
            makeParticles:80,
            particleId:'wind_field',
            particleTime:30,
            particleXY: 15,
            particleAnim:'withWind',
            onExpire:'WindFieldEnd',
            toExpire:20,
        },
        WindFieldEnd:{
            frames: 20,
            states:{
                0:{color:[80,80,80,0.2]},
                20:{color:[80,80,80,0]},
            },
        },
        ShellFieldStart:{
            frames: 15,
            gradientStops: 3,
            states:{
                0:{color0:[255,255,0,0],    color1:[255,255,0,0.4],    color2:[255,255,0,0],    stop0:0.1,stop1:0.3,stop2:1},
                15:{color0:[255,255,0,0.1],    color1:[255,255,0,0.8],    color2:[255,255,0,0.2],    stop0:0.60,stop1:1,stop2:1},
            },
            onEnd:'ShellFieldGoing',
        },
        ShellFieldGoing:{
            gradientStops: 3,
            color0:[255,255,0,0.05],    color1:[255,255,0,0.3],    color2:[255,255,0,0.2],    stop0:0.60,stop1:1,stop2:1,
            onExpire:'ShellFieldEnd',
            toExpire:20,
        },
        ShellFieldEnd:{
            frames: 20,
            gradientStops: 3,
            states:{
                0:{color0:[255,255,0,0.1],    color1:[255,255,0,0.8],    color2:[255,255,0,0.2],    stop0:0.75,stop1:1,stop2:1},
                40:{color0:[255,255,0,0.2],    color1:[255,255,0,0.1],    color2:[255,255,0,0.1],    stop0:0.7,stop1:1,stop2:1},
                50:{color0:[255,255,0,0],    color1:[255,255,0,0],    color2:[255,255,0,0],    stop0:1,stop1:1,stop2:1},
            },
        },
        EleFieldStart:{
            frames: 15,
            gradientStops: 3,
            states:{
                0:{color0:[0,120,255,0],    color1:[0,120,255,0.4],    color2:[0,120,255,0],    stop0:0.1,stop1:0.3,stop2:1},
                15:{color0:[0,120,255,0.1],    color1:[0,120,255,0.6],    color2:[0,120,255,0.2],    stop0:0.3,stop1:1,stop2:1},
            },
            makeParticles:80,
            particleId:'ele_field',
            particleTime:30,
            particleXY: 20,
            particleAnim:'randomMove',
            particleAnimAngle: 'withDirection',
            onEnd:'EleFieldGoing',
        },
        EleFieldGoing:{
            gradientStops: 3,
            color0:[0,120,255,0.05],    color1:[0,120,255,0.6],    color2:[0,120,255,0.2],    stop0:0.3,stop1:1,stop2:1,
            makeParticles:80,
            particleId:'ele_field',
            particleTime:30,
            particleXY: 20,
            particleAnim:'randomMove',
            particleAnimAngle: 'withDirection',
            onExpire:'EleFieldEnd',
            toExpire:20,
        },
        EleFieldEnd:{
            frames: 25,
            gradientStops: 4,
            states:{
                0:{color0:[0,120,255,0.1],    color1:[0,120,255,0.6],    color2:[0,120,255,0.2],    color3:[0,0,0,0], stop0:0.3,stop1:1,stop2:1,stop3:1},
                12:{color0:[0,120,255,0.2],    color1:[0,120,255,0.1],    color2:[0,120,255,0.1],    color3:[0,0,0,0], stop0:0.2,stop1:0.4,stop2:0.6,stop3:0.6},
                25:{color0:[0,120,255,0],    color1:[0,120,255,0],    color2:[0,120,255,0],    color3:[0,0,0,0], stop0:0.1,stop1:0.1,stop2:0.2,stop3:0.2},
            },
        },
        HealFieldStart:{
            frames: 15,
            gradientStops: 3,
            states:{
                0:{color0:[0,255,0,0],    color1:[0,0,0,0], color2:[0,0,0,0],    stop0:0.1,stop1:0.1,stop2:0.2},
                15:{color0:[100,255,100,0.4], color1:[100,255,100,0.1], color2:[0,0,0,0], stop0: 0, stop1: 0.8, stop2: 1},
            },
            makeParticles:80,
            particleId:'heal_field',
            particleTime:30,
            particleXY: 25,
            particleAnim:'randomMove',
            particleAnimAngle: 'noRotation',
            onEnd:'HealFieldGoing',
        },
        HealFieldGoing:{
            gradientStops: 2,
            color0:[100,255,100,0.4], color1:[100,255,100,0.1], stop0: 0, stop1: 0.8,
            makeParticles:80,
            particleId:'heal_field',
            particleTime:30,
            particleXY: 25,
            particleAnim:'randomMove',
            particleAnimAngle: 'noRotation',
            onExpire:'HealFieldEnd',
            toExpire:20,
        },
        HealFieldEnd:{
            frames: 25,
            gradientStops: 3,
            states:{
                0:{color0:[100,255,100,0.4], color1:[100,255,100,0.1], color2:[0,0,0,0], stop0: 0, stop1: 0.8, stop2: 1},
                25:{color0:[0,255,0,0],    color1:[0,0,0,0], color2:[0,0,0,0],    stop0:0.1,stop1:0.1,stop2:0.2},
            },
        },
    };
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

        if(Type=='TP_track' || Type=='laserShoot'){
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

    this.HitPatterns ={
        HullFire_20:{
            100:{},
            99:{letterAdd:'A',colorLetterAdd:[255,40,0,1],SizeLetterAdd:5,YOffsetLetterAdd:10},
            1:{letterAdd:'A',colorLetterAdd:[255,40,0,1],SizeLetterAdd:25,YOffsetLetterAdd:20},
            0:{colorFill:[68,68,68,1]},
        },
        HullFire_40:{
            100:{},
            99:{letterAdd:'A',colorLetterAdd:[255,40,0,1],SizeLetterAdd:5,YOffsetLetterAdd:10},
            1:{letterAdd:'A',colorLetterAdd:[255,40,0,1],SizeLetterAdd:40,YOffsetLetterAdd:20},
            0:{colorFill:[68,68,68,1]},
        },
        HullFire_80:{
            100:{},
            99:{letterAdd:'A',colorLetterAdd:[255,40,0,1],SizeLetterAdd:10,YOffsetLetterAdd:35},
            1:{letterAdd:'A',colorLetterAdd:[255,40,0,1],SizeLetterAdd:65,YOffsetLetterAdd:35},
            0:{colorFill:[68,68,68,1]},
        },
        StarHit:{
            100:{colorFill:[255,255,255,1]},
            60:{colorFill:[255,255,0,1]},
            1:{colorFill:[255,0,0,1]},
            0:{colorFill:[68,68,68,1]}
        },
        ShieldBlobHit:{
            100:{colorCircle:[0,200,100,1],colorFill:[0,255,200,1]},
            1:{colorCircle:[0,200,100,0.2],colorFill:[0,255,200,0.1]},
            0:{colorCircle:[0,200,100,0.2],colorFill:[0,255,200,0.1]}
        },
    };
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
            // Kolor koka
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
            if(DR.particleAnim=='randomMove'){    R1*=0.75; }
            if(DR.particleAnim=='toCenter'){    R2=R1*0.4; R1*=1.2; }
            if(DR.particleAnim=='onOrbit'){        R2=R1*0.2; }
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
