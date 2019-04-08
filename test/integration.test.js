const Pencil = require('../src/Pencil')
const Paper = require('../src/Paper')
const {
  expect
} = require('chai')

/*
Since this kata is primarily about TDD with unit testing, these integration tests are pretty basic - I just used the examples from the readme.
*/

describe('Writing', () => {
  it('Writes on paper', () => {
    const paper = new Paper()
    const pencil = new Pencil()
    pencil.write('She sells sea shells', paper)

    expect(paper.text).to.equal('She sells sea shells')
  })

  it('Appends to end', () => {
    const paper = new Paper()
    const pencil = new Pencil()
    pencil.write('She sells sea shells', paper)
    pencil.write(' down by the sea shore', paper)
    expect(paper.text).to.equal('She sells sea shells down by the sea shore')
  })
})

describe('Pencil degradation', () => {
  it('The pencil can go dull', () => {
    const paper = new Paper()
    const pencil = new Pencil(4)
    pencil.write('Text', paper)
    expect(paper.text).to.equal('Tex ')
  })
})

describe('Erasing', () => {
  it('Can erase text', () => {
    const paper = new Paper()
    const pencil = new Pencil()
    pencil.write("How much wood would a woodchuck chuck if a woodchuck could chuck wood?", paper)
    pencil.erase('chuck', paper)
    expect(paper.text).to.equal("How much wood would a woodchuck chuck if a woodchuck could       wood?")
  })

  it('Can run out of durability', () => {
    const paper = new Paper()
    const pencil = new Pencil(1000, 200, 3)
    pencil.write('Buffalo Bill', paper)
    pencil.erase('Bill', paper)
    expect(paper.text).to.equal('Buffalo B   ')
  })
})