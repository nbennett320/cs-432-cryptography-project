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
    const imageData = this.#_imageParser.getPixelBuffer()
    const colorData = imageData.data
    const messageBin = stringToBinary(this.#_message)

    let cursor = 0
    for(let i = 0, j = 0; i < colorData.length; i += 4, j++) {
      let data = [
        colorData[i], 
        colorData[i + 1], 
        colorData[i + 2], 
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

      cursor += 1
      if(cursor >= messageBin.length) break
    }
    this.#_imageParser.setPixelBuffer(imageData)
  }

  // private

  
  #_isValidLength = () => {}

  #_imageParser

  #_message
}

export default SteganographyEncoder
