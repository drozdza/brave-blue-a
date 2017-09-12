
GAMEobject.prototype.shipFunc_glueFireToLaser = function(){
    var F,X,Y,R,dist=1000000,laserAim=false,radius = this.SHIP.GlueFireToLaser;
    var Found = this.getCollidingWithCircle(this.mouseX,this.mouseY,radius,['E','ME','A','R']);

    var laserAim = false;
    var dist = 1000000;
    for(F in Found){
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
GAMEobject.prototype.shipFunc_glueFireToMissle = function(aimRadius){
    var F,X,Y,R,dist=1000000,laserAim=false;
    var Found = this.getCollidingWithCircle(this.mouseX,this.mouseY,aimRadius,['E','ME','A','R']);

    var missleAim = false;
    var dist = 1000000;
    for(F in Found){
        console.log(F);
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

        console.log(missleAim);
    } else {
        console.log('bee');
        this.missleAim = false;
    }
}
GAMEobject.prototype.shipFunc_esteemedPositions = function(O,F){
    EsteemedPos={};
    var WU;
    var Found = this.getCollidingWithCircle(this.O[0].x,this.O[0].y,800,['E']);
    for(var Fo in Found){
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
GAMEobject.prototype.shipFunc_glueFireToEstimated = function(EsteemedPos){

    var jest = false;
    var Rad = this.SHIP.GlueFireToEstimated;
    var Rad2 = Rad*Rad;
    var dist = 1000000;
    for(F in EsteemedPos){
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
GAMEobject.prototype.shipFunc_teleport = function(Fx){
    var O = this.O[0];
    var iX = O.x-this.mouseX;
    var iY = O.y-this.mouseY;
    var iDist = Math.sqrt(iX*iX- -iY*iY);
    var iRad = parseInt(- (Math.atan2(iX,iY)*180/Math.PI))%360;
    if(iDist > Fx.Speed)
        iDist = Fx.Speed;

    return this.teleportJump(0,iDist,iRad);
}
GAMEobject.prototype.shipFunc_workingRadar = function(U,Prod,Radius){
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
GAMEobject.prototype.shipFunc_speedChange = function(){
    var O = this.O[0];
    var S = this.SHIP;
    var Sx = this.SHIPold;
    var html='';
    if(O.speed < 0) O.speed=0.0;
    if(O.speed > S.speedM) O.speed=S.speedM;
    S.Espeed = Speed2Energy(O.speed,S.Weight,S.engineMultiply);
    S.Energy = S.EnergyM - S.Espeed;

    $('#modulesEnergyIn').html(S.Energy.toFixed(2));

    html+='<div class="speedBoxEnergy">'+S.Espeed.toFixed(2)+'</div>';
    html+='<span class="speedBoxSpeed">'+O.speed.toFixed(1)+'</span>';
    for(var i=parseInt(O.speed- -0.97); i >0; --i)
        if(O.speed > i) html+='<div class="speedOmeter speed_'+i+'"></div>';
            else        html+='<div class="speedOmeter speed_'+i+'"><span class="speedCap_'+(i-O.speed).toFixed(1)*10+'0"></span></div>';
    $('#speedOmeterBox').html(html);
    Sx.speed = O.speed;
}
GAMEobject.prototype.shipFunc_changeWeapon = function(Fx,weaponId){
    var S = this.SHIP;
    $('.attackBox').removeClass('attackBoxActive');

    if(Fx==1){
        S.Weapon1 = weaponId;
        var Weapon = S.Weapons[ S.Weapon1 ];
        if(S.ShowFireRange){
            var RadX = Weapon.Speed*Weapon.Dec;
            if(Weapon.T=='bombT') RadX = Weapon.Distance;
            $('#bullRadX').css({width: RadX*2+'px',height: RadX*2+'px',top: (-RadX)+'px',left: (-RadX)+'px'});
        }
    }else{
        S.Weapon2 = weaponId;
    }
    $('#attackModule_'+S.Weapon1).addClass('attackBoxActive');
    if(S.Weapon2 !==false)
        $('#attackModule_'+S.Weapon2).addClass('attackBoxActive');
}
GAMEobject.prototype.shipFunc_showSpotRegions = function(show){
    if(show==true){
        for(var o in this.Enemies)
            this.showEnemySpotRegion(o);
    } else {
        //  for(var o in this.Enemies){
        //      $('#O_'+o+' .spotRegion').remove();
        //  }
    }
}
GAMEobject.prototype.shipFunc_showHealth = function(){
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

GAMEobject.prototype.showEnemySpotRegion = function(o){
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
}
