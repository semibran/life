import { Game, World } from './utils/index'

var game = Game.create(128, '#app')

function animate() {
  if (!mouse.left && !mouse.right)
    game.tick()
  window.requestAnimationFrame(animate)
}

var mouse = { left: false, right: false, cell: [] }

var parent = game.display.parent
var parentRect = parent.getBoundingClientRect()

parent.addEventListener('contextmenu', onContextMenu)
parent.addEventListener('mousemove',   onMouseMove)
parent.addEventListener('mousedown',   onMouseClick)
window.addEventListener('mouseup',     onMouseClick)

function onMouseMove(event) {
  var { offsetX: x, offsetY: y } = event
  var cell = mouse.cell = [ Math.round(x / parentRect.width  * game.size), Math.round(y / parentRect.height * game.size) ]
  var [cellX, cellY] = cell
  var value = null
  if (mouse.left)
    value = Game.LIVE
  else if (mouse.right)
    value = Game.DEAD
  if (mouse.left || mouse.right) {
    var index = World.posToIndex(cell, game.size)
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

animate()
