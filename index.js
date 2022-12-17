import { getRandomInt, doesEventOccurWithProbability } from "./utils";

class Arena {
    static #selectAttacker(player1, player2) {
        if (doesEventOccurWithProbability(50)) return player1;
        return player2;
    }

    static #logWinner(player1, player2) {
        if (player1.HP > 0) {
            console.log(player1.name + " win!");
        } else {
            console.log(player2.name + " win!");
        }
        console.log(
            "================================================================================================"
        );
    }

    static #isAbilityActive(player) {
        if (doesEventOccurWithProbability(10)) {
            player.activateAbility();
        }
    }

    static #logStats(player1, player2) {
        const columns = [
            "name",
            "type",
            "HP",
            "armour",
            "evasion",
            "minDamage",
            "maxDamage",
            "hitChance",
        ];
        console.table([player1, player2], columns);
    }

    static tournament(player1, player2) {
        console.log(
            "================================================================================================"
        );
        console.log("Round starts!");
        this.#logStats(player1, player2);
        let roundIndex = 1;
        do {
            console.log("Round " + roundIndex);

            this.#isAbilityActive(player1);
            this.#isAbilityActive(player2);

            const selectedAttacker = this.#selectAttacker(player1, player2);

            if (selectedAttacker.name === player1.name) {
                player2.defend(player1.attack());
            } else {
                player1.defend(player2.attack());
            }

            this.#logStats(player1, player2);

            if (player1.ability.isActive) {
                player1.deactivateAbility();
            }
            if (player2.ability.isActive) {
                player2.deactivateAbility();
            }

            roundIndex++;
        } while (player1.HP > 0 && player2.HP > 0);

        this.#logWinner(player1, player2);
    }
}

class Hero {
    #activableAbilities = {
        "armour boost": (activate) => {
            if (activate) {
                this.armour += 10;
            } else {
                this.armour -= 10;
            }
        },
        dodge: (activate) => {
            if (activate) {
                this.evasion += 100;
            } else {
                this.evasion -= 100;
            }
        },
        "fire storm": (activate) => {
            if (activate) {
                this.minDamage += 20;
                this.maxDamage += 20;
            } else {
                this.minDamage -= 20;
                this.maxDamage -= 20;
            }
        },
        "head shot": (activate) => {
            if (activate) {
                this.minDamage += 15;
                this.maxDamage += 15;
            } else {
                this.minDamage -= 15;
                this.maxDamage -= 15;
            }
        },
        heal: () => {
            this.HP += 10;
        },
    };

    #heroWeaponTypes = {
        warrior: "battle axe",
        rouge: "dagger",
        priest: "war hammer",
        archer: "bow",
        mage: "wand",
    };

    equipWeapon(weapon) {
        const heroType = this.type;

        if (
            weapon.type === "sword" ||
            this.#heroWeaponTypes[heroType] === weapon.type
        ) {
            this.minDamage = weapon.minDamage;
            this.maxDamage = weapon.maxDamage;
            this.hitChance = weapon.hitChance;
            this.weapon = weapon.type;
        } else {
            console.log("Invalid weapon type!");
        }
    }

    activateAbility() {
        console.log(this.name + " activated " + this.ability.type);
        this.ability.isActive = true;

        this.#activableAbilities[this.ability.type](true);
    }

    deactivateAbility() {
        this.ability.isActive = false;

        if (!this.ability.isPermanent) {
            this.#activableAbilities[this.ability.type](false);
        }
    }

    attack() {
        console.log(this.name + " Attacking...");

        const calcDamage = () => {
            return getRandomInt(this.minDamage, this.maxDamage);
        };

        const damage = calcDamage();

        return {
            hitChance: this.hitChance,
            damage,
        };
    }

    defend({ hitChance: incomingHitChance, damage: incomingDamage }) {
        console.log(this.name + " Defending...");
        const hitChance = incomingHitChance - this.evasion;

        if (!doesEventOccurWithProbability(hitChance)) {
            console.log("Successful defend!");
            return;
        }

        const calcFinalDamage = (initialDamage) => {
            return initialDamage - Math.floor(this.armour / 3);
        };

        const finalDamage = calcFinalDamage(incomingDamage);

        this.HP -= finalDamage;

        console.log("Successful attack! Initial Damage: " + incomingDamage);
        console.log("Successful attack! Final Damage: " + finalDamage);
    }
}
/* =============================
        Hero classes
============================= */

class Warrior extends Hero {
    type = "warrior";
    weapon = "none";
    HP = 100;
    ability = {
        type: "armour boost",
        isActive: false,
        isPermanent: false,
    };
    armour = 5;
    evasion = 20;
    minDamage = 0;
    maxDamage = 0;
    hitChance = 0;

    constructor(name) {
        super();
        this.name = name;
    }
}

class Priest extends Hero {
    type = "priest";
    weapon = "none";
    HP = 90;
    ability = {
        type: "heal",
        isActive: false,
        isPermanent: true,
    };
    armour = 4;
    evasion = 20;
    minDamage = 0;
    maxDamage = 0;
    hitChance = 0;

    constructor(name) {
        super();
        this.name = name;
    }
}

class Mage extends Hero {
    type = "mage";
    weapon = "none";
    HP = 70;
    ability = {
        type: "fire storm",
        isActive: false,
        isPermanent: false,
    };
    armour = 1;
    evasion = 5;
    minDamage = 0;
    maxDamage = 0;
    hitChance = 0;

    constructor(name) {
        super();
        this.name = name;
    }
}

class Rouge extends Hero {
    type = "rouge";
    weapon = "none";
    HP = 80;
    ability = {
        type: "dodge",
        isActive: false,
        isPermanent: false,
    };
    armour = 3;
    evasion = 30;
    minDamage = 0;
    maxDamage = 0;
    hitChance = 0;

    constructor(name) {
        super();
        this.name = name;
    }
}

class Archer extends Hero {
    type = "archer";
    weapon = "none";
    HP = 80;
    ability = {
        type: "head shot",
        isActive: false,
        isPermanent: false,
    };
    armour = 2;
    evasion = 15;
    minDamage = 0;
    maxDamage = 0;
    hitChance = 0;

    constructor(name) {
        super();
        this.name = name;
    }
}

/* =============================
        Weapon classes
============================= */

class Sword {
    type = "sword";
    minDamage = 8;
    maxDamage = 12;
    hitChance = 90;
}

class Dagger {
    type = "dagger";
    minDamage = 4;
    maxDamage = 5;
    hitChance = 98;
}

class WarHammer {
    type = "war hammer";
    minDamage = 10;
    maxDamage = 15;
    hitChance = 93;
}

class BattleAxe {
    type = "battle axe";
    minDamage = 12;
    maxDamage = 15;
    hitChance = 92;
}

class Bow {
    type = "bow";
    minDamage = 7;
    maxDamage = 12;
    hitChance = 89;
}

class Wand {
    type = "wand";
    minDamage = 9;
    maxDamage = 15;
    hitChance = 97;
}

/* =============================
Play with different characters
============================= */

const pista = new Priest("Pista");
const bence = new Mage("Bence");

pista.equipWeapon(new WarHammer());
bence.equipWeapon(new Wand());

Arena.tournament(pista, bence);
