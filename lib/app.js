import express from 'express'
import bodyParser from 'body-parser'
import Electrum from 'bitcore-electrum'
import { Address } from 'bitcore'
import _ from 'lodash'
const app = express()
app.use(bodyParser.json())
app.get('/:pubKey', (req, res) => {
  try {
    const pubKey = req.params.pubKey
    const { query: { start, end, change } } = req
    if (!start || !end) {
      return res.status(400).send('Query parameters from and to are requried')
    }
    const mpk = new Electrum(pubKey)
    const result = _.range(Number(start), Number(end)).reduce((acc, index) => {
      const key = mpk.generatePubKey(index, !!change)
      const address = Address.fromPubKey(key).as('base58')
      return {
        ...acc,
        [index]: address
      }
    }, {})
    return res.json(result)
  } catch (err) {
    return res.sendStatus(500)
  }
})

export default app
