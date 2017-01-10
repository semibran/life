import { World, Display } from './index'

const DEAD = 0
const LIVE = 1

function create(size, element) {

  var world   = World.generate(size)
  var display = Display.create(size).mount('#app').render(world)

  function update(world, size) {
    var result = []
    var i = world.length
    while (i--) {
      var id = world[i]
      var pos = World.indexToPos(i, size)
      var neighbors = World.getNeighbors(pos, size)
      var live = 0
      for (var neighbor of neighbors)
        if (World.getAt(world, neighbor, size) === LIVE)
          live++
      // Could abbreviate this using ternaries or raw booleans over here but it's better to keep it legible
      if (id === LIVE)
        if (live === 2 || live === 3)
          id = LIVE
        else
          id = DEAD
      else if (id === DEAD)
        if (live === 3)
          id = LIVE
        else
          id = DEAD
        result[i] = id
    }
    return result
  }

  function tick() {
    game.world = update(game.world, size)
    display.render(game.world)
  }

  var game = { update, tick, size, world, display }
  return game

}

export default { create, DEAD, LIVE }
