
class ImageParser {
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
    } else {
      console.warn("Error loading file: ", file)
    }
  }

  /**
   * Create and parse image canvas data if file is valid
   */ 
  parse = async () => {
    if(this.#_isValidFile) {
      this.#_canvas = new OffscreenCanvas()
      await this.#_loadImage().then(res => {
        this.#_height = res.height
        this.#_width = res.width
      })
      this.#_imageHasLoaded = true
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
      return this.#_height
    }
  }

  /**
   * It does what you think
   * @returns {Number} n pixels
   */
  getWidth = () => {
    if(this.#_isValidFile) {
      return this.#_width
    }
  }

  /**
   * Get uploaded file name
   * @returns {String} filename
   */
  getName = () => {
    if(this.#_isValidFile) {
      return this.#_data.name
    }
  }

  /**
   * Get the url representing the image
   * @returns {DOMString} url
   */
  getUrl = () => {
    if(this.#_isValidFile) {
      return this.#_url
    }
  }

  // private members & methods

  #_loadImage = () => new Promise (res => {
    const img = new Image()
    img.src = this.#_url
    img.onload = () => res(img)
  })
  
  #_validateImage = file => /^image\/(png|jpe?g|gif)$/.test(file.type)

  #_imageHasLoaded
  #_isValidFile
  #_data
  #_url
  #_height
  #_width
  #_canvas
}

export default ImageParser