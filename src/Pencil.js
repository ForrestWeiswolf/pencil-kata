/**
 * A simulation of an ordinary pencil.
 * @constructor
 * @param {number} length The length of the pencil - how many times it can be sharpened.
 * @param {number} durability The maximum sharpness of the pencil (which sharpness will be reset to when it is sharpened).
 * @property {number} sharpness The sharpness of the pencil - how many characters it can write before it goes dull.
 */
function Pencil(durability = 1000) {
  this.durability = durability
  this.sharpness = durability
  this.length = 100
}

Pencil.prototype.write = function (str, paper) {
  paper.addText(str, paper.text.length)
  // Reduce durability by 2 if str.toUpperCase() === str, otherwise reduce by 1
  // (Non-letter characters will reduce durability by 1 here)
  // str.toUpperCase() === str is significantly faster that using a regex
  this.sharpness -= (str.toUpperCase() === str) ? 2 : 1
}

module.exports = Pencil