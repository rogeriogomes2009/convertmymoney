const axios = require('axios')

const getUrl = data => 'http://economia.awesomeapi.com.br/json/last/USD-BRL'
const getCotacaoAPI = url => axios.get(url)
const extractCotacao = res => res.data.value[0].cotacaoVenda
const getToday = () => {
    const today = new Date()
    return (today.getMonth()+1)+'-'+today.getDate()+'-'+today.getFullYear()
}
const getCotacao = ({ getToday, getUrl, getCotacaoAPI, extractCotacao }) => async() => {
    try{
        const today = getToday()
        const url = getUrl(today)
        const res = await getCotacaoAPI(url)
        const cotacao = extractCotacao(res)
        return cotacao
    }catch(err){
        return ''
    }
}


module.exports = {
    getCotacaoAPI,
    getCotacao: getCotacao({ getToday, getUrl, getCotacaoAPI, extractCotacao}),
    extractCotacao,
    getUrl,
    getToday,
    pure: {
        getCotacao
    }
}
