const render = require("./render")
const update = require("./update")
const keys = require("key-state")(window)

let state = {
  world: [
    [ -1, 1 ],
    [ 1, 0 ],
    [ 0, 0 ],
    [ 0, 1 ],
    [ 0, 2 ]
  ],
  view: {
    scale: 2,
    size: [ window.innerWidth, window.innerHeight ],
    position: [ 0, 0 ],
    selection: null
  }
}



let canvas = render(state)
document.body.appendChild(canvas)
requestAnimationFrame(loop)

function loop() {
  if (keys.a) state.view.position[0]--
  if (keys.d) state.view.position[0]++
  if (keys.w) state.view.position[1]--
  if (keys.s) state.view.position[1]++
  update(state.world)
  render(state, canvas)
  requestAnimationFrame(loop)
}

window.addEventListener("resize", event => {
  state.view.size[0] = window.innerWidth
  state.view.size[1] = window.innerHeight
})

window.addEventListener("wheel", event => {
  if (Math.abs(event.deltaY) < 16) return
  if (event.deltaY < 0) {
    state.view.scale++
  } else {
    if (state.view.scale > 1) {
      state.view.scale--
    }
  }
})

window.addEventListener("mousemove", event => {
  
})
