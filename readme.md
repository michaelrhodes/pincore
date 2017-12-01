# simple-pin

simple-pin is an isomorphic client for the [Pin Payments API](https://pin.net.au/developers/api-reference)

## install

```sh
npm install michaelrhodes/simple-pin
```

## use

```js
var pin = require('simple-pin')({
  key: process.browser ?
    process.env.PUBLISHABLE_API_KEY :
    process.env.SECRET_API_KEY
})

var card = {
  tokenify: pin('POST /cards')
}

var details = {
  number: '5520000000000000',
  expiry_month: 12,
  expiry_year: 2018,
  cvc: 123,
  name: 'Ronald Robot',
  address_line1: '42 Sevenoaks St',
  address_city: 'Lathlain',
  address_country: 'AU'
}

card.tokenify(details, (err, json) {
  err ? console.error(err) : console.log(json)
})
```

## obey

[MIT](http://opensource.org/licenses/MIT)
