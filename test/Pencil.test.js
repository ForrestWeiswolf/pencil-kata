const { expect } = require('chai')
const { Pencil } = require('../index')

describe('Pencil', () => {
  it('Is a constructor', () => {
    expect(Pencil).to.be.a('function')
    expect(new Pencil()).to.be.an('object')
  })
})
