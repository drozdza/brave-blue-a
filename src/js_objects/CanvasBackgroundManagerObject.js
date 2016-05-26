function CanvasBackgroundManagerObject(){

    this.Tiles = {};

    this.TileSize = 80;

    this.start = function(){


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
                CH.fillStyle = 'rgba('+(255-Math.abs(x)*55)+','+(255-Math.abs(y)*55)+',0,1)';
                CH.fillRect(
                    x*this.TileSize -posX,
                    y*this.TileSize -posY,
                    this.TileSize- -2,
                    this.TileSize- -2
                );
            }
    }


};
