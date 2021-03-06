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

    it('Can add text to the end of a sheet of paper with text on it', () => {
      const textToAddFirst = 'The Waystone Inn lay in silence'
      const textToAppend = ', and it was a silence of three parts.'

      sheet.addText(textToAddFirst, 0)
      sheet.addText(textToAppend, sheet.text.length)

      expect(sheet.text).to.equal(textToAddFirst + textToAppend)
    })

    it('Can fill in a space in a sheet of paper with preexisting text', () => {
      sheet.addText('The      obvious part was a hollow, echoing quiet', 0)
      sheet.addText('most', 4)
      expect(sheet.text).to.equal('The most obvious part was a hollow, echoing quiet')
    })

    it('Produces "@" symbols when added text overlaps preexisting text', () => {
      sheet.addText('mad  of things that were lacking', 0)
      sheet.addText('e by', 3)
      expect(sheet.text).to.equal('made @@ things that were lacking')
    })

    it('Returns the paper (for method chaining)', () => {
      const returnVal = sheet.addText('made of things that were lacking.', 0)
      expect(returnVal).to.equal(sheet)
    })
  })

  describe('Paper.removeText', () => {
    it('Is a method', () => {
      expect(sheet.removeText).to.be.a('function')
    })

    it('Replaces text with spaces between the specified indices', () => {
      sheet.addText('If there had been a wind it would have sighed through the trees')
      sheet.removeText(20, 24)
      expect(sheet.text).to.equal('If there had been a      it would have sighed through the trees')
    })

    it('Returns the paper (for method chaining)', () => {
      sheet.addText('If there had been a wind it would have sighed through the trees')
      const returnVal = sheet.removeText(20, 24)
      expect(returnVal).to.equal(sheet)
    })

    it('Throws a RangeError if trying to remove text that isn\'t there', () => {
      expect(() => {sheet.removeText(0, 2)}).to.throw(RangeError)
    })

    it('Throws an error with a message that says what the invalid end value was', () => {
      expect(() => {sheet.removeText(0, 2)}).to.throw(/2/)
    })

    it('Throws a informative RangeError if end is before start', () => {
      sheet.addText('set the inn’s sign creaking on its hooks, and brushed the silence down the road like trailing autumn leaves.')
      expect(() => {sheet.removeText(12, 2)}).to.throw(RangeError)
    expect(() => {sheet.removeText(12, 2)}).to.throw(/end.+start/i)
    })
  })
})