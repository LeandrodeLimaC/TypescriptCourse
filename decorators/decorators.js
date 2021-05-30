"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
function logarClasse(constructor) {
    console.log(constructor);
}
function decoratorVazio(_) { }
function logarClasseSe(valor) {
    return valor ? logarClasse : decoratorVazio;
}
function decorator(obj) {
    return function (_) {
        console.log(obj.a + ' ' + obj.b);
    };
}
function logarObjeto(construtor) {
    console.log("Carregado...");
    return class extends construtor {
        constructor(...args) {
            console.log('Antes...');
            super(...args);
            console.log('Depois...');
        }
    };
}
// @logarClasse
// @logarClasseSe(false)
// @decorator({ a: 'Teste', b: 123 })
// @logarObjeto
let Eletrodomestico = class Eletrodomestico {
    constructor() {
        console.log('Novo...');
    }
};
Eletrodomestico = __decorate([
    imprimivel
], Eletrodomestico);
function imprimivel(constructor) {
    constructor.prototype.imprimir = function () {
        console.log(this);
    };
}
// (<any>new Eletrodomestico()).imprimir() <- Ruim, perde validações por conta do Any
const eletro = new Eletrodomestico();
eletro.imprimir && eletro.imprimir(); // Verifica se existe e chama imprimir
// Desafio Decorator perfilAdmin
const usuarioLogado = {
    nome: 'Guilherme Filho',
    email: 'guigui@gmail.com',
    admin: false
};
let MudancaAdministrativa = class MudancaAdministrativa {
    critico() {
        console.log('Algo crítico foi alterado!');
    }
};
MudancaAdministrativa = __decorate([
    perfilAdmin
], MudancaAdministrativa);
// type Constructor = { new(...args: any[]): {} }
function perfilAdmin(constructor) {
    return class extends constructor {
        constructor(...args) {
            super(...args);
            if (!usuarioLogado || !usuarioLogado.admin) {
                throw Error('Sem permissões');
            }
        }
    };
}
// new MudancaAdministrativa().critico()
class ContaCorrente {
    constructor(saldo) {
        this.saldo = saldo;
    }
    sacar(valor) {
        console.log('Tentando sacar ' + valor);
        if (valor <= this.saldo) {
            this.saldo -= valor;
            return true;
        }
        return false;
    }
    getSaldo() {
        return this.saldo;
    }
}
__decorate([
    naoNegativo
], ContaCorrente.prototype, "saldo", void 0);
__decorate([
    congelar,
    __param(0, paramInfo)
], ContaCorrente.prototype, "sacar", null);
__decorate([
    congelar
], ContaCorrente.prototype, "getSaldo", null);
const cc = new ContaCorrente(10000.57);
cc.sacar(5000);
cc.sacar(5000.57);
console.log(cc.getSaldo());
cc.sacar(5000.57);
console.log(cc.getSaldo());
// Tentativa maliciosa de alterar metodo
// cc.getSaldo = function () {
//     return this['saldo'] + 7000
// }
// console.log(cc.getSaldo())
function congelar(alvo, nomeMetodo, descritor) {
    console.log('alvo', alvo);
    console.log('nomeMetodo:', nomeMetodo);
    descritor.writable = false;
}
function naoNegativo(alvo, nomePropriedade) {
    delete alvo[nomePropriedade];
    Object.defineProperty(alvo, nomePropriedade, {
        get() {
            return alvo["_" + nomePropriedade];
        },
        set(valor) {
            if (valor < 0)
                throw new Error('Saldo Inválido');
            alvo["_" + nomePropriedade] = valor;
        }
    });
}
function paramInfo(alvo, nomeMetodo, indiceParam) {
    console.log('O Alvo é', alvo);
    console.log(`O nome do método é: ${nomeMetodo}`);
    console.log(`O indice do parametro é: ${indiceParam}`);
}
//# sourceMappingURL=decorators.js.map