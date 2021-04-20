/**
 * Define a pixel class with rgba values and hex value
 */
class Pixel {
  /**
   * Set rgba and hex values
   * @param {Object} data object containing rgba values
   */
  constructor(data) {
    console.log("constructing pixel: ", data)
    this.rgba.r = data[0]
    this.rgba.g = data[1]
    this.rgba.b = data[2]
    this.rgba.a = data[3] / 255
    const hexR = this.#_dec2HexCSubstr(data[0])
    const hexG = this.#_dec2HexCSubstr(data[0])
    const hexB = this.#_dec2HexCSubstr(data[0])
    this.hex = '#' + hexR + hexG + hexB
  }

  rgba = { 
    r: undefined, 
    g: undefined, 
    b: undefined, 
    a: undefined 
  }

  hex = ""

  // private

  /**
   * Convert decimal integers to a 2-character string, which 
   * is a substring of the color hex value
   * @param {Number} dec base 10 number
   * @returns {String} string of hex number
   */
  #_dec2HexCSubstr = dec => {
    const hexStr = dec.toString(16)
    if(hexStr.length > 1) {
      return hexStr
    } else {
      return `0${hexStr}`
    }
  }
}

export default Pixel