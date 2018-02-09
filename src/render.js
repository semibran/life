module.exports = function render(state, canvas) {
  var world = state.world
  var view = state.view

  if (!canvas) canvas = document.createElement("canvas")
  var context = canvas.getContext("2d")
  canvas.width = view.size[0]
  canvas.height = view.size[1]
  context.imageSmoothingEnabled = false

  var width = view.size[0]
  var height = view.size[1]
  var image = context.createImageData(width, height)
  for (var i = width * height; i--;) {
    image.data[i * 4 + 3] = 255
  }

  for (var cell of world) {
    var x = cell[0] - view.position[0] + Math.round(view.size[0] / 2)
    var y = cell[1] - view.position[1] + Math.round(view.size[1] / 2)
    if (x >= 0 && x < width && y >= 0 && y < height) {
      var i = y * width + x
      var index = i * 4
      image.data[index]     = 255
      image.data[index + 1] = 255
      image.data[index + 2] = 255
    }
  }

  context.putImageData(image, 0, 0)

  if (view.scale !== 1) {
    var factor = (view.scale - 1) / 2
    context.drawImage(
      canvas,
      -width * factor, -height * factor,
      width * view.scale, height * view.scale
    )
  }

  return canvas
}
