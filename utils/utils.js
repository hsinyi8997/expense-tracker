module.exports ={
  splitToObject: (string) => {
    if (typeof string !== 'string' || !string.includes('-')) return
    const strings = string.split('-')
    const object = {}
    object[strings[0]] = strings[1]
    return object
  }
}