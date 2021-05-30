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

// Desafio Decorator perfilAdmin
const usuarioLogado = {
    nome: 'Guilherme Filho',
    email: 'guigui@gmail.com',
    admin: false
}

@perfilAdmin
class MudancaAdministrativa {
    critico() {
        console.log('Algo crítico foi alterado!')
    }
}


// type Constructor = { new(...args: any[]): {} }

function perfilAdmin<T extends Constructor>(constructor: T) {
    return class extends constructor {
        constructor(...args: any[]) {
            super(...args)
            if (!usuarioLogado || !usuarioLogado.admin) {
                throw Error('Sem permissões')
            }
        }
    }
}

// new MudancaAdministrativa().critico()

class ContaCorrente {
    @naoNegativo
    private saldo: number

    constructor(saldo: number) {
        this.saldo = saldo
    }

    @congelar
    sacar(@paramInfo valor: number): Boolean {
        console.log('Tentando sacar ' + valor)
        if (valor <= this.saldo) {
            this.saldo -= valor
            return true
        }

        return false
    }

    @congelar
    getSaldo(): number {
        return this.saldo
    }
}

const cc = new ContaCorrente(10000.57)

cc.sacar(5000)
cc.sacar(5000.57)
console.log(cc.getSaldo())
cc.sacar(5000.57)
console.log(cc.getSaldo())

// Tentativa maliciosa de alterar metodo
// cc.getSaldo = function () {
//     return this['saldo'] + 7000
// }
// console.log(cc.getSaldo())

function congelar(
    alvo: any,
    nomeMetodo: string,
    descritor: PropertyDescriptor
) {
    console.log('alvo', alvo)
    console.log('nomeMetodo:', nomeMetodo)
    descritor.writable = false
}

function naoNegativo(alvo: any, nomePropriedade: string) {
    delete alvo[nomePropriedade]

    Object.defineProperty(alvo, nomePropriedade, {
        get(): number {
            return alvo["_" + nomePropriedade]
        },

        set(valor: number): void {
            if (valor < 0)
                throw new Error('Saldo Inválido')

            alvo["_" + nomePropriedade] = valor
        }
    })
}

function paramInfo(alvo: any, nomeMetodo: string, indiceParam: number) {
    console.log('O Alvo é', alvo)
    console.log(`O nome do método é: ${nomeMetodo}`)
    console.log(`O indice do parametro é: ${indiceParam}`)
}