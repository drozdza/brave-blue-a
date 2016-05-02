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



    this.decideOLD = function(o){
        var O = this.O[o];
        var P = this.O[0];
        O.lastSpeedT = 0;

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
            case 'royale':
                if(Dist < 400 && O.ammo > 120){
                    var Pe = [80,280,100,260,120,240,140,220];
                    var Angle = parseInt(- (Math.atan2(P.x-O.x,P.y-O.y)*180/Math.PI)- -180)%360;

                    for(var iki=0; iki<8; ++iki)
                        this.shootMissle(o, (Angle- -Pe[iki])%360, (12-parseInt(iki/2)*2),(95- -parseInt(iki/2)*20),(6-parseInt(iki/2)));
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
