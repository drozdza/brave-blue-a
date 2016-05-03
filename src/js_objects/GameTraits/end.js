
GAMEobject.prototype.endGame = function(){
    window.cancelAnimationFrame(this.intervalIndex);
    if(this.doEndGame==true) return false;
    this.doEndGame=true;

    var html='';
    if(this.EnemiesC==0 && this.O[0].life > 0)
        html='<span style="font-size: 70px;">You Won!</span><br/>';
    else
        html='<span style="font-size: 70px;">'+this.EnemiesC+' enemies left</span><br/>';
    $('#Game').append('<div id="endGameBoard">'+html+'</div>');

    $('.enemy').each(function(){
        var html='',Letter,T = $(this).attr('class');
        if(T.indexOf('dregos') > -1) Letter='U';
        if(T.indexOf('carras') > -1) Letter='A';
        if(T.indexOf('muerto') > -1) Letter='M';
        if(T.indexOf('orhenes') > -1) Letter='Q';
        if(T.indexOf('tartaros') > -1) Letter='T';
        if(T.indexOf('belzebub') > -1) Letter='B';
        if(T.indexOf('nemezis') > -1) Letter='N';
        if(T.indexOf('koriaz') > -1) Letter='K';
        if(T.indexOf('cloaker') > -1) Letter='C';
        if(T.indexOf('fariax') > -1) Letter='F';
        if(T.indexOf('gargamon') > -1) Letter='G';
        if(T.indexOf('hajaher') > -1) Letter='S';
        if(T.indexOf('dandares') > -1) Letter='D';
        if(T.indexOf('juggernaut') > -1) Letter='J';
        if(T.indexOf('vitotas') > -1) Letter='V';
        if(T.indexOf('edison') > -1) Letter='E';
        if(T.indexOf('hiacynt') > -1) Letter='H';
        if(T.indexOf('warastein') > -1) Letter='W';
        if(T.indexOf('iskariot') > -1) Letter='I';
        if(T.indexOf('royale') > -1) Letter='R';

        if(T.indexOf('life-dead') > -1) html='<span class="killed">'+Letter+'</span> ';
                    else            html=Letter+' ';
        $('#endGameBoard').append(html);
    });
    setTimeout("$('#Game').unbind('click').click(function(){ GAME.goToMenu(); });",1200);

}
GAMEobject.prototype.goToMenu = function(){
    $(window).unbind();
    delete GAME;
    $('#Game').unbind('click').html('').hide();
    $('#Menu').show();
}
