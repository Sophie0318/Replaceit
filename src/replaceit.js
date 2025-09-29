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
          const searchRegexFlags = /g/.test(regexFlags) ? regexFlags.replace('g', '') : regexFlags
          const searchRegex = new RegExp(regex, searchRegexFlags)
          const matches = fileContent.match(searchRegex)
          // if no match, then don't write file
          if (matches === null) {
            console.log(fileDirectory, ' has no match')
          }
          // if match, but isDryRun === true, then don't replace file, and output log
          else if(isDryRun === true && matches.length > 0) {
            console.log(fileDirectory, ' has ', matches.length, ' matches')
            console.log('the matches: ', matches[1], ' at ', matches.index)
          }
          // if match, then replace and write file 
          else if (isDryRun === false && matches.length > 0) {
            console.log(fileDirectory, ' has ', matches.length, ' matches')
            let copyContent = fileContent
            while(searchRegex.test(copyContent)) {
              fileContent = fileContent.replace(searchRegex, replaceStr)
              copyContent = copyContent.replace(searchRegex, '')
            }
            await fs.writeFileSync(fileDirectory, fileContent)
          }
        }
      }
    }
  } catch (error) {
    console.log('error occurred: ', error)
  }

  return new Promise((resolve) => {
    resolve('done')
  })
}

export default replaceit