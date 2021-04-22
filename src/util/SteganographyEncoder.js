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
    return new Promise(res => {
      const imageData = this.#_imageParser.getPixelBuffer()
      const colorData = imageData.data
      const messageBin = stringToBinary(this.#_message)
  
      let cursor = 0
      for(let i = 0, j = 0; i < colorData.length; i += 4, j++) {
        if(colorData[i + 2] % 2 === 0) {
          if(parseInt(messageBin[cursor]) === 1) {
            colorData[i + 2] += 1
          }
        } else {
          if(parseInt(messageBin[cursor]) === 0) {
            colorData[i + 2] -= 1
          }
        }
        cursor += 1
        if(cursor >= messageBin.length) break
      }
      this.#_imageParser.setPixelBuffer(imageData).then(url => {
        res(url)
      })
    })
  }

  // private

  
  #_isValidLength = () => {}

  #_imageParser

  #_message
}

export default SteganographyEncoder
