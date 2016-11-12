function MenuStarMapObject(){

    this.Canvas = false;
    this.intervalId = false;

    this.width = 0;
    this.height = 0;
    this.mapX = 0;
    this.mapY = 0;

    this.clickX = false;
    this.clickY = false;

    this.StarMap = {};

    this.tick = 0;

    this.makeMenuStars = function(){
        this.prepareStarMap();

        this.Canvas = document.getElementById('starMap').getContext('2d');

        $('#starMap').on('mousedown',function(e){ MENU.SM.mouseDown(e); });
        $('#starMap').on('mousemove',function(e){ MENU.SM.mouseMove(e); });
        $('#starMap').on('mouseup',function(e){ MENU.SM.mouseUp(e); });
        $('#starMap').on('mouseleave',function(e){ MENU.SM.mouseUp(e); });

        this.resize();
        this.frame();
        this.startAnimation();

    }


    this.resize = function(){
        this.width = $('#starMap').width();
        this.height = $('#starMap').height();

        $('#starMap').attr({width: this.width+'px',height: this.height+'px'});
    }

    this.startAnimation = function(){
        this.intervalId = setInterval(function(){ MENU.SM.frame(); }, 33);
    }
    this.stopAnimation = function(){
        stopInterval(this.intervalId);
        this.intervalId = false;
    }


    this.mouseDown = function(e){
        this.dragStart(e.offsetX, e.offsetY);
    }
    this.mouseMove = function(e){
        if(this.clickX===false){
            this.checkMouseOver(e.offsetX,e.offsetY);
        }else{
            this.dragMove(e.offsetX, e.offsetY);
        }
    }
    this.mouseUp = function(e){
        this.dragStop();
    }
    this.dragStart = function(x,y){
        this.clickX = x;
        this.clickY = y;
    }
    this.dragMove = function(x,y){
        var vX = x - this.clickX;
        var vY = y - this.clickY;

        this.moveCanvas(vX,vY);

        this.clickX = x;
        this.clickY = y;
    }
    this.dragStop = function(){
        this.clickX = false;
    }

    this.chooseMap = function(){

    }
    this.moveCanvas = function(x,y){
        this.mapX-=-x;
        this.mapY-=-y;
    }
    this.checkMouseOver = function(ex,ey){
        var x = ex- -this.mapX - this.width/2;
        var y = ey- -this.mapY - this.height/2;

        for(var s in this.StarMap){
            var S = this.StarMap[s];
            var xx = S.x-x;
            var yy = S.y-y;
            // console.log(Math.sqrt(xx*xx- -yy*yy));

            if(Math.sqrt(xx*xx- -yy*yy) <= S.mouseRadius){
                console.log(s);
            }
        }

    }



    this.prepareStarMap = function(){
        this.StarMap = {};

        var noMapY = 0;

        for(var m in BBAdata['MAPS']){
            var M = BBAdata['MAPS'][m];
            if(M.StarMap){
                // here we check if its visible
                // ...
                this.StarMap[m] = cloneObj(M.StarMap);
                this.StarMap[m].t = 'map';
                // here we can add some state to it (like convuered)
                // ...
            }else{
                this.StarMap[m]={
                    x: -400,
                    y: noMapY*30,
                    t: 'simple',
                    name: m,
                    mapName: m,
                };
                ++noMapY;
            }
        }
    }

    this.frame = function(){
        ++this.tick;

        this.Canvas.fillStyle = 'black';
        this.Canvas.fillRect(0,0,this.width,this.height);

        var centerX = parseInt(this.width/2- -this.mapX);
        var centerY = parseInt(this.height/2- -this.mapY);

        for(var s in this.StarMap){
            var S = this.StarMap[s];

            if(S.t=='simple'){
                this.Canvas.font="20px Arial";
                this.Canvas.fillStyle = 'white';
                if(S.name.substr(0,2)=='Lx'){
                    this.Canvas.fillText(String.fromCharCode(parseInt(S.name.substr(2))), centerX- -S.x, centerY- -S.y);
                }else{
                    this.Canvas.fillText(S.name, centerX- -S.x, centerY- -S.y);
                }
            }

            if(S.t=='map'){
                this.Canvas.save();
                this.Canvas.translate(centerX- -S.x, centerY- -S.y);

                for(var a in S.Anims){
                    var A = S.Anims[a];

                    this.Canvas.save();
                    if(A.t=='static'){
                        this.Canvas.translate(A.x, A.y);
                        this.Canvas.rotate(A.q/180*Math.PI);
                    }
                    if(A.t=='around'){
                        var cr = ((A.qStart- -A.qV*this.tick)%360) / 180*Math.PI;
                        var cx = A.x- -A.r*Math.cos(cr);
                        var cy = A.y- -A.r*Math.sin(cr);
                        this.Canvas.translate(cx,cy);
                        this.Canvas.rotate(cr- -(A.qDir/180*Math.PI));
                    }

                    this.Canvas.fillStyle = A.color;

                    if(typeof A.LIBpath != 'undefined'){
                        var svgD='';
                        var pathSize=A.size/1000;
                        var XYoffset = parseInt(-A.size/2);
                        var PATH = BBAdata.pathLIB[ A.LIBpath ];
                        for(var s=0; s<PATH.length;++s)
                            if(isNaN(PATH[s])) svgD+=PATH[s]+' ';
                                    else       svgD+=((PATH[s]*pathSize).toFixed(2))+' ';
                        var svgObj = new Path2D(svgD);
                        this.Canvas.translate(XYoffset,XYoffset);
                        this.Canvas.fill(svgObj);
                    }
                    if(typeof A.letter != 'undefined'){
                        this.Canvas.font="bold "+A.size+"px Arial";
                        this.Canvas.textAlign = 'center';
                        this.Canvas.textBaseline = 'middle';
                        this.Canvas.fillText(A.letter, 0, 0);

                    }


                    this.Canvas.restore();
                }
                this.Canvas.restore();
            }
        }

    }

    this.drawCross = function(){    // to remove later
        this.Canvas.strokeStyle = '#ffffff';
        this.Canvas.beginPath();
        this.Canvas.moveTo(-12,0);
        this.Canvas.lineTo( 12,0);
        this.Canvas.stroke();

        this.Canvas.beginPath();
        this.Canvas.moveTo(0,-12);
        this.Canvas.lineTo(0, 12);
        this.Canvas.stroke();
    }
}
