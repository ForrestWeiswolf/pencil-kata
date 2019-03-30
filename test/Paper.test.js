const { expect } = require('chai')
const { Paper } = require('../index')

describe('Paper', () => {
  let sheet
  beforeEach(() => {
    sheet = new Paper()
  })

  it('Is a constructor', () => {
    expect(Paper).to.be.a('function')
    expect(sheet).to.be.an('object')
  })

  it('has a .text property', () => {
    expect(sheet).to.haveOwnProperty('text')
  })

  it('starts out with an empty string as text', () => {
    expect(sheet.text).to.equal('')
  })

  describe('Paper.addText', () => {
    it('Is a method', () => {
      expect(sheet.addText).to.be.a('function')
    })

    it('Can add text to the beginning of a blank sheet of paper', () => {
      const textToAdd = 'The Waystone Inn lay in silence, and it was a silence of three parts.'
      sheet.addText(textToAdd, 0)
      expect(sheet.text).to.equal(textToAdd)
    })

    it('Can fill in a space in a sheet of paper with preexisting text', () => {
      sheet.addText('The      obvious part was a hollow, echoing quiet', 0)
      sheet.addText('most', 4)
      expect(sheet.text).to.equal('The most obvious part was a hollow, echoing quiet')
    })
  })
})