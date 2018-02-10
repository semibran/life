module.exports = function update(input, output) {
  if (!output) output = []
  output.length = 0
  if (!input.length) return output
  var stack = input.slice()
  for (var i = 0; i < stack.length; i += 2) {
    var x = stack[i]
    var y = stack[i + 1]
    var n = 0
    for (var dy = -1; dy <= 1; dy++) {
      var ny = y + dy
      for (var dx = -1; dx <= 1; dx++) {
        if (!dx && !dy) continue
        var nx = x + dx
        for (var j = 0; j < stack.length; j += 2) {
          if (stack[j] === nx && stack[j + 1] === ny) {
            break
          }
        }
        if (j < stack.length) {
          if (j < input.length) {
            n++
          }
        } else if (i < input.length) {
          stack.push(nx, ny)
        }
      }
    }
    if (n === 3 || n === 2 && i < input.length) {
      output.push(x, y)
    }
  }
  return output
}
