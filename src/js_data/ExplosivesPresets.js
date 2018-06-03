BBAdata.ExplosivesPresets={};


BBAdata.ExplosivesPresets.ExplosionSize1={
    onHitDieExpire: {Do:'explode', DMG:{Dmg:4,T:'explo'}, Dist: 35}
};
BBAdata.ExplosivesPresets.ExplosionSize2={
    onHitDieExpire: {Do:'explode', DMG:{Dmg:7,T:'explo'}, Dist: 80}
};
BBAdata.ExplosivesPresets.ExplosionSize3={
    onHitDieExpire: {Do:'explode', DMG:{Dmg:11,T:'explo'}, Dist: 120}
};
BBAdata.ExplosivesPresets.ExplosionSize4={
    onHitDieExpire: {Do:'explode', DMG:{Dmg:18,T:'explo'}, Dist: 210}
};


BBAdata.ExplosivesPresets.LaserBomb={
    onHitDieExpire: {Do:'explode', explodeType: 'lasers', LaserRad: 45, RadType: 'random', LaserSpeed: 100, LaserSpeedPlus: 100, DMG:{Dmg:3,T:'energy'}},
    exploAddTo:{ onHitDieExpire: {
        Shards:[{
            explodePreset:'ExplosionSize1',
            ShardsNum: 1,
            Angle: 0,
            Dec: 0,
            Speed: 0,
        }]
    }}
};
BBAdata.ExplosivesPresets.DirectLaser={
    onHitDieExpire: {Do:'explode', explodeType: 'lasers', LaserRad: 360, RadType: 'parent', LaserSpeed: 300, LaserSpeedPlus: 0, DMG:{Dmg:3,T:'energy'}}
};
BBAdata.ExplosivesPresets.LaserABoom={
    explodePreset: 'ExplosionSize1',
    exploAddTo:{ onHitDieExpire: {
        Shards:[{
            ShardsNum: 12,
            explodePreset: 'DirectLaser',
            Angle: 0,
            AnglePlus: 30,
            AngleNext: 30,
            Dec: 4,
            DecPlus: 16,
            Speed: 10,
            SpeedPlus: 3,
        }]
    }}
};
BBAdata.ExplosivesPresets.LaserRay={
    onHitDieExpire: {Do:'explode', explodeType: 'lasers', LaserRad: 360, RadType: 'parent', LaserSpeed: 70, LaserSpeedPlus: 70, DMG:{Dmg:3,T:'energy'}},
    exploAddTo:{ onHitDieExpire: {
        Shards:[{
            onHitDieExpire: {Do:'explode', explodeType: 'lasers', LaserRad: 360, RadType: 'parent', LaserSpeed: 100, LaserSpeedPlus: 100, DMG:{Dmg:3,T:'energy'}},
            ShardsNum: 5,
            Angle: 30,
            AngleNext: -15,
            Dec: 0,
            Speed: 0,
        }]
    }}
};
BBAdata.ExplosivesPresets.GoombaLaser={
    onHitDieExpire: {Do:'explode', explodeType: 'lasers', LaserRad: 360, RadType: 'parent', LaserSpeed: 70, LaserSpeedPlus: 70, DMG:{Dmg:3,T:'energy'}},
    exploAddTo:{ onHitDieExpire: {
        Shards:[{
            onHitDieExpire: {Do:'explode', explodeType: 'lasers', LaserRad: 360, RadType: 'parent', LaserSpeed: 70, LaserSpeedPlus: 70, DMG:{Dmg:3,T:'energy'}},
            ShardsNum: 1,
            Angle: 30,
            AnglePlus: -60,
            Dec: 0,
            Speed: 0,
            CopyShardTimes: 8,
        }]
    }}
};

