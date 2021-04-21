import languageServer from 'pyodide'
import { code } from './python/lsb_encode.py'

// const code = "print('hello world')"

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
    // const [height, width] = this.#_imageParser.getResolution()
    const src = this.#_imageParser.getUrl()
    const dest = "./out.png"
    const caller = `

      async def encode_image(src, message, dest):
        import numpy as np 
        from PIL import Image
        print("ima run")
        """Encodes an image with a message."""

        img = Image.open(src, 'r')
        pixel_array = np.asarray(img).copy()
        
        #calculate number of pixels in image
        if img.mode == 'RGB':
          num_pixels = pixel_array.size // 3
        elif img.mode == 'RGBA':
          num_pixels =  pixel_array.size // 4

        #add delimter to message to endicate end of message
        message += '#yeet#'

        #convert message to binary
        message = ''.join(format(ord(char), '08b') for char in message)


        #are there enough pixels in the img to accomodate the message
        if len(message) > num_pixels:
          print("Image to small or message too large. Try again.")
          return 0

        counter = 0
        for row in range(len(pixel_array)):
          for pixel in range(len(pixel_array[row])):
            for channel in range(len(pixel_array[row][pixel])):
              if counter < len(message):
                pixel_array[row][pixel][channel] = int(bin(pixel_array[row][pixel][channel])[2:9] + message[counter], 2)
                counter += 1

        new_img = Image.fromarray(pixel_array, img.mode)
        print()
        new_img.save(dest)
        print("new image constructed")
        return new_img

      print("runnin")
      import micropip
      micropip.install('https://download.lfd.uci.edu/pythonlibs/w4tscw6k/PIL-2.0+dummy-py2.py3-none-any.whl').then(encode_image('${src}', '${this.#_message}', '${dest}'))
      # micropip.install('Pillow').then(encode_image('${src}', '${this.#_message}', '${dest}'))
    `
    const callable = code + caller
    console.log(callable)
    const { pyodide } = window
    try {
      languageServer.then(() => {
        return pyodide.loadPackage(['micropip'])
      }).then(() => {
        pyodide.runPythonAsync(caller)
          .then(out => {
            console.log("gonna call the second",out)
            // pyodide.runPythonAsync(`encode_image('${src}', '${this.#_message}', '${dest}')`)
            
          })
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
