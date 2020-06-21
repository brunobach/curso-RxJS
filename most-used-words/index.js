const path = require('path')
const fn = require('./funcoes')
const { elementosTerminadosCom, lerArquivos, removerSeVazio, removerseIncluir, removerSeApenasNumeros } = require('./funcoes')

const caminho = path.join(__dirname, '..', 'legendas')

fn.lerDiretorio(caminho)
    .then(arquivos => elementosTerminadosCom(arquivos, '.srt'))
    .then(caminhos => lerArquivos(caminhos))
    .then(conteudos => conteudos.join('\n'))
    .then(todoConteudo => todoConteudo.split('\n'))
    .then(removerSeVazio)
    .then(removerseIncluir('-->'))
    .then(removerSeApenasNumeros)
    .then(console.log)

