const update = require("../lib/update")
const render = require("./render")

let state = {
  cache: new Array(16),
  world: {
    time: 0,
    rule: parse("B3/S23"),
    size: [ 256, 256 ],
    data: new Uint8ClampedArray(256 * 256)
  }
}

reset(state.world)
let canvas = render(state)
document.body.appendChild(canvas)

requestAnimationFrame(loop)

function parse(rule) {
  return {
    birth: rule.slice(1, rule.indexOf("/")).split("").map(Number),
    survival: rule.slice(rule.indexOf("S") + 1).split("").map(Number)
  }
}

function reset(world) {
  world.time = 0
  world.data = world.data
    .fill()
    .map((_, index) => {
      let x = index % world.size[0]
      let y = (index - x) / world.size[0]
      let dx = world.size[0] / 2 - x
      let dy = world.size[1] / 2 - y
      let d = Math.sqrt(dx * dx + dy * dy)
      let r = world.size[0] / 3
      return Math.random() > d / r && Math.random() < 0.5
    })
}

function loop() {
  let { cache, world } = state
  if (cache.length) {
    for (let i = cache.length - 1; i--;) cache[i + 1] = cache[i]
    let indices = cache[0] = []
    for (let i = 0; i < world.data.length; i++) {
      if (world.data[i]) {
        indices.push(i)
      }
    }
  }
  update(world)
  render(state, canvas)
  requestAnimationFrame(loop)
}
