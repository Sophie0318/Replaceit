import replaceit from '../../src/replaceit.js'
import testConfig from './testConfig.json' assert {type: 'json'}

async function testReplaceit(testConfig, isDryRun) {
  return await replaceit(testConfig, isDryRun)
}

console.log(await testReplaceit(testConfig, true))