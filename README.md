# me-check-links
A simple command-line tool to check the status of links


<h2>Installation</h2>
npm: <br/>
npm i @Jasper-mui/me-check-link -g<br/>

<br/>or<br/>

manually:
1. Download files via the zip file or using git<br/>
2. To install dependencies:<br/>
   `npm install`<br/>  
3. To create a symlink for the command:<br/>
   `npm link`
   
<h2>What is it for?</h2>
MCl command is used to quickly find bad links of HTTP status of 400 or 404. (Please do not rely on this tool as it is not robust enough to do so. Use it as an aid) 

<h2>How to use</h2>
MCL - a command to check links of a HTML page<br/>
      if no arguments are supplied, a help message will be displayed<br/>
Options:<br/>
-v or /v,  to get the version number and name of the tool<br/> 
-u or /u,  to check the links of a HTML page of supplied URL<br/> 
-j or /j,  change output to json format, all links display in green no long follows color rules<br/> 
-b or /b,  this flag will only show bad links, no flag specified will show all links
-g or /g,  this flag will onyl show good links, no flag specified will show all links
-i or /i,  mcl -i &gt ignore &lt &gt file &lt 
           first file ignores links that are in the file which is space delimited 
           only valid links are allowed in the file and lines that start with # will be ignored
           
<h2>Feature</h2>

* The result of the links shows up in color to display the status of links. Does not apply to -j option as all links will show in green<br/>  
1. Green links are good links with an HTTP status of 200.<br/> 
2. Red links are bad links of HTTP status 400 or 404.<br/> 
3. Grey links are unknown with any other HTTP status.<br/> 

* The command can check HTML pages links via URL using -u option and supplying a valid HTTP URL.<br>

* The tool can check multiple URLs or HTML files to be checked at once if more than enter one URL or HTML file is entered one after another, separated by a space.<br/>
But url and html cannot be mixed together in a single command.<br/>
The -u option is still required when checking multiple URLs.<br/>

* Handles Unix and windows style of args -u or /u<br/>

* Handles links that cause timeouts smoothly

* Output in JSON format

* Flags to choice to only show good or bad links
