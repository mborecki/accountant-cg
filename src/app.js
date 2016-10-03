import input from 'input';
import output from 'output';

let turnCounter = 0;

// game loop
while (true) {
    printErr(' --- TURN ' + turnCounter++ + ' ---');
    input();

    output();
}
