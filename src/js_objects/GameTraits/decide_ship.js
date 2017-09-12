
GAMEobject.prototype.makeShipControlPanel = function(){
    var O = this.O[0];
    var S = this.SHIP;
    var Sx = this.SHIPold;
    var html='',modeName;
    S.speedM = Energy2Speed(S.EnergyM,S.Weight,S.engineMultiply);
    if(S.maxSpeedCap !== false && S.speedM > S.maxSpeedCap) S.speedM = S.maxSpeedCap;

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

        if(S.Modules[m].subT) modeName = BBAdata['ModuleNames'][S.Modules[m].T+S.Modules[m].subT];
                else          modeName = BBAdata['ModuleNames'][S.Modules[m].T];

        modHtml+='<div class="cBox">'+letter+'<span id="moduleBox_'+m+'"><div class="energyBox min"><span class="smaller">Disabled</span><div class="infoBox">'+modeName+'</div></div></span></div>';

    }
    html ='<div class="cBox"><div class="energyBox energyCap_00" id="modulesEnergyOut">'+S.Energy.toFixed(2)+'</div></div>'+modHtml+html;

    html+='<div class="cBox"><div class="energyBox energyCap_00"><span id="modulesEnergyIn">'+S.Energy.toFixed(2)+'</span><div class="ammoBoxBox"><div class="ammoBoxes">';

    Sx.EnergyOut=-1;
    for(var fi in S.Weapons){
        html+='<div id="attackModule_'+fi+'" class="attackBox attack_'+S.Weapons[fi].T+'"><span></span><span></span><span></span><span></span><span></span><div class="attackBoxNum">'+(fi- -1)+'</div></div>';
    }

    Sx.Storage=[];
    for(var Stype in S.Storage){
        Sx.Storage[Stype]={R:0};
        if(Stype=='Ammo' || Stype=='Bomb' || Stype=='Missile')
            if(typeof S.Storage[Stype].Hidden == 'undefined')
                html+='<div class="ammoBox" id="'+Stype+'Storage"></div>';
    }

    html+='</div></div></div></div>';

    $('#countSpeed').html(html);
    this.shipFunc_speedChange();
    if(S.Weapon1!==false)
        this.shipFunc_changeWeapon(1, S.Weapon1);

}

