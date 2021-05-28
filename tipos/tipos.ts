// string
let nome: string = 'João'
console.log(nome)
// nome = 28  Resulta em Error -> Type 'number' is not assignable to type 'string'.ts

// number 
let idade: number = 27
// idade = 'Ana'
idade = 27.5

console.log(idade)

// boolean
let possuiHobbies: boolean = false
// possuiHobbies = 1
console.log(possuiHobbies)

// Tipos explícitos

let minhaIdade: number
minhaIdade = 27
console.log(typeof minhaIdade)
// minhaIdade = 'idade é 27'

// array
let hobbies: any[] = ["Cozinhar", "Praticar Esportes"]
console.log(hobbies[0])
console.log(typeof hobbies)

hobbies = [100, 200, 300]
// hobbies = 100
console.log(hobbies)

// tuplas
let endereco: [string, number, string] = ["Av Principal", 99, ""]
console.log(endereco)

endereco = ["Rua Importante", 1260, "Bloco C"]
console.log(endereco)

// enums
enum Cor {
    Cinza,
    Verde = 100,
    Azul = 10,
    Laranja,
    Amarelo,
    Vermelho = 100
}

let minhaCor: Cor = Cor.Verde
console.log(minhaCor)

console.log(Cor.Azul)
console.log(Cor.Laranja, Cor.Amarelo)
console.log(Cor.Verde, Cor.Vermelho)

// any
let carro: any = "BMW"
console.log(carro)
carro = { marca: "BMW", ano: 2019 }
console.log(carro)

// funções
function retornaMeuNome(): string {
    // return minhaIdade
    return nome
}

console.log(retornaMeuNome())

function digaOi(): void {
    console.log("Oi")
    // return minhaIdade
}

digaOi()

function multiplicar(numA: number, numB: number): number {
    return numA * numB
}

// console.log(multiplicar(2, 'Bia'))
console.log(multiplicar(4, 9))

let calculo: (x: number, y: number) => number
// calculo = digaOi
// calculo = 100

calculo = multiplicar
console.log(calculo(5, 6))

let usuario: { nome: string, idade: number } = {
    nome: "João",
    idade: 27
}

// usuario = {}
// usuario = {
//     name: "João",
//     age: 32
// }

usuario = {
    idade: 31,
    nome: 'Maria'
}

console.log(usuario)

// Desafio
/*
    Criar um objeto funcionário com:
        - Array de strings com os nomes dos supervisores
        - Função de bater ponto que recebe a hora (número) e retorna
          uma string
            -> Ponto normal (<=8)
            -> Fora do horário (> 8)
*/

const funcionario: {
    supervisores: string[],
    baterPonto: (horas: number) => string
} = {
    supervisores: ['Alberto', 'Felchardo', 'Humberto', 'Trezberto'],
    baterPonto: (horas: number): string => {
        if (horas > 8)
            return 'Fora do horário'

        return 'Ponto normal'
    }
}

console.log(funcionario.supervisores)
console.log(funcionario.baterPonto(8))
console.log(funcionario.baterPonto(9))

// Alias
type Funcionario = {
    supervisores: string[],
    baterPonto: (horas: number) => string
}

const funcionario2: Funcionario = {
    supervisores: ['Alberto', 'Felchardo', 'Humberto', 'Trezberto'],
    baterPonto: (horas: number): string => {
        if (horas > 8)
            return 'Fora do horário'

        return 'Ponto normal'
    }
}

console.log(funcionario.supervisores)
console.log(funcionario.baterPonto(8))
console.log(funcionario.baterPonto(9))

// Union Types
let nota: number | string = 10
console.log(`Minha nota é ${nota}!`)
nota = '10'
console.log(`Minha nota é ${nota}!`)
// nota = true

// never 
function falha(msg: string): never {
    throw new Error(msg)
}

const produto = {
    nome: 'Sabão',
    preco: 1,
    validarProduto() {
        if (!this.nome || this.nome.trim().length == 0) {
            falha("Precisa de um nome")
        }
        if (this.preco <= 0) {
            falha("Preço inválido!")
        }
    }
}

produto.validarProduto()

let altura = 12;
// altura = null

let alturaOpcional: null | number = 12;
alturaOpcional = null;

type Contato = {
    nome: string,
    tel1: string,
    tel2: string | null,
}

const contato1: Contato = {
    nome: 'Fulano',
    tel1: '987654321',
    tel2: null
}

console.log(contato1.nome)
console.log(contato1.tel1)
console.log(contato1.tel2)

let podeSerNulo = null // : any!
podeSerNulo = 12


// Desafio!

type ContaBancaria = {
    saldo: number,
    depositar: (valor: number) => void
}

let contaBancaria: ContaBancaria = {
    saldo: 3456,
    depositar(valor: number): void {
        this.saldo += valor
    }
}

type Correntista = {
    nome: string,
    contaBancaria: ContaBancaria,
    contatos: string[]
}

let correntista: Correntista = {
    nome: 'Ana Silva',
    contaBancaria,
    contatos: ['34567890', '98765432']
}

correntista.contaBancaria.depositar(3000)
console.log(correntista)
