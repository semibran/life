module.exports = function update(world) {
  world.time++
  var cols = world.size[0]
  var rows = world.size[1]
  var area = world.data.length
  var result = new world.data.constructor(area)
  for (var y = 0; y < rows; y++) {
    for (var x = 0; x < cols; x++) {
      var index = y * cols + x
      var neighbors = 0
      for (var dy = -1; dy <= 1; dy++) {
        for (var dx = -1; dx <= 1; dx++) {
          if (!dx && !dy) continue
          var nx = x + dx
          var ny = y + dy
          if (nx < 0) nx += cols
          if (nx >= cols) nx -= cols
          if (ny < 0) ny += rows
          if (ny >= rows) ny -= rows
          if (world.data[ny * cols + nx]) neighbors++
        }
      }
      var rule = world.data[index] === 0
        ? world.rule.birth
        : world.rule.survival
      if (rule.indexOf(neighbors) !== -1) {
        result[index] = 1
      }
    }
  }
  world.data = result
}
