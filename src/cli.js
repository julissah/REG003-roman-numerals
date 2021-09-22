/* eslint-disable no-case-declarations */
'use strict';
const { parse, stringify } = require('../src/api');
const inquirer = require('inquirer');
const _ = require('lodash');
const fuzzy = require('fuzzy');
var color = require('colors');
var colors = require('colors/safe');
 
// set single property
var error = colors.red;
error('this is red');
 
// set theme
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

var option = ['parse', 'stringify', 'version', 'help'];

// console.log('〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️⭐️')
console.log('\n▪️▫️▪️▫️▪️▫️▪️▫️▪️▫️▪️▫️▪️▫️▪️▫️▪️▫️▪️▫️▪️▫️▪️▫️▪️▫️▪️▫️▪️▫️▪️▫️▪️▫️▪️▫️▪️▫️▪️▫️▪️▫️▪️▫️▪️▫️▪️▫️▪️▫️▪️▫️▪️▫️▪️▫️▪️▫️▪️▫️▪️▫️▪️▫️▪️▫️▪️▫️▪️▫️▪️▫️▪️'.warn)

console.log('\t⭐️ ¡Converting Roman numerals has never been easier! ⭐️\t'.info)
console.log('▪️▫️▪️▫️▪️▫️▪️▫️▪️▫️▪️▫️▪️▫️▪️▫️▪️▫️▪️▫️▪️▫️▪️▫️▪️▫️▪️▫️▪️▫️▪️▫️▪️▫️▪️▫️▪️▫️▪️▫️▪️▫️▪️▫️▪️▫️▪️▫️▪️▫️▪️▫️▪️▫️▪️▫️▪️▫️▪️▫️▪️▫️▪️▫️▪️▫️▪️▫️▪️▫️▪️▫️▪️\n'.warn)

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
            pageSize: 2,
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
                    message: 'Arábigo numeral to convert:'.verbose
                })
                .then(answers => {
                    let valueParse = Object.values(answers)[0];
                    console.log(stringify(valueParse).warn);
                })
                .catch((error) => {
                     console.error(error);
                });
                break;
            case 'help':
                let rep = {
                    "Usage:": "roman-numerals [opttions] <command> [<input>]",
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
                            "help": "Show this help."
                        },
                        {
                            "version": "Show version number."
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
                console.log('\t', Object.keys(data[1])[0].help, '\t', data[1]['stringify <input>'].prompt,'\n');
                console.log('\n', key[2].underline.green);       
                console.log('\t', Object.keys(data1[0])[0].help, '\t\t', data1[0]['help'].prompt);
                console.log('\t', Object.keys(data1[1])[0].help, '\t', data1[1]['version'].prompt);
                break;
            case 'version':
                console.log('1.0.0');
                break;
            default:
                break;
        }
    });
