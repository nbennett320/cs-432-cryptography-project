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
  constructor(image, message, channel) {
    this.#_imageParser = image
    this.#_message = message
    if(channel) {
      this.#_channel = channel
    } else {
      channel = 'red'
    }
    this.#_channelIndex = this.#_mapChannelToIndex()
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
        if(colorData[i + this.#_channelIndex] % 2 === 0) {
          if(parseInt(messageBin[cursor]) === 1) {
            colorData[i + this.#_channelIndex] += 1
          }
        } else {
          if(parseInt(messageBin[cursor]) === 0) {
            colorData[i + this.#_channelIndex] -= 1
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
  
  #_isValidLength = () => {}

  #_imageParser

  #_message

  #_channel
  
  #_channelIndex

}

export default SteganographyEncoder
