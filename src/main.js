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
      }
    );
    return {
      version: args['-v'] || false,
      url: args['-u'] || false,
      inputArg: args['-u'] || args['-j'] ? rawArgs.slice(3) : rawArgs.slice(2),
      jsonOutput: args['-j'] || false,
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

function linkCheck(file, jsonOutput) {
    const regex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,25}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/g
    const urls = file.match(regex);

    const promises = urls.map(getStatus);

    Promise
        .allSettled(promises)
        .then(res => {
            return res.map(res => {
                if (res.value.status == 200) {
                    console.log(chalk.green(res.value.url));

                    return { url: res.value.url, status: res.value.status }
                } else if (res.value.status == 400 || res.value.status == 404) {
                    console.log(chalk.red(res.value.url));

                    return { url: res.value.url, status: res.value.status }
                } else {
                    console.log(chalk.grey(res.value.url));

                    return { url: res.value.url, status: res.value.status }
                }
            })
        })
        .then(res => { if (jsonOutput) console.log(res) })
        .catch(err => console.error(err))
}

export function cli(args) {
    const parsedArgs = parseArgs(args)

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
                .then(body => linkCheck(body), parsedArgs.jsonOutput)
                .catch((error) => {
                    console.error('Fetch operation failed', error);
                    console.log(chalk.bgRed("Invalid url, absolute URL only"));
                });
        })
    } else {
        parsedArgs.inputArg.map(file => {
            fs.readFile(file, (err, data) => {
                if (err) throw err;
                linkCheck(data.toString(), parsedArgs.jsonOutput);
            })
        })
    }
}