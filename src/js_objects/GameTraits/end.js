GAMEobject.prototype.killPlayer = function(){
    this.C.playerDead = 1;
    this.O[0].speed = 0;

    setTimeout("GAME.endGame();",3500);
}
GAMEobject.prototype.endGame = function(){
    window.cancelAnimationFrame(this.intervalIndex);
    if(this.doEndGame==true) return false;
    this.doEndGame=true;

    var html='';

    html='<span style="font-size: 70px;">Game End!</span><br/>';

    $('#Game').append('<div id="endGameBoard">'+html+'</div>');

    setTimeout("$('#Game').unbind('click').click(function(){ GAME.goToMenu(); });",700);
}
GAMEobject.prototype.goToMenu = function(){
    $(window).unbind();
    delete GAME;
    $('#Game').unbind('click').html('').hide();
    $('#Menu').show();
}
