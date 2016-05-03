function GAMEobject(){
    {
    this.Dx=1300;
    this.Dy=550;
    this.MapTileSize = 250;
    this.Frames=30;
    this.tick=0;
    this.tickD=0;
    this.IntervalIndex=-1;
    this.pause=false;
    this.doEndGame=false;

    this.EnemiesC=0;
    this.Enemies={};             // Tablica Enemies

    this.MapRadius=2700;
    this.MapRadius2=3200;

    this.O={};                   // Object's - all of them
    this.Olen=0;
    this.Omap={};                // map of Maps
    // No map for: B-Bullets, BE-BulletsE, T-TeleportsRoutes
    this.Omap['P']={elems:1};    // Player
    this.Omap['M']={elems:0};    // Missles
    this.Omap['E']={elems:0};    // Enemies
    this.Omap['ME']={elems:0};   // MisslesE
    this.Omap['A']={elems:0};    // Asteroids - only for Player Ship
    this.Omap['R']={elems:0};    // Regions
    this.Omap['D']={elems:0};    // Dead objects (for spotting)
    this.Odead={};


    this.Omoving={};    // moving
    this.Ocomp={};      // sterowane statki / missle
    this.Obullet={};    // tablica kul
    this.Oanim={};      // animations
    this.Oregion={};    // regions

    this.Squads={};     // moving in Squads
    this.SquadLen=0;

    this.keyLeftRight=0;
    this.keyUpDown=0;

    this.keyLeftLC = 0;
    this.keyRightLC = 0;
    this.keyUpLC = 0;
    this.keyDownLC = 0;
    this.specialMove = -1;
    this.specialMoveT = -1;

    this.showLaserInd = true;
    this.RadarOld = {};    for(var i=0; i<360;++i) this.RadarOld[i]=[];
    this.mouse_x = 0;
    this.mouse_y = 0;
    this.mouseX = 0;
    this.mouseY = 0;

    this.FPSx=0;
    this.FPSy=0;
    this.FPSz=0;
    this.MSmove=0;
    this.MSdecide=0;
    this.MSdraw=0;
    this.MSship=0;

    this.SHIP={};
    this.SHIPold={};
    }

}
