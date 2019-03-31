/**
 * A simulation of a sheet of paper.
 * @constructor
 * @property {string} text The text written on this sheet of paper
 */
function Paper() {
  this.text = ''
}

Paper.prototype.addText = function (textToAdd, index) {
  let overlap = textToAdd.split('').map((charToAdd, i) => {
    if (this.text[index + i]) {
      // if both charcters aren't whitespace...
      return /\S/.test(this.text[index + i]) && /\S/.test(charToAdd) ? '@' : charToAdd
    } else {
      return charToAdd
    }
  }).join('')

  this.text = this.text.slice(0, index) + overlap + this.text.slice(index + textToAdd.length)
}

module.exports = Paper