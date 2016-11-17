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
        html+='<div id="starMapContainer"><canvas id="starMap" style="width: 100%; height: 650px;"></canvas></div>';
        $('#Menu').append(html+this.getMenu.makeHtml()+'<div id="goldContainer"></div>');
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

    this.toggleMenu = function(){
        if(this.showMenu=='Ship') this.hideMenuShip();
                else              this.showMenuShip();
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
