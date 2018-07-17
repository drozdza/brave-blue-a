GAMEobject.prototype.frame_draw = function(frameCenter){
    var MS = (new Date()).getTime();
    var o,O;
    var P = this.O[0];
    var CH = this.CanvasHandle;
    var Px = P.x-(this.Dx/2);
    var Py = P.y-(this.Dy/2);
    if(frameCenter){
        var Px = frameCenter.x-(this.Dx/2);
        var Py = frameCenter.y-(this.Dy/2);
    }
    var Cbull = CanvasManager.C['bullet_'];
    var Radi = Math.PI/180;

    this.mainCanvas = {CH:CH,Px,Py};

    if(BBAdata.GET.BLUR){
        this.BlurCanvasHandle.clearRect(0, 0, this.Dx, this.Dy);
        this.BlurCanvasHandle.globalAlpha = 0.88;
        this.BlurCanvasHandle.drawImage(document.getElementById('MainCanvas'), 0, 0);
        CH.clearRect(0, 0, this.Dx, this.Dy);
        if(BBAdata.GET.BLUR == 1)
            CH.drawImage(document.getElementById('BlurCanvas'), 0, 0);
        else{
            var shipMoveX = this.shipX-P.x;
            var shipMoveY = this.shipY-P.y;
            this.shipX = P.x;
            this.shipY = P.y;
            CH.drawImage(document.getElementById('BlurCanvas'), shipMoveX, shipMoveY);
        }

    }else{
        CH.clearRect(0, 0, this.Dx, this.Dy);
    }

    if(BBAdata.GET.DEBUG >= 2) CanvasManager.drawMapHitboxLines(CH, this.MapTileSize, this.Dx, this.Dy, Px, Py, false);
    if(BBAdata.GET.DEBUG >= 3) CanvasManager.drawMapHitboxLines(CH, this.MapTileSize, this.Dx, this.Dy, Px, Py, true);

    for(o in this.O){
        O = this.O[o];

        if(O && O.TT=='regionAnim'){
            var DR = CanvasManager.directRenders[ O.animType ];
            if(DR.Particles){
                CanvasManager.CPM.addParticles(O, O.animData);
            }
        }

        if(O.viewOff || (O.view && O.view.onBackground)) continue;

        if(O.T=='bullet'){
            CH.save();
            CH.translate((O.x-Px).toFixed(0), (O.y-Py).toFixed(0));
            CH.rotate(Radi*O.angle);
            CH.drawImage(Cbull.Id,-Cbull.X,-Cbull.Y);
            CH.restore();
            continue;
        }

        this.drawObject(O, CH, Px,Py);
    }


    CanvasManager.CPM.showParticles(CH,Px,Py);

    CanvasManager.CBM.drawBackgroundTiles(this.UnderCanvasHandle, this.Dx, this.Dy, Px, Py);
    ++this.tickD;
    this.MSdraw-=-((new Date()).getTime() - MS);
}
