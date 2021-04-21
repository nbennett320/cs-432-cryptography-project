import { 
  range, 
  readFileAsString 
} from './util'
import languageServer from 'pyodide'
import { code } from './python/lsb_encode.py'

// const code = "print('hello world')"

const readCode = async () => {

  
}

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
    // readCode()
    this.#_imageParser = image
    this.#_message = message
  } 

  /**
   * Encode the message
   */
  encode = async () => {
    const [height, width] = this.#_imageParser.getResolution()
    const src = this.#_imageParser.getUrl()
    const dest = "./out.png"
    const caller = `
      async def main():
        import micropip
        await  micropip.install('https://download.lfd.uci.edu/pythonlibs/w4tscw6k/PIL-2.0+dummy-py2.py3-none-any.whl').then(encode_image('${src}', '${this.#_message}', '${dest}'))
      
      print("runnin")
      await main()
    `
    const callable = code + caller
    console.log(callable)
    const { pyodide } = window
    try {
      languageServer.then(() => {
        return pyodide.loadPackage(['micropip'])
      }).then(() => {
        pyodide.runPythonAsync(caller)
          .then(out => console.log("Output:", out))
          .catch(err => console.error("Error trace:",err))
      })
    } catch (e) {
      console.error(`Error in python code at ${e.filename}, Line: ${e.lineno}, ${e.message}`)
    }
  }

  // private

  
  #_isValidLength = () => {}

  #_imageParser

  #_message
}

export default SteganographyEncoder
