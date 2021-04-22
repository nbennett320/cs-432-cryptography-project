import { 
  binaryToAsciiChar,
  isAscii
} from './util'

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
      let charBin = ""
      let message = ""
      for(let i = 0, j = 0; i < colorData.length; i += 4, j++) {
        let data = [
          colorData[i], 
          colorData[i + 1], 
          colorData[i + 2], 
        ]
        if((i > 0) && (cursor % 8 === 0)) {
          const ch = binaryToAsciiChar(charBin)
          if(isAscii(ch)) {
            message += ch
            charBin = ""
            console.log("message", message)
          } else {
            console.warn("Non-Ascii char found: ", ch)
            break
          }
        } else {
          charBin += data[2] % 2
        }
        cursor += 1
      }
      console.log("Done")
      return res(message)
    })
  }

  // private
  
  #_isValidLength = () => {}

  #_imageParser

}

export default SteganographyDecoder
