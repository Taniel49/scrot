const fs = require("fs");

module.exports = {
    getEncodedImage: function (name) {
        const file = fs.readFileSync(`./${name}.jpg`);
        return Buffer.from(file).toString('base64');
    },
    writeRecognisedFile: function (name, text) {
        fs.writeFileSync(name+'.txt', text);
    }
}