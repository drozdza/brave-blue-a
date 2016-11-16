CampainManagerObject = function(){

    this.goldTotal = 0;
    this.goldLeft = 0;
    this.campainFlags = {};
    this.campainRoutes = {};
    this.levelsCompletion = {};

    this.makeCampain = function(){
        this.getSavedCampain();
    }


    this.completeLevel = function(levelName, partialsTab){
        console.log(levelName, partialsTab);
        if(partialsTab.search('W') != -1){
            if(typeof this.levelsCompletion[levelName] == 'undefined')
                this.levelsCompletion[levelName] = {partials:[]};

            var l = this.levelsCompletion[levelName].partials.length;
            this.levelsCompletion[levelName].partials[ l ] = partialsTab;

            this.logPartials();

            this.scalePartials(levelName);

            this.logPartials();

            this.saveCampain();
            this.countGoldAndFlags();
        }
    }

    this.logPartials = function(){ // to later remove
        for(var i in this.levelsCompletion){
            var L = this.levelsCompletion[i];
            for(var j in L.partials){
                console.log(i+' '+L.partials[j]);
            }
        }
    }

    this.scalePartials = function(levelName){
        var P = this.levelsCompletion[levelName].partials;

        var e = 1;
        while((e = this.scalePartials_find(P))!==false){
            var vP = [];
            for(var a in P){
                if(a != e)
                    vP[ vP.length ] = P[a];
            }
            P = vP;
        }
        this.levelsCompletion[levelName].partials = P;
    }

    this.scalePartials_find = function(P){
        for(var a in P)
            for(var b in P){
                if(a==b) continue;
                console.log('Porownajmy:',P[a],P[b]);
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
        console.log(cookie);
    }

    this.countGoldAndFlags = function(){
        this.goldTotal = 0;
        this.campainFlags = {};
        this.campainRoutes = {};

        for(var levelName in this.levelsCompletion){
            var L = this.levelsCompletion[levelName];

            var WinC = BBAdata['MAPS'][levelName].WinningConds;

            for(var w in WinC){
                var jest = false;
                for(var p in L.partials)
                    if(P[p][w] == 'W'){
                        jest = true;
                        break;
                    }
                if(jest) this.WinC_addGoldAndFlags(levelName,WinC[w]);

            }
        }
    }
    this.WinC_addGoldAndFlags(leveName,WinCw){
        var Routes = {};
        if(BBAdata['MAPS'][levelName].Routes) Routes = Routes;
        if(typeof WinCw.Reward != 'undefined'){
            if(WinCw.Reward.Gold) this.goldTotal-=-WinCw.Reward.Gold;
                    else          this.goldTotal-=-100;
            for(var flag as WinCw)

        }else{
            this.goldTotal-=-100;
        }

    }
}
