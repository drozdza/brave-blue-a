
GAMEobject.prototype.makeShipControlPanel = function(){
    var O = this.O[0];
    var Sx = this.SHIPold;
    var html='',modeName;
    O.speedM = Energy2Speed(O.EnergyM,O.Weight,O.engineMultiply);
    if(O.maxSpeedCap !== false && O.speedM > O.maxSpeedCap) O.speedM = O.maxSpeedCap;

    Sx.speed = -17;
    html+='<div class="speedBox" id="speedOmeterBox"></div>';
    this.shipFunc_speedChange();

    if(O.ShowFireRange==false) $('#bullRadX').remove();

    var letter,modHtml='';

    Sx.Mod={};
    for(var m in O.Modules){
        html=modHtml+html;
        modHtml='';
        Sx.Mod[m]='disabled';
        letter='';
        for(var pimk in O.KeysModules)
            for(var pomk=0; pomk < O.KeysModules[pimk].length; ++pomk)
                if(m == O.KeysModules[pimk][pomk])
                    letter='<div class="letter">'+String.fromCharCode(pimk)+'</div>';

        if(O.Modules[m].subT) modeName = BBAdata['ModuleNames'][O.Modules[m].T+O.Modules[m].subT];
                else          modeName = BBAdata['ModuleNames'][O.Modules[m].T];

        modHtml+='<div class="cBox">'+letter+'<span id="moduleBox_'+m+'"><div class="energyBox min"><span class="smaller">Disabled</span><div class="infoBox">'+modeName+'</div></div></span></div>';

    }
    html ='<div class="cBox"><div class="energyBox energyCap_00" id="modulesEnergyOut">'+O.Energy.toFixed(2)+'</div></div>'+modHtml+html;

    html+='<div class="cBox"><div class="energyBox energyCap_00"><span id="modulesEnergyIn">'+O.Energy.toFixed(2)+'</span><div class="ammoBoxBox"><div class="ammoBoxes">';

    Sx.EnergyOut=-1;
    for(var fi in O.Weapons){
        html+='<div id="attackModule_'+fi+'" class="attackBox attack_'+O.Weapons[fi].T+'"><span></span><span></span><span></span><span></span><span></span><div class="attackBoxNum">'+(fi- -1)+'</div></div>';
    }

    Sx.Storage=[];
    for(var Stype in O.Storage){
        Sx.Storage[Stype]={R:0};
        if(Stype=='Ammo' || Stype=='Bomb' || Stype=='Missile')
            if(typeof O.Storage[Stype].Hidden == 'undefined')
                html+='<div class="ammoBox" id="'+Stype+'Storage"></div>';
    }

    html+='</div></div></div></div>';

    $('#countSpeed').html(html);
    this.shipFunc_speedChange();
    if(O.Weapon1!==false)
        this.shipFunc_changeWeapon(1, O.Weapon1);

}

