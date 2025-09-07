import * as readline from 'node:readline'
import { stdin as input, stdout as output } from 'node:process'

function confirmRun({filePaths, targetString}) {
  const rl = readline.createInterface({
    input, 
    output, 
    prompt: 'Confirm run? (y/n) '
  })

  console.log('files to be processed: ')
  filePaths.forEach((i) => {
    console.log('  ', i)
  })
  console.log('target regex: ', targetString)
  
  rl.prompt()
  rl.on('line', (line) => {
    if (line.toLowerCase() === 'y' || 'yes') console.log('run process')
    else console.log('Bye~~')
    rl.close()
  })
}

export default confirmRun