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

// Reduce sharpness by 2 if str.toUpperCase() === str, otherwise reduce by 1
// (Non-letter characters will reduce durability by 1 here)
// Comparing str.toLowerCase() to str is significantly faster than using a regex
function getSharpnessCost(char) {
  if (char.toLowerCase() !== char) {
    return 2
  } else {
    return /\S/.test(char) ? 1 : 0
  }
}

Pencil.prototype.write = function (str, paper) {
  let textToAdd = ''
  let sharpnessCost

  for (let i = 0; i < str.length; i++) {
    sharpnessCost = getSharpnessCost(str[i])
    if (sharpnessCost <= this.sharpness) {
      this.sharpness -= sharpnessCost
      textToAdd += str[i]
    } else {
      textToAdd += ' '
    }
  }

  paper.addText(textToAdd, paper.text.length)
}

module.exports = Pencil