GAMEobject.prototype.decide_ship = function(e){
    var O = this.O[0];
    var Sx = this.SHIPold;
    O.lastSpeedT = 0;
    this.mouseX = this.mouse_x- -(O.x -this.Dx/2);
    this.mouseY = this.mouse_y- -(O.y -this.Dy/2);
    var html='',modeName;


    // Start special move
    if(this.specialMoveT < 0 && this.specialMove > 0)
        if(O.SpecialMoves && O.SpecialMoves[ this.specialMove ]){
            var SpecMove = O.SpecialMoves[ this.specialMove ];
            var goOn = true;
            if(SpecMove.ModUse) for(var useU in SpecMove.ModUse) if(O.ModStorage[useU].R < SpecMove.ModUse[useU]) goOn = false;
            if(goOn){
                this.specialMoveT = SpecMove.Dec-1;
                if(SpecMove.ModUse) for(var useU in SpecMove.ModUse) O.ModStorage[useU].R -= SpecMove.ModUse[useU];
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
            if(O.ChangeSpeedStops && O.ChangeSpeedStops.up)
                for(var stopX in O.ChangeSpeedStops.up){
                    if(oldSpeed < stopX && newSpeed >= stopX){
                        O.speed = stopX*1.0;
                        this.changeSpeedDelay = O.ChangeSpeedDelay;
                    }
                }
        }
        if(this.keyUpDown==-1 && --this.changeSpeedDelay < 0){
            var oldSpeed = O.speed;
            var newSpeed = O.speed-=O.speedDcl/this.Frames;
            if(O.ChangeSpeedStops && O.ChangeSpeedStops.up)
                for(var stopX in O.ChangeSpeedStops.down){
                    if(oldSpeed > stopX && newSpeed <= stopX){
                        O.speed = stopX*1.0;
                        this.changeSpeedDelay = O.ChangeSpeedDelay;
                    }
                }
        }
    }
    // Do special move
    if(this.specialMoveT > -1 && O.SpecialMoves[ this.specialMove ]){
        var oldX = O.x;
        var oldY = O.y;
        var SpecMove = O.SpecialMoves[ this.specialMove ];
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
        this.putOnXY(O, oldX, oldY);
    }

    if(O.speed != Sx.speed)
        this.shipFunc_speedChange();

    O.Energy = O.EnergyM - O.Espeed;

    var F1T = false;
    var F2T = false;
    if(O.Weapon1!==false) F1T = O.Weapons[O.Weapon1].T;
    if(O.Weapon2!==false) F2T = O.Weapons[O.Weapon2].T;


    var EsteemedPos = false;

    for(var m in O.Modules){
        var M = O.Modules[m];
        var modHtml='';

        // Moduły wyłączone:
        if(Sx.Mod[m] != 'disabled'){
            if(M.subT) modeName = BBAdata['ModuleNames'][M.T+M.subT];
                else   modeName = BBAdata['ModuleNames'][M.T];

            $('#moduleBox_'+m).html('<div class="energyBox min"><span class="smaller">Disabled</span><div class="infoBox">'+modeName+'</div></div>');
            Sx.Mod[m]='disabled';
            if(M.T=='spotRegion') this.shipFunc_showSpotRegions(false);
        }

        if(M.Disabled && M.T=='moduleProd') O.ModStorage[ M.ModStorage ].R=0;
        if(M.Disabled == 1)
            continue;

        // Moduły niepotrzebne:
        if( (M.T=='Prod' && O.Storage[ M.Storage ].R >= O.Storage[ M.Storage ].M)
         || (M.T=='healerProd' && O.lifeM <= O.life)
         || (M.T=='esteemProd' && (F1T=='missile' || F1T=='missileR' || F1T=='laser'))
         || (M.T=='shieldProd' && O.ShieldStorage[ M.ShieldStorage ].R >= O.ShieldStorage[ M.ShieldStorage ].M)){

            if(Sx.Mod[m] != 'done'){
                if(M.subT) modeName = BBAdata['ModuleNames'][M.T+M.subT];
                    else   modeName = BBAdata['ModuleNames'][M.T];
                $('#moduleBox_'+m).html('<div class="energyBox min">Done<div class="infoBox">'+modeName+'</div></div>');
                Sx.Mod[m]='done';
            }
            continue;
        }

        // Moduły bez energii:
        if(M.Emin > O.Energy){
            M.E=0;
            if(M.T=='moduleProd')
                O.ModStorage[M.ModStorage].R = 0;
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
            var modR = O.ModStorage[M.ModStorage].R;
            var modM = O.ModStorage[M.ModStorage].M;
        }
        // Moduły działające:
        if(M.T=='moduleProd' && modR == modM){
            if(Sx.Mod[m] != 'active'){
                modHtml+='<div class="energyBox active"><div class="active">active</div>'+M.Emin.toFixed(2)+'<div class="infoBox">';
                Sx.Mod[m] = 'active';
            }
            O.Energy-=M.Emin;
            M.E = M.Emin;
        }else{
            if(O.Energy < M.Emax){
                M.E = O.Energy;
                if(Sx.Mod[m] != O.Energy){
                    modHtml+='<div class="energyBox energyCap_'+((M.E-M.Emin)/(M.Emax-M.Emin)).toFixed(1)*10+'0">'+M.E.toFixed(2)+'<div class="infoBox">';
                    Sx.Mod[m] = O.Energy;
                }
                O.Energy=0;
            } else{
                M.E = M.Emax;
                if(Sx.Mod[m] != M.E){
                    modHtml+='<div class="cBox"><div class="energyBox max"><div class="max">max.</div>'+M.E.toFixed(2)+'<div class="infoBox">';
                    Sx.Mod[m] = M.E;
                    if(M.T=='spotRegion') this.shipFunc_showSpotRegions(true);
                }
                O.Energy-=M.Emax;
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
                modR = ++O.ModStorage[M.ModStorage].R;
            if(M.T=='Prod') ++O.Storage [ M.Storage ].R;
            if(M.T=='healerProd'){
                ++this.C.S_lifeHealed;
                this.healObj(0,1);
            }
            if(M.T=='shieldProd'){
                ++this.C.S_shieldProd;
                ++O.ShieldStorage[ M.ShieldStorage ].R;
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

        if(M.T=='esteemProd' && M.E==M.Emax && (F1T=='single' || F1T=='double' || F1T=='triple' || F1T=='rose' || F1T=='bomb'))
            EsteemedPos = this.shipFunc_esteemedPositions(O,O.Weapons[O.Weapon1]);

        if(modHtml != '')
            $('#moduleBox_'+m).html(modHtml);
    }

    if(Sx.EnergyOut != O.Energy){
        $('#modulesEnergyOut').html(O.Energy.toFixed(2));
        Sx.EnergyOut = O.Energy;
    }



    // ESTYMATORY
    if(O.GlueFireToLaser!=false && (F1T=='laser' || F2T=='laser'))
        this.shipFunc_glueFireToLaser();


    // !!!! TO FIX LATER
    // if(O.ShowAmmoIndicator){
    //     var useUse = true;
    //     if(F.Use)
    //         for(var useU in F.Use)
    //             if(O.Storage[ useU ].R < F.Use[useU])
    //                 useUse = false;
    //
    //
    //     if(useUse || ((F.T=='tele') && TeleMod!=false) || ((F.T=='laser') && LaserMod!=false))
    //         $('#gameOverlay').attr('class','cursorCross');
    //     else
    //         $('#gameOverlay').attr('class','cursorWait');
    // }

    if(F1T=='missile' || F1T=='missileR')
        this.shipFunc_glueFireToMissile(O.Weapons[O.Weapon1].AimRadius);
    if(F2T=='missile' || F2T=='missileR')
        this.shipFunc_glueFireToMissile(O.Weapons[O.Weapon2].AimRadius);

    if(F1T=='laser' || F2T=='laser'){
        var Angle = parseInt(- (Math.atan2(this.mouseX-O.x,this.mouseY-O.y)*180/Math.PI)- -360)%360;
        if(F1T=='laser') var LaserLenght = O.Weapons[O.Weapon1].Speed;
            else         var LaserLenght = O.Weapons[O.Weapon2].Speed;
        $('#gameboardMarkers').append('<div class="object laserAiming" style="height: '+LaserLenght+'px; top: '+(this.Dy/2)+'px; left: '+(this.Dx/2)+'px; transform: rotate('+Angle+'deg);"></div>');
    }


    if(O.GlueFireToEstimated!=false && EsteemedPos!=false)
        this.shipFunc_glueFireToEstimated(EsteemedPos);


    // STRZELAMY
    var aktywneDziala = {};
    if(O.Weapon1!==false && O.MouseDown1) aktywneDziala[ O.Weapon1 ]=1;
    if(O.Weapon2!==false && O.MouseDown2) aktywneDziala[ O.Weapon2 ]=1;
    for(var dzi in aktywneDziala) if(O.Weapons[ dzi ].gunS > O.Weapons[dzi].GunSpeed){

        var shotDone = false;
        var Weapon = O.Weapons[dzi];

        var enoughToUse = true
        if(Weapon.Use) for(var useU in Weapon.Use) if(O.Storage[ useU ].R < Weapon.Use[useU]) enoughToUse = false;
        if(Weapon.ModUse) for(var useU in Weapon.ModUse) if(O.ModStorage[ useU ].R < Weapon.ModUse[useU]) enoughToUse = false;
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
        if(Weapon.T=='missile' && this.missileAim!=false){
            this.shipShootMissile(this.missileAim,O.angle,Weapon.Speed,Weapon.Dec,Weapon.SpeedT,Weapon);
            shotDone = true;
        }
        if(Weapon.T=='missileR' && this.missileAim!=false){
            var Pe = [80,280,100,260,120,240,140,220,160,200,175,185];
            var Angle = parseInt(- (Math.atan2(this.mouseX-O.x,this.mouseY-O.y)*180/Math.PI)- -180)%360;

            for(var iki=0; iki<Weapon.AtOnce; ++iki)
                this.shipShootMissile(this.missileAim, (Angle- -Pe[iki])%360, (Weapon.Speed-parseInt(iki/2)*2),(Weapon.Dec- -parseInt(iki/2)*20),(Weapon.SpeedT-parseInt(iki/2)),Weapon);
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
            if(Weapon.Use) for(var useU in Weapon.Use) O.Storage[ useU ].R-=Weapon.Use[ useU ];
            if(Weapon.ModUse) for(var useU in Weapon.ModUse) O.ModStorage[ useU ].R-=Weapon.ModUse[ useU ];

            Weapon.gunU++;
            if(typeof Weapon.shotsToReload != 'undefined' && Weapon.gunU >= Weapon.shotsToReload){
                Weapon.gunU=0;
                Weapon.gunS = -Weapon.reloadTime;
            }
        }
    }

    for(var w in O.Weapons)
        O.Weapons[w].gunS++;


    for(var storU in O.Storage)
        if(O.Storage[storU].R > O.Storage[storU].M)
            O.Storage[storU].R = O.Storage[storU].M;
    O.ammo++;

    for(var storU in O.Storage)
        if(O.Storage[storU].R != Sx.Storage[storU].R){
            var letter = 'i';
            if(storU=='Bomb') letter = 'P';
            if(storU=='Missile') letter = 'Y';

            var A = O.Storage[storU].R;
            var B = O.Storage[storU].M - A;
            html='<span>';
            for(var x=0; x<A; ++x) html+=letter;
            html+='</span>';
            for(var x=0; x<B; ++x) html+=letter;
            $('#'+storU+'Storage').html(html);
            Sx.Storage[storU].R = O.Storage[storU].R;
        }

    this.checkShields(O,0);
}
