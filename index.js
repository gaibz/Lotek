/**
 * @author : Herlangga Sefani <https://github.com/gaibz>
 */

'use strict';

const JSCompiler = require("./lib/JSCompiler");
const CSSCompiler = require("./lib/CSSCompiler");
const HTMLCompiler = require("./lib/HTMLCompiler");

class Lotek {
    constructor(config) {
        this.groups = config.groups;
    }

    /**
     * Compile Into Bundle Script
     * @returns {Promise<unknown>}
     */
    compile() {
        return new Promise((resolve, reject) => {
            // read groups
            let promises = [];
            this.groups.forEach((group) => {
                if (group.js) {
                    promises.push( new JSCompiler(group.js, group.debug_mode, group.name).combine() );
                }
                if (group.css) {
                    promises.push( new CSSCompiler(group.css, group.debug_mode, group.name).combine() );
                }
                if (group.html) {
                    promises.push( new HTMLCompiler(group.html, group.debug_mode, group.name).combine() );
                }
            });

            Promise.all(promises).then((results) => {
                results.forEach((result) => {
                    console.log(result.type + " File on Group : " + result.group + " has been combined.");
                });
                resolve(results);
            }).catch((err) => {
                reject(err);
            });
        });
    }
}

module.exports = Lotek;