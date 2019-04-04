/**
 * A simulation of an ordinary pencil.
 * @constructor
 * @param {number} length The length of the pencil - how many times it can be sharpened.
 * @param {number} durability The maximum sharpness of the pencil (which sharpness will be reset to when it is sharpened).
 * @property {number} sharpness The sharpness of the pencil - how many characters it can write before it goes dull.
 */
function Pencil(durability = 1000, length = 100) {
  this.durability = durability
  this.sharpness = durability
  this.length = length
}

/* Helper function for Pencil.write.
Reduce sharpness by 2 if str.toUpperCase() === str, otherwise reduce by 1
(Non-letter characters will reduce durability by 1 here)
Comparing str.toLowerCase() to str is significantly faster than using a regex */
function getSharpnessCost(char) {
  if (char.toLowerCase() !== char) {
    return 2
  } else {
    return /\S/.test(char) ? 1 : 0
  }
}

/**
 * Writes text on a sheet of paper.
 * Writing an uppercase character will reduce the pencil's sharpness by two; writing other characters will redecu sharpness by 1, except for whitespace which does not cost any sharpness.
 * If it isn't sharp enought to write a character, it will write a space instead.
 * @param {string} str The text to write.
 * @param {Paper} paper The paper to write on
 */
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

  return this
}

/**
 * Sharpen the pencil.
 * If the pencil's length is at least 1, resets its sharpness to equal its durability, and reduces length by 1.
 * If the pencil's length is 0, has no effect
 */
Pencil.prototype.sharpen = function () {
  if (this.length > 0) {
    this.sharpness = this.durability
    this.length--
  }

  return this
}

/**
 * Use the pencil to erase text
 * @param {string} textToErase The text to erase
 * @param {Paper} paper The paper to erase it from
 */
Pencil.prototype.erase = function (textToErase, paper) {
  const start = paper.text.lastIndexOf(textToErase)
  const end = start + textToErase.length
  paper.removeText(start, end)
  return this
}

module.exports = Pencil