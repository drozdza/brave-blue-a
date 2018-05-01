BBAdata.collisionMatrix = {
    'P'   :['A','F','PF','PMF'], // Player
    'PM'  :['E','A','PMF','F'], // Player Missiles/Bombs
    'E'   :['EF','EMF','F'], // Enemies
    'EM'  :['EMF','F'],  // Enemy Missiles/Bombs
    'A'   :[], // Asteroids
    'F'   :['A'], // Fields
    'PF'  :[], // Player Fields
    'EF'  :[], // Enemy Fields
    'PMF' :[], // Player Fields
    'EMF' :[], // Enemy Fields
    'D'   :[], // Dead objects (for spotting)
};
BBAdata.collisionBullets = {
    'EB':['P','EMF','F'],
    'PB':['E','A','F','EMF'],
    'B':['P','E','A','F','EF','EM'],
};
