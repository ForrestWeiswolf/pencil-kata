const { expect } = require('chai')
const { Pencil } = require('../index')

describe('Pencil', () => {
  it('Is a constructor', () => {
    expect(Pencil).to.be.a('function')
    expect(new Pencil()).to.be.an('object')
  })

  it('has a .durability property', () => {
    expect(new Pencil()).to.haveOwnProperty('durability')
  })

  it('has a .sharpness property', () => {
    expect(new Pencil()).to.haveOwnProperty('sharpness')
  })

  it('has a .length property', () => {
    expect(new Pencil()).to.haveOwnProperty('length')
  })

  describe('durability', () => {
    it('can be passed as the first argument to the constructor', () => {
      expect(new Pencil(22).durability).to.equal(22)
      expect(new Pencil(90).durability).to.equal(90)
    })
  })
})
