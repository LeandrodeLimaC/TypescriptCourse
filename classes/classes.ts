class Data {
    // Público por padrão
    dia: number;
    public mes: number;
    ano: number;

    constructor(
        dia: number = 1,
        mes: number = 1,
        ano: number = 1970
    ) {
        this.dia = dia;
        this.mes = mes;
        this.ano = ano;
    }
}

const aniversario = new Data(3, 11, 1991)
aniversario.dia = 4
console.log(aniversario.dia)
console.log(aniversario)


const casamento = new Data // posso omitir os "()"
casamento.ano = 2017
console.log(casamento)

class DataEsperta {
    constructor(
        public dia: number = 1,
        public mes: number = 1,
        public ano: number = 1970
    ) { }
}

const aniversarioEsperto = new DataEsperta(3, 11, 1991)
aniversarioEsperto.dia = 4
console.log(aniversarioEsperto.dia)
console.log(aniversarioEsperto)


const casamentoEsperto = new DataEsperta // posso omitir os "()"
casamentoEsperto.ano = 2017
console.log(casamentoEsperto)

// Desafio Classe Produto
// Atributos: nome, preco e desconto
// Criar o construtor para
// Obs 1.: Desconto é opcional (valor padrão 0)
// Obs 2.: Criar dois produtos: passando dois e três params

class Produto {
    constructor(
        public nome: string,
        public preco: number,
        public desconto: number = 0
    ) { }
    public resumo(): string {
        return `${this.nome} custa R$${this.precoComDesconto()} (${this.desconto * 100}% off)`
    }
    public precoComDesconto(): number {
        return this.preco - (this.preco * this.desconto);
    }
}

const produto1 = new Produto('Monitor LG 32"', 1350)
produto1.desconto = 0.05
console.log(produto1.resumo())

const produto2 = new Produto('Rx 5500 xt', 2200, 0.2)
console.log(produto2.resumo())

class Carro {
    // private -> Visivel apenas internamente
    // protected -> Vivel internamente e através da herança
    // public -> Visivel para todos

    private _velocidadeAtual: number = 0;

    constructor(
        public marca: string,
        public modelo: string,
        private _velocidadeMaxima: number = 200
    ) { }

    protected alterarVelocidade(delta: number): number {
        const novaVelocidade = this._velocidadeAtual + delta;
        const velocidadeValida = novaVelocidade >= 0
            && novaVelocidade <= this._velocidadeMaxima;

        if (velocidadeValida) {
            this._velocidadeAtual = novaVelocidade;
        } else {
            this._velocidadeAtual = delta > 0 ? this._velocidadeMaxima : 0;
        }

        return this._velocidadeAtual
    }

    public acelerar(): number {
        return this.alterarVelocidade(5)
    }

    public frear(): number {
        return this.alterarVelocidade(-5)
    }
}

const carro1 = new Carro('Ford', 'Ka', 185)
console.log(carro1.acelerar())

Array(50).fill(0).forEach(() => carro1.acelerar())
console.log(carro1.acelerar())

Array(35).fill(0).forEach(() => carro1.frear())
console.log(carro1.frear())

class Ferrari extends Carro {
    constructor(
        modelo: string,
        _velocidadeMaxima: number,
    ) {
        super('Ferrari', modelo, _velocidadeMaxima)
    }

    public acelerar(): number {
        return this.alterarVelocidade(20)
    }

    public frear(): number {
        return this.alterarVelocidade(-15)
    }
}

const f40 = new Ferrari('F40', 324)
console.log(`${f40.marca} ${f40.modelo}`)
console.log(f40.acelerar())
console.log(f40.frear())
console.log(f40.frear())

// Getters & Setters

class Pessoa {
    private _idade: number = 0

    get idade(): number {
        return this._idade
    }

    set idade(valor: number) {
        if (valor >= 0 && valor <= 120)
            this._idade = valor
    }
}

const pessoa1 = new Pessoa
pessoa1.idade = 10
console.log("Idade da pessoa", pessoa1.idade)

pessoa1.idade = -3
console.log(pessoa1.idade)

// Atributos e métodos estáticos
class Matematica {
    static PI: number = 3.1416

    static areaCirc(raio: number): number {
        return this.PI * (Math.pow(raio, 2))
    }
}

// const m1 = new Matematica()
// m1.PI = 4.2;
// console.log(m1.areaCirc(4))

console.log(Matematica.areaCirc(4))

// Classe abstrata
abstract class Calculo {
    protected resultado: number = 0

    abstract executar(...numeros: number[]): void

    getResultado(): number {
        return this.resultado
    }
}

class Soma extends Calculo {
    executar(...numeros: number[]): void {
        this.resultado = numeros.reduce((total, atual) => total + atual)
    }
}

class Multiplicacao extends Calculo {
    executar(...numeros: number[]): void {
        this.resultado = numeros.reduce((total, atual) => total * atual)
    }
}

let c1: Calculo = new Soma()
c1.executar(1, 2, 3, 4, 5)
console.log('Resultado da Soma:', c1.getResultado())

c1 = new Multiplicacao()
c1.executar(1, 2, 3, 4, 5)
console.log('Resultado da Multiplicação:', c1.getResultado())

// Singleton
class Unico {
    private static instance: Unico = new Unico
    private constructor() { }

    static getInstance(): Unico {
        return Unico.instance
    }

    agora() {
        return new Date
    }
}

// const errado = new Unico()

console.log(Unico.getInstance().agora())

// Somente Leitura

class Aviao {
    constructor(
        public readonly modelo: string,
        public readonly prefixo: string,
    ) { }
}

const turboHelice = new Aviao('Tu-114', 'PT-ABC')
// turboHelice.modelo = 'aaaa'
// turboHelice.prefixo = 'bbbb'
console.log(turboHelice)
