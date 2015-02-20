var Identity = require("../app/Identity.js");

describe("Identity is a constructor", function(){
    it("returns an identity", function(){
        // for debugging
        console.log("\n", module.filename, "\n");

        var identity = new Identity();
        expect(Identity === identity.constructor).toBe(true);
    });
    it("makes identities that can compare themselves to others for equality", function(){
        var job1 = new Identity("job");
        var job2 = new Identity("job");
        expect(job1.equals(job1)).toBe(true);
        expect(job1.equals(job2)).toBe(false);
    });
});