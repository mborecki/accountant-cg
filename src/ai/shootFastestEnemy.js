import Enemies from 'enemies';

let enemiesCount = null;

export default function() {
    let enemy = Enemies.getFastest();

    return {
        action: 'SHOOT',
        id: enemy.id
    }
}
