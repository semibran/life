import { Game } from './utils/index'

var game = Game.create(128, '#app')

function animate() {
  game.tick()
  window.requestAnimationFrame(animate)
}
animate()
