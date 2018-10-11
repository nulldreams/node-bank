const request = require('request')
const _ = require('lodash')
const HEADERS = {
    'Host': 'prod-s0-webapp-proxy.nubank.com.br',
    'Connection': 'keep-alive',
    'Content-Length': '146',
    'Accept': 'application/json, text/plain, */*',
    'X-Correlation-Id': 'WEB-APP.s8H38',
    'Origin': 'https://app.nubank.com.br',
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.100 Safari/537.36',
    'Content-Type': 'application/json;charset=UTF-8',
    'Referer': 'https://app.nubank.com.br/',
    'Accept-Encoding': 'gzip, deflate, br',
    'Accept-Language': 'pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7'
}

exports.auth = async ({ cpf, pass }) => {
    let options = { url: global.links['login'], headers: HEADERS, method: 'POST', body: `{"grant_type":"password","login":"${cpf}","password":"${pass}","client_id":"other.conta","client_secret":"yQPeLzoHuJzlMMSAjC-LgNUJdUecx8XO"}` }

    return new Promise((resolve, reject) => {
        request(options, (error, response, body) => {
            if (error) return reject(error)

            if (response.statusCode === 200) return resolve(body)
        })
    })
}

exports.events = {
    categories: {
        account_limit_set: 'account_limit_set',
        bill_flow_paid: 'bill_flow_paid',
        due_day_changed: 'due_day_changed',
        initial_account_limit: 'initial_account_limit',
        payment: 'payment',
        transaction: 'transaction',
        welcome: 'welcome',
        subcategories: {
            card_not_present: 'card_not_present',
            unknown: 'unknown'
        }
    },
    findAll: async () => {
        let options = { url: global.logged_urls._links['events'].href, headers: { 'Authorization': `Bearer ${global.logged_urls['access_token']}` }, method: 'GET' }
    
        return new Promise((resolve, reject) => {

            request(options, (error, response, body) => {
                if (error) return reject(error)
    
                if (response.statusCode === 200) {
                    global.events = JSON.parse(body)
                    return resolve(toJson(body))
                }
            })
        })
    },
    filter: async ({ query, events }) => {
        return new Promise((resolve, reject) => {
            let result = _.filter(events, query)

            if (result.length <= 0) return reject(onError('event'))

            resolve(result)
        })
    },
    findByDate: async ({ date, events }) => {
        // query like mongo on `events`
        return new Promise((resolve, reject) => {
            let result = _.filter(events, e => e.time.indexOf(date) > -1)

            if (result.length <= 0) return reject(onError('event'))

            resolve(result)
        })
    },
    findByName: async ({ name, events }) => {
        // query like mongo on `events`
        return new Promise((resolve, reject) => {
            let result = _.filter(events, e => { if (e.description) {
                return toLower(e.description) === toLower(name)
            }})                

            if (result.length <= 0) return reject(onError('event'))

            resolve(result)
        })
    }
}

exports.bills = {
    all: () => {
        let options = { url: global.logged_urls._links['bills_summary'].href, headers: { 'Authorization': `Bearer ${global.logged_urls['access_token']}` }, method: 'GET' }
    
        return new Promise((resolve, reject) => {
            request(options, (error, response, body) => {
                if (error) return reject(error)
    
                if (response.statusCode === 200) {
                    global.bills = JSON.parse(body)
                    return resolve(toJson(body))
                }
            })
        })
    },
    info: ({ bill }) => {
        return new Promise((resolve, reject) => {
            let { href } = bill._links.self

            if (bill.state === 'future') return reject(onError('info of a bill with state equals "future"'))

            let options = { url: href, headers: { 'Authorization': `Bearer ${global.logged_urls['access_token']}` }, method: 'GET' }

            request(options, (error, response, body) => {
                if (error) return reject(error)
    
                if (response.statusCode === 200) {
                    return resolve(toJson(body))
                }
            })
        })
    },
    barcode: ({ info }) => {
        return new Promise((resolve, reject) => {
            let { href } = info._links.barcode

            let options = { url: href, headers: { 'Authorization': `Bearer ${global.logged_urls['access_token']}` }, method: 'GET' }

            request(options, (error, response, body) => {
                if (error) return reject(error)
    
                if (response.statusCode === 200) {
                    return resolve(toJson(body))
                }
            })
        })
    },
    findByDate: async ({ date, bills }) => {
        // query like mongo on `events`
        return new Promise((resolve, reject) => {
            let result = _.filter(bills, e => e.summary.due_date.indexOf(date) > -1)

            if (result.length <= 0) return reject(onError('bills'))

            resolve(result)
        })
    }
}

function onError (type) {
    return { message: `could not find any ${type}` }
}

function toLower (str) { return str.toLowerCase() }

function toJson (str) { return JSON.parse(str) }