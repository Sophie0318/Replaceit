import fs from 'fs'
import path from 'path'

// replaceit(config: ReplacementsConfig, isDryRun: boolean): Promise<Report>
async function replaceit(config, isDryRun = false) {
  const { filePaths, fileExts, replacements } = config

  try {
    // iterate through filePaths
    for (let filePath of filePaths) {
      const files = await fs.readdirSync(filePath, {withFileTypes: true, recursive: true})    
      for (let file of files) {
        // if directory, then skip to next
        if (file.isDirectory()) continue
  
        // if it is file, check if acceptable extension
        const fileDirectory = path.join(file.parentPath, file.name)
        const extension = path.extname(file.name)
        if (!fileExts.includes(extension)) {
          console.log(fileDirectory, ' has invalid extension')
          continue
        }
        // process file
        let fileContent = await fs.readFileSync(fileDirectory, {encoding: 'utf8'})
        // iterate through replacements to find match 
        for (let replacement of replacements) {
          const { regex, regexFlags, replaceStr } = replacement
          const searchRegexFlags = /g/.test(regexFlags) ? regexFlags : regexFlags + 'g'
          const searchRegex = new RegExp(regex, searchRegexFlags)
          const matches = fileContent.match(searchRegex)
          // if no match, then don't write file
          if (matches === null) {
            console.log(fileDirectory, ' has no match')
          }
          // if match then output log and see if isDryRun === true
          else if(matches.length > 0) {
            console.log(fileDirectory, ' has ', matches.length, ' matches: ')

            // if isDryRun === true, then output log only
            if (isDryRun === true) {
              // get line number of the match and log which line has match
              let copyContent = fileContent
              for (let match of matches) {
                const index = copyContent.indexOf(match)
                const contentBefore = copyContent.substring(0, index + 1)
                const newLines = contentBefore.match(/\n/g)
                let lineNumber = 0
                if (newLines !== null) { lineNumber = newLines.length + 1 }
                console.log('\t', 'at line ', lineNumber, ': ', match)
  
                copyContent = copyContent.replace(match, '')
              }
            } else {
              // if match and isDryRun === false, then replace and write file
              fileContent = fileContent.replace(searchRegex, replaceStr)
              await fs.writeFileSync(fileDirectory, fileContent)
            }
          }
        }
      }
    }
  } catch (error) {
    console.log('error occurred: ', error)
  }

  return new Promise((resolve) => {
    resolve('\nSearch Done!')
  })
}

export default replaceit