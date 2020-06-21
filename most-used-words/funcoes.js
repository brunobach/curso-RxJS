const fs = require('fs')
const path = require('path')

function lerDiretorio(caminho) {
    return new Promise((resolve, reject) => {
        try {
            let arquivos = fs.readdirSync(caminho)
            arquivos = arquivos.map(arquivo => path.join(caminho, arquivo))
            resolve(arquivos)
        } catch (e) {
            reject(e)
        }
    })

}
function lerArquivo(caminho) {
    return new Promise((resolve, reject) => {
        try {
            const conteudo = fs.readFileSync(caminho, { encoding: 'utf8' })
            resolve(conteudo.toString())
        } catch (e) {
            reject(e)
        }

    })
}
function lerArquivos(caminhos) {
    return Promise.all(caminhos.map(caminho => lerArquivo(caminho)))
}

function elementosTerminadosCom(array, padrao) {
    return array.filter(el => el.endsWith(padrao))
}

function removerSeVazio(array) {
    return array.filter(el => el.trim())
}

function removerseIncluir(padrao) {
    return function (array) {
        return array.filter(el => !el.includes(padrao))
    }
}

function removerSeApenasNumeros(array) {
    return array.filter(el => {
        const num = parseInt(el.trim())
        return num !== num
    })
}

function removerCaracteres(simbolos){
    return function(array){
        return array.map(el => {
            return simbolos.reduce((acc, el) => {
               return acc.split(el).join('')
            }, el)
        })
    }
}
function agruparPalavras(palavras){
    return Object.values(palavras.reduce((acc, palavra) => {
        const el = palavra.toLowerCase()
        const qtde = acc[el] ? acc[el].qtde + 1 : 1 
        acc[el] = {
            palavra: el,
            qtde
        }
        return acc      
    }, {}))
}

function ordenarPorAtribNumerico(attr, ordem = 'asc'){
    return function(array){
        const desc = (o1, o2) => o2[attr] - o1[attr]
        const asc = (o1, o2) => o1[attr] - o2[attr]
        
        return array.sort(ordem === 'asc' ? asc : desc)
    }
}

module.exports = {
    lerDiretorio,
    elementosTerminadosCom,
    lerArquivo,
    lerArquivos,
    removerSeVazio,
    removerseIncluir,
    removerSeApenasNumeros,
    removerCaracteres,
    agruparPalavras,
    ordenarPorAtribNumerico
}