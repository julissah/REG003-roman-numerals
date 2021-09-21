#!/usr/bin/env node
/* eslint-disable no-undef */
const inquirer = require('inquirer');
const { parse, stringify } = require('../src/api');

// let myArgs = process.argv.slice(2);
// console.log(myArgs)
//     if (myArgs[0] == '-v' || myArgs[0] == '--version') {
//         console.log('1.0.0')
//     } else if (myArgs[0] == '-h' || myArgs[0] == '--help') {
//         console.log('1.0.0')
//     }
// switch (myArgs[0]) {
//     case 'parse':
//         console.log(parse(myArgs[1]))
//         break;
//     case 'stringify':
//         console.log(stringify(myArgs[1]))
//         break;
//     case '-h':
        
//         break;
//      default:
//          break;
// }

console.log('〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️')
console.log(' ¡Converting Roman numerals has never been easier! ')
console.log('〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️')

inquirer.prompt({
    type: 'list',
    name: 'roman',
    message: 'Select an option:',
    choices: ['parse', 'stringify']
})
.then(answers => {
    let value = Object.values(answers)[0];
    switch (value) {
        case 'parse':
            inquirer.prompt({
                type: 'input',
                name: 'parse',
                message: 'Roman numeral to convert'
            })
            .then(answers => {
                let valueParse = Object.values(answers)[0];
                console.log(parse(valueParse));
            })
            .catch((error) => {
                console.error(error);
              });
            break;
        case 'stringify':
            inquirer.prompt({
                type: 'number',
                name: 'parse',
                message: 'Arábigo numeral to convert'
            })
            .then(answers => {
                let valueParse = Object.values(answers)[0];
                console.log(stringify(valueParse));
            })
            .catch((error) => {
                console.error(error);
              });
            break;
    
        default:
            break;
    }
})