import { simpleReplaceContent } from '../../src/replaceContent.js'

async function testReplaceContent() {
  const fileContent = `<template>\n\t<v-radio v-bind="$attrs" />\n\t<v-text-field v-model="testV" />\n\t<v-radio v-model="testV2" />\n</template>`
  const regex = /<v-radio/
  const regexFlag = 'g'
  const replaceString = '<v-text-field'

  const result = await simpleReplaceContent({regex, regexFlag, replaceString, fileContent})
  console.log('result: ', result)
}

testReplaceContent()