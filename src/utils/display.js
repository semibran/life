function create(width, height) {

  var _width  = width
  var _height = height
  if (!height)
    if ( Array.isArray(width) )
      [_width, _height] = width
    else if ( !isNaN(width) )
      _height = width

  var _aspect = _width / _height
  var _canvas = document.createElement('canvas')
  var _canvasWidth  = _canvas.width  = _width
  var _canvasHeight = _canvas.height = _height
  var _context = _canvas.getContext('2d')
  var _parent  = null
  var _buffer  = null

  function mount(parent) {
    if (typeof parent === 'string')
      parent = document.querySelector(parent)
    if (!parent)
      throw new TypeError(`Cannot mount display onto parent element '${parent}'`)
    parent.appendChild(_canvas)
    _parent = display.parent = parent
    render()
    return display
  }

  function clear() {
    _context.fillStyle = 'black'
    _context.fillRect(0, 0, _canvasWidth, _canvasHeight)
  }

  function render(buffer) {
    if (!_buffer)
      clear()
    buffer = buffer || _buffer
    if (!buffer)
      return display

    var imageData = _context.createImageData(_width, _height)
    var data = imageData.data
    var index = buffer.length
    while (index--) {
      var i = index * 4
      var x = index % _width
      var y = (index - x) / _width
      var status = buffer[index]
      var value = status ? 255 : 0
      data[i]     = value
      data[i + 1] = value
      data[i + 2] = value
      data[i + 3] = 255
    }

    _context.putImageData(imageData, 0, 0)

    _buffer = buffer
    return display
  }

  var display = { width: _width, height: _height, aspect: _aspect, context: _context, parent: _parent, mount, clear, render }
  return display

}

export default { create }
