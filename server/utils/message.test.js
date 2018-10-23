var expect = require('expect');
var {generateMessage} = require('./message');
describe("generateMessage", ()=>{
    it('should generate correct message object', ()=>{
        var fromText = 'fromtext';
        var bodyText = 'text';
        var result = generateMessage(fromText, bodyText);
        expect(result.from).toBe(fromText);
        expect(result.text).toBe(bodyText);
        expect(result.createdAt).toBeA('number');
        expect(result).toInclude({from: fromText, text: bodyText});
    });
});