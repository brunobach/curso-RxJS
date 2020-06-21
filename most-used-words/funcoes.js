const fs = require('fs')
const path = require('path')
const { promises } = require('dns')

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

module.exports = {
    lerDiretorio,
    elementosTerminadosCom,
    lerArquivo,
    lerArquivos,
    removerSeVazio,
    removerseIncluir,
    removerSeApenasNumeros
}