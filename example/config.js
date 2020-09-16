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
                minify : false,
                // @see : https://www.npmjs.com/package/terser#compress-options
                minify_options : {}
            },
            css : {
                files : [
                    "./somedir/somefile.css"
                ],
                output : "./somedir/css/bundle.prod.css",
                // For Css This is important, as inside of css files may contain url() linked to another directory
                replaces : [
                    {
                        find : "css/",
                        replace : "../"
                    },
                    // ... more
                ]
            },
            html : {
                files : [
                    "/var/www/index.dev.html"
                ],
                output : "/var/www/index.html",
                // you may want to change some code inside html for joining
                replaces : [
                    {
                        find : "%stylesheet%",
                        replace : "<link href='./somedir/css/bundle.prod.css' rel='stylesheet' />",
                    },
                    {
                        find : "%javascript%",
                        replace : "<script src='./somedir/js/bundle.prod.js'></script>",
                    },
                    // ... more
                ]
            }
        }
    ]
}

module.exports = {config};