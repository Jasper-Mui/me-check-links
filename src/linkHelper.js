import chalk from "chalk";
import fetch from "node-fetch";
import fs from "fs";

export function linkCheck(file, args, showGood, showBad, isArray) {
  const regex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,25}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/g;
  let urls = null;

  if (isArray) {
    urls = file;
  } else {
    urls = file.match(regex);
  }

  if (args.ignoreUrl) {
    //function to filter ignored URLs
    urls = ignoreUrl(args.ignoreFile, urls);
  }

  const promises = urls.map(getStatus);

  console.log("checking...");
  Promise.allSettled(promises)
    .then((res) => {
      return res.map((res) => {
        if (res.value.status == 200 && showGood) {
          if (!args.jsonOutput) console.log(chalk.green(res.value.url));

          return { url: res.value.url, status: res.value.status };
        } else if (
          (res.value.status == 400 || res.value.status == 404) &&
          showBad
        ) {
          if (!args.jsonOutput) console.log(chalk.red(res.value.url));

          return { url: res.value.url, status: res.value.status };
        } else if (showBad) {
          if (!args.jsonOutput) console.log(chalk.grey(res.value.url));

          return { url: res.value.url, status: res.value.status };
        }
      });
    })
    .then((res) => {
      if (args.jsonOutput) console.log(res);
    })
    .catch((url) => {
      if (showBad) console.log(chalk.red(url));
    });
}

export async function getStatus(url) {
  // promise function to fetch all url status
  try {
    const res = await fetch(url);
    return { url: url, status: res.status };
  } catch (err) {
    return { url, status: err.status };
  }
}

export function ignoreUrl(ignoreFile, urls) {
  let ignore;
  
  try {
    ignore = fs.readFileSync(ignoreFile, "utf8");
  } catch (err) {
    throw new Error("Error reading ignore file");
  }

  const regex = /^((?!#).)*$/gm;
  let ignoreUrls = ignore.match(regex);

  if (ignoreUrls != null) {
    ignoreUrls = ignoreUrls.filter((url) => url != "");

    ignoreUrls.forEach((ignoreUrl) => {
      if (!ignoreUrl.startsWith("https://") && !ignoreUrl.startsWith("http://"))
        throw new Error("Invalid Ignore File");

      urls = urls.filter((url) => !url.startsWith(ignoreUrl));
    });
  }
 
  return urls;
}

export const testTelescopePost = (body, url) => {
  const localhostRegex = /https?:\/\/localhost:[0-9]*/;
  const baseURL = url.match(localhostRegex);

  return JSON.parse(body).map((i) => {
    return baseURL[0] + i.url;
  });
};
