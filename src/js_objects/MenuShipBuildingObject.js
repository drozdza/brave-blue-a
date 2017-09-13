function MenuShipBuildingObject(){

    this.activeElementsType = 'hull';
    this.SHIPelems = {};
    this.SHIP = false; // Current Ship

    this.width = 100;
    this.height = 100;

    this.lastWeapon = false;
    this.lastModule = false;


    // DEPRECATED
    this.money = 999000;
    // DEPRECATED
    this.useShipyardShip = false; // to drop later

    // DEPRECATED
    this.activeElement = '';
    // DEPRECATED
    this.sliderMouseMovement = false;


    // =================== Inicjalization ======================================
    this.startAnimation = function(){
        this.resize();
        this.useShipyardShip = true;
    }
    this.stopAnimation = function(){}

    this.resize = function(){
        this.width = $(window).width();
        this.height = $(window).height();

        $('#shipyardContainer')
            .attr({width: this.width+'px',height: this.height+'px'})
            .css( {width: this.width+'px',height: this.height+'px'});
    }

    this.makeMenuShip = function(){
        this.resize();

        this.SHIPelems = {};
        for(var e in BBAdata.SHIPelements)
            this.SHIPelems[e] = {Active:false, Copies:{}};

        var html ='';
        html += '<div id="GoToStarMap">StarMap</div>';
        html += '<div class="shipProperties"></div>';
        html += '<div class="shipAssembly">';
            html += '<div class="elementsTypeMenu"></div>';
            html += '<div class="shipPartChooser"></div>';
            html += '<div class="shipAssemblyView"></div>';
            html += '<div class="shipPartEditor"></div>';
        html += '</div>';
        $('#shipyardContainer').html(html);

        this.buildShip();
        this.showElementsTypeMenu();
        this.showShipElementsList();


        $(window).on('resize', function(){ MENU.SB.resize(); });
        $('#GoToStarMap').click(function(){ MENU.startStarMapMenu(); });
    }

    // ==================== ASSEMBLY UPPER MENU ================================

    this.showElementsTypeMenu = function(){
        var TypeMenu = {
            hull:    'Hull',
            energy:  'Energy',
            engine:  'Engine',
            weapons: 'Weapons',
            modules: 'Modules',
        };
        var html = '';
        for(var tm in TypeMenu){
            html +='<div class="typeMenuElement" typeMenuElement="'+tm+'">'+TypeMenu[tm]+'</div>';
        }
        $('.elementsTypeMenu').html(html);
        $('.typeMenuElement').click(function(){ MENU.SB.changeElementsType( $(this).attr('typeMenuElement') ); });
    }

    this.changeElementsType = function(activeElementsType){
        this.activeElementsType = activeElementsType;
        this.toggleShipElementsList();
    }

    // =================== SHOW SHIP PROPERTIES ================================
    // DEPRECATED
    this.showShipProperties = function(){
        var html='';

        html += '<div class="goldTotal">';
            html +=' '+(MENU.CM.goldTotal - this.SHIP.Price);
            html +='<span class="goldTotal">'+MENU.CM.goldTotal+'</span>';
        html +='</div>';
        html +='<div class="basicProperties">';
            html += '<span>Price:  '+this.SHIP.Price+'</span>';
            html += '<span>Weight: '+this.SHIP.Weight+'</span>';
            html += '<span>Life:   '+this.SHIP.lifeM+'</span>';
            html += '<span>Energy: '+this.SHIP.EnergyM+'</span>';
            html += '<span>Speed:  '+this.SHIP.speedM.toFixed(1)+'</span>';
        html += '</div>';

        $('.shipProperties').html(html);
        this.showDetailedShipProperties();
        this.showDetailedShipStorage();
    }
    // DEPRECATED
    this.showDetailedShipProperties = function(){
        var html='';

        for(var i in this.SHIP){
            html+='<tr><td>'+i+'</td><td>';
            if(typeof this.SHIP[i] === 'object'){
                html+='<table>';
                    for(var j in this.SHIP[i]){
                        html+='<tr><td>'+j+'</td><td>';
                        if(typeof this.SHIP[i][j] === 'object'){
                            html+='<table>';
                                for(var k in this.SHIP[i][j]){
                                    html+='<tr><td>'+k+'</td><td>';
                                    if(typeof this.SHIP[i][j][k] === 'object'){
                                        html+='<table>';
                                            for(var l in this.SHIP[i][j][k]){
                                                html+='<tr><td>'+l+'</td><td>';
                                                html+=this.SHIP[i][j][k][l];
                                                html+='</td></tr>';
                                            }
                                        html+='</table>';
                                    }else{
                                        html+=this.SHIP[i][j][k];
                                    }
                                    html+='</td></tr>';
                                }
                            html+='</table>';
                        }else{
                            html+=this.SHIP[i][j];
                        }
                        html+='</td></tr>';
                    }
                html+='</table>';
            }else{
                html+=this.SHIP[i];
            }
            html+='</td></tr>';
        }


        // html += '<tr><td>EnginePower:</td><td>'+this.SHIP.engineMultiply+'</td></tr>';
        //
        $('.detailedShipProperties').html('<table>'+html+'</table>');
    }
    // DEPRECATED
    this.showDetailedShipStorage = function(){
        var html='';

        html += '<tr><td colspan="3">Storage</td></tr>';
        html += '<tr><td>Type</td><td>Max.</td><td>Start</td></tr>';
        for(var i in this.SHIP.Storage)
            html += '<tr><td>'+i+'</td><td>'+this.SHIP.Storage[i].M+'</td><td>'+this.SHIP.Storage[i].R+'</td></tr>';

        $('.detailedShipProperties').append('<table>'+html+'</table>');

    }


    // =============== SHIP ELEMENTS PROPERTIES LIST ===========================
    // DEPRECATED
    this.showShipElementsPropertiesList = function(){
        var html = '';
        for(var e in BBAdata.SHIPelements){
            var E = BBAdata.SHIPelements[e];
            if(typeof E.upgrade === 'undefined'){
                html += this.showShipElementProperties(E,e);
            }
        }

        $('.shipElements .container').html(html);
    }
    // DEPRECATED
    this.showShipElementProperties_refresh = function(e){
        var E = BBAdata.SHIPelements[e];
        if(typeof E.upgrade === 'undefined'){
            $('.shipElementProp[elementName="'+e+'"]').replaceWith( this.showShipElementProperties(E,e) );
        }else{
            this.showShipElementProperties_refresh(E.upgrade);
        }
    }
    // DEPRECATED
    this.showShipElementProperties = function(E,e){
        var html = '';

        html+='<div class="shipElementProp" elementName="'+e+'"';
            if(!this.SHIPelems[e].S) html+=' style="display: none;"';
        html+='>';
            html+=e;

            if(typeof E.ModSet != 'undefined')
                for(var ms in E.ModSet){
                    if(ms =='EminMax') html+=this.showShipElement_EminMax(E,e);
                }

            var elementData = this.getElementWithUpgrades(e);
            html += this.showDetailedElementData(elementData);

        html+='</div>';

        return html;
    }
    // DEPRECATED
    this.getElementWithUpgrades = function(e){
        var X = mergeObjects({}, BBAdata.SHIPelements[e]);
        for(var u in this.SHIPelems){
            if(this.SHIPelems[u].S !== true) continue;
            var E = BBAdata.SHIPelements[u];
            if(typeof E.upgrade !== 'undefined' && E.upgrade === e){
                X = mergeObjects(X, E);
            }
        }
        return X;
    }
    // DEPRECATED
    this.showDetailedElementData = function(D){
        var html = '';

        if(D.Price   && D.Price != 0)   html+='<span class="Price">'+D.Price.toLocaleString()+'</span>';
        if(D.Weight  && D.Weight != 0)  html+='<span class="Weight">'+D.Weight+'</span>';
        if(D.EnergyM && D.EnergyM != 0) html+='<span class="Energy">'+(D.EnergyM>0?'+':'')+D.EnergyM+'</span>';
        if(D.lifeM   && D.lifeM != 0)   html+='<span class="Life">'+(D.lifeM>0?'+':'')+D.lifeM+'</span>';


        if(D.WeaponData)
            for(var w in D.WeaponData){
                var W = D.WeaponData[w];
                html+='<br/>'+w+'<br/>';
                html+='<div class="WeaponArea">';

                if(w=='single' || w=='double' || w=='rose'){
                    html += '<div class="projectileData">';
                    html += '<legend>Bullet</legend>';
                    html += '<label>speed:</label> '+W.Speed*30+' m/s';
                    html += '<label>lifetime:</label> '+(W.Dec/30).toFixed(3)+' s';
                    html += '<label>range:</label> '+W.Speed*W.Dec+' m';
                    html += '<label>DMG:</label> <span class="weaponDMG">'+W.DMG.Dmg+' '+W.DMG.T+'</span>';
                    html += '</div>';
                }

                if(W.GunSpeed){
                    html +='FireSpeed: '+(W.GunSpeed/30).toFixed(3)+'s ';
                    if (W.GunSpeed < 30) html+='&nbsp; ( '+(30/W.GunSpeed).toFixed(1)+' per second )';
                    html +='<br/>';
                }
                if(W.AtOnce) html +='Shoot at once: '+W.AtOnce+' bullets<br/>';
                if(W.RoseAngle) html +='Angle betwen bullets: '+W.RoseAngle+' deg<br/>';

                if(W.Use){
                    html +='Use:';
                    for(var u in W.Use) html +=' '+u+': '+W.Use[u]+',';
                    html = html.substring(0,html.length-1);
                    html +='<br/>';
                }

                if(W.ShowFireRange) html +='+ Fire Range Indicator visible<br/>';
                if(W.EstimateShootRad) html +='+ Aiming Module Pluged<br/>';


                html+='</div>';

            }


        return html;
    }
    // DEPRECATED
    this.showShipElement_EminMax = function(E,e){
        var html='';

        var Edata = BBAdata.SHIPelements[e].ModData;
        var Emin = Edata.Emin;
        var Emax = Edata.Emax;

        html +='<div class="EminMax" elementName="'+e+'">';
            html +='<div class="EminMaxTitle">Module Energy Input</div>';
            html +='<div class="EminProp">';
                html +='<div class="minEmin">'+Emin.min+'</div>';
                html +='<div class="actualEmin">'+Emin.min+'</div>';
                html +='<div class="maxEmin">'+Emin.max+'</div>';
            html +='</div>';
            html +='<div class="EminMaxSliderBackground">';
                html +='<div class="EminMaxSlider">';
                    html +='<div class="activeSliderPart"></div>';
                    html +='<div class="sliderMinAchnor"></div>';
                    html +='<div class="sliderMaxAchnor"></div>';
                html +='</div>';
            html +='</div>';
            html +='<div class="EmaxProp">';
                html +='<div class="minEmax">'+Emax.min+'</div>';
                html +='<div class="actualEmax">'+Emax.max+'</div>';
                html +='<div class="maxEmax">'+Emax.max+'</div>';
            html +='</div>';
        html +='</div>';

        return html;
    }
    // ======================= SHIP ELEMENTS LIST ==============================
    this.showShipElementsList = function(){
        var html='';
        for(var e in BBAdata.SHIPelements){
            var E = BBAdata.SHIPelements[e];
            if(typeof E.where != 'undefined')
                html += this.showShipElement(E,e);
        }

        $('.shipPartChooser').html(html);

        this.addToggleElementsActions();

        this.toggleShipElementsList();
    }

    this.showShipElement = function(E,e){
        var html = '';
        html+='<div class="shipElement" elementName="'+e+'">';
        html+='<div class="shipElement_buy" elementName="'+e+'">';
        if(typeof E.name != 'undefined') html+=E.name;
                    else                 html+=e;
        html+='</div>';

        html+='<div class="shipElement_addAll" elementName="'+e+'">Add All</div>';
        html+='<div class="shipElement_show" elementName="'+e+'">Show</div>';
        html+='</div>';
        return html;
    }

    this.addToggleElementsActions = function(){
        $('#shipyardContainer')
            .on('click','.shipElement_buy',function(){
                var elementName = $(this).attr('elementName');
                console.log('Ship Element: ', elementName);
                MENU.SB.toggleShipElement(elementName);
                MENU.SB.showPartEditor(elementName);
            })
            .on('click','.shipElement_addAll',function(){
                var elementName = $(this).attr('elementName');
                MENU.SB.addAllShipElement(elementName);
                MENU.SB.showPartEditor(elementName);
            })
            .on('click', '.shipElement_show', function(){
                var elementName = $(this).attr('elementName');
                $('.shipElement').removeClass('viewing');
                $('.shipElement[elementName="'+elementName+'"]').addClass('viewing');
                MENU.SB.showPartEditor(elementName);
            })
            .on('click', '.toggleElementPart', function(){
                var elementName    = $(this).attr('elementName');
                var elementCopy    = $(this).attr('elementCopy');
                var elementUpgrade = $(this).attr('elementUpgrade');
                MENU.SB.toggleShipElementPart(elementName, elementCopy, elementUpgrade);
            });

    }

    this.toggleShipElementsList = function(){
        $('.shipElement').hide();
        for(var e in BBAdata.SHIPelements){
            var E = BBAdata.SHIPelements[e];
            if(typeof E.where !='undefined' && E.where == this.activeElementsType)
                $('.shipElement[elementName="'+e+'"]').show();
        }
    }

    this.toggleShipElementsList_deprecated = function(){
        $('.shipElement').hide().removeClass('disabled');
        $('.shipElementProp').hide();

        var goldLeft = MENU.CM.goldTotal - this.SHIP.Price;
        for(var e in BBAdata.SHIPelements){
            var E = BBAdata.SHIPelements[e];
            var show = true;
            var disable = false;

            if(typeof E.where !='undefined' && E.where != this.activeElementsType)
                show = false;

            if(typeof E.upgrade !='undefined' && this.SHIPelems[ E.upgrade ].S === false)
                disable = true;

            if(typeof E.exclude !='undefined')
                for(var x in E.exclude)
                    if(this.SHIPelems[ E.exclude[x] ].S !== false){
                        disable = true;
                        break;
                    }


            if(goldLeft < E.Price)
                disable = true;

            if(typeof E.EnergyM != 'undefined' && this.SHIP.EnergyM- -E.EnergyM < 0)
                disable = true;

            if(typeof E.campainFlags != 'undefined'){
                // require some quest flags
                // ...
                show = false;
            }

            if(show) $('.shipElement[elementName="'+e+'"]').show();
            if(disable) $('.shipElement[elementName="'+e+'"]:not(.bought)').addClass('disabled');

            if(E.where == this.activeElementsType && this.SHIPelems[ e].S === true)
                $('.shipElementProp[elementName="'+e+'"]').show();
        }

    }

    this.toggleShipElement = function(elementName){
        if(this.SHIPelems[elementName].Active === false){
            if(this.elementPossibleToAdd(elementName)){
                $('.shipElement[elementName="'+elementName+'"]').addClass('bought');
                var S = this.SHIPelems[elementName];
                S.Active = true;

                var anyParts = false;
                for(var sX in S.Copies) anyParts = true;
                if(!anyParts) S.Copies['I']={'_main':1};
            }
        }else{
            if(this.elementPossibleToRemove(elementName)){
                $('.shipElement[elementName="'+elementName+'"]').removeClass('bought');
                this.SHIPelems[elementName].Active = false;
            }
        }
        this.buildShip();
    }
    this.addAllShipElement = function(elementName){
        var S = this.SHIPelems[elementName];
        var SE = BBAdata.SHIPelements[elementName];

        S.Active = true;
        if(typeof SE.copies != 'undefined'){
            var Copies = SE.copies;
        }else{
            var Copies = {'I':{}};
        }
        for(var C in Copies){
            S.Copies[C] = {'_main':1};
            if(typeof SE.upgrades != 'undefined'){
                for(var E in SE.upgrades){
                    S.Copies[C][E] = 1;
                }
            }
        }
        $('.shipElement[elementName="'+elementName+'"]').addClass('bought');
        this.buildShip();
    }


    this.toggleShipElementPart = function(elementName, elementCopy, elementUpgrade){
        console.log('toggleShipElementPart(',elementName, elementCopy, elementUpgrade,')');
        var S = this.SHIPelems[elementName];

        if(typeof S.Copies[elementCopy] == 'undefined'){
            S.Copies[elementCopy] = {'_main':1};
            S.Copies[elementCopy][elementUpgrade] = 1;
            S.Active = true;
        }else{
            if(typeof S.Copies[elementCopy][elementUpgrade] != 'undefined'){
                delete S.Copies[elementCopy][elementUpgrade];
                var someLeft = false; for(var i in S.Copies[elementCopy]) someLeft = true;
                if(!someLeft){
                    delete S.Copies[elementCopy];
                    someLeft = false; for(var i in S.Copies) someLeft = true;
                    if(!someLeft){
                        S.Active = false;
                    }
                }
            }else{
                S.Copies[elementCopy][elementUpgrade] = 1;
            }
        }

        this.buildShip();
        this.showPartEditor(elementName);
    }

    // DEPRECATED
    this.elementPossibleToAdd = function(elementName){
        return true;
    }
    // DEPRECATED
    this.elementPossibleToRemove = function(elementName){
        var E = this.SHIPelems[elementName];
        for(var x in this.SHIPelems)
            if(this.SHIPelems[x].S === true)
                if(typeof BBAdata.SHIPelements[x].upgrade !='undefined')
                    if(BBAdata.SHIPelements[x].upgrade == elementName)
                        return false;

        return true;
    }
    // ================== Building the Ship Stats ==============================
    this.getShipFromPresets = function(sPresetsName){
        this.prepareElemsFromPresets(sPresetsName);
        this.buildShip();
        return this.SHIP;
    }
    this.prepareElemsFromPresets = function(sPresetsName){
        var PT = cloneObj(BBAdata.SHIPpresets[sPresetsName]);

        this.SHIPelems = {};
        for(var e in BBAdata.SHIPelements)
            this.SHIPelems[e] = {Active:false, Copies:{}};

        for(var p in PT){
            var P = PT[p];
            this.SHIPelems[p].Active = true;
            for(var c in P){
                var C = P[c];
                this.SHIPelems[p].Copies[c]={};
                for(var u in C){
                    this.SHIPelems[p].Copies[c][u] = C[u];
                }
            }
        }
    }

    this.buildShip = function(){
        var S = this.SHIP = cloneObj(BBAdata.SHIPempty);

        // adding Elements
        for(var elementName in this.SHIPelems){
            var Evar = this.SHIPelems[elementName];
            var Edata = BBAdata.SHIPelements[elementName];

            if(!Evar.Active) continue;

            for(var uCopy in Evar.Copies){
                var elemCopy = Evar.Copies[uCopy];
                this.lastWeapon = false;
                this.lastModule = false;
                for(var uUpgrade in elemCopy)
                if(uUpgrade == '_main'){
                    this.buildShip_addElement(S, Edata);
                }else{
                    this.buildShip_addElement(S, Edata.upgrades[uUpgrade]);
                }
            }
        }

        // counting maxSpeed
        S.speedM = Energy2Speed(S.EnergyM, S.Weight, S.engineMultiply);
        if(S.maxSpeedCap  !== false) S.maxSpeedCap-=-S.maxSpeedCapPlus;
        if(S.maxSpeedTCap !== false) S.maxSpeedTCap-=-S.maxSpeedTCapPlus;
        if(S.maxSpeedCap  !== false && S.speedM > S.maxSpeedCap) S.speedM = S.maxSpeedCap;
        if(S.maxSpeedTCap !== false && S.speedT > S.maxSpeedTCap) S.speedT = S.maxSpeedTCap;
        // full life at start
        S.life = S.lifeM;
        // start speed under max speed
        if(S.speed > S.speedM) S.speed = S.speedM;
        // remove unused hidden Storages
        for(var type in S.Storage){
            var ST = S.Storage[type];
            console.log(ST);
            if(typeof ST.Hidden != 'undefined' && ST.Hidden != ST.M){
                console.log(ST.M, ST.Hidden);
                ST.M -= ST.Hidden;
                delete S.Storage[type].Hidden;
            }
        }

        this.showShipAssemblyView();
        this.showShipProperties();
    }
    this.buildShip_addElement = function(S, Edata){
        for(var i in Edata){
            switch(i){
                case 'Weight':
                case 'lifeM':
                case 'EnergyM':
                case 'Price':
                case 'speed':
                case 'speedAcl':
                case 'speedDcl':
                case 'speedT':
                case 'starBump':
                case 'maxSpeedCapPlus':
                case 'maxSpeedTCapPlus':
                case 'engineMultiply':
                case 'GlueFireToEstimated':
                    S[i]-=-Edata[i];
                break;
                case 'maxSpeedCap':
                case 'GlueFireToLaser':
                case 'maxSpeedTCap':
                    S[i] = Edata[i];
                break;
                case 'StorageData':
                    this.buildShip_StorageData(Edata.StorageData,'Storage');
                break;
                case 'ModStorageData':
                    this.buildShip_StorageData(Edata.ModStorageData,'ModStorage');
                break;
                case 'ShieldStorageData':
                    this.buildShip_StorageData(Edata.ShieldStorageData,'ShieldStorage');
                break;
                case 'WeaponData':
                    this.buildShip_WeaponData(Edata.WeaponData);
                break;
                case 'ModulesData':
                    this.buildShip_ModulesData(Edata.ModulesData);
                break;
            }
        }
    }

    this.buildShip_StorageData = function(StorageData, StorageType){
        for(var storageType in StorageData){
            if(typeof this.SHIP[StorageType][storageType] == 'undefined')
                this.SHIP[StorageType][storageType] = {M:0,R:0};

            for(var i in StorageData[storageType]){
                if(typeof this.SHIP[StorageType][storageType][i] == 'undefined')
                    this.SHIP[StorageType][storageType][i] = 0;
                this.SHIP[StorageType][storageType][i] -=- StorageData[storageType][i];
            }
        }
    }
    this.buildShip_WeaponData = function(WeaponData){
        if(this.lastWeapon === false){
            this.lastWeapon = this.SHIP.Weapons.length;
            this.SHIP.Weapons[this.SHIP.Weapons.length] = {};
        }
        console.log(this.lastWeapon, WeaponData);
        Weapon = this.SHIP.Weapons[this.lastWeapon];

        Weapon = mergeObjects(Weapon,WeaponData);
    }
    this.buildShip_ModulesData = function(ModuleData){
        if(this.lastModule === false){
            this.lastModule = this.SHIP.Modules.length;
            this.SHIP.Modules[this.SHIP.Modules.length] = {};
        }
        Module = this.SHIP.Modules[this.lastModule];

        Module = mergeObjects(Module,ModuleData);
    }

    // ==================== ELEMENT CONFIGURATOR -==============================
    this.showPartEditor = function(elementName){
        this.activeElement = elementName;
        var E = BBAdata.SHIPelements[elementName];
        var SE = this.SHIPelems[elementName];
        var html = '';

        html += '<div class="partName">';
        if(typeof E.name != 'undefined') html += E.name;
                    else                 html += elementName;
        html += '</div>';

        if(typeof E.info != 'undefined') html += '<div class="partInfo">' + E.info + '</div>';

        var Copies = {'I':{}};
        if(E.copies != 'undefined'){
            for(var eC in E.copies){
                Copies[eC] = E.copies[eC];
            }
        }

        for(var eC in Copies){
            html += '<div class="partCopy';
            if(typeof SE.Copies[eC] != 'undefined' && typeof SE.Copies[eC]['_main'] != 'undefined')
                html += ' bought';
            html += '">';
            if(typeof E.name != 'undefined') html += E.name;
                    else                     html += elementName;
            html += ' '+eC;


            if(typeof SE.Copies[eC] == 'undefined' || typeof SE.Copies[eC]['_main']== 'undefined'){
                html += '<div class="addElementPart toggleElementPart" elementName="'+elementName+'" elementCopy="'+eC+'" elementUpgrade="_main">Add</div>';
                //html += '<div class="elementPartStats_'+elementName+'_'+eC+'">'+this.showPartEditor_updateElemStats(elementName,eC,false)+'</div>';
                html += '</div>';
                continue;
            }else{
                html += '<div class="removeElementPart toggleElementPart" elementName="'+elementName+'" elementCopy="'+eC+'" elementUpgrade="_main">Remove</div>';
                html += '<div id="elementPartStats_'+elementName+'_'+eC+'">'+this.showPartEditor_updateElemStats(elementName,eC,false)+'</div>';
            }

            if(typeof E.upgrades != 'undefined'){
                for(var eU in E.upgrades){
                    var U = E.upgrades[eU];
                    html += '<div class="partCopyUpgrade toggleElementPart';
                    if(typeof SE.Copies[eC][eU] != 'undefined')
                        html +=' bought';
                    html += '" elementName="'+elementName+'" elementCopy="'+eC+'" elementUpgrade="'+eU+'"';


                    html += '<div class="upgradeName">';
                    if(typeof U.name != 'undefined') html+=U.name;
                                else                 html+=eU;
                        html +=this.showPartEditor_printElem(U);

                    html += '</div>';
                }
                html += '</div>';
            }
            html += '</div>';
        }

        $('.shipPartEditor').html(html);
    }

    this.showPartEditor_printElem = function(U){
        var html='<br/>';
        for(var u in U){
            if(u=='name' || u=='Price') continue;
            if(typeof U[u] == 'object'){
                html+=u+':[';
                html+=showObject(U[u]);
                html+='],';

            }else{
                html+=u+':'+U[u]+', ';
            }
        }

        return html;
    }

    this.showPartEditor_updateElemStats = function(elementName,Copy,update){
        var html = '';
        var SE = BBAdata.SHIPelements[elementName];
        var C = this.SHIPelems[elementName].Copies[Copy];
        if(typeof C === 'undefined') return '';

        var Elem = {};
        for(var c in C){
            if(c=='_main'){
                Elem = cloneObj(SE);
            }else{
                Elem = mergeObjects(Elem,SE.upgrades[c]);
            }
        }
        delete Elem.upgrades;
        delete Elem.copies;
        delete Elem.Price;
        delete Elem.name;
        delete Elem.where;

        html = showObject(Elem, true);

        if(update===true){
            $('#elementPartStats_'+elementName+'_'+Copy).html(html);
        }else{
            return html;
        }
    }

    // ==================== MODULES CONFIGURATION ==============================

    // ================= SPECIAL MOVES CONFIGURATION ===========================


    // ====================== PRESET SHIPS MENU ================================
    this.print = function(){
        var P = '{';
        for(var e in this.SHIPelems){
            var E = this.SHIPelems[e];
            if(E.Active == true){
                P+='\n    "'+e+'":{';
                for(var c in E.Copies){
                    var C = E.Copies[c];
                    P+='\n        "'+c+'":{';
                    for(var u in C){
                        P+='"'+u+'":1,';
                    }
                    P+='},';
                }
                P+='\n    },';
            }
        }
        P+='\n}';
        console.log(P);
    }

    this.showShipAssemblyView = function(){
        var html='';
        var html2='';
        for(var s in this.SHIP){
            if(typeof this.SHIP[s] == 'object') {
                html2 += s +':<br/>';
                for(var s2 in this.SHIP[s]) {
                    html2+= '<div style="text-align: center;">'+s2+'</br>';
                    html2+= showObject(this.SHIP[s][s2]);
                    html2+='</div>';
                }
            } else
                html+= '<span style="width: 50%; text-align: right; display: inline-block;">'+s + ':</span> ' + this.SHIP[s] + '<br/>';
        }
        $('.shipAssemblyView').html(html2+html).css({color: 'white'});
    }

}


// =============================================
