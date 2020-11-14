import arg from "arg";
import chalk from "chalk";
import fetch from "node-fetch";
import fs from "fs";
import pjson from "../package.json";
import { linkCheck, testTelescopePost } from "./linkHelper";

function parseArgs(rawArgs) {
    if (rawArgs[2]) rawArgs[2] = rawArgs[2].replace(/^\//, "-");

    const args = arg({
        "-v": Boolean,
        "-u": Boolean,
        "-j": Boolean,
        "-g": Boolean,
        "-b": Boolean,
        "-i": Boolean,
        "-t": Boolean,
    });
    return {
        version: args["-v"] || false,
        url: args["-u"] || false,
        inputArg:
            args["-u"] ||
            args["-j"] ||
            args["-g"] ||
            args["-b"] ||
            args["-i"] ||
            args["-t"]
                ? rawArgs.slice(3)
                : rawArgs.slice(2),
        jsonOutput: args["-j"] || false,
        showGood: args["-g"] || false,
        showBad: args["-b"] || false,
        ignoreUrl: args["-i"] || false,
        ignoreFile: args["-i"] ? rawArgs[3] : null,
        telescopeJsonLinkTest: args["-t"] || false,
    };
}

export function cli(args) {
    const parsedArgs = parseArgs(args);

    if (!(parsedArgs.showGood || parsedArgs.showBad)) {
        parsedArgs.showGood = true;
        parsedArgs.showBad = true;
    }

    if (
        (!parseArgs.version && !parseArgs.url && parsedArgs.inputArg == 0) ||
        (parseArgs.version && parseArgs.url)
    ) {
        console.log("mcl - a command to check links of a HTML page");
        console.log("-v,  to get verison number and name of the tool");
        console.log("-u,  to check link of a html page of supplied url");
    } else if (parsedArgs.version) {
        console.log(
            "Name of Tool: " + pjson.name + "\nVerison number: " + pjson.version
        );
    } else if (parsedArgs.telescopeJsonLinkTest) {
        fetch(parsedArgs.inputArg[0])
            .then((res) => {
                if (!res.ok) {
                    throw new Error("Poor network response");
                }
                return res.text();
            })
            .then((body) => testTelescopePost(body, parsedArgs.inputArg[0]))
            .then((body) =>
                linkCheck(
                    body,
                    parsedArgs.jsonOutput,
                    parsedArgs.showGood,
                    parsedArgs.showBad,
                    parsedArgs.telescopeJsonLinkTest
                )
            )
            .catch((error) => {
                console.error("Fetch operation failed", error);
                console.log(chalk.bgRed("Invalid url, absolute URL only"));
            });
    } else if (parsedArgs.url) {
        console.log("res here");

        parsedArgs.inputArg.map((url) => {
            fetch(url)
                .then((res) => {
                    console.log("res", res);
                    if (!res.ok) {
                        throw new Error("Poor network response");
                    }
                    // console.log("res test", res.text())
                    return res.text();
                })
                .then((body) =>
                    linkCheck(
                        body,
                        parsedArgs.jsonOutput,
                        parsedArgs.showGood,
                        parsedArgs.showBad
                    )
                )
                .catch((error) => {
                    console.error("Fetch operation failed", error);
                    console.log(chalk.bgRed("Invalid url, absolute URL only"));
                });
        });
    } else {
        if (parsedArgs.ignoreUrl) {
            parsedArgs.inputArg = parsedArgs.inputArg.slice(1);
        }
        parsedArgs.inputArg.map((file) => {
            fs.readFile(file, (err, data) => {
                if (err) throw err;
                linkCheck(data.toString(), parsedArgs);
            });
        });
    }
}
