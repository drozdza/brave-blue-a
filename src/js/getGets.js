BBAdata.GET={
    MENU:0,
    DEBUG:0,
    ORDERS:0,
    BLUR:0,
    FRAMES:4,
    CANVAS:0,
    FPS:0,
    SETF:30,
    GAMESTATS:0,
    MAPSMODE:0,
    SHIPPRESET:0,
    PAUSEDEBUG:2,
};
(function(){
    var GETs = document.location.href.split('?')[1];
    if(typeof GETs != 'undefined'){
        GETs = GETs.split('&');
        for(var gi=0; gi<GETs.length; ++gi){
            var BUM = GETs[gi].split('=');
            switch(BUM[0]){
                case 'menu':         BBAdata.GET.MENU         = BUM[1]; break;
                case 'debug':        BBAdata.GET.DEBUG        = BUM[1]; break;
                case 'orders':       BBAdata.GET.ORDERS       = BUM[1]; break;
                case 'blur':         BBAdata.GET.BLUR         = BUM[1]; break;
                case 'frames':       BBAdata.GET.FRAMES       = BUM[1]; break;
                case 'canvas':       BBAdata.GET.CANVAS       = BUM[1]; break;
                case 'fps':          BBAdata.GET.FPS          = BUM[1]; break;
                case 'setFrames':    BBAdata.GET.SETF         = BUM[1]; break;
                case 'gameStats':    BBAdata.GET.GAMESTATS    = BUM[1]; break;
                case 'mapsMode':     BBAdata.GET.MAPSMODE     = BUM[1]; break;
                case 'shipPresets':  BBAdata.GET.SHIPPRESET   = BUM[1]; break;
                case 'pauseDebug':   BBAdata.GET.PAUSEDEBUG   = BUM[1]; break;
            }
        }
    }
})();
