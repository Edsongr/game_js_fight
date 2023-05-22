/**
 * @author Edsongr <edsongrdeveloper@gmail.com>
 * 
 * Create By Edsongr to test OOP in JS
 */

// Inicia a Class log para documentar os eventos
let log = new Log(document.querySelector('.log'));

// Inicia a Class Cavaleiro, para apontar o lutador um
let char = new Knight('Edson'); 

// Inicia a Class Pequeno Mostro, para apontar o lutador dois
let monster = new LittleMonster(); 

// Inicia a Class de Estado da Luta
const stage = new Stage(
    char, 
    monster,
    document.querySelector('#char'),
    document.querySelector('#monster'),
    log
);

// Inicia o Jogo
stage.start();
