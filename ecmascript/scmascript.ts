// let & const

let seraQuePode = "?"
console.log(seraQuePode)
// var seraQuePode = "?" // hoisting

let estaFrio = true
// if (estaFrio) {
//     var acao = 'Colocar casaco!'
// }
// console.log(acao)

if (estaFrio) {
    let acao = 'Colocar casaco!'
    console.log(acao)
}

const cpf: string = '123.456.000-99'
// cpf = '765.432.000-12'
console.log(cpf)

var segredo = 'externo!'
function revelar() {
    const segredo = 'interno'
    console.log(segredo)
}
revelar()
console.log(segredo)

{
    {
        const def = 'def'
        console.log(def)
    }
}

for (let i = 0; i <= 10; i++) {
    console.log(i)
}
// console.log(i)

// Arrow function
function somar(n1: number, n2: number): number {
    return n1 + n2;
}
console.log('Resultado somar:', somar(1, 2))

const subtrair = (n1: number, n2: number): number => n1 - n2
console.log('Resultado subtrair:', subtrair(1, 2))

const saudacao = () => console.log('Olá')
saudacao()

const falarCom = (pessoa: string) => console.log('Olá ' + pessoa)
falarCom('João')

// this

// function normalComThis() {
//     console.log(this)
// }

// const normalComThisEspecial = normalComThis.bind({ nome: 'Ana' })
// normalComThisEspecial()

// console.log(this)
// const arrowComThis = () => console.log(this)
// arrowComThis()

// const arrowComThisEspecial = arrowComThis.bind({ nome: 'Ana' })
// arrowComThisEspecial()

// Parametros padrao

function contagemRegressiva(
    inicio: number = 5,
    fim: number = inicio - 5
): void {
    console.log(inicio)
    while (inicio > fim) {
        inicio--
        console.log(inicio)
    }
    console.log('Fim')
}

contagemRegressiva()
contagemRegressiva(3)

// Rest & Spread
const numbers = [1, 2, 3, 4, 5, 6]
console.log(Math.max(...numbers))

const turmaA: string[] = ['João', 'Lorena'];
const turmaB: string[] = ['Miguel', ...turmaA, 'Fernanda'];

console.log(turmaB)

function retornarArray(...args: number[]): number[] {
    return args
}

const numeros = retornarArray(1, 2, 3, 4, 5, 444)
console.log(numeros)
console.log(retornarArray(...numbers))

// Rest & Spread (Tupla)
const tupla: [number, string, boolean] = [1, 'abc', false]

function tuplaParam1(a: number, b: string, c: boolean): void {
    console.log(`1) ${a}, ${b}, ${c}`)
}

tuplaParam1(...tupla)

function tuplaParam2(...params: [number, string, boolean]): void {
    console.log(`2) ${params[0]}, ${params[1]}, ${params[2]}`)
}

tuplaParam2(...tupla)

// Destructuring (Array)
const caracteristicas = ['Motor V8', 2020]
// const motor = caracteristicas[0]
// const ano = caracteristicas[1]

const [motor, ano] = caracteristicas
console.log(motor, ano)

// Destructuring (objeto)
const item = {
    nome: 'SSD 480GB',
    preco: 200,
    caracteristicas: {
        w: 'Importado'
    }
}

const nomeItem = item.nome;
const precoItem = item.preco;
console.log(nomeItem, precoItem)

const { nome: n, preco: p, caracteristicas: { w } } = item
console.log(n, p)
console.log(w)

const usuarioID: string = 'SuporteCod3r'
const notificacoes: string = '19'
// const boasVindas = 'Boas vindas' + usuarioID + ', Notificações: ' + notificacoes

const boasVindas = `
Boas vindas ${usuarioID}, 
Notificações: ${parseInt(notificacoes) > 9 ? '+9' : notificacoes}
`

console.log(boasVindas)
console.log(`${(1 + 1) * 30}`)
console.log(`Motor: ${caracteristicas[0]}`)

// Desafios
// Abaixo temos alguns exercícios feitos em JavaScript. No entanto parte deles
// foram feitos pela metade e as soluções propostas possuem espaço para
// melhorias.
// Objetivos Gerais:
//  Traduza esses códigos de JavaScript para TypeScript
//  Entregue o que os enunciados pedem
//  Realize melhorias as quais você vê como necessárias! Fique de olhos
// abertos para:
//  "Tratamento" para erros
//  Variáveis desnecessárias
//  Checagem desnecessárias
//  const para variáveis imutáveis


//  Abaixo temos um código em JavaScript. "Traduza-o" para TypeScript!
{
    const dobro = (valor: number): number => valor * 2
    console.log(dobro(10))
}

// Verifique se há espaço para melhorias nesse trecho de código!
{
    const dizerOla = (nome: string = 'Pessoa'): void => {
        console.log(`Olá, ${nome}`)
    }
    dizerOla()
    dizerOla("Anna")
}

// Dado esse array, imprima o menor valor!

const nums: number[] = [-3, 33, 38, 5]
console.log(Math.min(...nums))


// Adicione os elementos de nums em array !

const array: number[] = [55, 20]
array.push(...nums)
console.log(array)


// Simplifique os trechos de código abaixo utilizando o operador Destructuring!
{
    const notas: number[] = [8.5, 6.3, 9.4]
    const [notas1, notas2, notas3] = notas
    // var notas1 = notas[0]
    // var notas2 = notas[1]
    // var notas3 = notas[2]
    console.log(notas1, notas2, notas3)
}

{
    type Cientista = {
        primeiroNome: string,
        experiencia: number
    }

    const cientista: Cientista = {
        primeiroNome: 'Will',
        experiencia: 12
    }

    // var primeiroNome = cientista.primeiroNome
    // var experiencia = cientista.experiencia
    const { primeiroNome, experiencia } = cientista

    console.log(primeiroNome, experiencia)
}

// Callback

// function esperar3s(callback: (dado: string) => void) {
//     setTimeout(() => {
//         callback('3s depois...')
//     }, 3000)
// }

// esperar3s((resultado: string): void => console.log(resultado))


// function esperar3sPromise() {
//     return new Promise((resolve: any) => {
//         setTimeout(() => {
//             resolve('3s depois promise...')
//         }, 3000)
//     })
// }

// esperar3sPromise().then(resultado => console.log(resultado))

// fetch('https://swapi.dev/api/people/1')
//     .then(res => res.json())
//     .then(personagem => personagem.films)
//     .then(films => fetch(films[0]))
//     .then(respFilm => respFilm.json())
//     .then(filme => console.log(filme.title))
