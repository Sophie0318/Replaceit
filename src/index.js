import confirmRun from './confirmRun.js'
import makeRegex from './makeRegex.js'

const filePaths = ['123\\', '456']
const targetString = '\\\\'
const regexFlags = 'g'

// confirmRun({filePaths, targetString})

let regex = null
regex = makeRegex({targetString, regexFlags})
