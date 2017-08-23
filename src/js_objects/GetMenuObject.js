function GetMenuObject(){

    this.data={
        MENU:{
            get: 'menu',
            values: {Off:0, On:1},
            default: 0,
        },
        DEBUG:{
            get: 'debug',
            values: {Off:0, On:1,Ts:2,TsF:3},
            default: 0,
        },
        BLUR:{
            get: 'blur',
            values: {Off:0, On:1, Align:2},
            default: 0,
        },
        FRAMES:{
            get: 'frames',
            values: {Max:0, M1:1, M2:2, M3:3, M4:4},
            default: 4,
        },
        CANVAS:{
            get: 'canvas',
            values: {Off:false, On:1, BG:2},
            default: false,
        },
        FPS:{
            get: 'fps',
            values: {Off:false, Minimal:1, Graph:2, Max:3},
            default: false,
        },
        SETF:{
            get: 'setFrames',
            values: {'5':5, '10':10, '20':20, '30':30, '45':45},
            default: 30,
        },
        GAMESTATS:{
            get: 'gameStats',
            values: {Off:false, On:1},
            default: false,
        },
        MAPSMODE:{
            get: 'mapsMode',
            values: {Campain:false, Test:1},
            default: false,
        },
        SHIPPRESET:{
            get: 'shipPresets',
            values: {start: 0, start2:'start2', destFields: 'destFields', bombs1: 'bombs1', bombs2: 'bombs2', best: 'best', bombardier: 'bombardier', bombardier2: 'bombardier2', ethernal: 'ethernal'},
            default: 0,
        },
    };

    this.makeHtml = function(){
        if(BBAdata.GET.MENU == 0) return '<div id="hiddenMenu">'+this.makeLink('menu', 1, 'MENU')+'</div>';
        var html='<div id="GET_MENU">';

        for(var i in this.data){
            var D = this.data[i];
            if(!D.values) continue;
            html+='<div><span>'+i+':</span>';
            for(var u in D.values)
                html+=' '+this.makeLink(D.get,D.values[u],u);
            html+='</div>';
        }
        return html+'</div>';
    }

    this.makeLink = function(getName,value,name){
        var link = '?';
        var current = '';

        for(var iGetData in BBAdata.GET){
            var iGet = this.data[iGetData];
            var getValue = BBAdata.GET[iGetData];

            if(getName == iGet.get){
                if(value == getValue) current = 'class="current"';
                if(iGet.get=='setFrames' && getValue==30 && !value) current = 'class="current"';
                if(value != false)
                  link+=iGet.get+'='+value+'&';
            }else{
                if(getValue != iGet.default && !(iGet.get=='setFrames' && getValue==30))
                    link+=iGet.get+'='+getValue+'&';
            }
        }

        return '<a '+current+' href="'+link+'">'+name+'</a>';
    }

}
