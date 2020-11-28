const { parseArgs } = require("../src/main");

describe("parseArgs tests", () => {

    test('calling parseArgs will return an object', () => {
        const args = ['C:\\Program Files\\nodejs\\node.exe',
        'C:\\Users\\jason\\AppData\\Roaming\\npm\\node_modules\\@jasper-mui\\me-check-link\\bin\\MCL'];
        const result = parseArgs(args);
        expect(typeof result).toBe('object');
        
    })

});