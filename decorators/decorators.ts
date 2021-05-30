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

// @logarClasse
// @logarClasseSe(false)
// @decorator({ a: 'Teste', b: 123 })
@logarObjeto
class Eletrodomestico {
    constructor() {
        console.log('Novo...')
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

new Eletrodomestico()
new Eletrodomestico()