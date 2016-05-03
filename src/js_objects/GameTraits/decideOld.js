

    this.decideOLD = function(o){
        var O = this.O[o];
        var P = this.O[0];
        O.lastSpeedT = 0;

        var X = O.x-P.x;
        var Y = O.y-P.y;
        var Dist = Math.sqrt(X*X- -Y*Y);

        switch(O.T){
            break; case 'orhenes':
                if(Dist < 400 && O.ammo > 2000){
                    for(var i=0; i<8; ++i){
                        var L = this.putObj('carras','comp',O.S,O.x,O.y);
                        this.O[L].dec=600;
                        this.O[L].toDo='follow';
                        this.O[L].ammo=-100;
                    }
                    O.ammo=0;
                }
            break; case 'koriaz':
                if(O.ammo % 13 == 0){
                    var Site='A';
                    if(O.S==2) Site='B';
                    for(var q in this['Osite'+Site]){
                        var mX = O.x-this.O[q].x;
                        var mY = O.y-this.O[q].y;
                        if(Math.sqrt(mX*mX- -mY*mY) < 500){
                            this.addShield(q,14);
                        }

                    }
                }
            break; case 'vitotas':
                if(O.toDo!='follow' && O.toDo!='aimLaser' && O.doSquad==-1 && Dist < 400){
                    O.toDo='follow';
                    O.dec=600;
                }
                if(Dist < 400 && O.ammo > 220){
                    O.toDo='aimLaser';
                    var Angle = parseInt(- (Math.atan2(X,Y)*180/Math.PI))%360;
                    O.laserAngle = Angle;
                    Angle =(( Angle -O.angle)- -540)%360;
                    //  $('#O_'+o).append('<div class="object laserAiming hit_'+parseInt(this.tick/100)+'" style="height: '+O.Distance+'px; transform: rotate('+Angle+'deg);"></div>');
                    O.ammo=0;
                    O.dec = O.LaserAim;
                }
                if(O.toDo=='aimLaser' && O.dec == 1){
                    this.shootLaser(o,O.Distance,O.Damage);
                    if(O.doSquad==-1)
                        O.toDo='follow';
                }
            break; case 'fariax':
                if(O.ammo % 10 == 0){
                    var Site='A';
                    if(O.S==2) Site='B';
                    for(var q in this['Osite'+Site])
                        if(o!=q)
                        if(this.O[q].life < this.O[q].lifeM){
                            var mX = O.x-this.O[q].x;
                            var mY = O.y-this.O[q].y;
                            if(Math.sqrt(mX*mX- -mY*mY) < 300){
                                var Angle = parseInt(- (Math.atan2(mX,mY)*180/Math.PI))%360;
                                this.shootHealingMissle(o,q,Angle);
                                break;
                            }
                    }
                }
            break; case 'healing_missle':
                if(typeof this.O[O.target] == 'undefined'){
                    this.removeObj(o);
                    break;
                }
                var mX = O.x-this.O[O.target].x;
                var mY = O.y-this.O[O.target].y;
                O.angle = parseInt(- (Math.atan2(mX,mY)*180/Math.PI))%360;
                var DistE = Math.sqrt(mX*mX- -mY*mY);
                if(DistE < this.O[O.target].radius){
                    this.healObj(O.target,1,o);
                }
        }


        if(typeof O.shieldD != 'undefined' && --O.shieldD < 1){
          //  $('#O_'+o+' .shield').remove();
            delete O.shieldD;
        }
    }
