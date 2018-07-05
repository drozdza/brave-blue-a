GAMEobject.prototype.oLook = function(O){
    var P = this.O[0];
    var Look = O.LookArr[O.LookType];
    var PlayerDist = getDistAB(O,P);

    O.LookTick -=- Look.ticks;

    if((Look.T=='single' || Look.T=='double') && PlayerDist < Look.Rad){
        O.Flags.spotEnemyFlag = true;
        this.oFlag_Add(O, 'VI_ISeeEnemy');
        return true;
    }
    if(Look.T=='double' && !O.Flags.spotEnemyFlag){
        var PlayerAngle = getAngleAB(O,P);
        var A = (PlayerAngle -O.angle- -720- -Look.Angle2)%360;
        if(PlayerDist < Look.Rad2 && A < Look.Angle2*2){
            this.oFlag_Add(O, 'VI_ISeeEnemy');
            return true;
        }
    }
    // Szukamy grupy i pocisku
    // if(!O.Flags.awareAboutEnemy){
    //     for(var U in this.Odead){
    //         var uX = O.x-this.Odead[U].x;
    //         var uY = O.y-this.Odead[U].y;
    //         var uDist = Math.sqrt(uX*uX- -uY*uY);
    //         var uAngle = parseInt(- (Math.atan2(uX,uY)*180/Math.PI))%360;
    //         if((Look.T=='single' || Look.T=='double') && uDist < Look.Rad){
                    // this.oFlag_Add(O, 'II_EnemyIsThere');
                    // return true;
    //         }
    //         if(Look.T=='double' && !O.Flags.spotEnemyFlag){
    //             var uA = (uAngle -O.angle- -720- -Look.Angle2)%360;
    //             if(uDist < Look.Rad2 && uA < Look.Angle2*2){
                    // this.oFlag_Add(O, 'II_EnemyIsThere');
                    // return true;
    //             }
    //         }
    //     }
    // }

}
