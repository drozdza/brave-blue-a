GAMEobject.prototype.toWin = function(){


}

GAMEobject.prototype.prepareCounts = function(){
    this.C = {
        'D:enemies':0,
        seconds:0,
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
        WC = [{T:'Main',maxC:{enemies:0}, Revard:{Conquer:1}}];
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
    var WC,i,t,A;
    for(i in this.CWinning){
        WC = this.CWinning[i];
        if(WC.State == 'Pending'){
            WC.S = {minC:{},maxC:{}};   // States
            WC.M = {minC:{},maxC:{}};

            if(WC.minC)
                for(t in WC.minC){
                    A = this.getCount(t);

                    if(A >= WC.minC[t]) WC.S.minC[t] = 'true';
                            else        WC.S.minC[t] = 'false';

                    if(t.charAt(0)+t.charAt(1)=='D:' && WC.S.minC[t] == 'false')
                        WC.S.minC[t]='pending';

                }

            if(WC.maxC)
                for(t in WC.maxC){
                    A = this.getCount(t);

                    if(A <= WC.maxC[t]) WC.S.maxC[t] = 'true';
                            else        WC.S.maxC[t] = 'false';

                    if(t=='seconds' && WC.S.maxC[t] == 'true')
                        WC.S.maxC[t]='pending';

                    if(t.charAt(0)+t.charAt(1)=='E:' && WC.S.maxC[t] == 'false')
                        WC.S.maxC[t]='pending';
                }

            // here we count if State its Pending, Done or Failed

            // here we save onDone state or onFail state to display it
        }
    }
}
GAMEobject.prototype.showWinningCond = function(i){
    var html='',t,A,WC = this.CWinning[i];

    if(WC.State=='Pending' && WC.hideOnPending) return false;
    if(WC.State=='Fail' && WC.hideOnFail) return false;

    if(WC.minC)
        for(t in WC.minC){
            A = this.getCount(t);

            if(WC.S.minC[t]=='true') html += '<span style="color: green;">';
            if(WC.S.minC[t]=='pending') html += '<span>';
            if(WC.S.minC[t]=='false') html += '<span style="color: red;">';

            if(t=='seconds')
                html += showAsSeconds(A-WC.minC[t]);
            else if(t.charAt(0)+t.charAt(1)=='D:'){
                B = this.getCount(t.replace('D:','E:'));
                html += 'kill: '+t.replace('D:','')+' '+A+'/'+(B- -A);
            }
            else if(t.charAt(0)+t.charAt(1)=='E:'){
                B = this.getCount(t.replace('E:','D:'));
                html += 'save: '+t.replace('E:','')+' '+A+'/'+(B- -A);
            }
            else
                html += t+' {'+A+'/'+WC.minC[t]+'}';
            html +='</span><br/>';
        }

    if(WC.maxC)
        for(t in WC.maxC){
            A = this.getCount(t);

            if(WC.S.maxC[t]=='true') html += '<span style="color: green;">';
            if(WC.S.maxC[t]=='pending') html += '<span>';
            if(WC.S.maxC[t]=='false') html += '<span style="color: red;">';

            if(t=='seconds')
                html += showAsSeconds(WC.maxC[t]-A);
            else if(t.charAt(0)+t.charAt(1)=='E:'){
                B = this.getCount(t.replace('E:','D:'));
                html += 'kill: '+t.replace('E:','')+' '+B+'/'+(B- -A);
            }
            else if(t.charAt(0)+t.charAt(1)=='D:'){
                B = this.getCount(t.replace('D:','E:'));
                html += 'save: '+t.replace('D:','')+' '+B+'/'+(B- -A);
            }
            else
                html += t+' ['+A+'/'+WC.maxC[t]+']';
            html +='</span><br/>';
        }

    return html+'<br/>';
}
GAMEobject.prototype.showWinningConds = function(){
    this.countWinningConds();

    var html = '';

    for(var i in this.CWinning)
        html += this.showWinningCond(i);

    $('#countEnemies').html(html);
}
/*
WinningConds:[
    {T:'Main',maxC:{enemy:0}, Revard:{Conquer:1}},
    {T:'Main',minC:{'D:orhenes':6,'E:koriaz':10}, Revard:{}},
    {T:'Add',maxC:{seconds:360}, Revard:{}},
    {T:'Add',maxC:{S_lifeHealed:0}, Revard:{}},
    {T:'Add',maxC:{'D:carras':0}, Revard:{}},
    {T:'Add',minC:{'D:carras':100}, maxC:{S_lifeLost:0,S_shieldLost:0}, Revard:{}},
],
*/
