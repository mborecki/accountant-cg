import Enemies from 'enemies';

export default function() {
    let enemy = Enemies.getFirst();

    return {
        action: 'SHOOT',
        id: enemy.id
    }
}
