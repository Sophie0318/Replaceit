import searchContent from '../../src/searchContent.js'

function testSearchContent() {
  // filePaths, regex, regexFlags, replaceString, includeFileExt
  const filePaths = ['./test/components', './test/views']
  const regex = /<v-radio/
  const regexFlags = 'g'
  const replaceString = '<v-text-field v-model="testValu"'
  const includeFileExt = ['.vue', '.js']

  searchContent({filePaths, regex, regexFlags, replaceString, includeFileExt})
}

testSearchContent()