
class ImageParser {
  constructor(file) {
    this.#_imageHasLoaded = false
    if(file) {
      if(this.#_validateImage(file)) {
        this.#_isValidImage = true
        this.#_data = file
        this.#_url = URL.createObjectURL(file)
      } else {
        this.#_isValidImage = false
      }
    }
  }

  parse = async () => {
    if(this.#_isValidImage) {
      this.#_canvas = new OffscreenCanvas()
      await this.#_loadImage().then(res => {
        this.#_height = res.height
        this.#_width = res.width
      })

    } else {
      console.error("Invalid file type: ", this.#_data.type)
    }
  }

  getHeight = () => {
    if(this.#_isValidImage) {
      return this.#_height
    }
  }

  getWidth = () => {
    if(this.#_isValidImage) {
      return this.#_width
    }
  }

  getName = () => {
    if(this.#_isValidImage) {
      return this.#_data.name
    }
  }

  getUrl = () => {
    if(this.#_isValidImage) {
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
  #_isValidImage
  #_data
  #_url
  #_height
  #_width
  #_canvas
}

export default ImageParser