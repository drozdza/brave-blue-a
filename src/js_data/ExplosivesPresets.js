BBAdata['ExplosivesPresets']={


    ExplosionSize1:{
        onHitDieExpire: {Do:'explode', Power: 4, Dist: 35}
    },
    ExplosionSize2:{
        onHitDieExpire: {Do:'explode', Power: 7, Dist: 80}
    },
    ExplosionSize3:{
        onHitDieExpire: {Do:'explode', Power: 11, Dist: 120}
    },
    ExplosionSize4:{
        onHitDieExpire: {Do:'explode', Power: 18, Dist: 210}
    },


    WarasteinExploCone:{
        explosivePreset: 'ExplosionSize1',
        exploAddTo:{ onExpire: { Shards:[
            {   Dec: 8, Speed: 7, Angle: -30,
                explosivePreset: 'ExplosionSize1',
                exploAddTo:{ onExpire: { Shards:[
                    {   Dec: 8, Speed: 7, Angle: -15,
                        explosivePreset: 'ExplosionSize1',
                        exploAddTo:{ onExpire: { Shards:[
                            {   Dec: 12, Speed: 5, Angle: 0,
                                explosivePreset: 'ExplosionSize2',
                            }]
                        }}
                    }]
                }}
            },{ Dec: 16, Speed: 7, Angle: 0,
                explosivePreset: 'ExplosionSize2',
                exploAddTo:{ onExpire: { Shards:[
                    {   Dec: 12, Speed: 7, Angle: 0,
                        explosivePreset: 'ExplosionSize3',
                    }]
                }}
            },{ Dec: 8, Speed: 7, Angle: 30,
                explosivePreset: 'ExplosionSize1',
                exploAddTo:{ onExpire: { Shards:[
                    {   Dec: 8, Speed: 7, Angle: 15,
                        explosivePreset: 'ExplosionSize1',
                        exploAddTo:{ onExpire: { Shards:[
                            {   Dec: 12, Speed: 5, Angle: 0,
                                explosivePreset: 'ExplosionSize2',
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
        explosivePreset: 'ExplosionSize2',
        exploAddTo:{ onExpire: {
            Shards:[{
                ShardsNum: 5,
                explosivePreset: 'ExplosionSize1',
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
        explosivePreset: 'ExplosionSize3',
        exploAddTo:{ onExpire: {
            Shards:[{
                ShardsNum: 5,
                explosivePreset: 'ExplosionRose',
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
        explosivePreset: 'ExplosionSize2',
        exploAddTo:{ onHitDieExpire: {
            Shards:[{
                ShardsNum: 5,
                explosivePreset: 'ExplosionSize1',
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
    NailsBomb:{
        onHitDieExpire: {Do:'explode', explodeType: 'nails', NailsRad: 12, NailsSpeed: 5, NailsSpeedPlus: 5, NailsDec: 6, NailsDecPlus: 6},
    },

    NailsWirlpool:{
        onHitDieExpire: {Do:'explode', explodeType: 'nails', NailsRad: 8, NailsSpeed: 5, NailsSpeedPlus: 5, NailsDec: 36, NailsDecPlus: 6, NailsAngleCenter: 8},
    },

    NailsWirlpool2:{
        onHitDieExpire: {Do:'explode', explodeType: 'nails', NailsRad: 8, NailsSpeed: 0, NailsSpeedPlus: 10, NailsDec: 36, NailsDecPlus: 6, NailsAngleCenter: 8, NailsAngleBoth: 1},
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
        onHitDieExpire: {Do:'explode',explodeType: 'roundField', radius:200, fieldAnim: 'DestructionField', PeriodDamage: 1, PeriodTime: 40, PeriodOffset: 50, ExpireTime: 300, dontHit:['B','BE']},
    },

    DestructionFieldMedium:{
        onHitDieExpire: {Do:'explode',explodeType: 'roundField', radius:160, fieldAnim: 'DestructionField', PeriodDamage: 1, PeriodTime: 10, PeriodOffset: 10, ExpireTime: 300, dontHit:['B','BE']},
    },

    DestructionFieldSmall:{
        onHitDieExpire: {Do:'explode',explodeType: 'roundField', radius:35, fieldAnim: 'DestructionField', PeriodDamage: 1, PeriodTime: 10, PeriodOffset: 10, ExpireTime: 300, dontHit:['B','BE']},
    },

    MissileDestructionFieldSmall:{
        onHit:    {Do:'explode',explodeType: 'roundField', radius:50, fieldAnim: 'DestructionField', PeriodDamage: 1, PeriodTime: 10, PeriodOffset: 10, ExpireTime: 300, dontHit:['B','BE']},
        onExpire: {Do:'explode',explodeType: 'roundField', radius:50, fieldAnim: 'DestructionField', PeriodDamage: 1, PeriodTime: 10, PeriodOffset: 10, ExpireTime: 300, dontHit:['B','BE']},
    },
    MissileDestructionFieldGiant:{
        onHit:    {Do:'explode',explodeType: 'roundField', radius:230, fieldAnim: 'DestructionField', PeriodDamage: 1, PeriodTime: 10, PeriodOffset: 10, ExpireTime: 300, dontHit:['B','BE']},
        onExpire: {Do:'explode',explodeType: 'roundField', radius:230, fieldAnim: 'DestructionField', PeriodDamage: 1, PeriodTime: 10, PeriodOffset: 10, ExpireTime: 300, dontHit:['B','BE']},
    },

    BubbleMissle:{
        onHitDieExpire: {Do:'explode',explodeType:'roundField', fieldAnim: 'ElectricityField', OneTimeEffect: 1, OneTimeOffset: 0, OneTimeDamage: 3, OnDamageExpire:1, ExpireTime:60, moveAlong: 5, dontHit:['ME']},
    },
    BubbleStorm:{
        Dec: 30,
        Speed: 8,
        onExpire: {
            Do:'explode',
            explodeType: 'none',
            Shards:[{
                ShardsNum: 12,
                explosivePreset: 'BubbleMissle',
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
        explosivePreset: 'ExplosionSize1',
        exploAddTo:{ onExpire: {
            Shards:[{
                explosivePreset: 'ExplosionSize2',
                Dec: 10,
                Speed: 8,
                Angle: -20,
                AnglePlus: 40,
                CopyShardTimes: 8,
            }]
        }}
    },
};
