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
        if (roman.length == 1) {
            if (romanNumeral[roman]) {
                console.log(romanNumeral[roman])
            }
            else {
                throw new TypeError('Unknown roman numeral');
            }
        }
        else {
            const arrayRoman = [...roman]
             const intRoman = []
            for (i in arrayRoman) {                
                intRoman.push(parseInt(romanNumeral[arrayRoman[i]]))
            }
            for (let x = 0; x < intRoman.length; x++){
                for (let y = 1; y < intRoman.length; y++) {                   
                    const res = intRoman[x]+intRoman[y]
                    x++
                    console.log(res)
                }
            }

        }
    }
    else {
        throw new TypeError('Not a string');
    }

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
        romano = (romans[+digitos.pop() + (i * 10)] || '') + romano
    }    
    return Array(+digitos.join('') + 1).join('M') + romano;
}

module.exports = {
    parse,
    stringify
}