import arg from 'arg'
import chalk from 'chalk';
import fetch from 'node-fetch';
import pjson from '../package.json';
const fs = require('fs') 

function parseArgs(rawArgs) {
    if (rawArgs[2]) rawArgs[2] = rawArgs[2].replace(/^\//,"-")

    const args = arg(
      {
        '-v': Boolean,
        '-u': Boolean
      }
    );
    return {
      version: args['-v'] || false,
      url: args['-u'] || false,
      inputArg: args['-u'] ? rawArgs.slice(3) : rawArgs.slice(2)
    };
}

function linkCheck(file) {
    const regex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,25}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/g
    const urls = file.match(regex);

    urls.map(url => {
        fetch(url)
            .then(res => {
                if (res.status == 200) {
                    console.log(chalk.green(url))
                } else if (res.status == 400 || res.status == 404) {
                    console.log(chalk.red(url))
                } else {
                    console.log(chalk.grey(url))
                }
            });
    })
}

export function cli(args) {
    const parsedArgs = parseArgs(args)

    if ((!parseArgs.version && !parseArgs.url && parsedArgs.inputArg == 0) || (parseArgs.version && parseArgs.url)){
        console.log("BLK - broken link finder of specific file")
        console.log("-v,  to get verison number and name of the tool")
       
    } else if (parsedArgs.version){
        console.log("Name of Tool: " + pjson.name + "\nVerison number: " + pjson.version)
    } else if (parsedArgs.url) {
        parsedArgs.inputArg.map(url => {
            fetch(url)
                .then(res => res.text())
                .then(body => {
                    linkCheck(body)
                });
        })

    } else {
        parsedArgs.inputArg.map(file => {
            fs.readFile(file, (err, data) => {
                if (err) throw err;
                linkCheck(data.toString());
            })
        })
    }
}