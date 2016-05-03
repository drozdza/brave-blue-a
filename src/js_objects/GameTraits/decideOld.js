

    this.decideOLD = function(o){
        var O = this.O[o];
        var P = this.O[0];
        O.lastSpeedT = 0;

        var X = O.x-P.x;
        var Y = O.y-P.y;
        var Dist = Math.sqrt(X*X- -Y*Y);

        switch(O.T){
            case 'royale':
                if(Dist < 400 && O.ammo > 120){
                    var Pe = [80,280,100,260,120,240,140,220];
                    var Angle = parseInt(- (Math.atan2(P.x-O.x,P.y-O.y)*180/Math.PI)- -180)%360;

                    for(var iki=0; iki<8; ++iki)
                        this.shootMissle(o, (Angle- -Pe[iki])%360, (12-parseInt(iki/2)*2),(95- -parseInt(iki/2)*20),(6-parseInt(iki/2)));
                    O.ammo=0;
                }
            break; case 'gargamon':    // how Squad?
                if(O.toDo!='goFollow' && O.toDo!='missleShoot' && Dist < 400 && O.ammo > 150){
                    O.toDo='goFollow';
                    O.dec = 31;
                }
                if(O.toDo=='goFollow'){
                    var X = O.x-P.x;
                    var Y = O.y-P.y;
                    var Angle = parseInt(- (Math.atan2(X,Y)*180/Math.PI)- -360)%360;
                    var Tyk = (O.angle-Angle- -360)%360;
                    if(Tyk > 180)        O.angle = (O.angle- -360- -4) %360;
                    else if(Tyk < 180)    O.angle = (O.angle- -360-4) %360;
                }
                if(O.toDo=='goFollow' && O.dec==1){
                    O.toDo='missleShoot';
                    O.dec=40;
                    O.ammo=0;
                }
                if(O.toDo=='missleShoot' && O.ammo==0)  this.shootMissle(o,O.angle- -30,15,150);
                if(O.toDo=='missleShoot' && O.ammo==8)  this.shootMissle(o,O.angle- -15,15,150);
                if(O.toDo=='missleShoot' && O.ammo==16) this.shootMissle(o,O.angle     ,15,150);
                if(O.toDo=='missleShoot' && O.ammo==24) this.shootMissle(o,O.angle - 15,15,150);
                if(O.toDo=='missleShoot' && O.ammo==32) this.shootMissle(o,O.angle - 30,15,150);

            break; case 'belzebub':
                if(Dist < 400 && O.ammo > 120){
                    var Angle = parseInt(- (Math.atan2(X,Y)*180/Math.PI))%360;
                    this.dropSpaceMine(o,Angle);
                    O.ammo=0;
                }
                if(O.ammo > 1000){
                    this.dropSpaceMine(o);
                    O.ammo=0;
                }
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
            break; case 'hiacynt':
                if(Dist < 500 && O.toDo!='follow' && O.toDo!='rest' && O.toDo!='attack' && O.doSquad==-1){
                    O.toDo = 'follow';
                    O.speed = 10;
                    O.dec = 400;
                }
                if(Dist < 100 && O.toDo=='follow'){
                    O.toDo = 'attack';
                    O.dec = 31;
                  //  if(O.ammo > 120) O.ammo = 120;
                }
                if(O.toDo=='attack' && (O.dec%3)==0){
                  //  O.ammo -= 11;
                    var Angle = parseInt(- (Math.atan2(X,Y)*180/Math.PI))%360;

                    var L = this.putObj('hiacynt_shield','comp',O.S,O.x,O.y);
                    this.O[L].angle = Angle - parseInt(Math.random()*40)- -20;
                    this.O[L].speed = 16;
                    this.O[L].dec = 70;
                }
                if(O.toDo=='attack' && O.dec==1){
                    O.toDo = 'rest';
                    O.dec = 200;
                    O.speed = 5;
                }
            break; case 'hiacynt_shield':
                if(O.dec==66 || O.dec==62 || O.dec==58 || O.dec==54 || O.dec==50 || O.dec==46 || O.dec==42 || O.dec==38)
                    O.speed-=2;

                if((O.dec==50 || O.dec==30 || O.dec==20 || O.dec==10) && O.life > 0){
                  //  $('#O_'+o).removeClass('life'+((O.life/O.lifeM).toFixed(1)*100));
                    O.life-=1;
                    CanvasManager.requestCanvas( o );
                  //  $('#O_'+o).addClass('life'+((O.life/O.lifeM).toFixed(1)*100));
                }
                if(O.dec==1)
                    this.removeObj(o);
            break;
        }


        if(typeof O.shieldD != 'undefined' && --O.shieldD < 1){
          //  $('#O_'+o+' .shield').remove();
            delete O.shieldD;
        }
    }
