GAMEobject.prototype.explodeBomb = function(o,explodeObj){
    var i,L,O = this.O[o];

    ++this.C['B_bombsExploded'];
    ++this.C['B_s'+O.S+'_bombsExploded'];

    if(explodeObj.explodeType=='nails'){
        var randQ = parseInt(Math.random()*360);
        for(i=0; i<360; i-=-explodeObj.NailsRad){
            var x = O.x;
            var y = O.y;
            if(explodeObj.ringRadius){
                x-=-explodeObj.ringRadius*Math.sin((-i-randQ)*(Math.PI/180));
                y-=-explodeObj.ringRadius*Math.cos((-i-randQ)*(Math.PI/180));
            }
            if(explodeObj.NailsNeutral)
                L = this.putBullet(3,x,y);
            else
                L = this.putBullet(O.S,x,y);
            this.O[ L ].speed = explodeObj.NailsSpeed;
            if(explodeObj.NailsSpeedPlus)
                this.O[ L ].speed-=-Math.random()*explodeObj.NailsSpeedPlus;
            this.O[ L ].dec = explodeObj.NailsDec;
            if(explodeObj.NailsDecPlus)
                this.O[ L ].dec-=-parseInt(Math.random()*explodeObj.NailsDecPlus);
            this.O[ L ].angle = i+randQ;
            if(explodeObj.ringRadius)
                if(explodeObj.NailsAngleBoth==1 && L%2==0)
                    this.O[ L ].angle-=-90;
                else
                    this.O[ L ].angle-= 90;

            if(explodeObj.NailsSlowBy)
                this.O[ L ].speedSlowBy = explodeObj.NailsSlowBy;

            this.O[ L ].DMG={Dmg:1,T:'normal'};
            if(explodeObj.NailsAngleCenter){
                if(explodeObj.NailsAngleBoth==1 && L%2==0)
                    this.O[ L ].speedT = - explodeObj.NailsAngleCenter;
                else
                    this.O[ L ].speedT = explodeObj.NailsAngleCenter;
            }
        }
    }
    else if(explodeObj.explodeType=='lasers'){
        var randQ = 0;
        if(explodeObj.RadType=='random')
            randQ = parseInt(Math.random()*360);
        if(explodeObj.RadType=='parent')
            randQ = O.angle;

        var ShardPoints = [];

        for(i=0; i<360; i-=-explodeObj.LaserRad){
            var Speed = explodeObj.LaserSpeed;
            if(explodeObj.LaserSpeedPlus)
                Speed-=-parseInt(Math.random()*explodeObj.LaserSpeedPlus);

            var iAngle = i+randQ;
            var ShootEnd = this.shootLaser(o, Speed, explodeObj.DMG, iAngle);
            ShardPoints.push({x:ShootEnd.x, y:ShootEnd.y, angle: iAngle});
        }
    }
    else if(explodeObj.explodeType=='nailsCone'){
        for(i=0; i<explodeObj.Nails; ++i){
            if(explodeObj.NailsNeutral)
                L = this.putBullet(3,O.x,O.y);
            else
                L = this.putBullet(O.S,O.x,O.y);
            this.O[ L ].angle = O.angle - explodeObj.NailsRad/2- -i*(explodeObj.NailsRad/explodeObj.Nails);
            this.O[ L ].speed = explodeObj.NailsSpeed;
            if(explodeObj.NailsSpeedPlus)
                this.O[ L ].speed-=-Math.random()*explodeObj.NailsSpeedPlus;
            this.O[ L ].dec = explodeObj.NailsDec;
            if(explodeObj.NailsDecPlus)
                this.O[ L ].dec-=-parseInt(Math.random()*explodeObj.NailsDecPlus);
            this.O[ L ].DMG={Dmg:1,T:'normal'};
            if(explodeObj.NailsAngleCenter)
                this.O[ L ].speedT = -((i- -0.5)/(explodeObj.Nails/2)- 1) * explodeObj.NailsAngleCenter;
            if(explodeObj.NailsSlowBy)
                this.O[ L ].speedSlowBy = explodeObj.NailsSlowBy;

        }
    }
    else if(explodeObj.explodeType=='RoundField' || explodeObj.explodeType=='ConeField'){

        L = this.putObj(explodeObj.explodeType,O.S,O.x,O.y);

        this.cloneDataToObj(L,explodeObj,['radius', 'coneAngle', 'coneRad2',
            'PeriodTime', 'PeriodOffset','PeriodHeal',
            'OneTimeEffect', 'OneTimeOffset', 'OnDamageExpire',
            'bounceForce', 'bounceType',
            'teleportOnHit', 'teleportOnHitDist', 'teleportOnHitDistPlus',
            'simpleFilling', 'fieldAnim',
            'vectorType', 'vectorForce',
            'SlowDownTo', 'SlowDownBy',
        ],['OneTimeDMG','PeriodDMG','dontHit','TeleportMovement']);

        this.O[ L ].DieTime = this.tick- -explodeObj.ExpireTime;

        if(explodeObj.explodeType=='ConeField')
            this.O[ L ].angle = O.angle;

        if(explodeObj.simpleFilling){
            this.O[ L ].TT='simpleFilling';
            CanvasManager.CBM.deleteObjectFromBackground(this.O[ L ]);
        }

        if(explodeObj.vectorForce)
            this.O[ L ].windAngle = O.angle;

        if(explodeObj.fieldAnim)
            this.setRegionAnimation(this.O[ L ], explodeObj.fieldAnim);

        if(explodeObj.moveAlong){
            this.O[ L ].angle = O.angle;
            this.O[ L ].speed = explodeObj.moveAlong;
            this.O[ L ].fieldAnimMoving = true;
            delete( this.O[ L ].view.onBackground );
            this.Omoving[ L ]=1;
        }
        this.initObject(this.O[L]);
    }
    else if(explodeObj.explodeType=='putObjs'){
        var objNumb = explodeObj.objMin;
        if(explodeObj.objRand) objNumb-=-parseInt(Math.random()*(explodeObj.objRand- -1));
        for(var i=0; i<objNumb; ++i){
            L = this.putObj(explodeObj.objName,O.S,O.x,O.y);
            if(explodeObj.objLists)
                this.putObj_changeLists(this.O[L], explodeObj.objLists);

            this.O[ L ].angle = O.angle;
            if(typeof explodeObj.objSpeed !='undefined')
                this.O[ L ].speed = explodeObj.objSpeed;

            this.cloneDataToObj(L,explodeObj,['life','lifeM','dec','doingTime'],['toDo','Flags']);

            if(explodeObj.objName=='shieldBlob')
                CanvasManager.requestCanvas( this.O[ L ] );
            if(explodeObj.moveAlong)
                this.O[ L ].speed = explodeObj.moveAlong;
            if(explodeObj.objRandAngle)
                this.O[ L ].angle = parseInt(Math.random()*360);

            this.initObject(this.O[L]);
        }
    }
    else if(explodeObj.explodeType=='setMine'){

        L = this.dropSpaceMine(O.S,O.x,O.y,false,{explodePreset:O.mineExplodePreset});
        // explodeType:'setMine', explodePreset:'NailedMine',overWriteObjects:['MineMod_mediumCircle']
    }
    else if(explodeObj.explodeType=='none'){}
    else {
        L = this.putObj('destruction_field',O.S,O.x,O.y);
        this.O[L].radius = explodeObj.Dist;
        this.O[L].ActiveTime = this.tick- -2;
        this.O[L].DieTime = this.tick- -6;
        this.O[L].PeriodDMG = cloneObj(explodeObj.DMG);
        this.O[L].PeriodTime = 10;
        this.O[L].dontHurtOwnMissile = true;
        this.O[L].dontHit=['B','BE'];
        this.O[L].undestructible=1;
        this.O[L].fiewOff=true;
        this.putObj_animation('explosion_'+explodeObj.Dist, O.x, O.y);
        this.initObject(this.O[L]);
    }

    if(explodeObj.Shards)
        for(var s in explodeObj.Shards){
            var Sh = explodeObj.Shards[s];
            var ShardsNum = 1;
            if(Sh.ShardsNum) ShardsNum = Sh.ShardsNum;

            if(typeof ShardPoints == 'undefined')
                var ShardPoints = [{x:O.x, y:O.y, angle:O.angle}];

            for(var iSP in ShardPoints){
                var SP = ShardPoints[iSP];

                var iAngle = (SP.angle- -Sh.Angle- -360)%360;
                if(Sh.AnglePlus) iAngle-=-parseInt(Math.random()*Sh.AnglePlus);

                for(var i=0; i<ShardsNum; ++i){
                    L = this.putObj('bullet_bomb',O.S,SP.x,SP.y);

                    if(i!=0 || Sh.AngleNext == 'undefined'){
                        if(Sh.AnglePlus) iAngle-=-parseInt(Math.random()*Sh.AnglePlus);
                    }
                    if(i!=0){
                        if(Sh.AngleNext) iAngle -=- Sh.AngleNext;
                    }

                    this.O[L].angle = iAngle;
                    this.O[L].speed = Sh.Speed;
                    this.O[L].doingTime = Sh.Dec;

                    if(Sh.SpeedPlus) this.O[ L ].speed-=-Math.random()*Sh.SpeedPlus;
                    if(Sh.DecPlus)   this.O[ L ].doingTime-=-parseInt(Math.random()*Sh.DecPlus);
                    this.cloneExplosionData(Sh, this.O[L]);
                    this.initObject(this.O[L]);
                }
            }
        }

    if(O.squadScheme)
        this.disbandSquad(O);
    if(O.squadDirectPlace)
        this.unbindWithSquad(this.O[ O.squadDirectPlace.o ], O.squadDirectPlace.i, o);


    this.removeObj(o);
}
GAMEobject.prototype.cloneExplosionData = function(D,O){
    if(D.onHit)    O.onHit    = cloneObj( D.onHit );
    if(D.onDie)    O.onDie    = cloneObj( D.onDie );
    if(D.onExpire) O.onExpire = cloneObj( D.onExpire );
    if(D.onHitDieExpire){
        O.onHit    = cloneObj( D.onHitDieExpire );
        O.onDie    = cloneObj( D.onHitDieExpire );
        O.onExpire = cloneObj( D.onHitDieExpire );
    }

    if(D.explodePreset)
        this.cloneExplosionData(BBAdata.ExplosivesPresets[ D.explodePreset ], O);

    if(D.TeleportMovement)
        O.TeleportMovement = cloneObj(D.TeleportMovement);


    if(D.exploAddTo)
        for(var onX in D.exploAddTo){
            var onY = {}; onY[onX]=1;
            if(onX == 'onHitDieExpire')
                onY = {onHit:1,onDie:1,onExpire:1};
            for(var onU in onY){
                for(var addX in D.exploAddTo[onX]){
                    if(typeof O[onU] == 'undefined') O[onU] = {};
                    O[onU][addX] = cloneObj(D.exploAddTo[onX][addX]);
                }

                if(O[onU].radiusPlus) O[onU].radius -=- parseInt(Math.random()*O[onU].radiusPlus);

                if(O[onU].Shards)
                    for(var i in O[onU].Shards)
                        if(O[onU].Shards[i].CopyShardTimes > 0){
                            O[onU].Shards[i].exploAddTo = {};
                            O[onU].Shards[i].exploAddTo[ onX ] = cloneObj( D.exploAddTo[ onX ] );
                            O[onU].Shards[i].exploAddTo[ onX ].Shards[i].CopyShardTimes--;
                        }
            }
        }
}
GAMEobject.prototype.cloneDataToObj = function(o,OBJ,simple,clone){
    for(var i in simple)
        if(typeof OBJ[ simple[i] ] != 'undefined')
            this.O[o][ simple[i] ] = OBJ[ simple[i] ];

    for(var i in clone)
        if(typeof OBJ[ clone[i] ] != 'undefined')
            this.O[o][ clone[i] ] = cloneObj( OBJ[ clone[i] ] );

}
