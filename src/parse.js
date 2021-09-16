const romanNumeral = {
    'I': 1,
    'V': 5,
    'X' : 10,
    'L' : 50,
    'C' : 100,
    'D' : 500,
    'M' : 1000
}

const parse = (roman) => {
    if (typeof(roman) === 'string') {
        if (romanNumeral[roman]) {
            console.log(romanNumeral[roman])
        }
        else {
            throw new TypeError('Unknown roman numeral');
        }
    }
    else {
        throw new TypeError('Not a string');
    }

}

module.exports = {
    parse
}