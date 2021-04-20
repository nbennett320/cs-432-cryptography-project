/**
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
        this.#_height = res.height
        this.#_width = res.width
        this.#_canvas = new OffscreenCanvas(res.width, res.height)
        this.#_imageHasLoaded = true
        console.log("parsed: ", this)
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
   * @returns {DOMString} url
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
   * Get human-readable file size
   * @returns {String} file size
   */
  getFileSize = () => {
    if(this.#_isValidFile) {
      const matches = /^image\/(png|jpe?g|gif)$/.exec(this.#_data.type)
      const ext = matches[1]
      return ext
    }
  }

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