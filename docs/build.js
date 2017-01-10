(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (factory());
}(this, (function () { 'use strict';

var slicedToArray = function () {
  function sliceIterator(arr, i) {
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;

    try {
      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"]) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  return function (arr, i) {
    if (Array.isArray(arr)) {
      return arr;
    } else if (Symbol.iterator in Object(arr)) {
      return sliceIterator(arr, i);
    } else {
      throw new TypeError("Invalid attempt to destructure non-iterable instance");
    }
  };
}();

var World = { generate: generate, indexToPos: indexToPos, posToIndex: posToIndex, getNeighbors: getNeighbors, getAt: getAt, setAt: setAt, contains: contains };

var UP_LEFT = [-1, -1];
var UP = [0, -1];
var UP_RIGHT = [1, -1];
var LEFT = [-1, 0];
var RIGHT = [1, 0];
var DOWN_LEFT = [-1, 1];
var DOWN = [0, 1];
var DOWN_RIGHT = [1, 1];
var directions = [UP_LEFT, UP, UP_RIGHT, LEFT, RIGHT, DOWN_LEFT, DOWN, DOWN_RIGHT];

function generate(size) {

  var area = size * size;
  var data = new Uint8ClampedArray(area);
  var i = area;
  while (i--) {
    data[i] = Math.random() > 0.75;
  }return data;
}

function indexToPos(index, size) {
  var x = index % size;
  var y = (index - x) / size;
  return [x, y];
}

function posToIndex(pos, size) {
  var _pos = slicedToArray(pos, 2),
      x = _pos[0],
      y = _pos[1];

  return y * size + x;
}

function getNeighbors(pos, size) {
  if (!size) return [];
  var neighbors = [];

  var _pos2 = slicedToArray(pos, 2),
      x = _pos2[0],
      y = _pos2[1];

  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = directions[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var direction = _step.value;

      var _direction = slicedToArray(direction, 2),
          dx = _direction[0],
          dy = _direction[1];

      var cx = x + dx;
      var cy = y + dy;
      if (cx < 0) cx += size;
      if (cx >= size) cx -= size;
      if (cy < 0) cy += size;
      if (cy >= size) cy -= size;
      var current = [cx, cy];
      neighbors.push(current);
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  return neighbors;
}

function getAt(data, pos, size) {
  if (!size) size = Math.sqrt(data.length);
  if (!contains(pos, size)) return null;
  var index = posToIndex(pos, size);
  return data[index];
}

function setAt(data, pos, id, size) {
  if (!size) size = Math.sqrt(data.length);
  if (!contains(pos, size)) return null;
  var index = posToIndex(pos, size);
  data[index] = id;
  return id;
}

function contains(pos, size) {
  var _pos3 = slicedToArray(pos, 2),
      x = _pos3[0],
      y = _pos3[1];

  return x >= 0 && y >= 0 && x < size && y < size;
}

function create(width, height) {

  var _width = width;
  var _height = height;
  if (!height) if (Array.isArray(width)) {
    

    var _width2 = slicedToArray(width, 2);

    _width = _width2[0];
    _height = _width2[1];
  } else if (!isNaN(width)) _height = width;

  var _aspect = _width / _height;
  var _canvas = document.createElement('canvas');
  var _canvasWidth = _canvas.width = _width;
  var _canvasHeight = _canvas.height = _height;
  var _context = _canvas.getContext('2d');
  var _parent = null;
  var _buffer = null;

  function mount(parent) {
    if (typeof parent === 'string') parent = document.querySelector(parent);
    if (!parent) throw new TypeError('Cannot mount display onto parent element \'' + parent + '\'');
    parent.appendChild(_canvas);
    _parent = parent;
    render();
    return display;
  }

  function clear() {
    _context.fillStyle = 'black';
    _context.fillRect(0, 0, _canvasWidth, _canvasHeight);
  }

  function render(buffer) {
    if (!_buffer) clear();
    buffer = buffer || _buffer;
    if (!buffer) return display;

    // var i = buffer.length
    // while (i--) {
    //   var x = i % _width
    //   var y = (i - x) / _width
    //   var id = buffer[i]
    //   if ( !_buffer || id !== _buffer[i] ) {
    //     _context.fillStyle = id ? 'white' : 'black'
    //     _context.fillRect(x, y, 1, 1)
    //   }
    // }

    var imageData = _context.createImageData(_width, _height);
    var data = imageData.data;
    var index = buffer.length;
    while (index--) {
      var i = index * 4;
      var x = index % _width;
      var y = (index - x) / _width;
      var status = buffer[index];
      var cached = null;
      if (_buffer) cached = _buffer[index];
      var value = status ? 255 : 0;
      // if (cached && status !== cached || !cached) {
      data[i] = value;
      data[i + 1] = value;
      data[i + 2] = value;
      data[i + 3] = 255;
      // }
    }

    _context.putImageData(imageData, 0, 0);

    _buffer = buffer;
    return display;
  }

  var display = { width: _width, height: _height, aspect: _aspect, context: _context, mount: mount, clear: clear, render: render };
  return display;
}

var Display = { create: create };

var Game$$1 = { create: create$1 };

function create$1(size, element) {

  var DEAD = 0;
  var LIVE = 1;

  var world = World.generate(size);
  var display = Display.create(size).mount('#app').render(world);

  function update(world, size) {
    var result = [];
    var i = world.length;
    while (i--) {
      var id = world[i];
      var pos = World.indexToPos(i, size);
      var neighbors = World.getNeighbors(pos, size);
      var live = 0;
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = neighbors[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var neighbor = _step.value;

          if (World.getAt(world, neighbor, size) === LIVE) live++;
        } // Could abbreviate this using ternaries or raw booleans over here but it's better to keep it legible
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      if (id === LIVE) {
        if (live === 2 || live === 3) id = LIVE;else id = DEAD;
      } else if (id === DEAD) if (live === 3) id = LIVE;else id = DEAD;
      result[i] = id;
    }
    return result;
  }

  function tick() {
    world = update(world, size);
    display.render(world);
  }

  return { update: update, tick: tick };
}

var game = Game$$1.create(128, '#app');

function animate() {
  game.tick();
  window.requestAnimationFrame(animate);
}
animate();

})));
//# sourceMappingURL=build.js.map
