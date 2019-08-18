const caloriesMap = {
    cheese: 120,
    secretIngredient: 100,
    tomato: 20
}

function Hamburger(type, cal, secret = false) {
    let calories = cal;
    this.cheese = false;
    this.tomato = 0;
    this.secretIngredient = secret;
    this.bites = 0;
    this.type = type;

    if (this.secretIngredient) {
        this.addCalories(caloriesMap.secretIngredient);
    }

    this.setCalories = function (newCal) {
        calories = newCal;
    }

    this.getCalories = function () {
        return calories;
    }

    this.addCalories = function(addCal) {
        calories = this.getCalories() + addCal;
    }
}

Hamburger.prototype.addCheese = function () {
    if (this.cheese) {
        console.log('Sorry, you can add cheese only once');
        return;
    }
    if (this.bites) {
        console.log('Sorry, you cannot add cheese');
        return;
    }
    this.cheese = true;
    this.addCalories(caloriesMap.cheese);
}

Hamburger.prototype.addTomato = function () {
    if (this.tomato >= 2) {
        console.log('Sorry, you can add tomato only twice');
        return;
    }
    if (this.bites) {
        console.log('Sorry, you cannot add tomato');
        return;
    }
    this.tomato++;
    this.addCalories(caloriesMap.tomato);
}

Hamburger.prototype.addSecretIngredient = function () {
    if (this.secretIngredient) {
        console.log('Sorry, you can add secret ingredient only once');
        return;
    }
    if (this.tomato || this.cheese) {
        console.log('Sorry, you can add secret ingredient only before other ingredient');
        return;
    }
    if (this.bites) {
        console.log('Sorry, you cannot add secret ingredient');
        return;
    }
    this.secretIngredient = true;
    this.addCalories(caloriesMap.secretIngredient);
}

Hamburger.prototype.bite = function () {
    this.bites++;
}

Hamburger.prototype.info = function () {
    let secretIngredient = this.secretIngredient ? `with secret ingredient, ` : '';
    let cheese = this.cheese ? `with cheese, ` : '';
    let tomato = this.tomato ? `with ${this.tomato} tomato, ` : '';
    let isBit = this.bites ? `is bit ${this.bites} times.` : 'is not bitten. ';
    return `${this.type} hamburger: `.concat(secretIngredient, cheese, tomato, isBit, `Total calories: ${this.getCalories()}`);
}
