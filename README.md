<p align="center">
  <img src="https://i.imgur.com/9NjrFZO.png" alt="Size Limit example"
       width="40%" height="40%">
</p>
<h4 align="center">A <a href="https://www.nubank.com.br/" target="_blank">Nubank</a> API in NodeJS</h4>
<p align="center">
  <a href="https://gitter.im/simple-apis/node-bank"><img src="https://img.shields.io/badge/gitter-join%20chat%20%E2%86%92-brightgreen.svg"></a>
	
  <a href="https://saythanks.io/to/nulldreams">
      <img src="https://img.shields.io/badge/Say%20Thanks-!-1EAEDB.svg">
  </a>  
	
  <a href="https://github.com/nulldreams/node-bank/issues">
      <img src="https://img.shields.io/codeclimate/issues/github/me-and/mdf.svg">
  </a>

  <a href="http://makeapullrequest.com">
      <img src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square">
  </a>
</p>

***

## Methods
 - **nodebank.start**: start the library
 - **nodebank.login(cpf, password)**: login into nubank API

## Functions
 - **Events**
    - **nodebank.events.findAll**: return an array of your payments, transactions, etc...
    - **nodebank.events.findByDate**: return an event array by date
    - **nodebank.events.findByName**: return an event array by category name
    - **nodebank.events.filter**: return an array of your query
 - **Bills**
    - **nodebank.bills.all**: return and array of your invoices
    - **nodebank.bills.findByDate**: return an bill by **due date**
    - **nodebank.bills.info**: return all info of a bill
    - **nodebank.bills.barcode**: return an object with number of "boleto"s bill
    - **nodebank.bills.emailBill**: comming soon

## Examples
### First of all
`nodebank.start`
 ```javascript
await nubank.start()
 ```

`nodebank.login(cpf, password)`
```javascript
await nubank.login({ cpf: '__cpf', pass: '__password' }) 
```
### Events
`nodebank.events.findAll`
```javascript
await nubank.start()
await nubank.login({ cpf: '__cpf', pass: '__password' }) 
let arr = await nubank.events.findAll()
```

`nodebank.events.findByName`
```javascript
await nubank.start()
await nubank.login({ cpf: '__cpf', pass: '__password' }) 
let arr = await nubank.events.findByName({ name: 'Github.com', events: arr.events })
```

`nodebank.events.findByDate`
```javascript
await nubank.start()
await nubank.login({ cpf: '__cpf', pass: '__password' }) 
let arr = await nubank.events.findByDate({ date: '2018-10-10', events: arr.events })
```

`nodebank.events.filter`
```javascript
await nubank.start()
await nubank.login({ cpf: '__cpf', pass: '__password' }) 
    
let subcategories = nubank.events.categories.subcategories
let arr = await nubank.events.filter({ query: [ 'details.subcategory', subcategories.card_not_present ], events: arr.events })
```
### Bills
`nodebank.bills.all`
```javascript
await nubank.start()
await nubank.login({ cpf: '__cpf', pass: '__password' }) 
    
let bills = await nubank.bills.all()
```
`nodebank.bills.findByDate`
```javascript
await nubank.start()
await nubank.login({ cpf: '__cpf', pass: '__password' }) 
    
let arrBills = await nubank.bills.all()
    
let [bill] = await nubank.bills.findByDate({ date: '2018-11-11', bills: arrBills.bills })
```
`nodebank.bills.info`
```javascript
await nubank.start()
await nubank.login({ cpf: '__cpf', pass: '__password' }) 
    
let arrBills = await nubank.bills.all()
    
let [bill] = await nubank.bills.findByDate({ date: '2018-11-11', bills: arrBills.bills })

let info = await nubank.bills.info({ bill })
```
`nodebank.bills.barcode`
```javascript
await nubank.start()
await nubank.login({ cpf: '__cpf', pass: '__password' }) 

let arrBills = await nubank.bills.all()

let [bill] = await nubank.bills.findByDate({ date: '2018-11-11', bills: arrBills.bills })

let info = await nubank.bills.info({ bill })

let barcode = await nubank.bills.barcode({ info: info.bill })
```
***

## Credits

This software uses some open source packages.

- [Node.js](https://nodejs.org/)
- [Fastify](https://github.com/fastify/fastify)
- [Request](https://github.com/request/request)

**Working on your first Pull Request?** You can learn how from this *free* series [How to Contribute to an Open Source Project on GitHub](https://egghead.io/series/how-to-contribute-to-an-open-source-project-on-github)

---

> GitHub [@nulldreams](https://github.com/nulldreams) &nbsp;&middot;&nbsp;
