import Pixel from './Pixel'
import { stringToBinary } from './util'

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
  encode = async () => {
    const [height, width] = this.#_imageParser.getResolution()
    const imageData = this.#_imageParser.getPixelArray()
    const colorData = imageData.data
    // console.log("pixels:",pixels)
    
    let pixels = []

    const messageBin = stringToBinary(this.#_message)
    console.log("messageBin:",messageBin)

    let cursor = 0
    for(let i = 0, j = 0; i < colorData.length; i += 4, j++) {
      let data = [
        colorData[i], 
        colorData[i + 1], 
        colorData[i + 2], 
        // colorData[1 + 3]
      ]

      if(data[3] % 2 === 0) {
        if(parseInt(messageBin[cursor]) === 1) {
          data[3] += 1
        }
      } else {
        if(parseInt(messageBin[cursor]) === 0) {
          data[3] -= 1
        }
      }

      console.log('set char: ', messageBin[cursor])
      cursor += 1
      if(i % 10000 === 0) console.log(pixels)
      if(cursor >= messageBin.length) {
        console.log("breaking")
        break
      }
    }
    this.#_imageParser.setPixelArray(imageData)
    console.log("Done")
  }

  // private

  
  #_isValidLength = () => {}

  #_imageParser

  #_message
}

export default SteganographyEncoder
