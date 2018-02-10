module.exports = function render(state, image) {
  var cells = state.world
  var prev = state.prev
  var view = state.view
  var width = view.size[0]
  var height = view.size[1]
  var offset = [
    Math.round(width / 2 - view.position[0]),
    Math.round(height / 2 - view.position[1])
  ]

  for (var y = 0; y < height; y++) {
    for (var x = 0; x < width; x++) {
      var index = (y * width + x) * 4
      var value = image.data[index + 2]
      if (value) {
        for (var i = 0; i < cells.length; i += 2) {
          if (cells[i] + offset[0] === x && cells[i + 1] + offset[1] === y) {
            break
          }
        }
        if (i === cells.length) {
          image.data[index + 0] = 0x00
          image.data[index + 1] = 0x00
          image.data[index + 2] = value - 0xF
          image.data[index + 3] = 0xFF
        }
      }
    }
  }

  for (var i = 0; i < cells.length; i += 2) {
    var x = cells[i + 0] + offset[0]
    var y = cells[i + 1] + offset[1]
    if (x >= 0 && x < width && y >= 0 && y < height) {
      var index = (y * width + x) * 4
      image.data[index + 0] = 0x00
      image.data[index + 1] = 0xFF
      image.data[index + 2] = 0xFF
      image.data[index + 3] = 0xFF
    }
  }
}
