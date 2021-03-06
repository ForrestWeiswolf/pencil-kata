/**
 * A simulation of an ordinary pencil.
 * @constructor
 * @param {number} length The length of the pencil - how many times it can be sharpened.
 * @param {number} durability The maximum sharpness of the pencil (which sharpness will be reset to when it is sharpened).
 * @property {number} sharpness The sharpness of the pencil - how many characters it can write before it goes dull.
 * @property {number} eraserDurability The number of characters the eraser can erase before running out.
 */
function Pencil(durability = 1000, length = 100, eraserDurability = 1000) {
  this.durability = durability
  this.sharpness = durability
  this.length = length
  this.eraserDurability = eraserDurability
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
 * @param {number} [index=paper.text.length] Index to start writing at - defaults to writing at the end of the paper's current text
 */
Pencil.prototype.write = function (str, paper, index=paper.text.length) {
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

  paper.addText(textToAdd, index)

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
 * Use the pencil to erase the last instance of the specified text from the paper.
 * Decreases eraserDurability for every non-whitespace character erased.
 * Text is erased from the end first; thus if a pencil's eraser has remaining durability of three, and it is instructed to erase the word "Bill" from "Buffalo Bill", the text remaining on the paper is "Buffalo B   ".
 * @param {string} textToErase The text to erase
 * @param {Paper} paper The paper to erase it from
 */
Pencil.prototype.erase = function (textToErase, paper) {
  let start = paper.text.lastIndexOf(textToErase)
  let end = start + textToErase.length

  for (let i = (textToErase.length - 1); i >= 0; i--) {
    if (this.eraserDurability === 0) {
      start = start + i + 1
      break
    }

    if (/\S/.test(textToErase[i])) {
      this.eraserDurability -= 1
    }
  }

  paper.removeText(start, end)
  return this
}

module.exports = Pencil