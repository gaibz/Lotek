/**
 * @author : Herlangga Sefani <https://github.com/gaibz>
 */

'use strict';

let config = {
    groups : [
        {
            // specify group name, for identifier
            name : "Production",
            // if true, then it will print out file location information inside output file
            debug_mode : false,
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
                minify : false,
                // @see : https://www.npmjs.com/package/terser#compress-options
                minify_options : {}
            },
            css : {
                files : [
                    // "https://netdna.bootstrapcdn.com/bootstrap/3.0.0/css/bootstrap-glyphicons.css",
                    // "https://cdnjs.cloudflare.com/ajax/libs/bootstrap-fileinput/5.1.1/css/fileinput.min.css",
                    "./assets/src/css/style1.css",
                    "./assets/src/css/style2.css"
                ],
                output : "./assets/dist/bundle.assets.production.min.css",
                // For Css This is important, as inside of css files may contain url() linked to another directory
                url_replace : [
                    {
                        find : "assets/",
                        replacement : "../"
                    },
                    // ... more
                ],
                // Replace Log Output Filepath
                replace_log_output : "./replacer_log.txt",
                // compress output into minified version
                minify : true,
                // @see https://github.com/jakubpawlowicz/clean-css#constructor-options
                minify_options: {
                    // format: 'beautify'
                }
            },
            html : {
                files : [
                    "./dev.html"
                ],
                output : "./index.html",
                // you may want to change some code inside html for joining
                replaces : [
                    {
                        find : `<link href="./assets/src/css/style1.css" rel="stylesheet" />`,
                        replacement : `<link href='./assets/dist/bundle.assets.production.min.css' rel='stylesheet' />`,
                    },
                    {
                        find : `<link href="./assets/src/css/style2.css" rel="stylesheet" />`,
                        replacement : "",
                    },
                    {
                        find : `<script src="./assets/src/js/script1.js"></script>`,
                        replacement : `<script src="./assets/dist/bundle.assets.production.min.js"></script>`,
                    },
                    {
                        find : `<script src="./assets/src/js/script2.js"></script>`,
                        replacement : "",
                    },
                    // ... more
                ],
                minify : false,
                minify_options : {
                    removeAttributeQuotes: true,
                    removeComments : true,
                    collapseWhitespace : true,
                    minifyJS : true,
                    minifyCSS : true,
                }
            }
        }
    ]
}

module.exports = {config};