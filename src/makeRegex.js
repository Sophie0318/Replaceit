function makeRegex(makeRegexOptions) {
  const {targetString, regexFlags} = makeRegexOptions

  return new RegExp(targetString, regexFlags)
}

export default makeRegex