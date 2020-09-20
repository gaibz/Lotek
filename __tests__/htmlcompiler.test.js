/**
 * @author : Herlangga Sefani <https://github.com/gaibz>
 */

'use strict';

const HTMLCompiler = require("./../lib/HTMLCompiler");
const path = require("path");

test("Testing with empty config", (done) => {
    new HTMLCompiler({}).combine(false).then(() => {
        done();
    }).catch((err) => {
        done(err);
    });
}, 5000);


test('Testing for combining Files', (done) => {
    // Combine Testing
    new HTMLCompiler({
        files : [
            // test with local files
            path.resolve("./example/dev.html"),
            // test with remote files
            "https://www.npmjs.com/package/lotek"
        ],
        output : "",
    }, true, "testing").combine(false).then((resp) => {
        expect(resp.group).toBe('testing');
        expect(resp.type).toBe('HTML');
        expect(resp.content.indexOf('Some Title') > -1).toBe(true);
        expect(resp.content.indexOf('lotek  -  npm') > -1).toBe(true);
        done();
    }).catch((err) => {
        done(err);
    });
},10000);
