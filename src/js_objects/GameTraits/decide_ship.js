
GAMEobject.prototype.makeShipControlPanel = function(){
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

GAMEobject.prototype.decide_ship = function(e){
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
