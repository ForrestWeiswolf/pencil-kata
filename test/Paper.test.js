const { expect } = require('chai')
const { Paper } = require('../index')

describe('Paper', () => {
  it('Is a constructor', () => {
    expect(Paper).to.be.a('function')
    expect(new Paper()).to.be.an('object')
  })

  it('has a .text property', () => {
    expect(new Paper()).to.haveOwnProperty('text')
  })

  describe('Paper.addText', () => {
    it('Is a method', () => {
      expect(new Paper().addText).to.be.a('function')
    })
  })
})