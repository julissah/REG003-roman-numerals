const convertCharacterAInt = (roman) => {
    switch (roman) {
        case 'I' : return 1;
        case 'V' : return 5;
        case 'X' : return 10;
        case 'L' : return 50;
        case 'C' : return 100;
        case 'D' : return 500;
        case 'M' : return 1000;    
        default: return -1;
    }
}

const validateRepeat = (roman) => {
    const countRoman = [...roman]
    var repeat = {};
    countRoman.forEach(function(n){
        repeat[n] = (repeat[n] || 0) + 1;
    });
    let key = Object.keys(repeat)
    let value = Object.values(repeat)
    for (let r = 0; r < key.length; r++) {
        const element = key[r];

        switch (key[r]) {
            case 'I': if (value[r] > 3) { throw new TypeError(`Too many repetitions of roman numeral ${key[r]}`)}  break;
            case 'V': if (value[r] > 1) { throw new TypeError(`Invalid repetition of number starting with 5: ${key[r]} (${convertCharacterAInt(key[r])})`)} break;
            case 'X': if (value[r] > 3) { throw new TypeError(`Too many repetitions of roman numeral ${key[r]}`)} break;
            case 'L': if (value[r] > 1) { throw new TypeError(`Invalid repetition of number starting with 5: ${key[r]} (${convertCharacterAInt(key[r])})`)} break;
            case 'C': if (value[r] > 3) { throw new TypeError(`Too many repetitions of roman numeral ${key[r]}`)} break;
            case 'D': if (value[r] > 1) { throw new TypeError(`Invalid repetition of number starting with 5: ${key[r]} (${convertCharacterAInt(key[r])})`)} break;
            case 'M': if (value[r] > 3) { throw new TypeError(`Too many repetitions of roman numeral ${key[r]}`)} break;        
            default: throw new TypeError('Unknown roman numeral');
        }
    }
}

const parse = (roman) => {
    if (typeof(roman) != 'string') {
        throw new TypeError('Not a string');
    } 

    validateRepeat(roman)

    let numero = convertCharacterAInt(roman.charAt(0))
    let current;
    let previous;

    for (let i = 1; i < roman.length; ++i) {
        current = convertCharacterAInt(roman.charAt(i));
        previous = convertCharacterAInt(roman.charAt(i-1));         
        if (current <= previous) {
            numero += current;
        } else {
            if (previous === 5 || previous === 50 || previous === 500) {
                throw new TypeError (`Invalid substraction prefix ${roman.charAt(i-1)}`);
            }
            numero = numero - previous * 2 + current;
        }        
    };
    return numero;
}

const stringify = (numero) => {
    if (typeof numero != 'number' || !Number.isInteger(numero)) {
        throw new TypeError('Not a number');
    } else if (numero < 0 || numero > 3999){
        throw new TypeError('out of range');
    }

    const romans = ['','C','CC','CCC','CD','D','DC','DCC','DCCC','CM','','X','XX','XXX','XL','L','LX','LXX','LXXX','XC','','I','II','III','IV','V','VI','VII','VIII','IX'];

    let digitos = String(numero).split('');
    let romano = '';
    let i = 3;

    while (i--) {
        romano = (romans[+digitos.pop() + (i * 10)] || '') + romano;
    }    
    return Array(+digitos.join('') + 1).join('M') + romano;
}

module.exports = {
    parse,
    stringify
}