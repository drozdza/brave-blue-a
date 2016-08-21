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

    if(BBAdata.GET.GAMESTATS==1){
        var html = '<br/>--------------------<br/>';
        for(var i in this.C) html+=i+': '+this.C[i]+'<br>';
        for(var i in this.CE) html+=i+': '+this.CE[i]+'<br>';
        $('#countEnemies').append(html);
    }
}
GAMEobject.prototype.changeCount = function(TabC){
    for(var c in TabC){
        this.C[c] = TabC[c];
        if(c == 'gameEnded' && this.playerEndGame===false){
            this.teleportShipOut();
        }
    }
}

GAMEobject.prototype.prepareWinningConds = function(){
    var WC;
    if(typeof this.MapSetting.WinningConds == 'undefined'){
        WC = [{T:'Main',C:{'E:enemies':{max:0,D:'killLeft'}}, Reward:{Conquer:1}}];
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
            if(Done) WC.State = 'Done';
            if(Fail) WC.State = 'Fail';

            if(WC.State == 'Done' && WC.T=='Main'){
                this.C['gameWon'] = 1;
                this.openEndPortal(i);
            }
        }
    }
}
GAMEobject.prototype.showWinningCond = function(i){
    var html='',B,c,CC,WC = this.CWinning[i];

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


        /**
         *  - timeTo
         *  - killLeft
         *  - DsaveMax
         *  - killAll
         *  - killMin
         *  - killMax
         */

        if(CC.D == 'timeTo'){
            html += showAsSeconds(CC.max-CC.C);
        }else if(CC.D == 'killLeft'){
            B = this.getCount(c.replace('E:','D:'));
            html += 'kill '+CC.C+' '+c.replace('E:','')+' (of '+(B- -CC.C)+')';
        }else if(CC.D == 'killLeft'){
            B = this.getCount(c.replace('E:','D:'));
            html += 'kill '+CC.C+' '+c.replace('E:','')+' (of '+(B- -CC.C)+')';
        }else if(CC.D == 'DsaveMax'){
            B = this.getCount(c.replace('D:','E:'));
            html += 'save '+c.replace('E:','')+': '+(CC.C- -B-CC.max)+' of '+(CC.C- -B)+'';
        }else if(CC.D == 'killAll'){
            B = this.getCount(c.replace('E:','D:'));
            html += 'kill '+c.replace('E:','')+': '+B+'/'+(B- -CC.C);
        }else if(CC.D == 'killMin'){
            html += 'kill: '+c.replace('D:','')+' '+CC.C+'/'+CC.min;
        }else if(CC.D == 'killMax'){
            B = this.getCount(c.replace('E:','D:'));
            html += 'kill: '+c.replace('E:','')+' '+B+'/'+(B- -CC.C);
        }else if(CC.D == 'hidden'){
            html;
        }else{
            html += c+' '+CC.C;
        }

        html += '</span><br/>';
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
GAMEobject.prototype.openEndPortal = function(i){
    var WC = this.CWinning[i];
    var MM = this.MapSetting;
    var portalX = 0, portalY = 0;
    if(typeof MM.EndPortal !== 'undefined'){
        if(MM.EndPortal.X) portalX = MM.EndPortal.X;
        if(MM.EndPortal.Y) portalY = MM.EndPortal.Y;
    }
    if(typeof WC.EndPortal !== 'undefined'){
        if(WC.EndPortal.X) portalX = WC.EndPortal.X;
        if(WC.EndPortal.Y) portalY = WC.EndPortal.Y;
    }

    var E = this.putObj('EndPortal','static',1,portalX,portalY);
    this.setRegionAnimation(E,'EndPortal');
}
GAMEobject.prototype.showEndGameCount = function(){
    var html='';

    this.countWinningConds();
    this.countWinningRewards();

    html += 'Results:<br/>';

    for(var i in this.CWinning)
        html += this.showWinningCond(i);

    return html;
}
GAMEobject.prototype.countWinningRewards = function(){
    var WC,i,r;
    var WinTab = {};
    var DoneI = 0;
    var Rewards = {Cash: 0};

    for(i in this.CWinning){
        if(this.CWinning[i].State == 'Done'){
            WC = this.CWinning[i];
            WinTab[i] = 1;
            ++DoneI;
            if(typeof WC.Reward !='undefined'){
                for(var r in WC.Reward){
                    if(typeof Rewards[r] == 'undefined')
                        Rewards[r]=0;
                    Rewards[r]-=-WC.Reward[r];
                }
            }
        }
    }


    if(DoneI > 1)
        Rewards.Cash-=-(DoneI-1)*50;

    WinTab;
}
