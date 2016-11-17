BBAdata.GET={
    DEBUG:0,
    BLUR:0,
    FRAMES:0,
    CANVAS:0,
    FPS:0,
    SETF:30,
    GAMESTATS: 0,
    MAPSMODE: 0,
    SHIPPRESET: 0,

};
(function(){
    var GETs = document.location.href.split('?')[1];
    if(typeof GETs != 'undefined'){
        GETs = GETs.split('&');
        for(var gi=0; gi<GETs.length; ++gi){
            var BUM = GETs[gi].split('=');
            switch(BUM[0]){
                case 'debug':       BBAdata.GET.DEBUG      = BUM[1]; break;
                case 'blur':        BBAdata.GET.BLUR       = BUM[1]; break;
                case 'frames':      BBAdata.GET.FRAMES     = BUM[1]; break;
                case 'canvas':      BBAdata.GET.CANVAS     = BUM[1]; break;
                case 'fps':         BBAdata.GET.FPS        = BUM[1]; break;
                case 'setFrames':   BBAdata.GET.SETF       = BUM[1]; break;
                case 'gameStats':   BBAdata.GET.GAMESTATS  = BUM[1]; break;
                case 'mapsMode':    BBAdata.GET.MAPSMODE   = BUM[1]; break;
                case 'shipPresets': BBAdata.GET.SHIPPRESET = BUM[1]; break;
            }
        }
    }
})();
