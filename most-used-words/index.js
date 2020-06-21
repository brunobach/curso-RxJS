const path = require('path')
const fn = require('./funcoes')
const { elementosTerminadosCom, lerArquivos, removerSeVazio, removerseIncluir, removerSeApenasNumeros, removerCaracteres, agruparPalavras, ordenarPorAtribNumerico } = require('./funcoes')

const caminho = path.join(__dirname, '..', 'legendas')

const simbolos = [
    '.', '?', '-', ',', '"', '♪',
    '_', '<i>', '</i>', '\r', '[', ']',
    '(', ')', '!'
]

const mesclarConteudos = array => array.join(' ')
const separarPorLinhas = todoConteudo => todoConteudo.split('\n')
const separarPorPalavras = todoConteudo => todoConteudo.split(' ')



fn.lerDiretorio(caminho)
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
    .then(fn.agruparPalavras)
    .then(ordenarPorAtribNumerico('qtde', 'desc'))
    //.then(console.log)