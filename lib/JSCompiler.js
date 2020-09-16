/**
 * @author : Herlangga Sefani <https://github.com/gaibz>
 */

'use strict';

const fs = require("fs");
const Terser = require("terser");
const FileReader = require("./FileReader");

class JSCompiler {
    /**
     * @constructor
     * @param {Object} js_config
     * @param {Array<String>} js_config.files
     * @param {String} js_config.output
     * @param {Boolean} debug
     */
    constructor(js_config, debug = false) {
        this.files = js_config.files;
        this.output = js_config.output;
        this.debug = debug;
        this.use_closure_per_file = js_config.use_closure_per_file;
        this.use_closure_all = js_config.use_closure_all;
        this.minify = js_config.minify;
        this.minify_options = js_config.minify_options;
    }

    /**
     * write code into file
     * @private
     * @param {String} content
     * @param {CallableFunction} resolve
     */
    writeFile(content, resolve) {
        fs.writeFile(this.output, content, () => {
            console.log("File has been written to (JS) : " + this.output);
            resolve(true);
        });
    }

    /**
     * Combine all files into one file
     * @returns {Promise<Boolean|String>}
     */
    combine() {
        return new Promise((resolve, reject) => {
            let readers = [];
            this.files.forEach((file) => {
                readers.push(FileReader.readFile(file));
            });

            Promise.all(readers).then((contents) => {
                if (this.debug || this.use_closure_per_file) {
                    contents.forEach((content, i) => {
                        if (this.use_closure_per_file) {
                            contents[i] = "(() => { \n" + contents[i] + "\n })();";
                        }
                        if (this.debug) {
                            contents[i] = "/*! File : " + this.files[i] + "*/ \n" + contents[i];
                        }
                    });
                }

                let content = contents.join("\n\n");

                if (this.use_closure_all) {
                    content = "(() => { \n" + content + "\n })();";
                }

                if (this.minify) {
                    Terser.minify(content, this.minify_options).then((result) => {
                        if (result.error) {
                            console.log(result.error);
                            console.log("Minified failed, return original code");
                        }
                        else
                        {
                            content = result.code;
                        }

                        this.writeFile(content, resolve);
                    });
                }
                else
                {
                    this.writeFile(content, resolve);
                }

            }).catch((err) => {
                console.log("Error Detected");
                console.log(err);
                reject(err);
                process.exit();
            });
        })
    }
}

module.exports = JSCompiler;