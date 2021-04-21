import { range } from './util'
import languageServer from 'pyodide'

const code = "print('hello world')"

languageServer.then(() => {
  const { pyodide } = window
  pyodide.runPythonAsync(code)
    .then(out => console.log(out))
    .catch(err => console.warn(err))
})

/**
 * 
 */
class SteganographyEncoder {
  /**
   * Initialize new encoder with prepared image parser 
   * and a message to encode
   * @param {ImageParser} image 
   * @param {String} message 
   */
  constructor(image, message) {
    this.#_imageParser = image
    this.#_message = message
  } 

  /**
   * Encode the message
   */
  encode = () => {
    const [height, width] = this.#_imageParser.getResolution()
    for(let i in range(0, height)) {
      for(let j in range(0, width)) {
        const pixel = this.#_imageParser.getPixel(i, j)
      }
      console.log("i: ", i)
    }
  }

  // private

  
  #_isValidLength = () => {}

  #_imageParser

  #_message
}

export default SteganographyEncoder
