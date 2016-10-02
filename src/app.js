/**
 * Shoot enemies before they collect all the incriminating data!
 * The closer you are to an enemy, the more damage you do but don't get too close or you'll get killed.
 **/


// game loop
while (true) {
    var inputs = readline().split(' ');
    var x = parseInt(inputs[0]);
    var y = parseInt(inputs[1]);
    var dataCount = parseInt(readline());
    for (var i = 0; i < dataCount; i++) {
        var inputs = readline().split(' ');
        var dataId = parseInt(inputs[0]);
        var dataX = parseInt(inputs[1]);
        var dataY = parseInt(inputs[2]);
    }
    var enemyCount = parseInt(readline());
    for (var i = 0; i < enemyCount; i++) {
        var inputs = readline().split(' ');
        var enemyId = parseInt(inputs[0]);
        var enemyX = parseInt(inputs[1]);
        var enemyY = parseInt(inputs[2]);
        var enemyLife = parseInt(inputs[3]);
    }

    // Write an action using print()
    // To debug: printErr('Debug messages...');

    print('MOVE 8000 4500'); // MOVE x y or SHOOT id
}
