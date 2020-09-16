<h1 align="right">بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ</h1>

# SCRIPT JOINER
Simple Script Joiner (Combiner) and Minifier for HTML, CSS and JavaScript. Pretty helpfull for building asset bundle script into One File. For NodeJS

Crafted with :heart: by Herlangga Sefani (a.k.a Gaibz) 

# ROADMAP
<ul>
    <li><strike>JS Combiner & Minifier</strike> (Done) </li>
    <li>CSS Combiner & Minifier (On Progress)</li>
    <li>HTML Combiner & Minifier (On Progress)</li>
</ul>


# HOW TO'S 

### Installation
`npm install @gaibz/script-joiner`

### Usage

In `joiner.js` file
```javascript
const Joiner = require("@gaib/script-joiner");

const config = {
    groups : [
            {
                // specify group name, for identifier
                name : "Production",
                // if true, then it will print out file location information inside output file
                debug_mode : true,
                js : {
                    files : [
                        "https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js",
                        "./assets/src/js/script1.js",
                        "./assets/src/js/script2.js"
                    ],
                    output : "./assets/dist/bundle.assets.production.min.js",
                    // if true then content of file will be inside a javascript closure function. ()()
                    use_closure_per_file : false,
                    // if true then content of all file will be inside javascript closure function
                    use_closure_all : false,
                    // compress output into minified version
                    minify : true,
                    // @see : <https://www.npmjs.com/package/terser#compress-options>
                    minify_options : {}
                },
            }
        ]
}

new Joiner(config).compile().then((resp) => {
    console.log("Done.");
}); 
```


### Configuration explanation
<hr />
<b>groups[] [Array]</b><br /> Groups is an array of multiple config to be bundled. <hr />

<b>groups[].name [String]</b><br /> 
Specify Group name for identifier, example : Production, Development, or anything you want. <hr />

<b>groups[].debug_mode [Boolean]</b><br /> 
If set to true, then it will print out file source location inside output file on top of code. <br />
ex : `/*! File : somedir/somefile.ext */`
<hr />

<b>groups[].js [Object]</b><br /> 
Object of javascript bundle configuration
<hr />

<b>groups[].js.files [Array]</b><br /> 
Array of files to be bundled, you can put url from http / https
<hr />

<b>groups[].js.output [String]</b><br /> 
Output file of combined and minified javascript code
<hr />

<b>groups[].js.use_closure_per_file [Boolean]</b><br /> 
if true then it will make closure per file code, see example output
```javascript
/*! Code of original file1.js */
console.log("File 1");
/*! Code of original file2.js */
console.log("File 1");


/*! Code of output with closure per file set to true */
(() => {
    console.log("File 1");
})();
(() => {
    console.log("File 2");
})();
```
<hr />

<b>groups[].js.use_closure_all [Boolean]</b><br /> 
if true then it will make closure per file code, see example output
```javascript
/*! Code of original file1.js */
console.log("File 1");
/*! Code of original file2.js */
console.log("File 1");


/*! Code of output with closure all set to true */
(() => {
    console.log("File 1");
    console.log("File 2");
})();
```
<hr />


<b>groups[].js.minify [Boolean]</b><br /> 
if true then it will minify the output of all code (Powered by [Terser](https://www.npmjs.com/package/terser)),  
see example output
```javascript
/*! Code of original file1.js */
console.log("File 1");
/*! Code of original file2.js */
console.log("File 1");


/*! Code of output with minify to true */
console.log("File 1");console.log("File 2");
```
<hr />

<b>groups[].js.minify_options [Object]</b><br /> 
Since I used Terser for minify, please visit [Terser Options](https://www.npmjs.com/package/terser#compress-options) for better explanation
<hr />