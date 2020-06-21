const { lerDiretorio, elementosTerminadosCom, lerArquivos, removerSeVazio, removerseIncluir, removerSeApenasNumeros, removerCaracteres, agruparPalavras, ordenarPorAtribNumerico } = require('./funcoes')

const simbolos = [
    '.', '?', '-', ',', '"', '♪',
    '_', '<i>', '</i>', '\r', '[', ']',
    '(', ')', '!'
]

const mesclarConteudos = array => array.join(' ')
const separarPorLinhas = todoConteudo => todoConteudo.split('\n')
const separarPorPalavras = todoConteudo => todoConteudo.split(' ')

const initRead = caminho => {
    lerDiretorio(caminho)
        .then(arquivos => elementosTerminadosCom(arquivos, '.srt'))
        .then(caminhos => lerArquivos(caminhos))
        .then(mesclarConteudos)
        .then(separarPorLinhas)
        .then(removerSeVazio)
        .then(removerseIncluir('-->'))
        .then(removerSeApenasNumeros)
        .then(removerCaracteres(simbolos))
        .then(mesclarConteudos)
        .then(separarPorPalavras)
        .then(removerSeVazio)
        .then(removerSeApenasNumeros)
        .then(agruparPalavras)
        .then(ordenarPorAtribNumerico('qtde', 'desc'))
        .then(console.log)
}
module.exports = { initRead }