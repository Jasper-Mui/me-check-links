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
-v,  to get verison number and name of the tool<br/> 
-u,  to check link of a html page of supplied url

The tool allows for multiple url or html files to be checked at one if enter one after another separated by a space. 
But url and html cannot be mixed together in a single command.
The -u option is still required when checking multiple urls. 

<h2>Feature</h2>
Link result show up in color.<br/>  
- Red links are bad links of HTTP status 400 or 404<br/> 
- Green links are good link with a HTTP status of 200<br/> 
- Grey link are unknown with any other HTTP status<br/> 
<br/>  
