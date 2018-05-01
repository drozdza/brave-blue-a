
GAMEobject.prototype.resize = function(){
    this.Dy = $(window).height();
    this.Dx = $(window).width();
    $('#Game').css({width: this.Dx+'px',height: this.Dy+'px'});
    $('#MainCanvas').css({width: this.Dx+'px',height: this.Dy+'px'}).attr('width',this.Dx).attr('height',this.Dy);
    $('#UnderCanvas').css({width: this.Dx+'px',height: this.Dy+'px'}).attr('width',this.Dx).attr('height',this.Dy);
    if(BBAdata.GET.BLUR > 0)
        $('#BlurCanvas').css({width: this.Dx+'px',height: this.Dy+'px',display:'none'}).attr('width',this.Dx).attr('height',this.Dy);

    if($('#MainCanvas').length)
        this.CanvasHandle = document.getElementById('MainCanvas').getContext('2d');
    if($('#UnderCanvas').length)
        this.UnderCanvasHandle = document.getElementById('UnderCanvas').getContext('2d');
    if($('#BlurCanvas').length)
        this.BlurCanvasHandle = document.getElementById('BlurCanvas').getContext('2d');
}
GAMEobject.prototype.setBoard = function(){
    var html='',html2='';

    html2+='<div id="countEnemies"></div>';
    html2+='<div id="countHealth"></div>';
    html2+='<div id="countSpeed"></div>';
    html2+='<div id="countRadar"></div>';
    html2+='<div id="gamearea">';
        html2+='<div id="pause"><span>P</span></div>';
        html2+='<div id="gameboard"></div>';
        html2+='<canvas id="UnderCanvas" style="width:'+this.Dx+'px; height: '+this.Dy+'px;" width="'+this.Dx+'" height="'+this.Dy+'"></canvas>';
        html2+='<canvas id="MainCanvas" style="width:'+this.Dx+'px; height: '+this.Dy+'px;" width="'+this.Dx+'" height="'+this.Dy+'"></canvas>';
        // html2+='<canvas id="OverCanvas" style="width:'+this.Dx+'px; height: '+this.Dy+'px;" width="'+this.Dx+'" height="'+this.Dy+'"></canvas>';
        html2+='<div id="gameboard2">'+html+'<div id="gameboardMarkers"></div></div>';
        html2+='<canvas id="BlurCanvas" style="width:'+this.Dx+'px; height: '+this.Dy+'px;" width="'+this.Dx+'" height="'+this.Dy+'"></canvas>';
    html2+='</div>';
    html2+='<div id="gameOverlay" class="cursorCross"><div id="bulletRadius"><div id="bullRadX"></div></div></div>';

    $('#Game').unbind('click').show().html(html2);

    $(window)
        .unbind()
        .mousedown(function(e){ GAME.mouse_down(e); })
        .mouseup(function(e){ GAME.mouse_up(e); })
        .mousemove(function(e){ GAME.mousemove(e); })
        .keydown(function(e){ GAME.keydown(e); })
        .keyup(function(e){ GAME.keyup(e); })
        .blur(function(e){ if(!GAME.doEndGame) GAME.pauseStart(); })
        .resize(function(e){ GAME.resize(); });

      //  document.addEventListener('mousedown',function(e){     GAME.mouse_down(e); },false);
      //  document.addEventListener('mouseup',function(e){     GAME.mouse_up(e); },false);
      //  document.addEventListener('mousemove',function(e){     GAME.mousemove(e); },false);
}
GAMEobject.prototype.setOmaps = function(){
    var Omap={};
    for (var i in BBAdata.collisionMatrix){
        Omap[i] = {elems:0};
    }
    Omap['P'].elems = 1;
    return Omap;
}

GAMEobject.prototype.start = function(Name,Setting,Ship){
    this.MapName = Name;
    this.MapSetting = Setting;
    this.gameHash = makeRandomHash();
    this.Omap = this.setOmaps();

    this.prepareCounts();
    this.prepareWinningConds();

    this.O[0] = Ship;
    this.O[0].mapCollide = cloneObj(BBAdata.collisionMatrix['P']);
    this.resize();
    this.setBoard();
    this.CanvasHandle = document.getElementById('MainCanvas').getContext('2d');
    this.UnderCanvasHandle = document.getElementById('UnderCanvas').getContext('2d');
    if(BBAdata.GET.BLUR > 0)
        this.BlurCanvasHandle = document.getElementById('BlurCanvas').getContext('2d');


    if(BBAdata.GET.CANVAS == 1)
        $('#CanvasPreviews').css({display: 'block'});

    if(BBAdata.GET.CANVAS == 2)
        $('#CanvasBackgrounds').css({display: 'block'});

    this.setPlayerShip();

    this.makeShipControlPanel();
    this.shipFunc_showHealth();

    if(typeof Setting.Backgrounds != 'undefined')
        for(var b in Setting.Backgrounds)
            CanvasManager.CBM.setBackgroundScale(b,Setting.Backgrounds[b]);

    if(typeof Setting.Place != 'undefined') // tego IFa można potem ściągnąć
        for(var i=0; i<Setting.Place.length; ++i)
            this.mapPlace(Setting, Setting.Place[i]);


    if(BBAdata.GET.CANVAS == 0){
        this.FRAME_TIME = new Date().getTime();
        // this.frame();
        this.intervalIndex = window.requestAnimationFrame(function(){ GAME.frame(); });
    }
}
GAMEobject.prototype.setPlayerShip = function(){
    var startX = 0, startY = 0, startA = 0;

    if(typeof this.MapSetting.Ship !== 'undefined' && typeof this.MapSetting.Ship.Start !== 'undefined'){
        if(this.MapSetting.Ship.Start.X) startX = this.MapSetting.Ship.Start.X;
        if(this.MapSetting.Ship.Start.Y) startY = this.MapSetting.Ship.Start.Y;
        if(this.MapSetting.Ship.Start.A) startA = this.MapSetting.Ship.Start.A;
    }

    this.O[0].x = startX;
    this.O[0].y = startY;
    this.O[0].angle = startA;
    this.O[0].o = 0;

    this.putOnXY(this.O[0]);
    CanvasManager.requestCanvas(this.O[0]);

    this.Omoving={0:1};
    this.Olen=1;
}
