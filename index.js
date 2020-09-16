/**
 * @author : Herlangga Sefani <https://github.com/gaibz>
 */

'use strict';

const JSCompiler = require("./lib/JSCompiler");

class Joiner {
    constructor(config) {
        this.groups = config.groups;
    }

    /**
     * Set Config
     * @param {object} config
     * @see README.md
     */
    setConfig(config) {
        this.config = config;
        return this;
    }

    /**
     * Compile Into Bundle Script
     * @returns {Promise<unknown>}
     */
    compile() {
        return new Promise((resolve, reject) => {
            // read groups
            this.groups.forEach((group) => {
                if (group.js) {
                    new JSCompiler(group.js, group.debug_mode).combine().then((resp) => {
                        console.log("JS File on Group : " + group.name + " has been combined.");
                    });
                }

            })
        });
    }
}

module.exports = Joiner;