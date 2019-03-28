/**
 * A simulation of an ordinary pencil.
 * @constructor
 * @property {number} sharpness The sharpness of the pencil - how many characters it can write before it goes dull.
 * @property {number} durability The maximum sharpness of the pencil (which sharpness will be reset to when it is sharpened).
 * @property {number} length The length of the pencil - how many times it can be sharpened.
 */
function Pencil(durability) {
  this.durability = durability
  this.sharpness = 1000
  this.length = 100
}

module.exports = Pencil