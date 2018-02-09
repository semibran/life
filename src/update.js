module.exports = function update(world) {
  var result = world.slice()
  var outline = []
  for (var i = 0; i < world.length; i++) {
    var cell = world[i]
    var x = cell[0]
    var y = cell[1]
    var n = 0
    for (var dy = -1; dy <= 1; dy++) {
      var ny = y + dy
      for (var dx = -1; dx <= 1; dx++) {
        if (!dx && !dy) continue
        var nx = x + dx
        if (contains(world, nx, ny)) {
          n++
        } else if (!contains(outline, nx, ny)) {
          outline.push([ nx, ny ])
        }
      }
    }
    if (n !== 2 && n !== 3) {
      result[i] = null
    }
  }
  for (var i = 0; i < outline.length; i++) {
    var cell = outline[i]
    var x = cell[0]
    var y = cell[1]
    var n = 0
    for (var dy = -1; dy <= 1; dy++) {
      var ny = y + dy
      for (var dx = -1; dx <= 1; dx++) {
        if (!dx && !dy) continue
        var nx = x + dx
        n += contains(world, nx, ny)
      }
    }
    if (n === 3) {
      result.push([ x, y ])
    }
  }
  world.length = 0
  for (var i = 0; i < result.length; i++) {
    var cell = result[i]
    if (cell) world.push(cell)
  }
}

function contains(cells, x, y) {
  for (var i = 0; i < cells.length; i++) {
    var cell = cells[i]
    if (cell[0] === x && cell[1] === y) {
      return true
    }
  }
  return false
}
