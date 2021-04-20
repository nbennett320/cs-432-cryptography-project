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
    this.hex = `#${data[0].toString(16)}${data[1].toString(16)}${data[2].toString(16)}`
  }

  rgba = { 
    r: undefined, 
    g: undefined, 
    b: undefined, 
    a: undefined 
  }

  hex = ""
}

export default Pixel