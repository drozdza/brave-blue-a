GAMEobject.prototype.pauseStart = function(){
    if(this.pause===true) return false;
    this.pause=true;
    clearInterval(GAME.intervalIndex);
    window.cancelAnimationFrame(this.intervalIndex);
    $('#pause').show();

    this.pauseViewPoint = {
        x: this.O[0].x,
        y: this.O[0].y,
        o: false,
    }

    if(BBAdata.GET.PAUSEDEBUG==2){
        this.pause_showGameStats();
    }else{
        $('#pause').addClass('simpleInfo').html('<span class="bigP">P</span>');
    }
}

GAMEobject.prototype.pauseEnd = function(){
    this.pause=false;
    this.FRAME_TIME = new Date().getTime();
    this.intervalIndex = window.requestAnimationFrame(function(){ GAME.frame(); });
    $('#pause').hide();

}

GAMEobject.prototype.pause_showGameStats = function(){
    var html = '';

    html +='<div class="time">'+parseInt((this.tick/30)/60)+':'+(('0' + parseInt((this.tick/30)%60)).slice(-2))+'<span>'+this.tick+'</span></div>';

    html += this.pause_showGameStats_enemies();
    html += this.pause_showGameStats_coutners();

    html +='<div class="unsorted">';
    for(var c in this.C){
        if(c.search('D:') === -1)
        if(c.search('B_') !== 0)
        if(c.search('DMG_') !== 0)
        if(c.search('Hit_') !== 0)
            html +=c+':'+this.C[c]+'<br/>';
    }
    html +='</div>';

    html +='<div class="aimer"></div>';

    $('#pause').html(html);
}

GAMEobject.prototype.pause_showGameStats_enemies = function(){
    var html='';

    var enemies = {};
    for(var c in this.CE){
        var e = c.split('E:')[1];
        enemies[e] = {D:0,E:this.CE[c]};
    }
    for(var c in this.C){
        if(c.search('D:') !== -1){
            var e = c.split('D:')[1];
            if(typeof enemies[e] != 'undefined'){
                enemies[e].D = this.C[c];
            }else{
                enemies[e]={D:this.C[c],E:0};
            }
        }
    }
    html +='<div class="enemies"><table>';
    for(var e in enemies)
        html +='<tr><td class="L">'+e+'</td><td>'+enemies[e].E+'</td><td>'+(enemies[e].E- -enemies[e].D)+'</td></tr>';
    html +='</table></div>';

    return html;
}

GAMEobject.prototype.pause_showGameStats_coutners = function(){
    var html='';

    var stuff={B:{},DMG:{},Hit:{}};
    for(var s in stuff){
        for(var c in this.C){
            if(c.search(s+'_') === 0){
                var e = c.split(s+'_')[1];
                if(e.search('s1_') === 0){
                    e = e.split('s1_')[1];
                    stuff[s][e].s1 = this.C[c];
                }else if(e.search('s2_') === 0){
                    e = e.split('s2_')[1];
                    stuff[s][e].s2 = this.C[c];
                }else if(e.search('s3_') === 0){
                    e = e.split('s3_')[1];
                    stuff[s][e].s3 = this.C[c];
                }else{
                    stuff[s][e] = {s1:0, s2:0, s3:0, all:this.C[c]};
                }
            }
        }
    }
    html +='<div class="Bcounters"><table>';
    for(var s in stuff){
        html+='<tr><td colspan="5">'+s+'</td></tr>';
        for(var e in stuff[s])
            html +='<tr><td class="L">'+e+'</td><td>'+stuff[s][e].s1+'</td><td>'+(stuff[s][e].s2)+'</td><td>'+(stuff[s][e].s3)+'</td><td>'+(stuff[s][e].all)+'</td></tr>';
    }
    html +='</table></div>';

    return html;
}

GAMEobject.prototype.pause_showGameStats_object = function(o){
    var O = this.O[o];
    var html = '';

    html +='<span style="font-size: 35px;">ID: '+o+' ('+O.T+')</span><br/>';

    html += showObjInTable(O,[
        {T:'noshow',canvasId:'noshow',Flags:'inline'},
        {},
        {CatchDmgT:'inline',Angle2:'inline'},
    ]).html;

    $('#pause .Oshower').remove();
    $('#pause').append('<div class="Oshower"><table>'+html+'</table></div>');
}

GAMEobject.prototype.pause_keyMove = function(){
    var chop = 50;
    this.pauseViewPoint.x -= this.keyLeftRight*chop;
    this.pauseViewPoint.y -= this.keyUpDown*chop;
    this.pauseViewPoint.o = false;

    $('.aimer').html('<x>'+this.pauseViewPoint.x.toFixed(0)+'</x><y>'+this.pauseViewPoint.y.toFixed(0)+'</y>');

    $('#pause .Oshower').remove();
    this.frame_draw(this.pauseViewPoint);
}

GAMEobject.prototype.pause_keyNearest = function(way){
    if(this.pauseViewPoint.o === false)
        way = 'both';

    var oDist = 1000000;
    var oO = false;
    for(var o in this.O){
        if(way == 'next' && parseInt(o) <= parseInt(this.pauseViewPoint.o)) continue;
        if(way == 'prev' && parseInt(o) >= parseInt(this.pauseViewPoint.o)) continue;

        var uX = this.O[o].x - this.pauseViewPoint.x;
        var uY = this.O[o].y - this.pauseViewPoint.y;
        var uDist = Math.sqrt(uX*uX- -uY*uY);
        if(uDist < oDist){
            oDist = uDist;
            oO = o;
        }
    }
    if(oO != false){
        this.pauseViewPoint.o = oO;
        this.pauseViewPoint.x = this.O[oO].x;
        this.pauseViewPoint.y = this.O[oO].y;

        debugLog(oO);

        this.pause_showGameStats_object(oO);

        this.frame_draw(this.pauseViewPoint);
    }
}
