function CanvasBackgroundManagerObject(){

    this.Tiles = {1:{}};
    this.TileSize = 300;
    this.TileOffset = 0;
    this.BGscale = {1:1};
    this.BGqueue = [1];

    this.start = function(){}

    this.setBackgroundScale = function(Number,Scale){
        this.Tiles[Number] = {};
        this.BGscale[Number] = Scale;

        this.BGqueue = [];
        for(var i in this.BGscale)
            this.BGqueue.unshift(i);
    }

    this.addObjectToBackground = function(O, BGnumber){
        var BGN = BGnumber || 1;

        O.view.onBackground = BGN;
        var tab = GAME.findTabTiles(O, O.x, O.y, this.TileSize);

        for(var TU in tab){
            if(typeof this.Tiles[BGN][TU] == 'undefined'){
                this.Tiles[BGN][TU] = {O:{},canvasId:false};
                $('#CanvasBackgrounds').append('<canvas id="CanvasBackgrounds_'+BGN+'_'+TU+'" width="'+(this.TileSize- -this.TileOffset)+'" height="'+(this.TileSize- -this.TileOffset)+'"></canvas>');
                this.Tiles[BGN][TU].canvasId = document.getElementById('CanvasBackgrounds_'+BGN+'_'+TU);
            }
            this.Tiles[BGN][TU].O[O.o]=1;
            this.composeBackgroundTile(TU,BGN);
        }
    }
    this.deleteObjectFromBackground = function(O, tabX, BGnumber){
        var BGN = BGnumber || 1;
        var tab = tabX || {};

        delete(O.view.onBackground);

        for(var TU in this.Tiles[BGN]){
            if(typeof this.Tiles[BGN][TU].O[O.o] != 'undefined' && typeof tab[TU] == 'undefined'){
                delete this.Tiles[BGN][TU].O[O.o];
                this.composeBackgroundTile(TU,BGN);
            }
        }
    }
    this.changeObjectPosition = function(O, BGnumber, BGnumber2){
        var BGN = BGnumber || O.view.onBackground || 1;
        var BGN2 = BGnumber2 || O.view.onBackground || BGN;
        var tab = GAME.findTabTiles(O, O.x, O.y, this.TileSize);

        this.deleteObjectFromBackground(O, tab, BGN2);
        this.addObjectToBackground(O, BGN);
    }


    this.composeBackgroundTile = function(tabId,BGN){
        var T = this.Tiles[BGN][tabId];
        var CanCon = this.Tiles[BGN][tabId].canvasId.getContext('2d');
        CanCon.fillStyle='rgba(0,0,0,0)';
        CanCon.clearRect(0,0,this.TileSize- -this.TileOffset,this.TileSize- -this.TileOffset);
        var tabPos = tabId.split('_');

        var Px = parseInt(tabPos[0])*this.TileSize;
        var Py = parseInt(tabPos[1])*this.TileSize;

        for(var o in this.Tiles[BGN][tabId].O){
            var O = GAME.O[o];
            GAME.drawObject(O,o, CanCon, Px,Py);
        }
    }

    this.drawBackgroundTiles = function(CH,screenX,screenY,posX,posY){
        CH.fillStyle="rgba(0,0,0,1)";
        CH.fillRect(0, 0, screenX, screenY);

        var s2X = screenX/2;
        var s2Y = screenY/2;

        for(var ti=0; ti < this.BGqueue.length; ++ti){
            var BGN = this.BGqueue[ti];

            var PX = (posX- -s2X)*this.BGscale[BGN]-s2X;
            var PY = (posY- -s2Y)*this.BGscale[BGN]-s2Y;


            var left = parseInt((PX)/this.TileSize)-1;
            var top = parseInt((PY)/this.TileSize)-1;

            var right = left- -parseInt(screenX/this.TileSize)- -3;
            var bottom = top- -parseInt(screenY/this.TileSize)- -3;

            for(var x = left; x < right; ++x)
                for(var y = top; y < bottom; ++y)
                    if(typeof this.Tiles[BGN][x+'_'+y] !='undefined'){
                        var T = this.Tiles[BGN][x+'_'+y];
                        var uX = parseInt(x*this.TileSize-PX);
                        var uY = parseInt(y*this.TileSize-PY);
                        if(uX < 0) --uX;
                        if(uY < 0) --uY;
                        if(uX == 0){
                            if(PX < 0 && parseInt(PX)%2 != 0) uX=-1;
                            if(PX > 0 && parseInt(PX)%2 == 0) uX=-1;
                        }
                        if(uY == 0){
                            if(PY < 0 && parseInt(PY)%2 != 0) uY=-1;
                            if(PY > 0 && parseInt(PY)%2 == 0) uY=-1;
                        }

                        CH.drawImage(T.canvasId,uX,uY);
                    }
        }
    }
};