BBAdata.ExplosivesPresets.WarasteinExploCone={
    explodePreset: 'ExplosionSize1',
    exploAddTo:{ onExpire: { Shards:[
        {   Dec: 8, Speed: 7, Angle: -30,
            explodePreset: 'ExplosionSize1',
            exploAddTo:{ onExpire: { Shards:[
                {   Dec: 8, Speed: 7, Angle: -15,
                    explodePreset: 'ExplosionSize1',
                    exploAddTo:{ onExpire: { Shards:[
                        {   Dec: 12, Speed: 5, Angle: 0,
                            explodePreset: 'ExplosionSize2',
                        }]
                    }}
                }]
            }}
        },{ Dec: 16, Speed: 7, Angle: 0,
            explodePreset: 'ExplosionSize2',
            exploAddTo:{ onExpire: { Shards:[
                {   Dec: 12, Speed: 7, Angle: 0,
                    explodePreset: 'ExplosionSize3',
                }]
            }}
        },{ Dec: 8, Speed: 7, Angle: 30,
            explodePreset: 'ExplosionSize1',
            exploAddTo:{ onExpire: { Shards:[
                {   Dec: 8, Speed: 7, Angle: 15,
                    explodePreset: 'ExplosionSize1',
                    exploAddTo:{ onExpire: { Shards:[
                        {   Dec: 12, Speed: 5, Angle: 0,
                            explodePreset: 'ExplosionSize2',
                        }]
                    }}
                }]
            }}
        }
    ]}}
};


BBAdata.ExplosivesPresets.NailedMine={
    onHit: {Do:'explode', explodeType: 'nails', NailsRad: 24, NailsSpeed: 6, NailsSpeedPlus: 0, NailsDec: 45, NailsDecPlus: 0, NailsAngleCenter: 8, NailsAngleBoth: 1, NailsNeutral: true},
    onDie: {Do:'explode', explodeType: 'nails', NailsRad: 24, NailsSpeed: 6, NailsSpeedPlus: 0, NailsDec: 45, NailsDecPlus: 0, NailsAngleCenter: 8, NailsAngleBoth: 1, NailsNeutral: true}
};
BBAdata.ExplosivesPresets.NailedMine2={
    onHit: {Do:'explode', explodeType: 'nails', NailsRad: 24, NailsSpeed: 4, NailsSpeedPlus: 6, NailsDec: 16, NailsDecPlus: 6, NailsNeutral: true},
    onDie: {Do:'explode', explodeType: 'nails', NailsRad: 24, NailsSpeed: 4, NailsSpeedPlus: 6, NailsDec: 16, NailsDecPlus: 6, NailsNeutral: true}
};

BBAdata.ExplosivesPresets.ExplosionRose={
    explodePreset: 'ExplosionSize2',
    exploAddTo:{ onExpire: {
        Shards:[{
            ShardsNum: 5,
            explodePreset: 'ExplosionSize1',
            Angle: 0,
            AnglePlus: 72,
            AngleNext: 72,
            Dec: 12,
            DecPlus: 8,
            Speed: 5,
            SpeedPlus: 3,
        }]
    }}
};

BBAdata.ExplosivesPresets.HugeExplosionRose={
    explodePreset: 'ExplosionSize3',
    exploAddTo:{ onExpire: {
        Shards:[{
            ShardsNum: 5,
            explodePreset: 'ExplosionRose',
            Angle: 0,
            AnglePlus: 72,
            AngleNext: 72,
            Dec: 12,
            DecPlus: 8,
            Speed: 10,
            SpeedPlus: 3,
        }]
    }}
};

BBAdata.ExplosivesPresets.MineExplosionRose={
    explodePreset: 'ExplosionSize2',
    exploAddTo:{ onHitDieExpire: {
        Shards:[{
            ShardsNum: 5,
            explodePreset: 'ExplosionSize1',
            Angle: 0,
            AnglePlus: 72,
            AngleNext: 72,
            Dec: 12,
            DecPlus: 8,
            Speed: 5,
            SpeedPlus: 3,
        }]
    }}
};

