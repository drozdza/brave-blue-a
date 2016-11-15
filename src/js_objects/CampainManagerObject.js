CampainManagerObject = function(){

    this.goldTotal = 0;
    this.goldLeft = 0;
    this.campainFlags = {};
    this.levelsCompletion = {};

    this.makeCampain = function(){
        this.getSavedCampain();
    }


    this.completeLevel = function(levelName, partialsTab){
        console.log(levelName, partialsTab);
        if(typeof this.levelsCompletion[levelName] == 'undefined')
            this.levelsCompletion[levelName] = {partials:[]};

        var l = this.levelsCompletion[levelName].partials.length;
        this.levelsCompletion[levelName].partials[ l ] = partialsTab;

        this.scalePartials(levelName);

        console.log(this.levelsCompletion);
        this.saveCampain();
        this.countGoldAndFlags();
    }

    this.scalePartials = function(levelName){
        var P = this.levelsCompletion[levelName].partials;

        var toRemove = {};
        for(var a in P)
            for(var b in P){
                var isIn = true;
                for(var i in P[a])
                    if(P[a][i]=='W' && P[b][i]=='L'){
                        isIn = false;
                        break;
                    }
                if(isIn) toRemove[a] = true;
            }

        var vP = [];
        for(var a in P){
            if(typeof toRemove[a] == 'undefined')
                vP[ vP.length ] = P[a];
        }
        this.levelsCompletion[levelName].partials = vP;
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
            cookie += '|'+i+':';
            for(var p in C.partials){
                var P = C.partials[p];
                for(var t in P){
                    if(P[t]=='W') cookie += 'W';
                        else      cookie += 'L';
                }
                cookie += ':';
            }
        }
        setCookie('MistForge_BraveBlueA',cookie,1000);
    }

    this.countGoldAndFlags = function(){

    }
}
