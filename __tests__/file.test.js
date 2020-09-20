/**
 * @author : Herlangga Sefani <https://github.com/gaibz>
 */

'use strict';

const File = require("../lib/File");
const path = require("path");

test("Reading local file", (done) => {
    File.readFile(path.resolve('example/dev.html')).then((content) => {
        expect(content.indexOf('Some Title') > -1).toBe(true);
        done();
    }).catch((err) => {
        done(err);
    });
});

test("Reading remote file", (done) => {
    File.readFile("https://www.npmjs.com/package/lotek").then((content) => {
        expect(content.indexOf('lotek  -  npm') > -1).toBe(true);
        done();
    }).catch((err) => {
        done(err);
    });
},10000);