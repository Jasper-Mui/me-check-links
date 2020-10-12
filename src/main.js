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
        '-j': Boolean,
        '-g': Boolean,
        '-b': Boolean,
      }
    );
    return {
      version: args['-v'] || false,
      url: args['-u'] || false,
      inputArg: args['-u'] || args['-j'] || args['-g'] || args['-b'] ? rawArgs.slice(3) : rawArgs.slice(2),
      jsonOutput: args['-j'] || false,
      showGood: args['-g'] || false,
      showBad: args['-b'] || false,
    };
}

async function getStatus(url) { // promise function to fetch all url status
    try {
        const res = await fetch(url);
        return {url: url, status: res.status}
    }catch(err) {
        return {url, status: err.status}
    }
}

function linkCheck(file, jsonOutput, showGood, showBad) {
    const regex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,25}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/g
    const urls = file.match(regex);

    const promises = urls.map(getStatus);

    console.log("checking...")
    Promise
        .allSettled(promises)
        .then(res => {
            return res.map(res => {
                if (res.value.status == 200 && showGood) {
                    if (!jsonOutput)
                        console.log(chalk.green(res.value.url));

                    return { url: res.value.url, status: res.value.status }
                } else if ((res.value.status == 400 || res.value.status == 404) && showBad) {
                    if (!jsonOutput)
                        console.log(chalk.red(res.value.url));

                    return { url: res.value.url, status: res.value.status }
                } else if (showBad) {
                    if (!jsonOutput)
                        console.log(chalk.grey(res.value.url));

                    return { url: res.value.url, status: res.value.status }
                }
            })
        })
        .then(res => { if (jsonOutput) console.log(res) })
        .catch(error => {
            if (showBad)
                console.log(chalk.red(url));
        })
}

export function cli(args) {
    const parsedArgs = parseArgs(args)

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
                .then(body => linkCheck(body, parsedArgs.jsonOutput, parsedArgs.showGood, parsedArgs.showBad))
                .catch((error) => {
                    console.error('Fetch operation failed', error);
                    console.log(chalk.bgRed("Invalid url, absolute URL only"));
                });
        })
    } else {
        parsedArgs.inputArg.map(file => {
            fs.readFile(file, (err, data) => {
                if (err) throw err;
                linkCheck(data.toString(), parsedArgs.jsonOutput, parsedArgs.showGood, parsedArgs.showBad);
            })
        })
    }
}