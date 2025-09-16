import fs from 'node:fs'
import path from 'node:path'

function searchContent(searchOptions) {
  const { filePaths, regex, includeFileExt } = searchOptions

  // verify inputs?
  // make a safeguard recursive count

  // go through each filePath
  filePaths.forEach((filePath) => {
    // read all files from single filePath
    fs.readdir(filePath, { withFileTypes: true }, (err, files) => {
      if (err) throw new Error(err)

      files.forEach((file) => {
        // if file is directory, if yes iterate
        if (file.isDirectory()) {
          console.log('is a directory: ', file.name)
          const subDirectory = [path.join(file.path, file.name)]
          searchContent({filePaths: subDirectory, regex, includeFileExt})
          return
        }
        // if file is file, search for regex match in content
        const directory = path.join(filePath, file.name)
        fs.readFile(directory, 'utf8', (err, data) => {
          if (err) throw new Error(err)
          if (typeof data !== 'string' || data === '') throw new Error('invalid or empty file content')

          console.log('reading file: ', directory)

          let copyData = data
          const match = copyData.match(regex)
          if (match) console.log('how many matches', match.length)
          else console.log('0 matches')
          
          while (regex.test(copyData)) {

            copyData = copyData.replace(regex, '')
          }
        })
      })
    })
  })
}

export default searchContent