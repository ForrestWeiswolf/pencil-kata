const { expect } = require('chai')
const { Paper } = require('../index')

describe('Paper', () => {
  it('Is a constructor', () => {
    expect(Paper).to.be.a('function')
    expect(new Paper()).to.be.an('object')
  })
})