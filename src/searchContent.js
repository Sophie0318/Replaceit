import fs from 'node:fs'
import path from 'node:path'

import { simpleReplaceContent } from './replaceContent.js'

async function searchContent(searchOptions) {
  const { filePaths, regex, regexFlags, replaceString, includeFileExt } = searchOptions

  // TODO: verify inputs?

  // go through each filePath
  filePaths.forEach((filePath) => {
    fs.readdir(filePath, { withFileTypes: true }, (err, files) => {
      if (err) throw new Error(err)

      files.forEach(async(file) => {
        // if is subdirectory, then read files in subdirectory
        if (file.isDirectory()) {
          console.log('is a directory: ', file.name)
          const subDirectory = [path.join(file.parentPath, file.name)]
          // TODO: make a safeguard recursive count?
          await searchContent({...searchOptions, filePaths: subDirectory})
          return
        }

        // if file is not .js or .vue file, return
        let fileExtMatch = false
        includeFileExt.forEach((ext) => {
          if (file.name.endsWith(ext)) fileExtMatch = true
        })
        if (!fileExtMatch) {
          console.log(file.name, ' is not a .js or .vue file')
          return
        }

        // if file is file, perform search and replace
        const directory = path.join(filePath, file.name)
        fs.readFile(directory, 'utf8', async(err, data) => {
          if (err) throw new Error(err)
          console.log('reading file: ', directory)
          if (typeof data !== 'string' || data === '') throw new Error('invalid or empty file content')

          // check if replaceString contains \$&
          let result = ''
          if (/\\\$&/.test(replaceString)) {
            console.log('replaceString has \\$&')
          } else {
            result = await simpleReplaceContent({ regex, regexFlags, replaceString, fileContent: data })
          }

          // check for matches, if no match then don't write file
          if (result === '') {
            console.log('no match then no write')
            return
          }
          if (result.length > 0) {
            // has match and replaced, start write file
            fs.writeFile(directory, result, (err) => {
              if (err) throw new Error(err)
            })
            console.log('file written: ', directory)
          }
        })
      })
    })
  })
}

export default searchContent