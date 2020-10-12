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
        '-u': Boolean,
        '-g': Boolean,
        '-b': Boolean,
      }
    );
    return {
      version: args['-v'] || false,
      url: args['-u'] || false,
      inputArg: args['-u'] || args['-g'] || args['-b'] ? rawArgs.slice(3) : rawArgs.slice(2),
      showGood: args['-g'] || false,
      showBad: args['-b'] || false,
    };
}

function linkCheck(file, showGood, showBad) {
    const regex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,25}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/g
    const urls = file.match(regex);

    urls.map(url => {
        fetch(url)
            .then(res => {
                if (res.ok) {                
                    if (res.status == 200 && showGood) {
                        console.log(chalk.green(url));
                    } else if ((res.status == 400 || res.status == 404) && showBad) {
                        console.log(chalk.red(url));
                    } else if (showBad) {
                        console.log(chalk.grey(url));
                    }
                } else {
                    throw new Error('Poor network response');
                }
            })
            .catch(error => {
                if (showBad)
                    console.log(chalk.red(url));
            });
    })
}

export function cli(args) {
    const parsedArgs = parseArgs(args)
    console.log(parsedArgs)

    if (!(parsedArgs.showGood || parsedArgs.showBad)){
        parsedArgs.showGood = true
        parsedArgs.showBad = true
    } 

    if ((!parseArgs.version && !parseArgs.url && parsedArgs.inputArg == 0) || (parseArgs.version && parseArgs.url)){
        console.log("mcl - a command to check links of a HTML page")
        console.log("-v,  to get verison number and name of the tool")
        console.log("-u,  to check link of a html page of supplied url")
    } else if (parsedArgs.version){
        console.log("Name of Tool: " + pjson.name + "\nVerison number: " + pjson.version)
    } else if (parsedArgs.url) {
        parsedArgs.inputArg.map(url => {
            fetch(url)
                .then(res => {
                    if (!res.ok){
                        throw new Error('Poor network response');
                    }
                    return res.text();
                })
                .then(body => linkCheck(body, parsedArgs.showGood, parsedArgs.showBad))
                .catch((error) => {
                    console.error('Fetch operation failed', error);
                    console.log(chalk.bgRed("Invalid url, absolute URL only"));
                });
        })
    } else {
        parsedArgs.inputArg.map(file => {
            fs.readFile(file, (err, data) => {
                if (err) throw err;
                linkCheck(data.toString(), parsedArgs.showGood, parsedArgs.showBad);
            })
        })
    }
}