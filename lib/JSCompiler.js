/**
 * @author : Herlangga Sefani <https://github.com/gaibz>
 */

'use strict';

const Terser = require("terser");
const File = require("./File");

class JSCompiler {
    /**
     * @constructor
     * @param {Object} js_config
     * @param {Array<String>} js_config.files
     * @param {String} js_config.output
     * @param {Boolean} debug
     * @param {String} group_name
     */
    constructor(js_config, debug = false, group_name = "") {
        this.files = js_config.files || [];
        this.output = js_config.output || '';
        this.debug = debug || true;
        this.use_closure_per_file = js_config.use_closure_per_file || false;
        this.use_closure_all = js_config.use_closure_all || false;
        this.minify = js_config.minify || false;
        this.minify_options = js_config.minify_options || {};
        this.group_name = group_name;
    }

    /**
     * Combine all files into one file
     * @returns {Promise<Boolean|String>}
     */
    combine() {
        return new Promise((resolve, reject) => {
            let readers = [];
            this.files.forEach((file) => {
                readers.push(File.readFile(file));
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

                let resolver_data = {
                    group : this.group_name,
                    type : "JS"
                };

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

                        File.writeFile(this.output, content, () => resolve(resolver_data));
                    });
                }
                else
                {
                    File.writeFile(this.output, content, () => resolve(resolver_data));
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