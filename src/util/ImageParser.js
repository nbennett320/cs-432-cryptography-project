import Pixel from './Pixel'

/**
 * @class
 * Used for parsing images, especially getting and
 * manipulating pixel data
 */
class ImageParser {
  /**
   * Load a file (but don't parse yet)
   * @param {Object} file File to load
   */
  constructor(file) {
    this.#_imageHasLoaded = false
    if(file) {
      if(this.#_validateImage(file)) {
        this.#_isValidFile = true
        this.#_data = file
        this.#_url = URL.createObjectURL(file)
      } else {
        this.#_isValidFile = false
      }
    }
  }

  /**
   * Load a file (for cases where caller didn't construct
   * with a file... wish I could just use a separate constructor
   * like in C++...)
   */
  loadFile = file => {
    if(this.#_validateImage(file)) {
      this.#_isValidFile = true
      this.#_data = file
      this.#_url = URL.createObjectURL(file)
      console.log("loaded")
    } else {
      console.warn("Error loading file: ", file)
    }
  }

  /**
   * Create and parse image canvas data if file is valid
   */ 
  parse = async () => {
    if(this.#_imageHasLoaded) {
      // image was already parsed
      console.log("Image was already parsed: ", this)
    } else if(this.#_isValidFile) {
      await this.#_loadImage().then(res => {
        this.#_img = res
        this.#_height = res.height
        this.#_width = res.width
        this.#_canvas = new OffscreenCanvas(res.width, res.height)
        this.#_ctx = this.#_canvas.getContext('2d')
        this.#_ctx.drawImage(this.#_img, 0, 0)
        this.#_imageHasLoaded = true
      })
    } else {
      console.error("Invalid file type: ", this.#_data.type)
    }
  }

  /**
   * It does what you think
   * @returns {Number} n pixels
   */
  getHeight = () => {
    if(this.#_isValidFile) {
      console.log(this.#_height)
      return this.#_height
    }
  }

  /**
   * It does what you think
   * @returns {Number} n pixels
   */
  getWidth = () => {
    if(this.#_isValidFile) {
      console.log(this.#_width)
      return this.#_width
    }
  }

  /**
   * Get the name of the uploaded file
   * @returns {String} filename
   */
  getName = () => {
    if(this.#_isValidFile) {
      return this.#_data.name
    }
  }

  /**
   * Get the url representing the image
   * @returns {String} url
   */
  getUrl = () => {
    if(this.#_isValidFile) {
      return this.#_url
    }
  }

  /**
   * Get the file extension of the image
   * @returns {String} file extension
   */
  getFileType = () => {
    if(this.#_isValidFile) {
      const matches = /^image\/(png|jpe?g|gif)$/.exec(this.#_data.type)
      const ext = matches[1]
      return ext
    }
  }

  /**
   * Get human-readable file sizeq
   * @returns {String} file size
   */
  getFileSize = () => {
    if(this.#_isValidFile) {
      const bytes = this.#_data.size
      const kb = bytes / 1000
      const mb = bytes / 1000000
      if(mb > 1) {
        return `${mb} Mb`
      } else if(kb > 1) {
        return `${kb} Kb`
      } else {
        return `${bytes} B`
      }
    }
  }

  /**
   * Get the pixel at the position (x, y)
   * @param {Number} x x coord starting from top left of the image
   * @param {Number} y y coord starting from top left of the image
   * @returns {Pixel} returns Pixel class at x y position
   */
  getPixel = (x, y) => {
    if(this.#_isValidFile && this.#_imageHasLoaded) {
      if(this.#_isValidRange(x,y)) {
        const { data } = this.#_ctx.getImageData(x, y, 1, 1)
        return new Pixel(data)
      } else {
        console.error(`Not a valid pixel; (${x}, ${y}) is not in range of (${this.#_width}, ${this.#_height})`)
      }
    } else if(!this.#_imageHasLoaded) {

    } else {

    }
  }

  /**
   * Returns offscreen canvas object
   * @returns {HTMLCanvasElement} canvas object
   */
  _getCanvas = () => this.#_canvas

  /**
   * Get canvas context
   * @returns {CanvasRenderingContext2D} canvas context object
   */
  _getCanvasContext = () => this.#_ctx

  /**
   * Return if image has loaded
   * @returns {Boolean} True if loaded
   */
  isLoaded = () => this.#_imageHasLoaded

  // private members & methods

  /**
   * Load the image
   * @returns {Promise} promise that resolves after the image loads
   */
  #_loadImage = () => new Promise (res => {
    const img = new Image()
    img.src = this.#_url
    img.onload = () => res(img)
  })
  
  /**
   * Check if image is a valid file type
   * @param {Object} file file object from uploading
   * @returns {Boolean} is valid if true
   */
  #_validateImage = file => /^image\/(png|jpe?g|gif)$/.test(file.type)

  /**
   * Check if pixel is within canvas boundaries
   * @param {Number} x x position
   * @param {Number} y y position
   * @returns {Boolean} is in range if true
   */
  #_isValidRange = (x, y) => (0 <= y <= this.#_height) && (0 <= x <= this.#_width)

  #_imageHasLoaded
  #_isValidFile
  #_data
  #_url
  #_img
  #_height
  #_width
  #_canvas
  #_ctx
}

export default ImageParser
