import replaceit from "../../src/replaceit.js";

async function testReplaceit() {
  const testConfig = {
    "filePaths": ["./test/resources/components", "./test/resources/views"],
    "fileExts": [".vue", ".js"],
    "replacements": [
      {
        "regex": "(<v-radio ):value",
        "regexFlags": "g",
        "replaceStr": "$1:model-value"
      }
    ]
  }

  return await replaceit(testConfig, false)
}

console.log(await testReplaceit())