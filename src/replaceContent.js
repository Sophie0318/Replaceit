async function simpleReplaceContent(replaceContentOptions) {
  const { regex, regexFlags, replaceString, fileContent } = replaceContentOptions

  // TODO: verify input
  let copyContent = fileContent

  // check how matches, and output log
  const searchRegexFlag = /g/.test(regexFlags) ? regexFlags : regexFlags + 'g'
  const searchRegex = new RegExp(regex, searchRegexFlag)
  const match = copyContent.match(searchRegex)
  if (match) {
    console.log('how many matches', match.length)
  }
  else {
    console.log('0 matches')
    return ''
  }

  // replace the matches with designated string
  const replaceRegex = new RegExp(regex, regexFlags)
  while (replaceRegex.test(copyContent)) {
    // TODO: make a safeguard recursive count
    copyContent = copyContent.replace(replaceRegex, replaceString)
  }

  return copyContent
}

export { simpleReplaceContent }