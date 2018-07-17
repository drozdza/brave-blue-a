
GAMEobject.prototype.frame = function(){
    // debugLog('Frame');
    if(BBAdata.GET.FRAMES==0){
        // debugLog('Frame: move');
        this.frame_move();
        // debugLog('Frame: decide');
        this.frame_decide();
        // debugLog('Frame: draw');
        this.frame_draw();
    }else if(BBAdata.GET.FRAMES > 0){
        var FR = parseInt( 1000/this.Frames )-2;
        var now = new Date().getTime();
        var PASSED = now - this.FRAME_TIME;
        if(PASSED < FR){
            this.intervalIndex = window.requestAnimationFrame(function(){ GAME.frame(); });
            return true;
        }
        if(BBAdata.GET.FRAMES==1){
            this.FRAME_TIME = now;
        }
        if(BBAdata.GET.FRAMES==2){
            this.FRAME_TIME-=-FR;
        }
        // debugLog('Frame: move');
        this.frame_move();
        // debugLog('Frame: decide');
        this.frame_decide();
        if(BBAdata.GET.FRAMES==3 || BBAdata.GET.FRAMES==4){
            PASSED-=FR;
            this.FRAME_TIME-=-FR;
            var X = 0;
            while(PASSED > FR){
                // debugLog('Frame: move');
                this.frame_move();
                // debugLog('Frame: decide');
                this.frame_decide();
                PASSED-=FR;
                this.FRAME_TIME-=-FR;
                if(++X >=3){
                    this.FRAME_TIME=now;
                    break;
                }
            }
        } else {
        }
        // debugLog('Frame: draw');
        this.frame_draw();
    }


    if(BBAdata.GET.FPS > 0){
        var D = parseInt(new Date().getTime()/1000);
        if(D != this.FPSx){
            var FPS = this.tick - this.FPSy;
            var FPSu = this.tickD - this.FPSz;
            if(BBAdata.GET.FPS > 1){
                $('#FPSpillar').prepend('<div><div style="height: '+FPS*3+'px;"><div style="height: '+FPSu*3+'px;"></div></div></div>');
                $('#FPSpillar div:nth-child(151)').remove();
            }
            var html = '';
            html += this.hitStats.hitMin+' '+parseInt(this.hitStats.hitAvg/FPS)+' '+this.hitStats.hitMax+'<br/>';
            html += '['+parseInt(this.O[0].x)+' '+parseInt(this.O[0].y)+']<br/>';
            html += FPSu+' / '+FPS+' fps';
            $('#FPSnum').html(html);
            this.FPSy=this.tick;
            this.FPSz=this.tickD;

            this.hitStats={hit:0,hitMin:-1,hitMax:-1,hitAvg:0};

            if(BBAdata.GET.FPS > 2){
                var u = 1000 - this.MSship - this.MSdecide - this.MSmove - this.MSdraw;
                html = '';
                html += '<div class="FPS_MS">'+this.MSship+'<div class="" style="height: '+parseInt(this.MSship/10)+'px;">[s]</div></div>';
                html += '<div class="FPS_MS">'+this.MSdecide+'<div class="" style="height: '+parseInt(this.MSdecide/10)+'px;">[d]</div></div>';
                html += '<div class="FPS_MS">'+this.MSmove+'<div class="" style="height: '+parseInt(this.MSmove/10)+'px;">[m]</div></div>';
                html += '<div class="FPS_MS">'+this.MSdraw+'<div class="" style="height: '+parseInt(this.MSdraw/10)+'px;">[c]</div></div>';
                html += '<div class="FPS_MS">'+u+'<div class="" style="height: '+parseInt(u/10)+'px;"></div></div>';

                $('#FPS_MS').html(html);

                this.MSdraw = 0;
                this.MSdecide = 0;
                this.MSship = 0;
                this.MSmove = 0;
            }

        }
        this.FPSx=D;
    }

    // count hitStats:
    this.hitStats.hitAvg -=- this.hitStats.hit;
    if (this.hitStats.hitMin===-1 || this.hitStats.hitMin > this.hitStats.hit)
        this.hitStats.hitMin = this.hitStats.hit;
    if (this.hitStats.hitMax===-1 || this.hitStats.hitMax < this.hitStats.hit)
        this.hitStats.hitMax = this.hitStats.hit;
    this.hitStats.hit=0;


    if(!this.pause && !this.doEndGame && GAME)
        if(BBAdata.GET.FRAMES < 4)
            this.intervalIndex = window.requestAnimationFrame(function(){ GAME.frame(); });
        else
            this.intervalIndex = setTimeout(function(){ GAME.frame(); }, 1);
}
