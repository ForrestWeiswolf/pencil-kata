/**
 * A simulation of a sheet of paper.
 * @constructor
 * @property {string} text The text written on this sheet of paper
 */
function Paper() {
  this.text = ''
}

Paper.prototype.addText = function (textToAdd, index) {
  this.text = this.text.slice(0, index) + textToAdd + this.text.slice(index + textToAdd.length)
}

module.exports = Paper