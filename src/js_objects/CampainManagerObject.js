CampainManagerObject = function(){

    this.goldTotal = 0;
    this.goldLeft = 0;
    this.campainFlags = {};
    this.campainRoutes = {};
    this.levelsCompletion = {};

    this.currentLevel = 'First';

    this.makeCampain = function(){
        this.getSavedCampain();
    }


    this.completeLevel = function(levelName, partialsTab){
        if(partialsTab.search('W') != -1){
            if(typeof this.levelsCompletion[levelName] == 'undefined')
                this.levelsCompletion[levelName] = {partials:[]};

            var l = this.levelsCompletion[levelName].partials.length;
            this.levelsCompletion[levelName].partials[ l ] = partialsTab;

            this.scalePartials(levelName);

            this.saveCampain();
            this.countGoldAndFlags();
        }
        this.updateHtml();
    }

    this.scalePartials = function(levelName){
        var P = this.levelsCompletion[levelName].partials;

        var e = 1;
        while((e = this.scalePartials_find(P))!==false){
            var vP = [];
            for(var a in P)
                if(a != e)
                    vP[ vP.length ] = P[a];
            P = vP;
        }
        this.levelsCompletion[levelName].partials = P;
    }

    this.scalePartials_find = function(P){
        for(var a in P)
            for(var b in P){
                if(a==b) continue;
                var isIn = true;
                for(var i=0; i<P[a].length; ++i)
                    if(P[a][i]=='W' && P[b][i]=='L'){
                        isIn = false;
                        break;
                    }
                if(isIn) return a;
            }
        return false;
    }

    this.getSavedCampain = function(){
        cookie = getCookie('MistForge_BraveBlueA');
        if(cookie != ''){

        }
        //....
        this.countGoldAndFlags();
    }
    this.saveCampain = function(){
        var cookie = '';
        for(var i in this.levelsCompletion){
            var C = this.levelsCompletion[i];
            cookie += '|'+i+'-';
            for(var p in C.partials){
                var P = C.partials[p];
                for(var t in P){
                    if(P[t]=='W') cookie += 'W';
                        else      cookie += 'L';
                }
                cookie += '-';
            }
        }
        setCookie('MistForge_BraveBlueA',cookie,1000);
    }

    this.countGoldAndFlags = function(){
        this.goldTotal = 0;
        this.campainFlags = {};
        this.campainRoutes = {};

        for(var levelName in this.levelsCompletion){
            var L = this.levelsCompletion[levelName];
            var P = L.partials;

            var WinC = BBAdata['MAPS'][levelName].WinningConds;
            var Routes = {};
            if(BBAdata['MAPS'][levelName].Routes)
                Routes = BBAdata['MAPS'][levelName].Routes;

            for(var w in WinC){
                var jest = false;
                for(var p in P)
                    if(P[p][w] == 'W'){
                        jest = true;
                        break;
                    }
                if(jest) this.WinC_addGoldAndFlags(Routes,WinC[w]);
            }

            this.goldTotal-=-this.countPartialsBonus(P);
        }
    }

    this.WinC_addGoldAndFlags = function(Routes,WinCw){
        if(typeof WinCw.RewardGold != 'undefined'){
            if(WinCw.RewardGold) this.goldTotal-=-WinCw.RewardGold;
                    else         this.goldTotal-=-100;
        }else
            this.goldTotal-=-100;

        if(typeof WinCw.RewardFlags != 'undefined')
            for(var flag in WinCw.RewardFlags){
                this.campainFlags[flag]=1;
                if(typeof Routes[flag] != 'undefined')
                    for(var r in Routes[flag])
                        this.campainRoutes[r] = cloneObj(Routes[flag][r]);
            }

    }

    this.countPartialsBonus = function(P){
        var max = 0;
        for(var p in P){
            var count = 0;
            for(var w in P[p])
                if(P[p][w]=='W') ++count;
            if(max < count) max = count;
        }
        return (max-1)*50;
    }

    this.updateHtml = function(){
        var html = '';

        html += '<div class="gold">'+this.goldTotal+'</div>';
        for(var flag in this.campainFlags)
            html += flag+', ';
        for(var route in this.campainRoutes)
            html += route+', ';

        $('#goldContainer').html('<div>'+html+'</div>');
    }
}
