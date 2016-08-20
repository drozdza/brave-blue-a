GAMEobject.prototype.killPlayer = function(){
    this.C.playerDead = 1;
    this.O[0].speed = 0;

    setTimeout("GAME.endGame();",3500);
}
GAMEobject.prototype.endGame = function(){
    if(this.endGameShown) return true;
    this.endGameShown = true;

    this.showScoringScreen();

    setTimeout("GAME.stopAnimations();",3500);
    setTimeout("$('#Game').unbind('click').click(function(){ GAME.goToMenu(); });",700);
}
GAMEobject.prototype.teleportShipOut = function(){
    this.playerEndGame = true;
    var Ox,Oy,L, O = this.O[0];
    O.viewOff = true;
    O.undestructible = 1;
    O.speed = 0;

    this.putObj_animation('hit_blue', O.x, O.y);

    L = this.putObj_directAnim('TP_track', {timeDeath: 18});

    var pathD = ['M',{x: O.x, y: O.y}];

    // All Enemies loose theyr intereset

    Ox = O.x- -1700 * Math.sin( (-parseInt(O.angle)-180)*(Math.PI/180));
    Oy = O.y- -1700 * Math.cos( (-parseInt(O.angle)-180)*(Math.PI/180));

    this.O[ L ].pathD=pathD.concat(['L',{x: Ox, y: Oy}]);

    setTimeout("GAME.endGame();",800);
}
GAMEobject.prototype.showScoringScreen = function(){
    var html = '';
    html += '<span style="font-size: 70px;">Game End!</span><br/>';

    html += this.showEndGameCount();

    $('#Game').append('<div id="endGameBoard">'+html+'</div>');
}
GAMEobject.prototype.stopAnimations = function(){
    window.cancelAnimationFrame(this.intervalIndex);
    this.doEndGame=true;
}
GAMEobject.prototype.goToMenu = function(){
    $(window).unbind();
    this.stopAnimations();
    delete GAME;
    $('#Game').unbind('click').html('').hide();
    $('#Menu').show();
}
