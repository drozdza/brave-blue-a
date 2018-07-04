function GAMEobject(){

    this.Dx=1300;
    this.Dy=550;
    this.MapTileSize = 250;
    this.Frames = BBAdata.GET.SETF;
    this.tick=0;
    this.tickD=0;               // Draw Ticks
    this.IntervalIndex=-1;
    this.pause=false;
    this.doEndGame=false;
    this.endGameShown=false;
    this.playerEndGame=false;

    this.C={};          // Counts all the statistics

    this.Enemies={};    // Tablica Enemies

    this.O={};          // Object's - all of them
    this.Olen=0;
    this.Omap={};       // map of Maps
    this.Odead={};

    this.Omoving={};    // moving
    this.Ocomp={};      // sterowane statki / missile - stare
    this.Othink={};     // sterowane statki / missile
    this.Olook={};      // rozglądający się
    this.Oshot={};      // array of shoting entities

    this.Obullet={};    // tablica kul
    this.Oanim={};      // animations
    this.Oregion={};    // regions
    this.Oroute={};     // routePoints

    this.Squads={};     // moving in Squads
    this.SquadLen=0;

    this.keyLeftRight=0;
    this.keyUpDown=0;

    this.keyLeftDT = 0;
    this.keyRightDT = 0;
    this.keyUpDT = 0;
    this.keyDownDT = 0;
    this.DoubleKeyTime = 180;
    this.specialMove = -1;
    this.specialMoveT = -1;
    this.changeSpeedDelay = 0;

    this.showLaserInd = true;
    this.RadarOld = {}; for(var i=0; i<360;++i) this.RadarOld[i]=[];
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

    this.hitStats = {hit:0,hitMin:-1,hitMax:-1,hitAvg:0};

    this.shipX=0;
    this.shipY=0;

    this.SHIP={};
    this.SHIPold={};

}
