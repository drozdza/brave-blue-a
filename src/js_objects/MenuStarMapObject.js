function MenuStarMapObject(){

    this.Canvas = false;
    this.intervalId = false;
    this.tick = 0;

    this.width = 0;
    this.height = 0;
    this.mapX = 0;
    this.mapY = 0;

    this.clickX = false;
    this.clickY = false;
    this.mouseOverMap = false;
    this.choosenMap = false;
    this.choosenMapMenu = false;

    this.RAD = Math.PI/180;

    this.StarMap = {};

    this.centerX = 0;
    this.centerY = 0;

    this.makeMenuStars = function(){
        this.prepareStarMap();

        this.Canvas = document.getElementById('starMap').getContext('2d');

        this.startAnimation();
    }


    this.resize = function(){
        this.width = $(window).width();
        this.height = $(window).height();

        $('#starMap').attr({width: this.width+'px',height: this.height+'px'}).css({width: this.width+'px',height: this.height+'px'});
    }

    this.startAnimation = function(){
        this.intervalId = setInterval(function(){ MENU.SM.frame(); }, 33);
        this.resize();
        this.prepareStarMap();
        this.frame();

        $('#starMap')
            .on('mousedown',function(e){ MENU.SM.mouseDown(e); })
            .on('mousemove',function(e){ MENU.SM.mouseMove(e); })
            .on('mouseup',function(e){ MENU.SM.mouseUp(e); })
            .on('mouseleave',function(e){ MENU.SM.mouseUp(e); })
        $('#starMapContainer')
            .on('click','.startGame', function(){ MENU.SM.startMap(); })
            .on('click','.winGame', function(){ MENU.SM.winMap(); });
        $(window).on('resize', function(){ MENU.SM.resize(); });
    }
    this.stopAnimation = function(){
        clearInterval(this.intervalId);
        this.intervalId = false;

        $('#starMap').unbind('mousedown');
        $('#starMap').unbind('mouseup');
        $('#starMap').unbind('mousemove');
        $('#starMap').unbind('mouseleave');
        $('#starMapContainer').unbind('click');
    }


    this.mouseDown = function(e){
        if(this.mouseOverMap === false){
            this.dragStart(e.offsetX, e.offsetY);
            this.choosenMap = false;
            this.choosenMapMenu = false;
            $('.starMapInfo').remove();
        }else{
            this.createTeleportJump(MENU.CM.currentLevel, this.mouseOverMap);
            this.choosenMap = this.mouseOverMap;
            MENU.CM.currentLevel = this.mouseOverMap;
            this.mouseOverMap = false;
        }
    }
    this.mouseMove = function(e){
        if(this.clickX === false){
            this.checkMouseOver(e.offsetX, e.offsetY);
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

    this.startMap = function(){
        if(this.choosenMap !== false){
            MENU.startMap(this.choosenMap);
            this.choosenMap = false;
            this.choosenMapMenu = false;
            $('.starMapInfo').remove();
        }
    }
    this.winMap = function(){
        if(this.choosenMap !== false){
            MENU.CM.autoCompleteLevel(this.choosenMap);
            this.choosenMap = false;
            this.choosenMapMenu = false;
            $('.starMapInfo').remove();
        }
    }
    this.moveCanvas = function(x,y){
        this.mapX-=-x;
        this.mapY-=-y;
    }
    this.checkMouseOver = function(ex,ey){
        var x = ex - this.mapX - this.width/2;
        var y = ey - this.mapY - this.height/2;

        for(var s in this.StarMap){
            var S = this.StarMap[s];
            if(!S.avaliable && MENU.CM.currentLevel != s) continue;
            var xx = S.x-x;
            var yy = S.y-y;

            if(Math.sqrt(xx*xx- -yy*yy) <= S.mouseRadius){
                if(s != this.choosenMap)
                    this.mouseOverMap = s;
                return true;
            }
        }
        this.mouseOverMap = false;
    }






    this.prepareStarMap = function(){
        this.StarMap = {};

        var noMapY = 0;

        for(var m in BBAdata['MAPS']){
            var M = BBAdata['MAPS'][m];
            if(M.StarMap){

                if(typeof M.StarMap.VisibleIf != 'undefined')
                    if(this.visibleIf(M.StarMap.VisibleIf)===false) continue;
                if(typeof M.StarMap.MapGroup != 'undefined')
                    if(typeof BBAdata.MapGroups[M.StarMap.MapGroup].VisibleIf != 'undefined')
                        if(this.visibleIf(BBAdata.MapGroups[M.StarMap.MapGroup].VisibleIf)===false) continue;

                this.StarMap[m] = cloneObj(M.StarMap);

                if(typeof M.StarMap.MapGroup != 'undefined'){
                    var MG = BBAdata.MapGroups[M.StarMap.MapGroup];
                    this.StarMap[m].x-=-MG.x;
                    this.StarMap[m].y-=-MG.y;
                }

                this.StarMap[m].t = 'map';

                this.StarMap[m].avaliable = this.isRouteTo(m);

            }else{
                this.StarMap[m]={
                    x: -400,
                    y: noMapY*30,
                    t: 'simple',
                    name: m,
                    mapName: m,
                    mouseRadius: 39,
                    avaliable: true,
                };
                ++noMapY;
            }
        }
    }
    this.visibleIf = function(visibleTab){
        for(var v in visibleTab){
            var flagName = visibleTab[v];
            for(var s in MENU.CM.campainFlags)
                if(s==flagName) return true;
        }
        return false;
    }
    this.isRouteTo = function(mapName){
        for(var r in MENU.CM.campainRoutes){
            var R = MENU.CM.campainRoutes[r];
            if(R.A==mapName || R.B==mapName)
                return true;
        }
        return false;
    }

    this.frame = function(){
        ++this.tick;

        this.Canvas.fillStyle = 'black';
        this.Canvas.fillRect(0,0,this.width,this.height);

        this.centerX = parseInt(this.width/2- -this.mapX);
        this.centerY = parseInt(this.height/2- -this.mapY);

        for(var r in MENU.CM.campainRoutes)
            this.showMapRoute(r);

        for(var s in this.StarMap)
            this.showMapElement(s);

        if(this.teleportJump != false)
            this.showTeleportJump();
    }

    this.showMapElement = function(s){
        var S = this.StarMap[s];

        this.Canvas.save();
        this.Canvas.translate(this.centerX- -S.x, this.centerY- -S.y);

        if(S.t=='simple'){
            this.Canvas.font="20px Arial";
            this.Canvas.fillStyle = 'white';
            if(S.name.substr(0,2)=='Lx'){
                this.Canvas.fillText(String.fromCharCode(parseInt(S.name.substr(2))), 0, 0);
            }else{
                this.Canvas.fillText(S.name, 0, 0);
            }
        }

        if(S.t=='map'){
            for(var a in S.Anims){
                var A = S.Anims[a];
                this.Canvas.save();

                if(A.t=='static'){
                    this.Canvas.translate(A.x, A.y);
                    this.Canvas.rotate(A.q * this.RAD);
                }
                if(A.t=='around'){
                    var cr = ((A.qStart- -A.qV*this.tick)%360) * this.RAD;
                    var cx = A.x- -A.r*Math.cos(cr);
                    var cy = A.y- -A.r*Math.sin(cr);
                    this.Canvas.translate(cx, cy);
                    this.Canvas.rotate(cr- -(A.qDir * this.RAD));
                }

                this.Canvas.fillStyle = A.color;

                if(typeof A.LIBpath != 'undefined'){
                    var svgD='';
                    var pathSize=A.size/1000;
                    var XYoffset = parseInt(-A.size/2);
                    var PATH = BBAdata.pathLIB[ A.LIBpath ];
                    for(var p=0; p<PATH.length; ++p)
                        if(isNaN(PATH[p])) svgD+=PATH[p]+' ';
                                else       svgD+=((PATH[p]*pathSize).toFixed(2))+' ';
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

            if(MENU.CM.currentLevel == s){
                this.Canvas.save();

                var cr = ((5*this.tick - 30)%360) * this.RAD;
                var cx = S.shipRadius*Math.cos(cr);
                var cy = S.shipRadius*Math.sin(cr);
                this.Canvas.translate(cx, cy);
                this.Canvas.rotate(cr- -(180 * this.RAD));

                this.Canvas.fillStyle = 'blue';
                this.Canvas.font="bold 12px Arial";
                this.Canvas.textAlign = 'center';
                this.Canvas.textBaseline = 'middle';
                this.Canvas.fillText('A', 0, 0);

                this.Canvas.restore();
            }
        }
        this.showMapMenu(S,s);
        this.Canvas.restore();
    }
    this.showMapRoute = function(r){
        var R = MENU.CM.campainRoutes[r];
        var A = this.StarMap[R.A];
        var B = this.StarMap[R.B];

        var Cx = A.x-B.x;
        var Cy = A.y-B.y;
        var Q  = -Math.atan2(-Cx,-Cy)- -Math.PI/2;
        var R  = Math.sqrt(Cx*Cx- -Cy*Cy);
        var Ax = A.mouseRadius*Math.cos(Q);
        var Ay = A.mouseRadius*Math.sin(Q);
        var Bx = (R-B.mouseRadius)*Math.cos(Q);
        var By = (R-B.mouseRadius)*Math.sin(Q);

        this.Canvas.save();

        this.Canvas.translate(this.centerX- -A.x, this.centerY- -A.y);

        this.Canvas.strokeStyle = "#222";
        this.Canvas.lineWidth = 6;
        this.Canvas.lineCap = 'round';
        this.Canvas.stroke(new Path2D('M '+Ax+','+Ay+' L '+Bx+','+By));

        this.Canvas.restore();
    }
    this.showMapMenu = function(S,s){
        if(s === this.mouseOverMap){
            this.Canvas.strokeStyle = 'blue';
            this.Canvas.lineWidth = 1;

            var v1r1 = ((this.tick*5)%360 ) * this.RAD;
            var v1r2 = ((this.tick*5- -300)%360 ) * this.RAD;
            this.Canvas.beginPath();
            this.Canvas.arc(0, 0, S.mouseRadius-2, v1r1, v1r2);
            this.Canvas.stroke();

            var v2r1 = ((this.tick*-5)%360 ) * this.RAD;
            var v2r2 = ((this.tick*-5- -300)%360 ) * this.RAD;
            this.Canvas.beginPath();
            this.Canvas.arc(0, 0, S.mouseRadius- -2, v2r1, v2r2);
            this.Canvas.stroke();
        }

        if(s === this.choosenMap){
            this.Canvas.strokeStyle = 'blue';
            this.Canvas.lineWidth = 1;

            var menuSite = 'left';
            if(0 > (this.centerX-this.width/2- -S.x))
            menuSite = 'right';

            var v1r1 = ((this.tick*5)%360 ) * this.RAD;
            var v1r2 = ((this.tick*5- -300)%360 ) * this.RAD;
            this.Canvas.beginPath();
            this.Canvas.arc(0, 0, S.mouseRadius-2, v1r1, v1r2);
            this.Canvas.stroke();
            this.Canvas.beginPath();

            var vr = S.mouseRadius- -2;
            if(menuSite == 'left'){
                var v2r1 = 40 * this.RAD;
                var v2r2 = 320 * this.RAD;
                var rx = vr*Math.cos(240 * this.RAD);
                var ry = vr*Math.sin(240 * this.RAD);
            } else {
                var v2r1 = 220 * this.RAD;
                var v2r2 = 140 * this.RAD;
                var rx = vr*Math.cos(300 * this.RAD);
                var ry = vr*Math.sin(300 * this.RAD);
            }
            this.Canvas.beginPath();
            this.Canvas.arc(0, 0, S.mouseRadius- -2, v2r1, v2r2);
            this.Canvas.stroke();

            this.Canvas.beginPath();
            this.Canvas.moveTo(rx,ry);
            if(menuSite == 'left'){
                this.Canvas.lineTo(-120,-104);
                this.Canvas.lineTo(-420,-104);
            }else{
                this.Canvas.lineTo(120,-104);
                this.Canvas.lineTo(420,-104);
            }
            this.Canvas.stroke();

            if(this.choosenMapMenu === false || this.choosenMapMenu != this.choosenMap){
                $('.starMapInfo').remove();
                var html = '';

                var mapName = s;
                var wx = this.centerX- -S.x;
                var wy = this.centerY- -S.y;

                if(menuSite == 'left') wx -= 420;
                        else           wx -=-120;
                wy -= 100;

                html += '<div class="mapName">'+mapName+'</div>';
                html += '<div class="startGame">START</div>';
                html += '<div class="winGame">autoWin</div>';

                html = '<div class="starMapInfo" style="left: '+wx+'px; top:'+wy+'px;">'+html+'</div>';

                $('#starMapContainer').append(html);
                this.choosenMapMenu = this.choosenMap;
            }
        }
    }


    this.showTeleportJump = function(){

    }
    this.createTeleportJump = function(A,B){
        console.log('TelportJump:',A,B);
        if(A == B) return false;



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
