GAMEobject.prototype.drawObject = function(O, CH, Px,Py){
    var Radi = Math.PI/180;

    if(!O){ errorLog('There is no object to draw.'); return false;}

    if(BBAdata.GET.DEBUG > 0){
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

    if(BBAdata.GET.ORDERS > 0 && O.T == 'routePoint'){
        CH.save();
        CH.beginPath();
        CH.arc(O.x-Px, O.y-Py,O.radius,0,2*Math.PI,true);
        CH.closePath();
        CH.fillStyle = "rgba(20,0,40,0.3)";
        CH.strokeStyle = "rgba(20,0,40,0.5)";
        CH.lineWidth = 10;
        CH.setLineDash([20,5]);
        CH.fill();
        CH.stroke();
        CH.fillStyle = 'rgb(40,0,80)';
        CH.font = "20px Arial";
        CH.textAlign = "center";
        CH.fillText(O.rName, O.x-Px, O.y-Py- -O.radius- -20);
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

        if(O.Shields && !O.view.DontShowShields)
            this.drawShields(O,CH);

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

    if(BBAdata.GET.ORDERS > 1 && O.TT == 'enemy'){
        CH.save();
        CH.fillStyle = 'white';
        CH.font = "12px Arial";
        CH.textAlign = "left";
        CH.fillText(O.ThinkState, O.x-Px-O.radius, O.y-Py-O.radius-18);
        CH.fillText(O.ThinkNow,   O.x-Px-O.radius, O.y-Py-O.radius-9);
        CH.fillText(O.Manouver,   O.x-Px-O.radius, O.y-Py-O.radius);
        CH.restore();
    }
}
