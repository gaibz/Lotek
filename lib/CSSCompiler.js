/**
 * @author : Herlangga Sefani <https://github.com/gaibz>
 */

'use strict';

const File = require("./File");
const CleanCSS = require("clean-css");

class CSSCompiler {
    /**
     * @constructor
     * @param {Object} css_config
     * @param {Boolean} debug
     * @param {String} group_name
     */
    constructor(css_config, debug = false, group_name = "") {
        this.files = css_config.files || [];
        this.output = css_config.output || '';
        this.debug = debug || true;
        this.url_replaces = css_config.url_replaces || [];
        this.replace_log_output = css_config.replace_log_output || '';
        this.replace_log = "";
        this.minify = css_config.minify || false;
        this.minify_options = css_config.minify_options || {};
        this.group_name = group_name;
    }

    /**
     * Translate url inside css content into new url
     * @private
     * @param {String} url
     * @param {String} content
     * @param {Boolean} replace_url
     * @returns {*}
     */
    translate(url, content, replace_url = false) {
        let ncontent = content;

        [...content.matchAll(/url\((?!['"]?(?:data):)['"]?([^'"\)]*)['"]?\)/g)].forEach((reg) => {
            let str = reg.input;
            let index = reg.index;
            let match = str.substring(index, str.indexOf(')', index)).replace('url(', '');
            // console.log({match});
            let urlx = url.split("/");
            let origin_url = "";
            urlx.forEach((u, i) => {
                if (i < (urlx.length - 1)) {
                    origin_url += u + "/";
                }
            });

            if (replace_url) {
                this.url_replaces.forEach((rep) => {
                    origin_url = origin_url.replace(rep.find, rep.replacement);
                });
            }

            let replacer = [
                "url(" + match + ")",
                "url('" + origin_url + match.replace(/(['|"])/g, '') + "')"
            ];

            let index2 = 0;
            do {
                ncontent = ncontent.replace(replacer[0], replacer[1]);
            } while((index2 = ncontent.indexOf("url(" + match + ")", index2 + 1)) > -1);
            this.replace_log += replacer[0] + " => " + replacer[1] + "\n";
        });

        return ncontent;
    }

    /**
     * Combine css files into one file
     * @param {boolean} write_to_file wether you want to write to file or just return (for testing)
     * @returns {Promise<Boolean|String>}
     */
    combine(write_to_file = true) {
        return new Promise((resolve, reject) => {
            let readers = [];
            this.files.forEach((file) => {
                readers.push(File.readFile(file));
            });

            Promise.all(readers).then((contents) => {

                contents.forEach((content, i) => {
                    let change_url = this.files[i].indexOf("http://") === -1 && this.files[i].indexOf("https://") === -1;
                    let translated = this.translate(this.files[i], content, change_url);
                    contents[i] = translated;
                    if (this.debug) {
                        contents[i] = "/*! File : " + this.files[i] + "*/ \n" + contents[i];
                    }
                });

                let content = contents.join("\n\n");

                let resolver_data = {
                    group : this.group_name,
                    type : "CSS"
                };

                if (this.minify) {
                    let result = new CleanCSS(this.minify_options).minify(content);
                    content = result.styles;
                    if (write_to_file) {
                        File.writeFile(this.output, content, () => resolve(resolver_data));
                    }
                    else {
                        resolver_data.file = this.output;
                        resolver_data.content = content;
                        resolver_data.minified_data = result;
                        resolve(resolver_data);
                    }
                }
                else
                {
                    if (write_to_file) {
                        File.writeFile(this.output, content, () => resolve(resolver_data));
                    }
                    else {
                        resolver_data.file = this.output;
                        resolver_data.content = content;
                        resolve(resolver_data);
                    }
                }

                if(this.replace_log_output) {
                    File.writeFile(this.replace_log_output, this.replace_log, () => {
                        console.log("CSS Replace Log has been written to : " + this.replace_log_output);
                    });
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

module.exports = CSSCompiler;