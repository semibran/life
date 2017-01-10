export default { generate, indexToPos, posToIndex, getNeighbors, getAt, setAt, contains }

const UP_LEFT    = [-1, -1]
const UP         = [ 0, -1]
const UP_RIGHT   = [ 1, -1]
const LEFT       = [-1,  0]
const RIGHT      = [ 1,  0]
const DOWN_LEFT  = [-1,  1]
const DOWN       = [ 0,  1]
const DOWN_RIGHT = [ 1,  1]
const directions = [UP_LEFT, UP, UP_RIGHT, LEFT, RIGHT, DOWN_LEFT, DOWN, DOWN_RIGHT]

function generate(size, ratio) {

  if (!ratio)
    ratio = 0.8

  var area = size * size
  var data = new Uint8ClampedArray(area)
  var i = area
  while (i--)
    data[i] = Math.random() > ratio

  return data

}

function indexToPos(index, size) {
  var x = index % size
  var y = (index - x) / size
  return [x, y]
}

function posToIndex(pos, size) {
  var [x, y] = pos
  return y * size + x
}

function getNeighbors(pos, size) {
  if (!size)
    return []
  var neighbors = []
  var [x, y] = pos
  for (var direction of directions) {
    var [dx, dy] = direction
    var cx = x + dx
    var cy = y + dy
    if (cx < 0)
      cx += size
    if (cx >= size)
      cx -= size
    if (cy < 0)
      cy += size
    if (cy >= size)
      cy -= size
    var current = [cx, cy]
    neighbors.push(current)
  }
  return neighbors
}

function getAt(data, pos, size) {
  if (!size)
    size = Math.sqrt(data.length)
  if ( !contains(pos, size) )
    return null
  var index = posToIndex(pos, size)
  return data[index]
}

function setAt(data, pos, id, size) {
  if (!size)
    size = Math.sqrt(data.length)
  if ( !contains(pos, size) )
    return null
  var index = posToIndex(pos, size)
  data[index] = id
  return id
}

function contains(pos, size) {
  var [x, y] = pos
  return x >= 0 && y >= 0 && x < size && y < size
}