BBAdata.ExplosivesPresets.NailsBigCircle={
    onHitDieExpire: {Do:'explode', explodeType: 'nails', NailsRad: 8, NailsSpeed: 10, NailsSpeedPlus: 0, NailsDec: 36, NailsDecPlus: 10, NailsAngleCenter: 8, NailsAngleBoth: 1},
};
BBAdata.ExplosivesPresets.NailsBigLongCircle={
    onHitDieExpire: {Do:'explode', explodeType: 'nails', NailsRad: 8, NailsSpeed: 10, NailsSpeedPlus: 0, NailsDec: 300, NailsDecPlus: 100, NailsAngleCenter: 8, NailsAngleBoth: 1},
};
BBAdata.ExplosivesPresets.NailsCircleToCenter={
    onHitDieExpire: {Do:'explode', explodeType: 'nails', NailsRad: 8, NailsSpeed: 6, NailsDec: 26, NailsAngleCenter: 7, NailsAngleBoth: 1, ringRadius: 100, NailsNeutral:true},
};
BBAdata.ExplosivesPresets.NailsCircleToCenter2={
    onHitDieExpire: {Do:'explode', explodeType: 'nails', NailsRad: 8, NailsSpeed: 6, NailsDec: 26, NailsAngleCenter: 7, NailsAngleBoth: 1, ringRadius: 100},
};
BBAdata.ExplosivesPresets.NailsBomb={
    onHitDieExpire: {Do:'explode', explodeType: 'nails', NailsRad: 12, NailsSpeed: 5, NailsSpeedPlus: 5, NailsDec: 6, NailsDecPlus: 6},
};
BBAdata.ExplosivesPresets.NailedBomb2={
    onHitDieExpire: {Do:'explode', explodeType: 'nails', NailsRad: 24, NailsSpeed: 4, NailsSpeedPlus: 6, NailsDec: 16, NailsDecPlus: 6},
};

BBAdata.ExplosivesPresets.NailsWirlpool={
    onHitDieExpire: {Do:'explode', explodeType: 'nails', NailsRad: 8, NailsSpeed: 5, NailsSpeedPlus: 5, NailsDec: 36, NailsDecPlus: 6, NailsAngleCenter: 8},
};

BBAdata.ExplosivesPresets.NailsWirlpool2={
    onHitDieExpire: {Do:'explode', explodeType: 'nails', NailsRad: 8, NailsSpeed: 0, NailsSpeedPlus: 10, NailsDec: 36, NailsDecPlus: 6, NailsAngleCenter: 8, NailsAngleBoth: 1},
};
BBAdata.ExplosivesPresets.HugeNailsWirlpool2={
    onHitDieExpire: {Do:'explode', explodeType: 'nails', NailsRad: 8, NailsSpeed: 8, NailsSpeedPlus: 6, NailsDec: 40, NailsDecPlus: 20, NailsAngleCenter: 2, NailsAngleBoth: 1},
};


BBAdata.ExplosivesPresets.NailsConePalm={
    onHitDieExpire: {Do:'explode', explodeType: 'nailsCone', Nails: 40, NailsRad: 220, NailsSpeed: 5, NailsSpeedPlus: 2, NailsDec: 28, NailsDecPlus: 6, NailsAngleCenter: 3},
};
BBAdata.ExplosivesPresets.HugeNailsConePalm={
    onHitDieExpire: {Do:'explode', explodeType: 'nailsCone', Nails: 40, NailsRad: 160, NailsSpeed: 7, NailsSpeedPlus: 4, NailsDec: 28, NailsDecPlus: 26, NailsAngleCenter: 3},
};
BBAdata.ExplosivesPresets.MineNailsConePalm={
    onHitDieExpire: {Do:'explode', explodeType: 'nailsCone', Nails: 26, NailsRad: 120, NailsSpeed: 8, NailsSpeedPlus: 4, NailsDec: 32, NailsDecPlus: 6, NailsAngleCenter: 3},
};

BBAdata.ExplosivesPresets.NailsConeMicro={
    onHitDieExpire: {Do:'explode', explodeType:'nailsCone', Nails: 20, NailsRad: 30, NailsSpeed: 5, NailsSpeedPlus: 5, NailsDec: 6, NailsDecPlus: 6},

};

BBAdata.ExplosivesPresets.NailsConeMedium={
    onHitDieExpire: {Do:'explode', explodeType: 'nailsCone', Nails: 20, NailsRad: 120, NailsSpeed: 5, NailsSpeedPlus: 2, NailsDec: 28, NailsDecPlus: 6, NailsAngleCenter: 3},
};

