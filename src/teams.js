import Enemies, {EnemiesClass} from './enemies.js';
import {distance} from './utils.js';

const TEAM_RANGE = 500;

class Team {
    constructor(enemies) {
        this.enemies = enemies;

        this.optimaze();
    }

    optimaze() {
        this.seed = this.enemies.getMiddle();
        let outsiders = this.enemies.filter((enemy) => {
            return distance(enemy.cords, this.seed) > TEAM_RANGE;
        });

        if (!outsiders.size) {
            return;
        }

        let outsider = outsiders.getFarrest(this.seed);

        let newSeed = outsider.cords;

        let newTeam = [];
        let toDel = [];

        this.enemies.data.forEach((enemy) => {
            if (distance(enemy.cords, this.seed) < distance(enemy.cords, newSeed)) {
                newTeam.push(enemy);
                toDel.push(enemy.id);
            }
        });

        toDel.forEach((id) => {
            this.enemies.delete(id);
        });

        TEAMS.add(new EnemiesClass(newTeam));

        this.optimaze();
    }
}

class Teams {
    constructor() {
        this.data = new Set();
    }

    add(enemies) {
        this.data.add(new Team(enemies));
    }

    get size() {
        return this.data.size;
    }

    clear() {
        this.data.clear();
    }
}

const TEAMS = new Teams();

export default TEAMS;

export function buildTeams() {
    TEAMS.clear();
    let teamsData = new Map();
    let targetsId = new Set();

    function addEnemy(enemy) {
        let target = enemy.getClosestTarget();

        let team = teamsData.get(target.id);
        if (!team) {
            team = [];
            teamsData.set(target.id, team);
        }

        team.push(enemy);
    }

    Enemies.data.forEach((enemy) => {
        addEnemy(enemy);
    });

    teamsData.forEach((team) => {
        TEAMS.add(new EnemiesClass(team));
    })
}
