function MENUobject(){

    this.ShipPresetChoosen = 'start';

    this.SB = new MenuShipBuildingObject();
    this.SM = new MenuStarMapObject();


    this.start = function(){
        this.makeMenuBoards();
        this.SB.makeMenuShip();
        this.SM.makeMenuStars();
        this.showMenu='Boards';
        $('.ToggleMenu').click(function(){ MENU.toggleMenu(); });
    }

    this.getMenu = false;

    this.makeMenuBoards = function(){
        this.getMenu = new GetMenuObject();
        var html = '';

        html+='<div class="ShipPresets"><span>Choose: </span>';
        for(var m in BBAdata['SHIPpresets'])
            html+='<div class="chooseShipPresets" id="chooseShipPresets_'+m+'">'+m+'</div>';
        html+='</div>';

        html+='<canvas id="starMap" style="width: 100%; height: 500px;"></canvas>';

        // this.loadMaps();

        for(var m in BBAdata['MAPS']){
            var name = m;
            if(m.substr(0,2)=='Lx')
                name = '&#'+m.substr(2)+';';
            html+='<div class="MainMenuButton" id="MainMenuButton_'+m+'">'+name+'</div>';
        }

        $('#Menu').append(this.getMenu.makeHtml()+'<div id="MenuBoards">'+html+'</div>');

        $('.chooseShipPresets').unbind().click(function(){  MENU.click_chooseShipPresets( $(this).attr('id').split('_')[1] ); });
        $('#chooseShipPresets_'+this.ShipPresetChoosen).addClass('choosenPreset');

        $('.MainMenuButton').unbind().click(function(){  MENU.click_MainMenuButton( $(this).attr('id').split('_')[1] ); });
    }
    this.loadMaps = function(){
         for(var id in BBAdata['MAPS'])
            if(BBAdata['MAPS'][id] == 'load')
                jQuery.getScript('js_data/Maps/'+id+'.js');
    }
    this.click_chooseShipPresets = function(id){
        $('.chooseShipPresets').removeClass('choosenPreset');
        $('#chooseShipPresets_'+id).addClass('choosenPreset');
        this.ShipPresetChoosen = id;
    }
    this.click_MainMenuButton = function(id){
        $('#Menu').hide();
        if(typeof GAME != 'undefined')
            delete GAME;
        if(typeof CanvasManager != 'undefined')
            delete CanvasManager;
        CanvasManager = new CanvasManagerObject();
        CanvasManager.start();
        GAME = new GAMEobject();
        GAME.start(BBAdata['MAPS'][id],cloneObj(BBAdata['SHIPpresets'][this.ShipPresetChoosen]));
    }
    this.toggleMenu = function(){
        if(this.showMenu=='Ship')    this.hideMenuShip();
                else                this.showMenuShip();
    }
    this.hideMenuShip = function(){
        this.showMenu = 'Boards';
        $('#MenuShip').animate({left:'100%'},500);
    }
    this.showMenuShip = function(){
        this.showMenu = 'Ship';
        $('#MenuShip').animate({left:'12%'},500);
    }
}
