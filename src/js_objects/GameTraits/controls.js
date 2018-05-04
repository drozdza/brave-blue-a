GAMEobject.prototype.mouse_down = function(e){
    var P = $('#Game').offset();
    this.mouse_x = e.clientX-P.left;
    this.mouse_y = e.clientY-P.top;

    if(e.clientX > 50 && e.clientX < 121){
        var u = parseInt((e.clientY-this.Dy)/-32)-1;
        if(u>-1 && u< this.O[0].Modules.length){
            if( this.O[0].Modules[u].Disabled == 1) this.O[0].Modules[u].Disabled = 0;
                        else                        this.O[0].Modules[u].Disabled = 1;
            return true;
        }
    }
    if(e.clientY - this.Dy > -32){
        var u = parseInt((e.clientX-105)/33);
        if(u>-1 && u < this.O[0].Weapons.length){
            if(this.O[0].Weapon2!==false && e.which==3)
                this.shipFunc_changeWeapon(2, u);
            else
                this.shipFunc_changeWeapon(1, u);
            return true;
        }
    }
    if(this.O[0].Weapon2!==false && e.which==3)
        this.O[0].MouseDown2=true;
    else
        this.O[0].MouseDown1=true;
}
GAMEobject.prototype.mouse_up = function(e){
    this.O[0].MouseDown1=false;
    this.O[0].MouseDown2=false;
}
GAMEobject.prototype.mousemove = function(e){
    var P = $('#Game').offset();
    this.mouse_x = e.clientX-P.left;
    this.mouse_y = e.clientY-P.top;
}
GAMEobject.prototype.keydown = function(e){
    var NOW = (new Date()).getTime();
    var key = false;
    switch(e.keyCode){
        case 37: case 65: key = 'right';       break;
        case 39: case 68: key = 'left';        break;
        case 38: case 87: key = 'down';        break;
        case 40: case 83: key = 'up';          break;
        case 33:          key = 'next';        break;
        case 34:          key = 'prev';        break;
        default:          return false;
    }
    switch(key){
        case 'right':{
            if(this.pause!==true && this.keyLeftRight == 0){
                if (NOW - this.keyLeftDT < this.DoubleKeyTime) this.specialMove = 1;
                else this.keyLeftDT = NOW;
            }
            this.keyLeftRight = 1;
        }break;
        case 'left':{
            if(this.pause!==true && this.keyLeftRight == 0){
                if (NOW - this.keyRightDT < this.DoubleKeyTime) this.specialMove = 2;
                else this.keyRightDT = NOW;
            }
            this.keyLeftRight = -1;
        }break;
        case 'down':{
            if(this.pause!==true && this.keyUpDown == 0){
                if (NOW - this.keyDownDT < this.DoubleKeyTime) this.specialMove = 3;
                else this.keyDownDT = NOW;
            }
            this.keyUpDown = 1;
        }break;
        case 'up':{
            if(this.pause!==true && this.keyUpDown == 0){
                if (NOW - this.keyUpDT < this.DoubleKeyTime) this.specialMove = 4;
                else this.keyUpDT = NOW;
            }
            this.keyUpDown = -1;
        }break;
    }
    if(this.pause===true && BBAdata.GET.PAUSEDEBUG > 1){
        switch(key){
            case 'right': case 'left': case 'down': case 'up':
                this.pause_keyMove();
            break;
            case 'next': case 'prev':
                this.pause_keyNearest(key);
            break;
        }
    }
}
GAMEobject.prototype.keyup = function(e){
    if(e.keyCode==37 || e.keyCode==65) this.keyLeftRight=0;
    if(e.keyCode==39 || e.keyCode==68) this.keyLeftRight=0;
    if(e.keyCode==38 || e.keyCode==87) this.keyUpDown=0;
    if(e.keyCode==40 || e.keyCode==83) this.keyUpDown=0;

    if(e.keyCode > 48 && e.keyCode < 58){    // Numeric 1-9
        if(e.keyCode-49 < this.O[0].Weapons.length)
            this.shipFunc_changeWeapon(1, e.keyCode-49);
    }

    if(e.keyCode == 77){
        for(var o in this.Enemies){
            var O = this.O[o];
            var oldX = O.x;
            var oldY = O.y;
            O.x=0;
            O.y=0;
            this.putOnXY(O, oldX, oldY);
        }
    }

    if(typeof this.O[0].KeysModules[ e.keyCode ] !='undefined'){
        var M = this.O[0].KeysModules[ e.keyCode ];
        for(var m=0; m < M.length; ++m){
            if(this.O[0].Modules[ M[m] ].Disabled == 1) this.O[0].Modules[ M[m] ].Disabled = 0;
                            else                        this.O[0].Modules[ M[m] ].Disabled = 1;
        }
    }

    if(e.keyCode==69){        // E - estimateMoves
        if(this.estimateMoves) this.estimateMoves=false;
                else           this.estimateMoves=true;
    }
    if(e.keyCode==80 && this.doEndGame==false){    // P - pause
        if(this.pause==false){
            this.pauseStart();
        } else {
            this.pauseEnd();
        }
    }
    if(e.keyCode==27){    // ESC - escape
        this.endGame(this.gameHash);
    }
}
