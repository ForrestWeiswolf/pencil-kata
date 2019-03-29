/**
 * A simulation of a sheet of paper.
 * @constructor
 * @property {string} text The text written on this sheet of paper
 */
function Paper() {
  this.text = ''
}

Paper.prototype.addText = function (text) {
  this.text = text
}

module.exports = Paper