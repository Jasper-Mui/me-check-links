# Contributing

1. Download files via the zip file or using git<br/>
2. To install dependencies:<br/>
   `npm install`<br/>
3. To create a symlink for the command:<br/>
   `npm link`

<h2>Source Code Formatter (Prettier)</h2>
Please run Prettier command before submitting any code by using the following command:
`npx prettier --write .`

npx prettier --write

<h2>Linter (ESLint)</h2>
Please run ESLint command on changed files before submitting any code by using the following command:
`npx eslint {files/directory changed}`

<h2>IDE Integration </h2>
Prettier and ESLint both have extensions available on visual studio code feel free to use them as the project's config files will be picked up on. 

https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode
https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint

<h2>Commands</h2>
Check test coverage command: `npm run coverage`
Run jest test: `npm run test`