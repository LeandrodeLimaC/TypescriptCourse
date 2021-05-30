function logarClasse(constructor: Function) {
    console.log(constructor)
}

function decoratorVazio(_: Function) { }

function logarClasseSe(valor: Boolean) {
    return valor ? logarClasse : decoratorVazio
}

function decorator(obj: { a: string, b?: number }) {
    return function (_: Function): void {
        console.log(obj.a + ' ' + obj.b)
    }
}

type Constructor = { new(...args: any[]): {} }

function logarObjeto(construtor: Constructor) {
    console.log("Carregado...")
    return class extends construtor {
        constructor(...args: any[]) {
            console.log('Antes...')
            super(...args)
            console.log('Depois...')
        }
    }
}

// new Eletrodomestico()
// new Eletrodomestico()

interface Eletrodomestico {
    imprimir?(): void
}

// @logarClasse
// @logarClasseSe(false)
// @decorator({ a: 'Teste', b: 123 })
// @logarObjeto
@imprimivel
class Eletrodomestico {
    constructor() {
        console.log('Novo...')
    }
}

function imprimivel(constructor: Function) {
    constructor.prototype.imprimir = function () {
        console.log(this)
    }
}

// (<any>new Eletrodomestico()).imprimir() <- Ruim, perde validações por conta do Any

const eletro = new Eletrodomestico()
eletro.imprimir && eletro.imprimir() // Verifica se existe e chama imprimir