# me-check-links
A simple command-line tool to check the status of links


<h2>Installation</h2>
1. Download files via the zip file or using git<br/>
2. To install dependencies:<br/>
   npm install<br/>  
3. To create a symlink for the command:<br/>
   npm link 
   
<h2>What is it for?</h2>
MCl command is used to quickly find bad links of HTTP status of 400 or 404. (Please do not relay on this tool as it is not robust enough to do so. Use it as an aid) 

<h2>How to use</h2>
MCL - broken link finder of specific file
Options:<br/>
-v or /v,  to get the version number and name of the tool<br/> 
-u or /u,  to check the link of a HTML page of supplied URL<br/> 

<h2>Feature</h2>
The link result shows up in color to display the status of links.<br/>  
1. Green links are good links with an HTTP status of 200.<br/> 
2. Red links are bad links of HTTP status 400 or 404.<br/> 
3. Grey links are unknown with any other HTTP status.<br/> 
<br/>  
The command can check HTML pages links via URL using -u option and supplying a valid HTTP URL.<br>
<br>
The tool can check multiple URLs or HTML files to be checked at once if more than enter one URL or HTML file is entered one after another, separated by a space.<br/>
But url and html cannot be mixed together in a single command.<br/>
The -u option is still required when checking multiple URLs.<br/>
<br>
Handles Unix and windows style of args -u or /u

