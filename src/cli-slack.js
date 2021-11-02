
/* eslint-disable no-undef */
const { parse, stringify } = require('./api');
// const chalk = require('chalk');

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

const myArgs = process.argv.slice(2);

const messageHelp = () => {
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
                "--h, --help": "Show this help."
            },
            {
                "--v, --version": "Show version number."
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
    console.log('\t', Object.keys(data1[0])[0].help, '\t\t', data1[0]['--h, --help'].prompt);
    console.log('\t', Object.keys(data1[1])[0].help, '\t', data1[1]['--v, --version'].prompt);
}

const romanNumeralSlack = () => {
    
    if (myArgs.length >= 1){
        
        switch (myArgs[0]) {
            case 'parse':
                (myArgs.length === 1) ? console.info('Debe ingresar el número romano que desea convertir'): console.log(parse(myArgs[1]));       
                break;
            case 'stringify':
                (myArgs.length === 1) ? console.info('Debe ingresar el número entero que desea convertir'): console.log(stringify(parseInt(myArgs[1])));
                break;
            case '--v':
                console.log('1.0.4');
                break;
            case '--version':
                console.log('1.0.4');
                break;
            case '--h':
                messageHelp();
                break;
            case '--help':
                messageHelp();
                break;
            default:
                // console.log(chalk.blackBright('Lo siento, no es un comando válido.'));
                isNaN(myArgs[0]) === false ? console.log(stringify(parseInt(myArgs[0]))) : console.log(parse(myArgs[0]));
        }
      }    
}

module.exports = { romanNumeralSlack };

