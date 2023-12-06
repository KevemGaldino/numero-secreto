let numerosSorteados = [];
let limite = 100;
let numeroSecreto = gerarNumeroAleatorio();
let tentativa = 1;

function editarTextoNaTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2})
}

function mensagemInicial() {
    editarTextoNaTela('h1', 'Jogo do número secreto!');
    editarTextoNaTela('p', 'Escolha um número entre 1 a 10!');
}

mensagemInicial();

function gerarNumeroAleatorio() {
    let numeroEscolhido = parseInt(Math.random() * limite + 1);
    let quantidadeLista = numerosSorteados.length;

    if (quantidadeLista == limite) {
        numerosSorteados = [];
    }
    if (numerosSorteados.includes(numeroEscolhido)) {
        return gerarNumeroAleatorio();
    } else {
        numerosSorteados.push(numeroEscolhido);
        console.log(numerosSorteados);
        return numeroEscolhido
    }
}

function verificarChute() {
    let chute = document.querySelector('input').value;

    if (chute == numeroSecreto) {
        let palavra = tentativa > 1 ? `tentativas` : `tentativa`;
        let frase = `Você descobriu o número secreto com ${tentativa} ${palavra}!`;
        editarTextoNaTela('h1', 'Você acertou!');
        editarTextoNaTela('p', frase);
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
        if (chute < numeroSecreto) {
            editarTextoNaTela('p', 'O número secreto é maior!');
        } else {
            editarTextoNaTela('p', 'O número secreto é menor!');
        }
        tentativa++;
        limparCampo();
    }
}

function limparCampo() {
    chute = document.querySelector('input');
    chute.value = '';
}

function reiniciarJogo() {
    gerarNumeroAleatorio();
    tentativa = 0;
    tentativa++;
    limparCampo();
    mensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled',true);
}