const request = require('request')

exports.get = async function (url) {
  return new Promise((resolve, reject) => {
    request({ url, method: 'GET' }, (error, response, body) => {
      if (error) return reject(error)

      return resolve({ body, response })
    })
  })
}

exports.post = async function (url, data) {
  return new Promise((resolve, reject) => {
    request({ url, method: 'POST', data }, (error, response, body) => {
      if (error) return reject(error)

      return resolve({ body, response })
    })
  })
}