
GAMEobject.prototype.resize = function(){
    this.Dy = $(window).height();
    this.Dx = $(window).width();
    $('#Game').css({width: this.Dx+'px',height: this.Dy+'px'});
    $('#MainCanvas').css({width: this.Dx+'px',height: this.Dy+'px'}).attr('width',this.Dx).attr('height',this.Dy);
    $('#UnderCanvas').css({width: this.Dx+'px',height: this.Dy+'px'}).attr('width',this.Dx).attr('height',this.Dy);

    if($('#MainCanvas').length)
        this.CanvasHandle = document.getElementById('MainCanvas').getContext('2d');
    if($('#UnderCanvas').length)
          this.UnderCanvasHandle = document.getElementById('UnderCanvas').getContext('2d');
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
        .blur(function(e){ if(!GAME.doEndGame){ GAME.pause=true;    clearInterval(GAME.intervalIndex);    $('#pause').show();    }    })
        .resize(function(e){ GAME.resize(); });

      //  document.addEventListener('mousedown',function(e){     GAME.mouse_down(e); },false);
      //  document.addEventListener('mouseup',function(e){     GAME.mouse_up(e); },false);
      //  document.addEventListener('mousemove',function(e){     GAME.mousemove(e); },false);
}
GAMEobject.prototype.start = function(Setting,Ship){
    this.MapRadius=Setting.MapRadius;
    this.MapRadius2=Setting.MapRadius2;
    this.SHIP = Ship;
    this.resize();
    this.setBoard();
    this.CanvasHandle = document.getElementById('MainCanvas').getContext('2d');
    this.UnderCanvasHandle = document.getElementById('UnderCanvas').getContext('2d');

    if(BBAdata.GET.CANVAS > 0){
        $('#CanvasPreviews').css({display: 'block'});
    }

    this.O[0]={
        x: 0,
        y: 0,
        speed: this.SHIP.speed,
        speedA: 3,
        speedD: 6,
        speedM: 10,
        speedT: 3.5,
        lastSpeedT: 0,
        angle: 0,
        radius: 7,
        S: 2,
        life: this.SHIP.life,
        lifeM: this.SHIP.lifeM,
        energyField: 0,
        T: 'ship',
        ammo: 0,
        M: 'moving',
        view:{
            Letter: 'A',
            LetterSize: 16,
            Color: 'blue',
            Angle: 0,
            HitPattern: 'HullFire_20',
        },
        mapType: 'P',
        mapCollide: ['A','ME'],
        periodDMG: {},
        Flags: {},
    };
    this.putOnXY(0);
    CanvasManager.requestCanvas(0);

    this.Omoving={0:1};
    this.Olen=1;

    this.makeShipControlPanel();
    this.shipFunc_showHealth();

    this.putObj('Gstar','static',0,0,0);

    if(typeof Setting.Place != 'undefined')
        for(var i=0; i<Setting.Place.length; ++i)
            this.mapPlaceObj(Setting, Setting.Place[i]);


    if(BBAdata.GET.CANVAS==0){
        this.FRAME_TIME = new Date().getTime();
        // this.frame();
        this.intervalIndex = window.requestAnimationFrame(function(){ GAME.frame(); });
    }
}
GAMEobject.prototype.mapPlaceObj = function(Setting,SET,defX,defY){
    var Radi = Math.PI*2/360;

    if( typeof defX == 'undefined' ){
        defX = 0;
        defY = 0;
    }
    for(var placeWhat in SET.What){
        for(var j=0; j < SET.What[placeWhat]; ++j){

            var x = defX;
            var y = defY;
            if(SET.Random){
                do{
                    x = Math.random()*SET.Random.Radius*2-SET.Random.Radius;
                    y = Math.random()*SET.Random.Radius*2-SET.Random.Radius;
                }while( (x*x- -y*y) > SET.Random.Radius*SET.Random.Radius );
                x-=-SET.Random.X;
                y-=-SET.Random.Y;
            }
            if(SET.LineOf){
                x = SET.LineOf.X- -j*SET.LineOf.Distance*Math.sin((-parseInt(SET.LineOf.Angle)-180)*Radi);
                y = SET.LineOf.Y- -j*SET.LineOf.Distance*Math.cos((-parseInt(SET.LineOf.Angle)-180)*Radi);
            }
            if(SET.CircleOf){
                x = SET.CircleOf.X- -SET.CircleOf.Radius*Math.sin((-parseInt(SET.CircleOf.AngleStart- -j*SET.CircleOf.AngleBy)-180)*Radi);
                y = SET.CircleOf.Y- -SET.CircleOf.Radius*Math.cos((-parseInt(SET.CircleOf.AngleStart- -j*SET.CircleOf.AngleBy)-180)*Radi);
            }
            if(SET.RingOf){
                var rAngle = Math.random()*360;
                var Dist = SET.RingOf.Radius;
                if(SET.RingOf.RadiusPlus) Dist-=-Math.random()*SET.RingOf.RadiusPlus;
                x = SET.RingOf.X- -Dist*Math.sin((-parseInt(rAngle)-180)*Radi);
                y = SET.RingOf.Y- -Dist*Math.cos((-parseInt(rAngle)-180)*Radi);
            }

            if(placeWhat=='Star'){
                var L = this.putObj('star','static',1,x,y);
            }else if(placeWhat=='StarX'){
                var LI = ['','M','S','L'];
                var L = this.putObj('star'+LI[ parseInt(Math.random()*4) ],'static',1,x,y);
            }else if(placeWhat=='Gstar'){
                var L = this.putObj('Gstar','static',1,x,y);
            }else if(placeWhat=='RoundField'){
                var L = this.putObj('RoundField','region',1,x,y);
            }else if(placeWhat=='SquareField'){
                var L = this.putObj('SquareField','region',1,x,y);
            }else if(placeWhat=='ConeField'){
                var L = this.putObj('ConeField','region',1,x,y);
            }else if(placeWhat=='Mine'){
                var L = this.putObj('space_mine','comp',1,x,y);
            } else {
                var L = this.putObj(BBAdata['ShipNames'][placeWhat],'comp',1,x,y);
                if(typeof Setting.BoardMods !='undefined')
                    for(var k in Setting.BoardMods)
                        this.addBoardMod(L,Setting.BoardMods[k]);
                if(typeof SET.BoardMods !='undefined')
                    for(var k in SET.BoardMods)
                        this.addBoardMod(L,SET.BoardMods[k]);
            }

            if(typeof SET.objData !='undefined' && L!=-1)
                this.addBoardMod(L,SET.objData);
        }
    }

}

