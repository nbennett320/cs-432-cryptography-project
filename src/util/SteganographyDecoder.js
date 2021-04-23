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
  constructor(image, channel) {
    this.#_imageParser = image
    if(channel) {
      this.#_channel = channel
    } else {
      channel = 'red'
    }
    this.#_channelIndex = this.#_mapChannelToIndex()
  } 

  /**
   * Decode the message
   * @returns {Promise} message
   */
  decode = async () => {
    return new Promise(res => {
      const imageData = this.#_imageParser.getPixelBuffer()
      const colorData = imageData.data
      console.log("channel, index: ", this.#_channel, this.#_channelIndex)
      
      let cursor = 0
      let charBin = ""
      let message = ""
      for(let i = 0, j = 0; i < colorData.length; i += 4, j++) {
        if((i > 0) && (cursor % 8 === 0)) {
          const ch = binaryToAsciiChar(charBin)
          if(isAscii(ch)) {
            message += ch
            charBin = ""
          } else {
            console.warn(`Non-Ascii char found: 0b${charBin}`)
            break
          }
        } else {
          charBin += colorData[i + this.#_channelIndex] % 2
        }
        cursor += 1
      }
      return res(message.trim())
    })
  }

  
  /**
   * set color channel to encode into
   * @param {String} val color 
   */
  setColorChannel = val => {
    this.#_channel = val
    this.#_channelIndex = this.#_mapChannelToIndex()
  }
  
  /**
   * get color channel being encoded into
   * @returns {String} color channel
   */
  getColorChannel = () => {
    return this.#_channel
  }
  
  // private

  /**
   * Get index of rgba color channel
   * @returns {Number} index of rgba color channel
   */
  #_mapChannelToIndex = () => {
    switch(this.#_channel) {
      case 'red': return 0
      case 'green': return 1
      case 'blue': return 2
      case 'alpha': return 3
      default: return 2
    }
  }
  
  #_imageParser

  #_channel
  
  #_channelIndex

}

export default SteganographyDecoder