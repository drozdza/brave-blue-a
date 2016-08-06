function CanvasParticleManagerObject(){

    this.tileSize = 30;
    this.particleTab = {};

    this.start = function(){}

    this.addParticles = function(O,AD){
        var DR = CanvasManager.directRenders[ O.animType ];

        AD.Next -=- O.animPole/DR.Particles.density;
        // while(AD.Next > 1){
        for(var uuu=0; uuu<AD.Next; ++uuu){
            var PX = this.findParticlePlace(O);

            this.addParticle(O,AD,DR,PX);
        }
    }

    this.findParticlePlace = function(O){
        var DR = CanvasManager.directRenders[ O.animType ];
        var x=0,y=0,dist=0,angle=0;
        var Radi = Math.PI*2/360;


        if(O.squareCorners){
            var Width = O.squareWidth;
            var xA = Math.random()*O.squareLen;
            if(DR.Particles.anim=='randomMove'){
                var xA = Width*0.2- -Math.random()*(O.squareLen - Width*0.4);
                Width*=0.8;
            }
            var yA = Math.random()*Width*2 - Width;

            var aA = -(O.squareAngle- -180)*Radi;

            x = xA*Math.sin(aA) - yA*Math.cos(aA);
            y = xA*Math.cos(aA) - yA*Math.sin(aA);

        }
        else if(O.coneAngle){
            var R2=O.coneRad2;
            var R1=O.radius-R2;
            var udaloSie=true;

            if(DR.Particles.anim=='randomMove'){    R2-=-R1*0.20; R1*=0.6; }
            var rad = R2- -(Math.random()*R1);
            var angle = O.angle- -(Math.random()*O.coneAngle*2 - O.coneAngle)-180;

            x = rad*Math.sin(-angle*Radi);
            y = rad*Math.cos(-angle*Radi);
        }
        else{
            var R2=0;
            var R1=O.radius;
            if(DR.Particles.anim=='randomMove'){ R1*=0.75; }
            if(DR.Particles.anim=='toCenter'){   R2=R1*0.4; R1*=1.2; }
            if(DR.Particles.anim=='toCenterOutside'){ R2=120; R1=200; }
            if(DR.Particles.anim=='onOrbit'){    R2=R1*0.2; }
            do{
                x = parseInt(Math.random()*R1*2-R1);
                y = parseInt(Math.random()*R1*2-R1);
                dist = Math.sqrt(x*x- -y*y);
                console.log(R1+' '+R2+' '+dist);
            }while(!(dist > R2 && dist < R1));
        }

        if(DR.Particles.anim=='withWind'){
            x-=-30*Math.sin((O.windAngle-90)*Radi);
            y-=-30*Math.cos((O.windAngle-90)*Radi);
        }

        return {x:x,y:y};
    }

    this.addParticle = function(O,AD,DR,PX){

        var uX = parseInt((PX.x- -O.x) / this.tileSize);
        var uY = parseInt((PX.y- -O.y) / this.tileSize);
        var uU = uX+'_'+uY;

        if(typeof this.particleTab[uU] != 'undefined') return false;

        if(O.particlesOnBoard){
            PX.x-=-O.x;
            PX.y-=-O.y;
        }

        if(DR.Particles.anim=='randomMove'){
            var angle = parseInt(Math.random()*360);
            var rotation = parseInt(Math.random()*360);
            var rotate = -1;
            if(angle > 180) rotate=1;
            if(DR.Particles.animAngle && DR.Particles.animAngle=='withDirection'){
                rotation = angle -180;
                rotate = 0;
            }
            if(DR.Particles.animAngle && DR.Particles.animAngle=='noRotation'){
                rotation = 0;
                rotate = 0;
            }
            this.particleTab[uU] = {time:0,O:O,x:PX.x,y:PX.y,angle: angle, rotation: rotation, rotate:rotate, speed: 1, particleId: DR.Particles.id, particleTime: DR.Particles.time, particleXY: DR.Particles.XY};
        }
        if(DR.Particles.anim=='toCenter' || DR.Particles.anim=='toCenterOutside'){
            var angle =  parseInt(- (Math.atan2(PX.x,PX.y)*180/Math.PI))%360;
            this.particleTab[uU] = {time:0,O:O,x:PX.x,y:PX.y,angle: angle, rotation: angle, rotate:0, speed: 6, particleId: DR.Particles.id, particleTime: DR.Particles.time, particleXY: DR.Particles.XY};
        }
        if(DR.Particles.anim=='onOrbit'){
            var angle =  parseInt(- (Math.atan2(PX.x,PX.y)*180/Math.PI))%360;
            var obwod = Math.sqrt(PX.x*PX.x- -PX.y*PX.y)*2*Math.PI;
            var angleChange = 360/(obwod/3);
            if(Math.random() <= 0.5){
                angle-=90;
            }else{
                angle-=-90;
                angleChange=-angleChange;
            }
            this.particleTab[uU] = {time:0,O:O,x:PX.x,y:PX.y,angle: angle, angleChange: angleChange, rotation: angle, rotate: angleChange, speed: 3, particleId: DR.Particles.id, particleTime: DR.Particles.time, particleXY: DR.Particles.XY};
        }
        if(DR.Particles.anim=='withWind'){
            var angle =  O.windAngle;
            this.particleTab[uU] = {time:0,O:O,x:PX.x,y:PX.y,angle: angle, rotation: angle- -270, rotate:0, speed: 2, particleId: DR.Particles.id, particleTime: DR.Particles.time, particleXY: DR.Particles.XY};
        }
        AD.Next-=1;

    }

    this.showParticles = function(CanCon,Px,Py){
        var Radi = Math.PI*2/360;
        for(var p in this.particleTab){
            var T = this.particleTab[p];

            if(++T.time > T.particleTime){
                delete this.particleTab[p];
                continue;
            }
            T.x-=- T.speed * Math.sin( (-parseInt(T.angle)-180)*Radi);
            T.y-=- T.speed * Math.cos( (-parseInt(T.angle)-180)*Radi);
            T.rotation-=-T.rotate;

            CanCon.save();
            if(T.O.particlesOnBoard)
                CanCon.translate((T.x-Px).toFixed(0), (T.y-Py).toFixed(0));
            else
                CanCon.translate((T.O.x-Px- -T.x).toFixed(0), (T.O.y-Py- -T.y).toFixed(0));
            CanCon.rotate(Radi*T.rotation);
            var IMG =document.getElementById('CanvasManager_'+T.particleId+'_frame_'+T.time+'_');
            CanCon.drawImage(IMG,-T.particleXY,-T.particleXY);
            CanCon.restore();

            if(T.angleChange) T.angle-=-T.angleChange;
        }
    }

}
