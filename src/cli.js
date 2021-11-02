/* eslint-disable no-case-declarations */
// 'use strict';
const { parse, stringify } = require('./api');
const inquirer = require('inquirer');
const _ = require('lodash');
const fuzzy = require('fuzzy');
const colors = require('colors');
colors.enable();
// colors.disable(); 

colors.setTheme({
  silly: 'rainbow',
  input: 'grey',
  verbose: 'magenta',
  prompt: 'grey',
  info: 'green',
  data: 'grey',
  help: 'cyan',
  warn: 'yellow',
  debug: 'blue',
  error: 'red'
});

inquirer.registerPrompt('autocomplete', require('../index'));

let option = ['parse', 'stringify', '--version', '--help'];
 
console.log('\n--------------------------------------------------------------------------------------'.input)
console.log('\t\t⭐️ ¡Converting Roman numerals has never been easier! ⭐️\t'.help)
console.log('--------------------------------------------------------------------------------------\n'.input)

function searchOption(answers, input) {
    input = input || '';
    return new Promise(function (resolve) {
        setTimeout(function () {
            var fuzzyResult = fuzzy.filter(input, option);
            resolve(
                fuzzyResult.map(function (el) {
                    return el.original;
                })
            );
        }, _.random(30, 500));
    });
}

const messageHelp = () => {
    let rep = {
        "Usage:": "roman-numerals-convert",
        "Commands:": [
            {
                "parse <input>": "Parse a roman numeral string into an integer."
            },
            {
                "stringify <input>": "Takes an integer and converts it to a roman numeral."
            }
        ],                    
        "Options:": [
            {
                "--help": "Show this help."
            },
            {
                "--version": "Show version number."
            }
        ]
    }
    let key = Object.keys(rep);
    let value = Object.values(rep);
    const data = rep['Commands:'].map(name => name);       
    const data1 = rep['Options:'].map(name => name);            
    console.log('\n', key[0].underline.green, value[0].help);
    console.log('\n', key[1].underline.green);
    console.log('\t', Object.keys(data[0])[0].help, '\t\t', data[0]['parse <input>'].prompt);
    console.log('\t', Object.keys(data[1])[0].help, '\t', data[1]['stringify <input>'].prompt);
    console.log('\n', key[2].underline.green);       
    console.log('\t', Object.keys(data1[0])[0].help, '\t', data1[0]['--help'].prompt);
    console.log('\t', Object.keys(data1[1])[0].help, '\t', data1[1]['--version'].prompt);
}

const callRomanNumeral = () => {
    inquirer.prompt({
        type: 'confirm',
        name: 'confirm',
        message: 'Do you want to continue?'.info
    })
    .then(answers => {
        (answers.confirm == true) ? romanNumeral() : console.log('\nthanks!🤍'.help,'\n--------------------------------------------------------------------------------------'.input);  
    })
}
const romanNumeral = () => {
    inquirer
    .prompt([
        {
            type: 'autocomplete',
            name: 'roman',
            suggestOnly: true,
            message: 'What would you like to do?'.verbose,
            searchText: 'We are searching the internet for you!',
            emptyText: 'Nothing found!',
            default: 'help'.input,
            source: searchOption,
            pageSize: 4,
            validate: function (val) {
                return val ? true : 'Type something!';
            },
        },
    ])
    .then(function (answers) {
        let value = Object.values(answers)[0];
        switch (value) {
            case 'parse':
                inquirer.prompt({
                    type: 'input',
                    name: 'parse',
                    message: 'Roman numeral to convert:'.verbose
                })
                    .then(answers => {
                        let valueParse = Object.values(answers)[0];
                        console.log(`  ${parse(valueParse)}`.warn);
                        callRomanNumeral();
                    })
                    .catch((error) => {
                        console.error(`${error}`);
                    });
                break;
            case 'stringify':
                inquirer.prompt({
                    type: 'number',
                    name: 'stringify',
                    message: 'Arábigo numeral to convert:'.verbose
                })
                .then(answers => {
                    let valueParse = Object.values(answers)[0];
                    console.log(`  ${stringify(valueParse)}`.warn);
                    callRomanNumeral();
                })
                .catch((error) => {
                     console.error(`${error}`);
                });
                break;
            case '--help':
                messageHelp();
                callRomanNumeral();
                break;
            case '--version':
                console.log('  1.0.4'.warn);
                callRomanNumeral();
                break;
            default:
                messageHelp();
                callRomanNumeral();
                break;
        }
    });
}


module.exports = { romanNumeral }