
CanvasManagerObject.prototype.directRenders={
    TP_track:{
        pointPoint:true,
        frames: 18,
        states:{
            0:{ width: 1, color: [0,0,255,1]},
            8:{ width: 4, color: [128,128,255,1]},
            17:{ width: 2, color: [255,255,255,1]}
        },
    },
    TP_trackDark:{
        pointPoint:true,
        frames: 18,
        states:{
            0:{ width: 1, color: [20,0,0,1]},
            8:{ width: 4, color: [255,0,0,1]},
            17:{ width: 2, color: [20,0,0,1]}
        },
    },
    dmgTransfer:{
        pointPoint:true,
        frames: 11,
        states:{
            0:{ width: 1, color: [255,0,0,0.3]},
            3:{ width: 2, color: [255,0,0,1]},
            11:{ width: 1, color: [255,0,0,0]}
        },
    },
    addShield:{
        pointPoint:true,
        frames: 9,
        states:{
            0:{ width: 0, color: [0,255,255,0.3]},
            2:{ width: 1, color: [0,255,255,1]},
            8:{ width: 0, color: [0,255,255,0]}
        },
    },
    megreBeam:{
        pointPoint:true,
        frames: 100,
        states:{
            0:{ width: 0, color: [0,200,0,0.3]},
            30:{ width: 8, color: [0,200,0,1]},
            100:{ width: 8, color: [0,200,0,1]}
        },
    },
    laserShoot:{
        pointPoint:true,
        frames: 12,
        states:{
            0:{ width2: 2, color2: [0,0,255,1], color: [0,0,0,0], width: 4},
            5:{ width2: 8, color2: [128,128,255,1], color: [255,255,255,0.5], width: 10},
            11:{ width2: 4, color2: [255,255,255,1], color: [255,255,255,0.1], width: 12}
        },
    },
    laserShoot_violet:{
        pointPoint:true,
        frames: 12,
        states:{
            0:{ width2: 2, color2: [128,0,255,1], color: [0,0,0,0], width: 4},
            5:{ width2: 8, color2: [128,0,255,1], color: [255,255,255,0.5], width: 10},
            11:{ width2: 4, color2: [192,128,255,1], color: [255,255,255,0.1], width: 12}
        },
    },
    laserShoot_blue:{
        pointPoint:true,
        frames: 12,
        states:{
            0:{ width2: 2, color2: [0,0,255,1], color: [0,0,0,0], width: 4},
            5:{ width2: 8, color2: [0,0,255,1], color: [255,255,255,0.5], width: 10},
            11:{ width2: 4, color2: [128,128,255,1], color: [255,255,255,0.1], width: 12}
        },
    },
    laserShoot_lightblue:{
        pointPoint:true,
        frames: 12,
        states:{
            0:{ width2: 2, color2: [0,255,255,1], color: [0,0,0,0], width: 4},
            5:{ width2: 8, color2: [0,255,255,1], color: [255,255,255,0.5], width: 10},
            11:{ width2: 4, color2: [128,255,255,1], color: [255,255,255,0.1], width: 12}
        },
    },
    laserShoot_lightgreen:{
        pointPoint:true,
        frames: 12,
        states:{
            0:{ width2: 2, color2: [0,255,0,1], color: [0,0,0,0], width: 4},
            5:{ width2: 8, color2: [0,255,0,1], color: [255,255,255,0.5], width: 10},
            11:{ width2: 4, color2: [128,255,128,1], color: [255,255,255,0.1], width: 12}
        },
    },
    laserShoot_yellow:{
        pointPoint:true,
        frames: 12,
        states:{
            0:{ width2: 2, color2: [255,255,0,1], color: [0,0,0,0], width: 4},
            5:{ width2: 8, color2: [255,255,0,1], color: [255,255,255,0.5], width: 10},
            11:{ width2: 4, color2: [255,255,128,1], color: [255,255,255,0.1], width: 12}
        },
    },
    laserShoot_orange:{
        pointPoint:true,
        frames: 12,
        states:{
            0:{ width2: 2, color2: [255,128,0,1], color: [0,0,0,0], width: 4},
            5:{ width2: 8, color2: [255,128,0,1], color: [255,255,255,0.5], width: 10},
            11:{ width2: 4, color2: [255,192,128,1], color: [255,255,255,0.1], width: 12}
        },
    },
    laserShoot_red:{
        pointPoint:true,
        frames: 12,
        states:{
            0:{ width2: 2, color2: [255,0,0,1], color: [0,0,0,0], width: 4},
            5:{ width2: 8, color2: [255,0,0,1], color: [255,255,255,0.5], width: 10},
            11:{ width2: 4, color2: [255,128,128,1], color: [255,255,255,0.1], width: 12}
        },
    },
    DestrFieldStart:{
        frames: 15,
        states:{
            0:{color:[255,0,0,0]},
            15:{color:[255,0,0,0.3]},
        },
        onEnd:'DestrFieldGoing',
        Particles:{
            density: 7,
            id:'des_field',
            time:59,
            XY: 35,
            anim:'randomMove'
        },
    },
    DestrFieldGoing:{
        color:[255,0,0,0.3],
        onExpire:'DestrFieldEnd',
        toExpire:50,
        Particles:{
            density: 80,
            id:'des_field',
            time:59,
            XY: 35,
            anim:'randomMove'
        },
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
        Particles:{
            density: 30,
            id:'grav_field',
            time:19,
            XY: 25,
            anim:'toCenter'
        },
    },
    GravFieldGoing:{
        gradientStops: 4,
        color0:[180,180,255,0.2], color1:[180,180,180,0.1], color2:[180,180,180,0.1], color3:[0,0,0,0], stop0:0.15,stop1:0.85,stop2:1,stop3:1,
        onExpire:'GravFieldEnd',
        toExpire:50,
        Particles:{
            density: 40,
            id:'grav_field',
            time:19,
            XY: 25,
            anim:'toCenter'
        },
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
        Particles:{
            density: 30,
            id:'wind_field',
            time:30,
            XY: 15,
            anim:'onOrbit'
        },
    },
    OrbFieldGoing:{
        gradientStops: 4,
        color0:[180,180,255,0.2], color1:[180,180,180,0.1], color2:[180,180,180,0.1], color3:[0,0,0,0], stop0:0.15,stop1:0.85,stop2:1,stop3:1,
        onExpire:'OrbFieldEnd',
        toExpire:50,
        Particles:{
            density: 30,
            id:'wind_field',
            time:30,
            XY: 15,
            anim:'onOrbit'
        },
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
        Particles:{
            density: 30,
            id:'wind_field',
            time:30,
            XY: 15,
            anim:'withWind'
        },
    },
    WindFieldGoing:{
        color:[80,80,80,0.2],
        onExpire:'WindFieldEnd',
        toExpire:20,
        Particles:{
            density: 30,
            id:'wind_field',
            time:30,
            XY: 15,
            anim:'withWind'
        },
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
        onEnd:'EleFieldGoing',
        Particles:{
            density: 30,
            id:'ele_field',
            time:30,
            XY: 20,
            anim:'randomMove',
            animAngle: 'withDirection'
        },
    },
    EleFieldGoing:{
        gradientStops: 3,
        color0:[0,120,255,0.05],    color1:[0,120,255,0.6],    color2:[0,120,255,0.2],    stop0:0.3,stop1:1,stop2:1,
        onExpire:'EleFieldEnd',
        toExpire:20,
        Particles:{
            density: 30,
            id:'ele_field',
            time:30,
            XY: 20,
            anim:'randomMove',
            animAngle: 'withDirection'
        },
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
    PlasmaFieldStart:{
        frames: 121,
        gradientStops: 4,
        states:{
            0:  {color0:[255,0,0,0], color1:[255,0,0,0.0], color2:[255,0,0,0], color3:[255,0,0,0],   stop0:1,stop1:1,stop2:1, stop3:1},
            30: {color0:[255,0,0,0.2], color1:[255,0,0,0.2], color2:[255,0,0,0.2], color3:[255,0,0,0.2],   stop0:1,stop1:1,stop2:1, stop3:1},
            90: {color0:[255,0,0,0.5], color1:[255,255,0,0.8], color2:[255,0,0,0.2], color3:[255,0,0,0.2],   stop0:0.2,stop1:0.4,stop2:1, stop3:1},
            121:{color0:[255,255,120,1], color1:[255,120,0,0.6], color2:[255,0,0,0.2], color3:[255,0,0,0.2],   stop0:0.1,stop1:0.3,stop2:1, stop3:1},
        },
        onEnd:'PlasmaFieldGoing',
        Particles:{
            density: 10,
            id:'plasma_field',
            time:20,
            XY: 20,
            anim:'toCenterOutside',
            animAngle: 'withDirection'
        },
    },
    PlasmaFieldGoing:{
        gradientStops: 4,
        color0:[255,255,120,1], color1:[255,120,0,0.6], color2:[255,0,0,0.2], color3:[255,0,0,0],   stop0:0.1,stop1:0.3,stop2:1, stop3:1,
        onExpire:'PlasmaFieldEnd',
        toExpire:20,
        Particles:{
            density: 10,
            id:'plasma_field',
            time:30,
            XY: 20,
            anim:'randomMove',
            animAngle: 'withDirection'
        },
    },
    PlasmaFieldEnd:{
        frames: 35,
        gradientStops: 4,
        states:{
            0: {color0:[255,255,120,1], color1:[255,120,0,0.6], color2:[255,0,0,0.2], color3:[255,0,0,0],   stop0:0.1,stop1:0.3,stop2:1, stop3:1 },
            20:{color0:[255,255,120,1], color1:[255,120,0,0.6], color2:[255,0,0,0.2], color3:[255,0,0,0],   stop0:0.1,stop1:0.3,stop2:0.3, stop3:0.3 },
            35:{color0:[255,255,120,1], color1:[255,120,0,0.6], color2:[255,0,0,0.2], color3:[255,0,0,0],   stop0:0.1,stop1:0.3,stop2:0.3, stop3:0.3 },
        },
    },
    HealFieldStart:{
        frames: 15,
        gradientStops: 3,
        states:{
            0:{color0:[0,255,0,0],        color1:[0,0,0,0],         color2:[0,0,0,0], stop0:0.1,stop1:0.1,stop2:0.2},
            15:{color0:[100,255,100,0.4], color1:[100,255,100,0.1], color2:[0,0,0,0], stop0: 0, stop1:0.8,stop2: 1},
        },
        onEnd:'HealFieldGoing',
        Particles:{
            density: 80,
            id:'heal_field',
            time:30,
            XY: 25,
            anim:'randomMove',
            animAngle: 'noRotation'
        },
    },
    HealFieldGoing:{
        gradientStops: 2,
        color0:[100,255,100,0.4], color1:[100,255,100,0.1], stop0: 0, stop1: 0.8,
        onExpire:'HealFieldEnd',
        toExpire:20,
        Particles:{
            density: 80,
            id:'heal_field',
            time:30,
            XY: 25,
            anim:'randomMove',
            animAngle: 'noRotation'
        },
    },
    HealFieldEnd:{
        frames: 25,
        gradientStops: 3,
        states:{
            0:{color0:[100,255,100,0.4], color1:[100,255,100,0.1], color2:[0,0,0,0], stop0: 0, stop1:0.8,stop2: 1},
            25:{color0:[0,255,0,0],      color1:[0,0,0,0],         color2:[0,0,0,0], stop0:0.1,stop1:0.1,stop2:0.2},
        },
    },
    EndPortalStart:{
        frames: 60,
        gradientStops: 3,
        states:{
            0:{color0:[100,100,255,0],    color1:[0,0,0,0],       color2:[0,0,0,0], stop0:0, stop1:0.1, stop2:0.1},
            60:{color0:[100,100,255,0.8], color1:[100,100,255,0], color2:[0,0,0,0], stop0:0, stop1:1,   stop2:1},
        },
        onEnd:'EndPortalGoing',
    },
    EndPortalGoing:{
        gradientStops: 2,
        color0:[100,100,255,0.8], color1:[100,100,255,0], stop0: 0, stop1: 1,
        onExpire:'EndPortalEnd',
        toExpire:20,
    },
    EndPortalEnd:{
        frames: 25,
        gradientStops: 3,
        states:{
            0:{color0:[100,100,255,0.8], color1:[100,100,255,0], color2:[0,0,0,0], stop0:0, stop1:1,   stop2: 1},
            25:{color0:[100,100,255,0],  color1:[100,100,255,0], color2:[0,0,0,0], stop0:0, stop1:0.1, stop2:0.1},
        },
    },
};
