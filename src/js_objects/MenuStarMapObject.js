function MenuStarMapObject(){

    this.Canvas = false;
    this.CanvasB = false;
    this.intervalId = false;
    this.tick = 0;

    this.width = 0;
    this.height = 0;
    this.mapX = 0;
    this.mapY = 0;
    this.dragBorders={};

    this.clickX = false;
    this.clickY = false;
    this.mouseOverMap = false;
    this.choosenMap = false;
    this.choosenMapMenu = false;
    this.backgroundsMoved = true;

    this.RAD = Math.PI/180;

    this.StarMap = {};
    this.MapGroups = {};
    this.StarRoutes = {};

    this.centerX = 0;
    this.centerY = 0;
    this.teleportJump = false;

    this.makeMenuStars = function(){
        this.prepareStarMap();
        this.prepareStarRoutes();

        this.Canvas = document.getElementById('starMap').getContext('2d');
        this.CanvasB = document.getElementById('starMapBackground').getContext('2d');

        this.startAnimation();
    }


    this.resize = function(){
        this.width = $(window).width();
        this.height = $(window).height();

        $('#starMapContainer, #starMap, #starMapBackground')
            .attr({width: this.width+'px',height: this.height+'px'})
            .css( {width: this.width+'px',height: this.height+'px'});

        this.backgroundsMoved = true;
    }

    this.startAnimation = function(){
        this.intervalId = setInterval(function(){ MENU.SM.frame(); }, 33);
        this.resize();
        this.prepareStarMap();
        this.prepareStarRoutes();
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
        this.backgroundsMoved = true;

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
        if(-this.mapX < this.dragBorders.L) this.mapX = -this.dragBorders.L;
        if(-this.mapX > this.dragBorders.R) this.mapX = -this.dragBorders.R;
        if(-this.mapY < this.dragBorders.T) this.mapY = -this.dragBorders.T;
        if(-this.mapY > this.dragBorders.B) this.mapY = -this.dragBorders.B;
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
        this.backgroundsMoved = true;
        this.StarMap = {};

        this.prepareMapGroups();

        var noMapY = 0;

        for(var m in BBAdata.MAPS){
            var M = BBAdata.MAPS[m];
            if(M.StarMap){

                if(typeof M.StarMap.VisibleIf != 'undefined')
                    if(this.visibleIf(M.StarMap.VisibleIf)===false) continue;
                if(typeof M.StarMap.MapGroup != 'undefined')
                    if(!this.MapGroups[M.StarMap.MapGroup]) continue;

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
        this.prepareDragBorders();
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
    this.prepareStarRoutes = function(){
        this.StarRoutes = {};

        for(var r in MENU.CM.campainRoutes){
            var R = this.StarRoutes[r] = cloneObj(MENU.CM.campainRoutes[r]);
            var A = this.StarMap[R.A];
            var B = this.StarMap[R.B];

            R.realAx = A.x;
            R.realAy = A.y;
            var Cx = A.x-B.x;
            var Cy = A.y-B.y;
            var Q  = -Math.atan2(-Cx,-Cy)- -Math.PI/2;
            R.rad = Math.sqrt(Cx*Cx- -Cy*Cy);
            R.Ax = A.mouseRadius*Math.cos(Q);
            R.Ay = A.mouseRadius*Math.sin(Q);
            R.Bx = (R.rad-B.mouseRadius)*Math.cos(Q);
            R.By = (R.rad-B.mouseRadius)*Math.sin(Q);
        }
    }
    this.prepareMapGroups = function(){
        this.MapGroups = {};
        for(var m in BBAdata.MapGroups){
            var M = BBAdata.MapGroups[m];
            if(typeof M.VisibleIf != 'undefined'){
                if(this.visibleIf(M.VisibleIf)===true)
                this.MapGroups[m] = true;
            } else {
                this.MapGroups[m] = true;
            }
        }
    }
    this.prepareDragBorders = function(){
        this.dragBorders = {T:0,B:0,L:0,R:0};

        for(var m in this.StarMap){
            var S = this.StarMap[m];
            if(S.x < this.dragBorders.L) this.dragBorders.L = S.x;
            if(S.x > this.dragBorders.R) this.dragBorders.R = S.x;
            if(S.y < this.dragBorders.T) this.dragBorders.T = S.y;
            if(S.y > this.dragBorders.B) this.dragBorders.B = S.y;
        }
        this.dragBorders.L -=  200;
        this.dragBorders.R -=- 200;
        this.dragBorders.T -=  150;
        this.dragBorders.B -=- 150;
    }




    this.frame = function(){
        ++this.tick;

        this.Canvas.clearRect(0,0,this.width,this.height);

        this.centerX = parseInt(this.width/2- -this.mapX);
        this.centerY = parseInt(this.height/2- -this.mapY);

        if(this.backgroundsMoved){
            this.backgroundsMoved = false;
            this.drawBackgrounds();
        }

        for(var r in this.StarRoutes)
            this.showMapRoute(r);

        for(var s in this.StarMap)
            this.showMapElement(s);

        if(this.teleportJump !== false)
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
            this.showElementAnims(S.Anims,this.Canvas);

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
    this.showElementAnims = function(Anims,Canvas){
        for(var a in Anims){
            var A = Anims[a];
            Canvas.save();

            if(A.t=='static'){
                Canvas.translate(A.x, A.y);
                Canvas.rotate(A.q * this.RAD);
            }
            if(A.t=='around'){
                var cr = ((A.qStart- -A.qV*this.tick)%360) * this.RAD;
                var cx = A.x- -A.r*Math.cos(cr);
                var cy = A.y- -A.r*Math.sin(cr);
                Canvas.translate(cx, cy);
                Canvas.rotate(cr- -(A.qDir * this.RAD));
            }

            Canvas.fillStyle = A.color;

            if(typeof A.LIBpath != 'undefined'){
                var svgD='';
                var pathSize=A.size/1000;
                var XYoffset = parseInt(-A.size/2);
                var PATH = BBAdata.pathLIB[ A.LIBpath ];
                for(var p=0; p<PATH.length; ++p)
                    if(isNaN(PATH[p])) svgD+=PATH[p]+' ';
                            else       svgD+=((PATH[p]*pathSize).toFixed(2))+' ';
                var svgObj = new Path2D(svgD);
                Canvas.translate(XYoffset,XYoffset);
                Canvas.fill(svgObj);
            }
            if(typeof A.letter != 'undefined'){
                Canvas.font="bold "+A.size+"px Arial";
                Canvas.textAlign = 'center';
                Canvas.textBaseline = 'middle';
                Canvas.fillText(A.letter, 0, 0);
            }

            Canvas.restore();
        }
    }
    this.showMapRoute = function(r){
        var R = this.StarRoutes[r];

        this.Canvas.save();
        this.Canvas.translate(this.centerX- -R.realAx, this.centerY- -R.realAy);

        this.Canvas.strokeStyle = "#222";
        this.Canvas.lineWidth = 6;
        this.Canvas.lineCap = 'round';
        this.Canvas.stroke(new Path2D('M '+R.Ax+','+R.Ay+' L '+R.Bx+','+R.By));

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
        var T = this.teleportJump;
        var time = this.tick - T.tickStart;
        if(time > 20){
            this.teleportJump = false;
            return false;
        }

        this.Canvas.save();
        this.Canvas.translate(this.centerX, this.centerY);
        this.Canvas.strokeStyle = '#AAF';
        this.Canvas.lineWidth = 10 - Math.abs(time-10);
        this.Canvas.lineCap = 'round';
        this.Canvas.stroke(new Path2D(T.route));
        this.Canvas.restore();
    }
    this.createTeleportJump = function(A,B){
        if(A == B) return false;
        var Route = this.createAllRoutes(A,B);

        var Star1,Star2,SR,Ax,Ay,Bx,By,R,Ri,Cx,Cy,Tx,Ty=false,D = '';
        Star1 = Route[0];
        for(var i=1; i<Route.length; ++i){
            Star2 = Route[i];

            if(typeof this.StarRoutes[Star1+'_'+Star2] != 'undefined'){
                SR = this.StarRoutes[Star1+'_'+Star2];
                Ax = SR.Ax- -SR.realAx;
                Ay = SR.Ay- -SR.realAy;
                Bx = SR.Bx- -SR.realAx;
                By = SR.By- -SR.realAy;
                R  = this.StarMap[SR.A].mouseRadius;
                Cx = this.StarMap[SR.A].x;
                Cy = this.StarMap[SR.A].y;
            }else{
                SR = this.StarRoutes[Star2+'_'+Star1];
                Bx = SR.Ax- -SR.realAx;
                By = SR.Ay- -SR.realAy;
                Ax = SR.Bx- -SR.realAx;
                Ay = SR.By- -SR.realAy;
                R  = this.StarMap[SR.B].mouseRadius;
                Cx = this.StarMap[SR.B].x;
                Cy = this.StarMap[SR.B].y;
            }
            Ri = '1 1';
            if(Ty!==false){
                var E1 = Math.atan2(Bx-Tx,By-Ty).toFixed(2);
                var E2 = Math.atan2(Bx-Cx,By-Cy).toFixed(2);
                E2 = (E2-E1);
                if(E2 > 0)
                    Ri = '0 1';
            }
            Tx = Bx;
            Ty = By;

            if(i==1) D+='M ';
                else D+='A '+R+' '+R+' 0 '+Ri;
            D += ' '+Ax+' '+Ay+' L '+Bx+' '+By;

            Star1 = Star2;
        }
        this.teleportJump={
            tickStart: this.tick,
            route: D
        };
    }
    this.createAllRoutes = function(a,b){
        var AllRoutes = {};
        for(var r in this.StarRoutes){
            var R = this.StarRoutes[r];
            if(typeof AllRoutes[R.A] == 'undefined') AllRoutes[R.A] = {};
            if(typeof AllRoutes[R.B] == 'undefined') AllRoutes[R.B] = {};
            AllRoutes[R.A][R.B] = R.rad;
            AllRoutes[R.B][R.A] = R.rad;
        }
        if(typeof AllRoutes[a] == 'undefined')
            return false;

        if(typeof AllRoutes[a][b] != 'undefined')
            return [a,b];

        var AllStars = [];
        for(var x in AllRoutes)
            AllStars[x] = {R:100000,T:[x]};
        AllStars[a].R = 0;

        var toCheck=[a];
        while(toCheck.length > 0){
            var x = toCheck[ toCheck.length-1 ];
            --toCheck.length;
            for(var y in AllRoutes[x]){
                if(AllStars[x].R- -AllRoutes[x][y] <= AllStars[y].R){
                    AllStars[y].R = AllStars[x].R- -AllRoutes[x][y];
                    AllStars[y].T = cloneObj(AllStars[x].T);
                    AllStars[y].T[ AllStars[y].T.length ] = y;
                    toCheck[ toCheck.length ] = y;
                }
            }
        }
        return AllStars[b].T;
    }

    this.drawBackgrounds = function(){
        this.CanvasB.fillStyle = 'black';
        this.CanvasB.fillRect(0,0,this.width,this.height);

        Scale = [1,1.7,3,5,10];

        for(var i = 4; i >= 0; --i){
            for(var g in this.MapGroups){
                var G = BBAdata.MapGroups[g];
                if(typeof G.Backgrounds == 'undefined') continue;
                if(typeof G.Backgrounds[i] == 'undefined') continue;
                var B = G.Backgrounds[i];


                Cx = parseInt(this.width/2- -this.mapX/Scale[i]);
                Cy = parseInt(this.height/2- -this.mapY/Scale[i]);


                for(var b in B){
                    var S = B[b];
                    this.CanvasB.save();
                    this.CanvasB.translate(Cx- -G.x- -S.x, Cy- -G.y- -S.y);
                    this.showElementAnims(S.Anims,this.CanvasB);
                    this.CanvasB.restore();
                }
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
