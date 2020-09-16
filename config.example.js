/**
 * @author : Herlangga Sefani <https://github.com/gaibz>
 */

'use strict';

let config = {
    groups : [
        {
            // specify group name, for identifier
            name : "Some Group Name",
            // if true, then it will print out file location information inside output file
            debug_mode : false,
            js : {
                files : [
                    "./somedir/somefile.js"
                ],
                output : "./somedir/js/bundle.prod.js"
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