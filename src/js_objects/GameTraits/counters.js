GAMEobject.prototype.toWin = function(){


}

GAMEobject.prototype.prepareCounts = function(){
    this.C = {
        enemies:0,
        enemiesDead:0,
        seconds:0,
        playerDead:0,
        S_lifeHealed:0,
        S_shieldProd:0,
        S_lifeLost:0,
        S_shieldLost:0
    };
    this.CE = {};
}
GAMEobject.prototype.countCounts = function(){

    this.C.enemies = 0;
    this.CE = {};
    for(var i in this.Enemies){
        ++this.C.enemies;
        var T = this.O[i].T;
        if(typeof this.CE[T] == 'undefined')
            this.CE[T]=0;
        ++this.CE[T];
    }

    this.C.seconds++;
}
GAMEobject.prototype.showCounts = function(){
    this.countCounts();

    var html = '';
    for(var i in this.C) html+=i+': '+this.C[i]+'<br>';
    for(var i in this.CE) html+='E:'+i+': '+this.CE[i]+'<br>';
    $('#countEnemies').html(html);
}
