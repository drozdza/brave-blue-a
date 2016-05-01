function GAMEobject(){
    {
    this.Dx=1300;
    this.Dy=550;
    this.MapTileSize = 250;
    this.Frames=30;
    this.tick=0;
    this.tickD=0;
    this.IntervalIndex=-1;
    this.pause=false;
    this.doEndGame=false;

    this.EnemiesC=0;
    this.Enemies={};             // Tablica Enemies

    this.MapRadius=2700;
    this.MapRadius2=3200;

    this.O={};                   // Object's - all of them
    this.Olen=0;
    this.Omap={};                // map of Maps
    // No map for: B-Bullets, BE-BulletsE, T-TeleportsRoutes
    this.Omap['P']={elems:1};    // Player
    this.Omap['M']={elems:0};    // Missles
    this.Omap['E']={elems:0};    // Enemies
    this.Omap['ME']={elems:0};   // MisslesE
    this.Omap['A']={elems:0};    // Asteroids - only for Player Ship
    this.Omap['R']={elems:0};    // Regions
    this.Omap['D']={elems:0};    // Dead objects (for spotting)
    this.Odead={};


    this.Omoving={};    // moving
    this.Ocomp={};      // sterowane statki / missle
    this.Obullet={};    // tablica kul
    this.Oanim={};      // animations
    this.Oregion={};    // regions

    this.Squads={};     // moving in Squads
    this.SquadLen=0;

    this.keyLeftRight=0;
    this.keyUpDown=0;

    this.keyLeftLC = 0;
    this.keyRightLC = 0;
    this.keyUpLC = 0;
    this.keyDownLC = 0;
    this.specialMove = -1;
    this.specialMoveT = -1;

    this.showLaserInd = true;
    this.RadarOld = {};    for(var i=0; i<360;++i) this.RadarOld[i]=[];
    this.mouse_x = 0;
    this.mouse_y = 0;
    this.mouseX = 0;
    this.mouseY = 0;

    this.FPSx=0;
    this.FPSy=0;
    this.FPSz=0;
    this.MSmove=0;
    this.MSdecide=0;
    this.MSdraw=0;
    this.MSship=0;

    this.SHIP={};
    this.SHIPold={};
    }


    this.resize = function(){
        this.Dy = $(window).height();
        this.Dx = $(window).width();
        $('#Game').css({width: this.Dx+'px',height: this.Dy+'px'});
        $('#MainCanvas').css({width: this.Dx+'px',height: this.Dy+'px'}).attr('width',this.Dx).attr('height',this.Dy);

        if($('#MainCanvas').length)
            this.CanvasHandle = document.getElementById('MainCanvas').getContext('2d');
    }
    this.setBoard = function(){
        var html='',html2='';

        html2+='<div id="countEnemies"></div>';
        html2+='<div id="countHealth"></div>';
        html2+='<div id="countSpeed"></div>';
        html2+='<div id="countRadar"></div>';
        html2+='<div id="gamearea">';
            html2+='<div id="pause"><span>P</span></div>';
            html2+='<div id="gameboard"></div>';
            html2+='<canvas id="MainCanvas" style="width:'+this.Dx+'px; height: '+this.Dy+'px;" width="'+this.Dx+'" height="'+this.Dy+'"></div>';
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
    this.start = function(Setting,Ship){
        this.MapRadius=Setting.MapRadius;
        this.MapRadius2=Setting.MapRadius2;
        this.SHIP = Ship;
        this.resize();
        this.setBoard();
        this.CanvasHandle = document.getElementById('MainCanvas').getContext('2d');

        if(GET.CANVAS > 0){
            $('#CanvasPreviews').css({display: 'block'});
        }

        this.O[0]={
            x:0,
            y:0,
            speed:7,
            speedA: 3,
            speedD: 6,
            speedM: 10,
            speedT:3.5,
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
            viewLetter: 'A',
            viewLetterSize: 16,
            viewColor: 'blue',
            viewAngle: 0,
            viewHitPattern: 'HullFire_20',
            mapType: 'P',
            mapCollide: ['A','ME'],
            periodDMG: {},
        };
        this.putOnXY(0);


        CanvasManager.requestCanvas( 0 );

        this.Omoving={0:1};
        this.Olen=1;

        this.makeShipControlPanel();
        this.shipFunc_showHealth();

        this.putObj('Gstar','static',0,0,0);

        // RANDOMLY PLACED ITEMS
        for(var OPS in Setting.O){
            if(OPS=='Star')    for(var i=0; i<Setting.O[OPS]; ++i)    var L = this.putObj('star','static',1);
            else            for(var i=0; i<Setting.O[OPS]; ++i){
                var L = this.putObj(NAMES.Ships[OPS],'comp',1);
                if(Setting.GiveEnergyFields > 0){
                    this.addEnergyField(L,3,150);
                    --Setting.GiveEnergyFields;
                }
            }
        }

        if(typeof Setting.Place != 'undefined')
            for(var i=0; i<Setting.Place.length; ++i)
                this.mapPlaceObj(Setting, Setting.Place[i]);



        if(GET.CANVAS==0){
            this.FRAME_TIME = new Date().getTime();
            this.frame();
            this.intervalIndex = window.requestAnimationFrame(function(){ GAME.frame(); });
        }
    }
    this.mapPlaceObj = function(Setting,SET,defX,defY){
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

                if(placeWhat=='Star'){
                    var L = this.putObj('star','static',1,x,y);
                }else if(placeWhat=='Gstar'){
                    var L = this.putObj('Gstar','static',1,x,y);
                }else if(placeWhat=='RoundField'){
                    var L = this.putObj('RoundField','region',1,x,y);
                }else if(placeWhat=='SquareField'){
                    var L = this.putObj('SquareField','region',1,x,y);
                }else if(placeWhat=='ConeField'){
                    var L = this.putObj('ConeField','region',1,x,y);
                }else if(placeWhat=='LineOfMines'){
                    var x = SET.objData.x;
                    var y = SET.objData.y;
                    var dist = 0;
                    var Radi = Math.PI/180;
                    while(dist < SET.objData.radius){
                        this.putObj('space_mine','comp',1,x,y);
                        x-=-SET.objData.distance*Math.sin( (-parseInt(SET.objData.angle)-180)*Radi);
                        y-=-SET.objData.distance*Math.cos( (-parseInt(SET.objData.angle)-180)*Radi);
                        dist-=-SET.objData.distance;
                    }
                    L = -1;

                } else {
                    var L = this.putObj(NAMES.Ships[placeWhat],'comp',1,x,y);
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

    this.addBoardMod = function(o,MODname){
        var MOD,O = this.O[o];

        if(typeof MODname == 'string')    MOD = BoardMODS[MODname];
                else                    MOD = MODname;

        if(typeof MOD.who != 'undefined'){
            var jest=false;
            for(var i=0; i<MOD.who.length; ++i)
                if(MOD.who[i]==O.viewLetter){
                    jest=true;
                    break;
                }
            if(!jest) return false;
        }

        for(var KI in MOD){
            if(KI=='toDo'){
                for(var i in MOD.toDo)
                    this.addToToDoList(o,MOD.toDo[i]);
            }else if(KI=='x'){
                var oldX = O.x;
                var oldY = O.y;
                O.x = MOD.x;
                O.y = MOD.y;
                this.putOnXY(o,oldX,oldY);
            }else if(KI=='y'){
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

        CanvasManager.requestCanvas( o );
        this.putOnXY( o );
    }
    this.addToToDoList = function(o,toDo){
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
    this.putObj_fromArray = function(O){
        var isEnemyShip = false;
        for(var i in NAMES.Ships){
            if(O.T==NAMES.Ships[i]){
                isEnemyShip=true;
                break;
            }
        }

        if(isEnemyShip){
            for(var i in ObjectPutDatas.enemyShip){
                var X = ObjectPutDatas.enemyShip[i];
                if(typeof X == 'object')    O[i] = cloneObj(X);
                    else                     O[i] = X;
            }
        }
        if(typeof ObjectPutDatas[O.T]!= 'undefined'){
            for(var i in ObjectPutDatas[O.T]){
                var X = ObjectPutDatas[O.T][i];
                if(typeof X == 'object')    O[i] = cloneObj(X);
                    else                     O[i] = X;
            }
        }

        return O;
    }

    this.putObj_carras = function(O){
        O.speedLvl = 2;
        O.speed = 6.5- -Math.random();
        O.speedT    = 2.5; //- -Math.random();
        O.speedArr = [0,
            {S: O.speed-2, T:O.speedT- -2},
            {S: O.speed, T:O.speedT},
            {S: O.speed- -3, T:O.speedT}
        ];

        var spotRad1 = 80- -parseInt(Math.random()*80);
        var spotRad2 = 300- -parseInt(Math.random()*200);
        O.spotTick = 8;
        O.spotArr=[0,
            { T: 'single', Ref: 15, Rad: spotRad1},
            { T: 'double', Ref: 10, Rad: spotRad1, Rad2: spotRad2, Angle2: 30- -parseInt(Math.random()*30)},
            { T: 'single', Ref: 45, Rad: spotRad2}
        ];
        return O;
    }
    this.putObj_dregos = function(O){
        O.speedLvl = 2;
        O.speed = 7- -Math.random()*1.5;
        O.speedT    = 2.5- -Math.random();
        O.speedArr = [0,
            {S: O.speed-5, T:O.speedT- -2},
            {S: O.speed, T:O.speedT},
            {S: O.speed- -3, T:O.speedT}
        ];

        var spotRad1 = 80- -parseInt(Math.random()*80);
        var spotRad2 = 300- -parseInt(Math.random()*200);
        O.spotTick = 8;
        O.spotArr=[0,
            { T: 'single', Ref: 15, Rad: spotRad1},
            { T: 'double', Ref: 10, Rad: spotRad1, Rad2: spotRad2, Angle2: 30- -parseInt(Math.random()*30)},
            { T: 'single', Ref: 45, Rad: spotRad2}
        ];
        return O;
    }
    this.putObj_hajaher = function(O){
        O.speedLvl = 2;
        O.speed = 5- -Math.random()*4;
        O.speedT    = 2- -Math.random()*2;
        O.speedArr = [0,
            {S: O.speed-4, T:O.speedT- -1.5},
            {S: O.speed, T:O.speedT},
            {S: O.speed- -3, T:O.speedT}
        ];

        var spotRad1 = 80- -parseInt(Math.random()*80);
        var spotRad2 = 300- -parseInt(Math.random()*200);
        O.spotTick = 8;
        O.spotArr=[0,
            { T: 'single', Ref: 15, Rad: spotRad1},
            { T: 'double', Ref: 10, Rad: spotRad1, Rad2: spotRad2, Angle2: 30- -parseInt(Math.random()*30)},
            { T: 'single', Ref: 45, Rad: spotRad2}
        ];
        return O;
    }
    this.putObj_muerto = function(O){
        O.speedLvl = 2;
        O.speed = 3;
        O.speedT = 2; //- -Math.random();
        O.speedArr = [0,
            {S: O.speed-2, T:O.speedT- -1},
            {S: O.speed, T:O.speedT},
            {S: O.speed- -3, T:O.speedT}
        ];

        var spotRad1 = 80- -parseInt(Math.random()*80);
        var spotRad2 = 300- -parseInt(Math.random()*200);
        O.spotTick = 8;
        O.spotArr=[0,
            { T: 'single', Ref: 15, Rad: spotRad1},
            { T: 'double', Ref: 10, Rad: spotRad1, Rad2: spotRad2, Angle2: 30- -parseInt(Math.random()*30)},
            { T: 'single', Ref: 45, Rad: spotRad2}
        ];

        O.weapon=[
            {t:'rose', Power:1, Dec: 50, Speed: 10, gunSpeed: 50, lastShot: 100, AtOnce: 9, RoseAngle: 4, maxSpeed: 2, minAlarm: 5, minDistToEnemy: spotRad2}
        ];
        return O;
    }
    this.putObj_iskariot = function(O){
        O.speedLvl = 2;
        O.speed = 8- -Math.random()*1.5;
        O.speedT    = 2.5- -Math.random();
        O.speedArr = [0,
            {S: O.speed-5, T:O.speedT- -0.6},
            {S: O.speed, T:O.speedT},
            {S: O.speed- -4, T:O.speedT}
        ];

        var spotRad1 = 80- -parseInt(Math.random()*80);
        var spotRad2 = 300- -parseInt(Math.random()*200);
        O.spotTick = 8;
        O.spotArr=[0,
            { T: 'single', Ref: 15, Rad: spotRad1},
            { T: 'double', Ref: 10, Rad: spotRad1, Rad2: spotRad2, Angle2: 30- -parseInt(Math.random()*30)},
            { T: 'single', Ref: 45, Rad: spotRad2}
        ];
        return O;
    }
    this.putObj_dandares = function(O){
        O.speedLvl    = 2;
        O.speed     = 4;
        O.speedT    = 2;
        O.speedArr = [0,
            {S: O.speed - 3, T:O.speedT- -1.5},
            {S: O.speed, T:O.speedT},
            {S: O.speed- -4, T:O.speedT}
        ];

        var spotRad1 = 100- -parseInt(Math.random()*60);
        var spotRad2 = 160 -parseInt(Math.random()*60);
        O.spotTick = 8;
        O.spotArr=[0,
            { T: 'single', Ref: 35, Rad: spotRad1},
            { T: 'double', Ref: 20, Rad: spotRad1, Rad2: spotRad2, Angle2: 100- -parseInt(Math.random()*20)},
            { T: 'single', Ref: 45, Rad: spotRad2}
        ];
        return O;

    }

    this.putObj = function(Type,Mode,Side,x,y){
        if(typeof x === "undefined"){
            do{
                x = Math.random()*this.MapRadius*2-this.MapRadius;
                y = Math.random()*this.MapRadius*2-this.MapRadius;
            }while( Math.sqrt(x*x- -y*y) > this.MapRadius );
        }
        var L = this.Olen++;
        var Enemy='';


        var O={};
        O.x = x;
        O.y = y;
        O.S = Side;
        O.T = Type;
        O.M = Mode;
        O.periodDMG={};
        O.radius = 15;
        O.TT = 'dust';

        if(Type!='bullet')
            O = this.putObj_fromArray(O,Type);

        if(Type=='carras')   O = this.putObj_carras(O);
        if(Type=='muerto')   O = this.putObj_muerto(O);
        if(Type=='iskariot') O = this.putObj_iskariot(O);
        if(Type=='dandares') O = this.putObj_dandares(O);
        if(Type=='dregos')   O = this.putObj_dregos(O);
        if(Type=='hajaher')  O = this.putObj_hajaher(O);

        if(O.TT=='enemy'){
            Enemy=' enemy';
            ++this.EnemiesC;
            this.Enemies[ L ] = 1;
            O.angle        = parseInt(Math.random()*360);
            O.mapType = 'E';
            O.mapCollide = ['M'];
        }

        if(Type=='healing_missle' || Type=='missle' || Type=='bullet_bomb' || Type=='space_mine' || Type=='shieldBlob'){
            if(Side==2){
                O.mapType = 'M';
                O.mapCollide = ['E','ME','A'];
            } else{
                O.mapType = 'ME';
                O.mapCollide = ['P','M'];
            }
        }
        if(Type=='star' || Type=='Gstar'){
            O.mapType = 'A';
            // O.mapCollide = ['P','M','ME'];
        }
        if(Type=='bullet'){
            if(Side==3){
                O.mapType = 'B';
                O.mapCollide = ['P','M','E','ME','A','R'];
            }else if(Side==2){
                O.mapType = 'B';
                O.mapCollide = ['E','ME','A','R'];
            }else{
                O.mapType = 'BE';
                O.mapCollide = ['P','M','R'];
            }
        }

        if(Mode=='region'){
            O.mapType = 'R';
            O.mapCollide = ['P','E','M','ME','A'];
        }

        O.life = O.lifeM;

        // Map Objs: B-Bullets, BE-BulletsE, P-Player, M-Missles, E-Enemies, ME-MisslesE, R-Regions, D-Dead


        if(Type=='tartaros'){
            O.speedM    = O.speed    = 5;
            O.speedT    = 6;
        }
        if(Type=='edison'){
            O.speedM    = O.speed    = 3;
            O.speedT    = 6;
            O.FieldPower    = 3;
        }
        if(Type=='belzebub'){
            O.speedM    = O.speed    = 5;
            O.speedT    = 3;
        }
        if(Type=='nemezis'){
            O.speedM    = O.speed    = 3;
            O.speedT    = 2;
        }
        if(Type=='royale'){
            O.speedM    = O.speed    = 3;
            O.speedT    = 2;
        }
        if(Type=='warastein'){
            O.speedM    = O.speed    = 7;
            O.speedT    = 4;
        }
        if(Type=='hiacynt'){
            O.speedM    = O.speed    = 5;
            O.speedT    = 2;
        }

        if(Type=='orhenes'){
            O.speedM    = O.speed    = 1;
            O.speedT    = 1;
        }
        if(Type=='juggernaut'){
            O.speedM    = O.speed    = 1;
            O.speedT    = 1;
        }
        if(Type=='koriaz'){
            O.speedM    = O.speed    = 4;
            O.speedT    = 1;
        }
        if(Type=='fariax'){
            O.speedM    = O.speed    = 4;
            O.speedT    = 1;
        }
        if(Type=='cloacker'){
            O.speedM    = O.speed    = 6;
            O.speedT    = 4;
        }
        if(Type=='gargamon'){
            O.speedM    = O.speed = 2;
            O.speedT    = 1.5;
        }
        if(Type=='vitotas'){
            O.speedM    = O.speed    = 7.5- -Math.random()*1.5;
            O.speedT    = 2- -Math.random()*2;
            O.Distance = 650;
            O.Damage  = 5;
            O.LaserAim = 20;
        }

        if(Type=='bullet'){
            O.speed    = 12;
            O.angle    = 0;
            O.radius   = 4;
            O.dec      = 30;
            O.Power    = 1;
        }
        if(Type=='space_mine'){
            O.life     = 1;
            O.speed    = 0;
            O.angle    = 0;
            O.radius   = 6;
            O.dec      = 0;
            O.ammo     = 0;
            O.toDo     = 0;
            O.Power    = 4;
            O.Dist     = 35;
        }

        if(Type=='hiacynt_shield'){
            O.life    = O.lifeM = 5;
            O.speed    = 10;
            O.angle    = 0;
            O.radius= 21;
            O.dec    = 0;
            O.ammo    = 0;
            O.toDo    = 0;
        }


        if(Mode!='static' && Mode!='region')
            this.Omoving[ L ] = 1;
        if(Mode=='region')
            this.Oregion[ L ] = 1;

        if(Mode=='comp')
            if(Type!='bullet')    this.Ocomp[ L ] = Side;
                    else        this.Obullet[ L ] = Side;



        this.O[ L ]= O;


        if(O.squadSchemeType)
            this.prepareSquadScheme(O,L);

        if(O.squadScheme)
            this.checkSquadSchemeMakes(O);


        if(Type!='shieldBlob')
            CanvasManager.requestCanvas( L );

        if(Type!='bullet')
            this.putOnXY( L );
        if(Type=='juggernaut') this.addEnergyField(L,20,60);
        if(Type=='gargamon') this.addEnergyField(L,10,120);
        return L;
    }

    this.putObj_animation = function(Type,X,Y){
        var O = {};
        var o = this.Olen++;

        O.T = Type;
        O.TT = 'anim';
        O.M = 'anim';
        O.x = X;
        O.y = Y;
        O.radius = 15;
        O.angle = 0;
        O.timeTick = 0;

        if(Type=='hit_healing'){
            O.timeDeath = 25;
            O.radius = 15;
        }
        if(Type=='hit' || Type=='hit_energyField' || Type=='hit_blue'){
            O.timeDeath = 25;
            O.radius = 30;
        }
        if(Type=='hitBig'){
            O.timeDeath = 21;
            O.radius = 60;
        }
        if(Type=='explosion_35'){
            O.timeDeath = 25;
            O.radius = 35;
            O.angle = parseInt(Math.random()*360);
        }
        if(Type=='explosion_80'){
            O.timeDeath = 25;
            O.radius = 80;
            O.angle = parseInt(Math.random()*360);
        }
        if(Type=='explosion_120'){
            O.timeDeath = 25;
            O.radius = 120;
            O.angle = parseInt(Math.random()*360);
        }
        if(Type=='explosion_210'){
            O.timeDeath = 25;
            O.radius = 210;
            O.angle = parseInt(Math.random()*360);
        }

        this.Oanim[o] = 1;
        this.O[o] = O;
    }
    this.putObj_directAnim = function(Type,Data){
        var O = {};
        var o = this.Olen++;

        O.T = Type;
        O.TT = 'dirAnim';
        O.M = 'dirAnim';
        O.Data = Data;
        O.x = 0;
        O.y = 0;
        O.timeTick = -1;
        O.timeDeath = Data.timeDeath;

        this.Oanim[o] = 1;
        this.O[o] = O;

        return o;
    }
    this.setRegionAnimation = function(o,animType){
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

    this.removeObj = function(o,saveDiv){
        if(o==0) return false;
        if(typeof this.O[o] =='undefined') return false;
        // if(!saveDiv) $('#O_'+o).remove();

        if(this.O[o].T!='bullet' && this.O[o].T!='star' && this.O[o].TT!='anim' && this.O[o].TT!='dirAnim'){    // Czyli co?

            if(this.O[o].TT=='enemy')    this.removeFromXY(o,true);
                    else                this.removeFromXY(o);
            delete this.Enemies[o];

            if(typeof this.O[o].squadId !='undefined'){
                var S = this.Squads[ this.O[o].squadId ];
                if(o == S.Leader)
                    this.disbandSquad( this.O[o].squadId );
                else
                    delete S.Members[o];
            }
        }
        if(this.O[o].T=='star')    this.removeFromXY(o,true);

        if(this.O[o].TT == 'anim' || this.O[o].TT == 'dirAnim')
            delete this.Oanim[o];

        if(this.O[o].TT == 'enemy')
            this.Odead[ o ]={T:this.O[o].T,x:this.O[o].x,y:this.O[o].y};

        delete this.Omoving[o];
        delete this.Ocomp[o];
        delete this.Obullet[o];
        delete this.Oregion[o];
        if(this.O[o].TT!='enemy' && this.O[o].T!='star')
            delete this.O[o];
    }

    this.mouse_down = function(e){
        var P = $('#Game').offset();
        this.mouse_x = e.clientX-P.left;
        this.mouse_y = e.clientY-P.top;

        if(e.clientX > 50 && e.clientX < 121){
            var u = parseInt((e.clientY-this.Dy)/-32)-1;
            if(u>-1 && u< this.SHIP.Modules.length){
                if( this.SHIP.Modules[u].Disabled == 1) this.SHIP.Modules[u].Disabled = 0;
                            else                        this.SHIP.Modules[u].Disabled = 1;
                return true;
            }
        }
        if(e.clientY - this.Dy > -32){
            var u = parseInt((e.clientX-105)/33);
            if(u>-1 && u < this.SHIP.FireTypes.length){
                if(this.SHIP.FireType2!==false && e.which==3)
                    this.shipFunc_changeWeapon(2, u);
                else
                    this.shipFunc_changeWeapon(1, u);
                return true;
            }
        }
        if(this.SHIP.FireType2!==false && e.which==3)
            this.SHIP.MouseDown2=true;
        else
            this.SHIP.MouseDown1=true;
    }
    this.mouse_up = function(e){
        this.SHIP.MouseDown1=false;
        this.SHIP.MouseDown2=false;
    }
    this.mousemove = function(e){
        var P = $('#Game').offset();
        this.mouse_x = e.clientX-P.left;
        this.mouse_y = e.clientY-P.top;
    }
    this.keydown = function(e){
        if(e.keyCode==37 || e.keyCode==65){
            if(this.keyLeftRight == 0 && this.keyLeftLC- -7 > this.tick)    this.specialMove = 1;
            this.keyLeftRight = 1;
            if(this.keyLeftLC!=-1) this.keyLeftLC = this.tick;
        }
        if(e.keyCode==39 || e.keyCode==68){
            if(this.keyLeftRight == 0 && this.keyRightLC- -7 > this.tick)    this.specialMove = 2;
            this.keyLeftRight = -1;
            if(this.keyRightLC!=-1) this.keyRightLC = this.tick;
        }
        if(e.keyCode==38 || e.keyCode==87){
            if(this.keyUpDown == 0 && this.keyDownLC- -7 > this.tick)    this.specialMove = 3;
            this.keyUpDown = 1;
            if(this.keyDownLC!=-1) this.keyDownLC = this.tick;
        }
        if(e.keyCode==40 || e.keyCode==83){
            if(this.keyUpDown == 0 && this.keyUpLC- -7 > this.tick)    this.specialMove = 4;
            this.keyUpDown = -1;
            if(this.keyUpLC!=-1) this.keyUpLC = this.tick;
        }
    }
    this.keyup = function(e){
        if(e.keyCode==37 || e.keyCode==65)    this.keyLeftRight=0;
        if(e.keyCode==39 || e.keyCode==68)    this.keyLeftRight=0;
        if(e.keyCode==38 || e.keyCode==87)    this.keyUpDown=0;
        if(e.keyCode==40 || e.keyCode==83)    this.keyUpDown=0;


        if(e.keyCode > 48 && e.keyCode < 58){    // Numeric 1-9
            if(e.keyCode-49 < this.SHIP.FireTypes.length)
                this.shipFunc_changeWeapon(1, e.keyCode-49);
        }

        if(typeof this.SHIP.KeysModules[ e.keyCode ] !='undefined'){
            var M = this.SHIP.KeysModules[ e.keyCode ];
            for(var m=0; m < M.length; ++m){
                if(this.SHIP.Modules[ M[m] ].Disabled == 1)    this.SHIP.Modules[ M[m] ].Disabled = 0;
                                else                        this.SHIP.Modules[ M[m] ].Disabled = 1;
            }
        }

        if(e.keyCode==69){        // E - estimateMoves
            if(this.estimateMoves)    this.estimateMoves=false;
                    else            this.estimateMoves=true;
        }
        if(e.keyCode==80 && this.doEndGame==false){    // P - pause
            if(this.pause==false){
                this.pause=true;
                window.cancelAnimationFrame(this.intervalIndex);
                $('#pause').show();
            } else {
                this.pause=false;
                this.FRAME_TIME = new Date().getTime();
                this.intervalIndex = window.requestAnimationFrame(function(){ GAME.frame(); });
                $('#pause').hide();
            }
        }
        if(e.keyCode==27){    // ESC - escape
            this.endGame();
        }
    }


    this.putOnXY = function(o,ox,oy){    //!!
        var X1,Y1,X2,Y2,xi,yi,s,oldS={},newS={}, O = this.O[o];
        var M = this.MapTileSize;

        if(typeof oy!='undefined'){

            if(typeof O.squareCorners !='undefined'){
                X1 = O.squareCorners.E.x1;
                Y1 = O.squareCorners.E.y1;
                X2 = O.squareCorners.E.x2;
                Y2 = O.squareCorners.E.y2;
            }else{
                X1 = ox - O.radius;
                Y1 = oy - O.radius;
                X2 = ox- -O.radius;
                Y2 = oy- -O.radius;
            }
            xi=X1;
            while(true){
                if(xi>X2) xi=X2;
                yi=Y1;
                while(true){
                    if(yi>Y2) yi=Y2;
                    oldS[ parseInt(xi/M)+'_'+parseInt(yi/M) ]=1;
                    if(yi==Y2) break;
                    yi-=-M;
                }
                if(xi==X2) break;
                xi-=-M;
            }
        } else {
            this.Omap[O.mapType].elems++;
        }

        if(typeof O.squareCorners !='undefined'){
            X1 = O.squareCorners.E.x1;
            Y1 = O.squareCorners.E.y1;
            X2 = O.squareCorners.E.x2;
            Y2 = O.squareCorners.E.y2;
        }else{
            X1 = O.x - O.radius;
            Y1 = O.y - O.radius;
            X2 = O.x- -O.radius;
            Y2 = O.y- -O.radius;
        }
        xi=X1;
        while(true){
            if(xi>X2) xi=X2;
            yi=Y1;
            while(true){
                if(yi>Y2) yi=Y2;
                newS[ parseInt(xi/M)+'_'+parseInt(yi/M) ]=1;
                if(yi==Y2) break;
                yi-=-M;
            }
            if(xi==X2) break;
            xi-=-M;
        }

        for(s in oldS)
            if(newS[s]!=1)
                if(typeof this.Omap[O.mapType][s] !='undefined' && typeof this.Omap[O.mapType][s][o] !='undefined')
                    delete this.Omap[O.mapType][s][o];

        for(s in newS)
            if(oldS[s]!=1){
                if(typeof this.Omap[O.mapType][s] == 'undefined')
                    this.Omap[O.mapType][s]={};
                this.Omap[O.mapType][s][o]=1;
            }
    }
    this.removeFromXY = function(o,addToDead){    //!!
        var X1,Y1,X2,Y2,xi,yi,s,oldS={}, O = this.O[o];
        var M = this.MapTileSize;

        X1 = O.x - O.radius;
        Y1 = O.y - O.radius;
        X2 = O.x- -O.radius;
        Y2 = O.y- -O.radius;
        xi=X1;
        while(true){
            if(xi>X2) xi=X2;
            yi=Y1;
            while(true){
                if(yi>Y2) yi=Y2;
                oldS[ parseInt(xi/M)+'_'+parseInt(yi/M) ]=1;
                if(yi==Y2) break;
                yi-=-M;
            }
            if(xi==X2) break;
            xi-=-M;
        }
        this.Omap[O.mapType].elems--;

        for(s in oldS)
            if(typeof this.Omap[O.mapType][s] !='undefined' && typeof this.Omap[O.mapType][s][o] !='undefined')
                delete this.Omap[O.mapType][s][o];

        if(addToDead)
            for(s in oldS){
                if(typeof this.Omap['D'][s]=='undefined')
                    this.Omap['D'][s]={};
                this.Omap['D'][s][o]=1;
            }
    }
    this.getCollidingWithCircle = function(x,y,radius,collisionTab){
        var yi,oX,oY,oR,F,Map,Found={},FoundR={};
        var X1 = x - radius;
        var Y1 = y - radius;
        var X2 = x- -radius;
        var Y2 = y- -radius;
        var M = this.MapTileSize;
        var xi = X1;

        var jestCokolwiek = false;
        for(var ColT in collisionTab)
            if(this.Omap[ collisionTab[ColT] ].elems > 0){ jestCokolwiek=true; break; }
        if(!jestCokolwiek) return {};

        while(true){
            if(xi>X2) xi=X2;
            yi=Y1;
            while(true){
                if(yi>Y2) yi=Y2;
                for(var ColT in collisionTab)
                    if(typeof this.Omap[ collisionTab[ColT] ][ parseInt(xi/M)+'_'+parseInt(yi/M) ] !='undefined'){
                        Map = this.Omap[ collisionTab[ColT] ][ parseInt(xi/M)+'_'+parseInt(yi/M) ];
                        for(F in Map)
                            Found[F]=1;
                    }
                if(yi==Y2) break;
                yi-=-M;
            }
            if(xi==X2) break;
            xi-=-M;
        }

        for(F in Found) if(typeof this.O[F] != 'undefined'){
            if(typeof this.O[F].squareCorners != 'undefined'){
                if(this.checkSquareAndCircle(this.O[F],x,y,radius)){
                    FoundR[F]=1;
                }
            }else if(typeof this.O[F].coneAngle != 'undefined'){
                if(this.checkConeAndCircle(this.O[F],x,y,radius)){
                    FoundR[F]=1;
                }
            } else {
                oX = this.O[F].x-x;
                oY = this.O[F].y-y;
                oR = this.O[F].radius- -radius;
                if(oR*oR > oX*oX- -oY*oY){
                    FoundR[F]=1;
                }
            }
        }
        return FoundR;
    }
    this.getCollidingWithSquare = function(O,collisionTab){
        var yi,oX,oY,oR,F,Map,Found={},FoundR={};
        var X1 = O.squareCorners.E.x1;
        var Y1 = O.squareCorners.E.y1;
        var X2 = O.squareCorners.E.x2;
        var Y2 = O.squareCorners.E.y2;
        var M = this.MapTileSize;
        var xi = X1;

        var jestCokolwiek = false;
        for(var ColT in collisionTab)
            if(this.Omap[ collisionTab[ColT] ].elems > 0){ jestCokolwiek=true; break; }
        if(!jestCokolwiek) return {};

        while(true){
            if(xi>X2) xi=X2;
            yi=Y1;
            while(true){
                if(yi>Y2) yi=Y2;
                for(var ColT in collisionTab)
                    if(typeof this.Omap[ collisionTab[ColT] ][ parseInt(xi/M)+'_'+parseInt(yi/M) ] !='undefined'){
                        Map = this.Omap[ collisionTab[ColT] ][ parseInt(xi/M)+'_'+parseInt(yi/M) ];
                        for(F in Map)
                            Found[F]=1;
                    }
                if(yi==Y2) break;
                yi-=-M;
            }
            if(xi==X2) break;
            xi-=-M;
        }

        for(F in Found) if(typeof this.O[F] !='undefined'){
            if(this.checkSquareAndCircle(O,this.O[F].x,this.O[F].y,this.O[F].radius)){
                FoundR[F]=1;
            }
        }
        return FoundR;
    }
    this.getCollidingWithCone = function(O,collisionTab){
        var IDs={},yi,F,Map,Found={},FoundR={};
        var X1 = O.x - O.radius;
        var Y1 = O.y - O.radius;
        var X2 = O.x- -O.radius;
        var Y2 = O.y- -O.radius;
        var M = this.MapTileSize;
        var xi = X1;

        var jestCokolwiek = false;
        for(var ColT in collisionTab)
            if(this.Omap[ collisionTab[ColT] ].elems > 0){ jestCokolwiek=true; break; }
        if(!jestCokolwiek) return {};

        while(true){
            if(xi>X2) xi=X2;
            yi=Y1;
            while(true){
                if(yi>Y2) yi=Y2;
                IDs[ parseInt(xi/M)+'_'+parseInt(yi/M) ]=1;
                if(yi==Y2) break;
                yi-=-M;
            }
            if(xi==X2) break;
            xi-=-M;
        }

        for(var ID in IDs)
            for(var ColT in collisionTab)
                if(typeof this.Omap[ collisionTab[ColT] ][ ID ] !='undefined'){
                    Map = this.Omap[ collisionTab[ColT] ][ ID ];
                    for(F in Map)
                            Found[F]=1;
                }

        for(F in Found) if(typeof this.O[F] !='undefined'){
            if(this.checkConeAndCircle(O,this.O[F].x,this.O[F].y,this.O[F].radius)){
                FoundR[F]=1;
            }
        }

        return FoundR;
    }
    this.checkSquareAndCircle = function(O,Qx,Qy,Qradius){
        var Radi=Math.PI/180;
        var x2 = O.x- -O.squareLen*Math.sin( (-parseInt(O.squareAngle)-180)*Radi);
        var y2 = O.y- -O.squareLen*Math.cos( (-parseInt(O.squareAngle)-180)*Radi);

        var A = Qx - O.x- -Qradius*Math.sin((-parseInt(O.squareAngle)-180)*Radi);
        var B = Qy - O.y- -Qradius*Math.cos((-parseInt(O.squareAngle)-180)*Radi);
        var C = x2 - O.x- -2*Qradius*Math.sin((-parseInt(O.squareAngle)-180)*Radi);
        var D = y2 - O.y- -2*Qradius*Math.cos((-parseInt(O.squareAngle)-180)*Radi);

        var dot = A*C- -B*D;
        var len_sq = C*C- -D*D;
        var param = -1;
        if (len_sq != 0)
            param = dot / len_sq;

        if(param >=0 && param <= 1){
            var oX = Qx - O.x - param*C;
            var oY = Qy - O.y - param*D;
            var oR = Qradius- -O.squareWidth;
            if(oR*oR > oX*oX- -oY*oY){
                return true;
            }
        }
        return false;
    }
    this.checkConeAndCircle = function(O,Qx,Qy,Qradius){
        var oX = O.x-Qx;
        var oY = O.y-Qy;
        var oR = O.radius- -Qradius;
        if(oR*oR < oX*oX- -oY*oY)
            return false;

        if(O.coneRad2 != 0){
            oR = O.coneRad2 - Qradius;
            if(oR*oR > oX*oX- -oY*oY)
                return false;
        }

        if(O.coneAngle < 180){
            var oA = parseInt(-Math.atan2(oX,oY)*(180/Math.PI)- -360)%360;
            var qA1 = (O.angle - O.coneAngle- -360)%360;
            var qA2 = (O.angle- -O.coneAngle- -360)%360;
            if(qA1 > qA2){
                if(!(oA > qA1 || oA < qA2)) return false;
            }else{
                if(!(oA > qA1 && oA < qA2)) return false;
            }
        }
        return true;
    }
    this.countSquareCorners = function(x,y,angle,len,width){
        var sC={A:{},B:{},C:{},D:{},E:{}};
        var Radi=Math.PI/180;

        sC.A.x = x - width * Math.sin( (-parseInt(angle) - 90)*Radi);
        sC.A.y = y - width * Math.cos( (-parseInt(angle) - 90)*Radi);
        sC.D.x = x - width * Math.sin( (-parseInt(angle)- -90)*Radi);
        sC.D.y = y - width * Math.cos( (-parseInt(angle)- -90)*Radi);

        x -=- len * Math.sin( (-parseInt(angle)-180)*Radi);
        y -=- len * Math.cos( (-parseInt(angle)-180)*Radi);

        sC.B.x = x - width * Math.sin( (-parseInt(angle) - 90)*Radi);
        sC.B.y = y - width * Math.cos( (-parseInt(angle) - 90)*Radi);
        sC.C.x = x - width * Math.sin( (-parseInt(angle)- -90)*Radi);
        sC.C.y = y - width * Math.cos( (-parseInt(angle)- -90)*Radi);

        sC.E.x1 = sC.A.x;
        sC.E.x2 = sC.A.x;
        sC.E.y1 = sC.A.y;
        sC.E.y2 = sC.A.y;

        for(var j in {'B':1,'C':1,'D':1}){
            if(sC.E.x1 > sC[j].x) sC.E.x1 = sC[j].x;
            if(sC.E.x2 < sC[j].x) sC.E.x2 = sC[j].x;
            if(sC.E.y1 > sC[j].y) sC.E.y1 = sC[j].y;
            if(sC.E.y2 < sC[j].y) sC.E.y2 = sC[j].y;
        }

        return sC;
    }

    this.checkHits = function(o){
        var F,O = this.O[o];
        if(typeof O.squareCorners !='undefined'){
            var Found = this.getCollidingWithSquare(O,O.mapCollide);
        }else if(typeof O.coneAngle !='undefined'){
            var Found = this.getCollidingWithCone(O,O.mapCollide);
        }else
            var Found = this.getCollidingWithCircle(O.x,O.y,O.radius,O.mapCollide);
        for(F in Found)
            this.hit(o,F,O.Power);
    }

    this.hit = function(o,q,DMG){
        if(o==q) return 1;
        var O = this.O[o];
        var Q = this.O[q];
        if(typeof O=='undefined') return 1;

        if(O.T=='star'){            var U=Q; Q=O; O=U; }
        if(O.T=='Gstar'){            var U=Q; Q=O; O=U; }
        if(Q.T=='bullet'){            var U=Q; Q=O; O=U; }

        if(O.dontHit){ for(var i=0; i<O.dontHit.length; ++i) if(O.dontHit[i]==Q.mapType) return 1; }
        if(Q.dontHit){ for(var i=0; i<Q.dontHit.length; ++i) if(Q.dontHit[i]==O.mapType) return 1; }

        if(typeof O.SlowDownTo !='undefined'){ this.regionSpeedChange(O,Q); return 1; }
        if(typeof Q.SlowDownTo !='undefined'){ this.regionSpeedChange(Q,O); return 1; }

        if(O.bounceType){    this.regionAngleChange(O,Q); return 1; }
        if(Q.bounceType){    this.regionAngleChange(Q,O); return 1; }

        if(O.vectorType){    this.regionVectorChange(O,Q); return 1; }
        if(Q.vectorType){    this.regionVectorChange(Q,O); return 1; }

        if(O.teleportOnHit){ this.region_teleportOnHit(O,q); return 1; }
        if(Q.teleportOnHit){ this.region_teleportOnHit(Q,o); return 1; }

        if((Q.T=='star' || Q.T=='shieldBlob') && O.T=='ship')
            if(O.speed > 3) O.speed=3;

        if(O.onHit && O.onHit.Do=='explode' && Q.S!=O.S && Q.M!='region'){    this.explodeBomb(o,O.onHit);    return true; }

        if(O.PeriodTime)    this.makePeriodEffect(o,q);
        if(Q.PeriodTime)    this.makePeriodEffect(q,o);

        if(O.OneTimeEffect)    this.makeOneTimeEffect(o,q);
        if(Q.OneTimeEffect)    this.makeOneTimeEffect(q,o);

        DMG=O.Power;

        if(O.T=='missle' || O.T=='bullet'){
            if(O.S==Q.S) return 1;

            if(Q.T=='ship'){
                this.makeDMG(q,DMG,o);
                this.shipFunc_showHealth();
            }
            if(Q.TT=='enemy' || Q.T=='star' || Q.T=='missle' || Q.T=='bullet_bomb' || Q.T=='shieldBlob')
                this.makeDMG(q,DMG,o);
            if(Q.T=='space_mine'){
                this.explodeBomb(q,Q.onDie);
                this.removeObj(o);
            }
            if(Q.T=='healing_missle')
                this.removeObj(q);
        }
    }
    this.makePeriodEffect = function(o,q){
        var O = this.O[o];
        var Q = this.O[q];

        if(Q.T=='bullet_bomb' && (typeof O.dontHurtOwnMissle != 'undefined' && O.dontHurtOwnMissle==true) && O.S==Q.S) return 1;

        var makeAction = false;
        for(var P in Q.periodDMG)
            if(Q.periodDMG[P] < this.tick-1)
                delete Q.periodDMG[P];

        if(typeof Q.periodDMG[o] == 'undefined'){
            if(O.PeriodOffset)
                Q.periodDMG[o] = this.tick- -O.PeriodOffset;
            else
                makeAction = true;

        } else {
            if(Q.periodDMG[o] < this.tick)
                makeAction = true;
        }

        if(makeAction){
            if(O.PeriodDamage){
                if(this.makeDMG(q,O.PeriodDamage))
                    Q.periodDMG[o] = this.tick- -O.PeriodTime;
            }
            if(O.PeriodHeal){
                this.healObj(q,O.PeriodHeal);
                Q.periodDMG[o] = this.tick- -O.PeriodTime;
            }
        }

    }
    this.makeOneTimeEffect = function(o,q){
        var O = this.O[o];
        var Q = this.O[q];

        var makeAction = false;
        if(typeof Q.periodDMG[o] == 'undefined'){
            if(O.OneTimeOffset){
                Q.periodDMG[o] = this.tick- -O.OneTimeOffset;
            } else {
                makeAction = true;
            }
        } else {
            if(Q.periodDMG[o] == this.tick){
                makeAction = true;
                delete Q.periodDMG[o];
            }
            if(Q.periodDMG[o] < this.tick){
                Q.periodDMG[o] = this.tick- -O.OneTimeOffset;
            }
        }

        if(makeAction){
            if(O.OneTimeDamage){
                this.makeDMG(q,O.OneTimeDamage);
                delete(O.OneTimeDamage);
            }
            delete(O.OneTimeEffect);
            if(O.fieldAnim=='ElectricityField'){
                O.animType='EleFieldEnd';
                O.animTick = 0;
                O.DieTime = this.tick- -25;
            }
        }
    }
    this.makeDMG = function(o,DMG,q){
        var O = this.O[o];
        if(O.life < 1) return false;
        if(O.shieldD > 0){
            if(q) this.removeObj(q);
            return false;
        }
        if(O.undestructible){
            if(q) this.removeObj(q);
            return false;
        }
        if(O.energyField > 0){
            if(!q) q=-1;
            this.hitEnergyField(o,q,DMG);
            if(q) this.removeObj(q);
            return true;
        }
        if(O.Res && O.Res['jump'] && O.Res['jump'].R > 0){
            if(this.teleportJump(o,170,Math.random()*360)){
                --O.Res['jump'].R;
                this.checkHits(o);
                this.removeObj(q);
            }
            return false;
        }

        if(q){
            var Q = this.O[q];
            this.putObj_animation('hit', Q.x, Q.y);
            this.removeObj(q);
        } else {
            this.putObj_animation('hit', O.x, O.y);
        }
        for(var Daga=1; Daga < DMG; ++Daga){
            if(Daga >= O.life) break;
            var U = 20;
            DagaDagaX = parseInt(Math.random()*U*2-U);
            DagaDagaY = parseInt(Math.random()*U*2-U);
            this.putObj_animation('hit', (O.x-DagaDagaX), (O.y-DagaDagaY));
        }

        O.life-=DMG;
        if(O.T=='ship') this.shipFunc_showHealth();
        CanvasManager.requestCanvas( o );
        O.gotHitFlag = true;

        if(O.life <= 0){
            this.dieObj(O,o);
        }
        return true;
    }
    this.dieObj = function(O,o){
        if(O.TT=='enemy') --this.EnemiesC;
        if(O.T!='missle' && O.T!='bullet_bomb' && O.T!='space_mine')
            this.putObj_animation('hitBig', O.x, O.y);

        if(O.squadDirectPlace){
            var U = this.O[ O.squadDirectPlace.o ];
            U.squadScheme[ O.squadDirectPlace.i ].Oid=-1;
        }
        if(O.squadScheme)
            this.disbandSquad(O);

        if(O.T=='space_mine') {
            O.toDo=[{T:'explode'}];
            O.gotHitFlag = false;
            O.doingTime = 3;
        }
        else if(O.onDie){
            this.explodeBomb(o,O.onDie);
        }
        else
            this.removeObj(o,true);


        return true;
    }
    this.healObj = function(q,DMG,o){
        var Q = this.O[q];
        if(Q.life == Q.lifeM) return false;
        if(o){
            this.putObj_animation('hit_blue', this.O[o].x, this.O[o].y);
            this.removeObj(o);
        } else{
            this.putObj_animation('hit_healing', Q.x, Q.y);
        }
        Q.life-=-DMG;
        if(Q.life > Q.lifeM) Q.life = Q.lifeM;
        if(q == 0)
            this.shipFunc_showHealth();
        CanvasManager.requestCanvas( q );
    }
    this.hitEnergyField = function(o,q,DMG){
        var O = this.O[o];
        if(q > 0)
            this.putObj_animation('hit_energyField', this.O[q].x, this.O[q].y);
        else {
            this.putObj_animation('hit_energyField', O.x, O.y);
            if(DMG >1)     this.putObj_animation('hit_energyField', (O.x-10), (O.y- -5));
            if(DMG >2)     this.putObj_animation('hit_energyField', (O.x- -5), (O.y- -10));
            if(DMG >3)     this.putObj_animation('hit_energyField',  (O.x- -10), (O.y-5));
        }
        O.energyField-=DMG;
        if(O.energyField < 0) O.energyField = 0;
        if(O.T=='ship') this.shipFunc_showHealth();

    }
    this.regionAngleChange = function(Q,O){
        if(Q.bounceType=='wind'){
            var kat = Q.windAngle;
            var kat2 = (O.angle - kat- -720)%360;
            var BF=1;
            if(Q.bounceForce) BF = Q.bounceForce;
            if(kat2 < 180-BF)    O.angle = (O.angle - BF)%360;
            if(kat2 > 180- -BF)    O.angle = (O.angle- -BF)%360;
            return O;
        }

        if(Q.coneAngle)    return this.regionAngleChange_fieldCone(Q,O);
        if(Q.squareCorners)    return this.regionAngleChange_fieldSquare(Q,O);

        if(Q.bounceType=='straight'){
            var kat = (-Math.atan2(Q.x-O.x,Q.y-O.y)*(180/Math.PI))%360;
            O.angle = kat;
            return O;
        }
        if(Q.bounceType=='diagonal'){
            var kat = (-Math.atan2(Q.x-O.x,Q.y-O.y)*(180/Math.PI)- -360)%360;
            var kat2 = (O.angle - kat - -720)%360;
            if(kat2 > 90 && kat2 < 270)
                O.angle = (kat- -180 - kat2)%360;
            return O;
        }
        if(Q.bounceType=='gentle'){
            var kat = (-Math.atan2(Q.x-O.x,Q.y-O.y)*(180/Math.PI)- -360)%360;
            var dist = Math.sqrt(Math.pow(Q.x-O.x,2),Math.pow(Q.y-O.y,2));
            var kat2 = (O.angle - kat- -720)%360;
            var BF=1;
            if(Q.bounceForce) BF = Q.bounceForce;
            if(O.speed) BF = BF*(O.speed/10) / (dist/100);
            if(BF > 90) BF = 90;
            if(kat2 <= 180)    O.angle = (O.angle - BF)%360;
            if(kat2 > 180)    O.angle = (O.angle- -BF)%360;
            return O;
        }
        if(Q.bounceType=='orbital'){
            var kat = (-Math.atan2(Q.x-O.x,Q.y-O.y)*(180/Math.PI)- -360)%360;
            var kat2 = (O.angle - kat- -720)%360;
            var BF1 = 2, BF2 = 2;
            if(Q.bounceForce1) BF1 = Q.bounceForce1;
            if(Q.bounceForce2) BF2 = Q.bounceForce2;
            if(kat2 <= 90)                    O.angle = (O.angle- -BF2)%360;
            if(kat2 > 90 && kat2 <= 180)    O.angle = (O.angle - BF1)%360;
            if(kat2 > 180 && kat2 <= 270)    O.angle = (O.angle- -BF1)%360;
            if(kat2 > 270)                    O.angle = (O.angle - BF2)%360;
            return O;
        }
        if(Q.bounceType=='gravity'){
            var kat = (-Math.atan2(Q.x-O.x,Q.y-O.y)*(180/Math.PI)- -360)%360;
            var dist = Math.sqrt(Math.pow(Q.x-O.x,2),Math.pow(Q.y-O.y,2));
            var kat2 = (O.angle - kat- -720)%360;
            var BF=1;
            if(Q.bounceForce) BF = Q.bounceForce;
            if(O.speed) BF = BF*(O.speed/10) / (dist/130);
            if(BF > 20) BF = 20;
            if(kat2 < 180-BF)    O.angle = (O.angle- -BF)%360;
            if(kat2 > 180- -BF)    O.angle = (O.angle - BF)%360;
            return O;
        }

        return O;
    }
    this.regionAngleChange_fieldCone = function(Q,O){
        var hitAngle='outside';
        var aX = Q.x-O.x;
        var aY = Q.y-O.y;
        var Radi = Math.PI/180;


        var dist = Math.sqrt(aX*aX- -aY*aY);
        if(Q.radius-dist > dist-Q.coneRad2) hitAngle='inside';

        var oldX = O.x- -20*Math.sin((-parseInt(O.angle))*Radi);    // stare po�o�enie
        var oldY = O.y- -20*Math.cos((-parseInt(O.angle))*Radi);
        var uX = Q.x-oldX;    // odleg�o�� od �rodka ro�ka
        var uY = Q.y-oldY;
        var oAngle = (-Math.atan2(aX,aY)/Radi- -720)%360;
        var oldAngle = -Math.atan2(uX,uY)/Radi;
        var coneAngle1 = (Q.angle - Q.coneAngle- -720)%360;
        var coneAngle2 = (Q.angle- -Q.coneAngle- -720)%360;

        var beenOut = 'nop';
        if(!betweenAngles(oldAngle,coneAngle1,coneAngle2)) beenOut='yes';

        if(beenOut=='yes'){
            var varA1 = Math.abs(oAngle - coneAngle1);
            var varA2 = Math.abs(oAngle - coneAngle2);
            if(varA1 < varA2)    beenOut='tryLeft';
                    else        beenOut='tryRight';


            if(beenOut=='tryLeft'){
                uX = Q.x- -Q.coneRad2 * Math.sin((-coneAngle1-180)*Radi);
                uY = Q.y- -Q.coneRad2 * Math.cos((-coneAngle1-180)*Radi);
                varA1 = (-Math.atan2(O.x-uX,O.y-uY)/Radi- -180)%360;

                uX = Q.x- -Q.radius * Math.sin((-coneAngle1-180)*Radi);
                uY = Q.y- -Q.radius * Math.cos((-coneAngle1-180)*Radi);
                varA2 = (-Math.atan2(O.x-uX,O.y-uY)/Radi- -180)%360;

                if(betweenAngles(O.angle,varA1,varA2)) hitAngle='left';
            }
            if(beenOut=='tryRight'){
                uX = Q.x- -Q.radius * Math.sin((-coneAngle2-180)*Radi);
                uY = Q.y- -Q.radius * Math.cos((-coneAngle2-180)*Radi);
                varA1 = (-Math.atan2(O.x-uX,O.y-uY)/Radi- -180)%360;

                uX = Q.x- -Q.coneRad2 * Math.sin((-coneAngle2-180)*Radi);
                uY = Q.y- -Q.coneRad2 * Math.cos((-coneAngle2-180)*Radi);
                varA2 = (-Math.atan2(O.x-uX,O.y-uY)/Radi- -180)%360;

                if(betweenAngles(O.angle,varA1,varA2)) hitAngle='right';
            }
        }


        if(hitAngle=='left'){
            if(Q.bounceType=='straight'){
                var kat = (coneAngle1-90 - -360)%360;
                O.angle = kat;
                return O;
            }
            if(Q.bounceType=='diagonal'){
                var kat = (coneAngle1-90 - -360)%360;
                var kat2 = (O.angle - kat - -720)%360;
                if(kat2 > 90 && kat2 < 270)
                    O.angle = (kat- -180 - kat2)%360;
                return O;
            }
        }
        if(hitAngle=='right'){
            if(Q.bounceType=='straight'){
                var kat = (coneAngle2- -90 - -360)%360;
                O.angle = kat;
                return O;
            }
            if(Q.bounceType=='diagonal'){
                var kat = (coneAngle2- -90 - -360)%360;
                var kat2 = (O.angle - kat - -720)%360;
                if(kat2 > 90 && kat2 < 270)
                    O.angle = (kat- -180 - kat2)%360;
                return O;
            }
        }
        if(hitAngle=='outside'){
            if(Q.bounceType=='straight'){
                var kat = (-Math.atan2(aX,aY)*(180/Math.PI))%360;
                O.angle = kat;
                return O;
            }
            if(Q.bounceType=='diagonal'){
                var kat = (-Math.atan2(aX,aY)*(180/Math.PI)- -360)%360;
                var kat2 = (O.angle - kat - -720)%360;
                if(kat2 > 90 && kat2 < 270)
                    O.angle = (kat- -180 - kat2)%360;
                return O;
            }
        }
        if(hitAngle=='inside'){
            if(Q.bounceType=='straight'){
                var kat = (-Math.atan2(aX,aY)*(180/Math.PI)- -180)%360;
                O.angle = kat;
                return O;
            }
            if(Q.bounceType=='diagonal'){
                var kat2 = (O.angle - oAngle - -720)%360;
                if(kat2 < 90 || kat2 > 270)
                    O.angle = (oAngle- -180 - kat2)%360;
                return O;
            }
        }

      //  return O;
    }
    this.regionAngleChange_fieldSquare = function(Q,O){
        var A1,A2,M,N,Mar = ['A','B','C','D','A'];
        var Radi = Math.PI/180;

        for(var i=0; i<4; ++i){
            M = Q.squareCorners[Mar[i]];
            N = Q.squareCorners[Mar[i- -1]];

            A1 = (-Math.atan2(O.x-N.x,O.y-N.y)/Radi- -180)%360;
            A2 = (-Math.atan2(O.x-M.x,O.y-M.y)/Radi- -180)%360;

            if(betweenAngles(O.angle,A1,A2)){
                //  this.putObj_animation('hit', M.x, M.y);
                //  this.putObj_animation('hit', N.x, N.y);

                if(Q.bounceType=='straight'){
                    var kat = (-Math.atan2(M.x-N.x,M.y-N.y)*(180/Math.PI)- -90)%360;
                    O.angle = kat;
                    return O;
                }
                if(Q.bounceType=='diagonal'){
                    var kat = (-Math.atan2(M.x-N.x,M.y-N.y)*(180/Math.PI)- -90)%360;
                    var kat2 = (O.angle - kat - -720)%360;
                    if(kat2 > 90 && kat2 < 270)
                        O.angle = (kat- -180 - kat2)%360;
                    return O;
                }
                return O;
            }
        }
        return O;
    }
    this.regionVectorChange = function(Q,O){
        if(Q.vectorType=='wind'){
            if( typeof O.vector == 'undefined') O.vector = [];
            O.vector[ O.vector.length ] = {angle: Q.windAngle, speed: Q.vectorForce};
            return O;
        }
        if(Q.vectorType=='gentle'){
            var dist = Math.sqrt(Math.pow(Q.x-O.x,2),Math.pow(Q.y-O.y,2));
            var angleToCenter = (-Math.atan2(Q.x-O.x,Q.y-O.y)*(180/Math.PI)- -180)%360;
            var force = Q.vectorForce * ((Q.radius - dist)/Q.radius);
            if( typeof O.vector == 'undefined') O.vector = [];
            O.vector[ O.vector.length ] = {angle: angleToCenter, speed: force};
            return O;
        }
        if(Q.vectorType=='orbital'){
            var dist = Math.sqrt(Math.pow(Q.x-O.x,2),Math.pow(Q.y-O.y,2));
            var angleToCenter = (-Math.atan2(Q.x-O.x,Q.y-O.y)*(180/Math.PI)- -90)%360;
            var force = Q.vectorForce- -Q.vectorForceAdd * ((Q.radius - dist)/Q.radius);
            if( typeof O.vector == 'undefined') O.vector = [];
            O.vector[ O.vector.length ] = {angle: angleToCenter, speed: force};
            return O;
        }
        if(Q.vectorType=='gravity'){
            var angleToCenter = (-Math.atan2(Q.x-O.x,Q.y-O.y)*(180/Math.PI)- -180)%360;
            if( typeof O.vector == 'undefined') O.vector = [];
            O.vector[ O.vector.length ] = {angle: angleToCenter, speed: Q.vectorForce};
            return O;
        }

        return O;
    }
    this.region_teleportOnHit = function(TP,o){
        var Angle=0,Dist=100,O = this.O[o];


          //  {What:{RoundField:1},objData:{x:-700,y:-67, radius:10, simpleFilling: 'rgba(155,155,255,0.8)', teleportOnHit: 'random', teleportOnHitDist: 500}},
          //  {What:{RoundField:1},objData:{x:-600,y:0, radius:10, simpleFilling: 'rgba(155,155,255,0.8)', teleportOnHit: 120,  teleportOnHitDist: 300, teleportOnHitDistPlus: 300}},
          //  {What:{RoundField:1},objData:{x:-700,y:67, radius:10, simpleFilling: 'rgba(155,155,255,0.8)', teleportOnHit: 'aligned', teleportOnHitDist: 1000}},

        if(!isNaN(TP.teleportOnHit)){
            Angle = TP.teleportOnHit;
        } else if(TP.teleportOnHit=='random'){
            Angle = parseInt(Math.random()*360);
        } else if(TP.teleportOnHit=='aligned'){
            Angle = O.angle;
        }
        Dist = TP.teleportOnHitDist;
        if(TP.teleportOnHitDistPlus) Dist-=- parseInt(Math.random()*TP.teleportOnHitDistPlus);


        if(this.teleportJump(o,Dist,Angle)){
            this.checkHits(o);
        }
    }
    this.regionSpeedChange = function(Q,O){
        if(Q.SlowDownTo >= O.speed) return 1;
        if(Q.SlowDownBy){
            O.speed-=Q.SlowDownBy;
            if(O.speed < Q.SlowDownTo)
                O.speed = Q.SlowDownTo;
        }else{
            O.speed = Q.SlowDownTo;
        }
    }

    this.shootBullet = function(o,Angle,Speed,Dec,Power){
        var O = this.O[o];
        var L = this.putObj('bullet','comp',O.S,O.x,O.y);
        this.O[L].speed = Speed;
        this.O[L].dec = Dec;
        this.O[L].angle = Angle;
        this.O[L].Power = Power;
    }
    this.shootBulletOnSide = function(o,Enemy,Speed,Dec,SideAngle,SideDist,Power){
        var O = this.O[o];
        var Xp = O.x- -SideDist * Math.sin((-parseInt(O.angle- -SideAngle)-180)*(Math.PI/180));
        var Yp = O.y- -SideDist * Math.cos((-parseInt(O.angle- -SideAngle)-180)*(Math.PI/180));

        var X = Xp-this.O[Enemy].x;
        var Y = Yp-this.O[Enemy].y;
        var Angle = parseInt(- (Math.atan2(X,Y)*180/Math.PI))%360;

        var L = this.putObj('bullet','comp',O.S,Xp,Yp);
        this.O[L].speed = Speed;
        this.O[L].dec = Dec;
        this.O[L].angle = Angle;
        this.O[L].Power = Power;
    }
    this.shootBulletOnSide2 = function(o,Enemy,Speed,Dec,SideAngle,SideDist,Power){
        var O = this.O[o];

        var X = O.x-this.O[Enemy].x;
        var Y = O.y-this.O[Enemy].y;
        var Angle = parseInt(- (Math.atan2(X,Y)*180/Math.PI))%360;
        var Xp = O.x- -SideDist * Math.sin((-parseInt(O.angle- -SideAngle)-180)*(Math.PI/180));
        var Yp = O.y- -SideDist * Math.cos((-parseInt(O.angle- -SideAngle)-180)*(Math.PI/180));

        var L = this.putObj('bullet','comp',O.S,Xp,Yp);
        this.O[L].speed = Speed;
        this.O[L].dec = Dec;
        this.O[L].angle = Angle;
        this.O[L].Power = Power;
    }
    this.shootMissle = function(o,Angle,Speed,Dec,SpeedT){
        var O = this.O[o];
        var L = this.putObj('missle','comp',O.S,O.x,O.y);
        this.O[L].speed = Speed;
        this.O[L].doingTime = Dec;
        this.O[L].Manouver = 'followEnemy';
        this.O[L].angle = Angle;
        this.O[L].speedT = SpeedT || 3;
    }
    this.shootHealingMissle = function(o,Target,Angle){
        var O = this.O[o];
        var L = this.putObj('healing_missle','comp',O.S,O.x,O.y);
        this.O[L].angle = Angle;
        this.O[L].target = Target;
    }
    this.dropSpaceMine = function(o,Angle){
        var O = this.O[o];
        var L = this.putObj('space_mine','comp',O.S,O.x,O.y);
        if(Angle){
            this.O[L].angle=Angle;
            this.O[L].speed=20;
            this.O[L].dec=20;
            this.O[L].toDo='wait';
        } else {
            delete this.Omoving[L];
        }
    }
    this.shootBomb = function(o,Angle,Speed,Dec,Power,Radius){
        var O = this.O[o];
        var L = this.putObj('bullet_bomb','comp',O.S,O.x,O.y);
        this.O[L].speed = Speed;
        this.O[L].dec = Dec;
        this.O[L].angle = Angle;
        this.O[L].Power = Power;
        this.O[L].Dist = Radius;
    }
    this.explodeBomb = function(o,explodeObj){
        var i,L,O = this.O[o];

        if(explodeObj.explodeType=='nails'){
            for(i=0; i<360; i-=-explodeObj.NailsRad){
                if(explodeObj.NailsNeutral)
                    L = this.putObj('bullet','comp',3,O.x,O.y);
                else
                    L = this.putObj('bullet','comp',O.S,O.x,O.y);
                this.O[ L ].speed = explodeObj.NailsSpeed;
                if(explodeObj.NailsSpeedPlus)
                    this.O[ L ].speed-=-Math.random()*explodeObj.NailsSpeedPlus;
                this.O[ L ].dec = explodeObj.NailsDec;
                if(explodeObj.NailsDecPlus)
                    this.O[ L ].dec-=-parseInt(Math.random()*explodeObj.NailsDecPlus);
                this.O[ L ].angle = i;
                this.O[ L ].Power = 1;
                if(explodeObj.NailsAngleCenter){
                    if(explodeObj.NailsAngleBoth==1 && L%2==0)
                        this.O[ L ].speedT = - explodeObj.NailsAngleCenter;
                    else
                        this.O[ L ].speedT = explodeObj.NailsAngleCenter;
                }
            }
        }
        else if(explodeObj.explodeType=='nailsCone'){
            for(i=0; i<explodeObj.Nails; ++i){
                if(explodeObj.NailsNeutral)
                    L = this.putObj('bullet','comp',3,O.x,O.y);
                else
                    L = this.putObj('bullet','comp',O.S,O.x,O.y);
                this.O[ L ].angle = O.angle - explodeObj.NailsRad/2- -i*(explodeObj.NailsRad/explodeObj.Nails);
                this.O[ L ].speed = explodeObj.NailsSpeed;
                if(explodeObj.NailsSpeedPlus)
                    this.O[ L ].speed-=-Math.random()*explodeObj.NailsSpeedPlus;
                this.O[ L ].dec = explodeObj.NailsDec;
                if(explodeObj.NailsDecPlus)
                    this.O[ L ].dec-=-parseInt(Math.random()*explodeObj.NailsDecPlus);
                this.O[ L ].Power = 1;
                if(explodeObj.NailsAngleCenter)
                    this.O[ L ].speedT = -((i- -0.5)/(explodeObj.Nails/2)- 1) * explodeObj.NailsAngleCenter;


            }
        }
        else if(explodeObj.explodeType=='roundField'){
            L = this.putObj('RoundField','region',O.S,O.x,O.y);
            this.O[ L ].radius = explodeObj.radius;
            if(explodeObj.PeriodDamage){
                this.O[ L ].PeriodDamage = explodeObj.PeriodDamage;
                this.O[ L ].PeriodTime = explodeObj.PeriodTime;
                this.O[ L ].PeriodOffset = explodeObj.PeriodOffset;
            }
            if(explodeObj.dontHit){
                this.O[ L ].dontHit = cloneObj(explodeObj.dontHit);
            }
            if(explodeObj.BounceForce){
                this.O[ L ].bounceForce = explodeObj.BounceForce;
                this.O[ L ].bounceType = explodeObj.BounceAngle;
            }
            this.O[L].DieTime = this.tick- -explodeObj.ExpireTime;
            this.setRegionAnimation(L,explodeObj.fieldAnim);
        }
        else {
            L = this.putObj('destruction_field','region',O.S,O.x,O.y);
            this.O[L].radius = explodeObj.Dist;
            this.O[L].ActiveTime = this.tick- -2;
            this.O[L].DieTime = this.tick- -6;
            this.O[L].PeriodDamage = explodeObj.Power;
            this.O[L].PeriodTime = 10;
            this.O[L].dontHurtOwnMissle = true;
            this.O[L].dontHit=['B','BE'];
            this.O[L].undestructible=1;
            this.putObj_animation('explosion_'+explodeObj.Dist, O.x, O.y);
        }
        if(explodeObj.Shards)
            if(explodeObj.ShardsNum){
                var iRad = parseInt(Math.random()*360);
                for(i=0; i < explodeObj.ShardsNum; ++i){
                    L = this.putObj('bullet_bomb','comp',O.S,O.x,O.y);
                    this.O[L].angle = parseInt(iRad- -i*(360/explodeObj.ShardsNum)- -360)%360;
                    this.O[L].speed = explodeObj.Shards.Speed;
                    this.O[L].doingTime = explodeObj.Shards.Dec;
                    if(explodeObj.Shards.SpeedPlus)
                        this.O[ L ].speed-=-Math.random()*explodeObj.Shards.SpeedPlus;
                    if(explodeObj.Shards.DecPlus)
                        this.O[ L ].doingTime-=-parseInt(Math.random()*explodeObj.Shards.DecPlus);

                    if(explodeObj.Shards.onHit)        this.O[L].onHit = cloneObj( explodeObj.Shards.onHit );
                    if(explodeObj.Shards.onDie)        this.O[L].onDie = cloneObj( explodeObj.Shards.onDie );
                    if(explodeObj.Shards.onExpire)    this.O[L].onExpire = cloneObj( explodeObj.Shards.onExpire );
                }
            } else {
                for(i in explodeObj.Shards){
                    L = this.putObj('bullet_bomb','comp',O.S,O.x,O.y);
                    this.O[L].angle = (O.angle- -explodeObj.Shards[i].Angle- -360)%360;
                    this.O[L].speed = explodeObj.Shards[i].Speed;
                    this.O[L].doingTime = explodeObj.Shards[i].Dec;

                    this.O[L].onHit = cloneObj( explodeObj.Shards[i].onHit );
                    this.O[L].onExpire = cloneObj( explodeObj.Shards[i].onExpire );
                }
            }

        this.removeObj(o);

        /*
        this.O[L].onHit = {Do:'explode',Power: 4, Dist: 35};
        this.O[L].onExpire = {Do:'explode',Power: 4, Dist: 35, ShardsNum: 5, Shards:{
            onHit: {Do:'explode',Power: 4, Dist: 35},
            onDie: {Do:'explode',explodeType: 'nails', NailsRad: 12, NailsSpeed: 5, NailsSpeedPlus: 5, NailsDec: 2, NailsDecPlus: 6},
            Dec: 12,
            DecPlus: 10,
            Speed: 3,
            SpeedPlus: 3,
        }};

        {Do:'explode',Power: 4, Dist: 35, explodeType: 'nails', NailsRad: 8, NailsSpeed: 10, NailsSpeedPlus: 0, NailsDec: 36, NailsDecPlus: 10, NailsAngleCenter: 8, NailsAngleBoth: 1};

        this.O[L].onExpire = {Do:'explode',Power: 4, Dist: 35, explodeType: 'nails', NailsRad: 12, NailsSpeed: 5, NailsSpeedPlus: 5, NailsDec: 6, NailsDecPlus: 6};

        this.O[L].onExpire = {Do:'explode',Power: 4, Dist: 35, explodeType: 'nails', NailsRad: 8, NailsSpeed: 5, NailsSpeedPlus: 5, NailsDec: 36, NailsDecPlus: 6, NailsAngleCenter: 8};

        this.O[L].onExpire = {Do:'explode',Power: 4, Dist: 35, explodeType: 'nails', NailsRad: 8, NailsSpeed: 0, NailsSpeedPlus: 10, NailsDec: 36, NailsDecPlus: 6, NailsAngleCenter: 8, NailsAngleBoth: 1};

        this.O[L].onHit = this.O[L].onExpire = this.O[L].onDie = {Do:'explode',explodeType: 'nailsCone', Nails: 40, NailsRad: 220, NailsSpeed: 5, NailsSpeedPlus: 2, NailsDec: 28, NailsDecPlus: 6, NailsAngleCenter: 3};

        Bullet mine:
        onHit: {Do:'explode',Power: 4, Dist: 35, explodeType: 'nails', NailsRad: 24, NailsSpeed: 4, NailsSpeedPlus: 6, NailsDec: 16, NailsDecPlus: 6, NailsNeutral: true},
        onDie: {Do:'explode',Power: 4, Dist: 35, explodeType: 'nails', NailsRad: 24, NailsSpeed: 4, NailsSpeedPlus: 6, NailsDec: 16, NailsDecPlus: 6, NailsNeutral: true}


        this.O[L].onExpire = {Do:'explode',explodeType: 'nailsCone', Nails: 20, NailsRad: 30, NailsSpeed: 5, NailsSpeedPlus: 5, NailsDec: 6, NailsDecPlus: 6};

        this.O[L].onExpire = {Do:'explode',explodeType: 'nailsCone', Nails: 20, NailsRad: 120, NailsSpeed: 5, NailsSpeedPlus: 2, NailsDec: 28, NailsDecPlus: 6, NailsAngleCenter: 3};

        this.O[L].onExpire = {Do:'explode',explodeType: 'roundField', radius:200, fieldAnim: 'DestructionField', PeriodDamage: 1, PeriodTime: 40, PeriodOffset: 50, dontHit:['B','BE']};

        this.O[L].onHit = {Do:'explode',Power: Power || 4, Dist: Dist || 35};
        this.O[L].onExpire = {Do:'explode',explodeType: 'roundField', radius:80, fieldAnim: 'DestructionField', PeriodDamage: 1, PeriodTime: 10, PeriodOffset: 10, ExpireTime: 300};
        this.O[L].onDie = {Do:'explode',explodeType: 'roundField', radius:30, fieldAnim: 'DestructionField', PeriodDamage: 1, PeriodTime: 10, PeriodOffset: 10, ExpireTime: 300};


        this.O[L].onExpire = {Do:'explode',Power: 4, Dist: 35, Shards:[
            {    Dec: 8, Speed: 7, Angle: -30,
                onHit: {Do:'explode',Power: 4, Dist: 35},
                onDie: {Do:'explode',Power: 4, Dist: 35, Shards:[
                    {    Dec: 8, Speed: 7, Angle: -15,
                        onHit: {Do:'explode',Power: 4, Dist: 35},
                        onDie: {Do:'explode',Power: 4, Dist: 35, Shards:[
                            {    Dec: 12, Speed: 5, Angle: 0,
                                onHit: {Do:'explode',Power: 4, Dist: 80},
                                onDie: {Do:'explode',Power: 4, Dist: 80},
                            }]
                        },
                    }]
                }
            },{    Dec: 16, Speed: 7, Angle: 0,
                onHit: {Do:'explode',Power: 4, Dist: 80},
                onDie: {Do:'explode',Power: 4, Dist: 80, Shards:[
                    {    Dec: 12, Speed: 7, Angle: 0,
                        onHit: {Do:'explode',Power: 4, Dist: 120},
                        onDie: {Do:'explode',Power: 4, Dist: 120},
                    }]
                }
            },{    Dec: 8, Speed: 7, Angle: 30,
                onHit: {Do:'explode',Power: 4, Dist: 35},
                onDie: {Do:'explode',Power: 4, Dist: 35, Shards:[
                    {    Dec: 8, Speed: 7, Angle: 15,
                        onHit: {Do:'explode',Power: 4, Dist: 35},
                        onDie: {Do:'explode',Power: 4, Dist: 35, Shards:[
                            {    Dec: 12, Speed: 5, Angle: 0,
                                onHit: {Do:'explode',Power: 4, Dist: 80},
                                onDie: {Do:'explode',Power: 4, Dist: 80},
                            }]
                        },
                    }]
                }
            }]
        };
        */

    }
    this.addShield = function(o,Duration){
        var O = this.O[o];
        if(O.T=='koriaz' || O.T=='dandares' || O.T=='star' || O.T=='starG' || O.T=='missle') return false;
        //  if(typeof O.shieldD == 'undefined' || O.shieldD < 0)
        //      $('#O_'+o).append('<div class="shield"></div>');
        O.shieldD = Duration;
    }
    this.addEnergyField = function(o,Amount,ReliefTime){
        var O = this.O[o];
        O.energyField = Amount;
        O.energyFieldMax = Amount;
        O.enegryFieldRelief = 0;
        O.enegryFieldRefielTime = ReliefTime;
        //  $('#O_'+o).prepend('<div class="energyField"></div>');
    }
    this.shootLaser = function(o,Distance,Damage,angle){
        var X,Y,Ox,Oy,Found,D,F,shipShoot=false, O = this.O[o];

        var Angle = O.laserAngle;
        if(typeof angle != 'undefined')
            Angle = angle;

        var enemyArr=['P','M','E','R'];
        if(o==0) enemyArr=['E','ME','A','R'];

        var L = this.putObj_directAnim('laserShoot', {timeDeath: 12});
        Ox = O.x;
        Oy = O.y;

        var pathD =['M',{x: Ox, y: Oy}];
        var Damaged={};
        for(D=0; D<=Distance; D+=10){
            Ox = Ox- - 10 * Math.sin( (-parseInt(Angle)-180)*(Math.PI/180));
            Oy = Oy- - 10 * Math.cos( (-parseInt(Angle)-180)*(Math.PI/180));

            Found = this.getCollidingWithCircle(Ox, Oy, 10, enemyArr);

            for(F in Found){
                if(this.O[F].bounceType){
                    pathD=pathD.concat(['L',{x: Ox, y: Oy}]);
                    Angle = this.regionAngleChange(this.O[F],{x:Ox,y:Oy,angle:Angle,speed:20}).angle;
                } else {
                    Damaged[F]=1;
                }
            }
        }
        this.O[ L ].pathD=pathD.concat(['L',{x: Ox, y: Oy}]);


        delete(Damaged[o]);
        for(var d in Damaged)
            this.makeDMG(d,Damage);


    }
    this.teleportJump = function(o,Distance,angle){
        var L,Angle,F,Found,oldX,oldY,Ox,Oy,O = this.O[o];

        this.putObj_animation('hit_blue', O.x, O.y);
        L = this.putObj_directAnim('TP_track', {timeDeath: 18});
        oldX = Ox = O.x;
        oldY = Oy = O.y;
        Angle = angle;

        var pathD =['M',{x: Ox, y: Oy}];
        for(var D=0; D<=Distance; D+=10){
            Ox = Ox- - 10 * Math.sin( (-parseInt(Angle)-180)*(Math.PI/180));
            Oy = Oy- - 10 * Math.cos( (-parseInt(Angle)-180)*(Math.PI/180));

            Found = this.getCollidingWithCircle(Ox, Oy, O.radius, ['A','R']);
            for(F in Found)
                if(this.O[F].bounceTeleport){
                    pathD=pathD.concat(['L',{x: Ox, y: Oy}]);
                    Angle = this.regionAngleChange(this.O[F],{x:Ox,y:Oy,angle:Angle,speed:10}).angle;
                }
        }
        O.x = Ox;
        O.y = Oy;
        this.O[ L ].pathD=pathD.concat(['L',{x: Ox, y: Oy}]);
        if(O.T!='bullet')
            this.putOnXY(o,oldX,oldY);
        this.putObj_animation('hit_blue', Ox, Oy);

        return true;
    }
    this.showEnemySpotRegion = function(o){
        var html,O = this.O[o];
        O.showSpotRegion = true;

        if(typeof O.spotLvl =='undefined') return false;
        var ST = O.spotArr[ O.spotLvl ];
        if(ST.T=='double'){
            var X1 = ST.Rad * Math.sin((180-ST.Angle2)*(Math.PI/180));
            var Y1 = ST.Rad * Math.cos((180-ST.Angle2)*(Math.PI/180));
            var X2 = ST.Rad2 * Math.sin((180-ST.Angle2)*(Math.PI/180));
            var Y2 = ST.Rad2 * Math.cos((180-ST.Angle2)*(Math.PI/180));

            var X3 = ST.Rad * Math.sin((180- -ST.Angle2)*(Math.PI/180));
            var Y3 = ST.Rad * Math.cos((180- -ST.Angle2)*(Math.PI/180));
            var X4 = ST.Rad2 * Math.sin((180- -ST.Angle2)*(Math.PI/180));
            var Y4 = ST.Rad2 * Math.cos((180- -ST.Angle2)*(Math.PI/180));

            var Wump = 0;
            if(ST.Angle2*2 > 179) Wump=1;

            var d ='M0 '+(ST.Rad)+' A'+ST.Rad+' '+ST.Rad+' 0 0,0 '+X1+' '+Y1+' L'+X2+' '+Y2+' A'+ST.Rad2+' '+ST.Rad2+' 0 '+Wump+',0 '+X4+' '+Y4+' L'+X3+' '+Y3+' A'+ST.Rad+' '+ST.Rad+' 0 0,0 0 '+(ST.Rad)+' ';

            html='<svg class="spotRegion"><path  fill="yellow" fill-opacity="0.1" d="'+d+'"></svg>';
        }
        //  if(ST.T=='single'){
        //      var d ='M0 '+ST.Rad+' A'+ST.Rad+' '+ST.Rad+' 0 0,0 0 -'+ST.Rad+' A'+ST.Rad+' '+ST.Rad+' 0 0,0 0 '+ST.Rad+'';
        //      html='<svg class="spotRegion"><path  fill="yellow" fill-opacity="0.1" d="'+d+'"></svg>';
        //  }
        //  $('#O_'+o+' .spotRegion').remove();
        //  $('#O_'+o+'').append(html);

    }

    this.prepareSquadScheme = function(O,o){
        O.squadScheme = [];
        var SST = O.squadSchemeType;

        var Pos = [];
        if(SST.t == 'round')
            for(var i= 0; i<SST.count; ++i){
                Pos[i] = {
                    angle: ((360/SST.count)*i)%360,
                    radius: SST.radius
                };
            }

        var i = 0;
        if(SST.placement == 'random'){
            while(Pos.length){
                var j = parseInt(Math.random()*Pos.length);
                O.squadScheme[i++] = {angle: Pos[j].angle, radius: Pos[j].radius};
                Pos[j] = Pos[ Pos.length-1 ];
                --Pos.length;
            }
        }
        else if(SST.placement == 'randomStart'){
            var u = parseInt(Math.random()*SST.count);
            for(ji=0; ji<SST.count; ++ji){
                var j = (ji- -u)%SST.count;
                O.squadScheme[i++] = {angle: Pos[j].angle, radius: Pos[j].radius};
            }
        }
        else if(SST.placement == 'oddFirst'){
            for(j=0; j<SST.count; j-=-2)
                O.squadScheme[i++] = {angle: Pos[j].angle, radius: Pos[j].radius};
            for(j=1; j<SST.count; j-=-2)
                O.squadScheme[i++] = {angle: Pos[j].angle, radius: Pos[j].radius};
        }
        else {
            for(i=0; i<SST.count; ++i)
                O.squadScheme[i] = {angle: Pos[i].angle, radius: Pos[i].radius};
        }


        for(var i in O.squadScheme){
            for(var j in SST.data)
                O.squadScheme[i][j] = SST.data[j];

            if(SST.makeFirst && SST.makeFirst > i){
                this.setSquadMember(o,i,SST.life);
            } else {
                O.squadScheme[i].Oid = -1;
            }
        }

    }
    this.setSquadMember = function(o,i,life){
        var O = this.O[o];
        var OSS = O.squadScheme[i];
        var iX = O.x- -OSS.radius * Math.sin( (-parseInt(OSS.angle- -O.angle)-180)*(Math.PI/180));
        var iY = O.y- -OSS.radius * Math.cos( (-parseInt(OSS.angle- -O.angle)-180)*(Math.PI/180));

        if(OSS.type == 'shieldBlob'){
            var Sid = this.putObj('shieldBlob','moving',O.S,iX,iY);
            var oS = this.O[Sid];
            oS.angle = O.angle;
            oS.life = life;
            oS.lifeM = OSS.lifeM;
            this.bindWithSquad(o, i, Sid);
        }

        CanvasManager.requestCanvas( Sid );
    }
    this.bindWithSquad = function(o,i,s){
        var O = this.O[o];
        var S = this.O[s];

        S.squadDirectPlace = {o:o, i:i};
        S.speed = 0;
        O.squadScheme[i].Oid = s;
    }
    this.disbandSquad = function(O){
        // Maybe we want to change squad chef?

        // If we disband then:
        for(var i=0; i<O.squadScheme.length; ++i)
            if(O.squadScheme[i].Oid != -1){
                var sO = this.O[ O.squadScheme[i].Oid ];
                if(sO.T=='shieldBlob'){
                    sO.speed = 8;
                    sO.angle = O.angle- -O.squadScheme[i].angle;
                    this.Ocomp[ O.squadScheme[i].Oid ]=1;
                    sO.M = 'comp';
                    sO.Manouver = 'decay';
                    sO.doingTime = 500;
                }

                delete sO.squadDirectPlace;
            }
    }
    this.checkSquadSchemeMakes = function(O){

        //  0:{ angle: 0, radius: 0, id: -1, make: {What:{RoundField:1},objData:{x:0,y:-1000, angle: 0, radius: 150, colorInactive: false, colorActive: 'rgba(255,0,0,0.4)', OneTimeEffect: 1, OneTimeOffset: 10, OneTimeDetect: 1, dontHit:['B','BE','E','M','ME','A']}}}

        for(var i in O.squadScheme)
            if(typeof O.squadScheme[i].make != 'undefined'){


            }

    }

    this.shipShoot = function(AngleMod,Speed,Dec,Power){
        var O = this.O[0];
        var Angle = parseInt(- (Math.atan2(this.mouseX-O.x,this.mouseY-O.y)*180/Math.PI)- -180)%360;
        if(AngleMod) Angle-=-AngleMod;
        this.shootBullet(0,Angle,(Speed || 15),(Dec || 30),Power);
    }
    this.shipShootOnSide = function(SideAngle,SideDist,Speed,Dec,Power){
        var O = this.O[0];
        var Xp = O.x- -SideDist * Math.sin((-parseInt(O.angle- -SideAngle)-180)*(Math.PI/180));
        var Yp = O.y- -SideDist * Math.cos((-parseInt(O.angle- -SideAngle)-180)*(Math.PI/180));

        var Angle = parseInt(- (Math.atan2(this.mouseX-O.x,this.mouseY-O.y)*180/Math.PI)- -180)%360;
        var L = this.putObj('bullet','comp',O.S,Xp,Yp);
        this.O[L].speed = Speed || 15;
        this.O[L].dec = Dec || 30;
        this.O[L].angle = Angle;
        this.O[L].Power = Power;
    }
    this.shipShootMissle = function(Enemy,Angle,Speed,Dec,SpeedT,Power){
        var O = this.O[0];
        var E = this.O[Enemy];

        var L = this.putObj('missle','comp',O.S,O.x,O.y);
        this.O[L].speed = Speed || 12;
        this.O[L].speedT = SpeedT || 3;
        this.O[L].doingTime = Dec || 30;
        this.O[L].FollowWho = Enemy;
        this.O[L].Power = Power;
        this.O[L].angle = Angle;
        this.O[L].onHit = {Do:'explode',Power: 3,Dist: 35};
        // this.O[L].onDie = {Do:'explode',Power: 3,Dist: 35};
        this.O[L].onExpire = {Do:'explode',Power: 3,Dist: 35};
    }
    this.shipShootBomb = function(Speed,Dec,Power,Dist){
        var O = this.O[0];
        var Angle = parseInt(- (Math.atan2(this.mouseX-O.x,this.mouseY-O.y)*180/Math.PI)- -180)%360;
        var L = this.putObj('bullet_bomb','comp',O.S,O.x,O.y);
        this.O[L].speed = Speed || 10;
        this.O[L].doingTime = Dec || 30;
        this.O[L].angle = Angle;

        this.O[L].onHit = this.O[L].onDie = this.O[L].onExpire = {Do:'explode',Power: 7, Dist: 80};

    }
    this.shipShootLaser = function(Distance,Damage){
        var O = this.O[0];
        var Angle = parseInt(- (Math.atan2(this.mouseX-O.x,this.mouseY-O.y)*180/Math.PI)- -180)%360;
        this.shootLaser(0,Distance,Damage,Angle);
    }


    this.shipFunc_glueFireToLaser = function(){
        var F,X,Y,R,dist=1000000,laserAim=false,radius = this.SHIP.GlueFireToLaser;
        var Found = this.getCollidingWithCircle(this.mouseX,this.mouseY,radius,['E','ME','A','R']);

        var laserAim = false;
        var dist = 1000000;
        for(F in Found){
            if(this.O[F].shieldD > 0) continue;
            if(this.O[F].undestructible > 0) continue;
            X = this.mouseX - this.O[F].x;
            Y = this.mouseY - this.O[F].y;
            R = X*X- -Y*Y;
            if(R < dist){
                laserAim = F;
                dist = R;
            }
        }

        if(laserAim != false){
            this.mouseX = this.O[laserAim].x;
            this.mouseY = this.O[laserAim].y;
            X = this.O[laserAim].x-this.O[0].x- -this.Dx/2;
            Y = this.O[laserAim].y-this.O[0].y- -this.Dy/2;
            $('#gameboardMarkers').append('<div class="estimationMarkers LaserAim" style="top: '+Y+'px; left: '+X+'px;"><span style="width: '+(2*radius)+'px; height: '+(2*radius)+'px; top: -'+(radius- -2)+'px; left: -'+(radius- -2)+'px;"></span></div>');
        }
    }
    this.shipFunc_glueFireToMissle = function(aimRadius){
        var F,X,Y,R,dist=1000000,laserAim=false;
        var Found = this.getCollidingWithCircle(this.mouseX,this.mouseY,aimRadius,['E','ME','A','R']);

        var missleAim = false;
        var dist = 1000000;
        for(F in Found){
            if(this.O[F].shieldD > 0) continue;
            if(this.O[F].undestructible > 0) continue;
            X = this.mouseX - this.O[F].x;
            Y = this.mouseY - this.O[F].y;
            R = X*X- -Y*Y;
            if(R < dist){
                missleAim = F;
                dist = R;
            }
        }

        if(missleAim != false){
            this.missleAim = missleAim;

            X = this.O[missleAim].x-this.O[0].x- -this.Dx/2;
            Y = this.O[missleAim].y-this.O[0].y- -this.Dy/2;
            $('#gameboardMarkers').append('<div class="estimationMarkers MissleAim" style="top: '+Y+'px; left: '+X+'px;"><span style="width: '+(2*aimRadius)+'px; height: '+(2*aimRadius)+'px; top: -'+(aimRadius- -2)+'px; left: -'+(aimRadius- -2)+'px;"></span></div>');

        } else {
            this.missleAim = false;
        }
    }
    this.shipFunc_esteemedPositions = function(O,F){
        EsteemedPos={};
        var WU;
        var Found = this.getCollidingWithCircle(this.O[0].x,this.O[0].y,800,['E']);
        for(var Fo in Found){
            if(this.O[Fo].shieldD > 0) continue;
            if(this.O[Fo].undestructible > 0) continue;
            if(this.O[Fo].life < 1) continue;
            WU = this.countFutureShoot(Fo,O.x,O.y,F.Speed,F.Dec);
            if(WU.r){
                EsteemedPos[Fo]={x:WU.x,y:WU.y};
                var X = WU.x - this.O[0].x- -this.Dx/2;
                var Y = WU.y - this.O[0].y- -this.Dy/2;
                $('#gameboardMarkers').append('<div class="estimationMarkers" style="top: '+Y+'px; left: '+X+'px;"></div>');
            }
        }
        return EsteemedPos;
    }
    this.shipFunc_glueFireToEstimated = function(EsteemedPos){

        var jest = false;
        var Rad = this.SHIP.GlueFireToEstimated;
        var Rad2 = Rad*Rad;
        var dist = 1000000;
        for(F in EsteemedPos){
            if(this.O[F].shieldD > 0) continue;
            if(this.O[F].undestructible > 0) continue;
            if(this.O[F].life < 1) continue;
            X = this.mouseX - EsteemedPos[F].x;
            Y = this.mouseY - EsteemedPos[F].y;
            R = X*X- -Y*Y;
            if(R < dist && R < Rad2){
                jest = F;
                dist = R;
            }
        }
        if(jest != false){
            this.mouseX = EsteemedPos[jest].x;
            this.mouseY = EsteemedPos[jest].y;
            var wX = this.mouseX - this.O[0].x- -this.Dx/2;
            var wY = this.mouseY - this.O[0].y- -this.Dy/2;

            $('#gameboardMarkers').append('<div class="estimationMarkers GluedOne" style="top: '+wY+'px; left: '+wX+'px;"><span style="width: '+(2*Rad)+'px; height: '+(2*Rad)+'px; top: -'+(Rad- -2)+'px; left: -'+(Rad- -2)+'px;"></span></div>');

            return true;
        }

        for(var F in this.O){
            if(!(this.O[F].T=='star' || this.O[F].T=='space_mine')) continue;
            if(this.O[F].shieldD > 0) continue;
            if(this.O[F].undestructible > 0) continue;
            if(this.O[F].life < 1) continue;
            X = this.mouseX - this.O[F].x;
            Y = this.mouseY - this.O[F].y;
            R = X*X- -Y*Y;
            if(R < dist && R < Rad2){
                jest = F;
                dist = R;
            }
        }
        if(jest != false){
            this.mouseX = this.O[jest].x;
            this.mouseY = this.O[jest].y;
            var wX = this.mouseX - this.O[0].x- -this.Dx/2;
            var wY = this.mouseY - this.O[0].y- -this.Dy/2;

            $('#gameboardMarkers').append('<div class="estimationMarkers GluedOne" style="top: '+wY+'px; left: '+wX+'px;"><span style="width: '+(2*Rad)+'px; height: '+(2*Rad)+'px; top: -'+(Rad- -2)+'px; left: -'+(Rad- -2)+'px;"></span></div>');
        }
    }
    this.shipFunc_teleport = function(Fx,TeleMod){
        --this.SHIP.Modules[TeleMod].TeleLoad;
        var O = this.O[0];
        var oldX = O.x;
        var oldY = O.y;
        var iX = O.x-this.mouseX;
        var iY = O.y-this.mouseY;
        var iDist = Math.sqrt(iX*iX- -iY*iY);
        var iRad = parseInt(- (Math.atan2(iX,iY)*180/Math.PI))%360;
        if(iDist > Fx.Speed)
            iDist = Fx.Speed;

        if(this.teleportJump(0,iDist,iRad))
            Fx.gunS=0;
    }
    this.shipFunc_workingRadar = function(U,Prod,Radius){
        var O = this.O[0];
        var Angle,Angle2,E,Ex,Ey,EradarX,EradarY,Edist,Eangle;
        htmlR='<div id="Radar"><div class="radarDial"><div class="radarCenter">';
        var RadarJump = parseInt(U);
        if(RadarJump < 1) RadarJump = 1;
        var RadarNow = parseInt(Prod);
        var RadarStart = (RadarNow - RadarJump- -360)%360;
        var RadarCleanFrom = RadarStart;
        if(RadarStart > RadarNow){
            for(var i = RadarStart; i<360; ++i){
                this.RadarOld[i] = [];
            }
            RadarCleanFrom = 0;
        }
        for(var i = RadarCleanFrom; i <= RadarNow; ++i){
            this.RadarOld[i] = [];
        }

        for(E in this.Enemies){
            Ex = O.x - this.O[ E ].x;
            Ey = O.y - this.O[ E ].y;
            Edist = Math.sqrt(Ex*Ex- -Ey*Ey);
            if(Edist > Radius) continue;
            Eangle = parseInt(- (Math.atan2(Ex,Ey)*180/Math.PI)- -360)%360;
            EradarX = 100 * (Edist/Radius) * Math.sin( (-parseInt(Eangle)-180)*(Math.PI/180));
            EradarY = 100 * (Edist/Radius) * Math.cos( (-parseInt(Eangle)-180)*(Math.PI/180));
            if( (RadarStart < RadarNow && (Eangle >= RadarStart && Eangle <= RadarNow))
             || (RadarStart > RadarNow && (Eangle >= RadarStart || Eangle <= RadarNow))){
                this.RadarOld[Eangle][ this.RadarOld[Eangle].length ]= {x:EradarX,y:EradarY};
            }
        }

        for(Angle=0; Angle < 360; ++Angle){
            Angle2=( RadarStart- -Angle - -360) % 360;
            for(var E=0; E < this.RadarOld[Angle2].length; ++E)
                htmlR+='<div class="radarPoint rP_'+Angle+'" style="top: '+this.RadarOld[Angle2][E].y.toFixed(0)+'px; left: '+this.RadarOld[Angle2][E].x.toFixed(0)+'px;"></div>';
        }
        htmlR+='<div class="radarStick" style="transform: rotate('+(RadarNow-180)+'deg);"></div>';
        htmlR+='</div></div></div>';

        $('#countRadar').html(htmlR);
    }
    this.shipFunc_speedChange = function(){
        var O = this.O[0];
        var S = this.SHIP;
        var Sx = this.SHIPold;
        var html='';
        if(O.speed < 0) O.speed=0.0;
        if(O.speed > S.speedM) O.speed=S.speedM;
        S.Espeed = (O.speed*O.speed/2)*(S.Weight/50);
        S.Energy = S.EnergyM - S.Espeed;

        $('#modulesEnergyIn').html(S.Energy.toFixed(2));

        html+='<div class="speedBoxEnergy">'+S.Espeed.toFixed(2)+'</div>';
        html+='<span class="speedBoxSpeed">'+O.speed.toFixed(1)+'</span>';
        for(var i=parseInt(O.speed- -0.97); i >0; --i)
            if(O.speed > i)    html+='<div class="speedOmeter speed_'+i+'"></div>';
                else        html+='<div class="speedOmeter speed_'+i+'"><span class="speedCap_'+(i-O.speed).toFixed(1)*10+'0"></span></div>';
        $('#speedOmeterBox').html(html);
        Sx.speed = O.speed;
    }
    this.shipFunc_changeWeapon = function(Fx,weaponId){
        var S = this.SHIP;
        $('.attackBox').removeClass('attackBoxActive');

        if(Fx==1){
            S.FireType = weaponId;
            var F = S.FireTypes[ S.FireType ];
            if(S.ShowFireRange){
                var RadX = F.Speed*F.Dec;
                $('#bullRadX').css({width: RadX*2+'px',height: RadX*2+'px',top: (-RadX)+'px',left: (-RadX)+'px'});
            }
        }else{
            S.FireType2 = weaponId;
        }
        $('#attackModule_'+S.FireType).addClass('attackBoxActive');
        if(S.FireType2 !==false)
            $('#attackModule_'+S.FireType2).addClass('attackBoxActive');
    }
    this.shipFunc_showSpotRegions = function(show){
        if(show==true){
            for(var o in this.Enemies)
                this.showEnemySpotRegion(o);
        } else {
            //  for(var o in this.Enemies){
            //      $('#O_'+o+' .spotRegion').remove();
            //  }
        }
    }
    this.shipFunc_showHealth = function(){
        var html='';
        for(var i=0; i<this.O[0].life; ++i)
            html+='A';
        html+='<span class="disabledHealth">';
        for(var i=0; i<this.SHIP.lifeM - this.O[0].life; ++i)
            html+='A';
        html+='</span>';
        if(typeof this.O[0].energyField !='undefined'){
            html+='<span class="XenergyField">';
            for(var i=0; i<this.O[0].energyField; ++i)
                html+='O';
            html+='</span><span class="XenergyFieldDisabled">';
            for(var i=0; i<this.SHIP.EnergyFieldMax - this.O[0].energyField; ++i)
                html+='O';
            html+='</span>';
        }
        $('#countHealth').html(html);
    }

    this.makeShipControlPanel = function(){
        var O = this.O[0];
        var S = this.SHIP;
        var Sx = this.SHIPold;
        var html='';
        S.speedM = (Math.sqrt(S.EnergyM))/(S.Weight/50);

        Sx.speed = -17;
        html+='<div class="speedBox" id="speedOmeterBox"></div>';
        this.shipFunc_speedChange();

        if(S.ShowFireRange==false) $('#bullRadX').remove();

        var letter,modHtml='';

        Sx.Mod={};
        for(var m in S.Modules){
            html=modHtml+html;
            modHtml='';
            Sx.Mod[m]='disabled';
            letter='';
            for(var pimk in S.KeysModules)
                for(var pomk=0; pomk < S.KeysModules[pimk].length; ++pomk)
                    if(m == S.KeysModules[pimk][pomk])
                        letter='<div class="letter">'+String.fromCharCode(pimk)+'</div>';

            modHtml+='<div class="cBox">'+letter+'<span id="moduleBox_'+m+'"><div class="energyBox min"><span class="smaller">Disabled</span><div class="infoBox">'+NAMES.ModName[S.Modules[m].T]+'</div></div></span></div>';

        }
        html ='<div class="cBox"><div class="energyBox energyCap_00" id="modulesEnergyOut">'+S.Energy.toFixed(2)+'</div></div>'+modHtml+html;

        html+='<div class="cBox"><div class="energyBox energyCap_00"><span id="modulesEnergyIn">'+S.Energy.toFixed(2)+'</span><div class="ammoBoxBox"><div class="ammoBoxes">';

        Sx.EnergyOut=-1;
        for(var fi in S.FireTypes){
            html+='<div id="attackModule_'+fi+'" class="attackBox attack_'+S.FireTypes[fi].T+'"><span></span><span></span><span></span><span></span><span></span><div class="attackBoxNum">'+(fi- -1)+'</div></div>';
        }

        if(S.MissleStorage > 0)
            html+='<div class="ammoBox" id="missleStorage"></div>';
        if(S.BombStorage > 0)
            html+='<div class="ammoBox" id="bombStorage"></div>';
        if(S.AmmoStorage > 0)
            html+='<div class="ammoBox" id="ammoStorage"></div>';

        html+='</div></div></div></div>';

        $('#countSpeed').html(html);
        this.shipFunc_speedChange();
        this.shipFunc_changeWeapon(1, S.FireType);

    }


    this.decide_ship = function(e){
        var O = this.O[0];
        var S = this.SHIP;
        var Sx = this.SHIPold;
        var F = S.FireTypes[ S.FireType ];
        if(S.FireType2!=false)
            var F2 = S.FireTypes[ S.FireType2 ];
        var LaserMod = false;
        var TeleMod = false;
        O.lastSpeedT = 0;
        this.mouseX = this.mouse_x- -(O.x -this.Dx/2);
        this.mouseY = this.mouse_y- -(O.y -this.Dy/2);
        var html='';

        if(this.specialMoveT==-1 && this.specialMove > 0){
            // Start special move
            if(this.specialMove==2) O.angle = (O.angle- -90- -360)%360;
            if(this.specialMove==1) O.angle = (O.angle - 90- -360)%360;
            if(this.specialMove==4) O.angle = (O.angle - 180- -360)%360;
            if(this.specialMove==3) O.speed-=-5;
            this.specialMoveT=10;
        }

        if(this.specialMoveT==-1){
            if(this.keyLeftRight==1){    O.angle=(O.angle- -360 -O.speedT)%360;    O.lastSpeedT =-O.speedT; }
            if(this.keyLeftRight==-1){    O.angle=(O.angle- -360- -O.speedT)%360;    O.lastSpeedT = O.speedT; }
            if(this.keyUpDown==1)        O.speed-=-O.speedA/this.Frames;
            if(this.keyUpDown==-1)        O.speed-=O.speedD/this.Frames;
        } else{
            // Do special move

            if(--this.specialMoveT == -1) this.specialMove = -1;
        }

        if(O.speed != Sx.speed)
            this.shipFunc_speedChange();

        S.Energy = S.EnergyM - S.Espeed;

        var EsteemedPos=false;

        var modHtml='';
        for(var m in S.Modules){
            var M = S.Modules[m];
            modHtml='';

            // Modu�y konfigurowane przy dezaktywacji:
            if(M.T=='laserProd' && M.Disabled == 1)
                M.LaserLoad=0;

            if(M.T=='teleProd' && M.Disabled == 1)
                M.TeleLoad=0;


            // Modu�y wy��czone:
            if(Sx.Mod[m] != 'disabled'){
                $('#moduleBox_'+m).html('<div class="energyBox min"><span class="smaller">Disabled</span><div class="infoBox">'+NAMES.ModName[M.T]+'</div></div>');
                Sx.Mod[m]='disabled';
                if(M.T=='spotRegion') this.shipFunc_showSpotRegions(false);
            }

            if(M.Disabled == 1)
                continue;


            // Modu�y niepotrzebne:
            if(    (M.T=='bulletProd' && S.AmmoStorage > 0 && S.Ammo >=S.AmmoStorage )
             ||    (M.T=='healerProd' && S.lifeM <= O.life)
             || (M.T=='missleProd' && S.MissleStorage > 0 && S.Missles >=S.MissleStorage )
             || (M.T=='bombProd' && S.BombStorage > 0 && S.Bombs >=S.BombStorage )
             || (M.T=='esteemProd' && (F.T=='missle' || F.T=='missleR' || F.T=='laser'))
             || (M.T=='shieldProd' && S.EnergyFieldMax <= O.energyField) ){
                if(Sx.Mod[m] != 'done'){
                    $('#moduleBox_'+m).html('<div class="energyBox min">Done<div class="infoBox">'+NAMES.ModName[M.T]+'</div></div>');
                    Sx.Mod[m]='done';
                }
                continue;
            }

            // Modu�y bez energii:
            if(M.Emin > S.Energy){
                M.E=0;
                if(M.T=='laserProd') M.LaserLoad = 0;
                if(M.T=='teleProd') M.TeleLoad = 0;
                if(Sx.Mod[m] != 0){
                    $('#moduleBox_'+m).html('<div class="energyBox min"><div class="min">min.</div>'+M.Emin.toFixed(2)+'<div class="infoBox">'+NAMES.ModName[M.T]+'</div></div>');
                    Sx.Mod[m]=0;
                    if(M.T=='spotRegion') this.shipFunc_showSpotRegions(false);
                }
                continue;
            }
            // Modu�y dzia�aj�ce:
            if(M.T=='laserProd' && M.LaserLoad == M.LaserLoadM){
                if(Sx.Mod[m] != 'active'){
                    modHtml+='<div class="energyBox active"><div class="active">active</div>'+M.Emin.toFixed(2)+'<div class="infoBox">';
                    Sx.Mod[m] = 'active';
                }
                S.Energy-=M.Emin;
                M.E = M.Emin;
            } else if(M.T=='teleProd' && M.TeleLoad == M.TeleLoadM){
                if(Sx.Mod[m] != 'active'){
                    modHtml+='<div class="energyBox active"><div class="active">active</div>'+M.Emin.toFixed(2)+'<div class="infoBox">';
                    Sx.Mod[m] = 'active';
                }
                S.Energy-=M.Emin;
                M.E = M.Emin;
            }else{
                if(S.Energy < M.Emax){
                    M.E = S.Energy;
                    if(Sx.Mod[m] != S.Energy){
                        modHtml+='<div class="energyBox energyCap_'+((M.E-M.Emin)/(M.Emax-M.Emin)).toFixed(1)*10+'0">'+M.E.toFixed(2)+'<div class="infoBox">';
                        Sx.Mod[m] = S.Energy;
                    }
                    S.Energy=0;
                } else{
                    M.E = M.Emax;
                    if(Sx.Mod[m] != M.E){
                        modHtml+='<div class="cBox"><div class="energyBox max"><div class="max">max.</div>'+M.E.toFixed(2)+'<div class="infoBox">';
                        Sx.Mod[m] = M.E;
                        if(M.T=='spotRegion') this.shipFunc_showSpotRegions(true);
                    }
                    S.Energy-=M.Emax;
                }
            }
            if(modHtml!='') modHtml+='<div class="titleBox">'+NAMES.ModName[M.T]+'</div>';
            var U = M.ProdX*(M.E/M.Emax);

            M.Prod-=-U;
            if(M.Prod > M.ifProd){
                if(M.T=='laserProd' && M.LaserLoad < M.LaserLoadM) ++M.LaserLoad;
                if(M.T=='teleProd' && M.TeleLoad < M.TeleLoadM) ++M.TeleLoad;
                if(M.T=='bulletProd') ++S.Ammo;
                if(M.T=='missleProd') ++S.Missles;
                if(M.T=='bombProd')   ++S.Bombs;
                if(M.T=='healerProd'){
                    this.healObj(0,1);
                }
                if(M.T=='shieldProd'){
                    if(++O.energyField == 1)
                        $('#O_0').prepend('<div class="energyField"></div>');
                    this.shipFunc_showHealth();
                }
                M.Prod-=M.ifProd;
                if(M.T=='laserProd' && M.LaserLoad == M.LaserLoadM) M.Prod=0;
                if(M.T=='teleProd' && M.TeleLoad == M.TeleLoadM) M.Prod=0;
            }

            if(M.T!='esteemProd' && M.T!='spotRegion' && M.T!='radar' && !(M.T=='laserProd' && M.LaserLoad==M.LaserLoadM ) && !(M.T=='teleProd' && M.TeleLoad==M.TeleLoadM )){
                if(30/(M.ifProd/U) > 1){
                    if(modHtml != '') modHtml+=(30/(M.ifProd/U)).toFixed(2)+'/sec';
                }else{
                    modHtml+='<div class="progresBar"><div class="progresBarOBar green" style="width: '+parseInt((M.Prod/M.ifProd)*100)+'px;"></div><div class="info">'+(((M.ifProd-M.Prod)/U)/30).toFixed(2)+'sec</div></div>';
                    Sx.Mod[m]=-23;
                }
            }
            if(M.T=='radar')
                if(modHtml!='') modHtml+=((M.ifProd/U)/30).toFixed(2)+'sec';
            if(M.T=='laserProd' && M.LaserLoad==M.LaserLoadM)
                if(modHtml!='') modHtml+='READY';
            if(M.T=='teleProd' && M.TeleLoad==M.TeleLoadM)
                if(modHtml!='') modHtml+='READY';


            if(M.T=='laserProd'){
                modHtml+='<div class="laserBoxBox"><div class="laserBox"><span>';
                for(var x=0; x<M.LaserLoad; ++x) modHtml+='L';
                modHtml+='</span>';
                for(var x=0; x<M.LaserLoadM - M.LaserLoad; ++x) modHtml+='L';
                modHtml+='</div></div>';
                if(M.LaserLoad > 0) LaserMod = m;
            }
            if(M.T=='teleProd'){
                modHtml+='<div class="laserBoxBox"><div class="laserBox"><span>';
                for(var x=0; x<M.TeleLoad; ++x) modHtml+='T';
                modHtml+='</span>';
                for(var x=0; x<M.TeleLoadM - M.TeleLoad; ++x) modHtml+='T';
                modHtml+='</div></div>';
                if(M.TeleLoad > 0) TeleMod = m;
            }

            if(M.T=='radar')
                this.shipFunc_workingRadar(U,M.Prod,M.Radius);

            if(M.T=='esteemProd' && M.E==M.Emax && (F.T=='single' || F.T=='double' || F.T=='rose' || F.T=='bomb'))
                EsteemedPos = this.shipFunc_esteemedPositions(O,F);

            if(modHtml != '')
                $('#moduleBox_'+m).html(modHtml);
        }
        if(Sx.EnergyOut != S.Energy){
            $('#modulesEnergyOut').html(S.Energy.toFixed(2));
            Sx.EnergyOut = S.Energy;
        }

        // ESTYMATORY
        if(S.GlueFireToLaser!=false && F.T=='laser')
            this.shipFunc_glueFireToLaser();

        if(S.ShowAmmoIndicator){
            if    (((F.T=='single' || F.T=='double' || F.T=='rose') && S.Ammo >= F.AmmoUse)
                    || ((F.T=='missle') && S.Missles >= F.MissleUse)
                    || ((F.T=='missleR') && S.Missles >= F.MissleUse)
                    || ((F.T=='bomb') && S.Bombs >= F.BombUse)
                    || ((F.T=='tele') && TeleMod!=false)
                    || ((F.T=='laser') && LaserMod!=false)
                )    $('#gameOverlay').attr('class','cursorCross');
            else    $('#gameOverlay').attr('class','cursorWait');
        }

        if(F.T=='missle' || F.T=='missleR')
            this.shipFunc_glueFireToMissle(F.AimRadius);

        if(F.T=='laser'){
            var Angle = parseInt(- (Math.atan2(this.mouseX-O.x,this.mouseY-O.y)*180/Math.PI)- -360)%360;
            $('#gameboardMarkers').append('<div class="object laserAiming" style="height: '+O.Speed+'px; top: '+(this.Dy/2)+'px; left: '+(this.Dx/2)+'px; transform: rotate('+Angle+'deg);"></div>');
        }

        if(S.GlueFireToEstimated!=false && EsteemedPos!=false)
            this.shipFunc_glueFireToEstimated(EsteemedPos);


        // STRZELAMY
        var aktywneDziala = {};
        if(S.MouseDown1) aktywneDziala[ S.FireType ]=1;
        if(S.FireType2!==false && S.MouseDown2) aktywneDziala[ S.FireType2 ]=1;
        for(var dzi in aktywneDziala) if(S.FireTypes[dzi].gunS > S.FireTypes[dzi].GunSpeed){
            var Fx = S.FireTypes[dzi];
            if(Fx.T=='single' && S.Ammo >= Fx.AmmoUse){
                this.shipShoot(0, Fx.Speed, Fx.Dec, Fx.Power);
                Fx.gunS=0;
                S.Ammo-=Fx.AmmoUse;
            }
            if(Fx.T=='double' && S.Ammo >= Fx.AmmoUse){
                this.shipShootOnSide(-90, 5, Fx.Speed, Fx.Dec, Fx.Power);
                this.shipShootOnSide(90, 5, Fx.Speed, Fx.Dec, Fx.Power);
                Fx.gunS=0;
                S.Ammo-=Fx.AmmoUse;
            }
            if(Fx.T=='rose' && S.Ammo >= Fx.AmmoUse){
                for(var i = -parseInt(Fx.AtOnce/2); i<= parseInt(Fx.AtOnce/2); ++i)
                    this.shipShoot(i*Fx.RoseAngle, Fx.Speed, Fx.Dec, Fx.Power);
                Fx.gunS=0;
                S.Ammo-=Fx.AmmoUse;
            }
            if(Fx.T=='missle' && S.Missles >= Fx.MissleUse && this.missleAim!=false){
                this.shipShootMissle(this.missleAim,O.angle,Fx.Speed,Fx.Dec,Fx.SpeedT,Fx.Power);
                Fx.gunS=0;
                S.Missles-=Fx.MissleUse;
            }
            if(Fx.T=='missleR' && S.Missles >= Fx.MissleUse && this.missleAim!=false){
                var Pe = [80,280,100,260,120,240,140,220,160,200,175,185];
                var Angle = parseInt(- (Math.atan2(this.mouseX-O.x,this.mouseY-O.y)*180/Math.PI)- -180)%360;


                for(var iki=0; iki<Fx.AtOnce; ++iki)
                    this.shipShootMissle(this.missleAim, (Angle- -Pe[iki])%360, (Fx.Speed-parseInt(iki/2)*2),(Fx.Dec- -parseInt(iki/2)*20),(Fx.SpeedT-parseInt(iki/2)),Fx.Power);
                Fx.gunS=0;
                S.Missles-=Fx.MissleUse;
            }
            if(Fx.T=='bomb' && S.Bombs >= Fx.BombUse){
                this.shipShootBomb(Fx.Speed,Fx.Dec,Fx.Power,Fx.Dist);
                Fx.gunS=0;
                S.Bombs-=Fx.BombUse;
            }
            if(Fx.T=='laser' && LaserMod!=false){
                --S.Modules[LaserMod].LaserLoad;
                this.shipShootLaser(Fx.Speed,Fx.Power);
                Fx.gunS=0;
            }
            if(Fx.T=='tele' && TeleMod!=false)
                this.shipFunc_teleport(Fx,TeleMod);
        }
        F.gunS++;
        if(F2) F2.gunS++;

        if(S.Ammo > S.AmmoStorage)      S.Ammo = S.AmmoStorage;
        if(S.Missles > S.MissleStorage) S.Missles = S.MissleStorage;
        if(S.Bombs > S.BombStorage)     S.Bombs = S.BombStorage;
        O.ammo++;

        if(S.Missles != Sx.missleStorage){
            html='<span>';
            for(var x=0; x<S.Missles; ++x) html+='Y';
            html+='</span>';
            for(var x=0; x<S.MissleStorage - S.Missles; ++x) html+='Y';
            $('#missleStorage').html(html);
            Sx.missleStorage = S.Missles;
        }
        if(S.Bombs != Sx.bombStorage){
            html='<span>';
            for(var x=0; x<S.Bombs; ++x) html+='P';
            html+='</span>';
            for(var x=0; x<S.BombStorage - S.Bombs; ++x) html+='P';
            $('#bombStorage').html(html);
            Sx.bombStorage = S.Bombs;
        }
        if(S.Ammo != Sx.ammoStorage){
            html='<span>';
            for(var x=0; x<S.Ammo; ++x) html+='i';
            html+='</span>';
            for(var x=0; x<S.AmmoStorage - S.Ammo; ++x) html+='i';
            $('#ammoStorage').html(html);
            Sx.ammoStorage = S.Ammo;

        }
    }

    this.countFutureShoot = function(o,Sx,Sy,Speed,Dec){
        var R=false,X=0,Y=0,A=0,O = this.O[o];
        var Ox=O.x;
        var Oy=O.y;
        var Oa=O.angle;
        var Rad=0;
        for(var d=0; d<Dec; ++d){
            Ox -=- O.speed * Math.sin( (-parseInt(Oa)-180)*(Math.PI/180));
            Oy -=- O.speed * Math.cos( (-parseInt(Oa)-180)*(Math.PI/180));
            Ox = Ox.toFixed(2);
            Oy = Oy.toFixed(2);
            Oa -=- O.lastSpeedT;
            Rad-=-Speed;
            if(Rad >= Math.sqrt(Math.pow(Sx-Ox,2)- -Math.pow(Sy-Oy,2))){
                X=Ox;
                Y=Oy;
                R=true;
                A=parseInt(- (Math.atan2(Sx-Ox,Sy-Oy)*180/Math.PI))%360;
                break;
            }
        }

        return {r:R,x:X,y:Y,a:A};
    }


    this.decide_squad = function(s){
        var SQ = this.Squads[s];
        if(typeof this.O[ SQ.Leader ] == 'undefined'){
            delete this.Squads[s];
            return false;
        }
        var S0 = this.O[ SQ.Leader ];

        S0.speed = SQ.SquadSpeed;

        var i=0;
        var Ki=[{x:50,y:0},{x:0,y:50},{x:50,y:50},{x:100,y:0},{x:0,y:100},{x:100,y:50},{x:50,y:100},{x:100,y:100}];
        var Ki=[{r:30,q:120},{r:30,q:240},{r:60,q:120},{r:60,q:240},{r:90,q:120},{r:90,q:240},{r:120,q:120},{r:120,q:240}];
        //  var Ki=[{r:30,q:90},{r:30,q:270},{r:60,q:90},{r:60,q:270},{r:90,q:90},{r:90,q:270},{r:120,q:90},{r:120,q:270}];

        for(var Si in SQ.Members) if(Si!=SQ.Leader){
            this.O[ Si ].squadX = S0.x- -Ki[i].r * Math.sin( (-parseInt(S0.angle- -Ki[i].q)-180)*(Math.PI/180));
            this.O[ Si ].squadY = S0.y- -Ki[i].r * Math.cos( (-parseInt(S0.angle- -Ki[i].q)-180)*(Math.PI/180));
            this.O[ Si ].toDo='goToSquad';
            this.O[ Si ].doSquad='goToSquad';
            this.O[ Si ].dec=100;
            ++i;
        }

    }

    // **********************************************
    // **********************************************
    // **********************************************
    // **********************************************
    // **********************************************

    this.alarmAround = function(o,DistAlert,AlarmFlag){
        var uO,X,Y,Dist,O = this.O[o];

        for(var uo in this.Enemies) if(uo!=o){
            uO = this.O[uo];
            X = O.x-uO.x;
            Y = O.y-uO.y;
            Dist = Math.sqrt(X*X- -Y*Y);
            if(Dist < DistAlert){
                this.O[uo][AlarmFlag] = true;
            }
        }
    }
    this.changeSpeedLvl = function(O,speedLvl){
        O.speedLvl = speedLvl;
        O.speed = O.speedArr[ speedLvl ].S;
        O.speedT = O.speedArr[ speedLvl ].T;
    }

    this.decide = function(o){
        var O = this.O[o];
        var P = this.O[0];
        O.lastSpeedT = 0;

        var X = O.x-P.x;
        var Y = O.y-P.y;
        var PlayerDist = Math.sqrt(X*X- -Y*Y);
        var PlayerAngle = parseInt(- (Math.atan2(X,Y)*180/Math.PI))%360;

        // Spotting
        if(O.spotLvl){
            if(this.tick % (O.spotArr[ O.spotLvl ].Ref) == 0){
                var SP = O.spotArr[ O.spotLvl ];
                if((SP.T=='single' || SP.T=='double') && PlayerDist < SP.Rad){
                    O.spotEnemyFlag = true;
                }
                if(SP.T=='double' && !O.spotEnemyFlag){
                    var A = (PlayerAngle -O.angle- -720- -SP.Angle2)%360;
                    if(PlayerDist < SP.Rad2 && A < SP.Angle2*2){
                        O.spotEnemyFlag = true;
                    }
                }
                // Szukamy grupy i pocisku
                if(!O.awareAboutEnemy){
                    for(var U in this.Odead){
                        var uX = O.x-this.Odead[U].x;
                        var uY = O.y-this.Odead[U].y;
                        var uDist = Math.sqrt(uX*uX- -uY*uY);
                        var uAngle = parseInt(- (Math.atan2(uX,uY)*180/Math.PI))%360;
                        if((SP.T=='single' || SP.T=='double') && uDist < SP.Rad){
                            O.awareAboutEnemy = true;
                            break;
                        }
                        if(SP.T=='double' && !O.spotEnemyFlag){
                            var uA = (uAngle -O.angle- -720- -SP.Angle2)%360;
                            if(uDist < SP.Rad2 && uA < SP.Angle2*2){
                                O.awareAboutEnemy = true;
                                break;
                            }
                        }
                    }
                }
            }
        }

        /*
        O.spotEnemyFlag = false;
        O.gotHitFlag = false;
        O.heardExplosionFlag = false;
        O.newOrderFlag = false;
        O.incomingFireFlag = false;
        O.awareAboutEnemy = false;
        O.lastSeenEnemy = -1;
        */
        // Sprawdzamy czy flagi mog� przerwa� obecne zadanie
        if(O.awareAboutEnemy && O.AlarmLvl < 3){
            O.AlarmLvl = 4;
            O.doingTime = -1;
        }
        if(O.spotEnemyFlag){
            if(O.AlarmLvl < 5){
                O.AlarmLvl = 5;
                O.doingTime = -1;
            }
            O.lastSeenEnemy = this.tick;
            O.awareAboutEnemy = true;
        }

        if(O.gotHitFlag==true && O.T!='avoidIncomingFire')
            O.doingTime = -1;
        if(O.incomingFireFlag==true && O.T!='avoidIncomingFire')
            O.doingTime = -1;


        // Jak się skończy czas to szukamy kolejnego zadania
        if((--O.doingTime) < 0){

            for(var toDo in O.toDo){
                var TD = O.toDo[toDo];

                // Sprawdzamy Czy akcja się nadaje
                if(TD.minAlarm && TD.minAlarm > O.AlarmLvl) continue;
                if(TD.maxAlarm && TD.maxAlarm < O.AlarmLvl) continue;
                if(TD.minSpeedLvl && TD.minSpeedLvl > O.speedLvl) continue;
                if(TD.gotHitFlag && O.gotHitFlag===false) continue;
                if(TD.incomingFireFlag && O.incomingFireFlag===false) continue;


                if(TD.T=='lowerSpeedForResources'){
                    if(O.Res[ TD.wantedRes ].R < TD.wantedResR)
                        this.changeSpeedLvl(O,TD.gotoSpeed);
                    continue;
                }
                if(TD.T=='speedUpIfResources'){
                    if(O.Res[ TD.wantedRes ].R >= TD.wantedResR)
                        this.changeSpeedLvl(O,TD.gotoSpeed);
                    continue;
                }

                if(TD.T=='stayInRegion'){
                    var uX = TD.X - O.x;
                    var uY = TD.Y - O.y;
                    if(Math.sqrt(uX*uX- -uY*uY) < TD.Radius) continue;
                }
                if(TD.T=='lowerAlarmLvl' && ((this.tick - O.lastSeenEnemy) < TD.minEnemyDontSeen)) continue;


                // Dodajemy Akcję
                if(TD.T=='stayInRegion'){
                    O.Manouver = 'goToXY';
                    O.goToX = TD.X;
                    O.goToY = TD.Y;
                    O.doingTime = 160;
                }


                if(TD.T=='alarmAboutSpottedEnemy'){
                    this.alarmAround(o,TD.alarmRadius,'spotEnemyFlag');
                    continue;
                }
                if(TD.T=='alarmAboutIncomingFire'){
                    this.alarmAround(o,TD.alarmRadius,'incomingFireFlag');
                    continue;
                }

                if(TD.T=='changeManouver'){
                    var maxTurnTime = parseInt(180/O.speedT);
                    switch(parseInt(Math.random()*3)){
                        case 0: O.Manouver = 'goStraight'; O.doingTime = TD.straightMin- -parseInt(Math.random()*TD.straightPlus); break;
                        case 1: O.Manouver = 'turnRight';  O.doingTime = TD.turnMin- -parseInt(Math.random()*TD.turnPlus); if(O.doingTime > maxTurnTime) O.doingTime = maxTurnTime; break;
                        case 2: O.Manouver = 'turnLeft';  O.doingTime = TD.turnMin- -parseInt(Math.random()*TD.turnPlus); if(O.doingTime > maxTurnTime) O.doingTime = maxTurnTime; break;
                    }
                }

                if(TD.T=='changeManouver2'){
                    if(O.Manouver =='goStraight'){
                        var maxTurnTime = parseInt(180/O.speedT);
                        switch(parseInt(Math.random()*2)){
                            case 0: O.Manouver = 'turnRight';  O.doingTime = TD.turnMin- -parseInt(Math.random()*TD.turnPlus); if(O.doingTime > maxTurnTime) O.doingTime = maxTurnTime; break;
                            case 1: O.Manouver = 'turnLeft';  O.doingTime = TD.turnMin- -parseInt(Math.random()*TD.turnPlus); if(O.doingTime > maxTurnTime) O.doingTime = maxTurnTime; break;
                        }
                    }else{
                        O.Manouver = 'goStraight';
                        O.doingTime = TD.straightMin- -parseInt(Math.random()*TD.straightPlus);
                    }
                }

                if(TD.T=='avoidIncomingFire'){
                    switch(parseInt(Math.random()*2)){
                        case 0: O.Manouver = 'turnRight';  O.doingTime = TD.avoidTime; break;
                        case 1: O.Manouver = 'turnLeft';  O.doingTime = TD.avoidTime; break;
                    }
                }

                if(TD.T=='followEnemy'){
                    O.doingTime = 50;
                    O.Manouver = 'followEnemy';
                }

                if(TD.T=='die'){
                    if(O.onDie){
                        if(O.onDie.Do=='explode'){
                            this.explodeBomb(o,O.onDie);
                        }
                    } else
                        this.removeObj(o);
                    return true;
                }
                if(TD.T=='expire'){
                    if(O.onExpire){
                        if(O.onExpire.Do=='explode'){
                            this.explodeBomb(o,O.onExpire);
                        }
                    } else
                        this.removeObj(o);
                    return true;
                }

                if(TD.T=='explode'){
                    this.explodeBomb(o,O.onDie);
                    return true;
                }

                if(TD.T=='goStraight'){
                    O.Manouver = 'goStraight';
                    O.doingTime = TD.straightMin- -parseInt(Math.random()*TD.straightPlus);
                }

                // Dodatkowe wywo�ania akcji
                if(TD.goToAlarmLvl)    O.AlarmLvl = TD.goToAlarmLvl;
                if(TD.goToSpotLvl)    O.spotLvl = TD.goToSpotLvl;

                O.doingNow = TD.T;
                break;
            }
        }

        // Wykonujemy zadanie
        switch(O.Manouver){
            case 'followEntity':{
                if(typeof this.O[O.FollowWho] == 'undefined' || this.O[O.FollowWho].life <= 0){
                    O.Manouver = 'goStraight';
                    O.lastSpeedT = 0;
                }
                if(typeof this.O[O.FollowWho] !='undefined'){
                    var wiX = O.x-this.O[O.FollowWho].x;
                    var wiY = O.y-this.O[O.FollowWho].y;
                }
                if(typeof wiX!='undefined'){
                    var Angle = parseInt(- (Math.atan2(wiX,wiY)*180/Math.PI)- -360)%360;
                    var Tyk = (O.angle-Angle- -360)%360;
                    var Ei = 180 - Math.abs( Tyk - 180);
                    var speedT = O.speedT;
                    O.Tyk = Tyk;
                    if(Ei < speedT) speedT = Ei;
                    if(Tyk > 180){    O.angle = (O.angle- -speedT- -360)%360; O.lastSpeedT = speedT; }
                    if(Tyk <= 180){    O.angle = (O.angle-speedT- -360)%360;     O.lastSpeedT = -speedT; }
                }
            }break;
            case 'followEnemy':{
                var Tyk = (O.angle-PlayerAngle- -360)%360;
                var Ei = 180 - Math.abs( Tyk - 180);
                var speedT = O.speedT;
                O.Tyk = Tyk;
                if(Ei < speedT) speedT = Ei;
                if(Tyk > 180){    O.angle = (O.angle- -speedT- -360)%360; O.lastSpeedT = speedT; }
                if(Tyk <= 180){    O.angle = (O.angle-speedT- -360)%360;     O.lastSpeedT = -speedT; }
            }break;
            case 'goToXY':{
                var wiX = O.x-O.goToX;
                var wiY = O.y-O.goToY;
                var Angle = parseInt(- (Math.atan2(wiX,wiY)*180/Math.PI)- -360)%360;
                var Tyk = (O.angle-Angle- -360)%360;
                var Ei = 180 - Math.abs( Tyk - 180);
                var speedT = O.speedT;
                if(Ei < speedT) speedT = Ei;
                if(Tyk > 180){    O.angle = (O.angle- -speedT- -360)%360; O.lastSpeedT = speedT; }
                if(Tyk <= 180){    O.angle = (O.angle-speedT- -360)%360;     O.lastSpeedT = -speedT; }
            }break;
            case 'turnLeft':{
                O.angle = (O.angle- -360- -O.speedT) %360;
                O.lastSpeedT = O.speedT;
            }break;
            case 'turnRight':{
                O.angle = (O.angle- -360-O.speedT) %360;
                O.lastSpeedT =-O.speedT;
            }break;
            case 'goStraight':{
                O.lastSpeedT = 0;
            }break;
            case 'decay':{
                if(O.doingTime%10 == 0){
                    if(O.life > 1){
                        O.life--;
                        CanvasManager.requestCanvas(o);
                    } else this.removeObj(o);
                    return true;
                }
            }break;
        }


        /*
        OBJ.weapon=[{t:'single', Power:1, Dec: 30, Speed: 10, gunSpeed: 15, lastShot: 120}];
        OBJ.weapon=[{t:'double', Power:1, Dec: 30, Speed: 10, gunSpeed: 15, lastShot: 120}];
        OBJ.weapon=[{t:'double2', Power:1, Dec: 30, Speed: 10, gunSpeed: 15, lastShot: 120}];
        OBJ.weapon=[{t:'rose', Power:1, Dec: 50, Speed: 10, gunSpeed: 50, RoseAngle: 4, AtOnce: 9, lastShot: 120}];
        */
        // Strzelamy
        if(O.weapon){
            for(var wp in O.weapon){
                var WP = O.weapon[wp];
                if(WP.minAlarm && WP.minAlarm > O.AlarmLvl) continue;
                if(WP.maxAlarm && WP.maxAlarm < O.AlarmLvl) continue;
                if(WP.maxSpeed && WP.maxSpeed < O.speedLvl) continue;
                if(WP.minSpeed && WP.minSpeed > O.speedLvl) continue;    // Czy w og�le kiedy� u�yjemy tego?
                if(WP.minDistToEnemy && WP.minDistToEnemy < PlayerDist) continue;
                if(WP.gunSpeed > (this.tick-WP.lastShot)) continue;
                if(WP.usedRes && O.Res[ WP.usedRes ].R < WP.usedResR) continue;

                if(WP.t == 'getAcurateAngle'){
                    var WU = this.countFutureShoot(0,O.x,O.y,WP.Speed,WP.Dec);
                    if(WU.r)  PlayerAngle = WU.a;
                }

                if(WP.t == 'single'){
                    this.shootBullet(o,PlayerAngle,WP.Speed,WP.Dec,WP.Power);
                    WP.lastShot = this.tick;
                }

                if(WP.t == 'double'){
                    this.shootBulletOnSide(o,0,WP.Speed,WP.Dec,45,30,WP.Power);
                    this.shootBulletOnSide(o,0,WP.Speed,WP.Dec,-45,30,WP.Power);
                    WP.lastShot = this.tick;
                }
                if(WP.t == 'double2'){
                    this.shootBulletOnSide2(o,0,WP.Speed,WP.Dec,45,5,WP.Power);
                    this.shootBulletOnSide2(o,0,WP.Speed,WP.Dec,-45,5,WP.Power);
                    WP.lastShot = this.tick;
                }

                if(WP.t == 'misslesDouble'){
                    this.shootMissle(o,PlayerAngle - 20,15,150);
                    this.shootMissle(o,PlayerAngle- -20,15,150);
                    O.Res[ WP.usedRes ].R -= WP.usedResR;
                    WP.lastShot = this.tick;
                }

                if(WP.t=='rose'){
                    for(var i = -parseInt(WP.AtOnce/2); i<= parseInt(WP.AtOnce/2); ++i)
                        this.shootBullet(o,PlayerAngle-i*WP.RoseAngle,WP.Speed,WP.Dec,WP.Power);
                    WP.lastShot = this.tick;
                }

                if(WP.t=='refilResource'){
                    if(++O.Res[WP.resource].T >= WP.gunSpeed){
                        if(++O.Res[WP.resource].R > O.Res[WP.resource].M)
                            O.Res[WP.resource].R = O.Res[WP.resource].M;
                        O.Res[WP.resource].T = 0;
                    }
                }

                if(WP.t=='produceSquad'){
                    do{
                        var weMadeSomething = false;
                        var iUnset = false;
                        for(var i=0; i < O.squadScheme.length; ++i)
                            if(O.squadScheme[i].Oid == -1){
                                iUnset = i;
                                break;
                            }

                        if(iUnset !== false){
                            this.setSquadMember(o,iUnset,1);

                            O.Res[ WP.usedRes ].R -= WP.usedResR;
                            WP.lastShot = this.tick;
                            if(O.Res[ WP.usedRes ].R < WP.usedResR) break;
                            weMadeSomething = true;
                        }
                    }while(weMadeSomething);
                }
                if(WP.t=='healSquad'){
                    do{
                        var weMadeSomething = false;
                        var iLowLife = false, lowLifeMin = 999;
                        for(var i=0; i < O.squadScheme.length; ++i)
                            if(O.squadScheme[i].type == 'shieldBlob')
                                if(O.squadScheme[i].Oid != -1){
                                    var oS = this.O[ O.squadScheme[i].Oid ];
                                    if( oS.life < lowLifeMin && oS.life < oS.lifeM){
                                        lowLifeMin = oS.life;
                                        iLowLife = i;
                                    }
                                }

                        if(iLowLife === false) break;
                        var OSS = O.squadScheme[iLowLife];

                        if(OSS.type == 'shieldBlob'){
                            this.O[ OSS.Oid].life -=- 1;
                            CanvasManager.requestCanvas( OSS.Oid );

                            WP.lastShot = this.tick;
                            O.Res[ WP.usedRes ].R -= WP.usedResR;
                            if(O.Res[ WP.usedRes ].R < WP.usedResR) break;
                            weMadeSomething = true;
                        }

                    }while(weMadeSomething);
                }

                /*
                if(Fx.T=='missle' && S.Missles >= Fx.MissleUse && this.missleAim!=false){
                    this.shipShootMissle(this.missleAim,O.angle,Fx.Speed,Fx.Dec,Fx.SpeedT,Fx.Power);
                    Fx.gunS=0;
                    S.Missles-=Fx.MissleUse;
                }
                */


                if(WP.doNextWeapon) continue;

                break;
            }
        }
        O.spotEnemyFlag = false;
        O.incomingFireFlag = false;
        O.gotHitFlag = false;
    }


    // ===============================================
    // ===============================================
    // ===============================================
    // ===============================================
    // ===============================================
    // ===============================================

    this.decideOLD = function(o){
        var O = this.O[o];
        var P = this.O[0];
        O.lastSpeedT = 0;

        if(O.T=='missle' && O.dec < 0)
            this.removeObj(o);

        if(O.T=='dregos' && O.dec < 0 && O.toDo=='follow'){
            O.toDo='rest';
            O.dec=500;
            O.speed=3;
            O.ammo=0;
        }
        if(O.T=='dregos' && O.dec < 0 && O.toDo=='rest')
            O.speed=8;
        if(O.T=='warastein' && O.dec < 0 && O.toDo=='rest')
            O.speed=7;

        if(O.dec < 0 && ( O.toDo=='turnLeft' || O.toDo=='turnRight')){
            O.toDo='goStraight';
            O.dec = parseInt(Math.random()*200)- -500;
        }

        if(O.T!='space_mine' && O.T!='bullet_bomb' && O.dec < 0){
            switch(parseInt(Math.random()*2)){
                case 1: O.toDo='turnLeft';         O.dec = parseInt(Math.random()*90); break;
                case 2: O.toDo='turnRight';        O.dec = parseInt(Math.random()*90); break;
            }
            if(O.T=='tartaros')
                O.dec=parseInt(O.dec/3);
        }

        var X = O.x-P.x;
        var Y = O.y-P.y;
        var Dist = Math.sqrt(X*X- -Y*Y);



        switch(O.T){
                case 'nemezis':
                if(Dist < 400 && O.ammo > 40){
                    var Angle = parseInt(- (Math.atan2(X,Y)*180/Math.PI))%360;
                    this.shootBomb(o,Angle,10,50,4,35);
                    O.ammo=0;
                }
            break; case 'royale':
                if(Dist < 400 && O.ammo > 120){
                    var Pe = [80,280,100,260,120,240,140,220];
                    var Angle = parseInt(- (Math.atan2(P.x-O.x,P.y-O.y)*180/Math.PI)- -180)%360;

                    for(var iki=0; iki<8; ++iki)
                        this.shootMissle(o, (Angle- -Pe[iki])%360, (12-parseInt(iki/2)*2),(95- -parseInt(iki/2)*20),(6-parseInt(iki/2)));
                    O.ammo=0;
                }
            break; case 'warastein':
                if(Dist < 400 && O.ammo > 140){
                    O.toDo = 'rest';
                    O.dec = 30;
                    O.speed = 3;
                    var Angle = parseInt(- (Math.atan2(X,Y)*180/Math.PI))%360;
                    this.shootBomb(o,Angle        ,6,20,4,35);
                    this.shootBomb(o,Angle- -7    ,8,23,4,35);
                    this.shootBomb(o,Angle - 7    ,8,23,4,35);
                    this.shootBomb(o,Angle- -15    ,10,26,4,35);
                    this.shootBomb(o,Angle - 15    ,10,26,4,35);
                    this.shootBomb(o,Angle         ,10,26,7,80);
                    this.shootBomb(o,Angle- -15    ,12,29,7,80);
                    this.shootBomb(o,Angle - 15    ,12,29,7,80);
                    this.shootBomb(o,Angle         ,14,29,9,120);
                    O.ammo=0;
                }
            break; case 'edison':
                if(O.ammo==100)
                  //  $('#O_'+o).append('<div class="edisonField"></div>');
                if(Dist < 150 && O.ammo > 120){
                    this.makeDMG(0,O.FieldPower);
                    O.ammo=0;
                  //  $('#O_'+o+' .edisonField').addClass('edisonHit hit_'+parseInt(this.tick/100));
                }
            break; case 'tartaros':
                if(Dist < 400 && O.ammo > 100){
                    this.shootBulletOnSide(o,0,12,35,45,30,1);
                    this.shootBulletOnSide(o,0,12,35,-45,30,1);
                    O.ammo=0;
                }
                if(O.ammo < 10){
                    this.shootBulletOnSide(o,0,12,35,45,30,1);
                    this.shootBulletOnSide(o,0,12,35,-45,30,1);
                }
            break; case 'gargamon':    // how Squad?
                if(O.toDo!='goFollow' && O.toDo!='missleShoot' && Dist < 400 && O.ammo > 150){
                    O.toDo='goFollow';
                    O.dec = 31;
                }
                if(O.toDo=='goFollow'){
                    var X = O.x-P.x;
                    var Y = O.y-P.y;
                    var Angle = parseInt(- (Math.atan2(X,Y)*180/Math.PI)- -360)%360;
                    var Tyk = (O.angle-Angle- -360)%360;
                    if(Tyk > 180)        O.angle = (O.angle- -360- -4) %360;
                    else if(Tyk < 180)    O.angle = (O.angle- -360-4) %360;
                }
                if(O.toDo=='goFollow' && O.dec==1){
                    O.toDo='missleShoot';
                    O.dec=40;
                    O.ammo=0;
                }
                if(O.toDo=='missleShoot' && O.ammo==0)    this.shootMissle(o,O.angle- -30,15,150);
                if(O.toDo=='missleShoot' && O.ammo==8)    this.shootMissle(o,O.angle- -15,15,150);
                if(O.toDo=='missleShoot' && O.ammo==16)    this.shootMissle(o,O.angle    ,15,150);
                if(O.toDo=='missleShoot' && O.ammo==24)    this.shootMissle(o,O.angle -15,15,150);
                if(O.toDo=='missleShoot' && O.ammo==32)    this.shootMissle(o,O.angle -30,15,150);
            break; case 'juggernaut':
                if(O.toDo!='follow' && Dist < 400 && O.ammo > 50){
                    O.toDo='follow';
                    O.speedT=5;
                    O.dec = 18;
                }
                if(O.toDo=='follow' && O.dec==1){
                    O.toDo=0;
                    O.dec=100;
                    O.speedT=2;
                    O.ammo=0;
                    var Angle = parseInt(- (Math.atan2(X,Y)*180/Math.PI))%360;
                    var Ku = [35,80,120,210];
                    var Ka = [4,7,11,18];
                    var Ki = parseInt(Math.random()*4);
                    this.shootBomb(o,Angle,16,20,Ka[Ki],Ku[Ki]);
                }
            break; case 'belzebub':
                if(Dist < 400 && O.ammo > 120){
                    var Angle = parseInt(- (Math.atan2(X,Y)*180/Math.PI))%360;
                    this.dropSpaceMine(o,Angle);
                    O.ammo=0;
                }
                if(O.ammo > 1000){
                    this.dropSpaceMine(o);
                    O.ammo=0;
                }
            break; case 'orhenes':
                if(Dist < 400 && O.ammo > 2000){
                    for(var i=0; i<8; ++i){
                        var L = this.putObj('carras','comp',O.S,O.x,O.y);
                        this.O[L].dec=600;
                        this.O[L].toDo='follow';
                        this.O[L].ammo=-100;
                    }
                    O.ammo=0;
                }
            break; case 'koriaz':
                if(O.ammo % 13 == 0){
                    var Site='A';
                    if(O.S==2) Site='B';
                    for(var q in this['Osite'+Site]){
                        var mX = O.x-this.O[q].x;
                        var mY = O.y-this.O[q].y;
                        if(Math.sqrt(mX*mX- -mY*mY) < 500){
                            this.addShield(q,14);
                        }

                    }
                }
            break; case 'vitotas':
                if(O.toDo!='follow' && O.toDo!='aimLaser' && O.doSquad==-1 && Dist < 400){
                    O.toDo='follow';
                    O.dec=600;
                }
                if(Dist < 400 && O.ammo > 220){
                    O.toDo='aimLaser';
                    var Angle = parseInt(- (Math.atan2(X,Y)*180/Math.PI))%360;
                    O.laserAngle = Angle;
                    Angle =(( Angle -O.angle)- -540)%360;
                    //  $('#O_'+o).append('<div class="object laserAiming hit_'+parseInt(this.tick/100)+'" style="height: '+O.Distance+'px; transform: rotate('+Angle+'deg);"></div>');
                    O.ammo=0;
                    O.dec = O.LaserAim;
                }
                if(O.toDo=='aimLaser' && O.dec == 1){
                    this.shootLaser(o,O.Distance,O.Damage);
                    if(O.doSquad==-1)
                        O.toDo='follow';
                }

            break; case 'hajaher':
                if(Dist < 400 && O.ammo > 15){
                    if(O.toDo!='follow' && O.doSquad==-1){
                        O.toDo='follow';
                        O.dec=400;
                    }
                    var WU = this.countFutureShoot(0,O.x,O.y,12,30);
                    if(WU.r){
                        this.shootBullet(o,WU.a,12,30,1);
                        O.ammo=0;
                    }
                }
            break; case 'cloacker':
                if(Dist < 500 && O.ammo > 300 && O.toDo!='follow'){
                  //  $('#gameboard').append('<div class="object hit hit_blue hit_'+parseInt(this.tick/100)+'" style="left: '+O.x+'px; top: '+O.y+'px;"></div>');
                  //  $('#O_'+o).addClass('cloacked');
                    if(O.doSquad==-1)
                        O.toDo='follow';
                    O.dec=400;
                    O.speed=12;
                }
                if(Dist < 50 && O.toDo=='follow' && O.ammo > 300){
                  //  $('#O_'+o).removeClass('cloacked');

                    var Angle = parseInt(- (Math.atan2(X,Y)*180/Math.PI))%360;
                    this.shootBullet(o,Angle,14,50,1);
                    O.ammo=0;
                }
                if(O.ammo < 4){
                    var Angle = parseInt(- (Math.atan2(X,Y)*180/Math.PI))%360;
                    this.shootBullet(o,Angle,14,50,1);
                }
                if(O.ammo==4){
                    O.speed = 6;
                    O.toDo=1;
                    O.dec=-1;
                }
            break; case 'fariax':
                if(O.ammo % 10 == 0){
                    var Site='A';
                    if(O.S==2) Site='B';
                    for(var q in this['Osite'+Site])
                        if(o!=q)
                        if(this.O[q].life < this.O[q].lifeM){
                            var mX = O.x-this.O[q].x;
                            var mY = O.y-this.O[q].y;
                            if(Math.sqrt(mX*mX- -mY*mY) < 300){
                                var Angle = parseInt(- (Math.atan2(mX,mY)*180/Math.PI))%360;
                                this.shootHealingMissle(o,q,Angle);
                                break;
                            }
                    }
                }
            break; case 'healing_missle':
                if(typeof this.O[O.target] == 'undefined'){
                    this.removeObj(o);
                    break;
                }
                var mX = O.x-this.O[O.target].x;
                var mY = O.y-this.O[O.target].y;
                O.angle = parseInt(- (Math.atan2(mX,mY)*180/Math.PI))%360;
                var DistE = Math.sqrt(mX*mX- -mY*mY);
                if(DistE < this.O[O.target].radius){
                    this.healObj(O.target,1,o);
                }
            break; case 'hiacynt':
                if(Dist < 500 && O.toDo!='follow' && O.toDo!='rest' && O.toDo!='attack' && O.doSquad==-1){
                    O.toDo = 'follow';
                    O.speed = 10;
                    O.dec = 400;
                }
                if(Dist < 100 && O.toDo=='follow'){
                    O.toDo = 'attack';
                    O.dec = 31;
                  //  if(O.ammo > 120) O.ammo = 120;
                }
                if(O.toDo=='attack' && (O.dec%3)==0){
                  //  O.ammo -= 11;
                    var Angle = parseInt(- (Math.atan2(X,Y)*180/Math.PI))%360;

                    var L = this.putObj('hiacynt_shield','comp',O.S,O.x,O.y);
                    this.O[L].angle = Angle - parseInt(Math.random()*40)- -20;
                    this.O[L].speed = 16;
                    this.O[L].dec = 70;
                }
                if(O.toDo=='attack' && O.dec==1){
                    O.toDo = 'rest';
                    O.dec = 200;
                    O.speed = 5;
                }
            break; case 'hiacynt_shield':
                if(O.dec==66 || O.dec==62 || O.dec==58 || O.dec==54 || O.dec==50 || O.dec==46 || O.dec==42 || O.dec==38)
                    O.speed-=2;

                if((O.dec==50 || O.dec==30 || O.dec==20 || O.dec==10) && O.life > 0){
                  //  $('#O_'+o).removeClass('life'+((O.life/O.lifeM).toFixed(1)*100));
                    O.life-=1;
                    CanvasManager.requestCanvas( o );
                  //  $('#O_'+o).addClass('life'+((O.life/O.lifeM).toFixed(1)*100));
                }
                if(O.dec==1)
                    this.removeObj(o);
            break;


        }






        if(typeof O.shieldD != 'undefined' && --O.shieldD < 1){
          //  $('#O_'+o+' .shield').remove();
            delete O.shieldD;
        }

        if(O.toDo=='goToSquad'){
            O.doSquad='goToSquad';
            var X = O.x - O.squadX;
            var Y = O.y - O.squadY;
            var Angle = parseInt(- (Math.atan2(X,Y)*180/Math.PI)- -360)%360;
            var Dist = Math.sqrt(X*X- -Y*Y);
            var Tyk = (O.angle-Angle- -360)%360;
            if(Dist < 15){
                O.x = O.squadX;
                O.y = O.squadY;
                O.speed = this.O[ this.Squads[ O.squadId ].Leader ].speed;
                O.angle = this.O[ this.Squads[ O.squadId ].Leader ].angle;
                O.lastSpeedT = this.O[ this.Squads[ O.squadId ].Leader ].lastSpeedT;
            } else {
                O.speed = O.speedM;
                if(Tyk > 180){    O.angle = (O.angle- -360- -O.speedT) %360;    O.lastSpeedT = O.speedT;}
                if(Tyk < 180){    O.angle = (O.angle- -360-O.speedT) %360;    O.lastSpeedT =-O.speedT;}
            }
        }

        if(O.toDo=='follow'){
            if(O.Follow > 0){
                if(typeof this.O[O.Follow] !='undefined'){
                    var wiX = O.x-this.O[O.Follow].x;
                    var wiY = O.y-this.O[O.Follow].y;
                }
            }else{
                var wiX = O.x-P.x;
                var wiY = O.y-P.y;
            }
            if(typeof wiX!='undefined'){
                var Angle = parseInt(- (Math.atan2(wiX,wiY)*180/Math.PI)- -360)%360;
                var Tyk = (O.angle-Angle- -360)%360;
                var Ei = 180 - Math.abs( Tyk - 180);
                var speedT = O.speedT;
                if(Ei < speedT) speedT = Ei;
                if(Tyk > 180){    O.angle = (O.angle- -360- -speedT) %360; O.lastSpeedT = speedT;    }
                if(Tyk < 180){    O.angle = (O.angle- -360-speedT) %360;     O.lastSpeedT =-speedT; }
            }
        }


        if(O.toDo=='turnLeft'){        O.angle = (O.angle- -360- -O.speedT) %360;    O.lastSpeedT = O.speedT; }
        if(O.toDo=='turnRight'){    O.angle = (O.angle- -360-O.speedT) %360;    O.lastSpeedT =-O.speedT; }

        O.ammo++;
        O.dec--;
        if( O.energyField < O.energyFieldMax){
            if(++O.enegryFieldRelief >=    O.enegryFieldRefielTime){
              //  if(++O.energyField == 1)
              //      $('#O_'+o).prepend('<div class="energyField"></div>');
                O.enegryFieldRelief=0;
            }
        }
    }



    this.frame_decide = function(){
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

    this.frame_move = function(){
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
      //  $('#gameboard').css({left: (-this.O[0].x- -(this.Dx/2))+'px',top: (-this.O[0].y- -(this.Dy/2))+'px'});

        this.MSmove-=-((new Date()).getTime() - MS);
    }

    this.frame_draw = function(){
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

                if(O.energyField && O.energyField > 0){
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

    this.frame = function(){
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


    this.endGame = function(){
        window.cancelAnimationFrame(this.intervalIndex);
        if(this.doEndGame==true) return false;
        this.doEndGame=true;

        var html='';
        if(this.EnemiesC==0 && this.O[0].life > 0)
            html='<span style="font-size: 70px;">You Won!</span><br/>';
        else
            html='<span style="font-size: 70px;">'+this.EnemiesC+' enemies left</span><br/>';
        $('#Game').append('<div id="endGameBoard">'+html+'</div>');

        $('.enemy').each(function(){
            var html='',Letter,T = $(this).attr('class');
            if(T.indexOf('dregos') > -1) Letter='U';
            if(T.indexOf('carras') > -1) Letter='A';
            if(T.indexOf('muerto') > -1) Letter='M';
            if(T.indexOf('orhenes') > -1) Letter='Q';
            if(T.indexOf('tartaros') > -1) Letter='T';
            if(T.indexOf('belzebub') > -1) Letter='B';
            if(T.indexOf('nemezis') > -1) Letter='N';
            if(T.indexOf('koriaz') > -1) Letter='K';
            if(T.indexOf('cloacker') > -1) Letter='C';
            if(T.indexOf('fariax') > -1) Letter='F';
            if(T.indexOf('gargamon') > -1) Letter='G';
            if(T.indexOf('hajaher') > -1) Letter='S';
            if(T.indexOf('dandares') > -1) Letter='D';
            if(T.indexOf('juggernaut') > -1) Letter='J';
            if(T.indexOf('vitotas') > -1) Letter='V';
            if(T.indexOf('edison') > -1) Letter='E';
            if(T.indexOf('hiacynt') > -1) Letter='H';
            if(T.indexOf('warastein') > -1) Letter='W';
            if(T.indexOf('iskariot') > -1) Letter='I';
            if(T.indexOf('royale') > -1) Letter='R';

            if(T.indexOf('life-dead') > -1) html='<span class="killed">'+Letter+'</span> ';
                        else            html=Letter+' ';
            $('#endGameBoard').append(html);
        });
        setTimeout("$('#Game').unbind('click').click(function(){ GAME.goToMenu(); });",1200);

    }
    this.goToMenu = function(){
        $(window).unbind();
        delete GAME;
        $('#Game').unbind('click').html('').hide();
        $('#Menu').show();
    }
}
