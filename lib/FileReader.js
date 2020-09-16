/**
 * @author : Herlangga Sefani <https://github.com/gaibz>
 */

'use strict';

const fs = require("fs");
const http = require("http");
const https = require("https");

/**
 * read file from http, https or local file location
 * @param {String} file (url of the file)
 * @returns {Promise<String|Boolean>}
 */
function readFile(file) {
    return new Promise((resolve, reject) => {
        if (file.indexOf("http://") !== -1 || file.indexOf("https://") !== -1) {
            // select http provider, neither http or https
            let provider = file.indexOf("http://") !== -1 ? http : https;

            // container of the data
            let body = "";

            provider.get(file).on('response', (response) => {
                response.on('data', (chunk) => {
                    body += chunk;
                });
                response.on("end", () => {
                    resolve(body);
                });
                response.on('error', (err) => {
                    reject(err);
                });
            });
        }
        else
        {
            fs.readFile(file, 'utf-8', (err, data) => {
                if (err) return reject(err);
                resolve(data);
            });
        }
    });
}


module.exports = {readFile};