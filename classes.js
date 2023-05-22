/**
 * Class Personagem com caracteristicas gerais. 
 * 
 * Existe o Getter e Setter para Life, para poder verificar se o jogo não acabou.
 * 
 */
class Character {

    _life = 1; 
    maxLife = 1;
    attack = 0;
    defense = 0;

    constructor(name) {
        this.name = name;
    }

    get life() {
        return this._life;
    }

    set life(newLife) {

        this._life = newLife < 0 ? 0 : newLife;

    }
    
}

/**
 * Class Cavaleiro
 * Lutador com as caracteristicas:
 *  ** Quantidade de vida alta, medio ataque, boa defesa; 
 */
class Knight extends Character {

    constructor(name) {
        super(name);
        this.life = 100; 
        this.attack = 10; 
        this.defense = 8; 
        this.maxLife = this.life;
    }

}

/**
 * Class Mago
 * Lutador com as caracteristicas: 
 *  ** Quantidade de vida medio, bom ataque, baixa defesa
 */
class Sorcerer extends Character {

    constructor(name) {
        super(name);
        this.life = 80; 
        this.attack = 15; 
        this.defense = 3; 
        this.maxLife = this.life;
    }

}


/**
 * Class Pequeno Mostro
 * Lutador com as caracteristicas: 
 *  ** Quantidade de vida baixa, baixo ataque, baixa defesa
 */
class LittleMonster extends Character {

    constructor() {
        super('Little Monster');
        this.life = 40; 
        this.attack = 4; 
        this.defense = 4; 
        this.maxLife = this.life;
    }

}

/**
 * Class Grande Mostro
 * Lutador com as caracteristicas: 
 *  ** Quantidade de vida Muito alta, alto ataque, media defesa
 */
class BigMonster extends Character {

    constructor() {
        super('Big Monster');
        this.life = 120; 
        this.attack = 16; 
        this.defense = 6; 
        this.maxLife = this.life;
    }

}

/**
 * Class Estado da Luta
 * Usado para manipulação e atualizações 
 */
class Stage {

    constructor(fighter1, fighter2, fighter1El, fighter2El, logObject) {
        this.fighter1 = fighter1;
        this.fighter2 = fighter2;
        this.fighter1El = fighter1El;
        this.fighter2El = fighter2El;
        this.logObject = logObject;
    }

    start() {
        // Inicia com update para apontar os nomes dos lugadores
        this.update();

        // Adiciona o evento para monitorar os cliques de ataques
        this.fighter1El.querySelector('.attackButton').addEventListener('click', () => this.doAttack(this.fighter1, this.fighter2) )
        this.fighter2El.querySelector('.attackButton').addEventListener('click', () => this.doAttack(this.fighter2, this.fighter1) )
    }

    update() {
        // Manipulação das infos do lutador um
        this.fighter1El.querySelector('.name').innerHTML = `${this.fighter1.name} - ${this.fighter1.life.toFixed(2)} HP`
        let f1Pct = this.fighter1.life / this.fighter1.maxLife * 100;
        this.fighter1El.querySelector('.bar').style.width = `${f1Pct}%`


        // Manipulação das infos do lutador dois
        this.fighter2El.querySelector('.name').innerHTML =  `${this.fighter2.name} - ${this.fighter2.life.toFixed(2)} HP`
        let f2Pct = this.fighter2.life / this.fighter2.maxLife * 100;
        this.fighter2El.querySelector('.bar').style.width = `${f2Pct}%`
    }

    doAttack(attacking, attacked) {

        // Verifica se o Jogo não acabou
        if (attacking.life <= 0 || attacked.life <= 0) {

            // Adiciona info no log
            this.logObject.addMessage("Fim de Jogo");

            return;
        }

        // Calcula um valor random para ser usado no poder de ataque
        let attackFactor = (Math.random() * 2).toFixed(2);

        // Calcula um valor random para ser usado na defesa
        let defenseFactor = (Math.random() * 2).toFixed(2);

        // Multiplica o valor random de ataque com o poder de attack para um valor final
        let actualAttack = attacking.attack * attackFactor; 

        // Multiplica o valor random de defesa com o poder de defense para um valor final
        let actualDefense = attacked.defense * defenseFactor;

        // Verifica se é maior o valor do ataque para atualizar os dados
        if (actualAttack > actualDefense) {

            // Diminui o valor de ataque do lutador atacado
            attacked.life -= actualAttack;

            // Adiciona info no log
            this.logObject.addMessage(`${attacking.name} causou ${actualAttack.toFixed(2)} de dano em ${attacked.name}`);

        } else {

            // Adiciona info no log
            this.logObject.addMessage(`${attacked.name} conseguiu se defender...`);

        }

        // Update das infos
        this.update();
    }

}

/**
 * Class Log
 * Usado para armazenar as infos
 */
class Log {

    list = []; 

    constructor(listEl) {
        this.listEl = listEl;
    }

    addMessage(msg) {
        
        this.list.push(msg); 
        this.render();

    }

    // Renderiza os logs na tela
    render() {

        this.listEl.innerHTML = ''; 

        for (let i in this.list) {
            this.listEl.innerHTML += `<li>${this.list[i]}</li>`
        }

    }

}