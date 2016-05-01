GET={
    DEBUG:0,
    BLUR:0,
    FRAMES:0,
    CANVAS:0,
    FPS:0,
};
(function(){
    var GETs = document.location.href.split('?')[1];
    if(typeof GETs != 'undefined'){
        GETs = GETs.split('&');
        for(var gi=0; gi<GETs.length; ++gi){
            var BUM = GETs[gi].split('=');
            switch(BUM[0]){
                case 'debug':  GET['DEBUG']  = BUM[1]; break;
                case 'blur':   GET['BLUR']   = BUM[1]; break;
                case 'frames': GET['FRAMES'] = BUM[1]; break;
                case 'canvas': GET['CANVAS'] = BUM[1]; break;
                case 'fps':    GET['FPS']    = BUM[1]; break;
            }
        }
    }
})();
