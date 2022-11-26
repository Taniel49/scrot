const scrot = require('./scrot.js');
const recognition = require('./recognition');
const utils = require('./utils');
const uuid4 = require('uuid4');

const name = uuid4();

(async () => {
    await scrot(name);
    const encoded = utils.getEncodedImage(name);
    const text = await recognition(encoded);
    utils.writeRecognisedFile(name, text)
})();