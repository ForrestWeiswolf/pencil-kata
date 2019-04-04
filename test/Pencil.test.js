const { expect } = require('chai')
const { Pencil } = require('../index')
const sinon = require('sinon')

describe('Pencil', () => {
  let pencil
  let fakePaper
  beforeEach(() => {
    fakePaper = {
      addText: sinon.fake(),
      removeText: sinon.fake(),
      text: ''
    }

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

  it('has a .eraserDurability property', () => {
    expect(pencil).to.haveOwnProperty('eraserDurability')
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

  describe('length', () => {
    it('can be passed as the second argument to the constructor', () => {
      expect(new Pencil(22, 12).length).to.equal(12)
      expect(new Pencil(90, 14).length).to.equal(14)
    })

    it('defaults to 100', () => {
      expect(pencil.length).to.equal(100)
    })
  })

  describe('eraserDurability', () => {
    it('can be passed as the third argument to the constructor', () => {
      expect(new Pencil(1, 2, 20).eraserDurability).to.equal(20)
      expect(new Pencil(1, 2, 22).eraserDurability).to.equal(22)
    })

    it('defaults to 1000', () => {
      expect(pencil.eraserDurability).to.equal(1000)
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

    it('Reduces the pencil\'s sharpness by 1 when writing a lowercase letter', () => {
      pencil = new Pencil(30)
      pencil.write('a', fakePaper)
      expect(pencil.sharpness).to.equal(29)
    })

    it('Reduces the pencil\'s sharpness by 2 when writing an uppercase letter', () => {
      pencil = new Pencil(30)
      pencil.write('A', fakePaper)
      expect(pencil.sharpness).to.equal(28)
    })

    it('Doesn\'t reduces the pencil\'s sharpness when writing whitespace', () => {
      pencil = new Pencil(30)
      pencil.write(' ', fakePaper)
      pencil.write('\n', fakePaper)
      pencil.write('\t', fakePaper)
      expect(pencil.sharpness).to.equal(30)
    })

    it('Reduces the pencil\'s sharpness by 1 when writing other non-letter characters', () => {
      pencil = new Pencil(30)
      pencil.write('^', fakePaper)
      expect(pencil.sharpness).to.equal(29)
    })

    it('Reduces sharpness when writing multiple characters', () => {
      pencil = new Pencil(30)
      pencil.write('If ', fakePaper)
      expect(pencil.sharpness).to.equal(27)
    })

    it('Writes only spaces when it is dull', () => {
      pencil = new Pencil(0)
      pencil.write('aA', fakePaper)
      expect(fakePaper.addText.getCall(0).args[0]).to.equal('  ')
    })

    it('Won\'t end up with negative sharpness from writing while dull', () => {
      pencil = new Pencil(0)
      pencil.write('aA', fakePaper)
      expect(pencil.sharpness).to.equal(0)
    })

    it('Can go dull in the middle of writing', () => {
      pencil = new Pencil(2)
      pencil.write('If', fakePaper)
      expect(fakePaper.addText.getCall(0).args[0]).to.equal('I ')
    })

    /* The spec isn't clear on what to do about this,
    but this option seems slightly closer to the description than the alternative */
    it('Will skip over an uppercase letter to write a lowercase one when sharpness is 1', () => {
      pencil = new Pencil(1)
      pencil.write('If', fakePaper)
      expect(fakePaper.addText.getCall(0).args[0]).to.equal(' f')
    })

    /* Here's the test for the other possibility */
    // it('Won\'t skip over an uppercase letter to write a lowercase one', () => {
    //   pencil = new Pencil(1)
    //   pencil.write('If', fakePaper)
    //   expect(fakePaper.addText.getCall(0).args[0]).to.equal(' ')
    // })

    it('Returns the pencil (for chaining)', () => {
      expect(pencil.write('If there had been music...', fakePaper)).to.equal(pencil)
    })
  })

  describe('.sharpen', ()=> {
    it('Is a method', () => {
      expect(pencil.sharpen).to.be.a('function')
    })

    it('Sets the pencil\'s sharpness equal to its durability', () => {
      pencil.write('but no, of curse there was no music.', fakePaper)
      pencil.sharpen()
      expect(pencil.sharpness).to.equal(pencil.durability)
    })

    it('Reduces the pencil\'s length by 1', () => {
      const initialLength = pencil.length
      pencil.write('but no, of curse there was no music.', fakePaper)
      pencil.sharpen()
      expect(pencil.length).to.equal(initialLength - 1)
    })

    it('Has no effect when Pencil\'s length is 0', () => {
      pencil = new Pencil(10, 0)
      pencil.write('In fact there were none of these things, and so the silence remained.', fakePaper)
      pencil.sharpen()
      expect(pencil.length).to.equal(0)
      expect(pencil.sharpness).to.equal(0)
    })

    it('Returns the pencil (for chaining)', () => {
      expect(pencil.sharpen()).to.equal(pencil)
    })
  })

  describe('.erase', ()=> {
    it('Is a method', () => {
      expect(pencil.erase).to.be.a('function')
    })

    it('Calls the removeText method of a passed Paper', () => {
      pencil.write('Inside the Waystone a pair of men huddled at one corner of the bar.', fakePaper)
      pencil.erase('pair', fakePaper)
      expect(fakePaper.removeText.called).to.equal(true)
    })

    it('Erases the text passed as its first argument', () => {
      fakePaper.text = 'They drank with quiet determination, avoiding serious discussions of troubling news.'
      pencil.erase('drank', fakePaper)
      expect(fakePaper.removeText.getCall(0).args[0]).to.equal(5)
      expect(fakePaper.removeText.getCall(0).args[1]).to.equal(10)
    })

    it('Erases last instance of that text if there is more than one on the paper', () => {
      fakePaper.text = 'In doing these they added a small, sullen silence'
      pencil.erase('the', fakePaper)
      expect(fakePaper.removeText.getCall(0).args[0]).to.equal(fakePaper.text.lastIndexOf('the'))
    })

    it('Returns the pencil (for chaining)', () => {
      expect(pencil.erase('', fakePaper)).to.equal(pencil)
    })
  })
})
