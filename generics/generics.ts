function echo(objeto: any) {
    return objeto
}

console.log(echo('João').length)
console.log(echo(27).length)
console.log(echo({ nome: 'João', idade: 27 }).length)

//  Usando generics
function echoMelhorado<TIPO>(objeto: TIPO): TIPO {
    return objeto
}

console.log(echoMelhorado('João').length)
console.log(echoMelhorado<number>(27))
console.log(echoMelhorado({ nome: 'João', idade: 27 }))

// Generics disponíveis na API
const avaliacoes: Array<number> = [10, 9.3, 7.7]
avaliacoes.push(8.4)
// avaliacoes.push('5.5')
console.log(avaliacoes)

// Array
function imprimir<T>(args: T[]): void {
    args.forEach(elemento => console.log(elemento))
}

// -> Implicito
imprimir([1, 2, 3])

// -> Explicito
imprimir<number>([1, 2, 3])
imprimir<string>(['Ana', 'Bia', 'Carlos'])
imprimir<{ nome: string, idade: number }>([
    { nome: 'Fulano', idade: 22 },
    { nome: 'Cicrano', idade: 23 },
    { nome: 'Beltrano', idade: 24 },
])

type Aluno = { nome: string, idade: number }
imprimir<Aluno>([
    { nome: 'Fulano', idade: 22 },
    { nome: 'Cicrano', idade: 23 },
    { nome: 'Beltrano', idade: 24 },
])

// Tipo Genérico
type Echo = <T>(data: T) => T
const chamarEcho: Echo = echoMelhorado;
console.log(chamarEcho<string>('João'));

// Class com Generics
// class OperacaoBinaria {
//     constructor(
//         public operando1: any,
//         public operando2: any,
//     ) { }

//     executar() {
//         return this.operando1 + this.operando2;
//     }
// }
abstract class OperacaoBinaria<T, R> {
    constructor(
        public operando1: T,
        public operando2: T,
    ) { }

    abstract executar(): R
}

// console.log(new OperacaoBinaria('Bom', 'dia').executar())
// console.log(new OperacaoBinaria(3, 7).executar())
// console.log(new OperacaoBinaria(3, 'Opa').executar())
// console.log(new OperacaoBinaria({}, {}).executar())

class SomaBinaria extends OperacaoBinaria<number, number> {
    executar(): number {
        return this.operando1 + this.operando2
    }
}

console.log('SomaBinaria: ', new SomaBinaria(3, 4).executar())

// DESAFIO NÃO PLANEJADO 
class DiferencaEntreDatas
    extends OperacaoBinaria<Data, string> {

    getTime(data: Data): number {
        let { dia, mes, ano } = data;

        // return new Date(`${mes}/${dia}/${ano}`).getTime()
        return new Date(ano, mes, dia).getTime()
    }

    executar(): string {
        const t1 = this.getTime(this.operando1)
        const t2 = this.getTime(this.operando2)
        const diferenca = Math.abs(t1 - t2)
        const dia = 1000 * 60 * 60 * 24
        return `${Math.ceil(diferenca / dia)} dia(s)`
    }
}

const d1 = new Data(1, 2, 2020)
const d2 = new Data(10, 2, 2020)

console.log(new DiferencaEntreDatas(d1, d2).executar())

// Desafio Classe Fila
// Atributo: fila (Array)
// Métodos: entrar, próximo, imprimir

// class Fila<T> {
//     constructor(
//         private fila: T[] = []
//     ) { }

//     entrar(item: T) {
//         this.fila.push(item)
//     }

//     proximo() {
//         this.fila.splice(0, 1)
//     }

//     imprimir(): void {
//         console.log(this.fila)
//     }
// }
class Fila<T extends number | string> {
    private fila: Array<T>

    constructor(...args: T[]) {
        this.fila = args
    }

    entrar(elemento: T) {
        this.fila.push(elemento)
    }

    proximo(): T | null {
        if (!this.fila[0])
            return null;

        const primeiro = this.fila[0]
        this.fila.splice(0, 1)
        return primeiro
    }

    imprimir(): void {
        console.log(this.fila)
    }
}

const fila = new Fila<string>('Gui', 'Pedro', 'Ana', 'Lu')
fila.imprimir()
fila.entrar('Rafael')
fila.imprimir()
console.log(fila.proximo())
console.log(fila.proximo())
console.log(fila.proximo())
fila.imprimir()

const novaFila = new Fila<number>(1, 2)

// Desafio Mapa
// Array de Objetos (Chave/Valor) -> itens
// Métodos: obter(Chave), colocar({ C, V })
// limpar(), imprimir()


type Par<C, V> = { chave: C, valor: V }
// class Mapa<C, V> {
//     private itens: Array<Par<C, V>> = new Array<Par<C, V>>()

//     constructor() { }

//     obter(chave: C): Par<C, V> | null {
//         const resultado = this.itens.find((element) => element.chave === chave) || null
//         return resultado
//     }

//     colocar(item: Par<C, V>): void {
//         const t = this.itens.findIndex(element => element.chave === item.chave)
//         if (t === -1)
//             this.itens.push(item)

//         this.itens.splice(t, 1, item)
//     }

//     limpar(): void {
//         this.itens = []
//     }

//     imprimir() {
//         console.log(this.itens)
//     }
// }

class Mapa<C, V> {
    private itens: Array<Par<C, V>> = new Array<Par<C, V>>()

    constructor() { }

    obter(chave: C): Par<C, V> | null {
        const resultado = this.itens.filter((element) => element.chave === chave)
        return resultado ? resultado[0] : null
    }

    colocar(par: Par<C, V>): void {
        const encontrado = this.obter(par.chave)

        if (encontrado)
            encontrado.valor = par.valor;
        else
            this.itens.push(par)
    }

    limpar(): void {
        this.itens = new Array<Par<C, V>>()
    }

    imprimir(): void {
        console.log(this.itens)
    }
}

const mapa = new Mapa<number, string>()
mapa.colocar({ chave: 1, valor: 'Pedro' })
mapa.colocar({ chave: 2, valor: 'Rebeca' })
mapa.colocar({ chave: 3, valor: 'Maria' })
mapa.colocar({ chave: 1, valor: 'Gustavo' })

console.log(mapa.obter(2))
mapa.imprimir()
mapa.limpar()
mapa.imprimir()