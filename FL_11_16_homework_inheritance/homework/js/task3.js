function Pokemon() {
    this.flying = false;
}

Pokemon.prototype.getType = function () {
    return this.type;
}

Pokemon.prototype.getSpecie = function () {
    return this.specie;
}

Pokemon.prototype.canFly = function () {
    return this.flying;
}

Pokemon.prototype.getPokemonType = function () {
    return this.name;
}

function FirePokemon() {
    Pokemon.call(this);
    this.type = 'Fire'
    this.specie = 'Flame Pokemon';
}
FirePokemon.prototype = Object.create(Pokemon.prototype);

function ElectricPokemon() {
    Pokemon.call(this);
    this.type = 'Electric';
    this.specie = 'Mouse Pokemon'
}
ElectricPokemon.prototype = Object.create(Pokemon.prototype);

function Charmander() {
    FirePokemon.call(this);
    this.specie = 'Lizard Pokemon';
    this.name = 'Charmander';
    this.evolve = function () {
        return new Charmeleon()
    }
}
Charmander.prototype = Object.create(FirePokemon.prototype);
Charmander.prototype.constructor = Charmander;

function Charmeleon() {
    FirePokemon.call(this);
    this.name = 'Charmeleon';
    this.evolve = function () {
        return new Charizard()
    }
}
Charmeleon.prototype = Object.create(FirePokemon.prototype);
Charmeleon.prototype.constructor = Charmeleon;

function Charizard() {
    FirePokemon.call(this);
    this.name = 'Charizard';
    this.flying = true;
    this.evolve = function () {
        return this;
    }
}
Charizard.prototype = Object.create(FirePokemon.prototype);
Charizard.prototype.constructor = Charizard;

function Pichu() {
    ElectricPokemon.call(this);
    this.name = 'Pichu';
    this.evolve = function () {
        return new Pikachu()
    }
}
Pichu.prototype = Object.create(ElectricPokemon.prototype);
Pichu.prototype.constructor = Pichu;

function Pikachu() {
    ElectricPokemon.call(this);
    this.name = 'Pikachu';
    this.evolve = function () {
        return new Raichu()
    }
}
Pikachu.prototype = Object.create(ElectricPokemon.prototype);
Pikachu.prototype.constructor = Pikachu;

function Raichu() {
    ElectricPokemon.call(this);
    this.name = 'Raichu';
    this.evolve = function () {
        return this;
    }
}
Raichu.prototype = Object.create(ElectricPokemon.prototype);
Raichu.prototype.constructor = Raichu;

const charmander = new Charmander();
const charmeleon = new Charmeleon();
const charizard = new Charizard();

charmander.getType();
charmander.getType() === charmeleon.getType();
charmeleon.getType() === charizard.getType();

charmander.evolve().constructor === Charmeleon;
charmeleon.evolve().constructor === Charizard;

charmander.getSpecie();
charmeleon.getSpecie();
charizard.getSpecie() === charmeleon.getSpecie();

charmander.canFly();
charmander.canFly() === charmeleon.canFly();
charizard.canFly();

const pichu = new Pichu();
pichu.getPokemonType();

const pikachu = pichu.evolve();
pikachu.getPokemonType();
pikachu.constructor === Pikachu;

const raichu = pikachu.evolve();
raichu.getPokemonType();
raichu.constructor === Raichu;

const raichu2 = raichu.evolve();
raichu2 === raichu;
