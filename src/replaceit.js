import fs from 'fs/promises'
import path from 'path'

async function findFiles(filePaths, fileExts) {
  const allFiles = []
  // TODO: input validation?

  for (let filePath of filePaths) {
    const dirents = await fs.readdir(filePath, {withFileTypes: true, recursive: true})
    
    for (let dirent of dirents) {
      if (dirent.isDirectory()) continue
      
      const fullPath = path.join(dirent.path, dirent.name)
      const extension = path.extname(dirent.name)
      if (fileExts.includes(extension)) {
        allFiles.push(fullPath)
      } else {
        console.log(`invalid file extension: ${fullPath}`)
        continue
      }
    }
  }

  return allFiles
}

async function replaceit(config, findFiles, isDryRun = false) {
  const { filePaths, fileExts, replacements } = config

  try {
    // Find files
    const allFiles = await findFiles(filePaths, fileExts)
    if (allFiles.length === 0) {
      console.log('\nNo files found')
      return
    } else {
      console.log(`\nFound ${allFiles.length} files to process. Mode: ${isDryRun ? 'dry-run' : 'replace'}`)
    }

    for (let file of allFiles) {
      let fileContent = await fs.readFile(file, {encoding: 'utf8'})
      let resultContent = fileContent
      let totalMatches = 0
      console.log(`Reading file: ${file}`)

      // Iterate through replacements array on each file
      for (let replacement of replacements) {
        const {regex, regexFlags, replaceStr} = replacement
        const searchRegexFlags = /g/.test(regexFlags) ? regexFlags : regexFlags + 'g'
        const searchRegex = new RegExp(regex, searchRegexFlags)

        const allMatches = Array.from(fileContent.matchAll(searchRegex))
        if (allMatches.length === 0) {
          console.log(`\tRegex Rule: ${regex} | No match found`)
          continue
        }
        totalMatches += allMatches.length
        for (let match of allMatches) {
          const beforeMatch = fileContent.substring(0, match.index)
          const matchLine = Array.from(beforeMatch.matchAll('\n')).length + 1
          console.log(`\tRegex Rule: ${regex} | Match found at line: ${matchLine}`)

          if (isDryRun === false) {
            resultContent = resultContent.replace(searchRegex, replaceStr)
          }
        }
      }

      if (isDryRun === false && totalMatches > 0) {
        // write file
        await fs.writeFile(file, resultContent, {encoding: 'utf8'})
        console.log('\t==== Write file complete ====')
      }
    }
  } catch (error) {
    console.error(error)
  }
}

export {replaceit, findFiles}