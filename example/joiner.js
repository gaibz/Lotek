/**
 * @author : Herlangga Sefani <https://github.com/gaibz>
 */

'use strict';

const Joiner = require("../index");
const {config} = require("./config");

new Joiner(config).compile().then((resp) => {
    console.log("Done.");
});