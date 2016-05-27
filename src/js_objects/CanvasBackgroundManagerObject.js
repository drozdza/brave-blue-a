function CanvasBackgroundManagerObject(){

    this.Tiles = {};
    this.TileSize = 300;
    this.TileOffset = 1;

    this.start = function(){}

    this.addObjectToBackground = function(o){
        var O = GAME.O[o];
        var tab = GAME.findTabTiles(o,O.x,O.y,this.TileSize);

        for(var TU in tab){
            if(typeof this.Tiles[TU] == 'undefined'){
                this.Tiles[TU] = {O:{},canvasId:false};
                $('#CanvasBackgrounds').append('<canvas id="CanvasBackgrounds_'+TU+'" width="'+(this.TileSize- -this.TileOffset)+'" height="'+(this.TileSize- -this.TileOffset)+'"></canvas>');
                this.Tiles[TU].canvasId = document.getElementById('CanvasBackgrounds_'+TU);
            }
            this.Tiles[TU].O[o]=1;
            this.composeBackgroundTile(TU);
        }
    }
    this.deleteObjectFromBackground = function(o,tabX){
        var O = GAME.O[o];
        var tab = tabX || {};

        for(var TU in this.Tiles){
            if(typeof this.Tiles[TU].O[o] != 'undefined' && typeof tab[TU] == 'undefined'){
                delete this.Tiles[TU].O[o];
                this.composeBackgroundTile(TU);
            }
        }
    }
    this.changeObjectPosition = function(o){
        var O = GAME.O[o];
        var tab = GAME.findTabTiles(o,O.x,O.y,this.TileSize);

        this.deleteObjectFromBackground(o,tab);
        this.addObjectToBackground(o);
    }


    this.composeBackgroundTile = function(tabId){
        var T = this.Tiles[tabId];
        var CanCon = this.Tiles[tabId].canvasId.getContext('2d');
        CanCon.fillStyle='rgba(0,0,0,0)';
        CanCon.clearRect(0,0,this.TileSize- -this.TileOffset,this.TileSize- -this.TileOffset);
        var tabPos = tabId.split('_');

        var Px = parseInt(tabPos[0])*this.TileSize;
        var Py = parseInt(tabPos[1])*this.TileSize;

        for(var o in this.Tiles[tabId].O){
            var O = GAME.O[o];
            GAME.drawObject(O,o, CanCon, Px,Py);
        }
    }

    this.drawBackgroundTiles = function(CH,screenX,screenY,posX,posY){
        CH.fillStyle="rgba(0,0,0,1)";
        CH.fillRect(0, 0, screenX, screenY);

        var left = parseInt((posX)/this.TileSize)-1;
        var top = parseInt((posY)/this.TileSize)-1;

        var right = left- -parseInt(screenX/this.TileSize)- -3;
        var bottom = top- -parseInt(screenY/this.TileSize)- -3;

        for(var x = left; x < right; ++x)
            for(var y = top; y < bottom; ++y){
                if(typeof this.Tiles[x+'_'+y] !='undefined'){
                    var T = this.Tiles[x+'_'+y];
                    CH.drawImage(T.canvasId,x*this.TileSize-posX,y*this.TileSize-posY);

                }
            }
    }


};
