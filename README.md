# me-check-links
A simple command line tool to check status of links


<h2>Requirements</h2>
To install dependencies:<br/>
npm install<br/>  

To create symlink for the command:<br/>
npm link 

<h2>How to use</h2>
BLK - broken link finder of specific file
Options:<br/>
-v or /v,  to get verison number and name of the tool<br/> 
-u or /u,  to check link of a html page of supplied url<br/> 

<h2>Feature</h2>
Link result show up in color.<br/>  
1. Green links are good link with a HTTP status of 200.<br/> 
2. Red links are bad links of HTTP status 400 or 404.<br/> 
3. Grey link are unknown with any other HTTP status.<br/> 
<br/>  

Can check link of a html page via url using -u option and supplying a valid http url.<br>
<br>

The tool allows for multiple url or html files to be checked at one if enter one after another separated by a space. <br/>
But url and html cannot be mixed together in a single command.<br/>
The -u option is still required when checking multiple urls.<br/>
<br>

Handles unix and windows style of args -u or /u

