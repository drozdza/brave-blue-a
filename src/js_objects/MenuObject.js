function MENUobject(){

    this.ShipPresetChoosen = 'start';

    this.getMenu = new GetMenuObject();
    this.SB = new MenuShipBuildingObject();
    this.SM = new MenuStarMapObject();

    this.CM = new CampainManagerObject();

    this.start = function(){
        this.makeMenuBoards();
        this.SB.makeMenuShip();
        this.CM.makeCampain();
        this.SM.makeMenuStars();
        this.showMenu='Boards';
        $('.ToggleMenu').click(function(){ MENU.toggleMenu(); });

        if(BBAdata.GET.SHIPPRESET != 0)
            this.ShipPresetChoosen = BBAdata.GET.SHIPPRESET;

    }
    this.show = function(){ // after playing the game
        $('#Menu').show();
        this.SM.startAnimation();
    }


    this.makeMenuBoards = function(){
        var html = '';
        html+='<div id="starMapContainer">';
            html+='<canvas id="starMapBackground" style="width: 100%; height: 100%;"></canvas>';
            html+='<canvas id="starMap" style="width: 100%; height: 100%;"></canvas>';
            html+='<div id="GoToShipyard">Shipyard</div>';
        html+='</div>';
        html+='<div id="shipyardContainer"></div>';
        $('#Menu').append(html+this.getMenu.makeHtml()+'<div id="goldContainer"></div>');

        $('#GoToShipyard').click(function(){ MENU.startShipBuildingMenu(); });

    }
    this.loadMaps = function(){
         for(var id in BBAdata['MAPS'])
            if(BBAdata['MAPS'][id] == 'load')
                jQuery.getScript('js_data/Maps/'+id+'.js');
    }
    this.startMap = function(id){
        this.SM.stopAnimation();
        $('#Menu').hide();
        $('#FPS').show();
        if(typeof GAME != 'undefined')
            delete GAME;
        if(typeof CanvasManager != 'undefined')
            delete CanvasManager;
        CanvasManager = new CanvasManagerObject();
        CanvasManager.start();

        if(typeof BBAdata.SHIPpresetsOld[this.ShipPresetChoosen] != 'undefined')
            var SHIPpreset = cloneObj(BBAdata.SHIPpresetsOld[this.ShipPresetChoosen]);
        else
            var SHIPpreset = cloneObj((this.SB.getShipFromPresets(this.ShipPresetChoosen)));

        if(this.SB.useShipyardShip)
            SHIPpreset = cloneObj(this.SB.SHIP);

        GAME = new GAMEobject();
        GAME.start(id, BBAdata['MAPS'][id], SHIPpreset);
    }

    this.startShipBuildingMenu = function(){
        this.SM.stopAnimation();
        $('#starMapContainer').hide();
        $('#goldContainer').hide();
        $('#shipyardContainer').show();
        this.SB.startAnimation();
    }
    this.startStarMapMenu = function(){
        this.SB.stopAnimation();
        $('#shipyardContainer').hide();
        $('#starMapContainer').show();
        $('#goldContainer').show();
        this.SM.startAnimation();
    }


}
