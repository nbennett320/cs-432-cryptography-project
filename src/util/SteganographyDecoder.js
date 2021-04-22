import { stringToBinary } from './util'

/**
 * 
 */
class SteganographyDecoder {
  /**
   * Initialize new encoder with prepared image parser 
   * and a message to encode
   * @param {ImageParser} image 
   */
  constructor(image) {
    this.#_imageParser = image
  } 

  /**
   * Encode the message
   */
  decode = async () => {
    return new Promise(res => {
      const imageData = this.#_imageParser.getPixelBuffer()
      const colorData = imageData.data
  
      let cursor = 0
      for(let i = 0, j = 0; i < colorData.length; i += 4, j++) {
        let data = [
          colorData[i], 
          colorData[i + 1], 
          colorData[i + 2], 
        ]
  
        // if(data[3] % 2 === 0) {
        //   if(parseInt(messageBin[cursor]) === 1) {
        //     data[3] += 1
        //   }
        // } else {
        //   if(parseInt(messageBin[cursor]) === 0) {
        //     data[3] -= 1
        //   }
        // }
  
        cursor += 1
        // if(cursor >= messageBin.length) break
      }
      this.#_imageParser.setPixelBuffer(imageData).then(url => {
        res(url)
      })
    })
  }

  // private
  
  #_isValidLength = () => {}

  #_imageParser

}

export default SteganographyDecoder
