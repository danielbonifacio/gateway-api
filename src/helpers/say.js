/**
 * Replaces the variables in string based on objects
 * and logs it on console
 * 
 * @param {string} ref refference string
 * @param {object} params variables object
 * @param {boolean} log log to console
 */
const say = (ref, params, log = true) => {
  let str = ref
  params && Object.keys(params).forEach(param => {
    const regex = new RegExp('\\$\\{'+param+'\\}', 'gi')
    str = str.replace(regex, params[param])
  });
  log && console.log(str)
  return str
}

module.exports = say
