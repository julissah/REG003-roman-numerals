const { parse, stringify, isValidPosition } = require('./src/numberRoman');

console.log(parse('LXIIIX'));
console.log(stringify(71));
// console.log(isValidPosition('LXIIIX'));
module.exports = {
    parse
    
}