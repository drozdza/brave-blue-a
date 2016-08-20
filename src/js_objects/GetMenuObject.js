function GetMenuObject(){

    this.data={
        DEBUG:{
            get: 'debug',
            values: {Off:false, On:1},
        },
        BLUR:{
            get: 'blur',
            values: {Off:false, On:1},
        },
        FRAMES:{
            get: 'frames',
            values: {Max:false, M1:1, M2:2, M3:3, M4:4},
        },
        CANVAS:{
            get: 'canvas',
            values: {Off:false, On:1, BG:2},
        },
        FPS:{
            get: 'fps',
            values: {Off:false, Minimal:1, Graph:2, Max:3},
        },
        SETF:{
            get: 'setFrames',
            values: {'5':5, '10':10, '20':20, '30':false, '45':45},
        },
        GAMESTATS:{
            get: 'gameStats',
            values: {Off:false, On:1},
        },
    };

    this.makeHtml = function(){
        var html='<div id="GET_MENU">';

        for(var i in this.data){
            var D = this.data[i];
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

        for(var getD in BBAdata.GET){
            var getN = this.data[getD].get;
            var get = BBAdata.GET[getD];

            if(getName == getN){
                if(value == get) current = 'class="current"';
                if(getN=='setFrames' && get==30 && !value) current = 'class="current"';
                if(value != false)
                  link+=getN+'='+value+'&';
            }else{
                if(get != 0 && !(getN=='setFrames' && get==30))
                    link+=getN+'='+get+'&';
            }
        }

        return '<a '+current+' href="'+link+'">'+name+'</a>';
    }

}
