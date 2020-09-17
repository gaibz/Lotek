/**
 * @author : Herlangga Sefani <https://github.com/gaibz>
 */

'use strict';

const JSCompiler = require("./lib/JSCompiler");
const CSSCompiler = require("./lib/CSSCompiler");
const HTMLCompiler = require("./lib/HTMLCompiler");

class Joiner {
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
            this.groups.forEach((group) => {
                // if (group.js) {
                //     new JSCompiler(group.js, group.debug_mode).combine().then((resp) => {
                //         console.log("JS File on Group : " + group.name + " has been combined.");
                //     });
                // }
                // if(group.css) {
                //     new CSSCompiler(group.css, group.debug_mode).combine().then((resp) => {
                //         console.log("CSS File on Group : " + group.name + " has been combined.");
                //     });
                // }
                if(group.html) {
                    new HTMLCompiler(group.html, group.debug_mode).combine().then((resp) => {
                        console.log("HTML File on Group : " + group.name + " has been combined.");
                    });
                }
            })
        });
    }
}

module.exports = Joiner;