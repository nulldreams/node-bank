const request = require('./src/request')
const { auth, events, bills } = require('./src/nubank-requests')

const getLinks = async function () {
    let { response, body } = await request.get('https://prod-s0-webapp-proxy.nubank.com.br/api/discovery')

    if (response.statusCode !== 200) {
        console.log('Error', response.statusMessage)
    }

    global.links = JSON.parse(body)
}


exports.start = async () => {
    try {
        await getLinks()
        console.log('nubank started')
    } catch (e) {
        console.log(e)
    }
}

exports.login = async ({ cpf, pass }) => {
    let result = await auth({ cpf, pass })
    global.logged_urls = JSON.parse(result)

    // console.log(result)
    // global.logged_urls = require('../config/config.json')
}

exports.events = events

exports.bills = bills