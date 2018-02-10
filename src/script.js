const pattern = require("./pattern.json")
const render = require("./render")
const update = require("./update")
const size = 256

let state = {
  time: 0,
  prev: [],
  world: pattern,
  view: {
    size: [ size, size ],
    position: [ 0, 0 ],
    cursor: null
  }
}

let actions = {
  update: state => {
    let buffer = state.prev
    state.prev = state.world
    state.world = update(state.prev, buffer)
    state.time++
  }
}

let canvas = document.createElement("canvas")
canvas.width = size
canvas.height = size

let image = canvas
  .getContext("2d")
  .createImageData(size, size)

render(state, image, canvas)
document.body.appendChild(canvas)
requestAnimationFrame(loop)

function loop() {
  actions.update(state)
  render(state, image, canvas)
  requestAnimationFrame(loop)
}