BBAdata.ExplosivesPresets.DestructionFieldGiant={
    onHitDieExpire: {Do:'explode', explodeType: 'Field', objName: 'RoundDestructionField', radius:200, PeriodDMG:{Dmg:1,T:'normal'}, PeriodTime: 40, PeriodOffset: 50, ExpireTime: 300},
};
BBAdata.ExplosivesPresets.DestructionFieldMedium={
    onHitDieExpire: {Do:'explode', explodeType: 'Field', objName: 'RoundDestructionField', radius:160, PeriodDMG:{Dmg:1,T:'normal'}, PeriodTime: 10, PeriodOffset: 10, ExpireTime: 300},
};
BBAdata.ExplosivesPresets.DestructionFieldSmall={
    onHitDieExpire: {Do:'explode', explodeType: 'Field', objName: 'RoundDestructionField', radius:35, PeriodDMG:{Dmg:1,T:'normal'}, PeriodTime: 10, PeriodOffset: 10, ExpireTime: 300},
};

BBAdata.ExplosivesPresets.MissileDestructionFieldSmall={
    onHit:    {Do:'explode', explodeType: 'Field', objName: 'RoundDestructionField', radius:50, PeriodDMG:{Dmg:1,T:'normal'}, PeriodTime: 10, PeriodOffset: 10, ExpireTime: 300},
    onExpire: {Do:'explode', explodeType: 'Field', objName: 'RoundDestructionField', radius:50, PeriodDMG:{Dmg:1,T:'normal'}, PeriodTime: 10, PeriodOffset: 10, ExpireTime: 300},
};
BBAdata.ExplosivesPresets.MissileDestructionFieldGiant={
    onHit:    {Do:'explode', explodeType: 'Field', objName: 'RoundDestructionField', radius:230, PeriodDMG:{Dmg:1,T:'normal'}, PeriodTime: 10, PeriodOffset: 10, ExpireTime: 300},
    onExpire: {Do:'explode', explodeType: 'Field', objName: 'RoundDestructionField', radius:230, PeriodDMG:{Dmg:1,T:'normal'}, PeriodTime: 10, PeriodOffset: 10, ExpireTime: 300},
};

BBAdata.ExplosivesPresets.BubbleMissile={
    onHitDieExpire: {Do:'explode', explodeType: 'Field', objName: 'RoundElectricityField', OneTimeEffect: 1, OneTimeOffset: 0, OneTimeDMG:{Dmg:3,T:'energy'}, OnDamageExpire:1, ExpireTime: 60, moveAlong: 5},
};
BBAdata.ExplosivesPresets.BubbleStorm={
    Dec: 30,
    Speed: 8,
    onExpire: {
        Do:'explode',
        explodeType: 'none',
        Shards:[{
            ShardsNum: 12,
            explodePreset: 'BubbleMissile',
            exploAddTo:{onHitDieExpire:{
                radius: 10,
                radiusPlus: 30,
            }},
            Dec: 5,
            DecPlus: 20,
            Speed: 4,
            SpeedPlus: 7,
            Angle: -30,
            AngleNext: 5,
        }]
    }
};

BBAdata.ExplosivesPresets.ExplosionWorm2={
    explodePreset: 'ExplosionSize1',
    exploAddTo:{ onExpire: {
        Shards:[{
            explodePreset: 'ExplosionSize2',
            Dec: 10,
            Speed: 8,
            Angle: -20,
            AnglePlus: 40,
            CopyShardTimes: 8,
        }]
    }}
};

