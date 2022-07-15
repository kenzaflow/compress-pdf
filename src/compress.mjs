import { exec } from 'child_process'
import { resolve } from 'path'

/**
 *
 * @param {string[]} files
 * @param {string} quality
 */
export default function compress (files, quality) {
  // 'default' | 'screen' | 'ebook' | 'prepress' | 'printer'

  files.forEach(file => {
    const inputFile = resolve(`input/${file}`)
    const outputFile = resolve(`output/${file}`)

    exec(`gs -sDEVICE=pdfwrite -dCompatibilityLevel=1.4 -dPDFSETTINGS=/${quality} -dNOPAUSE -dQUIET -dBATCH -sOutputFile='${outputFile}' '${inputFile}'`, (error, stdout, stderr) => {
      if (error) {
        console.error(`exec error: ${error}`)
        return
      }
      if (stderr) {
        console.error(`stderr: ${stderr}`)
      }
    })
  })
}
