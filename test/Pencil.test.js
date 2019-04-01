const { expect } = require('chai')
const { Pencil } = require('../index')
const sinon = require('sinon')

describe('Pencil', () => {
  let pencil
  beforeEach(() => {
    pencil = new Pencil()
  })

  it('Is a constructor', () => {
    expect(Pencil).to.be.a('function')
    expect(new Pencil()).to.be.an('object')
  })

  it('has a .durability property', () => {
    expect(pencil).to.haveOwnProperty('durability')
  })

  it('has a .sharpness property', () => {
    expect(pencil).to.haveOwnProperty('sharpness')
  })

  it('has a .length property', () => {
    expect(pencil).to.haveOwnProperty('length')
  })

  describe('durability', () => {
    it('can be passed as the first argument to the constructor', () => {
      expect(new Pencil(22).durability).to.equal(22)
      expect(new Pencil(90).durability).to.equal(90)
    })

    it('defaults to 1000', () => {
      expect(pencil.durability).to.equal(1000)
    })
  })

  describe('sharpness', () => {
    it('is initially equal to durability', () => {
      expect(pencil.durability).to.equal(pencil.sharpness)
      pencil = new Pencil(30)
      expect(pencil.durability).to.equal(pencil.sharpness)
    })
  })

  describe('.write', () => {
    let fakePaper
    beforeEach(() => {
      fakePaper = {
        addText: sinon.fake(),
        removeText: sinon.fake(),
        text: ''
      }
    })

    it('is a method', () => {
      expect(pencil.write).to.be.a('function')
    })

    it('Takes a Paper as second argument and calls its .addText method', () => {
      pencil.write('', fakePaper)
      expect(fakePaper.addText.called).to.equal(true)
    })

    it('Adds text passed as first argument', () => {
      const textToWrite = 'If there had been a crowd, even a handful of men inside the inn,'
      pencil.write(textToWrite, fakePaper)
      expect(fakePaper.addText.getCall(0).args[0]).to.equal(textToWrite)
    })

    it('Adds text at index 0 if the paper is blank', () => {
      const textToWrite = 'they would have filled the silence with coversation and laughter,'
      pencil.write(textToWrite, fakePaper)
      expect(fakePaper.addText.getCall(0).args[1]).to.equal(0)
    })

    it('Adds text at the end if the paper already has text', () => {
      fakePaper.text = 'they would have filled the silence with coversation and laughter, '
      const lengthOfExistingText = fakePaper.text.length

      const textToWrite = 'the clatter and clamour one expects from a drinking house during the dark hours of the night.'
      pencil.write(textToWrite, fakePaper)

      expect(fakePaper.addText.getCall(0).args[1]).to.equal(lengthOfExistingText)
    })
  })
})
