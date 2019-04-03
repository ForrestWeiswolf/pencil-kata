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
  let textToAdd = ''
  let isntSpace = /\S/

  for (let i = 0; i < str.length; i++) {
    if (this.sharpness === 0) {
      break
    }
    
    // Reduce sharpness by 2 if str.toUpperCase() === str, otherwise reduce by 1
    // (Non-letter characters will reduce durability by 1 here)
    // Comparing str.toLowerCase() to str is significantly faster than using a regex
    if (str[i].toLowerCase() !== str[i]) {
      this.sharpness -= 2
      textToAdd += str[i]
    } else if (isntSpace.test(str[i])) {
      this.sharpness -= 1
      textToAdd += str[i]
    } else {
      textToAdd += str[i]
    }
  }

  textToAdd += new Array(str.length - textToAdd.length).fill(' ').join('')

  paper.addText(textToAdd, paper.text.length)
}

module.exports = Pencil