import {replaceit, findFiles} from '../../src/replaceit.js'
import testConfig from './testConfig.json' assert {type: 'json'}

async function testReplaceit(testConfig, findFiles, isDryRun) {
  return await replaceit(testConfig, findFiles, isDryRun)
}

testReplaceit(testConfig, findFiles, false)