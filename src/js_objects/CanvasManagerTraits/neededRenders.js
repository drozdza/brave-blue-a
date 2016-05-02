
CanvasManagerObject.prototype.neededRenders={
    hit:{
        viewLIBpath: 'StarPath', // *
        frames: 25,
        sizeX: 60,
        sizeY: 60,
        states:{
            0:{pathSize: 5, color: [255,255,255,1]},
            10:{pathSize: 15, color: [255,255,0,1]},
            24:{pathSize: 30, color: [255,0,0,1]},
        }
    },
    hit_blue:{
        viewLIBpath: 'StarPath', // *
        frames: 25,
        sizeX: 60,
        sizeY: 60,
        states:{
            0:{pathSize: 5, color: [255,255,255,1]},
            10:{pathSize: 15, color: [173,216,230,1]},
            24:{pathSize: 30, color: [0,0,255,1]},
        }
    },
    hit_energyField:{
        viewLIBpath: 'StarPath', // *
        frames: 25,
        sizeX: 60,
        sizeY: 60,
        states:{
            0:{pathSize: 5, color: [0,255,0,1]},
            10:{pathSize: 15, color: [128,255,128,1]},
            24:{pathSize: 30, color: [255,255,255,1]},
        }
    },
    hitBig:{
        viewLIBpath: 'StarPath', // *
        frames: 21,
        sizeX: 140,
        sizeY: 140,
        states:{
            0:{pathSize: 5, color: [255,255,255,1]},
            10:{pathSize: 80, color: [255,255,0,1]},
            20:{pathSize: 120, color: [255,0,0,1]},
        }
    },
    hit_healing:{
        viewLIBpath: 'StarPath', // *
        frames: 25,
        sizeX: 30,
        sizeY: 30,
        states:{
            0:{pathSize: 5, color: [128,255,128,1]},
            12:{pathSize: 12, color: [0,255,0,1]},
            24:{pathSize: 20, color: [0,128,0,1]},
        }
    },
    explosion_35:{
        viewLIBpath: 'StarPath', // *
        frames: 25,
        sizeX: 80,
        sizeY: 80,
        smallStars: 6,
        states:{
            0:{pathSize: 10, circleRadius: 5, color: [255,255,255,1], color2: [255,255,255,1], smallStarSize: 5, color3: [255,255,255,1]},
            3:{pathSize: 27, circleRadius: 13, color: [255,255,128,1], color2: [255,255,128,1], smallStarSize: 15, color3: [255,255,0,1]},
            7:{pathSize: 45, circleRadius: 20, color: [255,255,0,1], color2: [255,255,0,0.5], smallStarSize: 25, color3: [255,0,0,1]},
            14:{pathSize: 78, circleRadius: 35, color: [255,0,0,1], color2: [255,0,0,1]},
            24:{pathSize: 78, circleRadius: 35, color: [128,0,0,0.3], color2: [128,0,0,0]},
        }
    },
    explosion_80:{
        viewLIBpath: 'StarPath', // *
        frames: 25,
        sizeX: 180,
        sizeY: 180,
        smallStars: 6,
        states:{
            0:{pathSize: 10, circleRadius: 5, color: [255,255,255,1], color2: [255,255,255,1], smallStarSize: 10, color3: [255,255,255,1]},
            3:{pathSize: 50, circleRadius: 25, color: [255,255,128,1], color2: [255,255,128,1], smallStarSize: 25, color3: [255,255,0,1]},
            7:{pathSize: 90, circleRadius: 40, color: [255,255,0,1], color2: [255,255,0,0.5], smallStarSize: 40, color3: [255,0,0,1]},
            14:{pathSize: 176, circleRadius: 80, color: [255,0,0,1], color2: [255,0,0,1]},
            24:{pathSize: 176, circleRadius: 80, color: [128,0,0,0.3], color2: [128,0,0,0]},
        }
    },
    explosion_120:{
        viewLIBpath: 'StarPath', // *
        frames: 25,
        sizeX: 260,
        sizeY: 260,
        smallStars: 6,
        states:{
            0:{pathSize: 10, circleRadius: 5, color: [255,255,255,1], color2: [255,255,255,1], smallStarSize: 10, color3: [255,255,255,1]},
            3:{pathSize: 65, circleRadius: 30, color: [255,255,128,1], color2: [255,255,128,1], smallStarSize: 45, color3: [255,255,0,1]},
            7:{pathSize: 120, circleRadius: 50, color: [255,255,0,1], color2: [255,255,0,0.5], smallStarSize: 80, color3: [255,0,0,1]},
            14:{pathSize: 250, circleRadius: 120, color: [255,0,0,1], color2: [255,0,0,1]},
            24:{pathSize: 250, circleRadius: 120, color: [128,0,0,0.3], color2: [128,0,0,0]},
        }
    },
    explosion_210:{
        viewLIBpath: 'StarPath', // *
        frames: 25,
        sizeX: 460,
        sizeY: 460,
        smallStars: 6,
        states:{
            0:{pathSize: 10, circleRadius: 5, color: [255,255,255,1], color2: [255,255,255,1], smallStarSize: 10, color3: [255,255,255,1]},
            3:{pathSize: 115, circleRadius: 65, color: [255,255,128,1], color2: [255,255,128,1], smallStarSize: 65, color3: [255,255,0,1]},
            7:{pathSize: 220, circleRadius: 125, color: [255,255,0,1], color2: [255,255,0,0.5], smallStarSize: 120, color3: [255,0,0,1]},
            14:{pathSize: 450, circleRadius: 210, color: [255,0,0,1], color2: [255,0,0,1]},
            24:{pathSize: 450, circleRadius: 210, color: [128,0,0,0.3], color2: [128,0,0,0]},
        }
    },
    des_field:{
        viewLIBpath: 'StarPath', // *
        frames: 60,
        sizeX: 70,
        sizeY: 70,
        states:{
            0:{pathSize: 5, color: [255,0,0,0.8]},
            20:{pathSize: 30, color: [255,0,0,0.4]},
            60:{pathSize: 70, color: [255,0,0,0]},
        }
    },
    grav_field:{
        viewLetter: 'G',
        frames: 20,
        sizeX: 50,
        sizeY: 50,
        states:{
            0:{fontSize: 50, color: [30,30,30,0.8]},
            10:{fontSize: 15, color: [30,30,30,0.8]},
            20:{fontSize: 10, color: [100,100,100,0.8]},
        }
    },
    wind_field:{
        viewLetter: 'W',
        frames: 40,
        sizeX: 30,
        sizeY: 30,
        states:{
            0:{fontSize: 5, color: [30,30,30,0.2]},
            20:{fontSize: 25, color: [100,100,100,0.4]},
            40:{fontSize: 5, color: [30,30,30,0.2]},
        }
    },
    ele_field:{
        viewLetter: 8623,    // pr�d
        frames: 40,
        sizeX: 40,
        sizeY: 40,
        states:{
            0:{fontSize: 5, color: [0,120,255,0.2]},
            20:{fontSize: 35, color: [0,120,255,0.7]},
            40:{fontSize: 5, color: [0,120,255,0,0.2]},
        }
    },
    heal_field:{
        viewLetter: '+',
        frames: 40,
        sizeX: 50,
        sizeY: 50,
        states:{
            0:{fontSize: 5, color: [0,255,0,0.2]},
            20:{fontSize: 50, color: [0,255,0,0.7]},
            40:{fontSize: 10, color: [0,255,0,1]},
        }
    },
};