BBAdata.ExplosivesPresets.ElectroBubble={
    onHitDieExpire: {Do:'explode', explodeType: 'Field', objName: 'RoundElectricityField', OneTimeEffect: 1, OneTimeOffset: 0, OneTimeDMG:{Dmg:3,T:'energy'}, ExpireTime:240, angle: 0, radius: 30, radiusPlus: 30},
};
BBAdata.ExplosivesPresets.ElectroBubbleShield={
    Dec: 30,
    Speed: 8,
    explodePreset: 'ElectroBubble',
    exploAddTo:{ onExpire: {
        Shards:[{
            explodePreset: 'ElectroBubble',
            Dec: 5,
            DecPlus: 5,
            Speed: 8,
            Angle: -90,
            exploAddTo:{ onExpire:{
                Shards:[{
                    CopyShardTimes: 3,
                    explodePreset: 'ElectroBubble',
                    Dec: 5,
                    DecPlus: 5,
                    Speed: 8,
                    Angle: -30,
                    AnglePlus: 40,
                }]
            }}
        },{
            explodePreset: 'ElectroBubble',
            Dec: 5,
            DecPlus: 5,
            Speed: 8,
            Angle: 90,
            exploAddTo:{ onExpire:{
                Shards:[{
                    CopyShardTimes: 3,
                    explodePreset: 'ElectroBubble',
                    Dec: 5,
                    DecPlus: 5,
                    Speed: 8,
                    Angle: 30,
                    AnglePlus: -40,
                }]
            }}
        }]
    }}
};

BBAdata.ExplosivesPresets.TeleField={
    onHitDieExpire: {Do:'explode', explodeType:'Field', objName: 'RoundPlayerTeleField', teleportOnHit: 'withAngle', teleportOnHitDist: 520, teleportOnHitDistPlus: 200, ExpireTime:90, moveAlong:6, radius: 30},
};
BBAdata.ExplosivesPresets.TeleFastField={
    onHitDieExpire: {Do:'explode', explodeType:'Field', objName: 'RoundTeleField', teleportOnHit: 'withAngle', teleportOnHitDist: 520, teleportOnHitDistPlus: 200, ExpireTime:60, moveAlong:12, radius: 45},
};

BBAdata.ExplosivesPresets.TeleWall={
    onExpire: {
        Do:'explode',
        explodeType: 'none',
        Shards:[{
            ShardsNum: 5,
            explodePreset: 'TeleField',
            Dec: 1,
            Speed: 8,
            Angle: -50,
            AngleNext: 25
        }]
    }
};

    // some to Y ship

BBAdata.ExplosivesPresets.EnergyBubble={
    onHitDieExpire: {Do:'explode', explodeType:'Field', objName: 'RoundShellField', bounceType:'diagonal', ExpireTime:240, angle: 0, radius: 45},
};
BBAdata.ExplosivesPresets.EnergyBubbleShield={
    Dec: 30,
    Speed: 8,
    explodePreset: 'EnergyBubble',
    exploAddTo:{ onExpire: {
        Shards:[{
            explodePreset: 'EnergyBubble',
            Dec: 7,
            Speed: 8,
            Angle: -100,
            exploAddTo:{ onExpire:{
                Shards:[{
                    CopyShardTimes: 3,
                    explodePreset: 'EnergyBubble',
                    Dec: 7,
                    Speed: 8,
                    Angle: -20,
                }]
            }}
        },{
            explodePreset: 'EnergyBubble',
            Dec: 7,
            Speed: 8,
            Angle: 100,
            exploAddTo:{ onExpire:{
                Shards:[{
                    CopyShardTimes: 3,
                    explodePreset: 'EnergyBubble',
                    Dec: 7,
                    Speed: 8,
                    Angle: 20,
                }]
            }}
        }]
    }}
};


BBAdata.ExplosivesPresets.MinePrison={};

