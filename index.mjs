import { homeStage } from './src/index.mjs'

/**
 * Loopea el programa hasta que el usuario lo decida
 */
const main = async () => {
  let running = true
  do {
    running = await homeStage()
  } while (running === true)
}

main()
