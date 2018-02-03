const update = require("../lib/update")
const render = require("./render")

let distribution = 0.25
let population = { then: 0, now: 0, streak: 0 }
let world = {
  time: 0,
  rule: { birth: [ 3 ], survival: [ 2, 3 ] },
  size: [ 256, 256 ],
  data: null
}

reset(world)
let canvas = render(world)
document.body.appendChild(canvas)

requestAnimationFrame(loop)

function reset(world) {
  world.time = 0
  world.data = new Uint8ClampedArray(world.size[0] * world.size[1])
    .fill()
    .map(_ => Math.random() < distribution)
}

function loop() {
  update(world)
  population.now = 0
  for (let i = world.data.length; i--;) population.now += world.data[i]
  if (population.now === population.then) {
    population.streak++
    if (population.streak >= 120) {
      reset(world)
    }
  } else {
    population.streak = 0
  }
  population.then = population.now
  render(world, canvas)
  requestAnimationFrame(loop)
}
