const pattern = require("./pattern.json")
const render = require("./render")
const update = require("./update")

let canvas = document.createElement("canvas")
let context = canvas.getContext("2d")
let state = {
  time: 0,
  prev: [],
  world: pattern,
  view: {
    canvas: canvas,
    context: context,
    image: null,
    cursor: null,
    position: [ 0, 0 ],
    size: [ window.innerWidth, window.innerHeight ]
  }
}

let actions = {
  update: state => {
    let buffer = state.prev
    state.prev = state.world
    state.world = update(state.prev, buffer)
    state.time++
  },
  view: {
    mount({ view }) {
      document.body.appendChild(view.canvas)
      actions.view.resize(state, window.innerWidth, window.innerHeight)
    },
    resize({ view }, width, height) {
      view.size[0] = view.canvas.width = width
      view.size[1] = view.canvas.height = height
      view.image = view.context.createImageData(width, height)
      actions.view.render(state)
    },
    render({ view }) {
      render(state, view.image)
      view.context.putImageData(view.image, 0, 0)
      // view.context.drawImage(view.canvas, -view.size[0] / 2, -view.size[1] / 2, view.size[0] * 2, view.size[1] * 2)
    }
  }
}

actions.view.mount(state)
requestAnimationFrame(loop)

function loop() {
  actions.update(state)
  actions.view.render(state)
  requestAnimationFrame(loop)
}

window.addEventListener("resize", event => {
  actions.view.resize(state, window.innerWidth, window.innerHeight)
})

window.addEventListener("mousedown", event => {
  state.view.cursor = [ event.pageX, event.pageY ]
})

window.addEventListener("mousemove", event => {
  let view = state.view
  if (view.cursor) {
    view.position[0] -= (event.pageX - view.cursor[0]) / window.innerWidth * view.size[0]
    view.position[1] -= (event.pageY - view.cursor[1]) / window.innerHeight * view.size[1]
    view.cursor[0] = event.pageX
    view.cursor[1] = event.pageY
  }
})

window.addEventListener("mouseup", event => {
  state.view.cursor = null
})
