
import { readdir } from 'fs/promises'

import 'colors'

export const readFiles = async () => {
  return [...await readdir('./input/')].filter(file => file.endsWith('.pdf'))
}

export const getLanguage = () => {
  const systemLang = String(process.env.LANG || process.env.LANGUAGE || process.env.LC_ALL || process.env.LC_MESSAGES)
  let tempLang = 'en'
  if (systemLang.startsWith('es')) tempLang = 'es'
  return tempLang
}

/**
 * Devuelve la cadena si existe, sino, lanza un error
 * @param {string} textId
 * @param {string[]|number[]=} replace
 * @returns {string}
 */
export const getString = (textId, replace = []) => {
  //
  if (getLanguage() === 'en') {
    if (textId === 'title') return 'PDF Compressor'
    if (textId === 'home') return 'Home'
    if (textId === 'home_compress') return 'Compress'
    if (textId === 'home_exit') return 'Exit'
    if (textId === 'select_title') return 'Select files'
    if (textId === 'select_file_s') return 'File(s)'
    if (textId === 'select_manually') return 'Select manually'
    if (textId === 'select_file_all') return 'Select all files in folder ./input/'
    if (textId === 'cancel') return 'Cancel'
    if (textId === 'pause_restart') return 'Press ENTER to restart'
    if (textId === 'pause_continue') return 'Press ENTER to continue'
    if (textId === 'select_not_files') return 'Doesn\'t exists files in folder ./input/...'
    if (textId === 'select_not_files_selected') return 'No files selected'
    if (textId === 'quality_default') return 'Default - Wide use, with possibility of return a big file.'
    if (textId === 'quality_screen') return 'Screens - Less quality and little space disk occuped - ' + '(72 dpi)'.green
    if (textId === 'quality_ebook') return 'Ebooks - Better quality, bigger files - ' + '(150 dpi)'.green
    if (textId === 'quality_prepress') return 'Similar output to Acrobat Distiller "Prepress Optimized" ' + '(300 dpi)'.green
    if (textId === 'quality_printer') return 'Similar output to Acrobat Distiller "Printer Optimized" ' + '(300 dpi)'.green
    if (textId === 'quality_cancel') return 'Cancel'
    if (textId === 'quality_message') return `Select quality - ${replace[0]} ${replace[0] > 1 ? 'files' : 'file'}`
    if (textId === 'compression_ok') return 'Finished! Press ENTER to restart.'
    if (textId === 'template') return 'template'
  } else if (getLanguage() === 'es') {
    if (textId === 'title') return 'Compresor de PDF'
    if (textId === 'home') return 'Inicio'
    if (textId === 'home_compress') return 'Comprimir'
    if (textId === 'home_exit') return 'Salir'
    if (textId === 'select_title') return 'Seleccionar archivos'
    if (textId === 'select_file_s') return 'Archivo(s)'
    if (textId === 'select_manually') return 'Seleccionar manualmente'
    if (textId === 'select_file_all') return 'Seleccionar todos los archivos de la carpeta ./input/'
    if (textId === 'select_cancel') return 'Regresar'
    if (textId === 'pause_restart') return 'Pulse ENTER para reiniciar'
    if (textId === 'pause_continue') return 'Pulse ENTER para continuar'
    if (textId === 'select_not_files') return 'No hay archivos en la carpeta ./input/...'
    if (textId === 'select_not_files_selected') return 'No se seleccionaron archivos'
    if (textId === 'quality_default') return 'Por defecto - Útil en una amplia variedad de usos, posiblemente a expensas de un archivo más grande.'
    if (textId === 'quality_screen') return 'Pantallas - Menos calidad, tamaño más pequeño - ' + '(72 dpi)'.green
    if (textId === 'quality_ebook') return 'Libros digitales - Una mejor calidad, pero archivos más grandes - ' + '(150 dpi)'.green
    if (textId === 'quality_prepress') return 'Preprensa - Salida similar a la de Acrobat Distiller con "Optimizado para preprensa" ' + '(300 dpi)'.green
    if (textId === 'quality_printer') return 'Impresora - Salida similar a la de Acrobat Distiller con "Optimizado para imprimir" ' + '(300 dpi)'.green
    if (textId === 'quality_cancel') return 'Cancelar'
    if (textId === 'quality_message') return `Seleccionar calidad - ${replace[0]} ${replace[0] > 1 ? 'archivos' : 'archivo'}`
    if (textId === 'compression_ok') return '¡Listo! Pulse ENTER para reiniciar.'
    if (textId === 'template') return 'template'
  }

  throw new Error(`Cannot find string for '${textId}' with '${getLanguage()}' language.`)
}
