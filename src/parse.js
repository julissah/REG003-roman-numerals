const romanNumeral = {
    'I': 1,
    'V': 5,
    'X' : 10,
    'L' : 50,
    'C' : 100,
    'D' : 500,
    'M' : 1000
}

const parse1 = (roman) => {
    if (typeof(roman) === 'string') {
        if (roman.length == 1) {
            if (romanNumeral[roman]) {
                // console.log(romanNumeral[roman])
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
                    // console.log(res)
                }
            }

        }
    }
    else {
        throw new TypeError('Not a string');
    }

}

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

const parse = (roman) => {
    if (typeof(roman) != 'string') {
        throw new TypeError('Not a string');
    }

    const romanNumeral = {
        'I': 1,
        'V': 5,
        'X' : 10,
        'L' : 50,
        'C' : 100,
        'D' : 500,
        'M' : 1000
    }
    // console.log(romanNumeral)
    // console.log(Object.values(romanNumeral))

    Object.filter = (obj, predicate) => 
    Object.keys(obj)
          .filter( key => predicate(obj[key]) )
          .reduce( (res, key) => (res[key] = obj[key], res), {} );

    let filtered = Object.filter(romanNumeral, valor => valor.toString().charAt(0) == 5); 
    

        cuentaV = 0;
        cuentaL = 0;
        cuentaD = 0;

        cuentaI = 0;
        cuentaX = 0;
        cuentaC = 0;
        cuentaM = 0;
        posicionV = roman.indexOf("V");
        posicionL = roman.indexOf("L");
        posicionD = roman.indexOf("D");

        // posicionI = roman.indexOf("I");
        // posicionX = roman.indexOf("X");
        // posicionC = roman.indexOf("C");
        // posicionM = roman.indexOf("M");

        while ( posicionV != -1 || posicionL != -1 || posicionD != -1) {
            if (posicionV != -1) {
                cuentaV++;
                posicionV = roman.indexOf("V" ,posicionV + 1);
            } else if ( posicionL != -1) {
                cuentaL++;
                posicionL = roman.indexOf("L" ,posicionL + 1);
            } else if ( posicionD != -1 ) {
                cuentaD++;
                posicionD = roman.indexOf("D" ,posicionD + 1);
            }
            
        }
        if (cuentaV > 1 || cuentaL > 1 || cuentaD > 1) {
            throw new TypeError('Invalid repetition of number starting with 5: L (50)')
        }       
    


    let numero = convertCharacterAInt(roman.charAt(0))
    let current;
    let previous;

    for (let i = 1; i < roman.length; ++i) {
        current = convertCharacterAInt(roman.charAt(i))
        if (current == -1) {
            throw new TypeError('Unknown roman numeral');
        }
        previous = convertCharacterAInt(roman.charAt(i-1))
        if (current <= previous) {
            numero += current
        } else {
            numero = numero - previous * 2 + current
        }
    }
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
        romano = (romans[+digitos.pop() + (i * 10)] || '') + romano
    }    
    return Array(+digitos.join('') + 1).join('M') + romano;
}

module.exports = {
    parse,
    stringify
}