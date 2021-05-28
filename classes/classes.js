"use strict";
class Data {
    constructor(dia = 1, mes = 1, ano = 1970) {
        this.dia = dia;
        this.mes = mes;
        this.ano = ano;
    }
}
const aniversario = new Data(3, 11, 1991);
aniversario.dia = 4;
console.log(aniversario.dia);
console.log(aniversario);
const casamento = new Data; // posso omitir os "()"
casamento.ano = 2017;
console.log(casamento);
class DataEsperta {
    constructor(dia = 1, mes = 1, ano = 1970) {
        this.dia = dia;
        this.mes = mes;
        this.ano = ano;
    }
}
const aniversarioEsperto = new DataEsperta(3, 11, 1991);
aniversarioEsperto.dia = 4;
console.log(aniversarioEsperto.dia);
console.log(aniversarioEsperto);
const casamentoEsperto = new DataEsperta; // posso omitir os "()"
casamentoEsperto.ano = 2017;
console.log(casamentoEsperto);
// Desafio Classe Produto
// Atributos: nome, preco e desconto
// Criar o construtor para
// Obs 1.: Desconto é opcional (valor padrão 0)
// Obs 2.: Criar dois produtos: passando dois e três params
class Produto {
    constructor(nome, preco, desconto = 0) {
        this.nome = nome;
        this.preco = preco;
        this.desconto = desconto;
    }
    resumo() {
        return `${this.nome} custa R$${this.precoComDesconto()} (${this.desconto * 100}% off)`;
    }
    precoComDesconto() {
        return this.preco - (this.preco * this.desconto);
    }
}
const produto1 = new Produto('Monitor LG 32"', 1350);
produto1.desconto = 0.05;
console.log(produto1.resumo());
const produto2 = new Produto('Rx 5500 xt', 2200, 0.2);
console.log(produto2.resumo());
class Carro {
    constructor(marca, modelo, _velocidadeMaxima = 200) {
        this.marca = marca;
        this.modelo = modelo;
        this._velocidadeMaxima = _velocidadeMaxima;
        // private -> Visivel apenas internamente
        // protected -> Vivel internamente e através da herança
        // public -> Visivel para todos
        this._velocidadeAtual = 0;
    }
    alterarVelocidade(delta) {
        const novaVelocidade = this._velocidadeAtual + delta;
        const velocidadeValida = novaVelocidade >= 0
            && novaVelocidade <= this._velocidadeMaxima;
        if (velocidadeValida) {
            this._velocidadeAtual = novaVelocidade;
        }
        else {
            this._velocidadeAtual = delta > 0 ? this._velocidadeMaxima : 0;
        }
        return this._velocidadeAtual;
    }
    acelerar() {
        return this.alterarVelocidade(5);
    }
    frear() {
        return this.alterarVelocidade(-5);
    }
}
const carro1 = new Carro('Ford', 'Ka', 185);
console.log(carro1.acelerar());
Array(50).fill(0).forEach(() => carro1.acelerar());
console.log(carro1.acelerar());
Array(35).fill(0).forEach(() => carro1.frear());
console.log(carro1.frear());
class Ferrari extends Carro {
    constructor(modelo, _velocidadeMaxima) {
        super('Ferrari', modelo, _velocidadeMaxima);
    }
    acelerar() {
        return this.alterarVelocidade(20);
    }
    frear() {
        return this.alterarVelocidade(-15);
    }
}
const f40 = new Ferrari('F40', 324);
console.log(`${f40.marca} ${f40.modelo}`);
console.log(f40.acelerar());
console.log(f40.frear());
console.log(f40.frear());
// Getters & Setters
class Pessoa {
    constructor() {
        this._idade = 0;
    }
    get idade() {
        return this._idade;
    }
    set idade(valor) {
        if (valor >= 0 && valor <= 120)
            this._idade = valor;
    }
}
const pessoa1 = new Pessoa;
pessoa1.idade = 10;
console.log("Idade da pessoa", pessoa1.idade);
pessoa1.idade = -3;
console.log(pessoa1.idade);
// Atributos e métodos estáticos
class Matematica {
    static areaCirc(raio) {
        return this.PI * (Math.pow(raio, 2));
    }
}
Matematica.PI = 3.1416;
// const m1 = new Matematica()
// m1.PI = 4.2;
// console.log(m1.areaCirc(4))
console.log(Matematica.areaCirc(4));
// Classe abstrata
class Calculo {
    constructor() {
        this.resultado = 0;
    }
    getResultado() {
        return this.resultado;
    }
}
class Soma extends Calculo {
    executar(...numeros) {
        this.resultado = numeros.reduce((total, atual) => total + atual);
    }
}
class Multiplicacao extends Calculo {
    executar(...numeros) {
        this.resultado = numeros.reduce((total, atual) => total * atual);
    }
}
let c1 = new Soma();
c1.executar(1, 2, 3, 4, 5);
console.log('Resultado da Soma:', c1.getResultado());
c1 = new Multiplicacao();
c1.executar(1, 2, 3, 4, 5);
console.log('Resultado da Multiplicação:', c1.getResultado());
// Singleton
class Unico {
    constructor() { }
    static getInstance() {
        return Unico.instance;
    }
    agora() {
        return new Date;
    }
}
Unico.instance = new Unico;
// const errado = new Unico()
console.log(Unico.getInstance().agora());
// Somente Leitura
class Aviao {
    constructor(modelo, prefixo) {
        this.modelo = modelo;
        this.prefixo = prefixo;
    }
}
const turboHelice = new Aviao('Tu-114', 'PT-ABC');
// turboHelice.modelo = 'aaaa'
// turboHelice.prefixo = 'bbbb'
console.log(turboHelice);
//# sourceMappingURL=classes.js.map