GAMEobject.prototype.decide_ship = function(e){
    var O = this.O[0];
    var S = this.SHIP;
    var Sx = this.SHIPold;
    O.lastSpeedT = 0;
    this.mouseX = this.mouse_x- -(O.x -this.Dx/2);
    this.mouseY = this.mouse_y- -(O.y -this.Dy/2);
    var html='',modeName;


    // Start special move
    if(this.specialMoveT < 0 && this.specialMove > 0)
        if(S.SpecialMoves && S.SpecialMoves[ this.specialMove ]){
            var SpecMove = S.SpecialMoves[ this.specialMove ];
            var goOn = true;
            if(SpecMove.ModUse) for(var useU in SpecMove.ModUse) if(S.ModStorage[useU].R < SpecMove.ModUse[useU]) goOn = false;
            if(goOn){
                this.specialMoveT = SpecMove.Dec-1;
                if(SpecMove.ModUse) for(var useU in SpecMove.ModUse) S.ModStorage[useU].R -= SpecMove.ModUse[useU];
            } else {
                this.specialMove = -1;
            }
        }

    if(this.specialMoveT < 0){
        if(this.keyLeftRight==1){  O.angle=(O.angle- -360 -O.speedT)%360;    O.lastSpeedT =-O.speedT; }
        if(this.keyLeftRight==-1){ O.angle=(O.angle- -360- -O.speedT)%360;    O.lastSpeedT = O.speedT; }
        if(this.keyUpDown==1 && --this.changeSpeedDelay < 0){
            var oldSpeed = O.speed;
            var newSpeed = O.speed-=-O.speedAcl/this.Frames;
            if(S.ChangeSpeedStops && S.ChangeSpeedStops.up)
                for(var stopX in S.ChangeSpeedStops.up){
                    if(oldSpeed < stopX && newSpeed >= stopX){
                        O.speed = stopX*1.0;
                        this.changeSpeedDelay = S.ChangeSpeedDelay;
                    }
                }
        }
        if(this.keyUpDown==-1 && --this.changeSpeedDelay < 0){
            var oldSpeed = O.speed;
            var newSpeed = O.speed-=O.speedDcl/this.Frames;
            if(S.ChangeSpeedStops && S.ChangeSpeedStops.up)
                for(var stopX in S.ChangeSpeedStops.down){
                    if(oldSpeed > stopX && newSpeed <= stopX){
                        O.speed = stopX*1.0;
                        this.changeSpeedDelay = S.ChangeSpeedDelay;
                    }
                }
        }
    }
    // Do special move
    if(this.specialMoveT > -1 && S.SpecialMoves[ this.specialMove ]){
        var oldX = O.x;
        var oldY = O.y;
        var SpecMove = S.SpecialMoves[ this.specialMove ];
        if(SpecMove.T=='changeSpeed')
            O.speed-=-SpecMove.speedBy;
        if(SpecMove.T=='changeAngle'){
            O.angle = (O.angle - -SpecMove.angleBy- -360)%360;
            var angleU = -90;
            if(SpecMove.angleBy > 0) angleU = 90;
            var aniX = O.x- -15*Math.sin(parseInt(-O.angle-angleU)*(Math.PI/180));
            var aniY = O.y- -15*Math.cos(parseInt(-O.angle-angleU)*(Math.PI/180));
            this.putObj_animation('accelerationFire', aniX, aniY, O.angle- -angleU);
        }
        if(SpecMove.T=='changePosition'){
            this.putObj_animation('shipShadow', O.x, O.y, O.angle);
            for(var i=0; i<SpecMove.timesBy; ++i){
                O.x-=- SpecMove.Dist*Math.sin(parseInt(-O.angle- -SpecMove.Angle)*(Math.PI/180));
                O.y-=- SpecMove.Dist*Math.cos(parseInt(-O.angle- -SpecMove.Angle)*(Math.PI/180));
                this.checkShipHits();
                this.putObj_animation('shipShadow', O.x, O.y, O.angle);
                if(this.specialMoveT < 0) break;
            }
        }
        if(SpecMove.T=='changeAll'){
            if(SpecMove.changeBy)
                O.speed-=-SpecMove.speedBy;

            if(SpecMove.angleBy)
                O.angle = (O.angle - -SpecMove.angleBy- -360)%360;

            if(SpecMove.timesBy){
                this.putObj_animation('shipShadow', O.x, O.y, O.angle);
                for(var i=0; i<SpecMove.timesBy; ++i){
                    O.x-=- SpecMove.Dist*Math.sin(parseInt(-O.angle- -SpecMove.Angle)*(Math.PI/180));
                    O.y-=- SpecMove.Dist*Math.cos(parseInt(-O.angle- -SpecMove.Angle)*(Math.PI/180));
                    this.checkShipHits();
                    this.putObj_animation('shipShadow', O.x, O.y, O.angle);
                    if(this.specialMoveT < 0) break;
                }
            }
        }
        if(SpecMove.T=='teleportTo'){
            var Angle = (O.angle - -SpecMove.Angle- -360)%360;
            if(SpecMove.AngleRand)
                Angle -=- parseInt(Math.random()*SpecMove.AngleRand);
            this.teleportJump(0,SpecMove.Dist,Angle);
        }

        if(--this.specialMoveT < 0) this.specialMove = -1;
        this.putOnXY(0, oldX, oldY);
    }

    if(O.speed != Sx.speed)
        this.shipFunc_speedChange();

    S.Energy = S.EnergyM - S.Espeed;

    var EsteemedPos = false;

    for(var m in S.Modules){
        var M = S.Modules[m];
        var modHtml='';

        // Moduły wyłączone:
        if(Sx.Mod[m] != 'disabled'){
            if(M.subT) modeName = BBAdata['ModuleNames'][M.T+M.subT];
                else   modeName = BBAdata['ModuleNames'][M.T];

            $('#moduleBox_'+m).html('<div class="energyBox min"><span class="smaller">Disabled</span><div class="infoBox">'+modeName+'</div></div>');
            Sx.Mod[m]='disabled';
            if(M.T=='spotRegion') this.shipFunc_showSpotRegions(false);
        }

        if(M.Disabled && M.T=='moduleProd') S.ModStorage[ M.ModStorage ].R=0;
        if(M.Disabled == 1)
            continue;

        // Moduły niepotrzebne:
        if( (M.T=='Prod' && S.Storage[ M.Storage ].R >= S.Storage[ M.Storage ].M)
         || (M.T=='healerProd' && S.lifeM <= O.life)
         || (M.T=='esteemProd' && (F.T=='missle' || F.T=='missleR' || F.T=='laser'))
         || (M.T=='shieldProd' && S.EnergyFieldMax <= O.energyField) ){
            if(Sx.Mod[m] != 'done'){
                if(M.subT) modeName = BBAdata['ModuleNames'][M.T+M.subT];
                    else   modeName = BBAdata['ModuleNames'][M.T];
                $('#moduleBox_'+m).html('<div class="energyBox min">Done<div class="infoBox">'+modeName+'</div></div>');
                Sx.Mod[m]='done';
            }
            continue;
        }

        // Moduły bez energii:
        if(M.Emin > S.Energy){
            M.E=0;
            if(M.T=='moduleProd')
                S.ModStorage[M.ModStorage].R = 0;
            if(M.T=='teleProd') M.TeleLoad = 0;
            if(Sx.Mod[m] != 0){
                if(M.subT) modeName = BBAdata['ModuleNames'][M.T+M.subT];
                    else   modeName = BBAdata['ModuleNames'][M.T];
                $('#moduleBox_'+m).html('<div class="energyBox min"><div class="min">min.</div>'+M.Emin.toFixed(2)+'<div class="infoBox">'+modeName+'</div></div>');
                Sx.Mod[m]=0;
                if(M.T=='spotRegion') this.shipFunc_showSpotRegions(false);
            }
            continue;
        }
        if(M.T=='moduleProd'){
            var modR = S.ModStorage[M.ModStorage].R;
            var modM = S.ModStorage[M.ModStorage].M;
        }
        // Moduły działające:
        if(M.T=='moduleProd' && modR == modM){
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
        if(modHtml!=''){
            if(M.subT) modeName = BBAdata['ModuleNames'][M.T+M.subT];
                else   modeName = BBAdata['ModuleNames'][M.T];
            modHtml+='<div class="titleBox">'+modeName+'</div>';
        }

        M.Prod-=-M.E;
        if(M.Prod > M.ifProd){
            if(M.T=='moduleProd' && modR < modM)
                modR = ++S.ModStorage[M.ModStorage].R;
            if(M.T=='Prod') ++S.Storage [ M.Storage ].R;
            if(M.T=='healerProd'){
                ++this.C.S_lifeHealed;
                this.healObj(0,1);
            }
            if(M.T=='shieldProd'){
                ++this.C.S_shieldProd;
                if(++O.energyField == 1)
                    $('#O_0').prepend('<div class="energyField"></div>');
                this.shipFunc_showHealth();
            }
            M.Prod-=M.ifProd;
            if(M.T=='moduleProd' && modR < modM)
                M.Prod=0;
        }

        if(M.T!='esteemProd' && M.T!='spotRegion' && M.T!='radar' && !(M.T=='moduleProd' && modR == modM)){
            if(30/(M.ifProd/M.E) > 1){
                if(modHtml != '') modHtml+=(30/(M.ifProd/M.E)).toFixed(2)+'/sec';
            }else{
                modHtml+='<div class="progresBar"><div class="progresBarOBar green" style="width: '+parseInt((M.Prod/M.ifProd)*100)+'px;"></div><div class="info">'+(((M.ifProd-M.Prod)/M.E)/30).toFixed(2)+'sec</div></div>';
                Sx.Mod[m]=-23;
            }
        }
        if(M.T=='radar')
            if(modHtml!='') modHtml+=((M.ifProd/M.E)/30).toFixed(2)+'sec';
        if(M.T=='moduleProd' && modR == modM)
            if(modHtml!='') modHtml+='READY';


        if(M.T=='moduleProd'){
            var letter = false;
            if(M.ModStorage == 'Laser') letter = 'L';
            if(M.ModStorage == 'Moves') letter = 'v';
            if(M.ModStorage == 'TeleJump') letter = 'T';
            if(letter){
                modHtml+='<div class="laserBoxBox"><div class="laserBox"><span>';
                for(var x=0; x<modR; ++x) modHtml+=letter;
                modHtml+='</span>';
                for(var x=0; x<modM - modR; ++x) modHtml+=letter;
                modHtml+='</div></div>';
            }
        }

        if(M.T=='radar')
            this.shipFunc_workingRadar(M.E, (M.Prod/M.ifProd)*360, M.Radius);

        if(M.T=='esteemProd' && M.E==M.Emax && (F.T=='single' || F.T=='double' || F.T=='rose' || F.T=='bomb'))
            EsteemedPos = this.shipFunc_esteemedPositions(O,F);

        if(modHtml != '')
            $('#moduleBox_'+m).html(modHtml);
    }

    if(Sx.EnergyOut != S.Energy){
        $('#modulesEnergyOut').html(S.Energy.toFixed(2));
        Sx.EnergyOut = S.Energy;
    }


    F1T = false;
    F2T = false;
    if(S.Weapon1!==false) F1T = S.Weapons[S.Weapon1].T;
    if(S.Weapon2!==false) F2T = S.Weapons[S.Weapon2].T;


    // ESTYMATORY
    // !!!! TO FIX LATER
    if(S.GlueFireToLaser!=false && (F1T=='laser' || F2T=='laser'))
        this.shipFunc_glueFireToLaser();



    // !!!! TO FIX LATER
    // if(S.ShowAmmoIndicator){
    //     var useUse = true;
    //     if(F.Use)
    //         for(var useU in F.Use)
    //             if(S.Storage[ useU ].R < F.Use[useU])
    //                 useUse = false;
    //
    //
    //     if(useUse || ((F.T=='tele') && TeleMod!=false) || ((F.T=='laser') && LaserMod!=false))
    //         $('#gameOverlay').attr('class','cursorCross');
    //     else
    //         $('#gameOverlay').attr('class','cursorWait');
    // }

    if(F1T=='missle' || F1T=='missleR')
        this.shipFunc_glueFireToMissle(S.Weapons[S.Weapon1].AimRadius);
    if(F2T=='missle' || F2T=='missleR')
        this.shipFunc_glueFireToMissle(S.Weapons[S.Weapon2].AimRadius);

    // !!!! TO FIX LATER
    if(F1T=='laser' || F2T=='laser'){
        var Angle = parseInt(- (Math.atan2(this.mouseX-O.x,this.mouseY-O.y)*180/Math.PI)- -360)%360;
        if(F1T=='laser') var LaserLenght = S.Weapons[S.Weapon1].Speed;
            else         var LaserLenght = S.Weapons[S.Weapon2].Speed;
        $('#gameboardMarkers').append('<div class="object laserAiming" style="height: '+LaserLenght+'px; top: '+(this.Dy/2)+'px; left: '+(this.Dx/2)+'px; transform: rotate('+Angle+'deg);"></div>');
    }


    if(S.GlueFireToEstimated!=false && EsteemedPos!=false)
        this.shipFunc_glueFireToEstimated(EsteemedPos);


    // STRZELAMY
    var aktywneDziala = {};
    if(S.Weapon1!==false && S.MouseDown1) aktywneDziala[ S.Weapon1 ]=1;
    if(S.Weapon2!==false && S.MouseDown2) aktywneDziala[ S.Weapon2 ]=1;
    for(var dzi in aktywneDziala) if(S.Weapons[ dzi ].gunS > S.Weapons[dzi].GunSpeed){

        var shotDone = false;
        var Weapon = S.Weapons[dzi];

        var enoughToUse = true
        if(Weapon.Use) for(var useU in Weapon.Use) if(S.Storage[ useU ].R < Weapon.Use[useU]) enoughToUse = false;
        if(Weapon.ModUse) for(var useU in Weapon.ModUse) if(S.ModStorage[ useU ].R < Weapon.ModUse[useU]) enoughToUse = false;
        if(!enoughToUse) continue;

        if(Weapon.T=='single'){
            this.shipShoot(0, Weapon.Speed, Weapon.Dec, Weapon.DMG);
            shotDone = true;
        }
        if(Weapon.T=='double'){
            this.shipShootOnSide(-90, 5, Weapon.Speed, Weapon.Dec, Weapon.DMG);
            this.shipShootOnSide(90, 5, Weapon.Speed, Weapon.Dec, Weapon.DMG);
            shotDone = true;
        }
        if(Weapon.T=='triple'){
            this.shipShootOnSide(-90, 5, Weapon.Speed, Weapon.Dec, Weapon.DMG);
            this.shipShootOnSide(0, 5, Weapon.Speed, Weapon.Dec, Weapon.DMG);
            this.shipShootOnSide(90, 5, Weapon.Speed, Weapon.Dec, Weapon.DMG);
            shotDone = true;
        }
        if(Weapon.T=='rose'){
            for(var i = -parseInt(Weapon.AtOnce/2); i<= parseInt(Weapon.AtOnce/2); ++i)
                this.shipShoot(i*Weapon.RoseAngle, Weapon.Speed, Weapon.Dec, Weapon.DMG);
            shotDone = true;
        }
        if(Weapon.T=='missle' && this.missleAim!=false){
            this.shipShootMissle(this.missleAim,O.angle,Weapon.Speed,Weapon.Dec,Weapon.SpeedT,Weapon);
            shotDone = true;
        }
        if(Weapon.T=='missleR' && this.missleAim!=false){
            var Pe = [80,280,100,260,120,240,140,220,160,200,175,185];
            var Angle = parseInt(- (Math.atan2(this.mouseX-O.x,this.mouseY-O.y)*180/Math.PI)- -180)%360;

            for(var iki=0; iki<Weapon.AtOnce; ++iki)
                this.shipShootMissle(this.missleAim, (Angle- -Pe[iki])%360, (Weapon.Speed-parseInt(iki/2)*2),(Weapon.Dec- -parseInt(iki/2)*20),(Weapon.SpeedT-parseInt(iki/2)),Weapon);
            shotDone = true;
        }
        if(Weapon.T=='bomb'){
            var mouseDist = Math.sqrt();
            var teleportData = false;
            if(typeof Weapon.Teleport !='undefined') teleportData = Weapon.Teleport;

            this.shipShootBomb(Weapon.Speed,Weapon.Dec,Weapon,teleportData);
            shotDone = true;
        }
        if(Weapon.T=='bombT'){
            this.shipTeleportBomb(Weapon.Distance,Weapon.offTime,Weapon);
            shotDone = true;
        }
        if(Weapon.T=='bombD'){
            this.shipShootDistanceBomb(Weapon.Speed,Weapon.Dec,Weapon.offTime,Weapon);
            shotDone = true;
        }
        if(Weapon.T=='laser'){
            this.shipShootLaser(Weapon.Speed,Weapon.DMG);
            shotDone = true;
        }
        if(Weapon.T=='tele'){
            if(this.shipFunc_teleport(Weapon))
                shotDone = true;
        }

        if(shotDone){
            Weapon.gunS=0;
            if(Weapon.Use) for(var useU in Weapon.Use) S.Storage[ useU ].R-=Weapon.Use[ useU ];
            if(Weapon.ModUse) for(var useU in Weapon.ModUse) S.ModStorage[ useU ].R-=Weapon.ModUse[ useU ];

            Weapon.gunU++;
            if(typeof Weapon.shotsToReload != 'undefined' && Weapon.gunU >= Weapon.shotsToReload){
                Weapon.gunU=0;
                Weapon.gunS = -Weapon.reloadTime;
            }
        }
    }

    for(var w in S.Weapons)
        S.Weapons[w].gunS++;


    for(var storU in S.Storage)
        if(S.Storage[storU].R > S.Storage[storU].M)
            S.Storage[storU].R = S.Storage[storU].M;
    O.ammo++;

    for(var storU in S.Storage)
        if(S.Storage[storU].R != Sx.Storage[storU].R){
            var letter = 'i';
            if(storU=='Bomb') letter = 'P';
            if(storU=='Missile') letter = 'Y';

            var A = S.Storage[storU].R;
            var B = S.Storage[storU].M - A;
            html='<span>';
            for(var x=0; x<A; ++x) html+=letter;
            html+='</span>';
            for(var x=0; x<B; ++x) html+=letter;
            $('#'+storU+'Storage').html(html);
            Sx.Storage[storU].R = S.Storage[storU].R;
        }
}
