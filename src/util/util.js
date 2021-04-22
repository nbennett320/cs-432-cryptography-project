// util functions

export const range = (start, end) => {
  const length = end - start
  return Array.from({ length }, (_, i) => start + i)
}

export const stringToBinary = str => {
  return Array
    .from(str)
    .reduce((acc, char) => acc.concat(char.charCodeAt().toString(2)), [])
    .map(bin => '0'.repeat(8 - bin.length) + bin )
    .join('')
}

export const binaryToAsciiChar = bin => {
  const ch = String.fromCharCode(parseInt(bin, 2))
  console.log("ch",ch)
  return ch
}

export const isAscii = str => {
  return /^[\x00-\x7F]*$/.test(str)
}