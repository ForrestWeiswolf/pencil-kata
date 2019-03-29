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

  it('starts out with an empty string as text', () => {
    expect(new Paper().text).to.equal('')
  })

  describe('Paper.addText', () => {
    it('Is a method', () => {
      expect(new Paper().addText).to.be.a('function')
    })

    it('Can add text to the beginning of a blank sheet of paper', () => {
      const textToAdd = 'The Waystone Inn lay in silence, and it was a silence of three parts.'
      const sheet = new Paper()
      sheet.addText(textToAdd, 0)
      expect(sheet.text).to.equal(textToAdd)
    })
  })
})