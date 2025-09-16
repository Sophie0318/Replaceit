import confirmRun from './confirmRun.js'
import makeRegex from './makeRegex.js'
import searchContent from './searchContent.js'

const filePaths = ['/']
const targetString = '<v-radio'
const regexFlags = 'g'
const includeFileExt = ['vue', 'js']

// confirmRun({filePaths, targetString})

let regex = null
regex = makeRegex({targetString, regexFlags})

searchContent({filePaths, regex, includeFileExt})