BBAdata.ExplosivesPresets.ShieldBlob={
    onHitDieExpire:{
        Do:'explode',
        explodeType:'putObjs',
        objSpeed: 0,
        objMin:1,
        objName:'shieldBlob',
        objLists:{Ocomp:1,Omoving:1},
        life:6,
        lifeM:6,
        toDo:[{T:'slowDownAndDie'}],
        doingTime: 480,
        Flags:[],
    }
};
BBAdata.ExplosivesPresets.ShieldBlob2={
    onHitDieExpire:{
        Do:'explode',
        explodeType:'putObjs',
        objSpeed: 0,
        objMin:1,
        objName:'shieldBlob',
        objLists:{Ocomp:1,Omoving:1},
        life:6,
        lifeM:6,
        toDo:[{T:'slowDownAndDie', slowDownSpeed:3, slowDownBy:2, dieOffset:200, dieSpeed:10}],
        doingTime: 480,
        Flags:[],
    }
};
BBAdata.ExplosivesPresets.ShieldsBlobWall={
    Dec: 30,
    Speed: 8,
    explodePreset: 'ShieldBlob',
    exploAddTo:{ onExpire: {
        Shards:[{
            explodePreset: 'ShieldBlob',
            Dec: 4,
            Speed: 8,
            Angle: -93,
            exploAddTo:{ onExpire:{
                Shards:[{
                    CopyShardTimes: 4,
                    explodePreset: 'ShieldBlob',
                    Dec: 4,
                    Speed: 8,
                    Angle: -6,
                }]
            }}
        },{
            explodePreset: 'ShieldBlob',
            Dec: 4,
            Speed: 8,
            Angle: 93,
            exploAddTo:{ onExpire:{
                Shards:[{
                    CopyShardTimes: 4,
                    explodePreset: 'ShieldBlob',
                    Dec: 4,
                    Speed: 8,
                    Angle: 6,
                }]
            }}
        }]
    }}
};
BBAdata.ExplosivesPresets.ShieldsBlobBomb={
    exploAddTo:{
        onExpire: {
            Do:'explode',
            explodeType: 'none',
            Shards:[{
            ShardsNum: 12,
            explodePreset: 'ShieldBlob',
            exploAddTo:{onHitDieExpire:{ doingTime:20, moveAlong:6, life:3, lifeM:3 }},
            Dec: 1,
            Angle: 0,
            AngleNext: 30,
            Speed: 2,
        }]
    }}
};
BBAdata.ExplosivesPresets.ShieldsBlobMine={
    exploAddTo:{
        onHitDieExpire: {
            Do:'explode',
            explodeType: 'none',
            Shards:[{
            ShardsNum: 12,
            explodePreset: 'ShieldBlob2',
            exploAddTo:{onHitDieExpire:{ doingTime:8, moveAlong:6 }},
            Dec: 1,
            Angle: 0,
            AngleNext: 30,
            Speed: 2,
        }]
    }}
};

BBAdata.ExplosivesPresets.WindBall={
    onHitDieExpire: {Do:'explode', explodeType:'Field', objName: 'RoundWindField', ExpireTime:90, radius: 55, vectorType:'wind', vectorForce:5}
};
BBAdata.ExplosivesPresets.WindField={
    onHitDieExpire:{ Do:'explode', explodeType:'Field', objName: 'ConeWindField', ExpireTime:240, vectorType:'wind', vectorForce:5, windAngle:60, radius: 350, coneAngle: 50, coneRad2: 0, putAlong:true}
};

BBAdata.ExplosivesPresets.WindBalls={
    onExpire: {
        Do:'explode',
        explodeType: 'none',
        Shards:[{
            ShardsNum: 3,
            explodePreset: 'WindBall',
            exploAddTo:{onHitDieExpire:{ moveAlong:5 }},
            Dec: 1,
            Speed: 8,
            Angle: -30,
            AngleNext: 30
        }]
    }
};


BBAdata.ExplosivesPresets.EyeOfEvil={
    onExpire: {
        Do:'explode',
        explodeType: 'none',
        Shards:[{
            ShardsNum: 12,
            explodePreset: 'ExplosionSize1',
            Dec: 30,
            Speed: 0.1,
            Angle: 0,
            AngleNext: 30,
            TeleportMovement:{ Dist: 30, Angle: 270, AngleRand: 180},
        }]
    }
};

BBAdata.ExplosivesPresets.StrikeOfEvil={
    onExpire: {
        Do:'explode',
        explodeType: 'none',
        Shards:[{
            ShardsNum: 16,
            explodePreset: 'ExplosionSize1',
            Dec: 15,
            DecPlus: 20,
            Speed: 0.1,
            Angle: 0,
            TeleportMovement:{Dist: 20, Angle: 270, AngleRand: 180},
        }]
    }
};


