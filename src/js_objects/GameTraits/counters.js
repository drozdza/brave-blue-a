GAMEobject.prototype.prepareCounts = function(){
    this.C = {
        'D:enemies':0,
        seconds:0,
        gameWon:0,
        gameEnded:0,
        playerDead:0,
        S_lifeHealed:0,
        S_shieldProd:0,
        S_lifeLost:0,
        S_shieldLost:0
    };
    this.CE = {};
}
GAMEobject.prototype.countCounts = function(){

    this.CE = {'E:enemies':0};
    for(var i in this.Enemies){
        ++this.CE['E:enemies'];
        var T = 'E:'+this.O[i].T;
        if(typeof this.CE[T] == 'undefined')
            this.CE[T]=0;
        ++this.CE[T];
    }

    this.C.seconds++;
}
GAMEobject.prototype.showCounts = function(){
    this.countCounts();

    this.showWinningConds();

    var html = '<br/>--------------------<br/>';
    for(var i in this.C) html+=i+': '+this.C[i]+'<br>';
    for(var i in this.CE) html+=i+': '+this.CE[i]+'<br>';
    $('#countEnemies').append(html);

}

GAMEobject.prototype.prepareWinningConds = function(){
    var WC;
    if(typeof this.MapSetting.WinningConds == 'undefined'){
        WC = [{T:'Main',C:{'E:enemies':{max:0,D:'killAll'}}, Revard:{Conquer:1}}];
    } else {
        WC = cloneObj(this.MapSetting.WinningConds);
    }
    for(var i in WC)
        WC[i].State = 'Pending';
    this.CWinning = WC;

}
GAMEobject.prototype.getCount = function(t){
    if(t.charAt(0)+t.charAt(1) == 'E:'){
        if (typeof this.CE[t] == 'undefined')
            return 0;
        return this.CE[t];
    } else {
        if (typeof this.C[t] == 'undefined')
            return 0;
        return this.C[t];
    }
}
GAMEobject.prototype.countWinningConds = function(){
    var WC,i,c,CC,Done,Fail;
    for(i in this.CWinning){
        if(this.CWinning[i].State == 'Pending'){
            WC = this.CWinning[i];

            for(c in WC.C){
                CC = WC.C[c];
                CC.C = this.getCount(c);

                CC.State = 'done';

                if(typeof(CC.max)!=='undefined' && CC.max < CC.C)
                    CC.State = 'fail';
                if(typeof(CC.min)!=='undefined' && CC.min > CC.C)
                    CC.State = 'fail';

                if(typeof(CC.max)!=='undefined'){
                    if(c.charAt(0)+c.charAt(1)=='E:' && CC.State == 'fail')
                        CC.State = 'pending';

                }
                if(typeof(CC.min)!=='undefined'){
                     if((c=='gameWon' || c=='gameEnded') && CC.State == 'fail')
                         CC.State = 'pending';


                    if(c.charAt(0)+c.charAt(1)=='D:' && CC.State == 'fail'){
                        CC.State = 'pending';
                    }
                }
            }

            // here we count if State its Pending, Done or Failed
            Done = true;
            Fail = false;
            for(c in WC.C){
                CC = WC.C[c];
                if(CC.State != 'done') Done = false;
                if(CC.State == 'fail') Fail = true;
            }
            console.log(Done);
            console.log(Fail);
            if(Done || Fail) console.log(CC);
            if(Done) WC.State = 'Done';
            if(Fail) WC.State = 'Fail';
            console.log(WC.State);

        }
        else console.log(this.CWinning[i].State);
    }
}
GAMEobject.prototype.showWinningCond = function(i){
    var html='',t,B,CC,WC = this.CWinning[i];

    if(WC.State=='Pending' && WC.hideOnPending) return '';
    if(WC.State=='Fail' && WC.hideOnFail) return ''; // ?????

    var mums = '';
    if(WC.State=='Done') mums = 'color: yellow;';
    if(WC.State=='Fail') mums = 'color: grey;';

    for(c in WC.C){
        CC = WC.C[c];

        if(CC.State == 'done')    html += '<span style="color: green;'+mums+'">';
        if(CC.State == 'pending') html += '<span style="'+mums+'">';
        if(CC.State == 'fail')    html += '<span style="color: red;'+mums+'">';

        if(CC.D == 'timeTo'){
            html += showAsSeconds(CC.max-CC.C);
        }else if(CC.D == 'killAll'){
            B = this.getCount(c.replace('E:','D:'));
            html += 'kill '+c.replace('E:','')+': '+B+'/'+(B- -CC.C);
        }else if(CC.D == 'killMin'){
            B = this.getCount(c.replace('D:','E:'));
            html += 'kill: '+c.replace('D:','')+' '+CC.C+'/'+(B- -CC.C);
        }else if(CC.D == 'killMax'){
            B = this.getCount(c.replace('E:','D:'));
            html += 'kill: '+c.replace('E:','')+' '+B+'/'+(B- -CC.C);
        }else if(CC.D == 'hidden'){
            html;
        }else{
            html += c+' '+CC.C;
        }

        html +='</span><br/>';
    }

    return html+'<br/>';
}
GAMEobject.prototype.showWinningConds = function(){
    var html = '';

    this.countWinningConds();

    for(var i in this.CWinning)
        html += this.showWinningCond(i);

    $('#countEnemies').html(html);
}
