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
