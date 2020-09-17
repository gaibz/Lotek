/**
 * @author : Herlangga Sefani <https://github.com/gaibz>
 */

'use strict';

const File = require("./File");
const HTMLMinifier = require("html-minifier");

class HTMLCompiler {
    /**
     * @constructor
     * @param {Object} html_config
     * @param {Boolean} debug
     * @param {String} group_name
     */
    constructor(html_config, debug = false, group_name = "") {
        this.files = html_config.files || [];
        this.output = html_config.output || '';
        this.debug = debug || true;
        this.replaces = html_config.replaces || [];
        this.minify = html_config.minify || false;
        this.minify_options = html_config.minify_options || {};
        this.group_name = group_name;
    }


    /**
     * Replace HTML Content
     * @param {String} content
     * @returns {String}
     */
    replaceContent(content) {
        this.replaces.forEach((rep) => {
            let index = 0;
            do {
                content = content.replace(rep.find, rep.replacement);
            } while((index = content.indexOf(rep.find, index + 1)) > -1);
        });

        return content;
    }


    /**
     * Combine html files into one file
     * @returns {Promise<Boolean|String>}
     */
    combine() {
        return new Promise((resolve, reject) => {
            let readers = [];
            this.files.forEach((file) => {
                readers.push(File.readFile(file));
            });

            Promise.all(readers).then((contents) => {

                contents.forEach((content, i) => {
                    contents[i] = this.replaces.length > 0 ? this.replaceContent(contents[i]) : contents[i];
                    if (this.debug) {
                        contents[i] = "<!-- File : " + this.files[i] + " --> \n" + contents[i];
                    }
                });

                let content = contents.join("\n\n");

                let resolver_data = {
                    group : this.group_name,
                    type : "HTML"
                };

                if (this.minify) {
                    content = HTMLMinifier.minify(content, this.minify_options);
                    File.writeFile(this.output, content, () => resolve(resolver_data));
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

module.exports = HTMLCompiler;