GAMEobject.prototype.addBoardMod = function(o,MODname){
    var MOD,O = this.O[o];

    if(typeof MODname == 'string') MOD = BBAdata['MapMODS'][MODname];
            else                   MOD = MODname;

    if(typeof MOD.who != 'undefined'){
        var jest=false;
        for(var i=0; i<MOD.who.length; ++i)
            if(MOD.who[i]==O.T){
                jest=true;
                break;
            }
        if(!jest) return false;
    }

    for(var KI in MOD){
        if(KI=='toDo'){
            for(var i in MOD.toDo)
                this.addToToDoList(o,MOD.toDo[i]);
        }else if(KI=='weapon'){
            for(var i in MOD.weapon)
                this.addToWeapon(o,MOD.weapon[i]);
        }else if(KI=='x'){
            var oldX = O.x;
            var oldY = O.y;
            O.x = MOD.x;
            O.y = MOD.y;
            this.putOnXY(o,oldX,oldY);
        }else if(KI=='y'){
        }else if(KI=='mergeArrays'){
            for(var u in MOD[KI]){
                O[u] = mergeArrays(O[u],MOD[KI][u]);
            }
        }else{
            O[KI] = MOD[KI];
        }
    }

    if(typeof MOD.fieldAnim != 'undefined')
        this.setRegionAnimation(o, MOD.fieldAnim);

    if(typeof MOD.simpleFilling != 'undefined')
        O.TT='simpleFilling';

    if(typeof MOD.squareAngle != 'undefined'){
        O.squareCorners = this.countSquareCorners(O.x,O.y,O.squareAngle,O.squareLen,O.squareWidth);
    }

    if(typeof MOD.explosivePreset != 'undefined'){
        this.cloneExplosionData(O,O);
    }

    CanvasManager.requestCanvas( o );
    this.putOnXY( o );
}
GAMEobject.prototype.addToToDoList = function(o,toDo){
    if(typeof this.O[o].toDo == 'undefined'){
        return true;
    }

    var OtoDo = this.O[o].toDo;
    var NtoDo=[];
    var N = toDo.N;
    for(var i=0; i<OtoDo.length; ++i){
        if(N!=false && N > OtoDo[i].N){
            NtoDo[ NtoDo.length ] = toDo;
            N=false;
        }
        NtoDo[ NtoDo.length ] = OtoDo[i];
    }
    if(N!=false)
        NtoDo[ NtoDo.length ] = toDo;

    this.O[o].toDo = NtoDo;
}
GAMEobject.prototype.addToWeapon = function(o,Weapon){
    this.O[o].weapon.unshift(cloneObj(Weapon));
}

GAMEobject.prototype.setRegionAnimation = function(o,animType){
    if(animType===false) return true;
    var O = this.O[o];
    O.TT = 'regionAnim';
    O.animTick = 0;
    O.animData = { state: 'start', Next:0, Plen:0, P:{}};

    if(typeof O.squareCorners !='undefined'){
        O.animPole = O.squareLen * O.squareWidth * 2;
    } else
        O.animPole = parseInt(Math.PI*O.radius*O.radius/1000);
    if(typeof O.coneAngle != 'undefined'){
        if(O.coneRad2 != 0)
            O.animPole -= parseInt(Math.PI*O.coneRad2*O.coneRad2/1000);
        if(O.coneAngle < 180)
            O.animPole = parseInt(O.animPole*(O.coneAngle/180));
    }


    if(animType=='DestructionField') O.animType = 'DestrFieldStart';
    if(animType=='ElectricityField') O.animType = 'EleFieldStart';
    if(animType=='HealingField')     O.animType = 'HealFieldStart';
    if(animType=='GravityField')     O.animType = 'GravFieldStart';
    if(animType=='OrbitalField')     O.animType = 'OrbFieldStart';
    if(animType=='ShellField')       O.animType = 'ShellFieldStart';
    if(animType=='WindField')        O.animType = 'WindFieldStart';
}
