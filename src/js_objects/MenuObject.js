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
        html+='<div id="shipyardContainer">';
            html+='<div id="GoToStarMap">StarMap</div>';
            html+='<div class="shipProperties"></div>';
            html+='<div class="detailedShipProperties"></div>';
            html+='<div class="shipElements"></div>';
        html+='</div>';
        $('#Menu').append(html+this.getMenu.makeHtml()+'<div id="goldContainer"></div>');

        $('#GoToShipyard').click(function(){ MENU.startShipBuildingMenu(); });
        $('#GoToStarMap').click(function(){ MENU.startStarMapMenu(); });

    }
    this.loadMaps = function(){
         for(var id in BBAdata['MAPS'])
            if(BBAdata['MAPS'][id] == 'load')
                jQuery.getScript('js_data/Maps/'+id+'.js');
    }
    this.startMap = function(id){
        this.SM.stopAnimation();
        $('#Menu').hide();
        if(typeof GAME != 'undefined')
            delete GAME;
        if(typeof CanvasManager != 'undefined')
            delete CanvasManager;
        CanvasManager = new CanvasManagerObject();
        CanvasManager.start();
        GAME = new GAMEobject();
        GAME.start(id, BBAdata['MAPS'][id],cloneObj(BBAdata['SHIPpresets'][this.ShipPresetChoosen]));
    }

    this.startShipBuildingMenu = function(){
        this.SM.stopAnimation();
        $('#starMapContainer').hide();
        $('#goldContainer').hide();
        $('#shipyardContainer').show();
    }
    this.startStarMapMenu = function(){
        $('#shipyardContainer').hide();
        $('#starMapContainer').show();
        $('#goldContainer').show();
        this.SM.startAnimation();
    }


}
