GAMEobject.prototype.drawObject = function(O,o,CH, Px,Py){
    var Radi = Math.PI/180;

    if(!O){ console.log('There is no object to draw: '+o); return false;}

    if(BBAdata.GET.DEBUG){
        CH.save();
        CH.strokeStyle = 'white';
        CH.beginPath();
        if(O.squareCorners){
            CH.moveTo( (O.squareCorners.A.x-Px).toFixed(1), (O.squareCorners.A.y-Py).toFixed(1) );
            CH.lineTo( (O.squareCorners.B.x-Px).toFixed(1), (O.squareCorners.B.y-Py).toFixed(1) );
            CH.lineTo( (O.squareCorners.C.x-Px).toFixed(1), (O.squareCorners.C.y-Py).toFixed(1) );
            CH.lineTo( (O.squareCorners.D.x-Px).toFixed(1), (O.squareCorners.D.y-Py).toFixed(1) );
            CH.lineTo( (O.squareCorners.A.x-Px).toFixed(1), (O.squareCorners.A.y-Py).toFixed(1) );
        }else if(O.coneAngle){
            var Angle1 = (O.angle- -O.coneAngle-90)*Radi;
            var Angle2 = (O.angle - O.coneAngle-90)*Radi;
            CH.arc(O.x-Px,O.y-Py,O.radius,Angle1,Angle2,true);
            CH.arc(O.x-Px,O.y-Py,O.coneRad2,Angle2,Angle1,false);
            CH.closePath();
        }else{
            CH.arc((O.x-Px).toFixed(0), (O.y-Py).toFixed(0),O.radius,0,Math.PI*2,true);
        }
        CH.stroke();
        CH.restore();
    }

    if(typeof O.canvasId != 'undefined'){
        CH.save();
        CH.translate((O.x-Px).toFixed(0), (O.y-Py).toFixed(0));
        if(O.view.Angle)
            CH.rotate(Radi*(O.angle- -O.view.Angle));
        else if(O.angle)
            CH.rotate(Radi*O.angle);
        CH.drawImage(O.canvasId,-O.canvasX,-O.canvasY);

        if(O.energyField && O.energyField > 0 && !O.shieldD){
            CH.beginPath();
            var Radius = O.radius;
            var lineWidth = O.energyField;
            if(lineWidth > 2)
                lineWidth = 2- -(lineWidth-2)/2;

            if(o==0){
                CH.strokeStyle = 'rgba(154,255,255,0.8)';
                CH.fillStyle = 'rgba(154,255,255,0.2)';
                Radius-=-7;
            } else {
                CH.strokeStyle = 'rgba(0,255,0,0.8)';
                CH.fillStyle = 'rgba(0,255,0,0.2)';
            }
            CH.arc(0,0,Radius- -parseInt(lineWidth/2),0,Math.PI*2,true);
            CH.lineWidth = lineWidth;
            CH.stroke();
            CH.fill();
        }
        if(O.shieldD){
            CH.beginPath();
            var Radius = O.radius;

            CH.strokeStyle = 'rgba(100,180,255,0.8)';
            CH.fillStyle = 'rgba(100,180,255,0.2)';

            CH.arc(0,0,Radius- -1,0,Math.PI*2,true);
            CH.lineWidth = 2;
            CH.stroke();
            CH.fill();
        }
        CH.restore();
    }
    if(O.TT=='anim'){
        CH.save();
        CH.translate((O.x-Px).toFixed(0), (O.y-Py).toFixed(0));
        var Canvas = CanvasManager.getCanvas(O);
        if(O.angle != 0) CH.rotate(Radi*O.angle);
        CH.drawImage(Canvas.Id, -Canvas.X, -Canvas.Y);
        CH.restore();
        return true;
    }
    if(O.TT=='dirAnim'){
        CanvasManager.directRender(CH,O, Px,Py);
        return true;
    }
    if(O.TT=='regionAnim'){
        CanvasManager.regionAnim(CH,O, Px,Py);
        return true;
    }
    if(O.TT=='simpleFilling'){
        CanvasManager.simpleFilling(CH,O, Px,Py);
        return true;
    }

}
