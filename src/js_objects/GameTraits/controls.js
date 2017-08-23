GAMEobject.prototype.mouse_down = function(e){
    var P = $('#Game').offset();
    this.mouse_x = e.clientX-P.left;
    this.mouse_y = e.clientY-P.top;

    if(e.clientX > 50 && e.clientX < 121){
        var u = parseInt((e.clientY-this.Dy)/-32)-1;
        if(u>-1 && u< this.SHIP.Modules.length){
            if( this.SHIP.Modules[u].Disabled == 1) this.SHIP.Modules[u].Disabled = 0;
                        else                        this.SHIP.Modules[u].Disabled = 1;
            return true;
        }
    }
    if(e.clientY - this.Dy > -32){
        var u = parseInt((e.clientX-105)/33);
        if(u>-1 && u < this.SHIP.Weapons.length){
            if(this.SHIP.Weapon2!==false && e.which==3)
                this.shipFunc_changeWeapon(2, u);
            else
                this.shipFunc_changeWeapon(1, u);
            return true;
        }
    }
    if(this.SHIP.Weapon2!==false && e.which==3)
        this.SHIP.MouseDown2=true;
    else
        this.SHIP.MouseDown1=true;
}
GAMEobject.prototype.mouse_up = function(e){
    this.SHIP.MouseDown1=false;
    this.SHIP.MouseDown2=false;
}
GAMEobject.prototype.mousemove = function(e){
    var P = $('#Game').offset();
    this.mouse_x = e.clientX-P.left;
    this.mouse_y = e.clientY-P.top;
}
GAMEobject.prototype.keydown = function(e){
    var NOW = (new Date()).getTime();
    if(e.keyCode==37 || e.keyCode==65){
        if(this.keyLeftRight == 0 && NOW - this.keyLeftDT < this.DoubleKeyTime) this.specialMove = 1;
        if(this.keyLeftRight == 0) this.keyLeftDT = NOW;
        this.keyLeftRight = 1;
    }
    if(e.keyCode==39 || e.keyCode==68){
        if(this.keyLeftRight == 0 && NOW - this.keyRightDT < this.DoubleKeyTime) this.specialMove = 2;
        if(this.keyLeftRight == 0) this.keyRightDT = NOW;
        this.keyLeftRight = -1;
    }
    if(e.keyCode==38 || e.keyCode==87){
        if(this.keyUpDown == 0 && NOW - this.keyDownDT < this.DoubleKeyTime) this.specialMove = 3;
        if(this.keyUpDown == 0) this.keyDownDT = NOW;
        this.keyUpDown = 1;
    }
    if(e.keyCode==40 || e.keyCode==83){
        if(this.keyUpDown == 0 && NOW - this.keyUpDT < this.DoubleKeyTime) this.specialMove = 4;
        if(this.keyUpDown == 0) this.keyUpDT = NOW;
        this.keyUpDown = -1;
    }
}
GAMEobject.prototype.keyup = function(e){
    if(e.keyCode==37 || e.keyCode==65) this.keyLeftRight=0;
    if(e.keyCode==39 || e.keyCode==68) this.keyLeftRight=0;
    if(e.keyCode==38 || e.keyCode==87) this.keyUpDown=0;
    if(e.keyCode==40 || e.keyCode==83) this.keyUpDown=0;


    if(e.keyCode > 48 && e.keyCode < 58){    // Numeric 1-9
        if(e.keyCode-49 < this.SHIP.Weapons.length)
            this.shipFunc_changeWeapon(1, e.keyCode-49);
    }

    if(typeof this.SHIP.KeysModules[ e.keyCode ] !='undefined'){
        var M = this.SHIP.KeysModules[ e.keyCode ];
        for(var m=0; m < M.length; ++m){
            if(this.SHIP.Modules[ M[m] ].Disabled == 1) this.SHIP.Modules[ M[m] ].Disabled = 0;
                            else                        this.SHIP.Modules[ M[m] ].Disabled = 1;
        }
    }

    if(e.keyCode==69){        // E - estimateMoves
        if(this.estimateMoves) this.estimateMoves=false;
                else           this.estimateMoves=true;
    }
    if(e.keyCode==80 && this.doEndGame==false){    // P - pause
        if(this.pause==false){
            this.pause=true;
            window.cancelAnimationFrame(this.intervalIndex);
            $('#pause').show();
        } else {
            this.pause=false;
            this.FRAME_TIME = new Date().getTime();
            this.intervalIndex = window.requestAnimationFrame(function(){ GAME.frame(); });
            $('#pause').hide();
        }
    }
    if(e.keyCode==27){    // ESC - escape
        this.endGame(this.gameHash);
    }
}
