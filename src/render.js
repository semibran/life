module.exports = function render(state, canvas) {
  var world = state.world
  var cache = state.cache
  var cols = world.size[0]
  var rows = world.size[1]
  if (!canvas) canvas = document.createElement("canvas")
  if (canvas.width !== cols || canvas.height !== rows) {
    canvas.width = cols
    canvas.height = rows
  }
  var context = canvas.getContext("2d")
  var image = context.createImageData(canvas.width, canvas.height)
  for (var i = 0; i < cache.length; i++) {
    var indices = cache[i]
    if (!indices) break
    for (var j = 0; j < indices.length; j++) {
      var index = indices[j]
      var percent = (cache.length - i) / cache.length
      image.data[index * 4]     = 0
      image.data[index * 4 + 1] = 0
      image.data[index * 4 + 2] = 127 * percent
      image.data[index * 4 + 3] = 255
    }
  }
  for (var y = 0; y < rows; y++) {
    for (var x = 0; x < cols; x++) {
      var index = y * cols + x
      if (world.data[index]) {
        image.data[index * 4]     = 0
        image.data[index * 4 + 1] = 255
        image.data[index * 4 + 2] = 255
        image.data[index * 4 + 3] = 255
      }
    }
  }
  context.putImageData(image, 0, 0)
  return canvas
}
