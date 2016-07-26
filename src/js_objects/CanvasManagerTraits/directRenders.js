
CanvasManagerObject.prototype.directRenders={
    TP_track:{
        frames: 18,
        states:{
            0:{ width: 1, color: [0,0,255,1]},
            8:{ width: 4, color: [128,128,255,1]},
            17:{ width: 2, color: [255,255,255,1]}
        },
    },
    TP_trackDark:{
        frames: 18,
        states:{
            0:{ width: 1, color: [20,0,0,1]},
            8:{ width: 4, color: [255,0,0,1]},
            17:{ width: 2, color: [20,0,0,1]}
        },
    },
    dmgTransfer:{
        frames: 11,
        states:{
            0:{ width: 1, color: [255,0,0,0.3]},
            3:{ width: 2, color: [255,0,0,1]},
            11:{ width: 1, color: [255,0,0,0]}
        },
    },
    addShield:{
        frames: 9,
        states:{
            0:{ width: 0, color: [0,255,255,0.3]},
            2:{ width: 1, color: [0,255,255,1]},
            8:{ width: 0, color: [0,255,255,0]}
        },
    },
    laserShoot:{
        frames: 12,
        states:{
            0:{ width2: 2, color2: [0,0,255,1], color: [0,0,0,0], width: 4},
            5:{ width2: 8, color2: [128,128,255,1], color: [255,255,255,0.5], width: 10},
            11:{ width2: 4, color2: [255,255,255,1], color: [255,255,255,0.1], width: 12}
        },
    },
    DestrFieldStart:{
        frames: 15,
        states:{
            0:{color:[255,0,0,0]},
            15:{color:[255,0,0,0.3]},
        },
        onEnd:'DestrFieldGoing',
        makeParticles:7,
        particleId:'des_field',
        particleTime:59,
        particleXY: 35,
        particleAnim:'randomMove',
    },
    DestrFieldGoing:{
        color:[255,0,0,0.3],
        makeParticles:60,
        particleId:'des_field',
        particleTime:59,
        particleXY: 35,
        particleAnim:'randomMove',
        onExpire:'DestrFieldEnd',
        toExpire:50,
    },
    DestrFieldEnd:{
        frames: 50,
        states:{
            0:{color:[255,0,0,0.3]},
            37:{color:[255,0,0,0.1]},
            50:{color:[255,0,0,0]},
        },
    },
    GravFieldStart:{
        frames: 15,
        gradientStops: 4,
        states:{
            0:{color0:[180,180,255,0],    color1:[180,180,180,0],   color2:[180,180,180,0],   color3:[0,0,0,0], stop0:0,stop1:0.1,stop2:0.2,stop3:1},
            15:{color0:[180,180,255,0.2], color1:[180,180,180,0.1], color2:[180,180,180,0.1], color3:[0,0,0,0], stop0:0.15,stop1:0.85,stop2:1,stop3:1},
        },
        onEnd:'GravFieldGoing',
        makeParticles:30,
        particleId:'grav_field',
        particleTime:19,
        particleXY: 25,
        particleAnim:'toCenter',
    },
    GravFieldGoing:{
        gradientStops: 4,
        color0:[180,180,255,0.2], color1:[180,180,180,0.1], color2:[180,180,180,0.1], color3:[0,0,0,0], stop0:0.15,stop1:0.85,stop2:1,stop3:1,
        makeParticles:40,
        particleId:'grav_field',
        particleTime:19,
        particleXY: 25,
        particleAnim:'toCenter',
        onExpire:'GravFieldEnd',
        toExpire:50,
    },
    GravFieldEnd:{
        frames: 50,
        gradientStops: 4,
        states:{
            0:{color0:[180,180,255,0.2],  color1:[180,180,180,0.1], color2:[180,180,180,0.1], color3:[0,0,0,0], stop0:0.15,stop1:0.85,stop2:1,stop3:1},
            40:{color0:[180,180,255,0.2], color1:[180,180,180,0.1], color2:[180,180,180,0.1], color3:[0,0,0,0], stop0:0.7,stop1:1,stop2:1,stop3:1},
            50:{color0:[180,180,255,0],   color1:[180,180,180,0],   color2:[180,180,180,0],   color3:[0,0,0,0], stop0:1,stop1:1,stop2:1,stop3:1},
        },
    },
    OrbFieldStart:{
        frames: 15,
        gradientStops: 4,
        states:{
            0:{color0:[180,180,255,0],    color1:[180,180,180,0],   color2:[180,180,180,0],   color3:[0,0,0,0], stop0:0,stop1:0.1,stop2:0.2,stop3:1},
            15:{color0:[180,180,255,0.2], color1:[180,180,180,0.1], color2:[180,180,180,0.1], color3:[0,0,0,0], stop0:0.15,stop1:0.85,stop2:1,stop3:1},
        },
        onEnd:'OrbFieldGoing',
        makeParticles:30,
        particleId:'wind_field',
        particleTime:30,
        particleXY: 15,
        particleAnim:'onOrbit',
    },
    OrbFieldGoing:{
        gradientStops: 4,
        color0:[180,180,255,0.2], color1:[180,180,180,0.1], color2:[180,180,180,0.1], color3:[0,0,0,0], stop0:0.15,stop1:0.85,stop2:1,stop3:1,
        makeParticles:40,
        particleId:'wind_field',
        particleTime:30,
        particleXY: 15,
        particleAnim:'onOrbit',
        onExpire:'OrbFieldEnd',
        toExpire:50,
    },
    OrbFieldEnd:{
        frames: 50,
        gradientStops: 4,
        states:{
            0:{color0:[180,180,255,0.2],  color1:[180,180,180,0.1], color2:[180,180,180,0.1], color3:[0,0,0,0], stop0:0.15,stop1:0.85,stop2:1,stop3:1},
            40:{color0:[180,180,255,0.2], color1:[180,180,180,0.1], color2:[180,180,180,0.1], color3:[0,0,0,0], stop0:0.7,stop1:1,stop2:1,stop3:1},
            50:{color0:[180,180,255,0],   color1:[180,180,180,0],   color2:[180,180,180,0],   color3:[0,0,0,0], stop0:1,stop1:1,stop2:1,stop3:1},
        },
    },
    WindFieldStart:{
        frames: 15,
        states:{
            0:{color:[80,80,80,0]},
            15:{color:[80,80,80,0.2]},
        },
        onEnd:'WindFieldGoing',
        makeParticles:30,
        particleId:'wind_field',
        particleTime:30,
        particleXY: 15,
        particleAnim:'withWind',
    },
    WindFieldGoing:{
        color:[80,80,80,0.2],
        makeParticles:80,
        particleId:'wind_field',
        particleTime:30,
        particleXY: 15,
        particleAnim:'withWind',
        onExpire:'WindFieldEnd',
        toExpire:20,
    },
    WindFieldEnd:{
        frames: 20,
        states:{
            0:{color:[80,80,80,0.2]},
            20:{color:[80,80,80,0]},
        },
    },
    ShellFieldStart:{
        frames: 15,
        gradientStops: 3,
        states:{
            0:{color0:[255,255,0,0],    color1:[255,255,0,0.4], color2:[255,255,0,0],   stop0:0.1,stop1:0.3,stop2:1},
            15:{color0:[255,255,0,0.1], color1:[255,255,0,0.8], color2:[255,255,0,0.2], stop0:0.60,stop1:1,stop2:1},
        },
        onEnd:'ShellFieldGoing',
    },
    ShellFieldGoing:{
        gradientStops: 3,
        color0:[255,255,0,0.05],    color1:[255,255,0,0.3],    color2:[255,255,0,0.2],    stop0:0.60,stop1:1,stop2:1,
        onExpire:'ShellFieldEnd',
        toExpire:20,
    },
    ShellFieldEnd:{
        frames: 20,
        gradientStops: 3,
        states:{
            0:{color0:[255,255,0,0.1],  color1:[255,255,0,0.8], color2:[255,255,0,0.2], stop0:0.75,stop1:1,stop2:1},
            40:{color0:[255,255,0,0.2], color1:[255,255,0,0.1], color2:[255,255,0,0.1], stop0:0.7,stop1:1,stop2:1},
            50:{color0:[255,255,0,0],   color1:[255,255,0,0],   color2:[255,255,0,0],   stop0:1,stop1:1,stop2:1},
        },
    },
    EleFieldStart:{
        frames: 15,
        gradientStops: 3,
        states:{
            0:{color0:[0,120,255,0],    color1:[0,120,255,0.4], color2:[0,120,255,0],   stop0:0.1,stop1:0.3,stop2:1},
            15:{color0:[0,120,255,0.1], color1:[0,120,255,0.6], color2:[0,120,255,0.2], stop0:0.3,stop1:1,stop2:1},
        },
        makeParticles:80,
        particleId:'ele_field',
        particleTime:30,
        particleXY: 20,
        particleAnim:'randomMove',
        particleAnimAngle: 'withDirection',
        onEnd:'EleFieldGoing',
    },
    EleFieldGoing:{
        gradientStops: 3,
        color0:[0,120,255,0.05],    color1:[0,120,255,0.6],    color2:[0,120,255,0.2],    stop0:0.3,stop1:1,stop2:1,
        makeParticles:80,
        particleId:'ele_field',
        particleTime:30,
        particleXY: 20,
        particleAnim:'randomMove',
        particleAnimAngle: 'withDirection',
        onExpire:'EleFieldEnd',
        toExpire:20,
    },
    EleFieldEnd:{
        frames: 25,
        gradientStops: 4,
        states:{
            0:{color0:[0,120,255,0.1],  color1:[0,120,255,0.6], color2:[0,120,255,0.2], color3:[0,0,0,0], stop0:0.3,stop1:1,stop2:1,stop3:1},
            12:{color0:[0,120,255,0.2], color1:[0,120,255,0.1], color2:[0,120,255,0.1], color3:[0,0,0,0], stop0:0.2,stop1:0.4,stop2:0.6,stop3:0.6},
            25:{color0:[0,120,255,0],   color1:[0,120,255,0],   color2:[0,120,255,0],   color3:[0,0,0,0], stop0:0.1,stop1:0.1,stop2:0.2,stop3:0.2},
        },
    },
    HealFieldStart:{
        frames: 15,
        gradientStops: 3,
        states:{
            0:{color0:[0,255,0,0],        color1:[0,0,0,0],         color2:[0,0,0,0], stop0:0.1,stop1:0.1,stop2:0.2},
            15:{color0:[100,255,100,0.4], color1:[100,255,100,0.1], color2:[0,0,0,0], stop0: 0, stop1:0.8,stop2: 1},
        },
        makeParticles:80,
        particleId:'heal_field',
        particleTime:30,
        particleXY: 25,
        particleAnim:'randomMove',
        particleAnimAngle: 'noRotation',
        onEnd:'HealFieldGoing',
    },
    HealFieldGoing:{
        gradientStops: 2,
        color0:[100,255,100,0.4], color1:[100,255,100,0.1], stop0: 0, stop1: 0.8,
        makeParticles:80,
        particleId:'heal_field',
        particleTime:30,
        particleXY: 25,
        particleAnim:'randomMove',
        particleAnimAngle: 'noRotation',
        onExpire:'HealFieldEnd',
        toExpire:20,
    },
    HealFieldEnd:{
        frames: 25,
        gradientStops: 3,
        states:{
            0:{color0:[100,255,100,0.4], color1:[100,255,100,0.1], color2:[0,0,0,0], stop0: 0, stop1:0.8,stop2: 1},
            25:{color0:[0,255,0,0],      color1:[0,0,0,0],         color2:[0,0,0,0], stop0:0.1,stop1:0.1,stop2:0.2},
        },
    },
};
