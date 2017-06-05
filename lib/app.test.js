import app from './app'
import request from 'supertest'
import expect from 'expect'
import { mpk, addresses } from './data.test.json'
suite('Test the routes', function () {
  test('should get the correct address for a MPK', function () {
    return request(app).get('/' + mpk).type('json').query({
      'from': 0,
      'to': 0
    }).then(function (res) {
      expect(res.body).toEqual({
        '0': addresses['0']
      })
    })
  })
  test('should gracefully fail for incorrect MPK', function () {
    return request(app).get('/' + mpk + 'sksks').type('json').query({
      'from': 0,
      'to': 0
    }).then(function (res) {
      expect(res.statusCode).toEqual(500)
    })
  })
  test('should gracefully fail for missing query parameters', function () {
    return request(app).get('/' + mpk).type('json').then(function (res) {
      expect(res.statusCode).toEqual(400)
    })
  })
  test('should generate a bunch of addresses', function () {
    return request(app).get('/' + mpk).type('json').query({
      'from': 0,
      'to': 99
    }).then(function (res) {
      expect(res.body).toEqual(addresses)
      expect(res.statusCode).toEqual(200)
    })
  })
})
