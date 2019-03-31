const { expect } = require('chai')
const { Pencil } = require('../index')

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
    it('is a method', () => {
      expect(pencil.write).to.be.a('function')
    })
  })
})
