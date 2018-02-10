module.exports = function render(state, image, canvas) {
  var cells = state.world
  var prev = state.prev
  var view = state.view
  var width = view.size[0]
  var height = view.size[1]
  var context = canvas.getContext("2d")
  canvas.width = width
  canvas.height = height

  var born = []
  for (var i = 0; i < cells.length; i += 2) {
    for (var j = 0; j < prev.length; j += 2) {
      if (prev[j] === cells[i] && prev[j + 1] === cells[i + 1]) {
        break
      }
    }
    if (j === prev.length) {
      born.push(cells[i], cells[i + 1])
    }
  }

  for (var i = 0; i < born.length; i += 2) {
    var x = born[i + 0] + Math.round(width / 2) - view.position[0]
    var y = born[i + 1] + Math.round(height / 2) - view.position[1]
    if (x >= 0 && x < width && y >= 0 && y < height) {
      var index = (y * width + x) * 4
      image.data[index + 0] = 0xFF
      image.data[index + 1] = 0xFF
      image.data[index + 2] = 0xFF
      image.data[index + 3] = 0xFF
    }
  }

  var died = []
  for (var i = 0; i < prev.length; i += 2) {
    for (var j = 0; j < cells.length; j += 2) {
      if (cells[j] === prev[i] && cells[j + 1] === prev[i + 1]) {
        break
      }
    }
    if (j === cells.length) {
      died.push(prev[i], prev[i + 1])
    }
  }

  for (var i = 0; i < died.length; i += 2) {
    var x = died[i + 0] + Math.round(width / 2) - view.position[0]
    var y = died[i + 1] + Math.round(height / 2) - view.position[1]
    if (x >= 0 && x < width && y >= 0 && y < height) {
      var index = (y * width + x) * 4
      image.data[index + 0] = 0x00
      image.data[index + 1] = 0x00
      image.data[index + 2] = 0x33
      image.data[index + 3] = 0xFF
    }
  }

  context.putImageData(image, 0, 0)

  return canvas
}
