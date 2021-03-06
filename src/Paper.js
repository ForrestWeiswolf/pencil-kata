/**
 * A simulation of a sheet of paper.
 * @constructor
 * @property {string} text The text written on this sheet of paper
 */
function Paper() {
  this.text = ''
}

/* Helper function for Paper.prototype.addText.
Returns true if passed char is falsy or is whitespace. */
function isBlank(char) {
  return !char || /\s/.test(char)
}

/* Helper function for Paper.prototype.addText.
If either argument is blank, returns the other.
If both are blank, favors the first.
(The spec didn't say what to do when writing whitespace over different whitespace)
If neither is blank, returns '@ */
function overlapChars(charToAdd, charAlreadyThere) {
  if (isBlank(charToAdd)) {
    return charAlreadyThere || charToAdd
  } else {
    return isBlank(charAlreadyThere) ? charToAdd : '@'
  }
}

/** Add text to a sheet of paper.
 * If added non-whitespace characters overlap preexisting non-whitespace characters,
 * the paper will have an '@' where the overlap occurred.
 * @param {textToAdd} [string] - The text to add to this paper
 * @param {index} [number] - The index at which to start adding that text
 */
Paper.prototype.addText = function (textToAdd, index) {
  const overlap = textToAdd
    .split('')
    .map((charToAdd, i) => overlapChars(charToAdd, this.text[index + i]))

  this.text = this.text.slice(0, index) +
    overlap.join('') +
    this.text.slice(index + textToAdd.length)

  return this
}

/** Remove text from a sheet of paper, replacing it with spces.
 * @param {start} [number] - Index at which to start removing text (inclusive)
 * @param {end} [number] - Index at which to stop removing text (exclusive)
 */
Paper.prototype.removeText = function (start, end) {
  if(end > this.text.length){
    throw new RangeError(`Tried to remove text up to index ${end}, when this paper only has text of length ${this.text.length}`)
  } else if(end < start){
    throw new RangeError(`End value ${end} passed to removeText was less than start value ${start}.`)
  }

  const spaces = new Array(end - start).fill(' ').join('')
  this.text = this.text.slice(0, start) + spaces + this.text.slice(end)

  return this
}


module.exports = Paper