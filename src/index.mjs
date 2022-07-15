
import 'colors'
import inquirer from 'inquirer'
import compress from './compress.mjs'
import { getString, readFiles } from './helpers/index.mjs'

const appName = () => {
  return `
${getString('title').green} ${':)'.yellow}
  `
}

/**
 * Se encarga de la presentación
 * @returns {Promise<boolean>} boolean
 */
export const homeStage = async () => {
  console.clear()
  console.log(appName())

  const { input } = await inquirer.prompt(
    {
      name: 'input',
      message: getString('home'),
      type: 'list',
      choices:
    [
      { name: getString('home_compress'), value: true },
      { name: getString('home_exit'), value: false }
    ]
    })

  if (input === true) await selectionStage()

  return input
}

const selectionStage = async () => {
  const { input } = await inquirer.prompt(
    {
      name: 'input',
      message: getString('select_file_s'),
      type: 'list',
      choices:
        [
          { name: getString('select_manually'), value: 'manual' },
          { name: getString('select_file_all'), value: 'allFiles' },
          { name: getString('select_cancel'), value: 'cancel' }
        ]
    })

  if (input === 'manual') await manualStage()
  if (input === 'allFiles') await allFilesStage()
}

const manualStage = async () => {
  const files = await readFiles()

  if (files.length === 0) {
    await pausa(getString('select_not_files') + ' ' + getString('pause_restart'))
  } else {
    const { input = [] } = await inquirer.prompt(
      {
        name: 'input',
        message: getString('select_title'),
        type: 'checkbox',
        choices:
              [...files.map(fileName => { return { name: fileName, value: fileName } })]
      })

    if (input.length === 0) {
      await pausa(getString('select_not_files_selected') + ' ' + getString('pause_restart'))
    } else {
      await qualityStage(input)
    }
  }
}

const allFilesStage = async () => {
  const files = await readFiles()

  if (files.length === 0) {
    await pausa(getString('select_not_files') + ' ' + getString('pause_restart'))
    return null
  }
  await qualityStage(files)
}

/**
 * Pausa.
 * @param {?string} customText Si se pasa, se muestra en vez del mensaje genérico
 */
const pausa = async (customText) => {
  const defaultText = getString('pause_continue')
  await inquirer.prompt({ name: 'result', type: 'input', message: customText ? `${customText}` : `${defaultText}` })
}

/**
 *
 * @param {string[]} files
 */
const qualityStage = async (files) => {
  const qualityList = [
    { name: getString('quality_default'), value: 'default' },
    { name: getString('quality_screen'), value: 'screen' },
    { name: getString('quality_ebook'), value: 'ebook' },
    { name: getString('quality_prepress'), value: 'prepress' },
    { name: getString('quality_printer'), value: 'printer' },
    { name: getString('quality_cancel'), value: 'cancel' }
  ]

  const { quality } = await inquirer.prompt(
    {
      name: 'quality',
      message: getString('quality_message', [files.length]),
      type: 'list',
      choices: qualityList
    })

  if (quality !== 'cancel') await convertStage(files, quality)
}

/**
 * Listo para convertir, cuando se confirme.
 * @param {string[]} files
 * @param {string} quality
 */
const convertStage = async (files, quality) => {
  compress(files, quality)

  await pausa(getString('compression_ok'))
}
