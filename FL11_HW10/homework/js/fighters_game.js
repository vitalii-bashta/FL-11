const onePercent = 0.01;
function Fighter(obj) {
	let {
		name,
		damage,
		agility,
		hp
	} = obj;
	let winCounter = 0;
	let lossCounter = 0;
	let maxHp = hp;
	return {
		getName() {
			return name;
		},
		getDamage() {
			return damage;
		},
		getAgility() {
			return agility;
		},
		getHealth() {
			return hp;
		},
		addWin() {
			winCounter++
		},
		addLoss() {
			lossCounter++
		},
		logCombatHistory() {
			return `Name: ${name}, Wins: ${winCounter}, Losses: ${lossCounter}`
		},
		dealDamage(damageAmount) {
			hp -= damageAmount;
			if (hp < 0) {
				hp = 0
			}
		},
		heal(healFor) {
			hp += healFor;
			if (hp > maxHp) {
				hp = maxHp
			}
		},
		attack(fighter2) {
			let damageChance = Math.random() <= 1 - fighter2.getAgility() * onePercent;
			if (damageChance) {
				fighter2.dealDamage(damage);
				console.log(`${name} makes ${damage} to ${fighter2.getName()}`);
			} else {
				console.log(`${name} attack missed`)
			}
		}
	}
}

function battle(fighter1, fighter2) {
	let fighterOneTurn = true;
	if (fighter1.getHealth() > 0 && fighter2.getHealth() > 0) {
		while (fighter1.getHealth() > 0 && fighter2.getHealth() > 0) {
			if (fighterOneTurn) {
				fighter1.attack(fighter2);
			} else {
				fighter2.attack(fighter1);
			}
			fighterOneTurn = !fighterOneTurn;
		}
		if (fighter1.getHealth() > fighter2.getHealth()) {
			fighter1.addWin();
			fighter2.addLoss()
		} else {
			fighter1.addLoss();
			fighter2.addWin();
		}
	} else {
		if (fighter1.getHealth() > fighter2.getHealth()) {
			console.log(`${fighter2.getName()} is dead and can't fight`)
		} else {
			console.log(`${fighter1.getName()} is dead and can't fight`)
		}
	}
}
