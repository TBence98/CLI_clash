# CLI_clash
A simple CLI game where warriors from a fantasy world can fight each other.

## Heroes
The heroes are those who can fight each other in the arena. In addition to the listed properties, the heroes have a common characteristic that they have a name.

| Type     | HP       | Abilities | Armour    | Evasion   |
|----------|----------|-----------|-----------|-----------|
| Warrior  | 100      | Armour    | 5         | 20        |
| Priest   | 90       | Heal      | 4         | 20        |
| Mage     | 70       | Firestorm | 1         | 5         |
| Rogue    | 80       | Dodge     | 3         | 30        |
| Archer   | 80       | Headshot  | 2         | 15        |

## Weapons
Each weapon has a damage value and a hit probability. The damage value determines how much damage the opponent will receive in a given round. The hit probability indicates the likelihood of hitting the opponent. Heroes are not able to use every weapon, so certain weapons can only be used by heroes of a certain class. If a hero receives a weapon that they cannot use, they will receive 0 damage.

| Weapon Name | Who Can Use It | Damage    | Hit Chance |
|-------------|----------------|-----------|------------|
| Sword       | Everybody      | 8 - 12    | 90%        |
| Dagger      | Rogue          | 4 - 5     | 98%        |
| War Hammer  | Priest         | 10 - 15   | 93%        |
| Battle Axe  | Warrior        | 12 - 15   | 92%        |
| Bow         | Archer         | 7 - 12    | 89%        |
| Wand        | Mage           | 9 - 15    | 97%        |

## Abilities
Abilities give heroes various bonuses. Each ability has a 10% chance of activating within a round.

| Ability       | Effect                    |
|---------------|---------------------------|
| Armour Boost  | +10 armour in the round   |
| Dodge         | +100 evasion in the round |
| FireStorm     | +20 damage in the round   |
| HeadShot      | +15 damage in the round   |
| Heal          | +10 hp                    |

## Arena
The arena is responsible for the battle. Two heroes participate in the fight. Each hero can make one attack per round. The heroes attack in random order within the rounds. The one who remains standing wins, that is, the other hero's HP is depleted. The damage suffered is obtained by: reducing the damage received from the other hero by the lower integer value of one third of the armor value of the hero suffering the hit.

𝑓𝑖𝑛𝑎𝑙𝐷𝑎𝑚𝑎𝑔𝑒 = 𝑖𝑛𝑖𝑡𝑖𝑎𝑙𝐷𝑎𝑚𝑎𝑔𝑒 − ( 𝑎𝑟𝑚𝑜𝑢𝑟 / 3 )

Furthermore, with every received hit, the hero has a chance to evade the attack. So if the evasion is 10%, then it is 10% chance to evade. If it is 100%, then it is a 100% chance that the hero will evade the attack.

To run this application, you will need ```node``` to be installed.

Installation:
```sh
npm install
```

To run the App:
```sh
npm start
```

To test the App:
```sh
npm test
```
