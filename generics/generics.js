"use strict";
function echo(objeto) {
    return objeto;
}
console.log(echo('João').length);
console.log(echo(27).length);
console.log(echo({ nome: 'João', idade: 27 }).length);
//  Usando generics
function echoMelhorado(objeto) {
    return objeto;
}
console.log(echoMelhorado('João').length);
console.log(echoMelhorado(27));
console.log(echoMelhorado({ nome: 'João', idade: 27 }));
// Generics disponíveis na API
const avaliacoes = [10, 9.3, 7.7];
avaliacoes.push(8.4);
// avaliacoes.push('5.5')
console.log(avaliacoes);
// Array
function imprimir(args) {
    args.forEach(elemento => console.log(elemento));
}
// -> Implicito
imprimir([1, 2, 3]);
// -> Explicito
imprimir([1, 2, 3]);
imprimir(['Ana', 'Bia', 'Carlos']);
imprimir([
    { nome: 'Fulano', idade: 22 },
    { nome: 'Cicrano', idade: 23 },
    { nome: 'Beltrano', idade: 24 },
]);
imprimir([
    { nome: 'Fulano', idade: 22 },
    { nome: 'Cicrano', idade: 23 },
    { nome: 'Beltrano', idade: 24 },
]);
const chamarEcho = echoMelhorado;
console.log(chamarEcho('João'));
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
class OperacaoBinaria {
    constructor(operando1, operando2) {
        this.operando1 = operando1;
        this.operando2 = operando2;
    }
}
// console.log(new OperacaoBinaria('Bom', 'dia').executar())
// console.log(new OperacaoBinaria(3, 7).executar())
// console.log(new OperacaoBinaria(3, 'Opa').executar())
// console.log(new OperacaoBinaria({}, {}).executar())
class SomaBinaria extends OperacaoBinaria {
    executar() {
        return this.operando1 + this.operando2;
    }
}
console.log('SomaBinaria: ', new SomaBinaria(3, 4).executar());
// DESAFIO NÃO PLANEJADO 
class DiferencaEntreDatas extends OperacaoBinaria {
    getTime(data) {
        let { dia, mes, ano } = data;
        // return new Date(`${mes}/${dia}/${ano}`).getTime()
        return new Date(ano, mes, dia).getTime();
    }
    executar() {
        const t1 = this.getTime(this.operando1);
        const t2 = this.getTime(this.operando2);
        const diferenca = Math.abs(t1 - t2);
        const dia = 1000 * 60 * 60 * 24;
        return `${Math.ceil(diferenca / dia)} dia(s)`;
    }
}
const d1 = new Data(1, 2, 2020);
const d2 = new Data(10, 2, 2020);
console.log(new DiferencaEntreDatas(d1, d2).executar());
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
class Fila {
    constructor(...args) {
        this.fila = args;
    }
    entrar(elemento) {
        this.fila.push(elemento);
    }
    proximo() {
        if (!this.fila[0])
            return null;
        const primeiro = this.fila[0];
        this.fila.splice(0, 1);
        return primeiro;
    }
    imprimir() {
        console.log(this.fila);
    }
}
const fila = new Fila('Gui', 'Pedro', 'Ana', 'Lu');
fila.imprimir();
fila.entrar('Rafael');
fila.imprimir();
console.log(fila.proximo());
console.log(fila.proximo());
console.log(fila.proximo());
fila.imprimir();
const novaFila = new Fila(1, 2);
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
class Mapa {
    constructor() {
        this.itens = new Array();
    }
    obter(chave) {
        const resultado = this.itens.filter((element) => element.chave === chave);
        return resultado ? resultado[0] : null;
    }
    colocar(par) {
        const encontrado = this.obter(par.chave);
        if (encontrado)
            encontrado.valor = par.valor;
        else
            this.itens.push(par);
    }
    limpar() {
        this.itens = new Array();
    }
    imprimir() {
        console.log(this.itens);
    }
}
const mapa = new Mapa();
mapa.colocar({ chave: 1, valor: 'Pedro' });
mapa.colocar({ chave: 2, valor: 'Rebeca' });
mapa.colocar({ chave: 3, valor: 'Maria' });
mapa.colocar({ chave: 1, valor: 'Gustavo' });
console.log(mapa.obter(2));
mapa.imprimir();
mapa.limpar();
mapa.imprimir();
//# sourceMappingURL=generics.js.map