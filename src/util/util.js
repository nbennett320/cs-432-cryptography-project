// util functions

export const range = (start, end) => {
  const length = end - start
  return Array.from({ length }, (_, i) => start + i)
}

// /**
//  * 
//  * @param {String} fileUrl 
//  * @returns 
//  */
// export const readFileAsString = async file => {
//   const fileUrl = `file://${file.default}`
//   console.log(fileUrl)
//   return new Promise(res => {
//     const fileReq = new XMLHttpRequest()
//     console.log("yobe")
//     fileReq.open('GET', `file://${fileUrl}`, true)
//     fileReq.onreadystatechange = () => {
//     console.log("yobe1.5")

//       if(fileReq.readyState === 4) {
//     console.log("yobe2")

//         if(fileReq.status === 200) {
//     console.log("yobe4")

//           const text = fileReq.responseText
//           // const reader = new FileReader()
//           // reader.onload = (e) => {
//           //   console.log(e)
//           // } 
//           // const text = reader.readAsText()
//           console.log("text is:",text)
//           res(text)
//         }
//       }
//     }
//   })
  
  
// }
