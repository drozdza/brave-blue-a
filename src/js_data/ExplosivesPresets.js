BBAdata['ExplosivesPresets']={


    ExplosionSize1:{
        onHitDieExpire: {Do:'explode', DMG:{Dmg:4,T:'explo'}, Dist: 35}
    },
    ExplosionSize2:{
        onHitDieExpire: {Do:'explode', DMG:{Dmg:7,T:'explo'}, Dist: 80}
    },
    ExplosionSize3:{
        onHitDieExpire: {Do:'explode', DMG:{Dmg:11,T:'explo'}, Dist: 120}
    },
    ExplosionSize4:{
        onHitDieExpire: {Do:'explode', DMG:{Dmg:18,T:'explo'}, Dist: 210}
    },


    LaserBomb:{
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
    },
    LaserABoom:{
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
    },
    DirectLaser:{
        onHitDieExpire: {Do:'explode', explodeType: 'lasers', LaserRad: 360, RadType: 'parent', LaserSpeed: 300, LaserSpeedPlus: 0, DMG:{Dmg:3,T:'energy'}}
    },
    LaserRay:{
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
    },
    GoombaLaser:{
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
    },

    WarasteinExploCone:{
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
    },


    NailedMine:{
        onHit: {Do:'explode', explodeType: 'nails', NailsRad: 24, NailsSpeed: 6, NailsSpeedPlus: 0, NailsDec: 45, NailsDecPlus: 0, NailsAngleCenter: 8, NailsAngleBoth: 1, NailsNeutral: true},
        onDie: {Do:'explode', explodeType: 'nails', NailsRad: 24, NailsSpeed: 6, NailsSpeedPlus: 0, NailsDec: 45, NailsDecPlus: 0, NailsAngleCenter: 8, NailsAngleBoth: 1, NailsNeutral: true}
    },
    NailedMine2:{
        onHit: {Do:'explode', explodeType: 'nails', NailsRad: 24, NailsSpeed: 4, NailsSpeedPlus: 6, NailsDec: 16, NailsDecPlus: 6, NailsNeutral: true},
        onDie: {Do:'explode', explodeType: 'nails', NailsRad: 24, NailsSpeed: 4, NailsSpeedPlus: 6, NailsDec: 16, NailsDecPlus: 6, NailsNeutral: true}
    },

    ExplosionRose:{
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
    },

    HugeExplosionRose:{
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
    },

    MineExplosionRose:{
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
    },

    NailsBigCircle:{
        onHitDieExpire: {Do:'explode', explodeType: 'nails', NailsRad: 8, NailsSpeed: 10, NailsSpeedPlus: 0, NailsDec: 36, NailsDecPlus: 10, NailsAngleCenter: 8, NailsAngleBoth: 1},
    },
    NailsBigLongCircle:{
        onHitDieExpire: {Do:'explode', explodeType: 'nails', NailsRad: 8, NailsSpeed: 10, NailsSpeedPlus: 0, NailsDec: 300, NailsDecPlus: 100, NailsAngleCenter: 8, NailsAngleBoth: 1},
    },
    NailsCircleToCenter:{
        onHitDieExpire: {Do:'explode', explodeType: 'nails', NailsRad: 8, NailsSpeed: 6, NailsDec: 26, NailsAngleCenter: 7, NailsAngleBoth: 1, ringRadius: 100, NailsNeutral:true},
    },
    NailsCircleToCenter2:{
        onHitDieExpire: {Do:'explode', explodeType: 'nails', NailsRad: 8, NailsSpeed: 6, NailsDec: 26, NailsAngleCenter: 7, NailsAngleBoth: 1, ringRadius: 100},
    },
    NailsBomb:{
        onHitDieExpire: {Do:'explode', explodeType: 'nails', NailsRad: 12, NailsSpeed: 5, NailsSpeedPlus: 5, NailsDec: 6, NailsDecPlus: 6},
    },
    NailedBomb2:{
        onHitDieExpire: {Do:'explode', explodeType: 'nails', NailsRad: 24, NailsSpeed: 4, NailsSpeedPlus: 6, NailsDec: 16, NailsDecPlus: 6},
    },

    NailsWirlpool:{
        onHitDieExpire: {Do:'explode', explodeType: 'nails', NailsRad: 8, NailsSpeed: 5, NailsSpeedPlus: 5, NailsDec: 36, NailsDecPlus: 6, NailsAngleCenter: 8},
    },

    NailsWirlpool2:{
        onHitDieExpire: {Do:'explode', explodeType: 'nails', NailsRad: 8, NailsSpeed: 0, NailsSpeedPlus: 10, NailsDec: 36, NailsDecPlus: 6, NailsAngleCenter: 8, NailsAngleBoth: 1},
    },
    HugeNailsWirlpool2:{
        onHitDieExpire: {Do:'explode', explodeType: 'nails', NailsRad: 8, NailsSpeed: 8, NailsSpeedPlus: 6, NailsDec: 40, NailsDecPlus: 20, NailsAngleCenter: 2, NailsAngleBoth: 1},
    },


    NailsConePalm: {
        onHitDieExpire: {Do:'explode',explodeType: 'nailsCone', Nails: 40, NailsRad: 220, NailsSpeed: 5, NailsSpeedPlus: 2, NailsDec: 28, NailsDecPlus: 6, NailsAngleCenter: 3},
    },
    HugeNailsConePalm: {
        onHitDieExpire: {Do:'explode',explodeType: 'nailsCone', Nails: 40, NailsRad: 160, NailsSpeed: 7, NailsSpeedPlus: 4, NailsDec: 28, NailsDecPlus: 26, NailsAngleCenter: 3},
    },
    MineNailsConePalm: {
        onHitDieExpire: {Do:'explode',explodeType: 'nailsCone', Nails: 26, NailsRad: 120, NailsSpeed: 8, NailsSpeedPlus: 4, NailsDec: 32, NailsDecPlus: 6, NailsAngleCenter: 3},
    },

    NailsConeMicro:{
        onHitDieExpire: {Do:'explode',explodeType: 'nailsCone', Nails: 20, NailsRad: 30, NailsSpeed: 5, NailsSpeedPlus: 5, NailsDec: 6, NailsDecPlus: 6},

    },

    NailsConeMedium:{
        onHitDieExpire: {Do:'explode',explodeType: 'nailsCone', Nails: 20, NailsRad: 120, NailsSpeed: 5, NailsSpeedPlus: 2, NailsDec: 28, NailsDecPlus: 6, NailsAngleCenter: 3},
    },

    DestructionFieldGiant:{
        onHitDieExpire: {Do:'explode',explodeType: 'RoundField', radius:200, fieldAnim: 'DestructionField', PeriodDMG:{Dmg:1,T:'normal'}, PeriodTime: 40, PeriodOffset: 50, ExpireTime: 300, dontHit:['B','BE']},
    },

    DestructionFieldMedium:{
        onHitDieExpire: {Do:'explode',explodeType: 'RoundField', radius:160, fieldAnim: 'DestructionField', PeriodDMG:{Dmg:1,T:'normal'}, PeriodTime: 10, PeriodOffset: 10, ExpireTime: 300, dontHit:['B','BE']},
    },

    DestructionFieldSmall:{
        onHitDieExpire: {Do:'explode',explodeType: 'RoundField', radius:35, fieldAnim: 'DestructionField', PeriodDMG:{Dmg:1,T:'normal'}, PeriodTime: 10, PeriodOffset: 10, ExpireTime: 300, dontHit:['B','BE']},
    },

    MissileDestructionFieldSmall:{
        onHit:    {Do:'explode',explodeType: 'RoundField', radius:50, fieldAnim: 'DestructionField', PeriodDMG:{Dmg:1,T:'normal'}, PeriodTime: 10, PeriodOffset: 10, ExpireTime: 300, dontHit:['B','BE']},
        onExpire: {Do:'explode',explodeType: 'RoundField', radius:50, fieldAnim: 'DestructionField', PeriodDMG:{Dmg:1,T:'normal'}, PeriodTime: 10, PeriodOffset: 10, ExpireTime: 300, dontHit:['B','BE']},
    },
    MissileDestructionFieldGiant:{
        onHit:    {Do:'explode',explodeType: 'RoundField', radius:230, fieldAnim: 'DestructionField', PeriodDMG:{Dmg:1,T:'normal'}, PeriodTime: 10, PeriodOffset: 10, ExpireTime: 300, dontHit:['B','BE']},
        onExpire: {Do:'explode',explodeType: 'RoundField', radius:230, fieldAnim: 'DestructionField', PeriodDMG:{Dmg:1,T:'normal'}, PeriodTime: 10, PeriodOffset: 10, ExpireTime: 300, dontHit:['B','BE']},
    },

    BubbleMissile:{
        onHitDieExpire: {Do:'explode',explodeType:'RoundField', fieldAnim: 'ElectricityField', OneTimeEffect: 1, OneTimeOffset: 0, OneTimeDMG:{Dmg:3,T:'energy'}, OnDamageExpire:1, ExpireTime:60, moveAlong: 5, dontHit:['ME','M']},
    },
    BubbleStorm:{
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
    },

    ExplosionWorm2:{
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
    },

    ElectroBubble:{
        onHitDieExpire: {Do:'explode', explodeType:'RoundField', fieldAnim: 'ElectricityField', OneTimeEffect: 1, OneTimeOffset: 0, OneTimeDMG:{Dmg:3,T:'energy'}, OnDamageExpire:1, ExpireTime:240, angle: 0, dontHit:['ME','E','BE','A','B'], radius: 30, radiusPlus: 30},
    },
    ElectroBubbleShield:{
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
    },

    TeleField:{
        onHitDieExpire: {Do:'explode', explodeType:'RoundField', simpleFilling: 'rgba(0,0,255,0.2)', teleportOnHit: 'withAngle',  teleportOnHitDist: 520, teleportOnHitDistPlus: 200, ExpireTime:90, moveAlong:6, dontHit:['ME','E','BE','A','B'], radius: 30},
    },
    TeleFastField:{
        onHitDieExpire: {Do:'explode', explodeType:'RoundField', simpleFilling: 'rgba(0,0,255,0.2)', teleportOnHit: 'withAngle',  teleportOnHitDist: 520, teleportOnHitDistPlus: 200, ExpireTime:60, moveAlong:12, dontHit:['ME','E','BE','A','B'], radius: 45},
    },

    TeleWall:{
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
    },

    // some to Y ship

    EnergyBubble:{
        onHitDieExpire: {Do:'explode', explodeType:'RoundField', fieldAnim:'ShellField', bounceType:'diagonal', ExpireTime:240, angle: 0, dontHit:['ME','E','BE','A'], radius: 45},
    },
    EnergyBubbleShield:{
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
    },


    MinePrison:{},

    ShieldBlob:{
        onHitDieExpire:{Do:'explode', explodeType:'putObjs', objSpeed: 0, objMin:1, objName:'shieldBlob', objType:'comp', life:6,lifeM:6, toDo:[{T:'slowDownAndDie'}], doingTime: 480, Flags:[]}
    },
    ShieldsBlobWall:{
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
    },
    ShieldsBlobBomb:{
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
    },

    WindBall:{
        onHitDieExpire: {Do:'explode', explodeType:'RoundField', fieldAnim:'WindField', ExpireTime:90, dontHit:['ME','E','BE','A'], radius: 55, vectorType:'wind', vectorForce:5}},
    WindBalls:{
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
    },

    WindField:{
        onHitDieExpire:{ Do:'explode', explodeType:'ConeField', fieldAnim:'WindField', ExpireTime:240, dontHit:['ME','E','BE','A'], vectorType:'wind', vectorForce:5, windAngle:60, radius: 350, coneAngle: 50, coneRad2: 0}
    },

    EyeOfEvil:{
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
    },

    StrikeOfEvil:{
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
    },


    SlowDownConeFields:{
        onHitDieExpire:{ Do:'explode', explodeType:'ConeField', fieldAnim: 'ShellField', SlowDownTo: 2.5, SlowDownBy: 11, dontHit:['E','ME','BE'], ExpireTime: 240, radius: 160, coneAngle: 80, coneRad2: 110}
    },

    TeleportConeField:{
        onHitDieExpire:{ Do:'explode', explodeType:'ConeField', simpleFilling: 'rgba(0,0,255,0.2)', ExpireTime:240, dontHit:['ME','E','BE','A'], teleportOnHit: 'withAngle', teleportOnHitDist: 520, teleportOnHitDistPlus: 200, radius: 160, coneAngle: 80, coneRad2: 110}
    },

    SetMine1:{
        onExpire:{ Do:'explode', explodeType:'setMine', mineExplodePreset:{explodePreset:'NailedMine'},overWriteObjects:['MineMod_mediumCircle']}
    },
    EyeOfMines:{
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
    },
    StrikeOfMines:{
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
    },

    MineZen:{
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
    },

    HealingField:{
        onHitDieExpire: {Do:'explode', explodeType:'RoundField', fieldAnim: 'HealingField', ExpireTime: 360, PeriodTime: 30, PeriodOffset: 5, PeriodHeal: 1, dontHit:['P','M','B','A'], radius: 160},
    },


    StasisBulletWall:{
        onHitDieExpire: {Do:'explode', explodeType: 'nailsCone', Nails: 40, NailsRad: 220, NailsSlowBy: 0.955, NailsSpeed: 8, NailsSpeedPlus: 4, NailsDec: 300, NailsDecPlus: 60, NailsAngleCenter:3},
    },
    StatisBulletBomb:{
        onHitDieExpire: {Do:'explode', explodeType: 'nails', NailsRad: 10, NailsSlowBy: 0.95, NailsSpeed: 2, NailsSpeedPlus: 12, NailsDec: 300, NailsDecPlus: 60},
    },

    GraviBall:{
        onHitDieExpire: {Do:'explode', explodeType:'RoundField', fieldAnim: 'GravityField', vectorType:'gravity',vectorForce:9, ExpireTime:170, moveAlong:6, dontHit:['ME','E','BE','A','B'], radius: 120},
    },

};
