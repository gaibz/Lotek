/**
 * @author : Herlangga Sefani <https://github.com/gaibz>
 */

'use strict';

const Lotek = require("../index");
const {config} = require("./config");

new Lotek(config).compile().then((resp) => {
    console.log("Done.");
});