BBAdata.ExplosivesPresets.SlowDownConeFields={
    onHitDieExpire:{ Do:'explode', explodeType:'Field', objName: 'ConeSlowDownShellField', SlowDownTo: 2.5, SlowDownBy: 11, ExpireTime: 240, radius: 160, coneAngle: 80, coneRad2: 110, putAlong:true}
};

BBAdata.ExplosivesPresets.TeleportConeField={
    onHitDieExpire:{ Do:'explode', explodeType:'Field', objName: 'ConeTeleField', ExpireTime:240, teleportOnHit: 'withAngle', teleportOnHitDist: 520, teleportOnHitDistPlus: 200, radius: 160, coneAngle: 80, coneRad2: 110, putAlong:true}
};

BBAdata.ExplosivesPresets.SetMine1={
    onExpire:{ Do:'explode', explodeType:'setMine', mineExplodePreset:{explodePreset:'NailedMine'},overWriteObjects:['MineMod_mediumCircle']}
};
BBAdata.ExplosivesPresets.EyeOfMines={
    onHit: {
        Do:'explode',
        explodeType: 'none',
        Shards:[{
            ShardsNum: 12,
            explodePreset: 'SetMine1',
            Dec: 3,
            Speed: 1,
            Angle: 0,
            AngleNext: 30,
            TeleportMovement:{ Dist: 30, Angle: 330, AngleRand: 60},
        }]
    }
};
BBAdata.ExplosivesPresets.StrikeOfMines={
    onExpire: {
        Do:'explode',
        explodeType: 'none',
        Shards:[{
            ShardsNum: 7,
            explodePreset: 'SetMine1',
            Dec: 10,
            DecPlus: 15,
            Speed: 0.1,
            Angle: 0,
            TeleportMovement:{ Dist: 20, Angle: 270, AngleRand: 180},
        }]
    }
};

BBAdata.ExplosivesPresets.MineZen={
    onExpire: {
        Do:'explode',
        explodeType: 'none',
        Shards:[{
            explodePreset: 'SetMine1',
            Dec: 7,
            Speed: 0.1,
            Angle: 180,
            TeleportMovement:{ Dist: 21, Angle: -90},
            exploAddTo:{ onExpire:{
                Shards:[{
                    CopyShardTimes: 11,
                    explodePreset: 'SetMine1',
                    Dec: 1,
                    Speed: 0.1,
                    Angle: 15,
                    TeleportMovement:{ Dist: 22, Angle: -15},
                }]
            }}
        },{
            explodePreset: 'SetMine1',
            Dec: 7,
            Speed: 0.1,
            Angle: 0,
            TeleportMovement:{ Dist: 21, Angle: -90},
            exploAddTo:{ onExpire:{
                Shards:[{
                    CopyShardTimes: 11,
                    explodePreset: 'SetMine1',
                    Dec: 1,
                    Speed: 0.1,
                    Angle: 15,
                    TeleportMovement:{ Dist: 22, Angle: -15},
                }]
            }}
        }]
    }
};

BBAdata.ExplosivesPresets.HealingField={
    onHitDieExpire: {Do:'explode', explodeType:'Field', objName: 'RoundHealingField', ExpireTime: 360, PeriodTime: 30, PeriodOffset: 5, PeriodHeal: 1, radius: 160},
};


BBAdata.ExplosivesPresets.StasisBulletWall={
    onHitDieExpire: {Do:'explode', explodeType: 'nailsCone', Nails: 40, NailsRad: 220, NailsSlowBy: 0.955, NailsSpeed: 8, NailsSpeedPlus: 4, NailsDec: 300, NailsDecPlus: 60, NailsAngleCenter:3},
};
BBAdata.ExplosivesPresets.StatisBulletBomb={
    onHitDieExpire: {Do:'explode', explodeType: 'nails', NailsRad: 10, NailsSlowBy: 0.95, NailsSpeed: 2, NailsSpeedPlus: 12, NailsDec: 300, NailsDecPlus: 60},
};

BBAdata.ExplosivesPresets.GraviBall={
    onHitDieExpire: {Do:'explode', explodeType:'Field', objName: 'RoundGravityField', vectorForce:9, ExpireTime:170, moveAlong:6, radius: 120},
};
