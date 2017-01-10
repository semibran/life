import { Game, World } from './utils/index'

const WORLD_SIZE = 128

var game = Game.create(WORLD_SIZE, '#app')
var paused = false

function animate() {

  if (keys.tapped.KeyR && !keys.pressed.ControlLeft) {
    if (!keys.pressed.ShiftLeft)
      game.world = World.generate(WORLD_SIZE)
    else
      game.world = new Uint8ClampedArray(WORLD_SIZE * WORLD_SIZE)
    game.display.render(game.world)
  }

  if (!keys.pressed.KeyP) {
    if (keys.tapped.Space)
      paused = true, document.body.classList.add('hide-cursor')
    else if (keys.released.Space)
      paused = false, document.body.classList.remove('hide-cursor')
  } else if (keys.tapped.KeyP)
    paused = !paused
    
  if (!paused && !mouse.left && !mouse.right)
    game.tick()

  updateKeys()

  window.requestAnimationFrame(animate)

}

var mouse = { left: false, right: false, cell: [] }
var keys  = { pressed: {}, tapped: {}, released: {} }

var parent = game.display.parent
var parentRect = parent.getBoundingClientRect()

parent.addEventListener('contextmenu', onContextMenu)
parent.addEventListener('mousemove',   onMouseMove)
parent.addEventListener('mousedown',   onMouseClick)
window.addEventListener('mouseup',     onMouseClick)
window.addEventListener('keydown',     onKeyDown)
window.addEventListener('keyup',       onKeyUp)

function onMouseMove(event) {
  var { offsetX: x, offsetY: y } = event
  var cell = mouse.cell = [ Math.round(x / parentRect.width  * WORLD_SIZE), Math.round(y / parentRect.height * WORLD_SIZE) ]
  var [cellX, cellY] = cell
  var value = null
  if (mouse.left)
    value = Game.LIVE
  else if (mouse.right)
    value = Game.DEAD
  if (mouse.left || mouse.right) {
    var index = World.posToIndex(cell, WORLD_SIZE)
    game.world[index] = value
    game.display.render(game.world)
  }
}

function onMouseClick(event) {
  var isMouseDown = event.type === 'mousedown'
  var button = event.button
  if (button === 0)
    mouse.left  = isMouseDown
  if (button === 2)
    mouse.right = isMouseDown
  if (isMouseDown) {
    parentRect = parent.getBoundingClientRect()
    onMouseMove(event)
  }
}

function onContextMenu(event) {
  event.preventDefault()
}

function onKeyDown(event) {
  var code = event.code
  if (!keys.pressed[code])
    keys.tapped[code] = true
  keys.pressed[code] = true
}

function onKeyUp(event) {
  var code = event.code
  if (keys.pressed[code])
    keys.released[code] = true
  keys.pressed[code] = false
}

function updateKeys() {
  for (var key in keys.tapped)
    keys.tapped[key] = false
  for (var key in keys.released)
    keys.released[key] = false
}

animate()
