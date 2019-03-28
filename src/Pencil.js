/**
 * A simulation of an ordinary pencil.
 * @constructor
 * @property {number} durability The point durability of the pencil - how many characters it can write before it goes dull.
  * @property {number} length The length of the pencil - how many times it can be sharpened.
 */
function Pencil() {
  this.durability = 1000
  this.length = 100
}

module.exports = Pencil